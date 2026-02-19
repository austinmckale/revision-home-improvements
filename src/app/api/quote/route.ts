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
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  if (!webhookUrl) return;

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
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
    await sendLeadWebhook(parsed.data);

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
