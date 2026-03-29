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
              We handle kitchens, bathrooms, basements, exteriors, and damage restoration — with
              a written scope, a clear schedule, and consistent updates on every project.
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
      <section className="py-14">
        <Container>
          <h2 className="text-2xl font-bold text-[var(--accent)]">Start With Your Project Type</h2>
          <p className="mt-2 max-w-3xl text-sm text-[var(--muted)]">
            Pick the service that fits your project. Each page covers scope, pricing factors, and what to expect.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {priorityServices.map((service) => (
              <article key={service.slug} className="surface rounded-xl p-5">
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{service.short}</p>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-3 inline-block text-sm font-semibold text-[var(--brand)]"
                >
                  Learn more
                </Link>
              </article>
            ))}
          </div>
          {secondaryServices.length > 0 && (
            <div className="surface mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg px-4 py-3 text-sm">
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
      <section className="py-14">
        <Container>
          <h2 className="text-2xl font-bold text-[var(--accent)]">How It Works</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="surface rounded-xl p-5">
              <p className="text-lg font-semibold">1. Tell us about your project</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Share your priorities, budget range, and timeline so we can scope it correctly.
              </p>
            </div>
            <div className="surface rounded-xl p-5">
              <p className="text-lg font-semibold">2. Get a written scope and estimate</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                We provide a clear project plan with pricing, phasing, and next steps.
              </p>
            </div>
            <div className="surface rounded-xl p-5">
              <p className="text-lg font-semibold">3. Build with consistent communication</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Work moves forward with regular updates and a final walkthrough.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── PROOF: CASE STUDIES + REVIEWS ── */}
      <section className="py-14">
        <Container>
          <h2 className="text-2xl font-bold text-[var(--accent)]">Recent Work</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {featuredCaseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/projects/${study.slug}`}
                className="surface overflow-hidden rounded-xl hover:border-[var(--brand)]"
              >
                <Image
                  src={study.images[0].src}
                  alt={study.images[0].alt}
                  width={900}
                  height={600}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">
                    {study.locationName}
                  </p>
                  <p className="mt-1 font-semibold text-[var(--accent)]">{study.title}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-4 text-sm">
            <Link href="/projects" className="font-semibold text-[var(--brand)]">
              View all projects
            </Link>
          </p>

          <div className="mt-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-bold text-[var(--accent)]">What Clients Say</h3>
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
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {featuredReviews.map((item) => (
                <article key={`${item.name}-${item.context}`} className="surface rounded-lg p-4">
                  <p className="text-sm text-[var(--muted)]">&ldquo;{item.quote}&rdquo;</p>
                  <p className="mt-3 text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-[var(--muted)]">{item.context}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="py-14">
        <Container>
          <div className="surface rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-extrabold text-[var(--accent)]">Ready to start your project?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-[var(--muted)]">
              Tell us what you are thinking. We will follow up with a written scope and clear next steps.
            </p>
            <p className="mt-3 text-sm font-semibold text-[var(--brand)]">
              {siteConfig.financing.teaser}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Button href="/request-a-quote">Request a Quote</Button>
              <Button href={siteConfig.phoneHref} variant="secondary">
                Call {siteConfig.phoneDisplay}
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
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
      <section className="pb-14">
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
