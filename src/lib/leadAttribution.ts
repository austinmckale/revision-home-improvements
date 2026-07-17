"use client";

export const ATTRIBUTION_STORAGE_KEY = "rhi:lead-attribution";

export type LeadAttribution = {
  traffic_source: string;
  traffic_medium: string;
  landing_page: string;
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  gclid: string;
  fbclid: string;
};

const directAttribution: LeadAttribution = {
  traffic_source: "Direct / Unknown",
  traffic_medium: "direct",
  landing_page: "",
  referrer: "",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
  gclid: "",
  fbclid: "",
};

function getReferrerDomain(referrer: string) {
  try {
    return new URL(referrer).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function getSourceAndMedium(params: URLSearchParams, referrerDomain: string) {
  const utmSource = params.get("utm_source") || "";
  const utmMedium = params.get("utm_medium") || "";
  const utmCampaign = params.get("utm_campaign") || "";
  const gclid = params.get("gclid") || "";
  const fbclid = params.get("fbclid") || "";

  if (utmSource || utmMedium || utmCampaign) {
    return { traffic_source: utmSource || "UTM Campaign", traffic_medium: utmMedium || "utm" };
  }
  if (gclid) return { traffic_source: "Google Ads", traffic_medium: "paid search" };
  if (fbclid) return { traffic_source: "Facebook / Instagram Ads", traffic_medium: "paid social" };
  if (referrerDomain.includes("google")) return { traffic_source: "Google Organic", traffic_medium: "organic" };
  if (referrerDomain.includes("bing")) return { traffic_source: "Bing Organic", traffic_medium: "organic" };
  if (referrerDomain.includes("facebook") || referrerDomain.includes("instagram")) {
    return { traffic_source: "Facebook / Instagram", traffic_medium: "social" };
  }
  if (referrerDomain) return { traffic_source: "Referral", traffic_medium: "referral" };
  return { traffic_source: "Direct / Unknown", traffic_medium: "direct" };
}

function captureAttribution(): LeadAttribution {
  const params = new URLSearchParams(window.location.search);
  const referrerDomain = getReferrerDomain(document.referrer);
  const sourceAndMedium = getSourceAndMedium(params, referrerDomain);

  return {
    ...sourceAndMedium,
    landing_page: window.location.pathname,
    referrer: referrerDomain,
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || "",
    gclid: params.get("gclid") || "",
    fbclid: params.get("fbclid") || "",
  };
}

function isStoredAttribution(value: unknown): value is LeadAttribution {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<LeadAttribution>;
  return (
    typeof candidate.traffic_source === "string" &&
    typeof candidate.traffic_medium === "string" &&
    typeof candidate.landing_page === "string"
  );
}

export function getFirstTouchAttribution(): LeadAttribution {
  if (typeof window === "undefined") return directAttribution;

  try {
    const stored = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (stored) {
      const parsed: unknown = JSON.parse(stored);
      if (isStoredAttribution(parsed)) return { ...directAttribution, ...parsed };
    }

    const attribution = captureAttribution();
    sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));
    return attribution;
  } catch {
    return directAttribution;
  }
}
