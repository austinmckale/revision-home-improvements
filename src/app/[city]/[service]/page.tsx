import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import QuoteForm from "@/components/forms/QuoteForm";
import JsonLd from "@/components/JsonLd";
import FaqList from "@/components/sections/FaqList";
import LocalHighlightsSection from "@/components/sections/LocalHighlightsSection";
import PortfolioGallery from "@/components/sections/PortfolioGallery";
import ExpandableImageGrid from "@/components/sections/ExpandableImageGrid";
import ServiceHero from "@/components/sections/ServiceHero";
import PageJumpLinks from "@/components/sections/PageJumpLinks";
import { getLocationBySlug, locations } from "@/content/locations";
import { getCaseStudyBySlug, visibleCaseStudies, sortCaseStudiesByMarketPriority } from "@/content/caseStudies";
import { getCityServiceLocalContent } from "@/content/localSeo";
import {
  curatedStaticGalleryServiceSlugs,
  exampleScopeExplanation,
  getServiceBySlug,
  primaryServices,
  services,
} from "@/content/services";
import { siteConfig } from "@/content/site";
import { insuranceClaimsClarification } from "@/content/restoration";
import { absoluteUrl } from "@/lib/url";
import { getCityServiceJsonLd, getBreadcrumbJsonLd } from "@/lib/structuredData";
import { getPortfolioImages } from "@/lib/portfolio";
import { getFeaturedCaseStudyGalleryImages } from "@/lib/servicePageMedia";
import { findExplicitFeaturedCaseStudy } from "@/lib/serviceFeaturedCaseStudy";

export const revalidate = 3600;

type Params = { city: string; service: string };

const contextualGalleryKeys = new Set([
  "reading-pa/paver-installation",
  "allentown-pa/paver-installation",
  "bethlehem-pa/paver-installation",
  "lehigh-valley-pa/paver-installation",
  "reading-pa/basement-finishing",
  "berks-county-pa/basement-finishing",
  "lehigh-valley-pa/basement-finishing",
  "berks-county-pa/kitchen-remodeling",
]);

