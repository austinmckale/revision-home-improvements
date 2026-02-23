import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { locations } from "@/content/locations";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Insurance Claims Assistance",
  description:
    "Need help with claim-related repair scope? Revision Home Improvements supports insurance-backed remodeling and restoration work.",
};

export default function InsuranceClaimsPage() {
  return (
    <section className="py-14">
      <Container className="max-w-4xl">
        <h1 className="text-4xl font-extrabold text-[var(--accent)]">Insurance Claims Assistance</h1>
        <p className="mt-4 text-[var(--muted)]">
          For fire, water, and related claim-driven projects, we help homeowners with documented scopes and
          restoration-focused planning.
        </p>
        <div className="surface mt-6 rounded-2xl border-[var(--brand)] p-6">
          <h2 className="text-2xl font-semibold text-[var(--accent)]">Urgent damage situation?</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Call first for immediate scheduling guidance. We can help with both emergency planning and full rebuild execution.
          </p>
          <Button href={siteConfig.phoneHref} className="mt-4">
            Call {siteConfig.phoneDisplay}
          </Button>
        </div>
        <div className="surface mt-6 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-[var(--accent)]">Support Areas</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {locations.map((location) => (
              <Link key={location.slug} href={`/${location.slug}/insurance-claims`} className="rounded-lg border border-[var(--border)] p-3 text-sm hover:border-[var(--brand)]">
                Insurance claim help in {location.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="surface mt-6 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-[var(--accent)]">Claim project workflow</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-[var(--muted)]">
            <li>Document damage context and immediate priorities</li>
            <li>Build a clear repair scope for claim communication</li>
            <li>Coordinate reconstruction timeline and project updates</li>
          </ol>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button href="/request-a-quote">Request claim support</Button>
            <Button href={siteConfig.phoneHref} variant="secondary">
              Call {siteConfig.phoneDisplay}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
