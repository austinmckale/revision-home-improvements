import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/JsonLd";
import BottomCTA from "@/components/sections/BottomCTA";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Remodeling Financing Options | Reading PA & Lehigh Valley",
  description:
    "Financing options for qualified homeowners in Reading, Berks County, and the Lehigh Valley. Clear terms and quick next steps.",
  alternates: { canonical: "/financing" },
};

export default function FinancingPage() {
  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Financing", href: "/financing" }])} />
    <section className="py-14">
      <Container className="max-w-4xl">
        <h1 className="text-4xl font-extrabold text-[var(--accent)]">Project Financing</h1>
        <p className="mt-4 text-[var(--muted)]">
          Don&apos;t let budget hold back the project your home needs. We offer promotional financing options so you can get started now and pay over time.
        </p>

        <div className="surface mt-6 rounded-2xl border-2 border-[var(--brand)] p-6">
          <h2 className="text-2xl font-semibold text-[var(--accent)]">Promotional Financing Options</h2>
          <p className="mt-2 text-[var(--muted)]">
            {siteConfig.financing.teaser} {siteConfig.financing.disclosure}
          </p>
          <Link href="/financing-terms" className="mt-3 inline-block text-sm font-semibold text-[var(--brand)]">
            Review financing terms and disclosures
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="surface rounded-2xl p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">Define Your Scope</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">Define your must-have scope and timeline.</p>
          </article>
          <article className="surface rounded-2xl p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">Review Options</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">Review financing eligibility and payment structure options.</p>
          </article>
          <article className="surface rounded-2xl p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">Lock Your Schedule</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">Lock schedule and execution plan based on approved terms.</p>
          </article>
        </div>

        <div className="surface mt-6 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-[var(--accent)]">Financing-Ready Scope Planning</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)]">
            <li>Separate critical work from optional upgrades.</li>
            <li>Prioritize durability-first items that protect long-term value.</li>
            <li>Sequence phases so approvals and install timing stay aligned.</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button href="/request-a-quote">Request financing-ready quote</Button>
            <Button href={siteConfig.phoneHref} variant="secondary">
              Call {siteConfig.phoneDisplay}
            </Button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link href="/services" className="font-semibold text-[var(--brand)]">Browse Services</Link>
          <Link href="/our-process" className="font-semibold text-[var(--brand)]">Our Process</Link>
          <Link href="/projects" className="font-semibold text-[var(--brand)]">See Our Work</Link>
        </div>
      </Container>
    </section>

      <BottomCTA
        title="Ready to explore financing for your project?"
        description="Request a quote and we will include financing options alongside your scope and estimate."
        showFinancing={false}
      />
    </>
  );
}
