import ServiceHero from "@/components/sections/ServiceHero";
import ProjectCard from "@/components/sections/ProjectCard";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import QuoteForm from "@/components/forms/QuoteForm";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import { getCaseStudyBySlug, type CaseStudy } from "@/content/caseStudies";
import { siteConfig } from "@/content/site";
import { getBreadcrumbJsonLd, getServiceJsonLd } from "@/lib/structuredData";
import { absoluteUrl } from "@/lib/url";
import { getPageMetadata } from "@/lib/metadata";

const route = "/berks-county-pa/kitchen-cabinet-installation";
const heroImage = {
  src: "/images/projects/ryan-kitchen/after/01-ryans-kitchen-after-done.jpg",
  alt: "Kitchen after remodel with updated cabinets, counters, appliances, and lighting.",
};

export const metadata: Metadata = getPageMetadata({
  title: { absolute: "Kitchen Cabinet Remodeling in Berks County, PA | RHI Pros" },
  description:
    "Planning a kitchen cabinet remodel in Berks County? RHI Pros coordinates cabinet replacement with counters, fixtures and the surrounding kitchen work.",
  path: route,
  image: { url: heroImage.src, alt: heroImage.alt },
});

const scopeOptions = [
  {
    heading: "Replace cabinets within the existing layout",
    copy: "This may be appropriate when the basic footprint works and the surrounding kitchen can accommodate the selected cabinets with limited changes.",
  },
  {
    heading: "Adjust the layout",
    copy: "Moving cabinets, appliances or the sink can affect walls, flooring, plumbing, electrical locations and countertop measurements.",
  },
  {
    heading: "Coordinate a complete kitchen remodel",
    copy: "When cabinets are only one part of the project, the work can be planned alongside counters, backsplash, flooring, fixtures and finish repairs.",
  },
];

const scopeFactors = [
  {
    heading: "Existing footprint",
    copy: "Keeping the current cabinet locations may reduce surrounding changes, but field conditions still need to be reviewed.",
  },
  {
    heading: "Appliance dimensions",
    copy: "Refrigerators, ranges, dishwashers and ventilation equipment affect cabinet spacing and clearances.",
  },
  {
    heading: "Sink and plumbing location",
    copy: "Changes near the sink may affect plumbing access, cabinet dimensions and countertop planning.",
  },
  {
    heading: "Countertops and backsplash",
    copy: "Countertops are coordinated after the cabinet layout is established, and backsplash work follows the relevant installation sequence.",
  },
  {
    heading: "Flooring and walls",
    copy: "Removing cabinets can reveal unfinished flooring, wall damage or areas requiring preparation before installation.",
  },
  {
    heading: "Electrical and lighting",
    copy: "Layout changes may affect outlet, switch or lighting locations. Any required specialty work must be identified in the project scope.",
  },
];

const coordinationSteps = [
  {
    heading: "Review the existing kitchen",
    copy: "Document the current layout, affected surfaces and proposed changes.",
  },
  {
    heading: "Confirm the intended scope",
    copy: "Determine whether the project is cabinet-focused or part of a larger kitchen remodel.",
  },
  {
    heading: "Coordinate selections and dimensions",
    copy: "Confirm the information needed to plan cabinets, appliances, countertops, fixtures and related work.",
  },
  {
    heading: "Prepare and install",
    copy: "Complete the agreed preparation and cabinet installation in the proper sequence.",
  },
  {
    heading: "Finish the surrounding work",
    copy: "Address included countertop, backsplash, wall, trim, fixture or flooring work according to the written scope.",
  },
];

const cabinetProjectSlugs = ["blue-kitchen-cabinet-counters", "ryan-kitchen-remodel"];

const cabinetProjects = cabinetProjectSlugs
  .map((slug) => getCaseStudyBySlug(slug))
  .filter((project): project is CaseStudy => Boolean(project));

