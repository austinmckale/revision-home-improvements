import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Workmanship Warranty",
  description:
    "Understand Revision Home Improvements workmanship warranty approach, response process, and closeout standards for remodeling and restoration projects.",
  alternates: { canonical: "/warranty" },
};

export default function WarrantyPage() {
  return (
    <section className="py-14">
      <Container className="max-w-4xl">
        <h1 className="text-4xl font-extrabold text-[var(--accent)]">Workmanship Warranty</h1>
        <p className="mt-4 text-[var(--muted)]">
          We stand behind our workmanship with written project terms. Warranty details are documented in your proposal and final closeout package.
        </p>

        <div className="surface mt-6 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-[var(--accent)]">How Warranty Support Works</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-[var(--muted)]">
            <li>Submit your concern with photos and project details.</li>
            <li>Our team reviews scope and schedules an inspection window.</li>
            <li>If covered, we define correction steps and completion timeline.</li>
          </ol>
        </div>

        <div className="surface mt-6 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-[var(--accent)]">What Is Typically Covered</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)]">
            <li>Workmanship-related installation issues within documented coverage periods.</li>
            <li>Final finish corrections tied to approved scope and closeout standards.</li>
            <li>Defined punch-list items agreed at final walkthrough.</li>
          </ul>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Material manufacturer warranties are handled according to each product brand policy.
          </p>
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
