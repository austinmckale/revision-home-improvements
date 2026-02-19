import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import QuoteForm from "@/components/forms/QuoteForm";
import JsonLd from "@/components/JsonLd";
import FaqList from "@/components/sections/FaqList";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import TestimonialStrip from "@/components/sections/TestimonialStrip";
import { getServiceBySlug, primaryServices } from "@/content/services";
import { locations } from "@/content/locations";
import { siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/url";
import { getServiceJsonLd } from "@/lib/structuredData";

type Params = { service: string };

export function generateStaticParams() {
  return primaryServices.map((service) => ({ service: service.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const service = getServiceBySlug(params.service);
  if (!service || service.slug === "insurance-claims") {
    return {};
  }
  const serviceKey = service.name.toLowerCase();
  return {
    title: `${service.name} | Reading, Berks County, Lehigh Valley`,
    description: `${service.name} contractor serving Reading, Wyomissing, Berks County, Allentown, Bethlehem, and Lehigh Valley. Fast quotes and clear scope.`,
    keywords: [
      `${serviceKey} reading pa`,
      `${serviceKey} berks county`,
      `${serviceKey} lehigh valley`,
      `${serviceKey} allentown pa`,
      `${serviceKey} bethlehem pa`,
      `${serviceKey} wyomissing pa`,
      `${serviceKey} contractor`,
    ],
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default function ServiceDetailPage({ params }: { params: Params }) {
  const service = getServiceBySlug(params.service);
  if (!service || service.slug === "insurance-claims") {
    notFound();
  }

  const related = primaryServices.filter((item) => item.slug !== service.slug).slice(0, 3);
  const jsonLd = getServiceJsonLd(
    service.name,
    absoluteUrl(`/services/${service.slug}`),
    "Reading, Wyomissing, Berks County, Allentown, Bethlehem, Lehigh Valley",
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="hero-band py-14">
        <Container className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold text-[var(--accent)]">{service.name}</h1>
            <p className="mt-3 text-[var(--muted)]">{service.description}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">{service.intro}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/request-a-quote">{service.cta}</Button>
              <Button href={siteConfig.phoneHref} variant="secondary">
                Call {siteConfig.phoneDisplay}
              </Button>
            </div>
          </div>
          <div className="surface overflow-hidden rounded-2xl">
            <Image src={service.image.src} alt={service.image.alt} width={1200} height={800} className="h-full w-full object-cover" />
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="surface mb-6 rounded-xl p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">What to expect when you work with us</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Local service team, clear scope review, and direct communication from estimate to completion.
              </p>
            </div>
            <h2 className="text-2xl font-bold text-[var(--accent)]">What We Do</h2>
            <p className="mt-3 text-sm text-[var(--muted)]">
              We routinely handle full-scope {service.name.toLowerCase()} work including planning, material coordination,
              build execution, and final quality walkthrough. The goal is a result that performs well, looks right, and
              lasts.
            </p>
            <h3 className="mt-6 text-xl font-semibold text-[var(--accent)]">Why Choose Us</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)]">
              <li>Clear communication and transparent project steps</li>
              <li>Excellent service-to-price value with scope choices that fit your budget</li>
              <li>Fast local response across Reading, Berks County, and Lehigh Valley</li>
            </ul>
            <h2 className="text-2xl font-bold text-[var(--accent)]">Our Project Approach</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
              {service.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
              <li>Transparent estimate and scope review before work starts</li>
              <li>Direct communication from first call through final walkthrough</li>
            </ul>
            <h3 className="mt-8 text-xl font-semibold text-[var(--accent)]">Benefits Homeowners Typically See</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)]">
              {service.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
            <ProcessTimeline title={`${service.name} process`} steps={service.process} />
            <section className="mt-10">
              <h3 className="text-2xl font-bold text-[var(--accent)]">Recent {service.name} Work</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {service.gallery.map((image) => (
                  <figure key={image.src} className="surface overflow-hidden rounded-lg">
                    <Image src={image.src} alt={image.alt} width={700} height={500} className="h-36 w-full object-cover" />
                  </figure>
                ))}
              </div>
            </section>

            <h3 className="mt-8 text-xl font-semibold text-[var(--accent)]">Service Areas for {service.name}</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {locations.map((location) => (
                <Link key={location.slug} href={`/${location.slug}/${service.slug}`} className="surface rounded-lg p-3 text-sm hover:border-[var(--brand)]">
                  {service.name} in {location.name}
                </Link>
              ))}
            </div>
            <section className="mt-8">
              <h3 className="text-xl font-semibold text-[var(--accent)]">Popular Searches We Cover</h3>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {locations.map((location) => (
                  <Link
                    key={`search-${location.slug}`}
                    href={`/${location.slug}/${service.slug}`}
                    className="surface rounded-lg p-3 text-sm hover:border-[var(--brand)]"
                  >
                    {service.name} contractor {location.short}
                  </Link>
                ))}
              </div>
            </section>

            <h3 className="mt-8 text-xl font-semibold text-[var(--accent)]">Related Services</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {related.map((item) => (
                <Link key={item.slug} href={`/services/${item.slug}`} className="surface rounded-lg p-3 text-sm hover:border-[var(--brand)]">
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="surface mt-8 rounded-xl p-5">
              <h3 className="text-xl font-semibold text-[var(--accent)]">Talk with us about your {service.name.toLowerCase()} project</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Call for immediate help or send your quote request online. We reply quickly and walk you through next steps.
              </p>
              <p className="mt-2 text-sm font-semibold text-[var(--brand)]">
                Ask about current 0% interest promotions for qualified projects.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button href="/request-a-quote">Request a Quote</Button>
                <Button href={siteConfig.phoneHref} variant="secondary">
                  Call {siteConfig.phoneDisplay}
                </Button>
                <Button href="/financing" variant="secondary">
                  Financing Options
                </Button>
              </div>
            </div>
            <FaqList title={`${service.name} FAQs`} items={service.faqs} />
            <TestimonialStrip />
          </div>
          <QuoteForm />
        </Container>
      </section>
    </>
  );
}
