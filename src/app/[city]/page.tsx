import type { Metadata } from "next";
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

type Params = { city: string };

export function generateStaticParams() {
  return locations.map((location) => ({ city: location.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) return {};
  return {
    title: `Home Improvement in ${location.name}`,
    description: `Remodeling and restoration services in ${location.name}. Explore local kitchen, bathroom, basement, flooring, and restoration pages.`,
    alternates: { canonical: `/${location.slug}` },
  };
}

export default async function CityHubPage({ params }: { params: Promise<Params> }) {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) notFound();

  const localTestimonials = getTestimonialsByLocation(location.slug);

  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Service Areas", href: "/service-areas" }, { name: location.name, href: `/${location.slug}` }])} />
      <section className="py-14">
        <Container>
          <h1 className="text-4xl font-extrabold text-[var(--accent)]">Home Improvement in {location.name}</h1>
          <p className="mt-3 max-w-3xl text-[var(--muted)]">
            We serve homeowners throughout {location.name} with kitchen, bathroom, basement, flooring, outdoor, and restoration projects. {location.localAngle}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/request-a-quote">Request a Quote in {location.short}</Button>
            <Button href="/fire-water-damage-restoration" variant="secondary">
              Emergency Restoration
            </Button>
          </div>
          <LocalHighlightsSection location={location} serviceItems={primaryServices} className="mt-8" />
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
