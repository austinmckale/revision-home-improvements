import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import QuoteForm from "@/components/forms/QuoteForm";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import {
  getCaseStudyBySlug,
  type CaseStudy,
} from "@/content/caseStudies";
import { siteConfig } from "@/content/site";
import {
  getBreadcrumbJsonLd,
  getServiceJsonLd,
} from "@/lib/structuredData";
import { absoluteUrl } from "@/lib/url";

const route = "/berks-county-pa/kitchen-cabinet-installation";
const heroImage = {
  src: "/images/projects/ryan-kitchen/after/01-ryans-kitchen-after-done.jpg",
  alt: "Kitchen after remodel with updated cabinets, counters, appliances, and lighting.",
};

export const metadata: Metadata = {
  title: { absolute: "Kitchen Cabinet Installation in Berks County | RHI Pros" },
  description:
    "Planning new kitchen cabinets in Berks County? RHI Pros coordinates cabinet replacement and installation with counters, fixtures and surrounding kitchen work.",
  alternates: { canonical: route },
  openGraph: {
    title: "Kitchen Cabinet Replacement & Installation in Berks County",
    description:
      "Plan cabinet replacement and installation with the countertops, fixtures, appliances and surrounding kitchen work considered together.",
    url: route,
    images: [{ url: heroImage.src, alt: heroImage.alt }],
  },
};

const scopeOptions = [
  {
    heading: "Replace cabinets within the existing layout",
    copy:
      "This may be appropriate when the basic footprint works and the surrounding kitchen can accommodate the selected cabinets with limited changes.",
  },
  {
    heading: "Adjust the layout",
    copy:
      "Moving cabinets, appliances or the sink can affect walls, flooring, plumbing, electrical locations and countertop measurements.",
  },
  {
    heading: "Coordinate a complete kitchen remodel",
    copy:
      "When cabinets are only one part of the project, the work can be planned alongside counters, backsplash, flooring, fixtures and finish repairs.",
  },
];

const scopeFactors = [
  {
    heading: "Existing footprint",
    copy:
      "Keeping the current cabinet locations may reduce surrounding changes, but field conditions still need to be reviewed.",
  },
  {
    heading: "Appliance dimensions",
    copy:
      "Refrigerators, ranges, dishwashers and ventilation equipment affect cabinet spacing and clearances.",
  },
  {
    heading: "Sink and plumbing location",
    copy:
      "Changes near the sink may affect plumbing access, cabinet dimensions and countertop planning.",
  },
  {
    heading: "Countertops and backsplash",
    copy:
      "Countertops are coordinated after the cabinet layout is established, and backsplash work follows the relevant installation sequence.",
  },
  {
    heading: "Flooring and walls",
    copy:
      "Removing cabinets can reveal unfinished flooring, wall damage or areas requiring preparation before installation.",
  },
  {
    heading: "Electrical and lighting",
    copy:
      "Layout changes may affect outlet, switch or lighting locations. Any required specialty work must be identified in the project scope.",
  },
];

const coordinationSteps = [
  {
    heading: "Review the existing kitchen",
    copy:
      "Document the current layout, affected surfaces and proposed changes.",
  },
  {
    heading: "Confirm the intended scope",
    copy:
      "Determine whether the project is cabinet-focused or part of a larger kitchen remodel.",
  },
  {
    heading: "Coordinate selections and dimensions",
    copy:
      "Confirm the information needed to plan cabinets, appliances, countertops, fixtures and related work.",
  },
  {
    heading: "Prepare and install",
    copy:
      "Complete the agreed preparation and cabinet installation in the proper sequence.",
  },
  {
    heading: "Finish the surrounding work",
    copy:
      "Address included countertop, backsplash, wall, trim, fixture or flooring work according to the written scope.",
  },
];

const cabinetProjectSlugs = [
  "blue-kitchen-cabinet-counters",
  "ryan-kitchen-remodel",
];

const cabinetProjects = cabinetProjectSlugs
  .map((slug) => getCaseStudyBySlug(slug))
  .filter((project): project is CaseStudy => Boolean(project));

