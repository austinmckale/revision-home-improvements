import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/JsonLd";
import BottomCTA from "@/components/sections/BottomCTA";
import TestimonialStrip from "@/components/sections/TestimonialStrip";
import ServiceHero from "@/components/sections/ServiceHero";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";
import { getPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/content/site";
import { company } from "@/content/company";
import { getFeaturedTestimonials } from "@/content/testimonials";

export const metadata: Metadata = getPageMetadata({
  title: "About Us | Lehigh Valley & Berks County Contractor",
  description:
    "Learn about RHI Pros and RHI Solutions LLC, serving Reading, Berks County and the Lehigh Valley. Find contact details, scope guidance and PA HIC information.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ])}
      />
      <ServiceHero
        eyebrow={`About RHI Pros · ${siteConfig.serviceAreas}`}
        title="Built on clarity, delivered with care."
        intro="A renovation starts with understanding the space, agreeing on the scope and knowing the next step. Discuss your priorities with RHI Pros, then review the work, schedule and responsibilities in a written proposal."
        image={{
          src: "/images/projects/frontier-patio-gable-roof/after/angle-1.jpg",
          alt: "Front view of a gable-roof pavilion, patio, and planted garden edges beside a house.",
        }}
        primaryHref="/request-a-quote"
        primaryLabel="Request a quote"
        secondaryHref={siteConfig.phoneHref}
        secondaryLabel={`Call ${siteConfig.phoneDisplay}`}
      />

      <section className="py-14">
        <Container className="max-w-5xl">
          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="heading-serif text-3xl text-[var(--accent)]">About RHI Pros</h2>
              <p className="mt-4 leading-relaxed text-[var(--muted)]">
                RHI Pros offers remodeling and reconstruction services across {company.serviceAreas}. Our legal company
                name is {company.legalName}, with PA HIC registration number {company.license.hic}.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                Request current registration and insurance documentation when discussing your project, and review the
                written warranty terms included in your proposal.
              </p>
              <Link
                href="/licenses-and-insurance"
                className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--brand)] underline underline-offset-4"
              >
                Registration &amp; insurance documents
              </Link>
            </div>
            <div className="surface rounded-sm p-5">
              <h3 className="font-semibold text-[var(--accent)]">Talk about your project</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Share your location, the space you want to change and any photos or plans you already have.
              </p>
              <div className="mt-4 flex flex-col items-start gap-2 text-sm font-semibold text-[var(--brand)]">
                <a href={company.phone.href} className="inline-flex min-h-11 items-center underline underline-offset-4">
                  {company.phone.display}
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex min-h-11 items-center break-all underline underline-offset-4"
                >
                  {company.email}
                </a>
                <Link
                  href="/request-a-quote"
                  className="inline-flex min-h-11 items-center underline underline-offset-4"
                >
                  Send your project details
                </Link>
              </div>
            </div>
          </div>

          <h2 className="mt-10 heading-serif text-3xl text-[var(--accent)]">Planning around your priorities</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <article className="surface rounded-sm p-5">
              <h3 className="font-semibold text-[var(--accent)]">Homeowners Who Value Transparency</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Review the proposed work, assumptions and exclusions so you can compare options before deciding.
              </p>
            </article>
            <article className="surface rounded-sm p-5">
              <h3 className="font-semibold text-[var(--accent)]">Families Balancing Budget and Quality</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Compare the finishes you want with the preparation and repairs the space needs. Discuss your budget and
                which priorities belong in the proposed scope.
              </p>
            </article>
            <article className="surface rounded-sm p-5">
              <h3 className="font-semibold text-[var(--accent)]">Property Owners Facing Damage</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                After immediate safety and stabilization needs are addressed, discuss the repair scope, documentation
                and reconstruction plan. Confirm any specialist work and responsibilities separately.
              </p>
            </article>
          </div>

          <h2 className="mt-10 heading-serif text-3xl text-[var(--accent)]">What to settle before construction</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <article className="surface rounded-lg p-5">
              <h3 className="font-semibold text-[var(--accent)]">Scope Before Demo</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Review the written proposal, material selections, responsibilities and exclusions before approving the
                work. Discuss how any changes will be documented and approved.
              </p>
            </article>
            <article className="surface rounded-lg p-5">
              <h3 className="font-semibold text-[var(--accent)]">Milestone Communication</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Agree on your project contact, when to expect progress updates and which decisions need your input.
                Discuss any scheduling changes as the work develops.
              </p>
            </article>
            <article className="surface rounded-lg p-5">
              <h3 className="font-semibold text-[var(--accent)]">Budget Priorities</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                A proposal may include both visible finishes and necessary preparation or concealed repairs. Compare
                those costs and choices against how you want the space to function.
              </p>
            </article>
            <article className="surface rounded-lg p-5">
              <h3 className="font-semibold text-[var(--accent)]">Clean Closeout</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Confirm the final walkthrough, how remaining items will be tracked and the written warranty terms that
                apply at handoff.
              </p>
            </article>
          </div>

          <div className="surface mt-8 rounded-sm p-5 text-center">
            <p className="text-sm text-[var(--muted)]">
              <span className="font-semibold text-[var(--accent)]">{siteConfig.hicNumber}</span> · PA HIC registration
              number · Discuss registration, insurance and written warranty terms
            </p>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            <Link href="/our-process" className="font-semibold text-[var(--brand)]">
              Our Process
            </Link>
            <Link href="/warranty" className="font-semibold text-[var(--brand)]">
              Workmanship Warranty
            </Link>
            <Link href="/licenses-and-insurance" className="font-semibold text-[var(--brand)]">
              Registration &amp; Insurance
            </Link>
            <Link href="/projects" className="font-semibold text-[var(--brand)]">
              See Our Work
            </Link>
          </div>

          <TestimonialStrip items={getFeaturedTestimonials()} title="Independent company reviews" />
        </Container>
      </section>

      <BottomCTA
        title="Let's talk about your project"
        description="Whether it's a planned remodel or an urgent repair, we'll walk you through scope, timeline, and next steps."
        links={[
          { href: "/services", label: "Browse Services" },
          { href: "/service-areas", label: "Find Your Area" },
        ]}
      />
    </>
  );
}
