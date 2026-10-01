import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbJsonLd, getWebSiteJsonLd } from "@/lib/structuredData";
import { primaryServices } from "@/content/services";
import { visibleCaseStudies } from "@/content/caseStudies";
import { featuredProjects } from "@/content/projectShowcase";
import { getProjectImageProps } from "@/content/projectImagePreviews";
import ProjectCard from "@/components/sections/ProjectCard";
import { getFeaturedTestimonials } from "@/content/testimonials";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  description:
    "Kitchen, bathroom, basement, exterior, and restoration projects with clear scopes, fast communication, and quality workmanship across Allentown, Bethlehem, the Lehigh Valley, Reading, and Berks County.",
};

const priorityServiceSlugs = [
  "kitchen-remodeling",
  "bathroom-remodeling",
  "basement-finishing",
  "paver-installation",
  "water-damage-restoration",
  "fire-damage-restoration",
];

const localServiceGroups = [
  {
    name: "Lehigh Valley",
    href: "/lehigh-valley-pa",
    links: [
      { label: "Kitchen remodeling", href: "/lehigh-valley-pa/kitchen-remodeling" },
      { label: "Basement finishing", href: "/lehigh-valley-pa/basement-finishing" },
      { label: "Paver patios", href: "/lehigh-valley-pa/paver-installation" },
    ],
  },
  {
    name: "Berks County",
    href: "/berks-county-pa",
    links: [
      { label: "Kitchen remodeling", href: "/berks-county-pa/kitchen-remodeling" },
      { label: "Kitchen cabinet installation", href: "/berks-county-pa/kitchen-cabinet-installation" },
      { label: "Basement finishing in Reading", href: "/reading-pa/basement-finishing" },
      { label: "Paver patios", href: "/berks-county-pa/paver-installation" },
    ],
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    detail: "Tell us what you want to change, what matters most, and how you use your home.",
  },
  {
    number: "02",
    title: "Assessment",
    detail: "We look closely at the space, talk through options, and identify the work involved.",
  },
  {
    number: "03",
    title: "Written proposal",
    detail: "Receive a clear scope, pricing, and next steps before making a decision.",
  },
  {
    number: "04",
    title: "Materials & schedule",
    detail: "Confirm selections, timing, and the details that help the work run smoothly.",
  },
  { number: "05", title: "Build", detail: "Our team keeps you informed as the planned work takes shape." },
  {
    number: "06",
    title: "Final walkthrough",
    detail: "Review the finished work together and close out any final details.",
  },
];

