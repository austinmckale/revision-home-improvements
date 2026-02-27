import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/JsonLd";
import TestimonialStrip from "@/components/sections/TestimonialStrip";
import ConfidenceSection from "@/components/sections/ConfidenceSection";
import BottomCTA from "@/components/sections/BottomCTA";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";
import { primaryServices } from "@/content/services";
import { caseStudies } from "@/content/caseStudies";
import { locations } from "@/content/locations";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Lehigh Valley Remodeling Contractor | Revision Home Improvements",
  description:
    "Kitchen, bathroom, basement, and restoration projects with clear scopes, fast communication, and quality workmanship across the Lehigh Valley, Reading, and Berks County.",
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }])} />
      <section className="hero-band py-16 md:py-24">
        <Container className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--brand)]">
              Reading + Lehigh Valley Remodeling
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight text-[var(--accent)] md:text-5xl">
              Remodeling and restoration work that gets done right.
            </h1>
            <p className="mt-4 max-w-xl text-base text-[var(--muted)]">
              {siteConfig.name} helps homeowners with kitchens, bathrooms, basements, and damage restoration across{" "}
              {siteConfig.serviceAreas}.
            </p>
            <p className="mt-2 max-w-xl text-sm font-semibold text-[var(--brand)]">
              {siteConfig.financing.teaser}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/request-a-quote">Request a Quote</Button>
              <Button href={siteConfig.phoneHref} variant="secondary">
                Call {siteConfig.phoneDisplay}
              </Button>
            </div>
            <div className="mt-6 grid max-w-xl gap-2 text-sm text-[var(--muted)] sm:grid-cols-2">
              <p className="surface rounded-lg px-3 py-2">Clear scopes before work starts</p>
              <p className="surface rounded-lg px-3 py-2">Fast quote follow-up</p>
              <p className="surface rounded-lg px-3 py-2">Remodeling and restoration under one team</p>
              <p className="surface rounded-lg px-3 py-2">Licensed, insured, and warranty-backed</p>
            </div>
          </div>
          <div className="surface overflow-hidden rounded-2xl">
            <Image
              src="/images/projects/DSC00338-1.jpg"
              alt="Kitchen remodeling hero project in Reading and Berks County by Revision Home Improvements."
              width={1200}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <h2 className="text-2xl font-bold text-[var(--accent)]">Start With Your Project Type</h2>
          <p className="mt-2 max-w-3xl text-sm text-[var(--muted)]">
            We handle everything from kitchen upgrades to emergency damage restoration. Pick the service that fits your needs.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {primaryServices.slice(0, 6).map((service) => (
              <article key={service.slug} className="surface rounded-xl p-5">
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{service.short}</p>
                <Link href={`/services/${service.slug}`} className="mt-3 inline-block text-sm font-semibold text-[var(--brand)]">
                  Learn more
                </Link>
              </article>
            ))}
          </div>
          <ConfidenceSection
            className="mt-8"
            title="Why Homeowners Keep Referring Us"
            intro="We prioritize practical scope planning, direct communication, and finish quality that holds up after handoff."
          />
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <h2 className="text-2xl font-bold text-[var(--accent)]">Recent Project Outcomes</h2>
          <p className="mt-2 max-w-3xl text-sm text-[var(--muted)]">
            Real projects across Berks County and Lehigh Valley with clear before/after scope and measurable results.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {caseStudies.slice(0, 3).map((study) => (
              <article key={study.slug} className="surface overflow-hidden rounded-xl">
                <Image src={study.images[0].src} alt={study.images[0].alt} width={900} height={600} className="h-44 w-full object-cover" />
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">{study.locationName}</p>
                  <h3 className="mt-1 text-base font-semibold text-[var(--accent)]">{study.title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">{study.summary}</p>
                  <Link href={`/projects/${study.slug}`} className="mt-3 inline-block text-sm font-semibold text-[var(--brand)]">
                    Read case study
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <h2 className="text-2xl font-bold text-[var(--accent)]">Service Areas</h2>
          <p className="mt-2 max-w-3xl text-sm text-[var(--muted)]">
            We focus on Reading, Berks County, and the Lehigh Valley. Start with a nearby hub and we’ll confirm coverage for your address.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {locations.slice(0, 6).map((location) => (
              <Link key={location.slug} href={`/${location.slug}`} className="surface rounded-xl p-4 hover:border-[var(--brand)]">
                <p className="font-semibold">{location.name}</p>
                <p className="text-sm text-[var(--muted)]">{location.region}</p>
              </Link>
            ))}
          </div>
          <p className="mt-4 text-sm">
            <Link href="/service-areas" className="font-semibold text-[var(--brand)]">
              View all service areas
            </Link>
          </p>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <h2 className="text-2xl font-bold text-[var(--accent)]">How It Works</h2>
        </Container>
        <Container className="mt-5 grid gap-4 md:grid-cols-3">
          <article className="surface rounded-xl p-5">
            <h3 className="text-lg font-semibold">1. Quick Discovery Call</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Tell us your priorities, budget range, and timeline so we can scope correctly.
            </p>
          </article>
          <article className="surface rounded-xl p-5">
            <h3 className="text-lg font-semibold">2. Scope + Estimate</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              We provide a clear project plan with transparent next steps.
            </p>
          </article>
          <article className="surface rounded-xl p-5">
            <h3 className="text-lg font-semibold">3. Build + Communication</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Work moves forward with consistent updates and final walkthrough.
            </p>
          </article>
        </Container>
        <Container className="mt-6 text-center">
          <Button href="/our-process" variant="secondary">See our full process</Button>
        </Container>
      </section>

      <section className="py-8">
        <Container>
          <TestimonialStrip />
        </Container>
      </section>

      <BottomCTA title="Need urgent restoration help?" description="Fire and water damage calls get priority scheduling. We also support insurance-claim project scoping." links={[{ href: "/fire-water-damage-restoration", label: "Emergency Restoration" }, { href: "/insurance-claims", label: "Insurance Claims Help" }]} />
    </>
  );
}