export function generateStaticParams() {
  return locations.flatMap((location) => services.map((service) => ({ city: location.slug, service: service.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { city, service } = await params;
  const location = getLocationBySlug(city);
  const selectedService = getServiceBySlug(service);
  if (!location || !selectedService) return {};
  const localContent = getCityServiceLocalContent(location.slug, selectedService.slug);
  const serviceKey = selectedService.name.toLowerCase();
  const locationKey = location.name.toLowerCase();
  const title = localContent?.metadataTitle ?? `${selectedService.name} in ${location.name}`;
  const description =
    localContent?.metadataDescription ??
    `Discuss ${selectedService.name.toLowerCase()} in ${location.name}. Review scope, responsibilities and next steps with RHI Pros.`;
  const shareImages = selectedService.image.src
    ? [{ url: selectedService.image.src, alt: selectedService.image.alt }]
    : [{ url: "/images/brand/rhi-pros-share.png", alt: "RHI Pros · rhipros.com" }];
  return {
    title,
    description,
    keywords: [
      `${serviceKey} ${locationKey}`,
      `${serviceKey} contractor ${location.short.toLowerCase()}`,
      `home improvement ${locationKey}`,
      `remodeling ${location.short.toLowerCase()}`,
    ],
    alternates: { canonical: `/${location.slug}/${selectedService.slug}` },
    openGraph: {
      title: `${title} | RHI Pros`,
      description,
      url: `/${location.slug}/${selectedService.slug}`,
      images: shareImages,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | RHI Pros`,
      description,
      images: shareImages,
    },
  };
}

export default async function CityServicePage({ params }: { params: Promise<Params> }) {
  const { city, service: serviceSlug } = await params;
  const location = getLocationBySlug(city);
  const service = getServiceBySlug(serviceSlug);

  if (!location || !service) {
    notFound();
  }

  const localContent = getCityServiceLocalContent(location.slug, service.slug);
  const serviceOverviewHref = service.slug === "insurance-claims" ? "/insurance-claims" : `/services/${service.slug}`;
  const cityServiceUrl = absoluteUrl(`/${location.slug}/${service.slug}`);
  const jsonLd = getCityServiceJsonLd({
    businessName: siteConfig.name,
    cityName: location.name,
    serviceName: service.name,
    url: cityServiceUrl,
    image: service.image.src ? absoluteUrl(service.image.src) : undefined,
  });
  const localProof = sortCaseStudiesByMarketPriority(
    visibleCaseStudies.filter(
      (item) =>
        item.locationSlug === location.slug &&
        item.serviceSlug === service.slug &&
        item.featureInServiceListings !== false,
    ),
  );
  const topLocalCaseStudy = localProof[0];
  const relatedCaseStudyFromConfig = localContent?.relatedCaseStudySlug
    ? getCaseStudyBySlug(localContent.relatedCaseStudySlug)
    : undefined;
  const contextualCaseStudy = topLocalCaseStudy ?? relatedCaseStudyFromConfig;
  const explicitFeaturedCaseStudy = findExplicitFeaturedCaseStudy(service, visibleCaseStudies);
  const useContextualGallery = contextualGalleryKeys.has(`${location.slug}/${service.slug}`);
  const gallerySourceCaseStudy = useContextualGallery
    ? (topLocalCaseStudy ?? relatedCaseStudyFromConfig ?? explicitFeaturedCaseStudy)
    : (explicitFeaturedCaseStudy ?? topLocalCaseStudy ?? relatedCaseStudyFromConfig);
  const priorityContextualLocations = new Set(["allentown-pa", "bethlehem-pa", "lehigh-valley-pa"]);
  const showPriorityContextualSentence =
    Boolean(localContent) &&
    Boolean(contextualCaseStudy) &&
    (priorityContextualLocations.has(location.slug) || Boolean(localContent.relatedCaseStudySlug));
  const serviceOverviewAnchorText = `${service.name.toLowerCase()} services`;
  const relatedLocalServices = primaryServices.filter((item) => item.slug !== service.slug);
  const showCabinetPlanningBlock = location.slug === "berks-county-pa" && service.slug === "kitchen-remodeling";
  const showAuthoritySnapshot = Boolean(service.authoritySnapshot) && !showCabinetPlanningBlock;
  const isEmergencyService = service.slug === "fire-damage-restoration" || service.slug === "water-damage-restoration";
  const showCuratedStaticGallery = curatedStaticGalleryServiceSlugs.includes(
    service.slug as (typeof curatedStaticGalleryServiceSlugs)[number],
  );
  const heroImageSrc = service.image.src?.trim() ?? "";
  const featuredProjectGalleryImages = getFeaturedCaseStudyGalleryImages(gallerySourceCaseStudy, heroImageSrc);
  const showFeaturedProjectGallery = showCuratedStaticGallery && featuredProjectGalleryImages.length > 0;
  const featuredProjectGalleryGridClassName =
    featuredProjectGalleryImages.length > 1 ? "mt-3 columns-1 gap-4 md:columns-2" : "mt-3 max-w-3xl";
  const additionalLocalProof = localProof.filter(
    (item) => !showFeaturedProjectGallery || item.slug !== gallerySourceCaseStudy?.slug,
  );
  const portfolioTag = service.portfolioTag ?? service.slug;
  const portfolioImages = showCuratedStaticGallery
    ? []
    : await getPortfolioImages({ serviceTags: [portfolioTag], limit: 3 });
  const authoritySnapshotScope = service.authoritySnapshot?.scope.slice(0, 4) ?? [];
  const faqItems = localContent?.localizedFaqs ?? [];
  const internalLinks = localContent?.internalLinks ?? [
    {
      href: `/${location.slug}`,
      anchorText: `Remodeling and restoration in ${location.name}`,
      reason: "City hub and related services",
    },
    {
      href: serviceOverviewHref,
      anchorText: `${service.name} service details`,
      reason: "Service-level scope and process",
    },
    {
      href: "/projects",
      anchorText: "Photo collections",
      reason: "Visual trust and case-study proof",
    },
    {
      href: service.slug === "water-damage-restoration" ? "/insurance-claims" : "/financing",
      anchorText: service.slug === "water-damage-restoration" ? "Insurance claims assistance" : "Financing options",
      reason: "Decision-stage support",
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: location.name, href: `/${location.slug}` },
          { name: `${service.name} in ${location.short}`, href: `/${location.slug}/${service.slug}` },
        ])}
      />

      <ServiceHero
        eyebrow={location.name}
        title={localContent?.heroHeading ?? `${service.name} in ${location.short}`}
        intro={
          localContent?.heroIntro ?? (isEmergencyService ? service.intro : `${service.intro} ${location.localAngle}`)
        }
        image={service.image.src ? service.image : undefined}
        primaryHref={isEmergencyService ? siteConfig.phoneHref : "#quote-form-section"}
        primaryLabel={isEmergencyService ? `Call ${siteConfig.phoneDisplay}` : "Get a free quote"}
        secondaryHref={isEmergencyService ? `/request-a-quote?service=${service.slug}` : siteConfig.phoneHref}
        secondaryLabel={isEmergencyService ? "Request a quote" : `Call ${siteConfig.phoneDisplay}`}
        notice={isEmergencyService ? "Call us to discuss repair scope and current availability." : undefined}
      />

      <PageJumpLinks
        items={[
          { href: "#service-details", label: "Scope & cost" },
          ...(localContent ? [{ href: "#local-planning", label: "Local planning" }] : []),
          ...(localContent?.planningGuide ? [{ href: "#planning-guide", label: "Before you begin" }] : []),
          ...(showFeaturedProjectGallery || portfolioImages.length > 0 || service.processGallery
            ? [{ href: "#project-photos", label: "Photos" }]
            : []),
          ...(faqItems.length > 0 ? [{ href: "#questions", label: "Common questions" }] : []),
          { href: "#quote-form-section", label: "Request a quote" },
        ]}
      />

      <section className="py-14">
        <Container className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)]">
          <div>
            {(isEmergencyService || service.slug === "insurance-claims") && (
              <p className="mb-8 text-sm leading-relaxed text-[var(--muted)]">{insuranceClaimsClarification}</p>
            )}
            <section id="service-details" className="surface-soft rounded-sm border border-[var(--border)] p-5 md:p-6">
              <h2 className="heading-serif text-3xl text-[var(--accent)]">Scope &amp; price factors</h2>
              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="font-semibold text-[var(--accent)]">Scope to discuss</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
                    {service.whatIncluded.slice(0, 3).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--accent)]">What affects the price</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
                    {service.pricingFactors.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Button href="#quote-form-section">Request a quote</Button>
                <Link
                  href={serviceOverviewHref}
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
                >
                  Full service guide →
                </Link>
              </div>
            </section>

            {localContent && (
              <section id="local-planning" className="surface mt-8 rounded-sm p-6">
                <h2 className="heading-serif text-3xl text-[var(--accent)]">{localContent.localProjectHeading}</h2>
                <p className="mt-2 text-sm text-[var(--muted)]">{localContent.localProjectSnippet}</p>
                {showPriorityContextualSentence && contextualCaseStudy ? (
                  <p className="mt-3 text-sm text-[var(--muted)]">
                    For a relevant example, see{" "}
                    <Link href={`/projects/${contextualCaseStudy.slug}`} className="font-semibold text-[var(--brand)]">
                      {contextualCaseStudy.title}
                    </Link>{" "}
                    or review our{" "}
                    <Link href={serviceOverviewHref} className="font-semibold text-[var(--brand)]">
                      {serviceOverviewAnchorText}
                    </Link>
                    .
                  </p>
                ) : null}
                <h3 className="mt-5 text-lg font-semibold text-[var(--accent)]">
                  {localContent.localChallengesHeading}
                </h3>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
                  {localContent.localChallenges.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {localContent?.planningGuide && (
              <section id="planning-guide" className="mt-10 border-t border-[var(--border)] pt-8">
                <p className="eyebrow">Before you begin</p>
                <h2 className="heading-serif mt-4 text-3xl text-[var(--accent)]">{localContent.planningGuide.title}</h2>
                <div className="mt-6 space-y-6">
                  {localContent.planningGuide.items.map((item, index) => (
                    <article key={item.title} className="grid grid-cols-[2rem_1fr] gap-3">
                      <span className="heading-serif text-2xl text-[var(--brand)]">0{index + 1}</span>
                      <div>
                        <h3 className="font-semibold text-[var(--accent)]">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.copy}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {showCabinetPlanningBlock ? (
              <aside className="surface-soft mt-6 rounded-sm border border-[var(--border)] p-5 md:p-6">
                <h2 className="heading-serif text-2xl text-[var(--accent)]">Primarily planning new cabinets?</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  If cabinet replacement, layout and installation are the main focus, review our Berks County cabinet
                  service. For projects involving the full room, continue with the complete kitchen-remodeling
                  information on this page.
                </p>
                <Link
                  href="/berks-county-pa/kitchen-cabinet-installation"
                  className="mt-4 inline-block text-sm font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
                >
                  Explore Kitchen Cabinet Installation →
                </Link>
              </aside>
            ) : null}

            {additionalLocalProof.length > 0 && (
              <section className="mt-8">
                <h2 className="heading-serif text-3xl text-[var(--accent)]">Photo collections for {service.name}</h2>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {additionalLocalProof.map((item) => (
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
                        Explore photo collection
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {showAuthoritySnapshot && service.authoritySnapshot && (
              <details className="surface group mt-8 overflow-hidden rounded-sm bg-[var(--surface-soft)]">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 font-semibold text-[var(--accent)] marker:content-['']">
                  Example project scope
                  <span aria-hidden="true" className="text-[var(--brand)] transition-transform group-open:rotate-180">
                    ↓
                  </span>
                </summary>
                <div className="px-5 pb-5">
                  <h3 className="text-xl font-bold text-[var(--accent)]">{service.authoritySnapshot.title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">{exampleScopeExplanation}</p>
                  <p className="mt-3 text-sm text-[var(--muted)]">{service.authoritySnapshot.summary}</p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
                    {authoritySnapshotScope.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm text-[var(--muted)]">{service.authoritySnapshot.compliance}</p>
                  <p className="mt-2 text-xs text-[var(--muted)]">{service.authoritySnapshot.note}</p>
                  <p className="mt-4 text-sm text-[var(--muted)]">
                    For full service scope and process details, see{" "}
                    <Link href={serviceOverviewHref} className="font-semibold text-[var(--brand)]">
                      {service.name} service overview
                    </Link>
                    .
                  </p>
                </div>
              </details>
            )}

            {faqItems.length > 0 ? (
              <FaqList id="questions" title={`Quick answers for ${location.short}`} items={faqItems} />
            ) : null}
          </div>

          <div className="lg:row-span-2 lg:col-start-2">
            <div className="lg:sticky lg:top-24">
              <QuoteForm defaultService={service.name} />
            </div>
          </div>

          <div className="lg:col-start-1">
            <div id="project-photos">
              {showFeaturedProjectGallery ? (
                <section>
                  <h2 className="heading-serif text-3xl text-[var(--accent)]">Design &amp; finish ideas</h2>
                  {gallerySourceCaseStudy ? (
                    <>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        From{" "}
                        <Link
                          href={`/projects/${gallerySourceCaseStudy.slug}`}
                          className="font-semibold text-[var(--brand)] underline-offset-2 hover:underline"
                        >
                          {gallerySourceCaseStudy.title}
                        </Link>
                        {" | "}
                        {gallerySourceCaseStudy.locationName}
                      </p>
                      <p className="mt-3 text-sm text-[var(--muted)]">{gallerySourceCaseStudy.summary}</p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
                        {gallerySourceCaseStudy.scope.slice(0, 2).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                  <ExpandableImageGrid
                    images={featuredProjectGalleryImages}
                    inlineCount={2}
                    expandLabel="View photos"
                    gridClassName={featuredProjectGalleryGridClassName}
                    cardClassName="surface mb-4 break-inside-avoid overflow-hidden rounded-lg bg-[var(--surface-soft)]"
                    imageClassName="h-auto w-full"
                  />
                </section>
              ) : service.processGallery ? (
                <section>
                  <h2 className="heading-serif text-3xl text-[var(--accent)]">{service.processGallery.title}</h2>
                  <p className="mt-2 text-sm text-[var(--muted)]">{service.processGallery.intro}</p>
                  <ExpandableImageGrid
                    images={service.processGallery.images}
                    inlineCount={service.processGallery.inlineCount ?? 2}
                    gridClassName="mt-4 grid gap-4 md:grid-cols-2"
                    cardClassName="surface overflow-hidden rounded-xl bg-[var(--surface-soft)]"
                    imageClassName="h-auto w-full"
                    captionClassName="px-3 py-2 text-xs leading-relaxed text-[var(--muted)]"
                  />
                </section>
              ) : portfolioImages.length > 0 ? (
                <PortfolioGallery images={portfolioImages} title={`Recent ${service.name} Work`} />
              ) : null}
            </div>

            <section className="mt-10 border-t border-[var(--border)] pt-8">
              <h2 className="heading-serif text-3xl text-[var(--accent)]">Related Local Resources</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {internalLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="surface rounded-lg p-4 hover:border-[var(--brand)]">
                    <p className="text-sm font-semibold text-[var(--accent)]">{link.anchorText}</p>
                  </Link>
                ))}
              </div>

              <LocalHighlightsSection
                location={location}
                serviceItems={relatedLocalServices}
                className="mt-10"
                maxServices={6}
                servicesTitle={`Other services in ${location.short}`}
                priorityTitle={`Areas we serve near ${location.short}`}
                showCityHubLink
                showWhySection={!useContextualGallery}
              />
            </section>
          </div>
        </Container>
      </section>
    </>
  );
}
