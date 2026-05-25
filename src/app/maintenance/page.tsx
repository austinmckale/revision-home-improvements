import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site Under Maintenance | RHI Pros",
  description: "We'll be back shortly. RHI Pros — Lehigh Valley Remodeling & Restoration.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--surface)] px-6 text-center">
      <h1 className="heading-serif text-4xl text-[var(--accent)] md:text-5xl">
        We&rsquo;ll be right back.
      </h1>

      <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-[var(--muted)] md:text-lg">
        Our site is currently down for maintenance. We&rsquo;re making some improvements and will be back up shortly.
      </p>
    </div>
  );
}
