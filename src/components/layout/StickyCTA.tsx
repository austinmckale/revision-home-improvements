"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";

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
    return { label: "Call to Discuss Availability", mode: "phone" as const };
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
  const [formInView, setFormInView] = useState({ pathname: "", visible: false });
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 240);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const form = document.getElementById("quote-form-section");
    const observer = new IntersectionObserver(([entry]) => setFormInView({ pathname, visible: entry.isIntersecting }), {
      rootMargin: "-88px 0px -100px 0px",
    });
    if (form) observer.observe(form);
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [pathname]);

  // Hide on dedicated quote page and homepage
  if (
    !visible ||
    (formInView.pathname === pathname && formInView.visible) ||
    pathname === "/request-a-quote" ||
    pathname.endsWith("/quote") ||
    pathname === "/"
  )
    return null;

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
        const heading = form.querySelector<HTMLElement>("h2[tabindex='-1']");
        heading?.focus({ preventScroll: true });
        form.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          block: "start",
        });
        emitEvent("scroll_to_form", { service: serviceSlug, page: pathname });
        return;
      }
      // Fallback: no form on page, navigate to quote page with service context
      const projectQuoteHref = document.querySelector<HTMLElement>("[data-quote-href]")?.dataset.quoteHref;
      if (projectQuoteHref) {
        window.location.href = projectQuoteHref;
        return;
      }
      const pathService = pathname.startsWith("/services/")
        ? pathname.replace("/services/", "")
        : pathname.split("/").pop() || "";
      window.location.href = pathService
        ? `/request-a-quote?service=${encodeURIComponent(pathService)}`
        : "/request-a-quote";
    }
    // Phone mode is handled by the <a> tag below
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-[var(--surface)]/95 px-3 pb-[env(safe-area-inset-bottom,8px)] pt-2.5 shadow-[0_-10px_30px_rgba(30,42,34,.08)] backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-7xl flex-col gap-1.5">
        {mode === "phone" ? (
          <a
            href={siteConfig.phoneHref}
            onClick={handleClick}
            className="block min-h-12 bg-[var(--brand)] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
          >
            {label}
          </a>
        ) : (
          <button
            type="button"
            onClick={handleClick}
            className="block min-h-12 w-full bg-[var(--brand)] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
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
