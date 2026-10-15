import ServiceHero from "@/components/sections/ServiceHero";
import ProjectCard from "@/components/sections/ProjectCard";
import FaqList from "@/components/sections/FaqList";
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
  title: { absolute: "Cabinet Refacing & Remodeling in Berks County, PA | RHI Pros" },
  description:
    "Cabinet refacing, new cabinets or a full kitchen remodel in Berks County, PA. We help you choose, then plan and install the work.",
  path: route,
  image: { url: heroImage.src, alt: heroImage.alt },
});

const projectTypes = [
  {
    heading: "Refacing",
    copy: "New doors, drawer fronts and hardware on your existing cabinet boxes, with the exposed frames and sides covered to match. A good fit when the boxes are solid and the layout works.",
  },
  {
    heading: "New cabinets, same layout",
    copy: "A good fit when the footprint works and the surrounding kitchen can take the new cabinets with few changes.",
  },
  {
    heading: "A new layout",
    copy: "Moving cabinets, appliances or the sink affects walls, floors, plumbing, electrical and countertop measurements.",
  },
  {
    heading: "A complete kitchen remodel",
    copy: "When cabinets are one part of a bigger change, we plan them with counters, backsplash, flooring and fixtures.",
  },
];

const factors = [
  {
    heading: "Cabinet box condition",
    copy: "Refacing works when the boxes are solid, square and dry. Water damage, sagging shelves or a layout change point to new cabinets.",
  },
  {
    heading: "Existing footprint",
    copy: "Keeping cabinets where they are limits surrounding changes, though walls and floors still need a look.",
  },
  {
    heading: "Appliances",
    copy: "Refrigerator, range, dishwasher and hood sizes set cabinet spacing and clearances.",
  },
  {
    heading: "Sink and plumbing",
    copy: "Changes near the sink affect plumbing access, cabinet sizes and the countertop plan.",
  },
  {
    heading: "Countertops and backsplash",
    copy: "Countertops are measured once cabinets are set; the backsplash follows the countertops.",
  },
  {
    heading: "Floors and walls",
    copy: "Removing old cabinets can reveal unfinished flooring or wall damage that needs preparation.",
  },
  {
    heading: "Electrical and lighting",
    copy: "A new layout can move outlets, switches or lights, and any electrical work is listed in your proposal.",
  },
];

const helpfulDetails = [
  "Photos of your current kitchen",
  "Approximate room dimensions",
  "Whether the layout will stay the same",
  "Whether you are leaning toward refacing or new cabinets",
  "Appliances that will stay or move",
  "Any sink or plumbing changes you are considering",
  "Cabinet ideas or product information, if you have them",
  "Countertop and backsplash plans, if known",
  "Known wall, floor, moisture or past-renovation issues",
];

const cabinetProjectSlugs = ["blue-kitchen-cabinet-counters", "ryan-kitchen-remodel"];

const cabinetProjects = cabinetProjectSlugs
  .map((slug) => getCaseStudyBySlug(slug))
  .filter((project): project is CaseStudy => Boolean(project));

const faqItems = [
  {
    q: "What is cabinet refacing?",
    a: "Refacing keeps your existing cabinet boxes and replaces what you see: doors, drawer fronts, hardware and new surfaces on the exposed frames and sides. Replacement installs new cabinets and can change the layout. We do both, and after seeing your kitchen we will tell you which fits.",
  },
  {
    q: "When does refacing make sense?",
    a: "When the layout works and the cabinet boxes are solid, square and dry. If boxes are damaged, or you want to move the sink or appliances, new cabinets are usually the better choice.",
  },
  {
    q: "Can cabinets be replaced without remodeling the entire kitchen?",
    a: "Sometimes. If the layout works and the counters, flooring, walls, appliances and fixtures suit the new cabinets, the project can stay focused. We still review the existing conditions first.",
  },
  {
    q: "Can the cabinet layout be changed?",
    a: "Often, yes. A new layout can affect appliances, countertops, plumbing, electrical, flooring and wall repairs, so we plan those connections together.",
  },
  {
    q: "Does RHI Pros manufacture cabinets?",
    a: "No. RHI Pros is a remodeling contractor that plans and installs the work; we are not a cabinet manufacturer or showroom.",
  },
  {
    q: "Does cabinet installation include countertops and backsplash?",
    a: "It can. Your proposal lists exactly which surrounding work is included.",
  },
  {
    q: "Do I need to have cabinets selected before requesting a quote?",
    a: "No. Photos, rough dimensions and an idea of the layout are enough to start. Product details matter before final measurements and scheduling.",
  },
  {
    q: "Do cabinet projects require permits?",
    a: "It depends on the municipality and whether the project includes layout, plumbing, electrical or other regulated work. Required permits are listed in your proposal.",
  },
];

