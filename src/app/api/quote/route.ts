import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { quoteSchema } from "@/lib/quoteSchema";

async function verifyTurnstile(token: string, ip?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);
  if (ip) {
    formData.append("remoteip", ip);
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) return false;
  const data = (await response.json()) as { success?: boolean };
  return !!data.success;
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
  const to = process.env.EMAIL_TO;
  const from = process.env.EMAIL_FROM || user;

  if (!host || !user || !pass || !to || !from) {
    return { delivered: false, reason: "missing_smtp_config" as const };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const subject = `New Quote Request — ${String(payload.name || "Lead")} (${String(payload.service || "Service TBD")})`;
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

  await transporter.sendMail({
    from,
    to,
    replyTo: payload.email ? String(payload.email) : undefined,
    subject,
    text: body.join("\n"),
  });

  return { delivered: true as const };
}

function getManagerAppUrl() {
  if (process.env.MANAGER_APP_URL) return process.env.MANAGER_APP_URL;
  return process.env.NODE_ENV === "production" ? "https://app.rhipros.com" : "http://localhost:3001";
}

async function forwardToManagerApp(payload: Record<string, unknown>) {
  const managerUrl = getManagerAppUrl();
  const apiKey = process.env.LEAD_INGEST_API_KEY;
  if (!apiKey) {
    console.warn("[lead-intake] Skipped: set LEAD_INGEST_API_KEY on the site (same value as Manager App) to forward leads.");
    return;
  }

  const externalRef = `siteform-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
  const addressParts = [payload.city, payload.zip].filter(Boolean).map(String);
  const address = addressParts.length > 0 ? addressParts.join(", ") : undefined;

  try {
    const intakeUrl = `${managerUrl}/api/leads/intake`;
    const res = await fetch(intakeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-lead-intake-key": apiKey,
      },
      body: JSON.stringify({
        externalRef,
        contactName: payload.name,
        phone: payload.phone,
        email: payload.email,
        address: address || undefined,
        serviceType: payload.service,
        source: "website_form",
        notes: payload.details,
        utm_source: payload.utm_source ?? undefined,
        utm_medium: payload.utm_medium ?? undefined,
        utm_campaign: payload.utm_campaign ?? undefined,
        utm_content: payload.utm_content ?? undefined,
        utm_term: payload.utm_term ?? undefined,
        landing_path: payload.landing_path ?? undefined,
        city: payload.city,
        zip: payload.zip,
        timeline: payload.timeline,
      }),
    });
    const text = await res.text();
    if (!res.ok) {
      console.warn("[lead-intake] failed:", res.status, intakeUrl, text);
    } else {
      try {
        const data = JSON.parse(text || "{}") as { leadId?: string };
        console.log("[lead-intake] forwarded to Manager App:", res.status, data.leadId ?? "ok");
      } catch {
        console.log("[lead-intake] forwarded to Manager App:", res.status);
      }
    }
  } catch (err) {
    console.warn("[lead-intake] request error:", err);
  }
}

async function sendFbConversionEvent(payload: Record<string, unknown>, ip?: string, ua?: string) {
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  const token = process.env.FB_CONVERSIONS_API_TOKEN;
  if (!pixelId || !token) return;

  try {
    await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events`, {
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
  } catch (err) {
    console.warn("FB CAPI event failed:", err);
  }
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
    const turnstileOk = await verifyTurnstile(parsed.data["cf-turnstile-response"] || "", remoteIp);
    if (!turnstileOk) {
      return NextResponse.json(
        {
          ok: false,
          message: "Spam check failed. Please try again or call us directly.",
        },
        { status: 400 },
      );
    }

    console.log("New quote request:", parsed.data);

    await Promise.allSettled([
      sendLeadWebhook(parsed.data),
      sendLeadEmail(parsed.data),
      forwardToManagerApp(parsed.data),
      sendFbConversionEvent(parsed.data, remoteIp, userAgent),
    ]);

    return NextResponse.json({
      ok: true,
      message: "Thanks. Your request was sent. We will contact you shortly.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please call us directly." },
      { status: 500 },
    );
  }
}
