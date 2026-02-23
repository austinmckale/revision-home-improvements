import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Financing",
  description:
    "Financing options for qualified home improvement projects in Reading, Berks County, and Lehigh Valley with clear disclosure terms.",
};

export default function FinancingPage() {
  return (
    <section className="py-14">
      <Container className="max-w-4xl">
        <h1 className="text-4xl font-extrabold text-[var(--accent)]">Project Financing</h1>
        <p className="mt-4 text-[var(--muted)]">
          Financing can reduce upfront pressure and help you move forward with needed work sooner.
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
        <div className="surface mt-6 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-[var(--accent)]">How to get started</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-[var(--muted)]">
            <li>Submit your quote request and share project goals.</li>
            <li>Review scope and financing eligibility with our team.</li>
            <li>Choose a schedule that fits your plan.</li>
          </ol>
          <Link href="/request-a-quote" className="mt-4 inline-block text-sm font-semibold text-[var(--brand)]">
            Start with a quote request
          </Link>
        </div>
        <div className="surface mt-6 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-[var(--accent)]">Financing-focused project planning</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)]">
            <li>Prioritize the most urgent scope first</li>
            <li>Split optional upgrades into phase-two options when helpful</li>
            <li>Align project schedule with approval timelines</li>
            <li>Maximize value for price with scope options that match your budget goals</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button href="/request-a-quote">Request financing-ready quote</Button>
            <Button href={siteConfig.phoneHref} variant="secondary">
              Call {siteConfig.phoneDisplay}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