export default function KitchenCabinetInstallationPage() {
  return (
    <>
      <JsonLd
        data={getServiceJsonLd(
          "Kitchen Cabinet Refacing and Replacement",
          absoluteUrl(route),
          "Berks County, Pennsylvania",
        )}
      />
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: "Berks County", href: "/berks-county-pa" },
          { name: "Cabinet Refacing & Remodeling", href: route },
        ])}
      />

      <ServiceHero
        eyebrow="Berks County, PA"
        title="Cabinet refacing & remodeling in Berks County."
        intro="Keep your cabinet boxes and give them new doors and fronts, or start fresh with new cabinets. We help you choose, then plan the work around your counters, appliances and floors."
        image={heroImage}
        primaryHref="#quote-form-section"
        primaryLabel="Plan your project"
        secondaryHref={siteConfig.phoneHref}
        secondaryLabel={`Call ${siteConfig.phoneDisplay}`}
      />

      <section className="py-14 md:py-20">
        <Container>
          <FadeIn>
            <div className="max-w-3xl">
              <h2 className="heading-serif text-3xl text-[var(--accent)] sm:text-4xl">
                Reface, replace or remodel?
              </h2>
              <p className="mt-4 leading-relaxed text-[var(--muted)]">
                Refacing keeps your cabinet boxes and changes everything you see. New cabinets can keep the layout or
                change it. A full remodel brings in counters, flooring, lighting and fixtures too. Deciding which early
                keeps the project, and the price, clear.
              </p>
            </div>
            <ul className="mt-8 grid gap-8 border-t border-[var(--accent)] pt-6 md:grid-cols-2 lg:grid-cols-4">
              {projectTypes.map((item) => (
                <li key={item.heading}>
                  <h3 className="heading-serif text-2xl text-[var(--accent)]">{item.heading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.copy}</p>
                </li>
              ))}
            </ul>
            <Link
              href="/berks-county-pa/kitchen-remodeling"
              className="mt-8 inline-block text-sm font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
            >
              Kitchen remodeling in Berks County →
            </Link>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-[var(--surface-soft)] py-14 md:py-20">
        <Container>
          <FadeIn>
            <h2 className="heading-serif text-3xl text-[var(--accent)] sm:text-4xl">What affects a cabinet project.</h2>
            <dl className="mt-8 grid border-t border-[var(--accent)] md:grid-cols-2 md:gap-x-12">
              {factors.map((item) => (
                <div key={item.heading} className="border-b border-[var(--border)] py-5">
                  <dt className="heading-serif text-xl text-[var(--accent)]">{item.heading}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{item.copy}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <FadeIn>
            <h2 className="heading-serif text-3xl text-[var(--accent)] sm:text-4xl">Kitchen projects to explore.</h2>
            <div className="mt-8 grid gap-x-6 gap-y-10 md:grid-cols-2">
              {cabinetProjects.map((project) => (
                <ProjectCard key={project.slug} study={project} />
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-[var(--surface-soft)] py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <FadeIn>
            <h2 className="heading-serif text-3xl text-[var(--accent)] sm:text-4xl">Helpful to have ready.</h2>
            <p className="mt-4 leading-relaxed text-[var(--muted)]">
              You do not need every selection made before reaching out. These details just make the first conversation
              more useful.
            </p>
          </FadeIn>
          <ul className="grid gap-x-8 gap-y-3 text-sm leading-relaxed text-[var(--muted)] sm:grid-cols-2">
            {helpfulDetails.map((item) => (
              <li key={item} className="flex gap-3 border-t border-[var(--border)] pt-3">
                <span className="mt-2.5 h-px w-3 shrink-0 bg-[var(--brand)]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
          <FadeIn>
            <FaqList title="Kitchen cabinet questions" items={faqItems} />
          </FadeIn>
          <FadeIn delay={0.15}>
            <QuoteForm defaultService="Kitchen Remodeling" />
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
