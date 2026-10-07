import { after, NextResponse } from "next/server";
import { createConnection, type Socket } from "node:net";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { forwardToManagerAppLead } from "@/lib/leadIntake";
import { siteConfig } from "@/content/site";
import { quoteSchema } from "@/lib/quoteSchema";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const requestBuckets = new Map<string, number[]>();
const CONTACT_DELIVERY_TIMEOUT_MS = 8_000;
const ANALYTICS_TIMEOUT_MS = 2_000;
const TURNSTILE_TIMEOUT_MS = 5_000;
// Discord embed limits: https://discord.com/developers/docs/resources/message#embed-object-embed-limits
const DISCORD_DESCRIPTION_LIMIT = 4096;
const DISCORD_FIELD_VALUE_LIMIT = 1024;
const DISCORD_EMBED_TOTAL_LIMIT = 6000;

type LeadPhoto = { filename: string; contentType: string; content: Buffer };

async function withDeliveryDeadline<T>(send: (signal: AbortSignal) => Promise<T>, timeoutMs: number): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => {
    const error = new Error("Delivery deadline exceeded");
    error.name = "TimeoutError";
    controller.abort(error);
  }, timeoutMs);
  try {
    return await send(controller.signal);
  } finally {
    clearTimeout(timer);
  }
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const recent = (requestBuckets.get(ip) ?? []).filter((ts) => ts > cutoff);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestBuckets.set(ip, recent);
    return true;
  }

  recent.push(now);
  requestBuckets.set(ip, recent);
  return false;
}

function redactEmail(value: unknown) {
  const email = typeof value === "string" ? value.trim() : "";
  const at = email.indexOf("@");
  if (at <= 1) return email ? "[redacted]" : "";
  return `${email.slice(0, 1)}***${email.slice(at)}`;
}

function redactPhone(value: unknown) {
  const raw = typeof value === "string" ? value : "";
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length <= 4) return `***${digits}`;
  return `***${digits.slice(-4)}`;
}

function truncateText(value: string, maxLength: number) {
  return value.length <= maxLength ? value : `${value.slice(0, maxLength - 1)}…`;
}

function formSourceLabel(payload: Record<string, unknown>) {
  return payload.form_source === "scope_builder" ? "Scope Builder" : "Quote form";
}

function hasImageSignature(bytes: Buffer, type: string) {
  if (type === "image/jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (type === "image/png") return bytes.toString("hex", 0, 8) === "89504e470d0a1a0a";
  if (type === "image/webp") return bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP";
  return false;
}

/** Decode the browser-resized photos, keeping only real JPEG/PNG/WebP images. */
function decodePhotos(photos: Array<{ type: string; data: string }>): LeadPhoto[] {
  const extensions: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
  return photos
    .map((photo) => ({ contentType: photo.type, content: Buffer.from(photo.data, "base64") }))
    .filter((photo) => hasImageSignature(photo.content, photo.contentType))
    .map((photo, index) => ({ ...photo, filename: `photo-${index + 1}.${extensions[photo.contentType]}` }));
}

/** Cloudflare Turnstile. Active only when TURNSTILE_SECRET_KEY is configured. */
async function verifyTurnstile(token: string, ip: string | undefined, signal: AbortSignal) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
    signal,
  });
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

function discordEmbed(payload: Record<string, unknown>, photos: LeadPhoto[]) {
  const value = (text: unknown, fallback = "—") =>
    truncateText(String(text || "").trim() || fallback, DISCORD_FIELD_VALUE_LIMIT);
  const attribution = [
    `Traffic Source: ${String(payload.traffic_source || "Direct / Unknown")}`,
    payload.landing_page ? `Landing Page: ${String(payload.landing_page)}` : "",
    payload.submission_page ? `Submission Page: ${String(payload.submission_page)}` : "",
    payload.referrer ? `Referrer: ${String(payload.referrer)}` : "",
    payload.campaign ? `Campaign: ${String(payload.campaign)}` : "",
  ].filter(Boolean);
  const fields = [
    { name: "Name", value: value(payload.name), inline: true },
    { name: "Phone", value: value(payload.phone), inline: true },
    { name: "Email", value: value(payload.email), inline: true },
    { name: "Location", value: value(`${String(payload.city || "")} ${String(payload.zip || "")}`), inline: true },
    { name: "Service", value: value(payload.service), inline: true },
    { name: "Timeline", value: value(payload.timeline), inline: true },
    ...(photos.length ? [{ name: "Photos", value: `${photos.length} attached`, inline: true }] : []),
    { name: "Source", value: value(attribution.join("\n")), inline: false },
  ];
  const title = `Website Lead Submission · via ${formSourceLabel(payload)}`;
  const fixedLength = title.length + fields.reduce((total, field) => total + field.name.length + field.value.length, 0);
  const description = truncateText(
    `**Details**\n${String(payload.details || "")}`,
    Math.min(DISCORD_DESCRIPTION_LIMIT, DISCORD_EMBED_TOTAL_LIMIT - fixedLength - 100),
  );
  return {
    title,
    description,
    color: 13678695,
    fields,
    ...(photos[0] ? { image: { url: `attachment://${photos[0].filename}` } } : {}),
    footer: { text: "rhipros.com" },
    timestamp: new Date().toISOString(),
  };
}

