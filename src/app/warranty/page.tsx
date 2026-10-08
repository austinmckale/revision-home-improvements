import PageIntro from "@/components/sections/PageIntro";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";
import { siteConfig } from "@/content/site";
import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata({
  title: "Workmanship Warranty",
  description:
    "RHI Pros workmanship warranty: what your warranty terms cover, typical exclusions, and how to report a concern about your project.",
  path: "/warranty",
});

const covered = [
  "Which workmanship defects are covered, and for how long",
  "How corrections to finishes we installed are handled",
  "How items noted at the final walkthrough are completed",
  "Manufacturer warranties, product registration and claim contacts",
];

const excluded = [
  "Normal wear and tear, or damage after handoff",
  "Later changes, skipped maintenance or pre-existing conditions",
];

const steps = [
  { title: "Report", copy: "Call or email with your project address, a short description and a few photos." },
  { title: "Review", copy: "We review the issue against your terms and visit if we need to see it in person." },
  { title: "Resolve", copy: "If it is covered, we schedule the correction and confirm the result with you." },
];

export default function WarrantyPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Warranty", href: "/warranty" },
        ])}
      />
      <PageIntro eyebrow="Warranty" title="Our workmanship warranty.">
        <p>
          Our standard workmanship warranty is <strong>12 months</strong>. The exact coverage, start date and exclusions
          are written into your proposal before work begins, along with any manufacturer warranties.
        </p>
      </PageIntro>
      <section className="py-14 sm:py-20">
        <Container className="max-w-5xl">
          <div className="grid gap-10 md:grid-cols-2 md:gap-14">
            <div className="border-t border-[var(--accent)] pt-6">
              <h2 className="heading-serif text-3xl text-[var(--accent)]">What your terms spell out</h2>
              <ul className="mt-5 space-y-3 text-[var(--muted)]">
                {covered.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-3 h-px w-3 shrink-0 bg-[var(--brand)]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-[var(--border)] pt-6">
              <h2 className="heading-serif text-3xl text-[var(--accent)]">Typical exclusions</h2>
              <ul className="mt-5 space-y-3 text-[var(--muted)]">
                {excluded.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-3 h-px w-3 shrink-0 bg-[var(--border)]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-[var(--muted)]">Your proposal lists the exclusions that apply to your project.</p>
            </div>
          </div>

          <h2 className="heading-serif mt-16 text-3xl text-[var(--accent)] sm:text-4xl">If something needs attention.</h2>
          <ol className="mt-8 border-t border-[var(--accent)]">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="grid gap-2 border-b border-[var(--border)] py-6 sm:grid-cols-[3rem_10rem_1fr] sm:items-baseline sm:gap-6"
              >
                <span className="font-mono text-xs tracking-[.15em] text-[var(--brand)]">0{index + 1}</span>
                <h3 className="heading-serif text-2xl text-[var(--accent)]">{step.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--muted)] sm:text-base">{step.copy}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-[var(--muted)]">
            Questions about the warranty? Call{" "}
            <a href={siteConfig.phoneHref} className="font-semibold text-[var(--brand)] underline-offset-4 hover:underline">
              {siteConfig.phoneDisplay}
            </a>{" "}
            or email{" "}
            <a
              href={`mailto:${siteConfig.primaryEmail}`}
              className="font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
            >
              {siteConfig.primaryEmail}
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
