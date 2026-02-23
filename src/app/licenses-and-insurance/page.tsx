import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Licenses and Insurance",
  description:
    "Review Revision Home Improvements licensing and insurance verification process for remodeling and restoration projects in Pennsylvania.",
  alternates: { canonical: "/licenses-and-insurance" },
};

export default function LicensesAndInsurancePage() {
  return (
    <section className="py-14">
      <Container className="max-w-4xl">
        <h1 className="text-4xl font-extrabold text-[var(--accent)]">Licenses and Insurance</h1>
        <p className="mt-4 text-[var(--muted)]">
          We provide licensing and insurance documentation as part of project onboarding so homeowners can move forward with confidence.
        </p>

        <div className="surface mt-6 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-[var(--accent)]">Documentation Available</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)]">
            <li>Business identification and applicable registration details.</li>
            <li>Insurance certificate information for covered project operations.</li>
            <li>Project proposal documentation tied to approved scope.</li>
          </ul>
        </div>

        <div className="surface mt-6 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-[var(--accent)]">Verification Process</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-[var(--muted)]">
            <li>Request verification during estimate review.</li>
            <li>Receive documentation aligned with your project scope.</li>
            <li>Confirm requirements before scheduling start date.</li>
          </ol>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/request-a-quote">Request a Quote</Button>
          <Button href={siteConfig.phoneHref} variant="secondary">
            Call {siteConfig.phoneDisplay}
          </Button>
        </div>
      </Container>
    </section>
  );
}
