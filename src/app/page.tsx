import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/JsonLd";
import TestimonialStrip from "@/components/sections/TestimonialStrip";
import ConfidenceSection from "@/components/sections/ConfidenceSection";
import { getLocalBusinessJsonLd } from "@/lib/structuredData";
import { primaryServices } from "@/content/services";
import { locations } from "@/content/locations";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Home Remodeling Contractor in Reading, Berks County, and Lehigh Valley",
  description:
    "Revision Home Improvements delivers kitchen, bathroom, basement, and restoration projects with clear timelines, fast communication, and quality execution.",
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={getLocalBusinessJsonLd()} />
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
              <p className="surface rounded-lg px-3 py-2">{siteConfig.financing.teaser}</p>
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
          <ConfidenceSection />
          <h2 className="text-2xl font-bold text-[var(--accent)]">Core Services</h2>
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
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <h2 className="text-2xl font-bold text-[var(--accent)]">Featured Service Pages</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Link href="/reading-pa/kitchen-remodeling" className="surface rounded-xl p-4 hover:border-[var(--brand)]">
              Kitchen remodeling in Reading, PA
            </Link>
            <Link href="/berks-county-pa/bathroom-remodeling" className="surface rounded-xl p-4 hover:border-[var(--brand)]">
              Bathroom remodeling in Berks County
            </Link>
            <Link href="/allentown-pa/basement-finishing" className="surface rounded-xl p-4 hover:border-[var(--brand)]">
              Basement finishing in Allentown, PA
            </Link>
            <Link href="/lehigh-valley-pa/water-damage-restoration" className="surface rounded-xl p-4 hover:border-[var(--brand)]">
              Water damage restoration in Lehigh Valley
            </Link>
            <Link href="/fire-water-damage-restoration" className="surface rounded-xl p-4 hover:border-[var(--brand)]">
              Fire and water damage restoration
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <h2 className="text-2xl font-bold text-[var(--accent)]">Service Areas</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {locations.map((location) => (
              <Link key={location.slug} href={`/${location.slug}`} className="surface rounded-xl p-4 hover:border-[var(--brand)]">
                <p className="font-semibold">{location.name}</p>
                <p className="text-sm text-[var(--muted)]">{location.region}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="grid gap-4 md:grid-cols-3">
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
      </section>

      <section className="py-8">
        <Container>
          <TestimonialStrip />
        </Container>
      </section>

      <section className="pb-14">
        <Container className="surface rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-extrabold text-[var(--accent)]">Need urgent restoration help?</h2>
          <p className="mt-3 text-[var(--muted)]">
            Fire and water damage calls get priority scheduling. We can also support insurance-claim project scoping.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button href={siteConfig.phoneHref}>Call {siteConfig.phoneDisplay}</Button>
            <Button href="/insurance-claims" variant="secondary">
              Insurance Claims Help
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
