import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import DimensionLine from "@/components/ui/DimensionLine";
import JsonLd from "@/components/JsonLd";
import { getPageMetadata } from "@/lib/metadata";
import { getBreadcrumbJsonLd, getFaqJsonLd, getWebSiteJsonLd } from "@/lib/structuredData";
import { primaryServices } from "@/content/services";
import { visibleCaseStudies } from "@/content/caseStudies";
import { featuredProjects, orderedShowcaseProjects } from "@/content/projectShowcase";
import { getProjectImageProps } from "@/content/projectImagePreviews";
import { getImageFocalClass } from "@/content/imageFocalPoints";
import { insuranceClaimsClarification } from "@/content/restoration";
import ProjectCard from "@/components/sections/ProjectCard";
import ScopeBuilder, { type ScopeBuilderService } from "@/components/sections/ScopeBuilder";
import ServiceAreaMap from "@/components/sections/ServiceAreaMap";
import { getFeaturedTestimonials } from "@/content/testimonials";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = getPageMetadata({
  title: { absolute: "RHI Pros | Lehigh Valley Remodeling & Restoration" },
  description:
    "Remodeling and damage repairs in Allentown, Bethlehem, Reading, the Lehigh Valley and Berks County. Explore photos and plan a written scope with RHI Pros.",
  path: "/",
  image: {
    url: siteConfig.ogImage,
    alt: "Gable-roof pavilion over a patio with planted garden edges beside a house.",
  },
});

const priorityServiceSlugs = [
  "kitchen-remodeling",
  "bathroom-remodeling",
  "basement-finishing",
  "paver-installation",
  "water-damage-restoration",
  "fire-damage-restoration",
];

const scopeBuilderLabels: Record<string, string> = {
  "kitchen-remodeling": "Kitchen",
  "bathroom-remodeling": "Bathroom",
  "basement-finishing": "Basement",
  "paver-installation": "Patio",
  "flooring-installation": "Flooring",
  "exterior-remodeling": "Exterior",
  "drywall-installation-repair": "Drywall",
  "fire-damage-restoration": "Fire damage",
  "water-damage-restoration": "Water damage",
};

