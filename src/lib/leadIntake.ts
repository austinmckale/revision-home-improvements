export type LeadSource = "website_form" | "google_ads_lead_form";

export type ManagerLeadIntakeInput = {
  externalRef?: string;
  contactName?: string;
  phone?: string;
  email?: string;
  address?: string;
  serviceType?: string;
  source: LeadSource;
  notes?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_path?: string;
  city?: string;
  zip?: string;
  timeline?: string;
};

type ManagerLeadIntakeResult =
  | { forwarded: true; status: number; leadId?: string }
  | { forwarded: false; reason: "missing_api_key" | "request_error" | "non_2xx"; status?: number; responseText?: string };

function getManagerAppUrl() {
  if (process.env.MANAGER_APP_URL) return process.env.MANAGER_APP_URL;
  return process.env.NODE_ENV === "production" ? "https://app.rhipros.com" : "http://localhost:3001";
}

export async function forwardToManagerAppLead(input: ManagerLeadIntakeInput): Promise<ManagerLeadIntakeResult> {
  const managerUrl = getManagerAppUrl();
  const apiKey = process.env.LEAD_INGEST_API_KEY;
  if (!apiKey) {
    return { forwarded: false, reason: "missing_api_key" };
  }

  const externalRef = input.externalRef ?? `${input.source}-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;

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
        contactName: input.contactName,
        phone: input.phone,
        email: input.email,
        address: input.address,
        serviceType: input.serviceType,
        source: input.source,
        notes: input.notes,
        utm_source: input.utm_source,
        utm_medium: input.utm_medium,
        utm_campaign: input.utm_campaign,
        utm_content: input.utm_content,
        utm_term: input.utm_term,
        landing_path: input.landing_path,
        city: input.city,
        zip: input.zip,
        timeline: input.timeline,
      }),
    });
    const text = await res.text();
    if (!res.ok) {
      return {
        forwarded: false,
        reason: "non_2xx",
        status: res.status,
        responseText: text,
      };
    }

    try {
      const data = JSON.parse(text || "{}") as { leadId?: string };
      return { forwarded: true, status: res.status, leadId: data.leadId };
    } catch {
      return { forwarded: true, status: res.status };
    }
  } catch (err) {
    return {
      forwarded: false,
      reason: "request_error",
      responseText: err instanceof Error ? err.message : String(err),
    };
  }
}
