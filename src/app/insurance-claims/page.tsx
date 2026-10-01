import PageIntro from "@/components/sections/PageIntro";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/JsonLd";
import { locations } from "@/content/locations";
import { siteConfig } from "@/content/site";
import { insuranceClaimsClarification } from "@/content/restoration";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Insurance Claim Remodeling Support | Reading PA & Lehigh Valley",
  description:
    "Need help with claim-related repair scope? We support insurance-backed remodeling and restoration work across Reading, Berks County, and the Lehigh Valley.",
  alternates: { canonical: "/insurance-claims" },
};

export default function InsuranceClaimsPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Insurance Claims", href: "/insurance-claims" },
        ])}
      />
      <PageIntro eyebrow="Restoration, clearly documented" title="Insurance claims assistance.">
        <p>
          Claim-driven projects need clean documentation, disciplined scope writing, and predictable communication. That
          is where we focus.
        </p>
      </PageIntro>
      <section className="support-content py-12 sm:py-20">
        <Container className="max-w-5xl">
          <p className="text-sm leading-relaxed text-[var(--muted)]">{insuranceClaimsClarification}</p>

          <div className="surface mt-6 rounded-sm border-[var(--brand)] p-6">
            <h2 className="heading-serif text-3xl text-[var(--accent)]">Urgent damage situation?</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Call to discuss the damage, your location and current availability. Confirm any immediate safety or
              mitigation needs with the appropriate emergency or specialist service before planning reconstruction.
            </p>
            <Button href={siteConfig.phoneHref} className="mt-4">
              Call {siteConfig.phoneDisplay}
            </Button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="surface rounded-sm p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">Document</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Capture damage details and immediate priorities for claim communication.
              </p>
            </article>
            <article className="surface rounded-sm p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">Scope</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Build a clear repair scope tied to required restoration outcomes.
              </p>
            </article>
            <article className="surface rounded-sm p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">Execute</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Run reconstruction with milestone updates and clean handoff standards.
              </p>
            </article>
          </div>

          <div className="surface mt-6 rounded-sm p-6">
            <h2 className="heading-serif text-3xl text-[var(--accent)]">Support Areas</h2>
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

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-[var(--border)] pt-6 text-sm">
            <Link href="/services" className="font-semibold text-[var(--brand)]">
              All Services
            </Link>
            <Link href="/our-process" className="font-semibold text-[var(--brand)]">
              Our Process
            </Link>
            <Link href="/projects" className="font-semibold text-[var(--brand)]">
              See Our Work
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
