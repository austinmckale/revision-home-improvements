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

const route = "/services/whole-home-remodeling";

export const metadata: Metadata = {
  title: { absolute: "Whole-Home Remodeling in Lehigh Valley, PA | RHI Pros" },
  description:
    "Whole-home and multi-room remodeling across the Lehigh Valley and Berks County. RHI Pros coordinates kitchens, bathrooms, flooring and interior finish work.",
  alternates: { canonical: route },
  openGraph: {
    title: "Whole-Home Remodeling in the Lehigh Valley | RHI Pros",
    description:
      "Plan connected kitchen, bathroom, flooring, drywall and interior remodeling under one coordinated scope.",
    url: route,
  },
};

const connectedSpaces = [
  {
    heading: "Kitchen and adjoining living spaces",
    copy:
      "Coordinate cabinets, counters, fixtures, flooring and surrounding finishes when the kitchen affects more than its original footprint.",
    links: [{ href: "/services/kitchen-remodeling", label: "Kitchen Remodeling" }],
  },
  {
    heading: "Bathrooms and private spaces",
    copy:
      "Plan bathroom updates alongside nearby bedrooms, hallways, flooring or finish work when the scopes overlap.",
    links: [{ href: "/services/bathroom-remodeling", label: "Bathroom Remodeling" }],
  },
  {
    heading: "Basements and finished living areas",
    copy:
      "Account for moisture conditions, mechanical access, framing, drywall, flooring and the intended use of the finished space.",
    links: [{ href: "/services/basement-finishing", label: "Basement Finishing" }],
  },
  {
    heading: "Flooring, drywall and interior finishes",
    copy:
      "Connect details that continue from room to room, including flooring transitions, walls, ceilings, trim and paint-ready surfaces.",
    links: [
      { href: "/services/flooring-installation", label: "Flooring Installation" },
      {
        href: "/services/drywall-installation-repair",
        label: "Drywall Installation & Repair",
      },
    ],
  },
];

