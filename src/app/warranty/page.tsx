import PageIntro from "@/components/sections/PageIntro";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Workmanship Warranty",
  description:
    "Discuss workmanship warranty duration, coverage, exclusions and manufacturer terms before work begins. Learn how to report a concern about your project.",
  alternates: { canonical: "/warranty" },
};

export default function WarrantyPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Warranty", href: "/warranty" },
        ])}
      />
      <PageIntro eyebrow="Care beyond completion" title="Understand your warranty terms.">
        <p>
          Discuss a <strong>12-month workmanship warranty</strong>, any applicable manufacturer warranties, and
          exclusions when reviewing your proposal. Confirm the coverage, start date and service process in the written
          project terms before work begins.
        </p>
      </PageIntro>
      <section className="support-content py-12 sm:py-20">
        <Container className="max-w-5xl">
          <div className="surface mt-6 rounded-sm border-2 border-[var(--brand)] p-6">
            <h2 className="heading-serif text-3xl text-[var(--accent)]">Coverage to Confirm</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)]">
              <li>Which workmanship-related installation defects are covered and for how long</li>
              <li>How finish corrections relate to the approved scope and closeout standards</li>
              <li>How punch-list items identified during your final walkthrough are handled</li>
              <li>Manufacturer warranty terms, registration requirements and claim contacts</li>
            </ul>
            <h3 className="mt-4 font-semibold text-[var(--accent)]">Exclusions to Review</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
              <li>How normal wear and tear or homeowner-caused damage affects coverage</li>
              <li>How later modifications, maintenance requirements and existing conditions affect coverage</li>
            </ul>
          </div>

          <h2 className="mt-8 heading-serif text-3xl text-[var(--accent)]">How to Report a Warranty Issue</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <article className="surface rounded-sm p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">Step 1: Report</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Call or email us with your project reference, a description of the issue, and supporting photos.
              </p>
            </article>
            <article className="surface rounded-sm p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">Step 2: Review</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                We evaluate coverage, review documentation, and schedule an on-site inspection if needed.
              </p>
            </article>
            <article className="surface rounded-sm p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">Step 3: Resolve</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                If covered, we define correction steps, schedule the work, and confirm completion with you.
              </p>
            </article>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-[var(--border)] pt-6 text-sm">
            <Link href="/our-process" className="font-semibold text-[var(--brand)]">
              Our Process
            </Link>
            <Link href="/licenses-and-insurance" className="font-semibold text-[var(--brand)]">
              Registration &amp; Insurance
            </Link>
            <Link href="/about" className="font-semibold text-[var(--brand)]">
              About Us
            </Link>
          </div>
        </Container>
      </section>

      <section className="pb-14">
        <Container className="max-w-4xl">
          <p className="text-sm text-[var(--muted)]">
            Questions about warranty coverage?{" "}
            <Link href="/request-a-quote" className="font-semibold text-[var(--brand)]">
              Request a quote
            </Link>{" "}
            to see warranty details in your proposal, or call{" "}
            <a href={siteConfig.phoneHref} className="font-semibold text-[var(--brand)]">
              {siteConfig.phoneDisplay}
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
