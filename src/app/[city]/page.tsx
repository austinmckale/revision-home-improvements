import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { getLocationBySlug, locations } from "@/content/locations";
import { services } from "@/content/services";

type Params = { city: string };

export function generateStaticParams() {
  return locations.map((location) => ({ city: location.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const location = getLocationBySlug(params.city);
  if (!location) return {};
  return {
    title: `Home Improvement in ${location.name}`,
    description: `Remodeling and restoration services in ${location.name}. Explore local kitchen, bathroom, basement, flooring, and restoration pages.`,
    alternates: { canonical: `/${location.slug}` },
  };
}

export default function CityHubPage({ params }: { params: Params }) {
  const location = getLocationBySlug(params.city);
  if (!location) notFound();

  return (
    <section className="py-14">
      <Container>
        <h1 className="text-4xl font-extrabold text-[var(--accent)]">Home Improvement in {location.name}</h1>
        <p className="mt-3 max-w-3xl text-[var(--muted)]">
          Find the exact service page for your area. Each page includes relevant scope details and direct quote paths.
        </p>
        <p className="mt-2 max-w-3xl text-sm text-[var(--muted)]">{location.localAngle}</p>
        <div className="mt-6">
          <Button href="/request-a-quote">Request a Quote in {location.short}</Button>
        </div>
        <section className="surface mt-8 rounded-xl p-5">
          <h2 className="text-xl font-semibold text-[var(--accent)]">Why clients in {location.short} hire us</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
            {location.whyUs.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/${location.slug}/${service.slug}`}
              className="surface rounded-xl p-5 hover:border-[var(--brand)]"
            >
              <h2 className="text-lg font-semibold">
                {service.name} in {location.short}
              </h2>
              <p className="mt-1 text-sm text-[var(--muted)]">{service.short}</p>
            </Link>
          ))}
        </div>
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-[var(--accent)]">Neighborhoods We Commonly Serve</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {location.neighborhoods.map((neighborhood) => (
              <article key={neighborhood} className="surface rounded-lg p-4">
                <h3 className="font-semibold">{neighborhood}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Remodeling, restoration, and quote support available for projects near {neighborhood}.
                </p>
              </article>
            ))}
          </div>
        </section>
      </Container>
    </section>
  );
}