async function sendLeadWebhook(payload: Record<string, unknown>, photos: LeadPhoto[], signal: AbortSignal) {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return { delivered: false, reason: "missing_webhook_url" as const };

  const isDiscordWebhook = webhookUrl.includes("discord.com/api/webhooks");
  let body: string | FormData;
  let headers: Record<string, string> | undefined = { "Content-Type": "application/json" };

  if (isDiscordWebhook) {
    const message = {
      username: "RHI Leads",
      content: "New Quote Request",
      // Lead text is customer-entered; never let it ping anyone.
      allowed_mentions: { parse: [] },
      embeds: [discordEmbed(payload, photos)],
    };
    if (photos.length) {
      const form = new FormData();
      form.append(
        "payload_json",
        JSON.stringify({ ...message, attachments: photos.map((photo, id) => ({ id, filename: photo.filename })) }),
      );
      photos.forEach((photo, index) =>
        form.append(`files[${index}]`, new Blob([new Uint8Array(photo.content)], { type: photo.contentType }), photo.filename),
      );
      body = form;
      headers = undefined;
    } else {
      body = JSON.stringify(message);
    }
  } else {
    body = JSON.stringify({ event: "quote_submitted", submittedAt: new Date().toISOString(), lead: payload });
  }

  const response = await fetch(webhookUrl, { method: "POST", headers, body, signal });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Webhook delivery failed (${response.status}): ${text}`);
  }

  await response.body?.cancel();
  return { delivered: true as const };
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.EMAIL_FROM || user;
  if (!host || !user || !pass || !from) return null;
  return { host, port, user, pass, from };
}

/** Send one message over SMTP within the caller's deadline, owning and cleaning up the raw socket. */
async function sendSmtpMail(
  smtp: NonNullable<ReturnType<typeof getSmtpConfig>>,
  message: nodemailer.SendMailOptions,
  signal: AbortSignal,
) {
  const { host, port, user, pass } = smtp;
  let socket: Socket | undefined;
  const transportOptions: SMTPTransport.Options = {
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    dnsTimeout: CONTACT_DELIVERY_TIMEOUT_MS,
    connectionTimeout: CONTACT_DELIVERY_TIMEOUT_MS,
    greetingTimeout: CONTACT_DELIVERY_TIMEOUT_MS,
    socketTimeout: CONTACT_DELIVERY_TIMEOUT_MS,
    // Own the raw socket so the overall deadline cancels an active SMTP send.
    // Nodemailer still performs implicit TLS/STARTTLS and authentication.
    getSocket(_options, callback) {
      if (signal.aborted) {
        callback(signal.reason, {});
        return;
      }
      socket = createConnection({ host, port, signal });
      const pendingSocket = socket;
      const onError = (error: Error) => callback(error, {});
      pendingSocket.once("error", onError);
      pendingSocket.once("connect", () => {
        pendingSocket.removeListener("error", onError);
        callback(null, { connection: pendingSocket });
      });
    },
  };
  const transporter = nodemailer.createTransport(transportOptions);
  try {
    await transporter.sendMail(message);
    return { delivered: true as const };
  } finally {
    socket?.destroy();
    transporter.close();
  }
}

async function sendLeadEmail(payload: Record<string, unknown>, photos: LeadPhoto[], signal: AbortSignal) {
  const smtp = getSmtpConfig();
  const to = process.env.EMAIL_TO || siteConfig.primaryEmail;
  if (!smtp || !to) {
    return { delivered: false, reason: "missing_smtp_config" as const };
  }

  const subject = `New Quote Request: ${String(payload.name || "Lead")} (${String(payload.service || "Service TBD")})`;
  const body = [
    `Name: ${String(payload.name || "")}`,
    `Phone: ${String(payload.phone || "")}`,
    `Email: ${String(payload.email || "")}`,
    `City: ${String(payload.city || "")}`,
    `ZIP: ${String(payload.zip || "")}`,
    `Service: ${String(payload.service || "")}`,
    `Timeline: ${String(payload.timeline || "")}`,
    `Details: ${String(payload.details || "")}`,
    `Submitted via: ${formSourceLabel(payload)}`,
  ];
  if (photos.length) body.push(`Photos: ${photos.length} attached`);
  if (payload.utm_source) {
    body.push(`Source: ${String(payload.utm_source)} / ${String(payload.utm_medium || "")}`);
  }

  return sendSmtpMail(
    smtp,
    {
      from: smtp.from,
      to,
      replyTo: payload.email ? String(payload.email) : undefined,
      subject,
      text: body.join("\n"),
      attachments: photos.map((photo) => ({
        filename: photo.filename,
        content: photo.content,
        contentType: photo.contentType,
      })),
    },
    signal,
  );
}

/**
 * Plain receipt to the visitor. It repeats only the chosen service, timing and
 * location, never free-text details, so the form cannot relay arbitrary text.
 */
async function sendCustomerConfirmation(payload: Record<string, unknown>, photoCount: number, signal: AbortSignal) {
  const smtp = getSmtpConfig();
  if (!smtp) return { delivered: false, reason: "missing_smtp_config" as const };
  if (process.env.CUSTOMER_CONFIRMATION_EMAIL === "off") {
    return { delivered: false, reason: "missing_confirmation_opt_in" as const };
  }
  const clean = (value: unknown, pattern: RegExp, max: number) =>
    String(value || "")
      .replace(pattern, "")
      .trim()
      .slice(0, max);
  const firstName = clean(String(payload.name || "").split(/\s+/)[0], /[^\p{L}'-]/gu, 40) || "there";
  const service = clean(payload.service, /[^\p{L}\s&–-]/gu, 60) || "remodeling";
  const timeline = clean(payload.timeline, /[^\p{L}\d\s–-]/gu, 40);
  const location = `${clean(payload.city, /[^\p{L}\s.'-]/gu, 60)} ${clean(payload.zip, /[^\d-]/g, 10)}`.trim();
  const businessInbox = process.env.EMAIL_TO || siteConfig.primaryEmail;

  const text = [
    `Hi ${firstName},`,
    "",
    `Thanks for reaching out to ${siteConfig.name}. We received your ${service} request. We will review it and follow up by phone or email to talk through next steps.`,
    "",
    "What you sent us",
    `Service: ${service}`,
    timeline ? `Timing: ${timeline}` : "",
    location ? `Location: ${location}` : "",
    photoCount ? `Photos: ${photoCount} received` : "",
    "",
    `Need us sooner? Call ${siteConfig.phoneDisplay}${businessInbox ? ` or reply to this email` : ""}.`,
    "",
    `${siteConfig.name} · ${siteConfig.legalName} · ${siteConfig.hicLabel}`,
    siteConfig.domain,
    "",
    "You are receiving this because this email address was entered in a quote request on our website. If that was not you, you can ignore this message.",
  ].filter((line, index, lines) => line !== "" || lines[index - 1] !== "");

  return sendSmtpMail(
    smtp,
    {
      from: smtp.from,
      to: String(payload.email),
      replyTo: businessInbox || undefined,
      subject: `We received your request – ${siteConfig.name}`,
      text: text.join("\n"),
    },
    signal,
  );
}

async function sendFbConversionEvent(payload: Record<string, unknown>, signal: AbortSignal, ip?: string, ua?: string) {
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  const token = process.env.FB_CONVERSIONS_API_TOKEN;
  if (!pixelId || !token) {
    return { delivered: false, reason: "missing_fb_pixel_config" as const };
  }

  const res = await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events`, {
    method: "POST",
    signal,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          user_data: {
            em: payload.email ? [payload.email] : undefined,
            ph: payload.phone ? [payload.phone] : undefined,
            client_ip_address: ip || undefined,
            client_user_agent: ua || undefined,
          },
          custom_data: {
            content_name: payload.service || "Quote Request",
            content_category: "lead",
          },
        },
      ],
      access_token: token,
    }),
  });

  if (!res.ok) {
    throw new Error(`FB CAPI failed (${res.status})`);
  }

  await res.body?.cancel();
  return { delivered: true as const };
}

function logDeliveryResult(
  channel: string,
  result: PromiseSettledResult<{ delivered?: boolean; forwarded?: boolean; reason?: string; status?: number }>,
) {
  if (result.status === "rejected") {
    // Delivery exceptions may contain provider responses, credentials or lead details.
    console.warn("[quote-api] Delivery channel result:", { channel, outcome: "failed", reason: "request_error" });
    return false;
  }

  const delivered = result.value.delivered === true || result.value.forwarded === true;
  if (delivered) {
    console.log("[quote-api] Delivery channel result:", { channel, outcome: "delivered" });
  } else {
    const reason = result.value.reason || "not_acknowledged";
    console.warn("[quote-api] Delivery channel result:", {
      channel,
      outcome: reason.startsWith("missing_") ? "skipped" : "failed",
      reason,
      status: result.value.status,
    });
  }
  return delivered;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = quoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: "Please fix the highlighted fields and resubmit.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true, message: "Thanks, your request was received." });
    }

    const remoteIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const userAgent = request.headers.get("user-agent") || "";
    if (remoteIp && isRateLimited(remoteIp)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Too many requests. Please wait a few minutes and try again.",
        },
        { status: 429 },
      );
    }

    // Keep photo bytes and the security token out of text channels and logs.
    const { photos: rawPhotos = [], turnstile_token: turnstileToken, ...lead } = parsed.data;

    if (process.env.TURNSTILE_SECRET_KEY) {
      let verified = true;
      try {
        verified = await withDeliveryDeadline(
          (signal) => verifyTurnstile(String(turnstileToken || ""), remoteIp, signal),
          TURNSTILE_TIMEOUT_MS,
        );
      } catch {
        // If Cloudflare is unreachable, accept the lead rather than lose a real customer.
        console.warn("[quote-api] Turnstile verification unavailable; accepting request.");
      }
      if (!verified) {
        return NextResponse.json(
          {
            ok: false,
            message: "Please complete the security check and try again.",
            errors: { turnstile_token: ["Please complete the security check."] },
          },
          { status: 400 },
        );
      }
    }

    const photos = rawPhotos.length ? decodePhotos(rawPhotos) : [];
    const deliveryLead: Record<string, unknown> = { ...lead, photo_count: photos.length };

    console.log("[quote-api] New request received:", {
      service: lead.service,
      city: lead.city,
      email: redactEmail(lead.email),
      phone: redactPhone(lead.phone),
      source: formSourceLabel(deliveryLead),
      photos: photos.length,
      ip: remoteIp || "unknown",
    });

    // Keep the acknowledgements: a skipped channel is not a delivered lead.
    const results = await Promise.allSettled([
      withDeliveryDeadline((signal) => sendLeadWebhook(deliveryLead, photos, signal), CONTACT_DELIVERY_TIMEOUT_MS),
      withDeliveryDeadline((signal) => sendLeadEmail(deliveryLead, photos, signal), CONTACT_DELIVERY_TIMEOUT_MS),
      withDeliveryDeadline(
        (signal) =>
          forwardToManagerAppLead(
            {
              contactName: lead.name,
              phone: lead.phone,
              email: lead.email,
              serviceType: lead.service,
              source: "website_form",
              notes: photos.length
                ? `${lead.details}\n\nPhotos: ${photos.length} attached to the lead email and Discord notification.`
                : lead.details,
              utm_source: lead.utm_source || undefined,
              utm_medium: lead.utm_medium || undefined,
              utm_campaign: lead.utm_campaign || undefined,
              utm_content: lead.utm_content || undefined,
              utm_term: lead.utm_term || undefined,
              landing_path: lead.landing_path || undefined,
              traffic_source: lead.traffic_source || "Direct / Unknown",
              traffic_medium: lead.traffic_medium || "direct",
              referrer: lead.referrer || undefined,
              gclid: lead.gclid || undefined,
              fbclid: lead.fbclid || undefined,
              submission_page: lead.submission_page || undefined,
              city: lead.city,
              zip: lead.zip,
              timeline: lead.timeline,
            },
            signal,
          ),
        CONTACT_DELIVERY_TIMEOUT_MS,
      ),
    ]);

    const contactDeliveries = [
      logDeliveryResult("Webhook", results[0]),
      logDeliveryResult("Email", results[1]),
      logDeliveryResult("Manager App", results[2]),
    ];
    if (!contactDeliveries.some(Boolean)) {
      console.error("[quote-api] No contact channel accepted the quote request.");
      return NextResponse.json(
        {
          ok: false,
          message: `We could not send your request. Please try again or call ${siteConfig.phoneDisplay}.`,
        },
        { status: 503 },
      );
    }

    // Next owns and awaits these bounded post-response tasks through waitUntil.
    // The customer receipt and analytics cannot delay or reverse an acknowledged request.
    try {
      after(async () => {
        const [confirmation, analytics] = await Promise.allSettled([
          withDeliveryDeadline(
            (signal) => sendCustomerConfirmation(deliveryLead, photos.length, signal),
            CONTACT_DELIVERY_TIMEOUT_MS,
          ),
          withDeliveryDeadline(
            (signal) => sendFbConversionEvent(deliveryLead, signal, remoteIp, userAgent),
            ANALYTICS_TIMEOUT_MS,
          ),
        ]);
        logDeliveryResult("Customer confirmation email", confirmation);
        logDeliveryResult("Facebook conversion (analytics)", analytics);
      });
    } catch {
      console.warn("[quote-api] Post-response tasks were not scheduled.");
    }

    return NextResponse.json({
      ok: true,
      message: "Thanks. Your request was sent. We will contact you shortly.",
    });
  } catch (err) {
    console.error("[quote-api] Fatal error in POST handler:", err);
    return NextResponse.json({ ok: false, message: "Something went wrong. Please call us directly." }, { status: 500 });
  }
}
