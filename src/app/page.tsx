import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbJsonLd, getWebSiteJsonLd } from "@/lib/structuredData";
import { primaryServices } from "@/content/services";
import { visibleCaseStudies } from "@/content/caseStudies";
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
  const homepageSlugs = [
    "allentown-kitchen-layout-upgrade",
    "lehigh-valley-full-exterior-refresh",
    "lehigh-valley-basement-finish-and-detail",
  ];
  const featuredCaseStudies = homepageSlugs
    .map((slug) => visibleCaseStudies.find((s) => s.slug === slug)!)
    .filter(Boolean);
  const featuredReviews = testimonials.slice(0, 3);

  return (
    <>
      <JsonLd data={getWebSiteJsonLd()} />
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }])} />

      {/* Hero */}
      <section className="relative flex min-h-[90vh] w-full items-center justify-center pt-16">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/projects/allentown-kitchen-upgrade/hero/kitchen-high-end-hero.jpg"
            alt="High-end kitchen remodel with island, premium appliances, wood perimeter cabinets, and updated lighting by RHI Pros."
            fill
            className="object-cover object-[center_60%]"
            priority
          />
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        </div>

        {/* Content */}
        <Container className="relative z-10 flex w-full flex-col items-center pb-12 pt-16 text-center shadow-black drop-shadow-sm md:pt-8">
          <p className="text-[0.75rem] font-semibold uppercase leading-snug tracking-[0.25em] !text-white/90 sm:text-xs md:text-sm md:tracking-[0.2em]">
            Lehigh Valley Remodeling &amp; Restoration
          </p>
          <h1 className="pt-4 text-[2.5rem] font-extrabold leading-[1.1] tracking-tight !text-white sm:text-[3.25rem] md:text-[4.5rem]">
            Reimagine
            <span
              className="pointer-events-none mx-[0.1em] inline-block select-none text-[0.8em] font-light !text-white/50"
              aria-hidden="true"
            >
              ·
            </span>
            Build
            <span
              className="pointer-events-none mx-[0.1em] inline-block select-none text-[0.8em] font-light !text-white/50"
              aria-hidden="true"
            >
              ·
            </span>
            Enjoy
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg font-medium leading-relaxed !text-white/90 sm:text-xl md:text-2xl md:leading-[1.5]">
            Thoughtful remodeling and restoration, designed around your home, your goals, and the way you live.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 sm:mt-10">
            <Link
              href="/request-a-quote"
              className="inline-flex h-12 items-center justify-center rounded-sm bg-[var(--brand)] px-8 font-semibold !text-white transition-colors hover:bg-[var(--brand-dark)]"
            >
              Request a Quote
            </Link>
            <Link
              href={siteConfig.phoneHref}
              className="inline-flex h-12 items-center justify-center rounded-sm border border-white/40 bg-white/10 px-8 font-semibold !text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Call {siteConfig.phoneDisplay}
            </Link>
          </div>
        </Container>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-14 md:py-20">
        <Container>
          <FadeIn>
            <h2 className="heading-serif text-3xl text-[var(--accent)] md:text-4xl">Our Services</h2>
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-[var(--muted)] md:text-base">
              Every project starts with a clear scope and honest estimate. Pick the service that fits your vision.
            </p>
            <div className="mt-8 grid gap-y-1 md:mt-10 md:grid-cols-3 md:gap-x-8 md:gap-y-0">
              {priorityServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex items-baseline justify-between border-b border-[var(--border)] py-4 transition-colors hover:border-[var(--brand)] md:flex-col md:items-start md:border-b-0 md:border-l-2 md:border-[var(--border)] md:py-0 md:pl-5 md:hover:border-[var(--brand)]"
                >
                  <div>
                    <h3 className="text-base font-semibold text-[var(--accent)] transition-colors group-hover:text-[var(--brand)] md:text-lg">
                      {service.name}
                    </h3>
                    <p className="mt-1 hidden text-sm leading-relaxed text-[var(--muted)] md:block">{service.short}</p>
                  </div>
                  <span className="text-sm font-semibold text-[var(--brand)] opacity-0 transition-opacity group-hover:opacity-100 md:mt-2">
                    Learn more →
                  </span>
                </Link>
              ))}
            </div>
            {secondaryServices.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--muted)] md:mt-8">
                <span>We also handle:</span>
                {secondaryServices.map((service, i) => (
                  <span key={service.slug}>
                    <Link href={`/services/${service.slug}`} className="font-semibold text-[var(--brand)] hover:underline">
                      {service.name}
                    </Link>
                    {i < secondaryServices.length - 1 && <span className="text-[var(--muted)]">,</span>}
                  </span>
                ))}
              </div>
            )}
          </FadeIn>
        </Container>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section className="surface-soft py-14 md:py-20">
        <Container>
          <FadeIn>
            <h2 className="heading-serif text-3xl text-[var(--accent)] md:text-4xl">Featured Projects</h2>
            <div className="mt-6 grid grid-cols-1 gap-5 md:mt-8 md:grid-cols-3 md:gap-6">
              {featuredCaseStudies.map((study) => (
                <Link
                  key={study.slug}
                  href={`/projects/${study.slug}`}
                  className="group overflow-hidden rounded-xl"
                >
                  <div className="relative overflow-hidden rounded-xl bg-[var(--surface)]">
                    <Image
                      src={study.images[0].src}
                      alt={study.images[0].alt}
                      width={900}
                      height={600}
                      className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-64"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="rounded-full bg-white/20 px-6 py-2 text-sm font-semibold tracking-wide text-[white] backdrop-blur-md">
                        View Project ➔
                      </span>
                    </div>
                  </div>
                  <div className="pt-3 md:pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">
                      {study.locationName}
                    </p>
                    <p className="mt-0.5 text-[0.9375rem] font-semibold text-[var(--accent)] transition-colors group-hover:text-[var(--brand)] md:mt-1 md:text-base">
                      {study.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <p className="mt-5 md:mt-6">
              <Link href="/projects" className="text-sm font-semibold text-[var(--brand)] hover:underline">
                View all projects →
              </Link>
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-14 md:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="heading-serif text-3xl text-[var(--accent)] md:text-4xl">What Clients Say</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              <a
                href={siteConfig.googleBusinessProfileUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--border)] px-3 py-1.5 font-semibold text-[var(--accent)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
              >
                Google Reviews
              </a>
              <a
                href={siteConfig.facebookPageUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--border)] px-3 py-1.5 font-semibold text-[var(--accent)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
              >
                Facebook Page
              </a>
            </div>
          </div>
          <FadeIn delay={0.2}>
            <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-3 md:gap-8">
              {featuredReviews.map((item) => (
                <article key={`${item.name}-${item.context}`} className="relative">
                  <span className="heading-serif absolute -top-3 left-0 text-5xl leading-none text-[var(--brand)]/15 select-none md:-top-4 md:text-6xl" aria-hidden="true">
                    &ldquo;
                  </span>
                  <p className="relative pt-4 text-[0.9375rem] leading-relaxed text-[var(--foreground)] italic md:pt-5 md:text-base">
                    {item.quote}
                  </p>
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-[var(--accent)]">{item.name}</p>
                    <p className="text-xs text-[var(--muted)]">{item.context}</p>
                  </div>
                </article>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="surface-soft py-14 md:py-20">
        <Container>
          <FadeIn>
            <h2 className="heading-serif text-3xl text-[var(--accent)] md:text-4xl">How It Works</h2>
            <ol className="mt-8 space-y-6 md:mt-10 md:grid md:grid-cols-3 md:gap-10 md:space-y-0">
              {[
                { num: "01", title: "Tell us about your project", desc: "Share priorities, budget range, and timeline." },
                { num: "02", title: "Get a written scope and estimate", desc: "Clear project plan with pricing and next steps." },
                { num: "03", title: "Build with consistent communication", desc: "Regular updates and a final walkthrough." },
              ].map((step) => (
                <li key={step.num}>
                  <span className="heading-serif text-4xl text-[var(--brand)]/20 md:text-5xl">{step.num}</span>
                  <h3 className="mt-1 text-base font-semibold text-[var(--accent)] md:text-lg">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{step.desc}</p>
                </li>
              ))}
            </ol>
          </FadeIn>
        </Container>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="bg-[var(--accent)] py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-4xl text-center">
              {/* Trust signals — elegant clean line above massive CTA */}
              <p className="mx-auto mb-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-medium text-white/70 md:mb-12 md:gap-x-5 md:text-base">
                <span>PA Licensed &amp; Insured</span>
                <span className="text-[var(--brand)] opacity-80" aria-hidden="true">·</span>
                <span>Written Estimates</span>
                <span className="text-[var(--brand)] opacity-80" aria-hidden="true">·</span>
                <span>Clean Jobsites</span>
                <span className="text-[var(--brand)] opacity-80" aria-hidden="true">·</span>
                <span>Warranty-Backed Work</span>
              </p>

              <h2 className="heading-serif text-3xl text-white md:text-5xl lg:text-6xl">
                Ready to craft something extraordinary?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-white/80 md:mt-6 md:text-lg">
                Tell us what you are thinking. We will follow up with a written scope and clear next steps to bring your vision to life.
              </p>
              
              <div className="mt-8 flex flex-wrap justify-center gap-4 sm:mt-10">
                <Link
                  href="/request-a-quote"
                  className="inline-flex h-14 items-center justify-center rounded-sm bg-[var(--brand)] px-10 text-lg font-semibold !text-[white] transition-colors hover:bg-[var(--brand-dark)]"
                >
                  Request a Quote
                </Link>
                <Link
                  href={siteConfig.phoneHref}
                  className="inline-flex h-14 items-center justify-center rounded-sm border border-[white]/40 bg-[white]/5 px-10 text-lg font-semibold !text-[white] backdrop-blur-sm transition-colors hover:bg-[white]/10"
                >
                  Call {siteConfig.phoneDisplay}
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-white/60 md:mt-10 md:text-sm">
                <Link href="/our-process" className="font-semibold hover:text-white hover:underline transition-colors">
                  Our Process
                </Link>
                <Link href="/warranty" className="font-semibold hover:text-white hover:underline transition-colors">
                  Workmanship Warranty
                </Link>
                <Link href="/licenses-and-insurance" className="font-semibold hover:text-white hover:underline transition-colors">
                  Licenses &amp; Insurance
                </Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
