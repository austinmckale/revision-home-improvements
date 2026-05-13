import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/JsonLd";
import BottomCTA from "@/components/sections/BottomCTA";
import { locations } from "@/content/locations";
import { siteConfig } from "@/content/site";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Service Areas | Allentown, Bethlehem, Lehigh Valley & Berks County | RHI Pros",
  description:
    "RHI Pros serves homeowners across Allentown, Bethlehem, the Lehigh Valley, Reading, and Berks County with remodeling and restoration projects. Find your area.",
  alternates: { canonical: "/service-areas" },
};

const lehighValleySlugs = new Set(["allentown-pa", "bethlehem-pa", "lehigh-valley-pa"]);
const berksSlugs = new Set(["reading-pa", "wyomissing-pa", "berks-county-pa"]);

const lehighValleyLocations = locations.filter((l) => lehighValleySlugs.has(l.slug));
const berksLocations = locations.filter((l) => berksSlugs.has(l.slug));

function LocationCard({ location }: { location: (typeof locations)[number] }) {
  const firstSentence = location.localAngle.split(/(?<=\.)\s/)[0];
  return (
    <Link
      href={`/${location.slug}`}
      className="surface group flex items-start justify-between gap-3 rounded-xl p-5 transition-colors hover:border-[var(--brand)]"
    >
      <div>
        <p className="text-lg font-semibold text-[var(--accent)]">{location.name}</p>
        <p className="mt-1 text-sm text-[var(--muted)]">{firstSentence}</p>
        <p className="mt-1.5 text-xs text-[var(--muted)]">
          {location.priorityAreas.slice(0, 4).join(" · ")}
        </p>
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
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Service Areas", href: "/service-areas" }])} />

      {/* ── Hero ── */}
      <section className="hero-band py-10 md:py-14">
        <Container>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--brand)]">
            Lehigh Valley &amp; Berks County
          </p>
          <h1 className="heading-serif mt-2 text-3xl text-[var(--accent)] md:text-4xl">
            Where We Work
          </h1>
          <p className="mt-3 max-w-3xl text-[0.9375rem] leading-relaxed text-[var(--muted)] md:text-base">
            We keep our coverage focused so projects stay on schedule. Choose your region below to
            see local services, project examples, and get a quote.
          </p>
          <p className="mt-2 max-w-3xl text-sm text-[var(--muted)]">
            Just outside these areas?{" "}
            <a href={siteConfig.phoneHref} className="font-semibold text-[var(--brand)]">
              Call {siteConfig.phoneDisplay}
            </a>{" "}
            and we&apos;ll confirm availability quickly.
          </p>
        </Container>
      </section>

      {/* ── Region cards ── */}
      <section className="py-10 md:py-14">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Lehigh Valley Region */}
            <div>
              <h2 className="heading-serif text-2xl text-[var(--accent)]">Lehigh Valley</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Allentown, Bethlehem, and surrounding areas
              </p>
              <div className="mt-4 grid gap-3">
                {lehighValleyLocations.map((location) => (
                  <LocationCard key={location.slug} location={location} />
                ))}
              </div>
            </div>

            {/* Berks County Region */}
            <div>
              <h2 className="heading-serif text-2xl text-[var(--accent)]">Berks County</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Reading, Wyomissing, and surrounding areas
              </p>
              <div className="mt-4 grid gap-3">
                {berksLocations.map((location) => (
                  <LocationCard key={location.slug} location={location} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <BottomCTA
        title="Not sure which area you fall under?"
        description="Call us and we will confirm coverage for your address and connect you with the right local service page."
      />
    </>
  );
}
