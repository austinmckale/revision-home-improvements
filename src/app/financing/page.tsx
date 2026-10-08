import PageIntro from "@/components/sections/PageIntro";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/JsonLd";
import BottomCTA from "@/components/sections/BottomCTA";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";
import { siteConfig } from "@/content/site";
import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata({
  title: "Project Financing | Allentown, Lehigh Valley & Berks County",
  description:
    "Ask about financing for remodeling and repairs in the Lehigh Valley and Berks County. Offered through third-party lenders and subject to approval.",
  path: "/financing",
});

const steps = [
  {
    title: "Tell us about the project",
    copy: "We separate the must-haves from optional upgrades, so the quote reflects your priorities.",
  },
  {
    title: "Review your options",
    copy: "We walk you through the financing options available alongside your proposal.",
  },
  {
    title: "Apply and schedule",
    copy: "Once the lender confirms your terms and the proposal is agreed, we set the schedule.",
  },
];

const budgetTips = [
  "Put essential work first and optional upgrades second",
  "Spend on durable materials where they matter most",
  "Phase the work so lender approval and installation line up",
];

export default function FinancingPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Financing", href: "/financing" },
        ])}
      />

      <PageIntro eyebrow="Financing" title="Financing for your project.">
        <p>
          Spread the cost of a remodel or repair. Financing is offered through third-party lenders and is subject to
          approval.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/request-a-quote">Request a quote</Button>
          <Button href={siteConfig.phoneHref} variant="secondary">
            Call {siteConfig.phoneDisplay}
          </Button>
        </div>
      </PageIntro>

      <section className="py-14 sm:py-20">
        <Container className="max-w-5xl">
          <h2 className="heading-serif text-3xl text-[var(--accent)] sm:text-4xl">How it works.</h2>
          <ol className="mt-8 border-t border-[var(--accent)]">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="grid gap-2 border-b border-[var(--border)] py-6 sm:grid-cols-[3rem_16rem_1fr] sm:items-baseline sm:gap-6"
              >
                <span className="font-mono text-xs tracking-[.15em] text-[var(--brand)]">0{index + 1}</span>
                <h3 className="heading-serif text-2xl text-[var(--accent)]">{step.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--muted)] sm:text-base">{step.copy}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-6 bg-[var(--surface-soft)] p-6 sm:p-8 md:grid-cols-[.8fr_1.2fr] md:gap-12">
            <h2 className="heading-serif text-3xl text-[var(--accent)]">Planning with a budget in mind.</h2>
            <ul className="space-y-3 text-base leading-relaxed text-[var(--muted)]">
              {budgetTips.map((tip) => (
                <li key={tip} className="flex gap-3">
                  <span className="mt-3 h-px w-3 shrink-0 bg-[var(--brand)]" aria-hidden="true" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-[var(--muted)]">
            {siteConfig.financing.disclosure}{" "}
            <Link href="/financing-terms" className="font-semibold text-[var(--brand)] underline-offset-2 hover:underline">
              Financing terms &amp; disclosures
            </Link>
          </p>
        </Container>
      </section>

      <BottomCTA title="Questions about financing?" showFinancing={false} />
    </>
  );
}
