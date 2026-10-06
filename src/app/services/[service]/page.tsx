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
import ServiceHero from "@/components/sections/ServiceHero";
import PageJumpLinks from "@/components/sections/PageJumpLinks";
import {
  curatedStaticGalleryServiceSlugs,
  exampleScopeExplanation,
  getServiceBySlug,
  primaryServices,
} from "@/content/services";
import { visibleCaseStudies, sortCaseStudiesByMarketPriority } from "@/content/caseStudies";
import { locations } from "@/content/locations";
import { siteConfig } from "@/content/site";
import { insuranceClaimsClarification } from "@/content/restoration";
import { absoluteUrl } from "@/lib/url";
import { getServiceJsonLd, getBreadcrumbJsonLd } from "@/lib/structuredData";
import { getFeaturedTestimonials } from "@/content/testimonials";
import { getPortfolioImages } from "@/lib/portfolio";
import { getFeaturedCaseStudyGalleryImages } from "@/lib/servicePageMedia";
import { findExplicitFeaturedCaseStudy } from "@/lib/serviceFeaturedCaseStudy";

export const revalidate = 3600;

type Params = { service: string };

const priorityLocationSlugsByService: Partial<Record<string, string[]>> = {
  "kitchen-remodeling": ["allentown-pa", "bethlehem-pa", "lehigh-valley-pa"],
  "bathroom-remodeling": ["allentown-pa", "bethlehem-pa", "lehigh-valley-pa"],
  "basement-finishing": ["lehigh-valley-pa", "reading-pa", "berks-county-pa"],
  "drywall-installation-repair": ["allentown-pa", "bethlehem-pa", "lehigh-valley-pa"],
  "flooring-installation": ["allentown-pa", "bethlehem-pa", "lehigh-valley-pa"],
  "paver-installation": ["reading-pa", "bethlehem-pa", "allentown-pa", "lehigh-valley-pa"],
  "exterior-remodeling": ["allentown-pa", "bethlehem-pa", "lehigh-valley-pa"],
  "fire-damage-restoration": ["allentown-pa", "bethlehem-pa", "lehigh-valley-pa"],
  "water-damage-restoration": ["allentown-pa", "bethlehem-pa", "lehigh-valley-pa"],
};

