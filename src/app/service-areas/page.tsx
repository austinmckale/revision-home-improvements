import PageIntro from "@/components/sections/PageIntro";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/JsonLd";
import BottomCTA from "@/components/sections/BottomCTA";
import { locations } from "@/content/locations";
import { primaryServices } from "@/content/services";
import { siteConfig } from "@/content/site";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";
import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata({
  title: "Service Areas | Allentown, Bethlehem, Lehigh Valley & Berks County",
  description:
    "RHI Pros serves homeowners across Allentown, Bethlehem, the Lehigh Valley, Reading, and Berks County with remodeling and restoration projects. Find your area.",
  path: "/service-areas",
});

const lehighValleySlugs = new Set(["allentown-pa", "bethlehem-pa", "lehigh-valley-pa"]);
const berksSlugs = new Set(["reading-pa", "wyomissing-pa", "berks-county-pa"]);

const lehighValleyLocations = locations.filter((l) => lehighValleySlugs.has(l.slug));
const berksLocations = locations.filter((l) => berksSlugs.has(l.slug));

function LocationCard({ location }: { location: (typeof locations)[number] }) {
  const firstSentence = location.localAngle.split(/(?<=\.)\s/)[0];
  return (
    <Link
      href={`/${location.slug}`}
      className="group flex items-start justify-between gap-4 border-b border-[var(--border)] py-6 transition-colors hover:border-[var(--brand)]"
    >
      <div>
        <p className="heading-serif text-2xl text-[var(--accent)]">{location.name}</p>
        <p className="mt-1 text-sm text-[var(--muted)]">{firstSentence}</p>
        <p className="mt-1.5 text-xs text-[var(--muted)]">{location.priorityAreas.slice(0, 4).join(" · ")}</p>
      </div>
      <span className="mt-1 shrink-0 text-sm font-semibold text-[var(--brand)] transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}

export default function ServiceAreasPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
        ])}
      />

      {/* ── Hero ── */}
      <PageIntro eyebrow="Lehigh Valley & Berks County" title="Good work, close to home.">
        <p>
          Choose your area to explore local remodeling services, planning topics, and the details that matter for your
          home.
        </p>
        <p className="mt-4 text-sm">
          Just outside these areas?{" "}
          <a href={siteConfig.phoneHref} className="font-semibold text-[var(--brand)]">
            Call {siteConfig.phoneDisplay}
          </a>{" "}
          and we will confirm coverage.
        </p>
      </PageIntro>

      {/* ── Region cards ── */}
      <section className="py-12 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Lehigh Valley Region */}
            <div>
              <h2 className="heading-serif text-4xl text-[var(--accent)]">Lehigh Valley</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">Allentown, Bethlehem, and surrounding areas</p>
              <div className="mt-4 grid gap-3">
                {lehighValleyLocations.map((location) => (
                  <LocationCard key={location.slug} location={location} />
                ))}
              </div>
            </div>

            {/* Berks County Region */}
            <div>
              <h2 className="heading-serif text-4xl text-[var(--accent)]">Berks County</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">Reading, Wyomissing, and surrounding areas</p>
              <div className="mt-4 grid gap-3">
                {berksLocations.map((location) => (
                  <LocationCard key={location.slug} location={location} />
                ))}
              </div>
            </div>
          </div>
          <nav aria-label="Services across our service areas" className="mt-10 border-t border-[var(--border)] pt-6">
            <h2 className="heading-serif text-3xl text-[var(--accent)]">Explore our services</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {primaryServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="text-sm font-semibold text-[var(--brand)] hover:underline"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </nav>
        </Container>
      </section>

      <BottomCTA
        title="Not sure which area you fall under?"
        description="Call us and we will confirm coverage for your address and connect you with the right local service page."
      />
    </>
  );
}
