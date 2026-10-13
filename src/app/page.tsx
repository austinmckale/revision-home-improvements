import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import DimensionLine from "@/components/ui/DimensionLine";
import JsonLd from "@/components/JsonLd";
import { getPageMetadata } from "@/lib/metadata";
import { getBreadcrumbJsonLd, getFaqJsonLd, getWebSiteJsonLd } from "@/lib/structuredData";
import { getServiceBySlug, primaryServices, serviceLabel, type Service } from "@/content/services";
import { visibleCaseStudies } from "@/content/caseStudies";
import { featuredProjects, orderedShowcaseProjects } from "@/content/projectShowcase";
import { getProjectImageProps } from "@/content/projectImagePreviews";
import { getImageFocalClass } from "@/content/imageFocalPoints";
import { insuranceClaimsClarification } from "@/content/restoration";
import ProjectSpread from "@/components/sections/ProjectSpread";
import ScopeBuilder, { type ScopeBuilderService } from "@/components/sections/ScopeBuilder";
import ServiceAreaMap from "@/components/sections/ServiceAreaMap";
import { getFeaturedTestimonials } from "@/content/testimonials";
import { company } from "@/content/company";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = getPageMetadata({
  title: { absolute: "RHI Pros | Lehigh Valley Remodeling & Restoration" },
  description:
    "Remodeling and damage repairs in Allentown, Bethlehem, Reading, the Lehigh Valley and Berks County. See our work and request a quote from RHI Pros.",
  path: "/",
  image: {
    url: siteConfig.ogImage,
    alt: "Gable-roof pavilion over a patio with planted garden edges beside a house.",
  },
});

const remodelingServiceOrder = [
  "kitchen-remodeling",
  "bathroom-remodeling",
  "basement-finishing",
  "paver-installation",
  "flooring-installation",
  "exterior-remodeling",
  "drywall-installation-repair",
];

const damageRepairSlugs = ["fire-damage-restoration", "water-damage-restoration"];

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

type AreaLink = { label: string; href: string };

/** Local pages linked from the homepage, one sentence per region. */
const localAreas: Array<{ region: AreaLink; towns: AreaLink[]; services: AreaLink[]; plus: AreaLink }> = [
  {
    region: { label: "the Lehigh Valley", href: "/lehigh-valley-pa" },
    towns: [
      { label: "Allentown", href: "/allentown-pa" },
      { label: "Bethlehem", href: "/bethlehem-pa" },
    ],
    services: [
      { label: "kitchen remodeling", href: "/lehigh-valley-pa/kitchen-remodeling" },
      { label: "basement finishing", href: "/lehigh-valley-pa/basement-finishing" },
      { label: "paver patios", href: "/lehigh-valley-pa/paver-installation" },
    ],
    plus: { label: "paver patios in Allentown", href: "/allentown-pa/paver-installation" },
  },
  {
    region: { label: "Berks County", href: "/berks-county-pa" },
    towns: [
      { label: "Reading", href: "/reading-pa" },
      { label: "Wyomissing", href: "/wyomissing-pa" },
    ],
    services: [
      { label: "kitchen remodeling", href: "/berks-county-pa/kitchen-remodeling" },
      { label: "kitchen cabinet remodeling", href: "/berks-county-pa/kitchen-cabinet-installation" },
      { label: "paver patios in Berks County", href: "/berks-county-pa/paver-installation" },
    ],
    plus: { label: "basement finishing in Reading", href: "/reading-pa/basement-finishing" },
  },
];

const homeHeroImage = {
  src: "/images/projects/frontier-patio-gable-roof/after/finished-overview.jpg",
  alt: "Gable-roof pavilion over a patio with planted garden edges beside a house.",
};

/** Plain answers built only from facts stated elsewhere on the site. */
const homeFaqs = [
  {
    q: "Which areas do you serve?",
    a: "Allentown, Bethlehem and the wider Lehigh Valley, plus Reading, Wyomissing and Berks County. If you are nearby and not sure, call and ask about your address.",
  },
  {
    q: "Will I get a written estimate before work starts?",
    a: "Yes. After we see the space and talk through the options, you receive a written proposal with the work, the price and the next steps before you decide.",
  },
  {
    q: "Are you a registered Pennsylvania contractor?",
    a: `Yes. RHI Pros (${siteConfig.legalName}) is registered under ${siteConfig.hicLabel}. Ask for the current certificate of insurance when you review your proposal.`,
  },
  {
    q: "Do you repair fire and water damage?",
    a: `Yes. We rebuild damaged rooms, including drywall, flooring, trim and finishes, once any specialist drying or cleanup is done. ${insuranceClaimsClarification}`,
  },
  {
    q: "Can I see examples of your work?",
    a: `Yes. Browse ${orderedShowcaseProjects.length} projects, from kitchens and bathrooms to basements, patios and exteriors, and read our reviews on Google and Angi.`,
  },
  {
    q: "Do you offer financing?",
    a: `${siteConfig.financing.teaser} ${siteConfig.financing.shortDisclosure}`,
  },
];

