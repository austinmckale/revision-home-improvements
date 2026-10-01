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

async function sendLeadWebhook(payload: Record<string, unknown>, signal: AbortSignal) {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return { delivered: false, reason: "missing_webhook_url" as const };

  const isDiscordWebhook = webhookUrl.includes("discord.com/api/webhooks");
  const leadLines = [
    `Name: ${String(payload.name || "")}`,
    `Phone: ${String(payload.phone || "")}`,
    `Email: ${String(payload.email || "")}`,
    `City: ${String(payload.city || "")}`,
    `ZIP: ${String(payload.zip || "")}`,
    `Service: ${String(payload.service || "")}`,
    `Timeline: ${String(payload.timeline || "")}`,
    `Details: ${String(payload.details || "")}`,
  ];

  leadLines.push("", `Traffic Source: ${String(payload.traffic_source || "Direct / Unknown")}`);
  if (payload.landing_page) leadLines.push(`Landing Page: ${String(payload.landing_page)}`);
  if (payload.submission_page) leadLines.push(`Submission Page: ${String(payload.submission_page)}`);
  if (payload.referrer) leadLines.push(`Referrer: ${String(payload.referrer)}`);
  if (payload.campaign) leadLines.push(`Campaign: ${String(payload.campaign)}`);

  const body = isDiscordWebhook
    ? {
        username: "RHI Leads",
        content: "New Quote Request",
        embeds: [
          {
            title: "Website Lead Submission",
            description: leadLines.join("\n"),
            color: 13678695,
            timestamp: new Date().toISOString(),
          },
        ],
      }
    : {
        event: "quote_submitted",
        submittedAt: new Date().toISOString(),
        lead: payload,
      };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Webhook delivery failed (${response.status}): ${text}`);
  }

  await response.body?.cancel();
  return { delivered: true as const };
}
async function sendLeadEmail(payload: Record<string, unknown>, signal: AbortSignal) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.EMAIL_TO || siteConfig.primaryEmail;
  const from = process.env.EMAIL_FROM || user;

  if (!host || !user || !pass || !to || !from) {
    return { delivered: false, reason: "missing_smtp_config" as const };
  }

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
  ];
  if (payload.utm_source) {
    body.push(`Source: ${String(payload.utm_source)} / ${String(payload.utm_medium || "")}`);
  }

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: payload.email ? String(payload.email) : undefined,
      subject,
      text: body.join("\n"),
    });
    return { delivered: true as const };
  } finally {
    socket?.destroy();
    transporter.close();
  }
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

    console.log("[quote-api] New request received:", {
      service: parsed.data.service,
      city: parsed.data.city,
      email: redactEmail(parsed.data.email),
      phone: redactPhone(parsed.data.phone),
      ip: remoteIp || "unknown",
    });

    // Keep the acknowledgements: a skipped channel is not a delivered lead.
    const results = await Promise.allSettled([
      withDeliveryDeadline((signal) => sendLeadWebhook(parsed.data, signal), CONTACT_DELIVERY_TIMEOUT_MS),
      withDeliveryDeadline((signal) => sendLeadEmail(parsed.data, signal), CONTACT_DELIVERY_TIMEOUT_MS),
      withDeliveryDeadline(
        (signal) =>
          forwardToManagerAppLead(
            {
              contactName: parsed.data.name,
              phone: parsed.data.phone,
              email: parsed.data.email,
              serviceType: parsed.data.service,
              source: "website_form",
              notes: parsed.data.details,
              utm_source: parsed.data.utm_source || undefined,
              utm_medium: parsed.data.utm_medium || undefined,
              utm_campaign: parsed.data.utm_campaign || undefined,
              utm_content: parsed.data.utm_content || undefined,
              utm_term: parsed.data.utm_term || undefined,
              landing_path: parsed.data.landing_path || undefined,
              traffic_source: parsed.data.traffic_source || "Direct / Unknown",
              traffic_medium: parsed.data.traffic_medium || "direct",
              referrer: parsed.data.referrer || undefined,
              gclid: parsed.data.gclid || undefined,
              fbclid: parsed.data.fbclid || undefined,
              submission_page: parsed.data.submission_page || undefined,
              city: parsed.data.city,
              zip: parsed.data.zip,
              timeline: parsed.data.timeline,
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

    // Next owns and awaits this bounded post-response task through waitUntil.
    // Analytics cannot delay or reverse an acknowledged customer request.
    try {
      after(async () => {
        const [result] = await Promise.allSettled([
          withDeliveryDeadline(
            (signal) => sendFbConversionEvent(parsed.data, signal, remoteIp, userAgent),
            ANALYTICS_TIMEOUT_MS,
          ),
        ]);
        logDeliveryResult("Facebook conversion (analytics)", result);
      });
    } catch {
      console.warn("[quote-api] Analytics task was not scheduled.");
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
