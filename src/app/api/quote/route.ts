import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { forwardToManagerAppLead } from "@/lib/leadIntake";
import { siteConfig } from "@/content/site";
import { quoteSchema } from "@/lib/quoteSchema";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const requestBuckets = new Map<string, number[]>();

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

async function sendLeadWebhook(payload: Record<string, unknown>) {
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

  if (payload.utm_source) {
    leadLines.push(`Source: ${String(payload.utm_source)} / ${String(payload.utm_medium || "")}`);
  }

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
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Webhook delivery failed (${response.status}): ${text}`);
  }

  return { delivered: true as const };
}
async function sendLeadEmail(payload: Record<string, unknown>) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.EMAIL_TO || siteConfig.primaryEmail;
  const from = process.env.EMAIL_FROM || user;

  if (!host || !user || !pass || !to || !from) {
    console.error("[quote-api] Email delivery skipped: Missing SMTP configuration", {
      host: Boolean(host),
      user: Boolean(user),
      pass: Boolean(pass),
      to: Boolean(to),
      from: Boolean(from),
    });
    return { delivered: false, reason: "missing_smtp_config" as const };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

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
  } catch (err) {
    console.error("[quote-api] Email delivery failed:", err);
    throw err;
  }
}

async function sendFbConversionEvent(payload: Record<string, unknown>, ip?: string, ua?: string) {
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  const token = process.env.FB_CONVERSIONS_API_TOKEN;
  if (!pixelId || !token) {
    return { delivered: false, reason: "missing_fb_pixel_config" as const };
  }

  const res = await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events`, {
    method: "POST",
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
    const text = await res.text();
    console.error("[quote-api] FB Conversions API failed:", res.status, text);
    throw new Error(`FB CAPI failed (${res.status})`);
  }

  return { delivered: true as const };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = quoteSchema.safeParse(body);
    const rawBody = body as Record<string, unknown>;

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

    // Send to all channels and log results
    const results = await Promise.allSettled([
      sendLeadWebhook(parsed.data).then(() => "Webhook"),
      sendLeadEmail(parsed.data).then(() => "Email"),
      forwardToManagerAppLead({
        contactName: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email,
        serviceType: parsed.data.service,
        source: "website_form",
        notes: parsed.data.details,
        utm_source: typeof rawBody.utm_source === "string" ? rawBody.utm_source : undefined,
        utm_medium: typeof rawBody.utm_medium === "string" ? rawBody.utm_medium : undefined,
        utm_campaign: typeof rawBody.utm_campaign === "string" ? rawBody.utm_campaign : undefined,
        utm_content: typeof rawBody.utm_content === "string" ? rawBody.utm_content : undefined,
        utm_term: typeof rawBody.utm_term === "string" ? rawBody.utm_term : undefined,
        landing_path: typeof rawBody.landing_path === "string" ? rawBody.landing_path : undefined,
        city: parsed.data.city,
        zip: parsed.data.zip,
        timeline: parsed.data.timeline,
      }),
      sendFbConversionEvent(parsed.data, remoteIp, userAgent).then(() => "FB Ads"),
    ]);

    const failures = results.filter((r) => r.status === "rejected");
    if (failures.length > 0) {
      console.warn(`[quote-api] Some delivery channels failed:`, failures.map(f => (f as PromiseRejectedResult).reason));
    } else {
      console.log("[quote-api] Lead delivered successfully to all configured channels.");
    }

    const managerResult = results[2];
    if (managerResult.status === "fulfilled") {
      if (!managerResult.value.forwarded) {
        console.warn("[quote-api] Manager App delivery skipped or failed:", managerResult.value);
      } else {
        console.log("[quote-api] Lead forwarded to Manager App:", {
          status: managerResult.value.status,
          leadId: managerResult.value.leadId ?? "unknown",
        });
      }
    }

    return NextResponse.json({
      ok: true,
      message: "Thanks. Your request was sent. We will contact you shortly.",
    });
  } catch (err) {
    console.error("[quote-api] Fatal error in POST handler:", err);
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please call us directly." },
      { status: 500 },
    );
  }
}