const localServiceGroups = [
  {
    name: "Lehigh Valley",
    href: "/lehigh-valley-pa",
    links: [
      { label: "Allentown", href: "/allentown-pa" },
      { label: "Bethlehem", href: "/bethlehem-pa" },
      { label: "Kitchen remodeling", href: "/lehigh-valley-pa/kitchen-remodeling" },
      { label: "Basement finishing", href: "/lehigh-valley-pa/basement-finishing" },
      { label: "Paver patios", href: "/lehigh-valley-pa/paver-installation" },
      { label: "Paver patios in Allentown", href: "/allentown-pa/paver-installation" },
    ],
  },
  {
    name: "Berks County",
    href: "/berks-county-pa",
    links: [
      { label: "Reading", href: "/reading-pa" },
      { label: "Wyomissing", href: "/wyomissing-pa" },
      { label: "Kitchen remodeling", href: "/berks-county-pa/kitchen-remodeling" },
      { label: "Kitchen cabinet remodeling", href: "/berks-county-pa/kitchen-cabinet-installation" },
      { label: "Basement finishing in Reading", href: "/reading-pa/basement-finishing" },
      { label: "Paver patios in Berks County", href: "/berks-county-pa/paver-installation" },
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

const homeHeroImage = {
  src: "/images/projects/frontier-patio-gable-roof/after/finished-overview.jpg",
  alt: "Gable-roof pavilion over a patio with planted garden edges beside a house.",
};

const spaceDetails = [
  {
    src: "/images/projects/frontier-patio-gable-roof/after/angle-2.jpg",
    alt: "Wood pavilion ceiling with dark beams and recessed lights, viewed from below.",
    title: "Warmth overhead",
    caption: "Wood ceiling, dark beams, and recessed lights.",
    href: "/projects/reading-paver-patio-buildout",
    linkLabel: "Explore the pavilion",
  },
  {
    src: "/images/projects/blue-kitchen-cabinet-counters/process/01-blue-kitchen-cabinets-counter-top-install.jpg",
    alt: "Gray patterned countertop and matching backsplash beside blue cabinets and a sink faucet.",
    title: "A connected finish",
    caption: "A patterned counter and matching backsplash beside blue cabinetry.",
    href: "/projects/blue-kitchen-cabinet-counters",
    linkLabel: "Explore the kitchen",
  },
  {
    src: "/images/projects/lehigh-valley-basement-theater/after/epoxy-floor-big-screen.jpg",
    alt: "Glossy floor with gold and dark flowing patterns in front of a basement media wall.",
    title: "Pattern underfoot",
    caption: "A glossy patterned floor beneath a media wall and recessed lighting.",
    href: "/projects/lehigh-valley-basement-finish-and-detail",
    linkLabel: "Explore the basement",
  },
];

/** Plain answers built only from facts stated elsewhere on the site. */
const homeFaqs = [
  {
    q: "Which areas do you serve?",
    a: "Allentown, Bethlehem and the wider Lehigh Valley, plus Reading, Wyomissing and Berks County. If you are nearby and not sure, call and ask about your address.",
  },
  {
    q: "Will I get a written estimate before work starts?",
    a: "Yes. After we look at the space and talk through options, you receive a written proposal with the scope, pricing and next steps before you decide.",
  },
  {
    q: "Are you a registered Pennsylvania contractor?",
    a: `Yes. RHI Pros (${siteConfig.legalName}) is registered under ${siteConfig.hicLabel}. Ask for the current certificate of insurance when you review your proposal.`,
  },
  {
    q: "Do you repair fire and water damage?",
    a: `Yes. We plan and rebuild affected areas, including drywall, flooring, trim and finishes, and keep any specialist mitigation or cleanup separate in the scope. ${insuranceClaimsClarification}`,
  },
  {
    q: "Can I see examples of your work?",
    a: `Yes. Browse ${orderedShowcaseProjects.length} photo collections of kitchens, bathrooms, basements, patios and exteriors, and read source-linked company reviews on Angi.`,
  },
  {
    q: "Do you offer financing?",
    a: `${siteConfig.financing.teaser} ${siteConfig.financing.shortDisclosure}`,
  },
];

export default function HomePage() {
  const priorityServices = primaryServices.filter((service) => priorityServiceSlugs.includes(service.slug));
  const secondaryServices = primaryServices.filter((service) => !priorityServiceSlugs.includes(service.slug));
  const featuredReviews = getFeaturedTestimonials();
  const poolStory = visibleCaseStudies.find((study) => study.slug === "bethlehem-pool-patio-renovation");
  const scopeServices: ScopeBuilderService[] = primaryServices.map((service) => ({
    slug: service.slug,
    name: service.name,
    label: scopeBuilderLabels[service.slug] ?? service.name,
    whatIncluded: service.whatIncluded,
    pricingFactors: service.pricingFactors,
    qualityFactors: service.qualityFactors,
  }));

  return (
    <>
      <JsonLd data={getWebSiteJsonLd()} />
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }])} />
      <JsonLd data={getFaqJsonLd(homeFaqs)} />

      <section className="home-hero crop-marks relative isolate flex min-h-[min(900px,100svh)] items-end overflow-hidden bg-[#242720] pt-24 text-white [--crop-inset:5.25rem_1rem_1rem]">
        <Image
          {...getProjectImageProps(homeHeroImage)}
          alt={homeHeroImage.alt}
          fill
          priority
          sizes="100vw"
          quality={75}
          className={`home-hero-image -z-20 object-cover ${getImageFocalClass(homeHeroImage.src, "hero")}`}
        />
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(18,23,20,.84)_0%,rgba(18,23,20,.58)_44%,rgba(18,23,20,.08)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(18,23,20,.62)_0%,transparent_45%)]"
          aria-hidden="true"
        />

        <Container className="relative w-full pb-12 pt-24 sm:pb-14 md:pb-16 lg:pb-20">
          <div className="max-w-4xl">
            <h1>
              <span className="home-hero-enter home-hero-enter-1 flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[.2em] text-white/80 sm:text-sm">
                <span className="h-px w-9 shrink-0 bg-[var(--brand-bright)]" aria-hidden="true" />
                Remodeling &amp; restoration in the Lehigh Valley and Berks County
              </span>{" "}
              <span className="home-hero-enter home-hero-enter-2 heading-serif mt-6 block max-w-4xl text-[clamp(3.5rem,9.2vw,8rem)] leading-[.92] tracking-[-.045em] text-white">
                Reimagine<span className="text-[var(--brand-bright)]">.</span>{" "}
                <br />
                Build<span className="text-[var(--brand-bright)]">.</span>{" "}
                <br className="sm:hidden" /> <span className="text-white/65">Enjoy.</span>
              </span>
            </h1>
            <div className="home-hero-enter home-hero-enter-3 mt-7 flex flex-col gap-7 sm:mt-9 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
                Kitchens, bathrooms, basements, outdoor living, and damage repairs—with a written scope before work
                begins.
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

          <div className="mt-12 grid gap-4 text-white/75 sm:mt-16 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6">
            <p className="annotation text-[0.65rem]">{siteConfig.hicLabel}</p>
            <DimensionLine label="Written scope before work begins" className="hidden [--dimension-color:rgb(255_255_255/45%)] [--dimension-label-color:rgb(255_255_255/85%)] sm:flex" />
            <Link
              href="/projects/reading-paver-patio-buildout"
              className="annotation group inline-flex min-h-8 items-center gap-2 text-[0.65rem] text-white transition-colors hover:text-white/80"
            >
              Fig. 01 · Pavilion &amp; paver patio{" "}
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
          DRAWN TO SCOPE · RHI PROS
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
              <div className="lg:justify-self-end">
                <p className="max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                  From one room to a full restoration, the right team makes the whole experience feel more manageable.
                  Choose a service to see how we approach the work.
                </p>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-16 lg:grid-cols-3">
              {priorityServices.map((service, index) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="home-service-card group relative isolate min-h-52 overflow-hidden bg-[#323731] sm:min-h-64"
                >
                  {service.image.src ? (
                    <Image
                      {...getProjectImageProps(service.image)}
                      alt={service.image.alt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className={`home-service-image -z-20 object-cover ${getImageFocalClass(service.image.src)}`}
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
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-7">
                    <span className="annotation hidden text-[0.62rem] text-white/80 sm:block" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")} / {String(priorityServices.length).padStart(2, "0")}
                    </span>
                    <div className="mt-3.5 flex items-end justify-between gap-4">
                      <div>
                        <h3 className="heading-serif text-xl leading-tight text-white sm:text-3xl">{service.name}</h3>
                        <p className="mt-2 hidden max-w-sm text-sm leading-relaxed text-white/75 sm:block">
                          {service.short}
                        </p>
                      </div>
                      <span
                        className="mb-1 hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/50 text-white transition-all duration-300 group-hover:border-[var(--brand)] group-hover:bg-[var(--brand)] sm:flex"
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
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-[var(--border)] pt-5 text-sm text-[var(--muted)]">
                <span className="font-semibold text-[var(--foreground)]">Also offering</span>
                {secondaryServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="inline-flex min-h-8 items-center transition-colors hover:text-[var(--brand)]"
                  >
                    {service.name}&nbsp;<span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            )}
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
                className="group inline-flex min-h-8 items-center gap-3 text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--brand)]"
              >
                View all {orderedShowcaseProjects.length} collections{" "}
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

      <section id="scope-builder" className="drafting-grid border-y border-[var(--border)] py-20 sm:py-24 lg:py-32">
        <Container>
          <div className="mb-12 lg:mb-16">
            <div className="max-w-3xl">
              <p className="eyebrow">Scope builder</p>
              <h2 className="heading-serif mt-4 text-4xl leading-[1.03] tracking-[-.03em] text-[var(--accent)] sm:text-5xl lg:text-6xl">
                Sketch your scope before anyone picks up a tool.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                Choose a space and tick what is on your list. We will draw up the questions that shape price and quality,
                so you can send it with your quote request or save it for later.
              </p>
            </div>
          </div>
          <ScopeBuilder services={scopeServices} />
        </Container>
      </section>

      <section className="bg-[var(--background)] py-16 sm:py-20 lg:py-24">
        <Container>
          <FadeIn>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow">A closer look</p>
                <h2 className="heading-serif mt-4 text-3xl leading-[1.06] tracking-[-.03em] text-[var(--accent)] sm:text-4xl lg:text-5xl">
                  Details that shape the space.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--muted)]">
                  Look closer at ceiling, counter, and floor details across three different spaces.
                </p>
              </div>
              <Link
                href="/projects"
                className="inline-flex min-h-11 shrink-0 items-center gap-3 text-sm font-semibold text-[var(--accent)] underline-offset-4 transition-colors hover:text-[var(--brand)] hover:underline"
              >
                Explore the photo collections <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="-mx-5 mt-9 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-7 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
              {spaceDetails.map((detail, index) => (
                <figure key={detail.src} className="w-[78%] min-w-0 shrink-0 snap-start sm:w-auto">
                  <div className="crop-marks relative aspect-[4/3] overflow-hidden bg-[var(--surface-soft)] [--crop-inset:.7rem]">
                    <Image
                      {...getProjectImageProps(detail)}
                      alt={detail.alt}
                      fill
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 33vw"
                      className={`object-cover ${getImageFocalClass(detail.src)}`}
                    />
                  </div>
                  <figcaption className="border-t border-[var(--border)] pt-4">
                    <p className="annotation text-[0.62rem] text-[var(--muted)]">Detail {String.fromCharCode(65 + index)}</p>
                    <h3 className="heading-serif mt-1 text-2xl text-[var(--accent)]">{detail.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{detail.caption}</p>
                    <Link
                      href={detail.href}
                      className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
                    >
                      {detail.linkLabel} <span aria-hidden="true">↗</span>
                    </Link>
                  </figcaption>
                </figure>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {poolStory?.beforeImages?.[0] && poolStory.afterImages?.[0] && (
        <section className="blueprint-grid overflow-hidden bg-[var(--accent)] py-20 text-white sm:py-24 lg:py-32">
          <Container>
            <FadeIn>
              <div className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
                <div>
                  <p className="eyebrow eyebrow-light">The transformation</p>
                  <h2 className="heading-serif mt-4 max-w-xl text-4xl leading-[1.03] tracking-[-.03em] sm:text-5xl lg:text-6xl">
                    A fresh outlook{" "}
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
                    className="group mt-6 inline-flex items-center gap-3 border-b border-white/45 pb-2 text-sm font-semibold text-white transition-colors hover:border-[var(--brand-bright)]"
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
                  { image: poolStory.beforeImages[0], label: "Before", fig: "Fig. 05a" },
                  { image: poolStory.afterImages[0], label: "After", fig: "Fig. 05b" },
                ].map(({ image, label, fig }) => (
                  <figure key={label}>
                    <div className="crop-marks relative aspect-[4/3] overflow-hidden">
                      <Image
                        {...getProjectImageProps(image)}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className={`object-cover ${getImageFocalClass(image.src)}`}
                      />
                      <figcaption className="absolute bottom-4 left-4 z-[2] flex items-center gap-3 bg-[#202823]/90 px-4 py-2 text-xs font-semibold uppercase tracking-[.16em] text-white">
                        <span className="annotation text-[0.6rem] text-white/60">{fig}</span>
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
            <div className="flex flex-col gap-6 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">The experience</p>
                <h2 className="heading-serif mt-4 max-w-2xl text-4xl leading-[1.03] tracking-[-.03em] text-[var(--accent)] sm:text-5xl lg:text-6xl">
                  A clear process, from first conversation to final walkthrough.
                </h2>
              </div>
              <Link
                href="/our-process"
                className="group inline-flex min-h-8 shrink-0 items-center gap-3 text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--brand)]"
              >
                How our process works{" "}
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
            <DimensionLine label="Six steps, start to finish" />
            <ol className="process-list mt-4 grid gap-0 sm:grid-cols-2 lg:mt-6 lg:grid-cols-3">
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

      <section className="border-t border-[var(--border)] bg-[var(--surface-soft)] py-20 sm:py-24 lg:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-16">
            <div>
              <p className="eyebrow">Close to home</p>
              <h2 className="heading-serif mt-4 text-4xl leading-[1.03] tracking-[-.03em] text-[var(--accent)] sm:text-5xl">
                Two regions. One road between them.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--muted)]">
                We work across the Lehigh Valley and Berks County, from Allentown and Bethlehem to Reading and
                Wyomissing. Choose your area for local planning guidance and services.
              </p>
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                {localServiceGroups.map((group) => (
                  <nav key={group.href} aria-label={`${group.name} services`}>
                    <h3 className="heading-serif text-2xl text-[var(--accent)]">
                      <Link href={group.href} className="underline-offset-4 hover:underline">
                        {group.name}
                      </Link>
                    </h3>
                    <ul className="mt-3 text-sm text-[var(--muted)]">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="inline-flex min-h-9 items-center underline-offset-4 transition-colors hover:text-[var(--brand)] hover:underline"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ))}
              </div>
              <Link
                href="/service-areas"
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
              >
                All service areas <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="paper-sheet p-4 sm:p-8">
              <div className="mb-3 flex items-center justify-between gap-4 px-2 pt-1">
                <p className="annotation text-[0.62rem] text-[var(--muted)]">Service area</p>
                <p className="annotation text-[0.62rem] text-[var(--muted)]">Berks ⟷ Lehigh Valley</p>
              </div>
              <ServiceAreaMap />
            </div>
          </div>
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
                className="inline-flex min-h-9 items-center border border-[var(--border)] px-3 text-[var(--accent)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
              >
                Google Reviews ↗
              </a>
              <a
                href={siteConfig.angiUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read RHI Pros reviews on Angi (opens in a new tab)"
                className="inline-flex min-h-9 items-center border border-[var(--border)] px-3 text-[var(--accent)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
              >
                Angi ↗
              </a>
              <a
                href={siteConfig.facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit the RHI Pros Facebook page (opens in a new tab)"
                className="inline-flex min-h-9 items-center border border-[var(--border)] px-3 text-[var(--accent)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
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
                      aria-label={`Read ${item.name}'s original review on ${item.verification.platform} (opens in a new tab)`}
                      className="mt-1 inline-flex min-h-6 items-center text-xs font-semibold text-[var(--brand)] underline underline-offset-4"
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

      <section className="bg-[var(--background)] py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="eyebrow">Before you call</p>
              <h2 className="heading-serif mt-4 text-4xl leading-[1.03] tracking-[-.03em] text-[var(--accent)] sm:text-5xl">
                Straight answers.
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-[var(--muted)]">
                Still wondering about something? Call{" "}
                <a href={siteConfig.phoneHref} className="font-semibold text-[var(--brand)] underline underline-offset-4">
                  {siteConfig.phoneDisplay}
                </a>{" "}
                or email{" "}
                <a
                  href={`mailto:${siteConfig.primaryEmail}`}
                  className="font-semibold text-[var(--brand)] underline underline-offset-4"
                >
                  {siteConfig.primaryEmail}
                </a>
                .
              </p>
            </div>
            <div className="border-t border-[var(--accent)]">
              {homeFaqs.map((faq, index) => (
                <details key={faq.q} className="group border-b border-[var(--border)]">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center gap-5 py-4 text-left [&::-webkit-details-marker]:hidden">
                    <span className="annotation w-6 shrink-0 text-[0.62rem] text-[var(--brand)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="heading-serif flex-1 text-xl leading-snug text-[var(--accent)] sm:text-2xl">
                      {faq.q}
                    </span>
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--accent)] transition-transform duration-300 group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="pb-6 pl-11 pr-12 text-base leading-relaxed text-[var(--muted)]">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="home-cta blueprint-grid relative isolate overflow-hidden bg-[#202823] py-20 text-white sm:py-24 lg:py-32">
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
                <p className="annotation mt-7 text-[0.65rem] text-white/60">
                  {siteConfig.hicLabel} · Written estimates · Discuss warranty terms
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
            <div className="mt-12 flex flex-wrap gap-x-6 gap-y-1 border-t border-white/15 pt-4 text-xs text-white/60 sm:mt-16 sm:text-sm">
              <Link href="#scope-builder" className="inline-flex min-h-9 items-center transition-colors hover:text-white">
                Sketch your scope
              </Link>
              <Link href="/our-process" className="inline-flex min-h-9 items-center transition-colors hover:text-white">
                Our process
              </Link>
              <Link href="/warranty" className="inline-flex min-h-9 items-center transition-colors hover:text-white">
                Workmanship warranty
              </Link>
              <Link
                href="/licenses-and-insurance"
                className="inline-flex min-h-9 items-center transition-colors hover:text-white"
              >
                Registration &amp; insurance
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
