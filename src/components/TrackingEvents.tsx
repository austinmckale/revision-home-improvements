"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function emit(eventName: string) {
  window.gtag?.("event", eventName);
  window.dataLayer?.push({ event: eventName });
}

export default function TrackingEvents() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href^='tel:']");
      if (anchor) {
        emit("click_to_call");
      }
    };

    const onLead = () => emit("generate_lead");

    document.addEventListener("click", onClick);
    window.addEventListener("rhi:generate_lead", onLead);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("rhi:generate_lead", onLead);
    };
  }, []);

  return null;
}