const planningSteps = [
  {
    heading: "Priorities",
    copy:
      "Identify the rooms involved, the problems that need to be solved and which outcomes matter most.",
  },
  {
    heading: "Existing conditions",
    copy:
      "Review the current layout and visible conditions that may affect access, sequencing or the proposed work.",
  },
  {
    heading: "Dependencies",
    copy:
      "Identify where one decision affects another, such as cabinets and countertops, flooring and trim, or plumbing access and wall repair.",
  },
  {
    heading: "Written scope",
    copy:
      "Document the included work, known responsibilities and project boundaries before construction begins.",
  },
  {
    heading: "Sequence and phases",
    copy:
      "Organize the work in a practical order and determine whether the scope should happen together or in planned phases.",
  },
  {
    heading: "Closeout",
    copy:
      "Complete the final walkthrough, address the agreed punch list and provide applicable warranty information.",
  },
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
    a:
      "The scope can involve several connected rooms rather than every room in the house. Depending on the project, it may combine kitchen, bathroom, basement, flooring, drywall and interior-finish work under one written plan.",
  },
  {
    q: "Can a larger renovation happen in phases?",
    a:
      "Sometimes. Phasing depends on how the rooms and trades affect one another. RHI Pros can discuss whether separate phases are practical while the scope is being developed.",
  },
  {
    q: "Can we remain in the home during construction?",
    a:
      "That depends on the affected rooms, available bathroom or kitchen facilities, construction access and the overall scope. Occupancy should be discussed before the sequence is finalized.",
  },
  {
    q: "Do we need completed architectural plans before requesting a quote?",
    a:
      "Not necessarily. Homeowners can begin with the rooms involved, the problems they want to solve and any available photos or ideas. If the project requires drawings or other professional documentation, that can be identified during planning.",
  },
  {
    q: "Will permits be required?",
    a:
      "Permit requirements depend on the municipality and the work included. Applicable requirements should be reviewed as the project scope becomes clear.",
  },
  {
    q: "Where does RHI Pros provide remodeling services?",
    a:
      "RHI Pros serves homeowners across the Lehigh Valley and Berks County. Project availability depends on location, scope and scheduling.",
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
          <div className="relative h-48 overflow-hidden bg-[var(--surface-soft)]">
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
        <div className="p-5">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
            {project.locationName}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-[var(--accent)]">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            {project.summary}
          </p>
          <span className="mt-4 inline-block text-sm font-semibold text-[var(--brand)]">
            View project →
          </span>
        </div>
      </Link>
    </article>
  );
}

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

      <section className="hero-band py-10 md:py-16">
        <Container>
          <FadeIn className="max-w-4xl">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--brand)]">
              Lehigh Valley &amp; Berks County
            </p>
            <h1 className="heading-serif mt-2 text-4xl text-[var(--accent)] md:text-5xl">
              Whole-Home Remodeling in the Lehigh Valley
            </h1>
            <p className="mt-4 max-w-3xl text-[0.9375rem] leading-relaxed text-[var(--muted)] md:text-base">
              When a renovation affects several rooms, decisions about layout,
              flooring, walls, fixtures and finishes begin to overlap. RHI Pros
              develops one written scope for the connected work so homeowners can
              understand what is included, how the pieces relate and what needs to
              happen first.
            </p>
            <div className="mt-6 grid max-w-3xl gap-2 text-sm text-[var(--muted)] sm:grid-cols-2">
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
              <Button href="#quote-form-section">
                Request a Remodeling Quote
              </Button>
              <Button href={siteConfig.phoneHref} variant="secondary">
                Call {siteConfig.phoneDisplay}
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <FadeIn>
            <div className="max-w-3xl">
              <h2 className="heading-serif text-3xl text-[var(--accent)]">
                When several rooms become one project
              </h2>
              <p className="mt-3 leading-relaxed text-[var(--muted)]">
                A whole-home remodel does not always mean changing every room. It
                can mean planning several connected spaces under one scope instead
                of treating each room as a separate job.
              </p>
              <p className="mt-3 leading-relaxed text-[var(--muted)]">
                A kitchen may affect the flooring and finishes in an adjoining
                living area. Bathroom work may involve nearby bedrooms, hallways
                or plumbing access. New flooring can expose trim, doorway and
                drywall work throughout the home. Planning those connections early
                helps reduce conflicting decisions later.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {connectedSpaces.map((item) => (
                <article className="surface rounded-2xl p-5 md:p-6" key={item.heading}>
                  <h3 className="text-lg font-semibold text-[var(--accent)]">
                    {item.heading}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {item.copy}
                  </p>
                  <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
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
                </article>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="surface-soft py-12 md:py-16">
        <Container>
          <FadeIn>
            <div className="max-w-3xl">
              <h2 className="heading-serif text-3xl text-[var(--accent)]">
                Is whole-home remodeling the right fit?
              </h2>
              <p className="mt-3 leading-relaxed text-[var(--muted)]">
                This service is intended for homeowners whose plans involve
                multiple rooms, connected trades or a larger sequence of interior
                work.
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="surface rounded-2xl p-5 md:p-6">
                <h3 className="text-xl font-semibold text-[var(--accent)]">
                  A strong fit
                </h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--muted)]">
                  <li>A kitchen and one or more adjoining rooms</li>
                  <li>Kitchen and bathroom work planned together</li>
                  <li>Several rooms receiving new flooring and finishes</li>
                  <li>A basement project connected to other interior updates</li>
                  <li>A renovation that may need logical phases</li>
                  <li>Multiple scopes that need one written plan</li>
                </ul>
              </div>
              <div className="surface rounded-2xl p-5 md:p-6">
                <h3 className="text-xl font-semibold text-[var(--accent)]">
                  A focused service may be enough
                </h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--muted)]">
                  <li>One bathroom with no surrounding work</li>
                  <li>An isolated drywall repair</li>
                  <li>Flooring in a single room</li>
                  <li>A cabinet-focused kitchen project</li>
                  <li>An individual exterior or paver project</li>
                </ul>
              </div>
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
              Smaller projects can still be a fit for RHI Pros. The individual
              service pages provide more focused information when only one area
              needs to be addressed.
            </p>
            <Link
              href="/services"
              className="mt-4 inline-block text-sm font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
            >
              View All Services →
            </Link>
          </FadeIn>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <FadeIn>
            <div className="max-w-3xl">
              <h2 className="heading-serif text-3xl text-[var(--accent)]">
                Building one clear scope
              </h2>
              <p className="mt-3 leading-relaxed text-[var(--muted)]">
                Large renovations become difficult when decisions are made room by
                room without considering what comes next. RHI Pros organizes the
                project around the connected spaces, existing conditions and order
                of work.
              </p>
            </div>
            <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {planningSteps.map((item, index) => (
                <li className="surface rounded-2xl p-5" key={item.heading}>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-[var(--accent)]">
                    {item.heading}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {item.copy}
                  </p>
                </li>
              ))}
            </ol>
            <Link
              href="/our-process"
              className="mt-6 inline-block text-sm font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
            >
              See How Our Remodeling Process Works →
            </Link>
          </FadeIn>
        </Container>
      </section>

      <section className="surface-soft py-12 md:py-16">
        <Container>
          <FadeIn className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="heading-serif text-3xl text-[var(--accent)]">
                Planning around life in the home
              </h2>
              <p className="mt-3 leading-relaxed text-[var(--muted)]">
                Some homeowners remain in the house during remodeling, while other
                scopes make temporary arrangements more practical. The right
                approach depends on which rooms are affected, whether essential
                kitchen or bathroom facilities remain available and how
                construction access will work.
              </p>
            </div>
            <div className="surface rounded-2xl p-5 md:p-6">
              <p className="font-semibold text-[var(--accent)]">
                Before the scope is finalized, it is useful to discuss:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--muted)]">
                <li>which areas must remain usable;</li>
                <li>whether children or pets will be present;</li>
                <li>how furniture and stored belongings will be protected or relocated;</li>
                <li>where materials and tools can be staged;</li>
                <li>whether a temporary kitchen or bathroom arrangement may be needed;</li>
                <li>which decisions must be completed before work begins.</li>
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                These details do not need to be solved before the first
                conversation. They become part of planning a realistic scope.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <FadeIn>
            <div className="max-w-4xl">
              <h2 className="heading-serif text-3xl text-[var(--accent)]">
                Examples across RHI Pros remodeling projects
              </h2>
              <p className="mt-3 leading-relaxed text-[var(--muted)]">
                The examples below come from separate RHI Pros projects. They
                illustrate kitchen, bathroom, basement and interior work that may
                be combined in a larger renovation; they are not presented as one
                whole-home project.
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {wholeHomeProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="surface-soft py-12 md:py-16">
        <Container>
          <FadeIn className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="heading-serif text-3xl text-[var(--accent)]">
                What to consider before requesting a quote
              </h2>
              <p className="mt-3 leading-relaxed text-[var(--muted)]">
                You do not need a completed design before contacting RHI Pros. A
                few basic decisions can make the first conversation more useful.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                Photos, measurements and inspiration images are helpful when
                available, but they do not need to be perfect or final.
              </p>
            </div>
            <ul className="surface grid gap-3 rounded-2xl p-5 text-sm text-[var(--muted)] sm:grid-cols-2 md:p-6">
              <li>Which rooms are included?</li>
              <li>What problems are you trying to solve?</li>
              <li>Are you considering layout changes?</li>
              <li>Which fixtures, appliances or finishes may stay?</li>
              <li>Does the home need to remain occupied?</li>
              <li>Would you prefer one construction period or possible phases?</li>
              <li>Are there known moisture, plumbing, electrical or previous-renovation concerns?</li>
              <li>Is there a budget range you are comfortable discussing?</li>
            </ul>
          </FadeIn>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <FadeIn>
            <h2 className="heading-serif text-3xl text-[var(--accent)]">
              Whole-home remodeling questions
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

      <section className="surface-soft py-12 md:py-16">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--brand)]">
              Request a quote
            </p>
            <h2 className="heading-serif mt-2 text-3xl text-[var(--accent)]">
              Planning more than one room?
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              Tell us which spaces are involved, what you want to change and any
              priorities you already have. We will review the request and discuss
              the appropriate next step.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <QuoteForm defaultService="Whole-Home Remodeling" />
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
