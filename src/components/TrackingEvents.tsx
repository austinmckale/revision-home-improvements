"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
  }
}

function emit(eventName: string) {
  window.gtag?.("event", eventName);
  window.dataLayer?.push({ event: eventName });
}

function emitWithParams(eventName: string, params: Record<string, unknown>) {
  window.gtag?.("event", eventName, params);
  window.dataLayer?.push({ event: eventName, ...params });
}

function fbTrack(eventName: string) {
  window.fbq?.("track", eventName);
}

export default function TrackingEvents() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";

      if (href.startsWith("tel:")) {
        emit("click_to_call");
        return;
      }

      if (href.startsWith("/projects/") || href.includes("/projects/")) {
        emitWithParams("case_study_click", {
          link_url: href,
          link_text: anchor.textContent?.trim().slice(0, 120) ?? "",
        });
        return;
      }

      if (href === "/insurance-claims" || href.startsWith("/insurance-claims")) {
        emit("insurance_claims_click");
      }
    };

    const onLead = () => {
      emit("generate_lead");
      fbTrack("Lead");
    };
    const onStep1Complete = (event: Event) => {
      const detail = (event as CustomEvent<Record<string, unknown>>).detail || {};
      emitWithParams("quote_step_1_complete", detail);
    };
    const onServiceSelected = (event: Event) => {
      const detail = (event as CustomEvent<Record<string, unknown>>).detail || {};
      emitWithParams("quote_service_selected", detail);
    };
    const onEmergencySelected = (event: Event) => {
      const detail = (event as CustomEvent<Record<string, unknown>>).detail || {};
      emitWithParams("quote_emergency_selected", detail);
    };
    const onSubmitAttempt = (event: Event) => {
      const detail = (event as CustomEvent<Record<string, unknown>>).detail || {};
      emitWithParams("quote_submit_attempt", detail);
    };
    const onSubmitError = (event: Event) => {
      const detail = (event as CustomEvent<Record<string, unknown>>).detail || {};
      emitWithParams("quote_submit_error", detail);
    };
    const onStepBack = () => emit("quote_step_back");
    const onStickyCta = (event: Event) => {
      const detail = (event as CustomEvent<Record<string, unknown>>).detail || {};
      emitWithParams("sticky_cta_click", detail);
    };
    const onScrollToForm = (event: Event) => {
      const detail = (event as CustomEvent<Record<string, unknown>>).detail || {};
      emitWithParams("scroll_to_form", detail);
    };
    const onFormStart = (event: Event) => {
      const detail = (event as CustomEvent<Record<string, unknown>>).detail || {};
      emitWithParams("form_start", detail);
    };
    const onProjectGalleryOpen = (event: Event) => {
      const detail = (event as CustomEvent<Record<string, unknown>>).detail || {};
      emitWithParams("project_gallery_open", detail);
    };

    document.addEventListener("click", onClick);
    window.addEventListener("rhi:generate_lead", onLead);
    window.addEventListener("rhi:quote_step_1_complete", onStep1Complete);
    window.addEventListener("rhi:quote_service_selected", onServiceSelected);
    window.addEventListener("rhi:quote_emergency_selected", onEmergencySelected);
    window.addEventListener("rhi:quote_submit_attempt", onSubmitAttempt);
    window.addEventListener("rhi:quote_submit_error", onSubmitError);
    window.addEventListener("rhi:quote_step_back", onStepBack);
    window.addEventListener("rhi:sticky_cta_click", onStickyCta);
    window.addEventListener("rhi:scroll_to_form", onScrollToForm);
    window.addEventListener("rhi:form_start", onFormStart);
    window.addEventListener("rhi:project_gallery_open", onProjectGalleryOpen);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("rhi:generate_lead", onLead);
      window.removeEventListener("rhi:quote_step_1_complete", onStep1Complete);
      window.removeEventListener("rhi:quote_service_selected", onServiceSelected);
      window.removeEventListener("rhi:quote_emergency_selected", onEmergencySelected);
      window.removeEventListener("rhi:quote_submit_attempt", onSubmitAttempt);
      window.removeEventListener("rhi:quote_submit_error", onSubmitError);
      window.removeEventListener("rhi:quote_step_back", onStepBack);
      window.removeEventListener("rhi:sticky_cta_click", onStickyCta);
      window.removeEventListener("rhi:scroll_to_form", onScrollToForm);
      window.removeEventListener("rhi:form_start", onFormStart);
      window.removeEventListener("rhi:project_gallery_open", onProjectGalleryOpen);
    };
  }, []);

  return null;
}