const faqItems = [
  {
    q: "Can cabinets be replaced without remodeling the entire kitchen?",
    a:
      "Sometimes. If the existing layout works and the surrounding counters, flooring, walls, appliances and fixtures are compatible with the proposed cabinet work, the scope may remain more focused. Existing conditions still need to be reviewed.",
  },
  {
    q: "Can the cabinet layout be changed?",
    a:
      "Potentially. Layout changes may affect appliances, countertops, plumbing, electrical locations, flooring and wall repairs, so those connections need to be included in planning.",
  },
  {
    q: "Does RHI Pros manufacture cabinets?",
    a:
      "No. RHI Pros coordinates remodeling and installation work; it is not a cabinet manufacturer or retail showroom.",
  },
  {
    q: "Does cabinet installation include countertops and backsplash?",
    a:
      "Those items can be discussed as part of the kitchen scope. The written proposal should identify exactly which surrounding work is included.",
  },
  {
    q: "Do I need to have cabinets selected before requesting a quote?",
    a:
      "Not necessarily. Photos, approximate dimensions and an idea of the desired layout are enough to begin the conversation. Product information becomes important before final measurements and scheduling.",
  },
  {
    q: "Do cabinet projects require permits?",
    a:
      "Requirements depend on the municipality and whether the project includes layout, plumbing, electrical or other regulated work. Applicable requirements should be reviewed after the scope is defined.",
  },
];

