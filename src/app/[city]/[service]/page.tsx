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
import { getLocationBySlug, locations } from "@/content/locations";
import { getServiceBySlug, services } from "@/content/services";
import { siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/url";
import { getServiceJsonLd } from "@/lib/structuredData";

type Params = { city: string; service: string };

export function generateStaticParams() {
  return locations.flatMap((location) =>
    services.map((service) => ({ city: location.slug, service: service.slug })),
  );
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const location = getLocationBySlug(params.city);
  const service = getServiceBySlug(params.service);
  if (!location || !service) return {};
  return {
    title: `${service.name} in ${location.name}`,
    description: `${service.name} in ${location.name} by Revision Home Improvements. Request a quote and speak with our team today.`,
    alternates: { canonical: `/${location.slug}/${service.slug}` },
  };
}

export default function CityServicePage({ params }: { params: Params }) {
  const location = getLocationBySlug(params.city);
  const service = getServiceBySlug(params.service);

  if (!location || !service) {
    notFound();
  }

  const jsonLd = getServiceJsonLd(
    `${service.name} in ${location.name}`,
    absoluteUrl(`/${location.slug}/${service.slug}`),
    location.name,
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="hero-band py-14">
        <Container className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--brand)]">{location.name}</p>
            <h1 className="mt-2 text-4xl font-extrabold text-[var(--accent)]">
              {service.name} in {location.short}
            </h1>
            <p className="mt-3 text-[var(--muted)]">
              {service.description} We serve homeowners throughout {location.name} and nearby areas.
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">{location.localAngle}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/request-a-quote">Request Local Quote</Button>
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
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">Local proof + process</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Projects are scoped for homes in {location.short} with clear planning, communication, and timeline expectations.
              </p>
            </div>
            <h2 className="text-2xl font-bold text-[var(--accent)]">Why Homeowners in {location.short} Choose Us</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
              {location.whyUs.map((item) => (
                <li key={item}>{item}</li>
              ))}
              <li>Clear estimate, scope, and timeline before work begins</li>
              <li>Excellent value for price with options based on your budget priorities</li>
            </ul>
            <h3 className="mt-8 text-xl font-semibold text-[var(--accent)]">Neighborhood Coverage</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {location.neighborhoods.map((neighborhood) => (
                <p key={neighborhood} className="surface rounded-lg p-3 text-sm">
                  {service.name} near {neighborhood}
                </p>
              ))}
            </div>
            <ProcessTimeline title={`How ${service.name} projects run in ${location.short}`} steps={service.process} />

            <div className="mt-8 grid gap-2 sm:grid-cols-2">
              <Link href={`/services/${service.slug}`} className="surface rounded-lg p-3 text-sm hover:border-[var(--brand)]">
                View core {service.name} page
              </Link>
              <Link href={`/${location.slug}`} className="surface rounded-lg p-3 text-sm hover:border-[var(--brand)]">
                View all services in {location.short}
              </Link>
            </div>
            <div className="surface mt-8 rounded-xl p-5">
              <h3 className="text-xl font-semibold text-[var(--accent)]">
                Start your {service.name.toLowerCase()} project in {location.short}
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Fastest path is calling now for scheduling, or submit the form for a detailed quote follow-up.
              </p>
              <p className="mt-2 text-sm font-semibold text-[var(--brand)]">
                Ask about 0% interest financing offers for qualified projects.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button href="/request-a-quote">Request Local Quote</Button>
                <Button href={siteConfig.phoneHref} variant="secondary">
                  Call {siteConfig.phoneDisplay}
                </Button>
                <Button href="/financing" variant="secondary">
                  Financing Options
                </Button>
              </div>
            </div>
            <FaqList
              title={`${service.name} in ${location.short}: FAQs`}
              items={[
                ...service.faqs.slice(0, 2),
                {
                  q: `Do you service all of ${location.name}?`,
                  a: `Yes. We schedule projects across ${location.name} and surrounding neighborhoods.`,
                },
              ]}
            />
          </div>
          <QuoteForm />
        </Container>
      </section>
    </>
  );
}
