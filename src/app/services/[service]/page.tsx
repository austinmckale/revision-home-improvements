import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
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

      {/* ── HERO ── */}
      <section className="hero-band py-10 md:py-16">
        <Container className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
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
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--brand)]">
              Lehigh Valley &amp; Berks County
            </p>
            <h1 className="heading-serif mt-2 text-3xl text-[var(--accent)] md:text-4xl lg:text-5xl">{service.name}</h1>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--muted)] md:mt-4 md:text-base">{service.intro}</p>
            {isEmergencyService && (
              <div className="mt-4 rounded-xl border border-[var(--brand)] bg-[var(--surface-soft)] p-4">
                <p className="text-sm font-semibold text-[var(--accent)]">Dealing with damage right now?</p>
                <p className="mt-1 text-sm text-[var(--muted)]">Call us directly for priority scheduling.</p>
              </div>
            )}
            <div className="mt-5 grid gap-2 text-sm text-[var(--muted)] sm:grid-cols-2">
              <p className="surface rounded-lg px-3 py-2">Written scope before work begins</p>
              <p className="surface rounded-lg px-3 py-2">Licensed in PA · HIC #PA185945</p>
              <p className="surface rounded-lg px-3 py-2">Insured and warranty-backed</p>
              <p className="surface rounded-lg px-3 py-2">Clear communication throughout</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3 md:mt-6">
              {isEmergencyService ? (
                <>
                  <Button href={siteConfig.phoneHref}>Call {siteConfig.phoneDisplay}</Button>
                  <Button href="/request-a-quote" variant="secondary">
                    Request a quote
                  </Button>
                </>
              ) : (
                <>
                  <Button href="/request-a-quote">{service.cta}</Button>
                  <Button href={siteConfig.phoneHref} variant="secondary">
                    Call {siteConfig.phoneDisplay}
                  </Button>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-14 md:py-24">
        <Container className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <FadeIn>
              {curatedGalleryIsSingleProject && featuredCaseStudy?.beforeImages && featuredCaseStudy?.afterImages ? (
                <div className="mb-14 md:mb-20">
                  <h2 className="heading-serif text-2xl text-[var(--accent)] md:text-3xl">Transformation</h2>
                  <p className="mt-2 mb-5 text-sm text-[var(--muted)]">
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
                <section className="mb-14 md:mb-20">
                  <h2 className="heading-serif text-2xl text-[var(--accent)] md:text-3xl">
                    {curatedGalleryIsSingleProject ? "From This Project" : "Recent Work"}
                  </h2>
                  {curatedGalleryIsSingleProject && featuredCaseStudy ? (
                    <p className="mt-2 text-sm text-[var(--muted)]">
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
                    <p className="mt-2 text-sm text-[var(--muted)]">
                      A selection of recently completed work.
                    </p>
                  )}
                  <ExpandableImageGrid
                    images={curatedGalleryImages}
                    inlineCount={4}
                    expandLabel="View all project photos"
                    gridClassName={galleryGridClassName}
                    cardClassName="surface mb-4 break-inside-avoid overflow-hidden rounded-xl bg-[var(--surface-soft)]"
                    imageClassName="h-auto w-full"
                  />
                </section>
              ) : portfolioImages.length > 0 ? (
                <div className="mb-14 md:mb-20"><PortfolioGallery images={portfolioImages} /></div>
              ) : service.gallery.length > 0 ? (
                <section className="mb-14 md:mb-20">
                  <h2 className="heading-serif text-2xl text-[var(--accent)] md:text-3xl">Recent Work</h2>
                  <ExpandableImageGrid
                    images={service.gallery}
                    inlineCount={4}
                    expandLabel="View all recent work"
                    gridClassName={galleryGridClassName}
                    cardClassName="surface mb-4 break-inside-avoid overflow-hidden rounded-xl bg-[var(--surface-soft)]"
                    imageClassName="h-auto w-full"
                  />
                </section>
              ) : null}
            </FadeIn>

            {serviceTestimonials.length > 0 && (
              <FadeIn>
                <div className="mb-14 md:mb-20">
                  <TestimonialStrip items={serviceTestimonials.slice(0, 3)} title="What Clients Say" />
                </div>
              </FadeIn>
            )}

            {!service.authoritySnapshot && (
            <FadeIn>
              <div className="mt-8 space-y-3">
                <h2 className="heading-serif mb-5 text-2xl text-[var(--accent)] md:text-3xl">Service Breakdown</h2>
                
                <details className="surface group relative overflow-hidden rounded-xl bg-[var(--surface-soft)] transition-colors open:bg-[var(--surface)]">
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-semibold text-[var(--accent)] outline-none marker:content-['']">
                    What&apos;s Included
                    <span className="text-[var(--brand)] transition-transform group-open:rotate-180">↓</span>
                  </summary>
                  <div className="px-5 pb-5 pt-1 text-[var(--muted)] md:text-sm">
                    <ul className="list-disc space-y-2 pl-5">
                      {service.whatIncluded.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </details>

                <details className="surface group relative overflow-hidden rounded-xl bg-[var(--surface-soft)] transition-colors open:bg-[var(--surface)]">
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-semibold text-[var(--accent)] outline-none marker:content-['']">
                    What You Can Expect
                    <span className="text-[var(--brand)] transition-transform group-open:rotate-180">↓</span>
                  </summary>
                  <div className="px-5 pb-5 pt-1 text-[var(--muted)] md:text-sm">
                    <ul className="list-disc space-y-2 pl-5">
                      {service.outcomes.map((outcome) => (
                        <li key={outcome}>{outcome}</li>
                      ))}
                    </ul>
                  </div>
                </details>

                <details className="surface group relative overflow-hidden rounded-xl bg-[var(--surface-soft)] transition-colors open:bg-[var(--surface)]">
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-semibold text-[var(--accent)] outline-none marker:content-['']">
                    Where Quality Matters Most
                    <span className="text-[var(--brand)] transition-transform group-open:rotate-180">↓</span>
                  </summary>
                  <div className="px-5 pb-5 pt-1 text-[var(--muted)] md:text-sm">
                    <ul className="list-disc space-y-2 pl-5">
                      {service.qualityFactors.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </details>

                <details className="surface group relative overflow-hidden rounded-xl bg-[var(--surface-soft)] transition-colors open:bg-[var(--surface)]">
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-semibold text-[var(--accent)] outline-none marker:content-['']">
                    What Affects the Price
                    <span className="text-[var(--brand)] transition-transform group-open:rotate-180">↓</span>
                  </summary>
                  <div className="px-5 pb-5 pt-1 text-[var(--muted)] md:text-sm">
                    <ul className="list-disc space-y-2 pl-5">
                      {service.pricingFactors.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </details>
              </div>
            </FadeIn>
            )}

            {service.authoritySnapshot && (
              <FadeIn>
                <section className="surface mt-14 rounded-2xl p-6 md:mt-20 md:p-8">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--brand)]">
                    Example Scope Snapshot
                  </p>
                  <h2 className="heading-serif mt-2 text-2xl text-[var(--accent)]">
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
              </FadeIn>
            )}

            {service.processGallery && (
              <FadeIn>
                <section className="mt-14 md:mt-20">
                  <h2 className="heading-serif text-2xl text-[var(--accent)] md:text-3xl">
                    {service.processGallery.title}
                  </h2>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    {service.processGallery.intro}
                  </p>
                  <ExpandableImageGrid
                    images={service.processGallery.images}
                    inlineCount={service.processGallery.inlineCount}
                    gridClassName="mt-4 grid gap-4 md:grid-cols-2"
                    cardClassName="surface overflow-hidden rounded-xl bg-[var(--surface-soft)]"
                    imageClassName="h-auto w-full"
                    captionClassName="px-3 py-2 text-xs leading-relaxed text-[var(--muted)]"
                    expandLabel="Tap to expand"
                  />
                  <div className="mt-5">
                    <Button href="/request-a-quote">
                      {isEmergencyService ? "Request a quote" : service.cta}
                    </Button>
                  </div>
                </section>
              </FadeIn>
            )}

            {featuredCaseStudy ? (
              <FadeIn>
                <section className="mt-14 md:mt-20">
                  <h2 className="heading-serif text-2xl text-[var(--accent)] md:text-3xl">Featured Project</h2>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    A closer look at a recent project.
                  </p>
                  <article className="surface mt-5 overflow-hidden rounded-2xl">
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
                      <div className="p-5 md:p-6">
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--brand)]">
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
              </FadeIn>
            ) : null}

            {service.faqs.length > 0 ? (
              <FadeIn>
                <FaqList title="Quick answers" items={service.faqs} />
              </FadeIn>
            ) : null}




            <FadeIn>
              <nav
                className="mt-10 border-t border-[var(--border)] pt-6 text-xs leading-relaxed text-[var(--muted)] md:mt-14"
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
            </FadeIn>
          </div>
          <div className="sticky top-24 h-fit pb-14">
            <QuoteForm />
          </div>
        </Container>
      </section>
    </>
  );
}
