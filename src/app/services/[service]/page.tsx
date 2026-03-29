import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import QuoteForm from "@/components/forms/QuoteForm";
import JsonLd from "@/components/JsonLd";
import FaqList from "@/components/sections/FaqList";
import TestimonialStrip from "@/components/sections/TestimonialStrip";
import PortfolioGallery from "@/components/sections/PortfolioGallery";
import ExpandableImageGrid from "@/components/sections/ExpandableImageGrid";
import { curatedStaticGalleryServiceSlugs, getServiceBySlug, primaryServices } from "@/content/services";
import { caseStudies, sortCaseStudiesByMarketPriority } from "@/content/caseStudies";
import { locations } from "@/content/locations";
import { siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/url";
import { getServiceJsonLd, getBreadcrumbJsonLd } from "@/lib/structuredData";
import { getTestimonialsByService } from "@/content/testimonials";
import { getPortfolioImages } from "@/lib/portfolio";

export const revalidate = 3600;

type Params = { service: string };

const priorityLocationSlugsByService: Partial<Record<string, string[]>> = {
  "kitchen-remodeling": ["allentown-pa", "bethlehem-pa", "lehigh-valley-pa"],
  "bathroom-remodeling": ["allentown-pa", "bethlehem-pa", "lehigh-valley-pa"],
  "basement-finishing": ["allentown-pa", "bethlehem-pa", "lehigh-valley-pa"],
  "drywall-installation-repair": ["allentown-pa", "bethlehem-pa", "lehigh-valley-pa"],
  "flooring-installation": ["allentown-pa", "bethlehem-pa", "lehigh-valley-pa"],
  "paver-installation": ["allentown-pa", "bethlehem-pa", "lehigh-valley-pa"],
  "exterior-remodeling": ["allentown-pa", "bethlehem-pa", "lehigh-valley-pa"],
  "fire-damage-restoration": ["allentown-pa", "bethlehem-pa", "lehigh-valley-pa"],
  "water-damage-restoration": ["allentown-pa", "bethlehem-pa", "lehigh-valley-pa"],
};

export function generateStaticParams() {
  return primaryServices.map((service) => ({ service: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service || service.slug === "insurance-claims") {
    return {};
  }
  const serviceKey = service.name.toLowerCase();
  return {
    title: `${service.name} | Allentown, Bethlehem & Lehigh Valley`,
    description: `${service.name} services with clear scopes, reliable scheduling, and quality workmanship across Allentown, Bethlehem, the Lehigh Valley, Reading, and Berks County.`,
    keywords: [
      `${serviceKey} allentown pa`,
      `${serviceKey} bethlehem pa`,
      `${serviceKey} lehigh valley`,
      `${serviceKey} contractor`,
    ],
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service || service.slug === "insurance-claims") {
    notFound();
  }

  const related = primaryServices.filter((item) => item.slug !== service.slug).slice(0, 4);
  const relatedCaseStudies = sortCaseStudiesByMarketPriority(
    caseStudies.filter((item) => item.serviceSlug === service.slug && item.featureInServiceListings !== false),
  );
  const topCaseStudy = relatedCaseStudies[0];
  const serviceTestimonials = getTestimonialsByService(service.slug);
  const isEmergencyService =
    service.slug === "fire-damage-restoration" || service.slug === "water-damage-restoration";
  const showCuratedStaticGallery = curatedStaticGalleryServiceSlugs.includes(
    service.slug as (typeof curatedStaticGalleryServiceSlugs)[number],
  );
  const galleryGridClassName =
    service.gallery.length > 1 ? "mt-4 columns-1 gap-4 md:columns-2" : "mt-4 max-w-3xl";
  const priorityLocationSlugs = priorityLocationSlugsByService[service.slug];
  const availableLocations = priorityLocationSlugs
    ? priorityLocationSlugs
        .map((slug) => locations.find((location) => location.slug === slug))
        .filter((location): location is (typeof locations)[number] => Boolean(location))
    : locations;
  const contextualPriorityLocations = availableLocations.slice(0, 2);
  const firstPriorityLocationLabel = contextualPriorityLocations[0]
    ? `${service.name} in ${contextualPriorityLocations[0].short}`
    : null;
  const secondPriorityLocationLabel = contextualPriorityLocations[1]
    ? `${service.name} in ${contextualPriorityLocations[1].short}`
    : null;
  const portfolioTag = service.portfolioTag ?? service.slug;
  const portfolioImages = showCuratedStaticGallery
    ? []
    : await getPortfolioImages({ serviceTags: [portfolioTag], limit: 6 });
  const jsonLd = getServiceJsonLd(
    service.name,
    absoluteUrl(`/services/${service.slug}`),
    "Allentown, Bethlehem, Lehigh Valley, Reading, Wyomissing, Berks County",
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.name, href: `/services/${service.slug}` },
        ])}
      />

      <section className="hero-band py-14">
        <Container className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--brand)]">
              Lehigh Valley &amp; Berks County
            </p>
            <h1 className="mt-2 text-4xl font-extrabold text-[var(--accent)]">{service.name}</h1>
            <p className="mt-3 text-[var(--muted)]">{service.intro}</p>
            {isEmergencyService && (
              <div className="mt-4 rounded-lg border border-[var(--brand)] bg-[var(--surface-soft)] p-3">
                <p className="text-sm font-semibold text-[var(--accent)]">Dealing with damage right now?</p>
                <p className="mt-1 text-sm text-[var(--muted)]">Call us directly for priority scheduling.</p>
              </div>
            )}
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/request-a-quote">{service.cta}</Button>
              <Button href={siteConfig.phoneHref} variant="secondary">
                Call {siteConfig.phoneDisplay}
              </Button>
            </div>
            <div className="mt-5 grid gap-2 text-sm text-[var(--muted)] sm:grid-cols-2">
              <p className="surface rounded-lg px-3 py-2">Written scope before work begins</p>
              <p className="surface rounded-lg px-3 py-2">Licensed in PA · HIC #PA185945</p>
              <p className="surface rounded-lg px-3 py-2">Insured and warranty-backed</p>
              <p className="surface rounded-lg px-3 py-2">Clear communication throughout</p>
            </div>
          </div>
          <div className="surface overflow-hidden rounded-2xl">
            <Image
              src={service.image.src}
              alt={service.image.alt}
              width={1200}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-bold text-[var(--accent)]">What&apos;s Included</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)]">
              {service.whatIncluded.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            {service.authoritySnapshot && (
              <section className="surface mt-8 rounded-xl p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">
                  Example Scope Snapshot
                </p>
                <h2 className="mt-1 text-2xl font-bold text-[var(--accent)]">
                  {service.authoritySnapshot.title}
                </h2>
                <p className="mt-2 text-sm text-[var(--muted)]">{service.authoritySnapshot.location}</p>
                <p className="mt-3 text-sm text-[var(--muted)]">{service.authoritySnapshot.summary}</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
                  {service.authoritySnapshot.scope.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-[var(--muted)]">{service.authoritySnapshot.compliance}</p>
                <p className="mt-2 text-xs text-[var(--muted)]">{service.authoritySnapshot.note}</p>
              </section>
            )}

            <h2 className="mt-8 text-2xl font-bold text-[var(--accent)]">Where Quality Matters Most</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)]">
              {service.qualityFactors.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2 className="mt-8 text-2xl font-bold text-[var(--accent)]">What Affects the Price</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)]">
              {service.pricingFactors.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2 className="mt-8 text-2xl font-bold text-[var(--accent)]">What You Can Expect</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)]">
              {service.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
            {topCaseStudy && (
              <p className="mt-3 text-sm text-[var(--muted)]">
                See a recent example:{" "}
                <Link href={`/projects/${topCaseStudy.slug}`} className="font-semibold text-[var(--brand)]">
                  {topCaseStudy.title}
                </Link>
                .
              </p>
            )}

            {showCuratedStaticGallery && service.gallery.length > 0 ? (
              <section className="mt-10">
                <h2 className="text-2xl font-bold text-[var(--accent)]">Featured Project Photos</h2>
                <ExpandableImageGrid
                  images={service.gallery.slice(0, 4)}
                  gridClassName={galleryGridClassName}
                  cardClassName="surface mb-4 break-inside-avoid overflow-hidden rounded-lg bg-[var(--surface-soft)]"
                  imageClassName="h-auto w-full"
                />
              </section>
            ) : portfolioImages.length > 0 ? (
              <PortfolioGallery images={portfolioImages} />
            ) : service.gallery.length > 0 ? (
              <section className="mt-10">
                <h2 className="text-2xl font-bold text-[var(--accent)]">Recent Work</h2>
                <ExpandableImageGrid
                  images={service.gallery}
                  gridClassName={galleryGridClassName}
                  cardClassName="surface mb-4 break-inside-avoid overflow-hidden rounded-lg bg-[var(--surface-soft)]"
                  imageClassName="h-auto w-full"
                />
              </section>
            ) : null}

            {service.processGallery && (
              <section className="mt-10">
                <h2 className="text-2xl font-bold text-[var(--accent)]">
                  {service.processGallery.title}
                </h2>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {service.processGallery.intro}
                </p>
                <ExpandableImageGrid
                  images={service.processGallery.images}
                  inlineCount={service.processGallery.inlineCount}
                  gridClassName="mt-4 grid gap-4 md:grid-cols-2"
                  cardClassName="surface overflow-hidden rounded-lg bg-[var(--surface-soft)]"
                  imageClassName="h-auto w-full"
                  captionClassName="px-3 py-2 text-xs leading-relaxed text-[var(--muted)]"
                  expandLabel="Tap to expand"
                />
                <div className="mt-5">
                  <Button href="/request-a-quote">{service.cta}</Button>
                </div>
              </section>
            )}

            {serviceTestimonials.length > 0 && (
              <TestimonialStrip items={serviceTestimonials.slice(0, 3)} title="What Clients Say" />
            )}

            {relatedCaseStudies.length > 0 && (
              <section className="mt-8">
                <h2 className="text-2xl font-bold text-[var(--accent)]">Project Case Studies</h2>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {relatedCaseStudies.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/projects/${item.slug}`}
                      className="surface rounded-lg p-4 hover:border-[var(--brand)]"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">
                        {item.locationName}
                      </p>
                      <p className="mt-1 font-semibold">{item.title}</p>
                      <p className="mt-2 text-sm text-[var(--muted)]">{item.summary}</p>
                      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
                        {item.scope.slice(0, 2).map((scopeItem) => (
                          <li key={scopeItem}>{scopeItem}</li>
                        ))}
                      </ul>
                      <span className="mt-3 inline-block text-sm font-semibold text-[var(--brand)]">
                        View full case study
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <div className="surface mt-10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[var(--accent)]">Ready to get started?</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">
                You do not need a full plan. Tell us what you are thinking and we will follow up with a written scope and quote.
              </p>
              {siteConfig.financing.teaser && (
                <p className="mt-2 text-sm font-semibold text-[var(--brand)]">
                  {siteConfig.financing.teaser}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-3">
                <Button href="/request-a-quote">{service.cta}</Button>
                <Button href={siteConfig.phoneHref} variant="secondary">
                  Call {siteConfig.phoneDisplay}
                </Button>
                <Button href="/financing" variant="secondary">
                  Financing Options
                </Button>
              </div>
            </div>

            <FaqList title="Common Questions" items={service.faqs} />

            <section className="surface mt-8 rounded-xl p-5">
              <h2 className="text-lg font-bold text-[var(--accent)]">Before You Decide</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Comparing contractors? These pages cover how we plan projects, what our warranty includes, and our licensing details.
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                <Link
                  href="/our-process"
                  className="surface rounded-lg p-3 text-sm font-semibold hover:border-[var(--brand)]"
                >
                  See our process
                </Link>
                <Link
                  href="/warranty"
                  className="surface rounded-lg p-3 text-sm font-semibold hover:border-[var(--brand)]"
                >
                  Review our workmanship warranty
                </Link>
                <Link
                  href="/licenses-and-insurance"
                  className="surface rounded-lg p-3 text-sm font-semibold hover:border-[var(--brand)]"
                >
                  View licenses and insurance
                </Link>
              </div>
            </section>

            <h2 className="mt-10 text-xl font-bold text-[var(--accent)]">
              {priorityLocationSlugs ? "Service Areas" : "Available In Your Area"}
            </h2>
            {contextualPriorityLocations.length > 0 && (
              <p className="mt-2 text-sm text-[var(--muted)]">
                See details for{" "}
                <Link
                  href={`/${contextualPriorityLocations[0].slug}/${service.slug}`}
                  className="font-semibold text-[var(--brand)]"
                >
                  {firstPriorityLocationLabel}
                </Link>
                {contextualPriorityLocations[1] ? (
                  <>
                    {" "}or{" "}
                    <Link
                      href={`/${contextualPriorityLocations[1].slug}/${service.slug}`}
                      className="font-semibold text-[var(--brand)]"
                    >
                      {secondPriorityLocationLabel}
                    </Link>
                  </>
                ) : null}
                .
              </p>
            )}
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {availableLocations.map((location) => (
                <Link
                  key={location.slug}
                  href={`/${location.slug}/${service.slug}`}
                  className="surface rounded-lg p-3 text-sm font-semibold hover:border-[var(--brand)]"
                >
                  {service.name} in {location.short}
                </Link>
              ))}
            </div>

            <h3 className="mt-8 text-lg font-bold text-[var(--accent)]">Related Services</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="surface rounded-lg p-3 text-sm hover:border-[var(--brand)]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <QuoteForm />
        </Container>
      </section>
    </>
  );
}