export default function HomePage() {
  const priorityServices = primaryServices.filter((service) => priorityServiceSlugs.includes(service.slug));
  const secondaryServices = primaryServices.filter((service) => !priorityServiceSlugs.includes(service.slug));
  const featuredReviews = getFeaturedTestimonials();
  const poolStory = visibleCaseStudies.find((study) => study.slug === "bethlehem-pool-patio-renovation");

  return (
    <>
      <JsonLd data={getWebSiteJsonLd()} />
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }])} />

      <section className="home-hero relative isolate flex min-h-[min(900px,100svh)] items-end overflow-hidden bg-[#242720] pt-24 text-white">
        <Image
          src="/images/projects/allentown-kitchen-upgrade/hero/kitchen-high-end-hero.jpg"
          alt="Kitchen with a large island, wood cabinetry and pendant lighting."
          fill
          priority
          sizes="100vw"
          quality={75}
          className="home-hero-image -z-20 object-cover object-[center_58%]"
        />
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(18,23,20,.84)_0%,rgba(18,23,20,.58)_44%,rgba(18,23,20,.08)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(18,23,20,.58)_0%,transparent_45%)]"
          aria-hidden="true"
        />

        <Container className="relative w-full pb-14 pt-24 sm:pb-16 md:pb-20 lg:pb-24">
          <div className="max-w-4xl">
            <p className="home-hero-enter home-hero-enter-1 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.2em] text-white/80 sm:text-sm">
              <span className="h-px w-9 bg-[var(--brand)]" aria-hidden="true" />
              Remodeling &amp; restoration · Lehigh Valley and Berks County
            </p>
            <h1 className="home-hero-enter home-hero-enter-2 heading-serif mt-6 max-w-4xl text-[clamp(3.5rem,9.2vw,8rem)] leading-[.92] tracking-[-.045em] text-white">
              Reimagine<span className="text-[var(--brand)]">.</span>
              <br />
              Build<span className="text-[var(--brand)]">.</span>
              <br className="sm:hidden" /> <span className="text-white/65">Enjoy.</span>
            </h1>
            <div className="home-hero-enter home-hero-enter-3 mt-7 flex flex-col gap-7 sm:mt-9 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
                Thoughtful remodeling and restoration, shaped around your home and the way you live.
              </p>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Link
                  href="/request-a-quote"
                  className="inline-flex min-h-13 items-center justify-center gap-3 bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[var(--brand-dark)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Start a project <span aria-hidden="true">↗</span>
                </Link>
                <Link
                  href={siteConfig.phoneHref}
                  className="inline-flex min-h-13 items-center justify-center border border-white/55 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Call {siteConfig.phoneDisplay}
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-white/25 pt-5 text-[0.65rem] font-semibold uppercase tracking-[.16em] text-white/70 sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:text-xs">
            <p>PA HIC #PA185945 · Written estimates</p>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 text-white transition-colors hover:text-white"
            >
              Explore recent work{" "}
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </Container>
        <span
          className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 select-none font-mono text-[10px] tracking-[.35em] text-white/60 [writing-mode:vertical-rl] lg:block"
          aria-hidden="true"
        >
          RHI PROS · BUILT AROUND YOU
        </span>
      </section>

      <section className="bg-[var(--background)] py-20 sm:py-24 lg:py-32">
        <Container>
          <FadeIn>
            <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <p className="eyebrow">What we do</p>
                <h2 className="heading-serif mt-4 max-w-xl text-4xl leading-[1.03] tracking-[-.03em] text-[var(--accent)] sm:text-5xl lg:text-6xl">
                  Good work starts with a clear plan.
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg lg:justify-self-end">
                From one room to a full restoration, the right team makes the whole experience feel more manageable.
                Choose a service to see how we approach the work.
              </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
              {priorityServices.map((service, index) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="home-service-card group relative isolate min-h-64 overflow-hidden bg-[#323731]"
                >
                  {service.image.src ? (
                    <Image
                      {...getProjectImageProps(service.image)}
                      alt={service.image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="home-service-image -z-20 object-cover"
                    />
                  ) : (
                    <div className="home-service-placeholder absolute inset-0 -z-20" aria-hidden="true" />
                  )}
                  <div
                    className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/20 to-black/5 transition-colors duration-500 group-hover:from-black/90"
                    aria-hidden="true"
                  />
                  {service.image.caption ? (
                    <span className="absolute right-4 top-4 max-w-[70%] bg-black/60 px-3 py-2 text-xs text-white/90">
                      {service.image.caption}
                    </span>
                  ) : null}
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[.18em] text-white/65">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="mt-2 flex items-end justify-between gap-4">
                      <div>
                        <h3 className="heading-serif text-2xl text-white sm:text-3xl">{service.name}</h3>
                        <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/75">{service.short}</p>
                      </div>
                      <span
                        className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/50 text-white transition-all duration-300 group-hover:border-[var(--brand)] group-hover:bg-[var(--brand)]"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {secondaryServices.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--border)] pt-5 text-sm text-[var(--muted)]">
                <span className="font-semibold text-[var(--foreground)]">Also offering</span>
                {secondaryServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="transition-colors hover:text-[var(--brand)]"
                  >
                    {service.name} <span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            )}
            <div className="mt-12 grid gap-8 border-t border-[var(--border)] pt-8 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <p className="eyebrow">Close to home</p>
                <h3 className="heading-serif mt-3 text-3xl text-[var(--accent)]">Find your local service.</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
                  Explore project details and planning advice for your area.
                </p>
                <Link
                  href="/service-areas"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
                >
                  All service areas <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="grid gap-7 sm:grid-cols-2">
                {localServiceGroups.map((group) => (
                  <nav key={group.href} aria-label={`${group.name} services`}>
                    <h4 className="heading-serif text-2xl text-[var(--accent)]">
                      <Link href={group.href} className="underline-offset-4 hover:underline">
                        {group.name}
                      </Link>
                    </h4>
                    <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="inline-block py-1 underline-offset-4 transition-colors hover:text-[var(--brand)] hover:underline"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ))}
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-[var(--surface-soft)] py-20 sm:py-24 lg:py-32">
        <Container>
          <FadeIn>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow">Selected work</p>
                <h2 className="heading-serif mt-4 text-4xl leading-[1.03] tracking-[-.03em] text-[var(--accent)] sm:text-5xl lg:text-6xl">
                  Made for real life.
                </h2>
              </div>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-3 text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--brand)]"
              >
                View all projects{" "}
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>

            <div className="mt-10 grid gap-5 lg:mt-14 lg:auto-rows-[19rem] lg:grid-cols-12">
              {featuredProjects.map((study, index) => (
                <ProjectCard key={study.slug} study={study} variant={index === 0 ? "lead" : "support"} />
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {poolStory?.beforeImages?.[0] && poolStory.afterImages?.[0] && (
        <section className="overflow-hidden bg-[var(--accent)] py-20 text-white sm:py-24 lg:py-32">
          <Container>
            <FadeIn>
              <div className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
                <div>
                  <p className="eyebrow eyebrow-light">The transformation</p>
                  <h2 className="heading-serif mt-4 max-w-xl text-4xl leading-[1.03] tracking-[-.03em] sm:text-5xl lg:text-6xl">
                    A fresh outlook
                    <br />
                    on poolside.
                  </h2>
                </div>
                <div>
                  <p className="max-w-lg text-base leading-relaxed text-white/75">
                    A renewed patio, considered edges, and a cleaner finish around the pool. See the before and after in
                    the poolside photo gallery.
                  </p>
                  <Link
                    href={`/projects/${poolStory.slug}`}
                    className="group mt-6 inline-flex items-center gap-3 border-b border-white/45 pb-2 text-sm font-semibold text-white transition-colors hover:border-[var(--brand)]"
                  >
                    See the transformation{" "}
                    <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  { image: poolStory.beforeImages[0], label: "Before" },
                  { image: poolStory.afterImages[0], label: "After" },
                ].map(({ image, label }) => (
                  <figure key={label}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        {...getProjectImageProps(image)}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <figcaption className="absolute bottom-4 left-4 bg-[#202823]/90 px-4 py-2 text-xs font-semibold uppercase tracking-[.16em] text-white">
                        {label}
                      </figcaption>
                    </div>
                  </figure>
                ))}
              </div>
            </FadeIn>
          </Container>
        </section>
      )}

      <section className="bg-[var(--background)] py-20 sm:py-24 lg:py-32">
        <Container>
          <FadeIn>
            <div className="flex flex-col gap-6 border-b border-[var(--border)] pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">The experience</p>
                <h2 className="heading-serif mt-4 max-w-2xl text-4xl leading-[1.03] tracking-[-.03em] text-[var(--accent)] sm:text-5xl lg:text-6xl">
                  A clear process, from first conversation to final walkthrough.
                </h2>
              </div>
              <Link
                href="/our-process"
                className="group inline-flex shrink-0 items-center gap-3 pb-1 text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--brand)]"
              >
                How our process works{" "}
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
            <ol className="process-list mt-8 grid gap-0 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
              {processSteps.map((step) => (
                <li key={step.number} className="process-item border-b border-[var(--border)] py-6 sm:px-5 lg:px-7">
                  <span className="font-mono text-xs tracking-[.15em] text-[var(--brand)]">{step.number} / 06</span>
                  <h3 className="heading-serif mt-4 text-2xl text-[var(--accent)] sm:text-3xl">{step.title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--muted)]">{step.detail}</p>
                </li>
              ))}
            </ol>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-[#eeeee8] py-20 sm:py-24 lg:py-32">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Independent company reviews</p>
              <h2 className="heading-serif mt-4 text-4xl tracking-[-.03em] text-[var(--accent)] sm:text-5xl">
                Good work, good people.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <a
                href={siteConfig.googleBusinessProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read RHI Pros reviews on Google (opens in a new tab)"
                className="border border-[var(--border)] px-3 py-2 text-[var(--accent)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
              >
                Google Reviews ↗
              </a>
              <a
                href={siteConfig.angiUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read RHI Pros reviews on Angi (opens in a new tab)"
                className="border border-[var(--border)] px-3 py-2 text-[var(--accent)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
              >
                Angi ↗
              </a>
              <a
                href={siteConfig.facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit the RHI Pros Facebook page (opens in a new tab)"
                className="border border-[var(--border)] px-3 py-2 text-[var(--accent)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
              >
                Facebook ↗
              </a>
            </div>
          </div>
          <FadeIn>
            <div className="mt-10 grid gap-px bg-[var(--border)] md:grid-cols-3">
              {featuredReviews.map((item, index) => (
                <article
                  key={`${item.name}-${item.context}`}
                  className="flex min-h-64 flex-col bg-[var(--surface)] p-6 sm:p-8 lg:p-9"
                >
                  <span className="font-mono text-xs tracking-[.16em] text-[var(--brand)]">
                    0{index + 1} / CLIENT NOTE
                  </span>
                  <span className="heading-serif mt-5 text-5xl leading-none text-[var(--brand)]/50" aria-hidden="true">
                    “
                  </span>
                  <blockquote className="-mt-1 flex-1 text-base leading-relaxed text-[var(--foreground)] sm:text-lg">
                    {item.quote}
                  </blockquote>
                  <div className="mt-6 border-t border-[var(--border)] pt-4">
                    <p className="text-sm font-semibold text-[var(--accent)]">{item.name}</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">{item.context}</p>
                    <a
                      href={item.verification.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-xs font-semibold text-[var(--brand)] underline underline-offset-4"
                    >
                      {item.source} ↗
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="home-cta relative isolate overflow-hidden bg-[#202823] py-20 text-white sm:py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[.08]" aria-hidden="true">
          <div className="absolute -right-24 -top-52 h-[35rem] w-[35rem] rounded-full border border-white" />
          <div className="absolute -right-10 -top-36 h-[27rem] w-[27rem] rounded-full border border-white" />
        </div>
        <Container>
          <FadeIn>
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl">
                <p className="eyebrow eyebrow-light">Your home, considered</p>
                <h2 className="heading-serif mt-5 text-4xl leading-[1.02] tracking-[-.03em] sm:text-5xl lg:text-7xl">
                  Let’s make room for what matters.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
                  Start with a conversation. We’ll learn what you have in mind and explain the next steps clearly.
                </p>
                <p className="mt-7 text-xs font-medium uppercase tracking-[.14em] text-white/55">
                  PA HIC #PA185945 · Written estimates · Discuss warranty terms
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:flex-col">
                <Link
                  href="/request-a-quote"
                  className="inline-flex min-h-13 items-center justify-center gap-3 bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-dark)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Request a quote <span aria-hidden="true">↗</span>
                </Link>
                <Link
                  href={siteConfig.phoneHref}
                  className="inline-flex min-h-13 items-center justify-center border border-white/45 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Call {siteConfig.phoneDisplay}
                </Link>
              </div>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/15 pt-5 text-xs text-white/55 sm:mt-16 sm:text-sm">
              <Link href="/our-process" className="transition-colors hover:text-white">
                Our process
              </Link>
              <Link href="/warranty" className="transition-colors hover:text-white">
                Workmanship warranty
              </Link>
              <Link href="/licenses-and-insurance" className="transition-colors hover:text-white">
                Registration &amp; insurance
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
