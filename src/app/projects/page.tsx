import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { caseStudies } from "@/content/caseStudies";

const projectImages = [
  {
    src: "/images/projects/img_7833.jpg",
    alt: "Modern kitchen remodeling project in Lehigh Valley and Berks County.",
  },
  {
    src: "/images/projects/img_7547.jpg",
    alt: "Bathroom renovation project in Reading and Berks County.",
  },
  {
    src: "/images/projects/Patio-3.jpg",
    alt: "Patio remodeling and outdoor hardscape project in Reading, PA.",
  },
  {
    src: "/images/projects/img_8216.jpg",
    alt: "Interior remodeling project in Berks County by Revision Home Improvements.",
  },
];

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse recent kitchen, bathroom, interior, and outdoor remodeling projects in Reading, Berks County, and Lehigh Valley.",
};

export default function ProjectsPage() {
  return (
    <section className="py-14">
      <Container>
        <h1 className="text-4xl font-extrabold text-[var(--accent)]">Project Gallery</h1>
        <p className="mt-3 text-[var(--muted)]">
          Real project examples with scope details, location context, and final outcomes.
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
                  <Link href={`/projects/${study.slug}`} className="mt-4 inline-block text-sm font-semibold text-[var(--brand)]">
                    View case study
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-[var(--accent)]">Additional Project Photos</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projectImages.map((image) => (
              <figure key={image.src} className="surface overflow-hidden rounded-xl">
                <Image src={image.src} alt={image.alt} width={900} height={600} className="h-44 w-full object-cover" />
                <figcaption className="p-3 text-sm text-[var(--muted)]">{image.alt}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      </Container>
    </section>
  );
}
