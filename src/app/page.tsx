import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Site Under Maintenance | RHI Pros",
  description: "We'll be back shortly. RHI Pros — Lehigh Valley Remodeling & Restoration.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--surface)] px-6 text-center">
      <div className="mb-8 text-5xl" aria-hidden="true">🔧</div>

      <h1 className="heading-serif text-4xl text-[var(--accent)] md:text-5xl">
        We&rsquo;ll be right back.
      </h1>

      <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-[var(--muted)] md:text-lg">
        Our site is currently down for maintenance. We&rsquo;re making some improvements and will be back up shortly.
      </p>

      <p className="mt-8 text-sm text-[var(--muted)]">
        Need to reach us in the meantime?
      </p>

      <a
        href={siteConfig.phoneHref}
        className="mt-3 inline-flex h-12 items-center justify-center rounded-sm bg-[var(--brand)] px-8 font-semibold text-white transition-colors hover:bg-[var(--brand-dark)]"
      >
        Call {siteConfig.phoneDisplay}
      </a>
    </div>
  );
}
