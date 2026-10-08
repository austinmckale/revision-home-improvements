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

const route = "/services/whole-home-remodeling";

export const metadata: Metadata = getPageMetadata({
  title: { absolute: "Whole-Home Remodeling in Lehigh Valley, PA | RHI Pros" },
  description:
    "Whole-home and multi-room remodeling across the Lehigh Valley and Berks County. RHI Pros plans kitchens, bathrooms, flooring and interior finishes as one project.",
  path: route,
});

const connectedSpaces = [
  {
    heading: "Kitchen and the rooms around it",
    copy: "Cabinets, counters and fixtures planned with the flooring and finishes they touch.",
    links: [{ href: "/services/kitchen-remodeling", label: "Kitchen remodeling" }],
  },
  {
    heading: "Bathrooms and private spaces",
    copy: "Bathroom updates planned with nearby bedrooms, hallways and the floors between them.",
    links: [{ href: "/services/bathroom-remodeling", label: "Bathroom remodeling" }],
  },
  {
    heading: "Basements and finished living areas",
    copy: "Moisture, mechanical access, framing, drywall and flooring planned around how you will use the space.",
    links: [{ href: "/services/basement-finishing", label: "Basement finishing" }],
  },
  {
    heading: "Floors, walls and finishes throughout",
    copy: "Flooring transitions, walls, ceilings, trim and paint that carry consistently from room to room.",
    links: [
      { href: "/services/flooring-installation", label: "Flooring" },
      { href: "/services/drywall-installation-repair", label: "Drywall" },
    ],
  },
];

const beforeWeTalk = [
  "Which rooms are included, and what should stay",
  "The problems you most want to solve",
  "Whether you are considering layout changes",
  "Which areas must stay usable while you live there",
  "Children, pets and where belongings will go",
  "One construction period or planned phases",
  "Known moisture, plumbing, electrical or past-renovation issues",
  "A budget range you are comfortable discussing",
];

const wholeHomeProjectSlugs = [
  "ryan-kitchen-remodel",
  "ryan-bathroom-remodel",
  "lehigh-valley-basement-finish-and-detail",
  "bethlehem-interior-flooring-refresh",
];

const wholeHomeProjects = wholeHomeProjectSlugs
  .map((slug) => getCaseStudyBySlug(slug))
  .filter((project): project is CaseStudy => Boolean(project));

const faqItems = [
  {
    q: "What does whole-home remodeling include?",
    a: "Usually several connected rooms rather than every room in the house. A project may combine kitchen, bathroom, basement, flooring, drywall and interior finish work under one written plan.",
  },
  {
    q: "Can a larger renovation happen in phases?",
    a: "Often, yes. It depends on how the rooms and trades affect one another. We work out whether separate phases make sense while planning the project.",
  },
  {
    q: "Can we stay in the home during construction?",
    a: "That depends on which rooms are affected, whether a kitchen and bathroom stay available and how we access the work. We settle this before the schedule is final.",
  },
  {
    q: "Do we need architectural plans before requesting a quote?",
    a: "Not necessarily. Start with the rooms involved, what you want to change and any photos or ideas. If the project needs drawings or other professional documents, we identify that during planning.",
  },
  {
    q: "Will permits be required?",
    a: "It depends on the municipality and the work. Required permits are confirmed as the plan comes together and listed in your proposal.",
  },
  {
    q: "Where does RHI Pros work?",
    a: "Across the Lehigh Valley and Berks County. Availability depends on location, the project and scheduling.",
  },
];

