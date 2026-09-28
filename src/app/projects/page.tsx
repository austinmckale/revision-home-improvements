import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/JsonLd";
import ProjectCard from "@/components/sections/ProjectCard";
import PortfolioGallery from "@/components/sections/PortfolioGallery";
import BottomCTA from "@/components/sections/BottomCTA";
import { featuredProjects, getProjectCollection, getProjectPresentation, orderedShowcaseProjects } from "@/content/projectShowcase";
import { getServiceBySlug } from "@/content/services";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";
import { getPortfolioImages } from "@/lib/portfolio";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Remodeling Projects & Case Studies | Allentown, Bethlehem & Lehigh Valley",
  description: "Explore finished kitchens, basement theaters, patios, bathrooms, and home renovations across the Lehigh Valley and Berks County. See the scope and story behind each project.",
  alternates: { canonical: "/projects" },
};

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
  const projects = selectedSlug ? orderedShowcaseProjects.filter((study) => study.serviceSlug === selectedSlug) : orderedShowcaseProjects;
  const residential = projects.filter((study) => getProjectCollection(study) === "residential" && (selectedSlug || !featuredProjects.some((featured) => featured.slug === study.slug)));
  const commercial = projects.filter((study) => getProjectCollection(study) === "commercial");
  const process = projects.filter((study) => getProjectCollection(study) === "process");
  const portfolioImages = await getPortfolioImages({
    stage: "AFTER",
    serviceTags: selectedSlug ? [selectedService?.portfolioTag ?? selectedSlug] : undefined,
    limit: 12,
  });

  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Projects", href: "/projects" }])} />
      <section className="bg-[var(--background)] pb-16 pt-12 sm:pb-24 sm:pt-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
            <div>
              <p className="eyebrow">Our work, in real homes</p>
              <h1 className="heading-serif mt-5 max-w-3xl text-[2.6rem] leading-[1.02] tracking-[-.035em] text-[var(--accent)] sm:text-6xl lg:text-7xl">Spaces worth<br />coming home to<span className="text-[var(--brand)]">.</span></h1>
            </div>
            <p className="max-w-md text-base leading-relaxed text-[var(--muted)] lg:pb-2">Kitchens that bring people together. Basements made for movie nights. Patios that open up a whole new room. Explore the work, then see how it came together.</p>
          </div>

          <nav className="mb-8 mt-8 flex gap-2 overflow-x-auto overscroll-x-contain border-y border-[var(--border)] py-4 [scrollbar-width:thin] sm:mb-10 sm:mt-10 sm:flex-wrap sm:py-5" aria-label="Filter projects by service">
            {filters.map((filter) => {
              const active = (selectedSlug ?? "") === filter.slug;
              return (
                <Link key={filter.slug} href={filter.slug ? `/projects?service=${filter.slug}` : "/projects"} aria-current={active ? "page" : undefined} className={`inline-flex min-h-11 shrink-0 items-center whitespace-nowrap border px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)] ${active ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-transparent text-[var(--muted)] hover:border-[var(--border)] hover:text-[var(--accent)]"}`}>{filter.label}</Link>
              );
            })}
          </nav>

          {!selectedSlug && (
            <section aria-labelledby="signature-projects">
              <div className="mb-5 flex items-baseline justify-between gap-4">
                <h2 id="signature-projects" className="eyebrow">Signature transformations</h2>
                <span className="hidden text-xs text-[var(--muted)] sm:block">Explore the full project stories ↗</span>
              </div>
              <div className="grid gap-5 lg:auto-rows-[19rem] lg:grid-cols-12">
                {featuredProjects.map((study, index) => <ProjectCard key={study.slug} study={study} variant={index === 0 ? "lead" : "support"} />)}
              </div>
            </section>
          )}

          {residential.length > 0 && (
            <section className={selectedSlug ? "" : "mt-16 sm:mt-24"} aria-labelledby="residential-projects">
              <div className="mb-8 flex flex-col gap-3 border-b border-[var(--border)] pb-6 sm:flex-row sm:items-end sm:justify-between">
                <h2 id="residential-projects" className="heading-serif text-3xl text-[var(--accent)] sm:text-4xl">{selectedService ? selectedService.name : "More homes. More possibilities."}</h2>
                <p className="max-w-sm text-sm leading-relaxed text-[var(--muted)]">Finished spaces, thoughtful details, and the stories behind the work.</p>
              </div>
              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {residential.map((study) => <ProjectCard key={study.slug} study={study} />)}
              </div>
            </section>
          )}

          {projects.length === 0 && <p className="py-10 text-[var(--muted)]">We are gathering photos for this service. <Link href="/projects" className="font-semibold text-[var(--brand)] underline">Explore our other projects</Link> or <Link href="/request-a-quote" className="font-semibold text-[var(--brand)] underline">tell us about your plans</Link>.</p>}

          {commercial.length > 0 && (
            <section className="mt-16 border-t border-[var(--border)] pt-10 sm:mt-24" aria-labelledby="commercial-projects">
              <p className="eyebrow">For local businesses</p>
              <h2 id="commercial-projects" className="heading-serif mt-3 text-3xl text-[var(--accent)] sm:text-4xl">Commercial improvements.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">Durable finishes and practical updates for spaces that work hard every day.</p>
              <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {commercial.map((study) => <ProjectCard key={study.slug} study={study} />)}
              </div>
            </section>
          )}

          {process.length > 0 && (
            <section className="mt-14 border-t border-[var(--border)] pt-8" aria-labelledby="project-process-stories">
              <h2 id="project-process-stories" className="heading-serif text-3xl text-[var(--accent)]">Planning &amp; progress.</h2>
              <p className="mt-3 text-sm text-[var(--muted)]">A closer look at design decisions and the work that happens before the finish.</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {process.map((study) => (
                  <Link key={study.slug} href={`/projects/${study.slug}`} className="group flex items-center justify-between gap-4 border border-[var(--border)] p-5 transition-colors hover:border-[var(--brand)]">
                    <span><span className="text-xs text-[var(--muted)]">{study.locationName}</span><span className="heading-serif mt-2 block text-xl text-[var(--accent)]">{getProjectPresentation(study).title}</span></span>
                    <span className="text-[var(--brand)] transition-transform group-hover:translate-x-1" aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {portfolioImages.length > 0 && <PortfolioGallery images={portfolioImages} title="More finished work from our team" showStageLabels={false} />}
        </Container>
      </section>
      <BottomCTA title="What would you love to change?" description="Bring your ideas. We will help you shape the scope, the details, and the next steps for your home." showFinancing={false} />
    </>
  );
}
