import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/JsonLd";
import ProjectCard from "@/components/sections/ProjectCard";
import PortfolioGallery from "@/components/sections/PortfolioGallery";
import BottomCTA from "@/components/sections/BottomCTA";
import {
  featuredProjects,
  getProjectCollection,
  getProjectPresentation,
  orderedShowcaseProjects,
} from "@/content/projectShowcase";
import { getServiceBySlug } from "@/content/services";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";
import { getPortfolioImages } from "@/lib/portfolio";
import { getPageMetadata } from "@/lib/metadata";

export const revalidate = 3600;

export const metadata: Metadata = getPageMetadata({
  title: "Remodeling Photo Collections | Lehigh Valley & Berks County",
  description:
    "Browse kitchen, bathroom, basement, patio and interior photo collections. Explore visible details and plan remodeling in the Lehigh Valley and Berks County.",
  path: "/projects",
});

const filters = [
  { slug: "", label: "All projects" },
  { slug: "kitchen-remodeling", label: "Kitchens" },
  { slug: "bathroom-remodeling", label: "Bathrooms" },
  { slug: "basement-finishing", label: "Basements" },
  { slug: "paver-installation", label: "Outdoor living" },
  { slug: "exterior-remodeling", label: "Exteriors" },
  { slug: "flooring-installation", label: "Flooring" },
  { slug: "drywall-installation-repair", label: "Interior finishes" },
  { slug: "fire-damage-restoration", label: "Fire restoration" },
];

