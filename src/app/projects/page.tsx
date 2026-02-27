import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/JsonLd";
import PortfolioGallery from "@/components/sections/PortfolioGallery";
import { caseStudies } from "@/content/caseStudies";
import { siteConfig } from "@/content/site";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";
import { getPortfolioImages } from "@/lib/portfolio";

const additionalImages = [
  {
    src: "/images/projects/kitchen-1.jpg",
    alt: "Kitchen remodel with updated finishes and fixtures.",
  },
  {
    src: "/images/projects/bathroom-after.jpg",
    alt: "Finished bathroom renovation with updated fixtures.",
  },
  {
    src: "/images/projects/big-screen-basement.jpg",
    alt: "Finished basement media room with large screen.",
  },
  {
    src: "/images/projects/basement-epoxy-floor-big-screen.jpg",
    alt: "Basement epoxy flooring finish detail.",
  },
  {
    src: "/images/projects/finished-room.jpg",
    alt: "Finished interior room after flooring upgrade.",
  },
  {
    src: "/images/projects/fire-place-construction.jpg",
    alt: "Fireplace construction detail during interior build.",
  },
  {
    src: "/images/projects/patio-construction-2.jpg",
    alt: "Patio construction phase during build.",
  },
  {
    src: "/images/projects/Patio-3.jpg",
    alt: "Finished patio and hardscape project in Reading, PA.",
  },
  {
    src: "/images/projects/living-room-1.jpg",
    alt: "Living room finish detail after interior renovation.",
  },
];

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Remodeling Projects & Case Studies | Reading PA & Lehigh Valley",
  description:
    "Browse recent kitchen, bathroom, basement, flooring, and restoration projects across Reading, Berks County, and the Lehigh Valley.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const portfolioImages = await getPortfolioImages({ limit: 12 });

  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Projects", href: "/projects" }])} />
      <section className="py-14">
        <Container>
          <h1 className="text-4xl font-extrabold text-[var(--accent)]">Project Gallery</h1>
          <p className="mt-3 max-w-3xl text-[var(--muted)]">
            See what we have built for homeowners across Reading, Berks County, and Lehigh Valley. Each project shows real scope, real timelines, and real results.
          </p>

          <section className="mt-8">
            <h2 className="text-2xl font-bold text-[var(--accent)]">Featured Case Studies</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {caseStudies.map((study) => (
                <article key={study.slug} className="surface overflow-hidden rounded-xl">
                  <Image src={study.images[0].src} alt={study.images[0].alt} width={900} height={600} className="h-52 w-full object-cover" />
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">{study.locationName}</p>
                    <h3 className="mt-1 text-lg font-semibold text-[var(--accent)]">{study.title}</h3>
                    <p className="mt-2 text-sm text-[var(--muted)]">{study.summary}</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">Timeline: {study.timeline}</p>
                    <Link href={`/projects/${study.slug}`} className="mt-4 inline-block text-sm font-semibold text-[var(--brand)]">
                      View full case study
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {portfolioImages.length > 0 && (
            <PortfolioGallery images={portfolioImages} title="Portfolio" showStageLabels />
          )}

          <section className="mt-10">
            <h2 className="text-2xl font-bold text-[var(--accent)]">Additional Project Photos</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {additionalImages.map((image) => (
                <figure key={image.src} className="surface overflow-hidden rounded-xl">
                  <Image src={image.src} alt={image.alt} width={900} height={600} className="h-44 w-full object-cover" />
                  <figcaption className="p-3 text-sm text-[var(--muted)]">{image.alt}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="surface mt-10 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-[var(--accent)]">Want results like these for your home?</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-[var(--muted)]">
              Tell us about your project and we will scope a plan based on your goals, budget, and timeline.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Button href="/request-a-quote">Request a Quote</Button>
              <Button href={siteConfig.phoneHref} variant="secondary">Call {siteConfig.phoneDisplay}</Button>
            </div>
          </section>
        </Container>
      </section>
    </>
  );
}