const wholeHomeCrossLinkCopy: Partial<Record<string, string>> = {
  "kitchen-remodeling": "Planning connected updates beyond the kitchen? Explore whole-home remodeling.",
  "bathroom-remodeling": "Updating several rooms together? See our whole-home remodeling approach.",
  "basement-finishing": "Connecting the basement with other interior work? Explore whole-home remodeling.",
  "flooring-installation": "Planning flooring as part of a larger renovation? Explore whole-home remodeling.",
  "drywall-installation-repair": "Coordinating walls and ceilings across several rooms? Explore whole-home remodeling.",
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
  const titles: Record<string, string> = {
    "paver-installation": "Paver Patio Installation | Lehigh Valley & Berks County",
    "drywall-installation-repair": "Drywall Installation & Repair | Lehigh Valley",
  };
  const descriptions: Record<string, string> = {
    "kitchen-remodeling":
      "Plan a kitchen remodel in the Lehigh Valley or Berks County. Explore cabinet, countertop and layout photo collections, then request a written scope from RHI Pros.",
    "bathroom-remodeling":
      "Bathroom remodeling in the Lehigh Valley and Berks County. See finished showers and bathrooms, explore tile and fixture options, and request a written quote.",
    "basement-finishing":
      "Turn an unfinished basement into living or entertainment space. See a real basement theater and plan layout, lighting and finishes with RHI Pros.",
    "paver-installation":
      "Paver patios, pool surrounds and outdoor living in the Lehigh Valley and Berks County. Explore patio and pavilion photos, then plan your installation.",
    "flooring-installation":
      "Flooring installation with subfloor preparation, smooth transitions and coordinated trim. Explore photo collections and request a scope for your home.",
    "drywall-installation-repair":
      "Drywall installation and repair in the Lehigh Valley and Berks County. Explore smooth walls, ceiling repairs and paint-ready finishes from RHI Pros.",
    "exterior-remodeling":
      "Explore exterior remodeling across the Lehigh Valley and Berks County: siding, trim, stairs and curb-appeal updates with photo collections and project-planning guidance.",
    "fire-damage-restoration":
      "Fire damage restoration and interior rebuilding across the Lehigh Valley and Berks County. Call for assessment, a written repair scope and claim documentation support.",
    "water-damage-restoration":
      "Water damage restoration in the Lehigh Valley and Berks County. Discuss affected rooms, phased repairs and insurance documentation with RHI Pros.",
  };
  const title = titles[service.slug] ?? `${service.name} | Lehigh Valley & Berks County`;
  const description = descriptions[service.slug] ?? service.intro;
  const url = `/services/${service.slug}`;
  const shareImages = service.image.src
    ? [{ url: service.image.src, alt: service.image.alt }]
    : [{ url: "/images/brand/rhi-pros-share.png", alt: "RHI Pros · rhipros.com" }];
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | RHI Pros`,
      description,
      url,
      images: shareImages,
    },
    twitter: { card: "summary_large_image", title: `${title} | RHI Pros`, description, images: shareImages },
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
  const serviceTestimonials = getFeaturedTestimonials();
  const isEmergencyService = service.slug === "fire-damage-restoration" || service.slug === "water-damage-restoration";
  const showCuratedStaticGallery = curatedStaticGalleryServiceSlugs.includes(
    service.slug as (typeof curatedStaticGalleryServiceSlugs)[number],
  );
  const featuredProjectGalleryImages = getFeaturedCaseStudyGalleryImages(featuredCaseStudy, heroImageSrc);
  const hasFeaturedProjectGallery = featuredProjectGalleryImages.length > 0;
  const pinnedFeaturedCaseStudy = Boolean(explicitFeaturedCaseStudy);
  const curatedGalleryImages = hasFeaturedProjectGallery
    ? featuredProjectGalleryImages
    : pinnedFeaturedCaseStudy
      ? []
      : service.gallery.slice(0, 4);
  const curatedGalleryIsSingleProject = hasFeaturedProjectGallery;
  const showCuratedGallerySection = showCuratedStaticGallery && curatedGalleryImages.length > 0;
  const featuredCollectionInGallery =
    curatedGalleryIsSingleProject &&
    (showCuratedGallerySection ||
      Boolean(featuredCaseStudy?.beforeImages?.length && featuredCaseStudy?.afterImages?.length));
  const galleryGridClassName = curatedGalleryImages.length > 1 ? "mt-4 columns-1 gap-4 md:columns-2" : "mt-4 max-w-3xl";
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
  const wholeHomeCrossLink = wholeHomeCrossLinkCopy[service.slug];
  const pageHeading = service.slug === "paver-installation" ? "Paver Patio Installation" : service.name;
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

      <ServiceHero
        eyebrow="Lehigh Valley & Berks County"
        title={pageHeading}
        intro={service.intro}
        image={service.image.src ? service.image : undefined}
        primaryHref={isEmergencyService ? siteConfig.phoneHref : "#quote-form-section"}
        primaryLabel={isEmergencyService ? `Call ${siteConfig.phoneDisplay}` : service.cta}
        secondaryHref={isEmergencyService ? `/request-a-quote?service=${service.slug}` : siteConfig.phoneHref}
        secondaryLabel={isEmergencyService ? "Request a quote" : `Call ${siteConfig.phoneDisplay}`}
        notice={isEmergencyService ? "Call us to discuss repair scope and current availability." : undefined}
      />

      <PageJumpLinks
        items={[
          { href: "#service-details", label: "Scope & cost" },
          ...(showCuratedGallerySection ||
          portfolioImages.length > 0 ||
          service.gallery.length > 0 ||
          service.processGallery
            ? [
                {
                  href: !showCuratedGallerySection && service.processGallery ? "#condition-photos" : "#project-photos",
                  label: "Photos",
                },
              ]
            : []),
          ...(service.faqs.length > 0 ? [{ href: "#questions", label: "Common questions" }] : []),
          { href: "#quote-form-section", label: "Request a quote" },
        ]}
      />

      {/* ── MAIN CONTENT ── */}
      <section className="py-14 md:py-24">
        <Container className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)]">
          <div>
            {isEmergencyService && (
              <p className="mb-8 text-sm leading-relaxed text-[var(--muted)]">{insuranceClaimsClarification}</p>
            )}
            <FadeIn>
              <div id="service-details" className="space-y-3">
                <h2 className="heading-serif mb-5 text-2xl text-[var(--accent)] md:text-3xl">
                  Scope &amp; price factors
                </h2>

                <details
                  open
                  className="surface group relative overflow-hidden rounded-xl bg-[var(--surface-soft)] transition-colors open:bg-[var(--surface)]"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-semibold text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--brand)] marker:content-['']">
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

                <details
                  open
                  className="surface group relative overflow-hidden rounded-xl bg-[var(--surface-soft)] transition-colors open:bg-[var(--surface)]"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-semibold text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--brand)] marker:content-['']">
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

                <details className="surface group relative overflow-hidden rounded-xl bg-[var(--surface-soft)] transition-colors open:bg-[var(--surface)]">
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-semibold text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--brand)] marker:content-['']">
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
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-semibold text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--brand)] marker:content-['']">
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
              </div>
            </FadeIn>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href="#quote-form-section">Request a quote</Button>
              <Link
                href="/our-process"
                className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
              >
                How we plan the work
              </Link>
            </div>

            {service.authoritySnapshot && (
              <FadeIn>
                <details className="surface group mt-6 overflow-hidden rounded-xl bg-[var(--surface-soft)]">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 font-semibold text-[var(--accent)] marker:content-['']">
                    Example project scope
                    <span aria-hidden="true" className="text-[var(--brand)] transition-transform group-open:rotate-180">
                      ↓
                    </span>
                  </summary>
                  <div className="px-5 pb-5">
                    <h3 className="heading-serif text-2xl text-[var(--accent)]">{service.authoritySnapshot.title}</h3>
                    <p className="mt-2 text-sm text-[var(--muted)]">{exampleScopeExplanation}</p>
                    <p className="mt-3 text-sm text-[var(--muted)]">{service.authoritySnapshot.summary}</p>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
                      {service.authoritySnapshot.scope.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <p className="mt-3 text-sm text-[var(--muted)]">{service.authoritySnapshot.compliance}</p>
                    <p className="mt-2 text-xs text-[var(--muted)]">{service.authoritySnapshot.note}</p>
                  </div>
                </details>
              </FadeIn>
            )}

            {service.faqs.length > 0 ? (
              <FadeIn>
                <FaqList id="questions" title="Quick answers" items={service.faqs} />
              </FadeIn>
            ) : null}

            <FadeIn>
              <div id="project-photos" className="mt-10 md:mt-14">
                {curatedGalleryIsSingleProject &&
                featuredCaseStudy?.beforeImages?.length &&
                featuredCaseStudy?.afterImages?.length ? (
                  <div>
                    <h2 className="heading-serif text-2xl text-[var(--accent)] md:text-3xl">Before &amp; after</h2>
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
                    <p className="mt-3 text-sm text-[var(--muted)]">{featuredCaseStudy.summary}</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
                      {featuredCaseStudy.scope.slice(0, 2).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <BeforeAfterToggle
                      beforeImages={featuredCaseStudy.beforeImages}
                      afterImages={featuredCaseStudy.afterImages}
                    />
                  </div>
                ) : showCuratedGallerySection ? (
                  <section>
                    <h2 className="heading-serif text-2xl text-[var(--accent)] md:text-3xl">
                      {curatedGalleryIsSingleProject ? "Design & finish ideas" : "Explore the photos"}
                    </h2>
                    {curatedGalleryIsSingleProject && featuredCaseStudy ? (
                      <>
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
                        <p className="mt-3 text-sm text-[var(--muted)]">{featuredCaseStudy.summary}</p>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
                          {featuredCaseStudy.scope.slice(0, 2).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <p className="mt-2 text-sm text-[var(--muted)]">Explore spaces, finishes and details.</p>
                    )}
                    <ExpandableImageGrid
                      images={curatedGalleryImages}
                      inlineCount={2}
                      expandLabel="View photos"
                      gridClassName={galleryGridClassName}
                      cardClassName="surface mb-4 break-inside-avoid overflow-hidden rounded-xl bg-[var(--surface-soft)]"
                      imageClassName="h-auto w-full"
                    />
                  </section>
                ) : portfolioImages.length > 0 ? (
                  <div>
                    <PortfolioGallery images={portfolioImages} />
                  </div>
                ) : service.gallery.length > 0 ? (
                  <section>
                    <h2 className="heading-serif text-2xl text-[var(--accent)] md:text-3xl">Explore the photos</h2>
                    <ExpandableImageGrid
                      images={service.gallery}
                      inlineCount={2}
                      expandLabel="View photos"
                      gridClassName={galleryGridClassName}
                      cardClassName="surface mb-4 break-inside-avoid overflow-hidden rounded-xl bg-[var(--surface-soft)]"
                      imageClassName="h-auto w-full"
                    />
                  </section>
                ) : null}
              </div>
            </FadeIn>

            {service.processGallery && (
              <FadeIn>
                <section id="condition-photos" className="mt-14 md:mt-20">
                  <h2 className="heading-serif text-2xl text-[var(--accent)] md:text-3xl">
                    {service.processGallery.title}
                  </h2>
                  <p className="mt-2 text-sm text-[var(--muted)]">{service.processGallery.intro}</p>
                  <ExpandableImageGrid
                    images={service.processGallery.images}
                    inlineCount={service.processGallery.inlineCount ?? 2}
                    gridClassName="mt-4 grid gap-4 md:grid-cols-2"
                    cardClassName="surface overflow-hidden rounded-xl bg-[var(--surface-soft)]"
                    imageClassName="h-auto w-full"
                    captionClassName="px-3 py-2 text-xs leading-relaxed text-[var(--muted)]"
                    expandLabel="Tap to expand"
                  />
                  <div className="mt-5">
                    <Button href={`/request-a-quote?service=${service.slug}`}>
                      {isEmergencyService ? "Request a quote" : service.cta}
                    </Button>
                  </div>
                </section>
              </FadeIn>
            )}

            {featuredCaseStudy && !featuredCollectionInGallery ? (
              <FadeIn>
                <section className="mt-14 md:mt-20">
                  <h2 className="heading-serif text-2xl text-[var(--accent)] md:text-3xl">A closer look</h2>
                  <p className="mt-2 text-sm text-[var(--muted)]">A closer look at the visible space and details.</p>
                  <article className="surface mt-5 overflow-hidden rounded-2xl">
                    <Link
                      href={`/projects/${featuredCaseStudy.slug}`}
                      className={`block transition-opacity hover:opacity-[0.98] ${
                        showFeaturedCaseStudyThumb ? "md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]" : ""
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
                          Explore the photo collection →
                        </span>
                      </div>
                    </Link>
                  </article>
                </section>
              </FadeIn>
            ) : null}

            {featuredCaseStudy && moreCaseStudyCount > 0 ? (
              <nav aria-label={`More ${service.name.toLowerCase()} photos`} className="mt-5">
                {service.slug === "paver-installation" ? (
                  <p className="text-sm text-[var(--muted)]">
                    For a different outdoor setting, see the{" "}
                    <Link
                      href="/projects/bethlehem-pool-patio-renovation"
                      className="font-semibold text-[var(--brand)] underline-offset-2 hover:underline"
                    >
                      pool-surround and border photo collection
                    </Link>
                    .
                  </p>
                ) : null}
                <p className="mt-3 text-sm text-[var(--muted)]">
                  <Link
                    href={`/projects?service=${encodeURIComponent(service.slug)}`}
                    className="font-semibold text-[var(--brand)] underline-offset-2 hover:underline"
                  >
                    Explore more {service.name.toLowerCase()} photos
                  </Link>
                </p>
              </nav>
            ) : null}

            {serviceTestimonials.length > 0 && (
              <FadeIn>
                <div className="mb-14 md:mb-20">
                  <TestimonialStrip items={serviceTestimonials.slice(0, 3)} title="Independent company reviews" />
                </div>
              </FadeIn>
            )}

            {wholeHomeCrossLink ? (
              <FadeIn>
                <div
                  className="surface-soft mt-10 rounded-xl border border-[var(--border)] p-5 text-sm leading-relaxed text-[var(--muted)]"
                >
                  <p>
                    <Link
                      href="/services/whole-home-remodeling"
                      className="font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
                    >
                      {wholeHomeCrossLink}
                    </Link>
                  </p>
                  {service.slug === "kitchen-remodeling" ? (
                    <p className="mt-3">
                      <Link
                        href="/berks-county-pa/kitchen-cabinet-installation"
                        className="font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
                      >
                        Planning a cabinet-focused project in Berks County?
                      </Link>
                    </p>
                  ) : null}
                </div>
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
                    Registration &amp; insurance
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
            <QuoteForm defaultService={service.name} />
          </div>
        </Container>
      </section>
    </>
  );
}
