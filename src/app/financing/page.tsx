import PageIntro from "@/components/sections/PageIntro";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/JsonLd";
import BottomCTA from "@/components/sections/BottomCTA";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Project Financing | Allentown, Lehigh Valley & Berks County",
  description:
    "Discuss project scope, current financing options, lender approval and payment terms for remodeling in the Lehigh Valley and Berks County.",
  alternates: { canonical: "/financing" },
};

const steps = [
  {
    num: "1",
    title: "Define Your Scope",
    desc: "Tell us what you need done. We separate must-have work from optional upgrades so the quote matches your priorities.",
  },
  {
    num: "2",
    title: "Review Options",
    desc: "We walk you through financing eligibility and payment structure options alongside your written scope.",
  },
  {
    num: "3",
    title: "Confirm Your Schedule",
    desc: "After scope and payment terms are agreed, confirm availability, material lead times and the proposed schedule in writing.",
  },
];

const scopeTips = [
  "Separate critical work from optional upgrades",
  "Prioritize durability-first items that protect long-term value",
  "Sequence phases so approvals and install timing stay aligned",
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

      {/* ── Hero ── */}
      <PageIntro eyebrow="Plan your project" title="Project financing.">
        <p>
          Explore payment options alongside a clear project scope. Financing is subject to lender approval and program
          terms.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/request-a-quote">Request a financing-ready quote</Button>
          <Button href={siteConfig.phoneHref} variant="secondary">
            Call {siteConfig.phoneDisplay}
          </Button>
        </div>
      </PageIntro>

      {/* ── Promo card ── */}
      <section className="support-content py-12 sm:py-20">
        <Container className="max-w-5xl">
          <div className="surface rounded-sm border-2 border-[var(--brand)] p-6">
            <h2 className="heading-serif text-3xl text-[var(--accent)]">Discuss Current Financing Options</h2>
            <p className="mt-2 text-[var(--muted)]">
              {siteConfig.financing.teaser} {siteConfig.financing.disclosure}
            </p>
            <Link
              href="/financing-terms"
              className="mt-3 inline-block text-sm font-semibold text-[var(--brand)] underline-offset-2 hover:underline"
            >
              Review financing terms and disclosures →
            </Link>
          </div>

          {/* ── How it works ── */}
          <h2 className="heading-serif mt-10 text-2xl text-[var(--accent)]">How It Works</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.num} className="surface rounded-sm p-5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-bold text-white">
                  {s.num}
                </span>
                <h3 className="mt-3 text-sm font-semibold text-[var(--accent)]">{s.title}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* ── Scope planning ── */}
          <div className="surface mt-10 rounded-sm p-6">
            <h2 className="heading-serif text-3xl text-[var(--accent)]">Financing-Ready Scope Planning</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              We structure quotes so financing decisions are straightforward:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)]">
              {scopeTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>

          {/* ── Supporting links ── */}
          <nav className="mt-8 flex flex-wrap gap-4 text-sm" aria-label="Related pages">
            <Link href="/services" className="font-semibold text-[var(--brand)] underline-offset-2 hover:underline">
              Browse Services
            </Link>
            <Link href="/our-process" className="font-semibold text-[var(--brand)] underline-offset-2 hover:underline">
              Our Process
            </Link>
            <Link href="/projects" className="font-semibold text-[var(--brand)] underline-offset-2 hover:underline">
              Explore Photo Collections
            </Link>
          </nav>
        </Container>
      </section>

      <BottomCTA
        title="Ready to explore financing for your project?"
        description="Request a quote and ask about current financing options alongside your scope and estimate."
        showFinancing={false}
      />
    </>
  );
}
