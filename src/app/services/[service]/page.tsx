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
import BeforeAfterToggle from "@/components/sections/BeforeAfterToggle";
import ExpandableImageGrid from "@/components/sections/ExpandableImageGrid";
import { curatedStaticGalleryServiceSlugs, getServiceBySlug, primaryServices } from "@/content/services";
import { visibleCaseStudies, sortCaseStudiesByMarketPriority } from "@/content/caseStudies";
import { locations } from "@/content/locations";
import { siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/url";
import { getServiceJsonLd, getBreadcrumbJsonLd } from "@/lib/structuredData";
import { getTestimonialsByService } from "@/content/testimonials";
import { getPortfolioImages } from "@/lib/portfolio";
import { getFeaturedCaseStudyGalleryImages } from "@/lib/servicePageMedia";
import { findExplicitFeaturedCaseStudy } from "@/lib/serviceFeaturedCaseStudy";

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
    visibleCaseStudies.filter((item) => item.serviceSlug === service.slug && item.featureInServiceListings !== false),
  );
  const explicitFeaturedCaseStudy = findExplicitFeaturedCaseStudy(service, visibleCaseStudies);
  const featuredCaseStudy = explicitFeaturedCaseStudy ?? relatedCaseStudies[0];
  const moreCaseStudyCount = featuredCaseStudy
    ? relatedCaseStudies.filter((c) => c.slug !== featuredCaseStudy.slug).length
    : 0;
  const heroImageSrc = service.image.src?.trim() ?? "";
  const featuredCaseStudyThumb =
    featuredCaseStudy &&
    (heroImageSrc
      ? (featuredCaseStudy.afterImages?.find((img) => img.src !== heroImageSrc) ??
         featuredCaseStudy.images.find((img) => img.src !== heroImageSrc))
      : (featuredCaseStudy.afterImages?.[0] ?? featuredCaseStudy.images[0]));
  const showFeaturedCaseStudyThumb = Boolean(featuredCaseStudyThumb);
  const serviceTestimonials = getTestimonialsByService(service.slug);
  const isEmergencyService =
    service.slug === "fire-damage-restoration" || service.slug === "water-damage-restoration";
  const showCuratedStaticGallery = curatedStaticGalleryServiceSlugs.includes(
    service.slug as (typeof curatedStaticGalleryServiceSlugs)[number],
  );
  const featuredProjectGalleryImages = getFeaturedCaseStudyGalleryImages(featuredCaseStudy, heroImageSrc);
  const hasFeaturedProjectGallery = featuredProjectGalleryImages.length > 0;
  const curatedGalleryImages = hasFeaturedProjectGallery
    ? featuredProjectGalleryImages
    : service.gallery.slice(0, 4);
  const curatedGalleryIsSingleProject = hasFeaturedProjectGallery;
  const showCuratedGallerySection =
    showCuratedStaticGallery && curatedGalleryImages.length > 0;
  const galleryGridClassName =
    curatedGalleryImages.length > 1 ? "mt-4 columns-1 gap-4 md:columns-2" : "mt-4 max-w-3xl";
  const priorityLocationSlugs = priorityLocationSlugsByService[service.slug];
  const availableLocations = priorityLocationSlugs
    ? priorityLocationSlugs
        .map((slug) => locations.find((location) => location.slug === slug))
        .filter((location): location is (typeof locations)[number] => Boolean(location))
    : locations;
  const footerLocationLinks = availableLocations.slice(0, 5);
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

      <section className="hero-band py-8 md:py-14">
        <Container className="grid items-center gap-6 md:grid-cols-2 md:gap-8">
          {service.image.src && (
            <div className="surface order-first overflow-hidden rounded-2xl md:order-none">
              <Image
                src={service.image.src}
                alt={service.image.alt}
                width={1200}
                height={800}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="order-last md:order-none">
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--brand)]">
              Lehigh Valley &amp; Berks County
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-[var(--accent)] md:text-4xl">{service.name}</h1>
            <p className="mt-2 text-sm text-[var(--muted)] md:mt-3 md:text-base">{service.intro}</p>
            {isEmergencyService && (
              <div className="mt-3 rounded-lg border border-[var(--brand)] bg-[var(--surface-soft)] p-3 md:mt-4">
                <p className="text-sm font-semibold text-[var(--accent)]">Dealing with damage right now?</p>
                <p className="mt-1 text-sm text-[var(--muted)]">Call us directly for priority scheduling.</p>
              </div>
            )}
            <div className="mt-4 grid gap-1.5 text-sm text-[var(--muted)] sm:grid-cols-2 md:gap-2">
              <p className="surface rounded-lg px-3 py-2">Written scope before work begins</p>
              <p className="surface rounded-lg px-3 py-2">Licensed in PA · HIC #PA185945</p>
              <p className="surface rounded-lg px-3 py-2">Insured and warranty-backed</p>
              <p className="surface rounded-lg px-3 py-2">Clear communication throughout</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 md:mt-5">
              <Button href="/request-a-quote">{service.cta}</Button>
              <Button href={siteConfig.phoneHref} variant="secondary">
                Call {siteConfig.phoneDisplay}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            {curatedGalleryIsSingleProject && featuredCaseStudy?.beforeImages && featuredCaseStudy?.afterImages ? (
              <div className="mb-14">
                <h2 className="text-2xl font-bold text-[var(--accent)]">Transformation</h2>
                <p className="mt-1 mb-4 text-sm text-[var(--muted)]">
                  From{" "}
                  <Link
                    href={`/projects/${featuredCaseStudy.slug}`}
                    className="font-semibold text-[var(--brand)] underline-offset-2 hover:underline"
                  >
                    {featuredCaseStudy.title}
                  </Link>
                  {" · "}
                  {featuredCaseStudy.locationName}
                </p>
                <BeforeAfterToggle 
                  beforeImages={featuredCaseStudy.beforeImages} 
                  afterImages={featuredCaseStudy.afterImages} 
                />
              </div>
            ) : showCuratedGallerySection ? (
              <section className="mb-14">
                <h2 className="text-2xl font-bold text-[var(--accent)]">
                  {curatedGalleryIsSingleProject ? "From This Project" : "Recent Work"}
                </h2>
                {curatedGalleryIsSingleProject && featuredCaseStudy ? (
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    From{" "}
                    <Link
                      href={`/projects/${featuredCaseStudy.slug}`}
                      className="font-semibold text-[var(--brand)] underline-offset-2 hover:underline"
                    >
                      {featuredCaseStudy.title}
                    </Link>
                    {" · "}
                    {featuredCaseStudy.locationName}
                  </p>
                ) : (
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    A selection of recently completed work.
                  </p>
                )}
                <ExpandableImageGrid
                  images={curatedGalleryImages}
                  gridClassName={galleryGridClassName}
                  cardClassName="surface mb-4 break-inside-avoid overflow-hidden rounded-lg bg-[var(--surface-soft)]"
                  imageClassName="h-auto w-full"
                />
              </section>
            ) : portfolioImages.length > 0 ? (
              <div className="mb-14"><PortfolioGallery images={portfolioImages} /></div>
            ) : service.gallery.length > 0 ? (
              <section className="mb-14">
                <h2 className="text-2xl font-bold text-[var(--accent)]">Recent Work</h2>
                <ExpandableImageGrid
                  images={service.gallery}
                  gridClassName={galleryGridClassName}
                  cardClassName="surface mb-4 break-inside-avoid overflow-hidden rounded-lg bg-[var(--surface-soft)]"
                  imageClassName="h-auto w-full"
                />
              </section>
            ) : null}

            {serviceTestimonials.length > 0 && (
              <div className="mb-14">
                <TestimonialStrip items={serviceTestimonials.slice(0, 3)} title="What Clients Say" />
              </div>
            )}

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-xl font-bold text-[var(--accent)]">What&apos;s Included</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)] md:text-sm">
                  {service.whatIncluded.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[var(--accent)]">What You Can Expect</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)] md:text-sm">
                  {service.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[var(--accent)]">Where Quality Matters Most</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)] md:text-sm">
                  {service.qualityFactors.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[var(--accent)]">What Affects the Price</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)] md:text-sm">
                  {service.pricingFactors.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {service.authoritySnapshot && (
              <section className="surface mt-10 rounded-xl p-5 md:p-8">
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

            {/* Testimonials moved up */}

            {featuredCaseStudy ? (
              <section className="mt-8">
                <h2 className="text-2xl font-bold text-[var(--accent)]">Featured Project</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  A closer look at a recent project.
                </p>
                <article className="surface mt-4 overflow-hidden rounded-xl">
                  <Link
                    href={`/projects/${featuredCaseStudy.slug}`}
                    className={`block transition-opacity hover:opacity-[0.98] ${
                      showFeaturedCaseStudyThumb
                        ? "md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
                        : ""
                    }`}
                  >
                    {showFeaturedCaseStudyThumb && featuredCaseStudyThumb ? (
                      <div className="relative min-h-[200px] bg-[var(--surface-soft)] md:min-h-[240px]">
                        <Image
                          src={featuredCaseStudyThumb.src}
                          alt={featuredCaseStudyThumb.alt}
                          width={900}
                          height={600}
                          className="h-full min-h-[200px] w-full object-cover md:absolute md:inset-0 md:min-h-0"
                        />
                      </div>
                    ) : null}
                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">
                        {featuredCaseStudy.locationName}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-[var(--accent)]">{featuredCaseStudy.title}</p>
                      <p className="mt-2 text-sm text-[var(--muted)]">{featuredCaseStudy.summary}</p>
                      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
                        {featuredCaseStudy.scope.slice(0, 2).map((scopeItem) => (
                          <li key={scopeItem}>{scopeItem}</li>
                        ))}
                      </ul>
                      <span className="mt-4 inline-block text-sm font-semibold text-[var(--brand)]">
                        See the full project →
                      </span>
                    </div>
                  </Link>
                </article>
                {moreCaseStudyCount > 0 ? (
                  <p className="mt-4 text-sm text-[var(--muted)]">
                    <Link
                      href={`/projects?service=${encodeURIComponent(service.slug)}`}
                      className="font-semibold text-[var(--brand)] underline-offset-2 hover:underline"
                    >
                      Explore more {service.name.toLowerCase()} projects
                    </Link>
                  </p>
                ) : null}
              </section>
            ) : null}

            {service.faqs.length > 0 ? (
              <FaqList title="Quick answers" items={service.faqs} />
            ) : null}

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

            <nav
              className="mt-8 border-t border-[var(--border)] pt-6 text-xs leading-relaxed text-[var(--muted)]"
              aria-label="Supporting links"
            >
              <p>
                {footerLocationLinks.map((location, i) => (
                  <span key={location.slug}>
                    {i > 0 ? " · " : null}
                    <Link
                      href={`/${location.slug}/${service.slug}`}
                      className="text-[var(--brand)] underline-offset-2 hover:underline"
                    >
                      {location.short}
                    </Link>
                  </span>
                ))}
                {" · "}
                <Link href="/service-areas" className="text-[var(--brand)] underline-offset-2 hover:underline">
                  All areas
                </Link>
              </p>
              <p className="mt-3">
                <Link href="/our-process" className="underline-offset-2 hover:underline">
                  Our process
                </Link>
                {" · "}
                <Link href="/warranty" className="underline-offset-2 hover:underline">
                  Warranty
                </Link>
                {" · "}
                <Link href="/licenses-and-insurance" className="underline-offset-2 hover:underline">
                  Licenses &amp; insurance
                </Link>
              </p>
              <p className="mt-3">
                <span className="text-[var(--muted)]">Also: </span>
                {related.map((item, i) => (
                  <span key={item.slug}>
                    {i > 0 ? " · " : null}
                    <Link
                      href={`/services/${item.slug}`}
                      className="text-[var(--brand)] underline-offset-2 hover:underline"
                    >
                      {item.name}
                    </Link>
                  </span>
                ))}
              </p>
            </nav>
          </div>
          <QuoteForm />
        </Container>
      </section>
    </>
  );
}
