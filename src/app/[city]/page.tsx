import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/JsonLd";
import TestimonialStrip from "@/components/sections/TestimonialStrip";
import BottomCTA from "@/components/sections/BottomCTA";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";
import { getPageMetadata } from "@/lib/metadata";
import { getLocationBySlug, locations, placeName } from "@/content/locations";
import { primaryServices, serviceLabel } from "@/content/services";
import { getFeaturedTestimonials } from "@/content/testimonials";
import { getCaseStudyBySlug } from "@/content/caseStudies";
import { getProjectImageProps } from "@/content/projectImagePreviews";
import { siteConfig } from "@/content/site";

type Params = { city: string };

export function generateStaticParams() {
  return locations.map((location) => ({ city: location.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) return {};
  return getPageMetadata({
    title: `Remodeling & Restoration in ${location.name}`,
    description: getCityHubDescription(location),
    path: `/${location.slug}`,
  });
}

/** Unique per-hub description built from the location's own nearby-community list. */
function getCityHubDescription(location: NonNullable<ReturnType<typeof getLocationBySlug>>) {
  const isRegion = location.slug === "berks-county-pa" || location.slug === "lehigh-valley-pa";
  const nearby = location.priorityAreas
    .slice(0, 2)
    .map((area) => area.replace(/ area$/, ""))
    .join(" and ");
  return `Remodeling and fire and water damage repairs in ${location.name}, ${isRegion ? "including" : "plus nearby"} ${nearby}. Kitchens, bathrooms, basements and more. Request a quote.`;
}

export default async function CityHubPage({ params }: { params: Promise<Params> }) {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) notFound();

  const localTestimonials = getFeaturedTestimonials();
  const localHeroSlugs: Record<string, string> = {
    "allentown-pa": "allentown-kitchen-layout-upgrade",
    "bethlehem-pa": "bethlehem-interior-flooring-refresh",
    "reading-pa": "reading-paver-patio-buildout",
    "lehigh-valley-pa": "lehigh-valley-basement-finish-and-detail",
    "berks-county-pa": "ryan-kitchen-remodel",
    "wyomissing-pa": "bethlehem-interior-flooring-refresh",
  };
  const featuredProject = getCaseStudyBySlug(localHeroSlugs[location.slug] ?? "");
  const nearby = location.priorityAreas;
  const place = placeName(location);

  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: location.name, href: `/${location.slug}` },
        ])}
      />
      <section className="relative isolate flex min-h-[min(650px,75svh)] overflow-hidden bg-[#202823] py-14 text-white sm:py-16">
        {featuredProject?.images[0] ? (
          <Image
            {...getProjectImageProps(featuredProject.images[0])}
            alt={featuredProject.images[0].alt}
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 -z-20 object-cover"
          />
        ) : (
          <div className="media-placeholder absolute inset-0 -z-20" aria-hidden="true" />
        )}
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(18,23,20,.88)_0%,rgba(18,23,20,.62)_58%,rgba(18,23,20,.18)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(18,23,20,.4)_0%,transparent_55%)]"
          aria-hidden="true"
        />
        <Container className="relative z-10 flex flex-1 flex-col justify-end pt-4 sm:pt-16">
          <div className="max-w-4xl">
            <p className="eyebrow eyebrow-light">Remodeling &amp; restoration · {location.name}</p>
            <h1 className="heading-serif mt-5 text-4xl leading-[1.03] tracking-[-.03em] text-white sm:text-5xl lg:text-7xl">
              Home remodeling in {place}.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">
              Kitchens, bathrooms, basements, flooring, outdoor living and damage repairs for homeowners in{" "}
              {location.name}. {location.localAngle}
            </p>
            <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap sm:items-center">
              <Button href="/request-a-quote">Request a quote</Button>
              <a
                href={siteConfig.phoneHref}
                className="inline-flex min-h-12 items-center justify-center border border-white/50 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
          <p className="annotation mt-12 border-t border-white/25 pt-4 text-[0.62rem] text-white/70 sm:text-[0.68rem]">
            {siteConfig.hicLabel}
          </p>
        </Container>
      </section>

      <section className="bg-[var(--background)] py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.25fr_.75fr] lg:gap-16">
            <nav aria-labelledby="local-services-heading">
              <p className="eyebrow">Services</p>
              <h2
                id="local-services-heading"
                className="heading-serif mt-4 text-3xl leading-tight text-[var(--accent)] sm:text-4xl"
              >
                What we do in {place}.
              </h2>
              <ul className="mt-8 border-t border-[var(--accent)]">
                {primaryServices.map((service) => (
                  <li key={service.slug} className="border-b border-[var(--border)]">
                    <Link
                      href={`/${location.slug}/${service.slug}`}
                      className="group grid gap-1 py-5 transition-colors sm:grid-cols-[minmax(0,15rem)_1fr_auto] sm:items-baseline sm:gap-6"
                    >
                      <span className="heading-serif text-xl text-[var(--accent)] transition-colors group-hover:text-[var(--brand)] sm:text-2xl">
                        {serviceLabel(service)}
                      </span>
                      <span className="text-sm leading-relaxed text-[var(--muted)]">{service.short}</span>
                      <span
                        className="hidden text-[var(--brand)] transition-transform group-hover:translate-x-1 sm:block"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="h-fit border-t border-[var(--accent)] pt-6 lg:mt-[7.25rem]">
              <h2 className="heading-serif text-2xl text-[var(--accent)]">Planning in {place}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--muted)]">
                {location.whyUs.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-px w-3 shrink-0 bg-[var(--brand)]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-[var(--muted)]">
                Also serving {nearby.slice(0, -1).join(", ")} and {nearby.at(-1)}.{" "}
                <Link href="/service-areas" className="font-semibold text-[var(--brand)] underline-offset-4 hover:underline">
                  All service areas
                </Link>
              </p>
            </div>
          </div>
          {localTestimonials.length > 0 && (
            <div className="mt-16">
              <TestimonialStrip items={localTestimonials.slice(0, 3)} />
            </div>
          )}
        </Container>
      </section>
      <BottomCTA title={`Planning a project in ${place}?`} />
    </>
  );
}
