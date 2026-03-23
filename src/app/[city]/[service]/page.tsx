import type { Metadata } from "next";
import Image from "next/image";
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
import { getLocationBySlug, locations } from "@/content/locations";
import { caseStudies } from "@/content/caseStudies";
import { getCityServiceLocalContent } from "@/content/localSeo";
import { curatedStaticGalleryServiceSlugs, getServiceBySlug, primaryServices, services } from "@/content/services";
import { siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/url";
import { getCityServiceJsonLd, getBreadcrumbJsonLd } from "@/lib/structuredData";
import { getPortfolioImages } from "@/lib/portfolio";

export const revalidate = 3600;

type Params = { city: string; service: string };

export function generateStaticParams() {
  return locations.flatMap((location) =>
    services.map((service) => ({ city: location.slug, service: service.slug })),
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { city, service } = await params;
  const location = getLocationBySlug(city);
  const selectedService = getServiceBySlug(service);
  if (!location || !selectedService) return {};
  const localContent = getCityServiceLocalContent(location.slug, selectedService.slug);
  const serviceKey = selectedService.name.toLowerCase();
  const locationKey = location.name.toLowerCase();
  return {
    title: localContent?.metadataTitle ?? `${selectedService.name} in ${location.name}`,
    description:
      localContent?.metadataDescription ??
      `Local ${selectedService.name.toLowerCase()} contractor in ${location.name} with clear scopes, reliable scheduling, and quality workmanship.`,
    keywords: [
      `${serviceKey} ${locationKey}`,
      `${serviceKey} contractor ${location.short.toLowerCase()}`,
      `home improvement ${locationKey}`,
      `remodeling ${location.short.toLowerCase()}`,
    ],
    alternates: { canonical: `/${location.slug}/${selectedService.slug}` },
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
  const cityServiceUrl = absoluteUrl(`/${location.slug}/${service.slug}`);
  const jsonLd = getCityServiceJsonLd({
    businessName: siteConfig.name,
    cityName: location.name,
    serviceName: service.name,
    url: cityServiceUrl,
    image: absoluteUrl(service.image.src),
  });
  const localProof = caseStudies.filter((item) => item.locationSlug === location.slug && item.serviceSlug === service.slug);
  const relatedLocalServices = primaryServices.filter((item) => item.slug !== service.slug);
  const showCuratedStaticGallery = curatedStaticGalleryServiceSlugs.includes(
    service.slug as (typeof curatedStaticGalleryServiceSlugs)[number],
  );
  const galleryGridClassName =
    service.gallery.length > 1 ? "mt-3 columns-1 gap-4 md:columns-2" : "mt-3 max-w-3xl";
  const portfolioTag = service.portfolioTag ?? service.slug;
  const portfolioImages = showCuratedStaticGallery
    ? []
    : await getPortfolioImages({ serviceTags: [portfolioTag], limit: 3 });
  const faqItems = [
    ...(localContent?.localizedFaqs ?? service.faqs.slice(0, 3)),
    {
      q: `Do you service all of ${location.name}?`,
      a: `Yes. We take on projects across ${location.name} including ${location.priorityAreas.slice(0, 3).join(", ")}, and surrounding areas.`,
    },
  ];
  const internalLinks = localContent?.internalLinks ?? [
    {
      href: `/${location.slug}`,
      anchorText: `Remodeling and restoration in ${location.name}`,
      reason: "City hub and related services",
    },
    {
      href: `/services/${service.slug}`,
      anchorText: `${service.name} service details`,
      reason: "Service-level scope and process",
    },
    {
      href: "/projects",
      anchorText: "Recent local projects",
      reason: "Visual trust and case-study proof",
    },
    {
      href: service.slug === "water-damage-restoration" ? "/insurance-claims" : "/financing",
      anchorText:
        service.slug === "water-damage-restoration"
          ? "Insurance claims assistance"
          : "Financing options",
      reason: "Decision-stage support",
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }, { name: location.name, href: `/${location.slug}` }, { name: `${service.name} in ${location.short}`, href: `/${location.slug}/${service.slug}` }])} />

      <section className="hero-band py-14">
        <Container className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--brand)]">{location.name}</p>
            <h1 className="mt-2 text-4xl font-extrabold text-[var(--accent)]">
              {localContent?.heroHeading ?? `${service.name} in ${location.short}`}
            </h1>
            <p className="mt-3 text-[var(--muted)]">
              {service.intro} {location.localAngle}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/request-a-quote">Get a Free Quote</Button>
              <Button href={siteConfig.phoneHref} variant="secondary">
                Call {siteConfig.phoneDisplay}
              </Button>
            </div>
          </div>
          <div className="surface overflow-hidden rounded-2xl">
            <Image src={service.image.src} alt={service.image.alt} width={1200} height={800} className="h-full w-full object-cover" />
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
                <h2 className="text-2xl font-bold text-[var(--accent)]">{service.authoritySnapshot.title}</h2>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {service.authoritySnapshot.location} · Estimate dated {service.authoritySnapshot.estimateDate}
                </p>
                <p className="mt-1 text-sm font-semibold text-[var(--brand)]">
                  Total estimate: {service.authoritySnapshot.total}
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">{service.authoritySnapshot.timeline}</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
                  {service.authoritySnapshot.scope.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-[var(--muted)]">{service.authoritySnapshot.compliance}</p>
                <p className="mt-2 text-xs text-[var(--muted)]">{service.authoritySnapshot.note}</p>
              </section>
            )}

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

            {localContent && (
              <section className="surface mt-8 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-[var(--accent)]">{localContent.localProjectHeading}</h2>
                <p className="mt-2 text-sm text-[var(--muted)]">{localContent.localProjectSnippet}</p>
                <h3 className="mt-5 text-lg font-semibold text-[var(--accent)]">{localContent.localChallengesHeading}</h3>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
                  {localContent.localChallenges.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {localProof.length > 0 && (
              <section className="mt-8">
                <h2 className="text-2xl font-bold text-[var(--accent)]">Recent {service.name} in {location.short}</h2>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {localProof.map((item) => (
                    <Link key={item.slug} href={`/projects/${item.slug}`} className="surface rounded-lg p-4 hover:border-[var(--brand)]">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">{item.locationName} · {item.timeline}</p>
                    <p className="mt-1 font-semibold">{item.title}</p>
                    <p className="mt-2 text-sm text-[var(--muted)]">{item.summary}</p>
                    <span className="mt-2 inline-block text-sm font-semibold text-[var(--brand)]">View full case study</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {showCuratedStaticGallery && service.gallery.length > 0 ? (
              <section className="mt-8">
                <h2 className="text-2xl font-bold text-[var(--accent)]">Featured Project Photos</h2>
                <ExpandableImageGrid
                  images={service.gallery.slice(0, 4)}
                  gridClassName={galleryGridClassName}
                  cardClassName="surface mb-4 break-inside-avoid overflow-hidden rounded-lg bg-[var(--surface-soft)]"
                  imageClassName="h-auto w-full"
                />
              </section>
            ) : portfolioImages.length > 0 ? (
              <PortfolioGallery images={portfolioImages} title={`Recent ${service.name} Work`} />
            ) : service.gallery.length > 0 ? (
              <ExpandableImageGrid
                images={service.gallery.slice(0, 3)}
                gridClassName={galleryGridClassName.replace("mt-3", "mt-8")}
                cardClassName="surface mb-4 break-inside-avoid overflow-hidden rounded-lg bg-[var(--surface-soft)]"
                imageClassName="h-auto w-full"
              />
            ) : null}

            <div className="surface mt-10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[var(--accent)]">
                Ready to plan your {service.name.toLowerCase()} project?
              </h2>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Call us to talk through your project, or fill out the form for a written scope and quote. We typically follow up the same day.
              </p>
              {siteConfig.financing.teaser && (
                <p className="mt-2 text-sm font-semibold text-[var(--brand)]">{siteConfig.financing.teaser}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-3">
                <Button href="/request-a-quote">Get a Free Quote</Button>
                <Button href={siteConfig.phoneHref} variant="secondary">
                  Call {siteConfig.phoneDisplay}
                </Button>
              </div>
            </div>

            <section className="mt-8">
              <h2 className="text-2xl font-bold text-[var(--accent)]">Related Local Resources</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {internalLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="surface rounded-lg p-4 hover:border-[var(--brand)]">
                    <p className="text-sm font-semibold text-[var(--accent)]">{link.anchorText}</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">{link.reason}</p>
                  </Link>
                ))}
              </div>
            </section>

            <FaqList
              title={`${service.name} in ${location.short}: Common Questions`}
              items={faqItems}
            />

            <LocalHighlightsSection
              location={location}
              serviceItems={relatedLocalServices}
              className="mt-10"
              maxServices={6}
              servicesTitle={`Other services in ${location.short}`}
              priorityTitle={`Areas we serve near ${location.short}`}
              showCityHubLink
            />

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              <Link href={`/services/${service.slug}`} className="surface rounded-lg p-3 text-sm hover:border-[var(--brand)]">
                View {service.name} details
              </Link>
              <Link href="/service-areas" className="surface rounded-lg p-3 text-sm hover:border-[var(--brand)]">
                All service areas
              </Link>
            </div>
          </div>
          <QuoteForm />
        </Container>
      </section>
    </>
  );
}