const faqItems = [
  {
    q: "Is cabinet replacement the same as cabinet refacing?",
    a: "No. Refacing generally retains the existing cabinet boxes and changes exposed surfaces or doors. Replacement installs new cabinets and may change the layout. This page covers replacement and installation as part of a coordinated kitchen project; tell us your intended scope when requesting a quote.",
  },
  {
    q: "Can cabinets be replaced without remodeling the entire kitchen?",
    a: "Sometimes. If the existing layout works and the surrounding counters, flooring, walls, appliances and fixtures are compatible with the proposed cabinet work, the scope may remain more focused. Existing conditions still need to be reviewed.",
  },
  {
    q: "Can the cabinet layout be changed?",
    a: "Potentially. Layout changes may affect appliances, countertops, plumbing, electrical locations, flooring and wall repairs, so those connections need to be included in planning.",
  },
  {
    q: "Does RHI Pros manufacture cabinets?",
    a: "No. RHI Pros coordinates remodeling and installation work; it is not a cabinet manufacturer or retail showroom.",
  },
  {
    q: "Does cabinet installation include countertops and backsplash?",
    a: "Those items can be discussed as part of the kitchen scope. The written proposal should identify exactly which surrounding work is included.",
  },
  {
    q: "Do I need to have cabinets selected before requesting a quote?",
    a: "Not necessarily. Photos, approximate dimensions and an idea of the desired layout are enough to begin the conversation. Product information becomes important before final measurements and scheduling.",
  },
  {
    q: "Do cabinet projects require permits?",
    a: "Requirements depend on the municipality and whether the project includes layout, plumbing, electrical or other regulated work. Applicable requirements should be reviewed after the scope is defined.",
  },
];

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
          { name: "Kitchen Cabinet Remodeling", href: route },
        ])}
      />

      <ServiceHero
        eyebrow="Lehigh Valley & Berks County"
        title="Kitchen cabinet remodeling & replacement in Berks County."
        intro="Plan the cabinets around the way you use your kitchen. We coordinate installation with countertops, appliances, flooring, and the surrounding finishes."
        image={heroImage}
        primaryHref="#quote-form-section"
        primaryLabel="Plan your project"
        secondaryHref={siteConfig.phoneHref}
        secondaryLabel={`Call ${siteConfig.phoneDisplay}`}
      />

      <section className="py-12 md:py-16">
        <Container>
          <FadeIn>
            <div className="max-w-3xl">
              <h2 className="heading-serif text-3xl text-[var(--accent)]">
                Cabinet-focused project or complete kitchen remodel?
              </h2>
              <p className="mt-3 leading-relaxed text-[var(--muted)]">
                Some homeowners want to replace cabinets while keeping the general kitchen layout. Others need a broader
                remodel involving counters, fixtures, flooring, lighting or layout changes. Defining that boundary early
                helps determine the appropriate scope.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {scopeOptions.map((item) => (
                <article className="surface rounded-sm p-5 md:p-6" key={item.heading}>
                  <h3 className="text-lg font-semibold text-[var(--accent)]">{item.heading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.copy}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
              RHI Pros is a remodeling contractor, not a cabinet manufacturer or retail showroom. Cabinet products and
              selections must be appropriate for the agreed project scope.
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
            <h2 className="heading-serif text-3xl text-[var(--accent)]">What affects a cabinet project?</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {scopeFactors.map((item, index) => (
                <article className="surface rounded-sm p-5" key={item.heading}>
                  <p className="text-sm font-bold text-[var(--brand)]">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-lg font-semibold text-[var(--accent)]">{item.heading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.copy}</p>
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
              <h2 className="heading-serif text-3xl text-[var(--accent)]">Coordinating the cabinet work</h2>
              <p className="mt-3 leading-relaxed text-[var(--muted)]">
                Cabinet installation works best when measurements, product information and surrounding finishes are
                considered together.
              </p>
            </div>
            <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {coordinationSteps.map((item, index) => (
                <li className="surface rounded-sm p-5" key={item.heading}>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 font-semibold text-[var(--accent)]">{item.heading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.copy}</p>
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
              <h2 className="heading-serif text-3xl text-[var(--accent)]">Cabinet and kitchen photo details</h2>
              <p className="mt-3 leading-relaxed text-[var(--muted)]">
                Explore cabinet layouts, surrounding finishes and installation details. Use them to discuss the features
                and scope you want for your own kitchen.
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {cabinetProjects.map((project) => (
                <ProjectCard key={project.slug} study={project} />
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
                You do not need every selection finalized before reaching out. The first conversation is intended to
                clarify the likely scope and identify the next decisions.
              </p>
            </div>
            <ul className="surface grid gap-3 rounded-sm p-5 text-sm text-[var(--muted)] sm:grid-cols-2 md:p-6">
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
            <h2 className="heading-serif text-3xl text-[var(--accent)]">Kitchen cabinet project questions</h2>
            <div className="mt-6 grid gap-3 lg:grid-cols-2">
              {faqItems.map((item) => (
                <details className="surface group rounded-sm p-5" key={item.q}>
                  <summary className="cursor-pointer font-semibold text-[var(--accent)]">{item.q}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{item.a}</p>
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
              Tell us what you want to keep, what you want to change and whether the project extends beyond the
              cabinets. RHI Pros will review the request and discuss the appropriate next step.
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
