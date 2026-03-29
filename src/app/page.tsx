import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";
import { primaryServices } from "@/content/services";
import { caseStudies, sortCaseStudiesByMarketPriority } from "@/content/caseStudies";
import { testimonials } from "@/content/testimonials";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  description:
    "Kitchen, bathroom, basement, exterior, and restoration projects with clear scopes, fast communication, and quality workmanship across Allentown, Bethlehem, the Lehigh Valley, Reading, and Berks County.",
};

const priorityServiceSlugs = [
  "kitchen-remodeling",
  "bathroom-remodeling",
  "basement-finishing",
  "water-damage-restoration",
  "fire-damage-restoration",
];

export default function HomePage() {
  const priorityServices = primaryServices.filter((s) =>
    priorityServiceSlugs.includes(s.slug),
  );
  const secondaryServices = primaryServices.filter(
    (s) => !priorityServiceSlugs.includes(s.slug),
  );
  const featuredCaseStudies = sortCaseStudiesByMarketPriority(caseStudies).slice(0, 2);
  const featuredReviews = testimonials.slice(0, 3);

  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }])} />

      {/* ── HERO ── */}
      <section className="hero-band py-16 md:py-24">
        <Container className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--brand)]">
              Lehigh Valley&rsquo;s Remodeling &amp; Restoration Contractor
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight text-[var(--accent)] md:text-5xl">
              You get a written scope, a realistic timeline, and a contractor who communicates clearly.
            </h1>
            <p className="mt-4 max-w-xl text-base text-[var(--muted)]">
              Kitchens, bathrooms, basements, exteriors, and damage restoration across
              the Lehigh Valley, Reading, and Berks County.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/request-a-quote">Request a Quote</Button>
              <Button href={siteConfig.phoneHref} variant="secondary">
                Call {siteConfig.phoneDisplay}
              </Button>
            </div>
            <div className="mt-6 grid max-w-xl gap-2 text-sm text-[var(--muted)] sm:grid-cols-2">
              <p className="surface rounded-lg px-3 py-2">Written scope and estimate before work begins</p>
              <p className="surface rounded-lg px-3 py-2">PA licensed and insured · HIC #PA185945</p>
              <p className="surface rounded-lg px-3 py-2">Clean jobsite, organized workflow</p>
              <p className="surface rounded-lg px-3 py-2">Warranty-backed workmanship</p>
            </div>
          </div>
          <div className="surface overflow-hidden rounded-2xl">
            <Image
              src="/images/projects/DSC00338-1.jpg"
              alt="High-end kitchen remodel with island seating, premium appliances, and updated lighting by RHI Pros."
              width={1200}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>
        </Container>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-8 md:py-14">
        <Container>
          <h2 className="text-2xl font-bold text-[var(--accent)]">Start With Your Project Type</h2>
          <p className="mt-2 max-w-3xl text-sm text-[var(--muted)]">
            Pick the service that fits your project. Each page covers scope, pricing factors, and what to expect.
          </p>
          <div className="mt-4 grid gap-3 md:mt-5 md:gap-4 md:grid-cols-3">
            {priorityServices.map((service) => (
              <article key={service.slug} className="surface rounded-lg p-4 md:rounded-xl md:p-5">
                <h3 className="text-base font-semibold md:text-lg">{service.name}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{service.short}</p>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-2 inline-block text-sm font-semibold text-[var(--brand)]"
                >
                  Learn more
                </Link>
              </article>
            ))}
          </div>
          {secondaryServices.length > 0 && (
            <div className="surface mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg px-4 py-3 text-sm md:mt-5">
              <span className="text-[var(--muted)]">We also handle:</span>
              {secondaryServices.map((service, i) => (
                <span key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="font-semibold text-[var(--brand)]">
                    {service.name}
                  </Link>
                  {i < secondaryServices.length - 1 && <span className="text-[var(--muted)]">,</span>}
                </span>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-8 md:py-14">
        <Container>
          <h2 className="text-xl font-bold text-[var(--accent)] md:text-2xl">How It Works</h2>
          <ol className="mt-3 space-y-2 text-sm md:mt-5 md:grid md:grid-cols-3 md:gap-4 md:space-y-0">
            <li className="surface rounded-lg px-4 py-3 md:rounded-xl md:p-5">
              <span className="font-semibold text-[var(--accent)]">1. Tell us about your project</span>
              <span className="ml-1 text-[var(--muted)] md:ml-0 md:mt-1 md:block">
                — share priorities, budget range, and timeline.
              </span>
            </li>
            <li className="surface rounded-lg px-4 py-3 md:rounded-xl md:p-5">
              <span className="font-semibold text-[var(--accent)]">2. Get a written scope and estimate</span>
              <span className="ml-1 text-[var(--muted)] md:ml-0 md:mt-1 md:block">
                — clear project plan with pricing and next steps.
              </span>
            </li>
            <li className="surface rounded-lg px-4 py-3 md:rounded-xl md:p-5">
              <span className="font-semibold text-[var(--accent)]">3. Build with consistent communication</span>
              <span className="ml-1 text-[var(--muted)] md:ml-0 md:mt-1 md:block">
                — regular updates and a final walkthrough.
              </span>
            </li>
          </ol>
        </Container>
      </section>

      {/* ── PROOF: CASE STUDIES + REVIEWS ── */}
      <section className="py-8 md:py-14">
        <Container>
          <h2 className="text-2xl font-bold text-[var(--accent)]">Recent Work</h2>
          <div className="mt-3 grid gap-3 md:mt-4 md:gap-4 md:grid-cols-2">
            {featuredCaseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/projects/${study.slug}`}
                className="surface overflow-hidden rounded-lg hover:border-[var(--brand)] md:rounded-xl"
              >
                <Image
                  src={study.images[0].src}
                  alt={study.images[0].alt}
                  width={900}
                  height={600}
                  className="h-36 w-full object-cover md:h-48"
                />
                <div className="px-4 py-3 md:p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">
                    {study.locationName}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-[var(--accent)] md:mt-1 md:text-base">{study.title}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-3 text-sm md:mt-4">
            <Link href="/projects" className="font-semibold text-[var(--brand)]">
              View all projects
            </Link>
          </p>

          <div className="mt-6 md:mt-10">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-[var(--accent)] md:text-xl">What Clients Say</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <a
                  href={siteConfig.googleBusinessProfileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[var(--brand)] px-3 py-1.5 font-semibold text-[var(--brand)]"
                >
                  Google Reviews
                </a>
                <a
                  href={siteConfig.facebookPageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[var(--brand)] px-3 py-1.5 font-semibold text-[var(--brand)]"
                >
                  Facebook Page
                </a>
              </div>
            </div>
            <div className="mt-3 grid gap-2 md:mt-4 md:gap-3 md:grid-cols-3">
              {featuredReviews.map((item) => (
                <article key={`${item.name}-${item.context}`} className="surface rounded-lg px-4 py-3 md:p-4">
                  <p className="text-sm text-[var(--muted)]">&ldquo;{item.quote}&rdquo;</p>
                  <p className="mt-2 text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-[var(--muted)]">{item.context}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="py-8 md:py-14">
        <Container>
          <div className="surface rounded-xl p-6 text-center md:rounded-2xl md:p-8">
            <h2 className="text-2xl font-extrabold text-[var(--accent)] md:text-3xl">Ready to start your project?</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-[var(--muted)] md:mt-3 md:text-base">
              Tell us what you are thinking. We will follow up with a written scope and clear next steps.
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--brand)]">
              {siteConfig.financing.teaser}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3 md:mt-5">
              <Button href="/request-a-quote">Request a Quote</Button>
              <Button href={siteConfig.phoneHref} variant="secondary">
                Call {siteConfig.phoneDisplay}
              </Button>
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-4 text-xs md:mt-4 md:text-sm">
              <Link href="/our-process" className="font-semibold text-[var(--brand)]">
                Our Process
              </Link>
              <Link href="/warranty" className="font-semibold text-[var(--brand)]">
                Workmanship Warranty
              </Link>
              <Link href="/licenses-and-insurance" className="font-semibold text-[var(--brand)]">
                Licenses &amp; Insurance
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── SERVICE AREAS (lightweight) ── */}
      <section className="pb-8 md:pb-14">
        <Container>
          <p className="text-sm text-[var(--muted)]">
            Serving Allentown, Bethlehem, the Lehigh Valley, Reading, Wyomissing, and Berks County.{" "}
            <Link href="/service-areas" className="font-semibold text-[var(--brand)]">
              See all service areas
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