type ServiceRow = { href: string; label: string; short: string };

const serviceRow = (service: Service): ServiceRow => ({
  href: `/services/${service.slug}`,
  label: serviceLabel(service),
  short: service.short,
});

/** Joins inline links into a sentence: "A, B and C". */
function LinkSeries({ links }: { links: AreaLink[] }) {
  return links.map((link, index) => (
    <span key={link.href}>
      {index > 0 ? (index === links.length - 1 ? " and " : ", ") : null}
      <Link
        href={link.href}
        className="text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4 transition-colors hover:text-[var(--brand)] hover:decoration-current"
      >
        {link.label}
      </Link>
    </span>
  ));
}

export default function HomePage() {
  const [leadProject, ...moreProjects] = featuredProjects;
  const featuredReviews = getFeaturedTestimonials();
  const [leadReview, ...moreReviews] = [...featuredReviews].sort((a, b) => b.quote.length - a.quote.length);
  const poolStory = visibleCaseStudies.find((study) => study.slug === "bethlehem-pool-patio-renovation");
  const insuranceClaims = getServiceBySlug("insurance-claims");
  const rank = (slug: string) => {
    const index = remodelingServiceOrder.indexOf(slug);
    return index < 0 ? remodelingServiceOrder.length : index;
  };
  const remodelingRows = primaryServices
    .filter((service) => !damageRepairSlugs.includes(service.slug))
    .sort((a, b) => rank(a.slug) - rank(b.slug))
    .map(serviceRow);
  const damageRows: ServiceRow[] = [
    ...primaryServices.filter((service) => damageRepairSlugs.includes(service.slug)).map(serviceRow),
    ...(insuranceClaims
      ? [{ href: "/insurance-claims", label: serviceLabel(insuranceClaims), short: insuranceClaims.short }]
      : []),
  ];
  const serviceGroups = [
    { title: "Remodeling", rows: remodelingRows, start: 1 },
    { title: "Repairs after fire & water damage", rows: damageRows, start: remodelingRows.length + 1 },
  ];
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
              <span className="home-hero-enter home-hero-enter-2 heading-serif mt-6 block text-[clamp(3rem,7.4vw,6.75rem)] leading-[.95] tracking-[-.04em] text-white">
                Better rooms,{" "}
                <br />
                <span className="text-white/70">
                  from Reading <br className="hidden sm:block" />
                  to Bethlehem<span className="text-[var(--brand-bright)]">.</span>
                </span>
              </span>
            </h1>
            <div className="home-hero-enter home-hero-enter-3 mt-7 flex flex-col gap-7 sm:mt-9 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
                Kitchens, bathrooms, basements and outdoor rooms, plus rebuilds after fire and water damage. You see the
                work and the price in writing before you decide.
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
            <DimensionLine className="hidden [--dimension-color:rgb(255_255_255/45%)] sm:flex" />
            <Link
              href="/projects/reading-paver-patio-buildout"
              className="annotation group inline-flex min-h-8 items-center gap-2 text-[0.65rem] text-white transition-colors hover:text-white/80"
            >
              Pictured: patio &amp; gable-roof pavilion{" "}
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </Container>
      </section>

      {leadProject ? (
        <section className="bg-[var(--background)] py-20 sm:py-24 lg:py-32">
          <Container>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <p className="eyebrow">Selected work</p>
                <h2 className="heading-serif mt-4 text-4xl leading-[1.03] tracking-[-.03em] text-[var(--accent)] sm:text-5xl lg:text-6xl">
                  An outdoor room, a media room and a kitchen.
                </h2>
              </div>
              <Link
                href="/projects"
                className="group inline-flex min-h-8 shrink-0 items-center gap-3 text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--brand)]"
              >
                View all {orderedShowcaseProjects.length} projects{" "}
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>

            <div className="mt-12 border-t border-[var(--border)] pt-10 lg:mt-16 lg:pt-14">
              <ProjectSpread study={leadProject} number={1} size="lead" />
            </div>
            {moreProjects.length > 0 ? (
              <FadeIn>
                <div className="mt-16 grid gap-16 border-t border-[var(--border)] pt-10 lg:mt-24 lg:grid-cols-2 lg:gap-12 lg:pt-14">
                  {moreProjects.map((study, index) => (
                    <ProjectSpread key={study.slug} study={study} number={index + 2} />
                  ))}
                </div>
              </FadeIn>
            ) : null}
          </Container>
        </section>
      ) : null}

      {poolStory?.beforeImages?.[0] && poolStory.afterImages?.[0] && (
        <section className="blueprint-grid overflow-hidden bg-[var(--accent)] py-20 text-white sm:py-24 lg:py-32">
          <Container>
            <FadeIn>
              <div className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
                <div>
                  <p className="eyebrow eyebrow-light">Before &amp; after</p>
                  <h2 className="heading-serif mt-4 max-w-xl text-4xl leading-[1.03] tracking-[-.03em] sm:text-5xl lg:text-6xl">
                    Same pool. <br />
                    New surround.
                  </h2>
                </div>
                <div>
                  <p className="max-w-lg text-base leading-relaxed text-white/75">
                    A gray textured surround and a light stone-pattern border now follow every curve of the pool, from
                    the steps to the rounded edges.
                  </p>
                  <Link
                    href={`/projects/${poolStory.slug}`}
                    className="group mt-6 inline-flex items-center gap-3 border-b border-white/45 pb-2 text-sm font-semibold text-white transition-colors hover:border-[var(--brand-bright)]"
                  >
                    See the poolside project{" "}
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
                    <div className="crop-marks relative aspect-[4/3] overflow-hidden">
                      <Image
                        {...getProjectImageProps(image)}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className={`object-cover ${getImageFocalClass(image.src)}`}
                      />
                      <figcaption className="absolute bottom-4 left-4 z-[2] bg-[#202823]/90 px-4 py-2 text-xs font-semibold uppercase tracking-[.16em] text-white">
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
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow">What we do</p>
              <h2 className="heading-serif mt-4 max-w-md text-4xl leading-[1.03] tracking-[-.03em] text-[var(--accent)] sm:text-5xl lg:text-6xl">
                What we build and rebuild.
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                From a single room to a full rebuild after damage. Choose a service to see how we approach it.
              </p>
            </div>
            <div className="grid gap-12">
              {serviceGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="annotation border-b border-[var(--accent)] pb-3 text-[0.62rem] text-[var(--muted)]">
                    {group.title}
                  </h3>
                  <ul>
                    {group.rows.map((row, index) => (
                      <li key={row.href} className="border-b border-[var(--border)]">
                        <Link
                          href={row.href}
                          className="group grid grid-cols-[1.75rem_1fr_auto] items-center gap-x-3 py-4 sm:grid-cols-[2.5rem_1fr_auto] sm:gap-x-4 sm:py-5 md:grid-cols-[2.5rem_minmax(0,1.1fr)_minmax(0,1fr)_auto]"
                        >
                          <span className="annotation text-[0.62rem] text-[var(--brand)]" aria-hidden="true">
                            {String(group.start + index).padStart(2, "0")}
                          </span>
                          <span className="heading-serif text-[1.375rem] leading-tight text-[var(--accent)] transition-colors group-hover:text-[var(--brand)] sm:text-[1.625rem]">
                            {row.label}
                          </span>
                          <span className="col-span-2 col-start-2 mt-1 text-sm leading-relaxed text-[var(--muted)] md:col-span-1 md:col-start-3 md:mt-0">
                            {row.short}
                          </span>
                          <span
                            className="col-start-3 row-start-1 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] text-sm text-[var(--accent)] transition-all duration-300 group-hover:border-[var(--brand)] group-hover:bg-[var(--brand)] group-hover:text-white sm:h-9 sm:w-9 md:col-start-4"
                            aria-hidden="true"
                          >
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="scope-builder" className="drafting-grid border-y border-[var(--border)] py-20 sm:py-24 lg:py-32">
        <Container>
          <div className="mb-12 lg:mb-16">
            <div className="max-w-3xl">
              <p className="eyebrow">Project planner</p>
              <h2 className="heading-serif mt-4 text-4xl leading-[1.03] tracking-[-.03em] text-[var(--accent)] sm:text-5xl lg:text-6xl">
                Plan your project before the first visit.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                Choose a room and check off what is on your list. We add the questions that shape price and quality, and
                you can send it straight to us or save it for later.
              </p>
            </div>
          </div>
          <ScopeBuilder services={scopeServices} />
        </Container>
      </section>

      <section className="bg-[var(--surface-soft)] py-20 sm:py-24 lg:py-32">
        <Container>
          <FadeIn>
            <div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
              <div>
                <p className="eyebrow">Who you&rsquo;ll work with</p>
                <h2 className="heading-serif mt-4 max-w-lg text-4xl leading-[1.03] tracking-[-.03em] text-[var(--accent)] sm:text-5xl">
                  A local company, owned by {company.owner.name}.
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--muted)]">
                  RHI Pros is the working name of {company.legalName}, a registered Pennsylvania home improvement
                  contractor.
                </p>
                <dl className="mt-8 grid max-w-md grid-cols-2 border-t border-[var(--accent)]">
                  <div className="border-b border-r border-[var(--border)] py-4 pr-4">
                    <dt className="annotation text-[0.58rem] text-[var(--muted)]">Formerly</dt>
                    <dd className="mt-1.5 text-sm font-semibold text-[var(--accent)]">{company.formerNames[0]}</dd>
                  </div>
                  <div className="border-b border-[var(--border)] py-4 pl-4">
                    <dt className="annotation text-[0.58rem] text-[var(--muted)]">Registration</dt>
                    <dd className="mt-1.5 text-sm font-semibold text-[var(--accent)]">{company.license.label}</dd>
                  </div>
                </dl>
                <Link
                  href="/about"
                  className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
                >
                  About RHI Pros{" "}
                  <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>

              {leadReview ? (
                <div>
                  <figure className="border-t border-[var(--accent)] pt-8">
                    <span className="heading-serif block h-10 text-7xl leading-none text-[var(--brand)]/45" aria-hidden="true">
                      “
                    </span>
                    <blockquote className="heading-serif text-3xl leading-[1.18] tracking-[-.015em] text-[var(--accent)] sm:text-4xl">
                      {leadReview.quote}
                    </blockquote>
                    <figcaption className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                      <span className="font-semibold text-[var(--accent)]">{leadReview.name}</span>
                      <a
                        href={leadReview.verification.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Read ${leadReview.name}'s full review on ${leadReview.verification.platform} (opens in a new tab)`}
                        className="inline-flex min-h-6 items-center text-[var(--muted)] underline-offset-4 transition-colors hover:text-[var(--brand)] hover:underline"
                      >
                        {leadReview.source} ↗
                      </a>
                    </figcaption>
                  </figure>
                  {moreReviews.length > 0 ? (
                    <div className="mt-10 grid gap-8 sm:grid-cols-2">
                      {moreReviews.map((item) => (
                        <figure key={`${item.name}-${item.context}`} className="border-t border-[var(--border)] pt-5">
                          <blockquote className="heading-serif text-xl leading-snug text-[var(--accent)] sm:text-2xl">
                            “{item.quote}”
                          </blockquote>
                          <figcaption className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                            <span className="font-semibold text-[var(--accent)]">{item.name}</span>
                            <a
                              href={item.verification.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Read ${item.name}'s full review on ${item.verification.platform} (opens in a new tab)`}
                              className="inline-flex min-h-6 items-center text-[var(--muted)] underline-offset-4 transition-colors hover:text-[var(--brand)] hover:underline"
                            >
                              {item.source} ↗
                            </a>
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  ) : null}
                  <p className="mt-10 text-sm text-[var(--muted)]">
                    Read more reviews on{" "}
                    <a
                      href={siteConfig.googleBusinessProfileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Read RHI Pros reviews on Google (opens in a new tab)"
                      className="font-semibold text-[var(--accent)] underline underline-offset-4 transition-colors hover:text-[var(--brand)]"
                    >
                      Google
                    </a>{" "}
                    and{" "}
                    <a
                      href={siteConfig.angiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Read RHI Pros reviews on Angi (opens in a new tab)"
                      className="font-semibold text-[var(--accent)] underline underline-offset-4 transition-colors hover:text-[var(--brand)]"
                    >
                      Angi
                    </a>
                    .
                  </p>
                </div>
              ) : null}
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-[var(--background)] py-20 sm:py-24 lg:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-16">
            <div>
              <p className="eyebrow">Close to home</p>
              <h2 className="heading-serif mt-4 text-4xl leading-[1.03] tracking-[-.03em] text-[var(--accent)] sm:text-5xl">
                Two regions. One road between them.
              </h2>
              <div className="mt-8 grid gap-5 border-t border-[var(--border)] pt-6 text-base leading-relaxed text-[var(--muted)]">
                {localAreas.map((area) => (
                  <p key={area.region.href}>
                    We work in <LinkSeries links={[area.region]} />, including <LinkSeries links={area.towns} />. See{" "}
                    <LinkSeries links={area.services} />, plus <LinkSeries links={[area.plus]} />.
                  </p>
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

      <section className="border-t border-[var(--border)] bg-[var(--surface-soft)] py-20 sm:py-24 lg:py-28">
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
                . You can also see{" "}
                <Link href="/our-process" className="font-semibold text-[var(--brand)] underline underline-offset-4">
                  how a project runs
                </Link>
                , from the first call to the final walkthrough.
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
                <p className="eyebrow eyebrow-light">Start a project</p>
                <h2 className="heading-serif mt-5 text-4xl leading-[1.02] tracking-[-.03em] sm:text-5xl lg:text-7xl">
                  What would you change first?
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
                  Call, or send a few details and photos. We&rsquo;ll come see the space and talk through the options
                  with you.
                </p>
                <p className="annotation mt-7 text-[0.65rem] text-white/60">
                  {siteConfig.hicLabel} · Lehigh Valley &amp; Berks County
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
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
