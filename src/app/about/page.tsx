import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/JsonLd";
import BottomCTA from "@/components/sections/BottomCTA";
import ConfidenceSection from "@/components/sections/ConfidenceSection";
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
    "About RHI Pros (RHI Solutions LLC), a registered Pennsylvania home improvement contractor serving Reading, Berks County and the Lehigh Valley.",
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
        eyebrow="About RHI Pros"
        title="Built on clarity, delivered with care."
        intro={`Remodeling and restoration for homeowners in ${company.serviceAreas}. Every project is planned with you and put in writing before work begins.`}
        image={{
          src: "/images/projects/frontier-patio-gable-roof/after/angle-1.jpg",
          alt: "Front view of a gable-roof pavilion, patio, and planted garden edges beside a house.",
        }}
        primaryHref="/request-a-quote"
        primaryLabel="Request a quote"
        secondaryHref={siteConfig.phoneHref}
        secondaryLabel={`Call ${siteConfig.phoneDisplay}`}
      />

      <section className="py-14 sm:py-20">
        <Container className="max-w-5xl">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-14">
            <div>
              <p className="eyebrow">Who we are</p>
              <h2 className="heading-serif mt-4 text-3xl text-[var(--accent)] sm:text-4xl">
                A local team for kitchens, baths, basements and repairs.
              </h2>
              <p className="mt-5 leading-relaxed text-[var(--muted)]">
                RHI Pros remodels kitchens, bathrooms and basements, builds patios and pavilions, and rebuilds homes after
                fire and water damage across the Lehigh Valley and Berks County.
              </p>
              <p className="mt-4 leading-relaxed text-[var(--muted)]">
                RHI Pros is the working name of {company.legalName}, a registered Pennsylvania home improvement
                contractor ({company.license.label}). You may also know us by our earlier name,{" "}
                {company.formerNames[0]}.
              </p>
              <Link
                href="/licenses-and-insurance"
                className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
              >
                Registration &amp; insurance →
              </Link>
            </div>
            <div className="h-fit border-t border-[var(--accent)] pt-6">
              <h3 className="heading-serif text-2xl text-[var(--accent)]">Talk to us</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Tell us where you are, what you would like to change and share any photos or plans you have.
              </p>
              <div className="mt-4 flex flex-col items-start gap-1 text-sm font-semibold text-[var(--brand)]">
                <a href={company.phone.href} className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                  {company.phone.display}
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex min-h-11 items-center break-all underline-offset-4 hover:underline"
                >
                  {company.email}
                </a>
                <Link href="/request-a-quote" className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                  Request a quote →
                </Link>
              </div>
            </div>
          </div>

          <ConfidenceSection title="How we work." className="mt-14" />

          <div className="mt-14">
            <TestimonialStrip items={getFeaturedTestimonials()} />
          </div>
        </Container>
      </section>

      <BottomCTA />
    </>
  );
}