function ProjectCard({ project }: { project: CaseStudy }) {
  const image = project.images[0];

  return (
    <article className="surface overflow-hidden rounded-2xl">
      <Link
        href={`/projects/${project.slug}`}
        className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
      >
        {image ? (
          <div className="relative h-56 overflow-hidden bg-[var(--surface-soft)]">
            <Image
              src={image.src}
              alt={image.alt}
              width={900}
              height={600}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        ) : null}
        <div className="p-5 md:p-6">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
            {project.locationName}
          </p>
          <h3 className="mt-1 text-xl font-semibold text-[var(--accent)]">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            {project.summary}
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
            {project.scope.slice(0, 2).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <span className="mt-4 inline-block text-sm font-semibold text-[var(--brand)]">
            View project →
          </span>
        </div>
      </Link>
    </article>
  );
}

export default function KitchenCabinetInstallationPage() {
  return (
    <>
      <JsonLd
        data={getServiceJsonLd(
          "Kitchen Cabinet Replacement and Installation",
          absoluteUrl(route),
          "Berks County, Pennsylvania",
        )}
      />
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: "Berks County", href: "/berks-county-pa" },
          { name: "Kitchen Cabinet Installation", href: route },
        ])}
      />

      <section className="hero-band py-10 md:py-16">
        <Container className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
          <FadeIn>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--brand)]">
              Berks County, PA
            </p>
            <h1 className="heading-serif mt-2 text-4xl text-[var(--accent)] md:text-5xl">
              Kitchen Cabinet Replacement and Installation in Berks County
            </h1>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-[var(--muted)] md:text-base">
              Cabinets affect more than storage. Their dimensions and layout
              influence countertops, appliances, sinks, backsplashes, flooring and
              the surrounding walls. RHI Pros plans cabinet replacement and
              installation as part of a coordinated kitchen scope so those
              connections are addressed before work begins.
            </p>
            <div className="mt-6 grid gap-2 text-sm text-[var(--muted)] sm:grid-cols-2">
              <p className="surface rounded-lg px-3 py-2">
                Written scope before work begins
              </p>
              <p className="surface rounded-lg px-3 py-2">
                PA HIC registered · {siteConfig.hicNumber}
              </p>
              <p className="surface rounded-lg px-3 py-2">
                Insured and warranty-backed
              </p>
              <p className="surface rounded-lg px-3 py-2">
                Clear communication throughout
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="#quote-form-section">Request a Kitchen Quote</Button>
              <Button href={siteConfig.phoneHref} variant="secondary">
                Call {siteConfig.phoneDisplay}
              </Button>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="surface overflow-hidden rounded-2xl">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                width={900}
                height={1100}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <FadeIn>
            <div className="max-w-3xl">
              <h2 className="heading-serif text-3xl text-[var(--accent)]">
                Cabinet-focused project or complete kitchen remodel?
              </h2>
              <p className="mt-3 leading-relaxed text-[var(--muted)]">
                Some homeowners want to replace cabinets while keeping the general
                kitchen layout. Others need a broader remodel involving counters,
                fixtures, flooring, lighting or layout changes. Defining that
                boundary early helps determine the appropriate scope.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {scopeOptions.map((item) => (
                <article className="surface rounded-2xl p-5 md:p-6" key={item.heading}>
                  <h3 className="text-lg font-semibold text-[var(--accent)]">
                    {item.heading}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {item.copy}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
              RHI Pros is a remodeling contractor, not a cabinet manufacturer or
              retail showroom. Cabinet products and selections must be appropriate
              for the agreed project scope.
            </p>
            <Link
              href="/berks-county-pa/kitchen-remodeling"
              className="mt-4 inline-block text-sm font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
            >
              Explore Complete Kitchen Remodeling →
            </Link>
          </FadeIn>
        </Container>
      </section>

      <section className="surface-soft py-12 md:py-16">
        <Container>
          <FadeIn>
            <h2 className="heading-serif text-3xl text-[var(--accent)]">
              What affects a cabinet project?
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {scopeFactors.map((item, index) => (
                <article className="surface rounded-2xl p-5" key={item.heading}>
                  <p className="text-sm font-bold text-[var(--brand)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-[var(--accent)]">
                    {item.heading}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {item.copy}
                  </p>
                </article>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <FadeIn>
            <div className="max-w-3xl">
              <h2 className="heading-serif text-3xl text-[var(--accent)]">
                Coordinating the cabinet work
              </h2>
              <p className="mt-3 leading-relaxed text-[var(--muted)]">
                Cabinet installation works best when measurements, product
                information and surrounding finishes are considered together.
              </p>
            </div>
            <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {coordinationSteps.map((item, index) => (
                <li className="surface rounded-2xl p-5" key={item.heading}>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 font-semibold text-[var(--accent)]">
                    {item.heading}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {item.copy}
                  </p>
                </li>
              ))}
            </ol>
          </FadeIn>
        </Container>
      </section>

      <section className="surface-soft py-12 md:py-16">
        <Container>
          <FadeIn>
            <div className="max-w-3xl">
              <h2 className="heading-serif text-3xl text-[var(--accent)]">
                Cabinet and kitchen work from RHI Pros
              </h2>
              <p className="mt-3 leading-relaxed text-[var(--muted)]">
                These examples come from documented RHI Pros kitchen projects and
                illustrate completed cabinet and surrounding finish work.
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {cabinetProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <FadeIn className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="heading-serif text-3xl text-[var(--accent)]">
                Information that helps us review your project
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                You do not need every selection finalized before reaching out. The
                first conversation is intended to clarify the likely scope and
                identify the next decisions.
              </p>
            </div>
            <ul className="surface grid gap-3 rounded-2xl p-5 text-sm text-[var(--muted)] sm:grid-cols-2 md:p-6">
              <li>Photos of the current kitchen</li>
              <li>Approximate room dimensions</li>
              <li>Whether the existing layout will remain</li>
              <li>Appliances that will stay or move</li>
              <li>Sink or plumbing-location changes being considered</li>
              <li>Cabinet inspiration or product information, if available</li>
              <li>Countertop and backsplash plans, if known</li>
              <li>Known wall, flooring, moisture or previous-renovation concerns</li>
            </ul>
          </FadeIn>
        </Container>
      </section>

      <section className="surface-soft py-12 md:py-16">
        <Container>
          <FadeIn>
            <h2 className="heading-serif text-3xl text-[var(--accent)]">
              Kitchen cabinet project questions
            </h2>
            <div className="mt-6 grid gap-3 lg:grid-cols-2">
              {faqItems.map((item) => (
                <details className="surface group rounded-xl p-5" key={item.q}>
                  <summary className="cursor-pointer font-semibold text-[var(--accent)]">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--brand)]">
              Request a quote
            </p>
            <h2 className="heading-serif mt-2 text-3xl text-[var(--accent)]">
              Planning new cabinets—or a larger kitchen remodel?
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              Tell us what you want to keep, what you want to change and whether
              the project extends beyond the cabinets. RHI Pros will review the
              request and discuss the appropriate next step.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <QuoteForm defaultService="Kitchen Remodeling" />
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
