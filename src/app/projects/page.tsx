import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";

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
    src: "/images/projects/Frontier-2.jpg",
    alt: "Patio construction project by Revision Home Improvements in Berks County.",
  },
  {
    src: "/images/projects/before-after-patio_mp4_hd.original.jpg",
    alt: "Before and after patio project in Reading, PA.",
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
          This gallery uses your migrated WordPress photos. We can expand this into service-specific galleries next.
        </p>
        <div className="surface mt-6 rounded-xl p-5">
          <h2 className="text-xl font-semibold text-[var(--accent)]">Project intent filters</h2>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <Link href="/services/kitchen-remodeling" className="rounded-full border border-[var(--border)] px-3 py-1 hover:border-[var(--brand)]">
              Kitchen projects
            </Link>
            <Link href="/services/bathroom-remodeling" className="rounded-full border border-[var(--border)] px-3 py-1 hover:border-[var(--brand)]">
              Bathroom projects
            </Link>
            <Link href="/services/paver-installation" className="rounded-full border border-[var(--border)] px-3 py-1 hover:border-[var(--brand)]">
              Outdoor projects
            </Link>
            <Link href="/request-a-quote" className="rounded-full border border-[var(--border)] px-3 py-1 hover:border-[var(--brand)]">
              Start my quote
            </Link>
          </div>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projectImages.map((image) => (
            <figure key={image.src} className="surface overflow-hidden rounded-xl">
              <Image src={image.src} alt={image.alt} width={900} height={600} className="h-56 w-full object-cover" />
              <figcaption className="p-3 text-sm text-[var(--muted)]">{image.alt}</figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