type ProjectsPageProps = { searchParams?: Promise<{ service?: string }> };

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = searchParams ? await searchParams : {};
  const selectedService = typeof params.service === "string" ? getServiceBySlug(params.service) : undefined;
  const selectedSlug = selectedService?.slug;
  const projects = selectedSlug
    ? orderedShowcaseProjects.filter((study) => study.serviceSlug === selectedSlug)
    : orderedShowcaseProjects;
  const residential = projects.filter(
    (study) =>
      getProjectCollection(study) === "residential" &&
      (selectedSlug || !featuredProjects.some((featured) => featured.slug === study.slug)),
  );
  const commercial = projects.filter((study) => getProjectCollection(study) === "commercial");
  const process = projects.filter((study) => getProjectCollection(study) === "process");
  const portfolioImages = await getPortfolioImages({
    stage: "AFTER",
    serviceTags: selectedSlug ? [selectedService?.portfolioTag ?? selectedSlug] : undefined,
    limit: 12,
  });

  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
        ])}
      />
      <section className="bg-[var(--background)] pb-16 pt-12 sm:pb-24 sm:pt-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
            <div>
              <h1>
                <span className="eyebrow">Remodeling project photos</span>{" "}
                <span className="heading-serif mt-5 block max-w-3xl text-[2.6rem] leading-[1.02] tracking-[-.035em] text-[var(--accent)] sm:text-6xl lg:text-7xl">
                  Spaces worth{" "}
                  <br />
                  coming home to<span className="text-[var(--brand)]">.</span>
                </span>
              </h1>
            </div>
            <p className="max-w-md text-base leading-relaxed text-[var(--muted)] lg:pb-2">
              Kitchens that bring people together. Basements made for movie nights. Patios that open up a whole new
              room. Explore photo collections and find ideas for your own space.
            </p>
          </div>

          <nav
            className="relative mb-8 mt-8 flex gap-2 overflow-x-auto overscroll-x-contain border-y border-[var(--border)] py-4 [scrollbar-width:thin] sm:mb-10 sm:mt-10 sm:flex-wrap sm:py-5"
            aria-label="Filter projects by service"
          >
            {filters.map((filter) => {
              const active = (selectedSlug ?? "") === filter.slug;
              const count = filter.slug
                ? orderedShowcaseProjects.filter((study) => study.serviceSlug === filter.slug).length
                : orderedShowcaseProjects.length;
              return (
                <Link
                  key={filter.slug}
                  href={filter.slug ? `/projects?service=${filter.slug}` : "/projects"}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap border px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)] ${active ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-transparent text-[var(--muted)] hover:border-[var(--border)] hover:text-[var(--accent)]"}`}
                >
                  {filter.label}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[0.65rem] tabular-nums ${active ? "bg-white/15" : "bg-[var(--surface-soft)]"}`}
                  >
                    {count}
                    <span className="sr-only"> photo {count === 1 ? "collection" : "collections"}</span>
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[var(--muted)]">
              <span className="font-semibold text-[var(--accent)]">
                {projects.length} {projects.length === 1 ? "gallery" : "galleries"}
              </span>
              {selectedService ? ` · ${selectedService.name}` : " · Residential, commercial, planning & progress"}
            </p>
            {selectedService ? (
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                <Link
                  href={`/services/${selectedService.slug}`}
                  className="inline-flex min-h-11 items-center text-[var(--accent)] hover:text-[var(--brand)]"
                >
                  Explore this service{" "}
                  <span className="ml-2" aria-hidden="true">
                    ↗
                  </span>
                </Link>
                <Link
                  href={`/request-a-quote?service=${encodeURIComponent(selectedService.slug)}`}
                  className="inline-flex min-h-11 items-center text-[var(--brand)]"
                >
                  Plan your project{" "}
                  <span className="ml-2" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </div>
            ) : null}
          </div>

          {!selectedSlug && (
            <section aria-labelledby="signature-projects">
              <div className="mb-5 flex items-baseline justify-between gap-4">
                <h2 id="signature-projects" className="eyebrow">
                  Spaces to explore
                </h2>
                <span className="hidden text-xs text-[var(--muted)] sm:block">Take a closer look ↗</span>
              </div>
              <div className="grid gap-5 lg:auto-rows-[19rem] lg:grid-cols-12">
                {featuredProjects.map((study, index) => (
                  <ProjectCard
                    key={study.slug}
                    study={study}
                    variant={index === 0 ? "lead" : "support"}
                    priority={index === 0}
                  />
                ))}
              </div>
            </section>
          )}

          {residential.length > 0 && (
            <section className={selectedSlug ? "" : "mt-16 sm:mt-24"} aria-labelledby="residential-projects">
              <div className="mb-8 flex flex-col gap-3 border-b border-[var(--border)] pb-6 sm:flex-row sm:items-end sm:justify-between">
                <h2 id="residential-projects" className="heading-serif text-3xl text-[var(--accent)] sm:text-4xl">
                  {selectedService ? selectedService.name : "More homes. More possibilities."}
                </h2>
                <p className="max-w-sm text-sm leading-relaxed text-[var(--muted)]">
                  Find ideas in the layouts, materials and finishes.
                </p>
              </div>
              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {residential.map((study) => (
                  <ProjectCard key={study.slug} study={study} />
                ))}
              </div>
            </section>
          )}

          {projects.length === 0 && portfolioImages.length === 0 && (
            <div className="border border-[var(--border)] bg-[var(--surface-soft)] p-6 sm:p-8">
              <h2 className="heading-serif text-2xl text-[var(--accent)]">Let’s talk through your project.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
                There are no published photo collections for this service here yet. Explore the other collections or
                tell us what you have in mind.
              </p>
              <div className="mt-5 flex flex-wrap gap-5 text-sm font-semibold">
                <Link
                  href="/projects"
                  className="inline-flex min-h-11 items-center text-[var(--accent)] underline underline-offset-4"
                >
                  Explore all projects
                </Link>
                <Link
                  href={
                    selectedSlug ? `/request-a-quote?service=${encodeURIComponent(selectedSlug)}` : "/request-a-quote"
                  }
                  className="inline-flex min-h-11 items-center text-[var(--brand)] underline underline-offset-4"
                >
                  Tell us about your plans
                </Link>
              </div>
            </div>
          )}

          {commercial.length > 0 && (
            <section
              className="mt-16 border-t border-[var(--border)] pt-10 sm:mt-24"
              aria-labelledby="commercial-projects"
            >
              <p className="eyebrow">For local businesses</p>
              <h2 id="commercial-projects" className="heading-serif mt-3 text-3xl text-[var(--accent)] sm:text-4xl">
                Commercial improvements.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
                Durable finishes and practical updates for spaces that work hard every day.
              </p>
              <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {commercial.map((study) => (
                  <ProjectCard key={study.slug} study={study} />
                ))}
              </div>
            </section>
          )}

          {process.length > 0 && (
            <section className="mt-14 border-t border-[var(--border)] pt-8" aria-labelledby="project-process-stories">
              <h2 id="project-process-stories" className="heading-serif text-3xl text-[var(--accent)]">
                Planning &amp; repair details.
              </h2>
              <p className="mt-3 text-sm text-[var(--muted)]">
                Explore bathroom layouts and the conditions that shape a repair plan.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {process.map((study) => (
                  <Link
                    key={study.slug}
                    href={`/projects/${study.slug}`}
                    className="group flex items-center justify-between gap-4 border border-[var(--border)] p-5 transition-colors hover:border-[var(--brand)]"
                  >
                    <span>
                      <span className="text-xs text-[var(--muted)]">{study.locationName}</span>
                      <span className="heading-serif mt-2 block text-xl text-[var(--accent)]">
                        {getProjectPresentation(study).title}
                      </span>
                    </span>
                    <span
                      className="text-[var(--brand)] transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {portfolioImages.length > 0 && (
            <PortfolioGallery
              images={portfolioImages}
              title="More finished work from our team"
              showStageLabels={false}
            />
          )}
        </Container>
      </section>
      <BottomCTA
        title="What would you love to change?"
        description="Bring your ideas. We will help you shape the scope, the details, and the next steps for your home."
        showFinancing={false}
      />
    </>
  );
}
