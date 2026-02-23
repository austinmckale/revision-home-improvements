import { NextResponse } from "next/server";
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
    const webhookResult = await sendLeadWebhook(parsed.data);
    if (!webhookResult.delivered) {
      console.warn("Lead accepted but webhook not delivered:", webhookResult.reason);
    }

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