export default function WholeHomeRemodelingPage() {
  return (
    <>
      <JsonLd
        data={getServiceJsonLd(
          "Whole-Home Remodeling",
          absoluteUrl(route),
          "Lehigh Valley and Berks County, Pennsylvania",
        )}
      />
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "Whole-Home Remodeling", href: route },
        ])}
      />

      <ServiceHero
        eyebrow="Lehigh Valley & Berks County"
        title="Whole-home remodeling in the Lehigh Valley."
        intro="When a renovation reaches several rooms, every decision affects the next. We plan the layout, floors, walls and finishes together, so the whole house comes together as one."
        image={{
          src: "/images/projects/bethlehem-interior-flooring-refresh/after/flooring-refresh.jpg",
          alt: "Connected rooms with wood-look flooring, light walls and dark kitchen cabinetry.",
        }}
        primaryHref="#quote-form-section"
        primaryLabel="Plan your project"
        secondaryHref={siteConfig.phoneHref}
        secondaryLabel={`Call ${siteConfig.phoneDisplay}`}
      />

      <section className="py-14 md:py-20">
        <Container>
          <FadeIn>
            <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
              <div>
                <h2 className="heading-serif text-3xl text-[var(--accent)] sm:text-4xl">
                  When several rooms become one project.
                </h2>
                <p className="mt-4 leading-relaxed text-[var(--muted)]">
                  A whole-home remodel does not mean changing every room. It means planning connected spaces together
                  instead of treating each room as a separate job.
                </p>
                <p className="mt-3 leading-relaxed text-[var(--muted)]">
                  A new kitchen can change the floors next door. A bathroom can reach into a hallway or bedroom. New
                  flooring can uncover trim, doorway and drywall work across the house. Planning those connections early
                  avoids conflicting decisions later.{" "}
                  <Link href="/our-process" className="font-semibold text-[var(--brand)] underline-offset-4 hover:underline">
                    See our process
                  </Link>
                  .
                </p>
              </div>
              <ul className="border-t border-[var(--accent)]">
                {connectedSpaces.map((item) => (
                  <li key={item.heading} className="border-b border-[var(--border)] py-5">
                    <h3 className="heading-serif text-xl text-[var(--accent)]">{item.heading}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{item.copy}</p>
                    <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                      {item.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
                        >
                          {link.label} →
                        </Link>
                      ))}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-[var(--surface-soft)] py-14 md:py-20">
        <Container>
          <FadeIn>
            <h2 className="heading-serif max-w-3xl text-3xl text-[var(--accent)] sm:text-4xl">
              Is a whole-home remodel the right fit?
            </h2>
            <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-14">
              <div className="border-t border-[var(--accent)] pt-5">
                <h3 className="heading-serif text-2xl text-[var(--accent)]">A strong fit</h3>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--muted)]">
                  <li>A kitchen and one or more adjoining rooms</li>
                  <li>Kitchen and bathroom work planned together</li>
                  <li>New flooring and finishes across several rooms</li>
                  <li>A basement tied to other interior updates</li>
                  <li>A renovation that may need planned phases</li>
                </ul>
              </div>
              <div className="border-t border-[var(--border)] pt-5">
                <h3 className="heading-serif text-2xl text-[var(--accent)]">A single service may be enough</h3>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--muted)]">
                  <li>One bathroom with no surrounding work</li>
                  <li>A single drywall repair</li>
                  <li>Flooring in one room</li>
                  <li>A cabinet-focused kitchen update</li>
                  <li>An exterior or patio project on its own</li>
                </ul>
                <Link
                  href="/services"
                  className="mt-4 inline-block text-sm font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
                >
                  All services →
                </Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <FadeIn>
            <h2 className="heading-serif text-3xl text-[var(--accent)] sm:text-4xl">Projects to explore.</h2>
            <div className="mt-8 grid gap-x-6 gap-y-10 md:grid-cols-2">
              {wholeHomeProjects.map((project) => (
                <ProjectCard key={project.slug} study={project} />
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-[var(--surface-soft)] py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <FadeIn>
            <h2 className="heading-serif text-3xl text-[var(--accent)] sm:text-4xl">Helpful to think about first.</h2>
            <p className="mt-4 leading-relaxed text-[var(--muted)]">
              None of this needs to be settled before the first conversation, but it makes that conversation more
              useful. Photos and rough measurements help too.
            </p>
          </FadeIn>
          <ul className="grid gap-x-8 gap-y-3 text-sm leading-relaxed text-[var(--muted)] sm:grid-cols-2">
            {beforeWeTalk.map((item) => (
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
            <FaqList title="Whole-home remodeling questions" items={faqItems} />
          </FadeIn>
          <FadeIn delay={0.15}>
            <QuoteForm defaultService="Whole-Home Remodeling" />
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
