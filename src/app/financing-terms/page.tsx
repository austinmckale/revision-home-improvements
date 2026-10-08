import PageIntro from "@/components/sections/PageIntro";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/content/site";
import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata({
  title: "Financing Terms & Disclosures",
  description: "Review financing disclosures, approval conditions, and program variability for RHI Pros projects.",
  path: "/financing-terms",
});

export default function FinancingTermsPage() {
  return (
    <>
      <PageIntro eyebrow="Project financing" title="Terms & disclosures." />
      <section className="support-content py-12 sm:py-20">
        <Container className="max-w-4xl">
          <p className="mt-4 text-[var(--muted)]">
            Financing programs may be available for qualified customers and are offered through third-party lenders.
          </p>

          <div className="surface mt-6 rounded-sm p-6">
            <h2 className="heading-serif text-3xl text-[var(--accent)]">Important information</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)]">
              <li>{siteConfig.financing.disclosure}</li>
              <li>Not all applicants qualify for promotional programs.</li>
              <li>Final financing terms are determined by lender underwriting and agreement details.</li>
              <li>Changes to the project can affect final financing requirements.</li>
            </ul>
          </div>

          <div className="surface mt-6 rounded-sm p-6">
            <h2 className="heading-serif text-3xl text-[var(--accent)]">How to check eligibility</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-[var(--muted)]">
              <li>Send your project details and timing.</li>
              <li>Review the options and any paperwork with our team.</li>
              <li>Complete lender review to confirm available terms.</li>
            </ol>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/request-a-quote">Request a quote</Button>
            <Button href={siteConfig.phoneHref} variant="secondary">
              Call {siteConfig.phoneDisplay}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
