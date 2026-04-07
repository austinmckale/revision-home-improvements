"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";
import Button from "@/components/ui/Button";

/** Restoration service slugs for emergency CTA labels */
const EMERGENCY_SLUGS = ["fire-damage-restoration", "water-damage-restoration"];

/** Utility / small-scope service slugs */
const UTILITY_SLUGS = ["drywall-installation-repair"];

function getCtaConfig(pathname: string) {
  // Emergency / restoration pages
  if (
    pathname === "/fire-water-damage-restoration" ||
    pathname === "/insurance-claims" ||
    EMERGENCY_SLUGS.some((s) => pathname.includes(s))
  ) {
    return { label: "Call for Priority Scheduling", mode: "phone" as const };
  }

  // Utility / small-scope
  if (UTILITY_SLUGS.some((s) => pathname.includes(s))) {
    return { label: "Schedule a Repair", mode: "scroll" as const };
  }

  // Default: remodeling (visual or technical)
  return { label: "Get a Written Quote", mode: "scroll" as const };
}

function emitEvent(name: string, detail?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(`rhi:${name}`, { detail }));
}

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 240);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide on dedicated quote page and homepage
  if (!visible || pathname === "/request-a-quote" || pathname === "/") return null;

  const { label, mode } = getCtaConfig(pathname);

  const handleClick = () => {
    // Derive service identifier from path for analytics
    const serviceSlug = pathname.startsWith("/services/")
      ? pathname.replace("/services/", "")
      : pathname.replace(/^\//, "") || "homepage";

    emitEvent("sticky_cta_click", { label, mode, service: serviceSlug, page: pathname });

    if (mode === "scroll") {
      // Scroll to the on-page quote form
      const form = document.getElementById("quote-form-section");
      if (form) {
        form.scrollIntoView({ behavior: "smooth", block: "start" });
        emitEvent("scroll_to_form", { service: serviceSlug, page: pathname });
        return;
      }
      // Fallback: no form on page, navigate to quote page
      window.location.href = "/request-a-quote";
    }
    // Phone mode is handled by the <a> tag below
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border)] bg-white px-3 pb-[env(safe-area-inset-bottom,8px)] pt-2.5 shadow-lg md:hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-1.5">
        {mode === "phone" ? (
          <a
            href={siteConfig.phoneHref}
            onClick={handleClick}
            className="block rounded-full bg-[var(--brand)] px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-dark)]"
          >
            {label}
          </a>
        ) : (
          <button
            type="button"
            onClick={handleClick}
            className="block w-full rounded-full bg-[var(--brand)] px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-dark)]"
          >
            {label}
          </button>
        )}
        <p className="text-center text-xs text-[var(--muted)]">
          or{" "}
          <a href={siteConfig.phoneHref} className="font-semibold text-[var(--brand)]">
            call {siteConfig.phoneDisplay}
          </a>
        </p>
      </div>
    </div>
  );
}
