import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Workmanship Warranty | Revision Home Improvements",
  description:
    `Every Revision Home Improvements project includes a ${siteConfig.warrantyYears}-year workmanship warranty. See what is covered and how to request service.`,
  alternates: { canonical: "/warranty" },
};

export default function WarrantyPage() {
  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Warranty", href: "/warranty" }])} />
      <section className="py-14">
        <Container className="max-w-4xl">
          <h1 className="text-4xl font-extrabold text-[var(--accent)]">{siteConfig.warrantyYears}-Year Workmanship Warranty</h1>
          <p className="mt-4 text-[var(--muted)]">
            Every project we complete includes a <strong>{siteConfig.warrantyYears}-year workmanship warranty</strong> covering installation quality and finish standards. Terms are documented in your project proposal before work begins.
          </p>

          <div className="surface mt-6 rounded-2xl border-2 border-[var(--brand)] p-6">
            <h2 className="text-2xl font-semibold text-[var(--accent)]">What Is Covered</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)]">
              <li>Workmanship-related installation defects for <strong>{siteConfig.warrantyYears} years</strong> from project completion</li>
              <li>Finish corrections tied to approved scope and closeout standards</li>
              <li>Punch-list items identified during your final walkthrough</li>
            </ul>
            <h3 className="mt-4 font-semibold text-[var(--accent)]">What Is Not Covered</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
              <li>Normal wear and tear or homeowner-caused damage</li>
              <li>Material manufacturer defects (covered by the manufacturer&apos;s own warranty)</li>
              <li>Issues resulting from unauthorized modifications after project completion</li>
            </ul>
          </div>

          <h2 className="mt-8 text-2xl font-semibold text-[var(--accent)]">How to Report a Warranty Issue</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <article className="surface rounded-2xl p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">Step 1: Report</p>
              <p className="mt-2 text-sm text-[var(--muted)]">Call or email us with your project reference, a description of the issue, and supporting photos.</p>
            </article>
            <article className="surface rounded-2xl p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">Step 2: Review</p>
              <p className="mt-2 text-sm text-[var(--muted)]">We evaluate coverage, review documentation, and schedule an on-site inspection if needed.</p>
            </article>
            <article className="surface rounded-2xl p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">Step 3: Resolve</p>
              <p className="mt-2 text-sm text-[var(--muted)]">If covered, we define correction steps, schedule the work, and confirm completion with you.</p>
            </article>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href="/our-process" className="font-semibold text-[var(--brand)]">Our Process</Link>
            <Link href="/licenses-and-insurance" className="font-semibold text-[var(--brand)]">Licenses &amp; Insurance</Link>
            <Link href="/about" className="font-semibold text-[var(--brand)]">About Us</Link>
          </div>
        </Container>
      </section>

      <section className="pb-14">
        <Container className="max-w-4xl">
          <p className="text-sm text-[var(--muted)]">
            Questions about warranty coverage?{" "}
            <Link href="/request-a-quote" className="font-semibold text-[var(--brand)]">Request a quote</Link> to see warranty details in your proposal, or call <a href={siteConfig.phoneHref} className="font-semibold text-[var(--brand)]">{siteConfig.phoneDisplay}</a>.
          </p>
        </Container>
      </section>
    </>
  );
}
