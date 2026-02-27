import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/JsonLd";
import { locations } from "@/content/locations";
import { siteConfig } from "@/content/site";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Insurance Claims Assistance",
  description:
    "Need help with claim-related repair scope? Revision Home Improvements supports insurance-backed remodeling and restoration work.",
  alternates: { canonical: "/insurance-claims" },
};

export default function InsuranceClaimsPage() {
  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Insurance Claims", href: "/insurance-claims" }])} />
      <section className="py-14">
        <Container className="max-w-4xl">
          <h1 className="text-4xl font-extrabold text-[var(--accent)]">Insurance Claims Assistance</h1>
          <p className="mt-4 text-[var(--muted)]">
            Claim-driven projects need clean documentation, disciplined scope writing, and predictable communication. That is where we focus.
          </p>

          <div className="surface mt-6 rounded-2xl border-[var(--brand)] p-6">
            <h2 className="text-2xl font-semibold text-[var(--accent)]">Urgent damage situation?</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Call first for immediate scheduling guidance. We can support both emergency planning and full rebuild execution.
            </p>
            <Button href={siteConfig.phoneHref} className="mt-4">
              Call {siteConfig.phoneDisplay}
            </Button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="surface rounded-2xl p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">Document</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">Capture damage details and immediate priorities for claim communication.</p>
            </article>
            <article className="surface rounded-2xl p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">Scope</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">Build a clear repair scope tied to required restoration outcomes.</p>
            </article>
            <article className="surface rounded-2xl p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">Execute</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">Run reconstruction with milestone updates and clean handoff standards.</p>
            </article>
          </div>

          <div className="surface mt-6 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-[var(--accent)]">Support Areas</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {locations.map((location) => (
                <Link
                  key={location.slug}
                  href={`/${location.slug}/insurance-claims`}
                  className="rounded-lg border border-[var(--border)] p-3 text-sm hover:border-[var(--brand)]"
                >
                  Insurance claim help in {location.name}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button href="/request-a-quote">Request claim support</Button>
              <Button href="/fire-water-damage-restoration" variant="secondary">
                Fire + water restoration page
              </Button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href="/services" className="font-semibold text-[var(--brand)]">All Services</Link>
            <Link href="/our-process" className="font-semibold text-[var(--brand)]">Our Process</Link>
            <Link href="/projects" className="font-semibold text-[var(--brand)]">See Our Work</Link>
          </div>
        </Container>
      </section>
    </>
  );
}
