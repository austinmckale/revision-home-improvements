import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Financing Terms",
  description:
    "Review financing disclosures, approval conditions, and program variability for Revision Home Improvements projects.",
  alternates: { canonical: "/financing-terms" },
};

export default function FinancingTermsPage() {
  return (
    <section className="py-14">
      <Container className="max-w-4xl">
        <h1 className="text-4xl font-extrabold text-[var(--accent)]">Financing Terms and Disclosures</h1>
        <p className="mt-4 text-[var(--muted)]">
          Financing programs may be available for qualified customers and are offered through third-party lenders.
        </p>

        <div className="surface mt-6 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-[var(--accent)]">Important Financing Information</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)]">
            <li>{siteConfig.financing.disclosure}</li>
            <li>Not all applicants qualify for promotional programs.</li>
            <li>Final financing terms are determined by lender underwriting and agreement details.</li>
            <li>Project scope changes can affect final financing requirements.</li>
          </ul>
        </div>

        <div className="surface mt-6 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-[var(--accent)]">How to Confirm Eligibility</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-[var(--muted)]">
            <li>Submit your project request with scope and timeline goals.</li>
            <li>Review options and documentation requirements with our team.</li>
            <li>Complete lender review to confirm available terms.</li>
          </ol>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/request-a-quote">Request a Financing-Ready Quote</Button>
          <Button href={siteConfig.phoneHref} variant="secondary">
            Call {siteConfig.phoneDisplay}
          </Button>
        </div>
      </Container>
    </section>
  );
}
