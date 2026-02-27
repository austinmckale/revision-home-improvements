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
import { getServiceBySlug, primaryServices } from "@/content/services";
import { caseStudies } from "@/content/caseStudies";
import { locations } from "@/content/locations";
import { siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/url";
import { getServiceJsonLd, getBreadcrumbJsonLd } from "@/lib/structuredData";
import { getTestimonialsByService } from "@/content/testimonials";
import { getPortfolioImages } from "@/lib/portfolio";

export const revalidate = 3600;

type Params = { service: string };

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
    title: `${service.name} | Reading PA, Berks County & Lehigh Valley`,
    description: `${service.name} services with clear scopes, reliable scheduling, and quality workmanship across Reading, Berks County, and the Lehigh Valley.`,
    keywords: [
      `${serviceKey} reading pa`,
      `${serviceKey} berks county`,
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
  const relatedCaseStudies = caseStudies.filter((item) => item.serviceSlug === service.slug).slice(0, 2);
  const serviceTestimonials = getTestimonialsByService(service.slug);
  const isEmergencyService = service.slug === "fire-damage-restoration" || service.slug === "water-damage-restoration";
  const portfolioTag = service.portfolioTag ?? service.slug;
  const portfolioImages = await getPortfolioImages({ serviceTags: [portfolioTag], limit: 6 });
  const jsonLd = getServiceJsonLd(
    service.name,
    absoluteUrl(`/services/${service.slug}`),
    "Reading, Wyomissing, Berks County, Allentown, Bethlehem, Lehigh Valley",
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: service.name, href: `/services/${service.slug}` }])} />

      <section className="hero-band py-14">
        <Container className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold text-[var(--accent)]">{service.name}</h1>
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

            {portfolioImages.length > 0 ? (
              <PortfolioGallery images={portfolioImages} />
            ) : service.gallery.length > 0 ? (
              <section className="mt-10">
                <h2 className="text-2xl font-bold text-[var(--accent)]">Recent Work</h2>
                <div className={`mt-4 grid gap-3 ${service.gallery.length >= 3 ? "sm:grid-cols-3" : service.gallery.length === 2 ? "sm:grid-cols-2" : "max-w-md"}`}>
                  {service.gallery.map((image) => (
                    <figure key={image.src} className="surface overflow-hidden rounded-lg">
                      <Image src={image.src} alt={image.alt} width={700} height={500} className="h-40 w-full object-cover" />
                    </figure>
                  ))}
                </div>
              </section>
            ) : null}

            {relatedCaseStudies.length > 0 && (
              <section className="mt-8">
                <h2 className="text-2xl font-bold text-[var(--accent)]">Project Case Studies</h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {relatedCaseStudies.map((item) => (
                    <Link key={item.slug} href={`/projects/${item.slug}`} className="surface rounded-lg p-4 hover:border-[var(--brand)]">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">{item.locationName} · {item.timeline}</p>
                      <p className="mt-1 font-semibold">{item.title}</p>
                      <p className="mt-2 text-sm text-[var(--muted)]">{item.summary}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {serviceTestimonials.length > 0 && (
              <TestimonialStrip items={serviceTestimonials.slice(0, 3)} title="What Clients Say" />
            )}

            <div className="surface mt-10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[var(--accent)]">Ready to get started?</h2>
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
                <Button href="/financing" variant="secondary">Financing Options</Button>
              </div>
            </div>

            <FaqList title="Common Questions" items={service.faqs} />

            <h2 className="mt-10 text-xl font-bold text-[var(--accent)]">Available In Your Area</h2>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {locations.map((location) => (
                <Link key={location.slug} href={`/${location.slug}/${service.slug}`} className="surface rounded-lg p-3 text-sm font-semibold hover:border-[var(--brand)]">
                  {service.name} in {location.short}
                </Link>
              ))}
            </div>

            <h3 className="mt-8 text-lg font-bold text-[var(--accent)]">Related Services</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {related.map((item) => (
                <Link key={item.slug} href={`/services/${item.slug}`} className="surface rounded-lg p-3 text-sm hover:border-[var(--brand)]">
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
