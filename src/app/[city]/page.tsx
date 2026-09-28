import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/JsonLd";
import TestimonialStrip from "@/components/sections/TestimonialStrip";
import BottomCTA from "@/components/sections/BottomCTA";
import LocalHighlightsSection from "@/components/sections/LocalHighlightsSection";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";
import { getLocationBySlug, locations } from "@/content/locations";
import { primaryServices } from "@/content/services";
import { getTestimonialsByLocation } from "@/content/testimonials";
import { visibleCaseStudies } from "@/content/caseStudies";

type Params = { city: string };

export function generateStaticParams() {
  return locations.map((location) => ({ city: location.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) return {};
  return {
    title: `Remodeling & Restoration in ${location.name}`,
    description: `Kitchen, bathroom, basement, flooring, and restoration services in ${location.name}. RHI Pros delivers clear scopes, reliable scheduling, and quality workmanship.`,
    alternates: { canonical: `/${location.slug}` },
  };
}

export default async function CityHubPage({ params }: { params: Promise<Params> }) {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) notFound();

  const localTestimonials = getTestimonialsByLocation(location.slug);
  const featuredProject = visibleCaseStudies.find(
    (study) => study.locationSlug === location.slug && study.images[0],
  );

  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Service Areas", href: "/service-areas" }, { name: location.name, href: `/${location.slug}` }])} />
      <section className="relative isolate flex min-h-[min(650px,75svh)] overflow-hidden bg-[#202823] py-14 text-white sm:py-16">
        {featuredProject?.images[0] ? (
          <Image src={featuredProject.images[0].src} alt={featuredProject.images[0].alt} fill priority sizes="100vw" className="absolute inset-0 -z-20 object-cover" />
        ) : (
          <div className="media-placeholder absolute inset-0 -z-20" aria-hidden="true" />
        )}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(18,23,20,.88)_0%,rgba(18,23,20,.62)_58%,rgba(18,23,20,.18)_100%)]" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(18,23,20,.4)_0%,transparent_55%)]" aria-hidden="true" />
        <Container className="relative z-10 flex flex-1 flex-col justify-end pt-20">
          <div className="max-w-4xl">
          <p className="eyebrow eyebrow-light">Remodeling &amp; restoration · {location.name}</p>
          <h1 className="heading-serif mt-5 text-4xl leading-[1.03] tracking-[-.03em] text-white sm:text-5xl lg:text-7xl">A better home starts with a clear plan.</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">
            We serve homeowners throughout {location.name} with kitchen, bathroom, basement, flooring, outdoor, and restoration projects. {location.localAngle}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button href="/request-a-quote">Request a quote in {location.short}</Button>
            <Link href="/fire-water-damage-restoration" className="inline-flex min-h-12 items-center border border-white/50 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              Emergency restoration <span className="ml-3" aria-hidden="true">↗</span>
            </Link>
          </div>
          </div>
          <p className="mt-12 border-t border-white/25 pt-4 text-xs font-semibold uppercase tracking-[.14em] text-white/65">PA HIC registered · Insured · Written estimates</p>
        </Container>
      </section>

      <section className="bg-[var(--background)] py-14 sm:py-18">
        <Container>
          <LocalHighlightsSection
            location={location}
            serviceItems={primaryServices}
            className="mt-8"
            maxServices={location.slug === "allentown-pa" ? 9 : undefined}
          />
          {localTestimonials.length > 0 && (
            <TestimonialStrip items={localTestimonials.slice(0, 3)} title={`What ${location.short} Homeowners Say`} />
          )}
        </Container>
      </section>
      <BottomCTA
        title={`Ready to start your project in ${location.short}?`}
        description={`Tell us about your project and we will connect you with the right scope, timeline, and quote for ${location.name}.`}
      />
    </>
  );
}
