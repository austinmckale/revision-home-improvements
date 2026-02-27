import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/JsonLd";
import BottomCTA from "@/components/sections/BottomCTA";
import { locations } from "@/content/locations";
import { siteConfig } from "@/content/site";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Service Areas — Reading, Berks County & Lehigh Valley",
  description:
    "Revision Home Improvements serves Reading, Wyomissing, Berks County, Allentown, Bethlehem, and Lehigh Valley.",
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasPage() {
  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Service Areas", href: "/service-areas" }])} />
      <section className="py-14">
        <Container>
          <h1 className="text-4xl font-extrabold text-[var(--accent)]">Service Areas</h1>
          <p className="mt-3 max-w-3xl text-[var(--muted)]">
            We serve homeowners across southeastern Pennsylvania. Find your area below to see local services, project examples, and get a quote tailored to your neighborhood.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button href="/request-a-quote">Request a Quote</Button>
            <Button href={siteConfig.phoneHref} variant="secondary">
              Call {siteConfig.phoneDisplay}
            </Button>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {locations.map((location) => (
              <Link key={location.slug} href={`/${location.slug}`} className="surface rounded-xl p-6 hover:border-[var(--brand)]">
                <h2 className="text-xl font-semibold">{location.name}</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">{location.region}</p>
                <p className="mt-3 text-sm text-[var(--muted)]">{location.localAngle}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">
                  Priority areas: {location.priorityAreas.slice(0, 3).join(", ")}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <BottomCTA title="Not sure which area you fall under?" description="Call us and we will confirm coverage for your address and connect you with the right local service page." />
    </>
  );
}
