import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/JsonLd";
import BottomCTA from "@/components/sections/BottomCTA";
import BeforeAfterToggle from "@/components/sections/BeforeAfterToggle";
import ExpandableImageGrid from "@/components/sections/ExpandableImageGrid";
import ProjectCard from "@/components/sections/ProjectCard";
import { visibleCaseStudies, getCaseStudyBySlug } from "@/content/caseStudies";
import { siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/url";
import { businessEntityId, getBreadcrumbJsonLd } from "@/lib/structuredData";
import { getProjectGalleryImages } from "@/lib/projectPageMedia";
import { getProjectCollection, getProjectPresentation, orderedShowcaseProjects } from "@/content/projectShowcase";
import { getProjectImageProps } from "@/content/projectImagePreviews";
import { getImageFocalClass } from "@/content/imageFocalPoints";

type Params = { slug: string };

/** Two columns for small sets so none is left empty; three once there are enough photos to fill them. */
function photoColumns(count: number) {
  if (count <= 1) return "max-w-2xl";
  return count > 4 ? "columns-1 gap-4 sm:columns-2 lg:columns-3" : "columns-1 gap-4 sm:columns-2";
}

const localPlanningLinks: Record<string, { href: string; label: string }[]> = {
  "kitchen-remodeling": [
    { href: "/lehigh-valley-pa/kitchen-remodeling", label: "Kitchen remodeling in the Lehigh Valley" },
    { href: "/berks-county-pa/kitchen-remodeling", label: "Kitchen remodeling in Berks County" },
    { href: "/berks-county-pa/kitchen-cabinet-installation", label: "Cabinet replacement in Berks County" },
  ],
  "basement-finishing": [
    { href: "/reading-pa/basement-finishing", label: "Basement finishing in Reading" },
    { href: "/berks-county-pa/basement-finishing", label: "Basement finishing in Berks County" },
  ],
  "paver-installation": [
    { href: "/reading-pa/paver-installation", label: "Paver patios in Reading" },
    { href: "/allentown-pa/paver-installation", label: "Paver patios in Allentown" },
    { href: "/berks-county-pa/paver-installation", label: "Paver patios in Berks County" },
  ],
};

export function generateStaticParams() {
  return visibleCaseStudies.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) return {};
  const image = getProjectPresentation(caseStudy).image;
  const url = absoluteUrl(`/projects/${caseStudy.slug}`);
  return {
    title: `${caseStudy.title} | ${caseStudy.mediaType === "planning" ? "Planning Reference" : "Photo Collection"}`,
    description: caseStudy.summary,
    alternates: { canonical: `/projects/${caseStudy.slug}` },
    openGraph: {
      title: `${caseStudy.title} | RHI Pros`,
      description: caseStudy.summary,
      url,
      siteName: "RHI Pros",
      type: "website",
      images: image ? [{ url: absoluteUrl(image.src), alt: image.alt }] : [],
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: `${caseStudy.title} | RHI Pros`,
      description: caseStudy.summary,
      images: image ? [absoluteUrl(image.src)] : [],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();
  const galleryImages = getProjectGalleryImages(caseStudy);
  const heroImage = getProjectPresentation(caseStudy).image;
  const collection = getProjectCollection(caseStudy);
  const isCommercial = collection === "commercial";
  const photos = caseStudy.mediaType === "photos" ? caseStudy.images : galleryImages;
  const quoteHref = `/request-a-quote?service=${encodeURIComponent(caseStudy.serviceSlug)}`;
  const localLinks = localPlanningLinks[caseStudy.serviceSlug] ?? [];
  // Same service first, then the rest of the same collection, so every project ends with somewhere to go.
  const related = orderedShowcaseProjects.filter(
    (item) => item.slug !== caseStudy.slug && getProjectCollection(item) === collection,
  );
  const moreProjects = [
    ...related.filter((item) => item.serviceSlug === caseStudy.serviceSlug),
    ...related.filter((item) => item.serviceSlug !== caseStudy.serviceSlug),
  ].slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: caseStudy.title,
    description: caseStudy.summary,
    url: absoluteUrl(`/projects/${caseStudy.slug}`),
    about: caseStudy.serviceName,
    publisher: { "@id": businessEntityId },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
          { name: caseStudy.title, href: "/projects/" + caseStudy.slug },
        ])}
      />
      <section
        data-quote-href={quoteHref}
        className={`relative isolate flex ${heroImage ? "min-h-[min(760px,82svh)]" : ""} overflow-hidden bg-[#202823] py-14 text-white md:py-20`}
      >
        {heroImage ? (
          <Image
            {...getProjectImageProps(heroImage)}
            alt={heroImage.alt}
            fill
            priority
            sizes="100vw"
            className={`absolute inset-0 -z-20 object-cover ${getImageFocalClass(heroImage.src, "hero")}`}
          />
        ) : null}
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(18,23,20,.88)_0%,rgba(18,23,20,.56)_55%,rgba(18,23,20,.12)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(18,23,20,.48)_0%,transparent_55%)]"
          aria-hidden="true"
        />
        <Container className="relative z-10 flex flex-1 flex-col justify-end pt-4 sm:pt-16">
          <div className="max-w-4xl">
            <p className="eyebrow eyebrow-light">{isCommercial ? "Commercial project" : caseStudy.serviceName}</p>
            <h1 className="heading-serif mt-5 max-w-4xl text-4xl leading-[1.03] tracking-[-.03em] text-white sm:text-5xl lg:text-7xl">
              {caseStudy.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{caseStudy.summary}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={quoteHref} className="!text-white">
                Plan your project
              </Button>
              <a
                href={siteConfig.phoneHref}
                className="inline-flex min-h-12 items-center justify-center border border-white/50 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
          {caseStudy.scope.length > 0 ? (
            <div className="mt-12 border-t border-white/25 pt-4">
              <p className="annotation text-[0.62rem] text-white/60">Highlights</p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
                {caseStudy.scope.slice(0, 3).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </Container>
      </section>

      {caseStudy.beforeImages?.length && caseStudy.afterImages?.length ? (
        <section className="bg-[var(--surface-soft)] py-12 sm:py-16">
          <Container>
            <p className="eyebrow">Before &amp; after</p>
            <BeforeAfterToggle beforeImages={caseStudy.beforeImages} afterImages={caseStudy.afterImages} />
          </Container>
        </section>
      ) : null}

      {photos.length > 0 ? (
        <section className="py-14 sm:py-20">
          <Container>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="heading-serif text-3xl text-[var(--accent)] sm:text-4xl">Photos.</h2>
              <p className="text-sm text-[var(--muted)]">Select a photo to enlarge it.</p>
            </div>
            {caseStudy.evidenceNote ? (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">{caseStudy.evidenceNote}</p>
            ) : null}
            <ExpandableImageGrid
              images={photos}
              gridClassName={`mt-8 ${photoColumns(photos.length)}`}
              cardClassName="mb-4 break-inside-avoid overflow-hidden bg-[var(--surface-soft)]"
              imageClassName="h-auto w-full"
            />
            {caseStudy.photoGroups?.map((group) => (
              <section key={group.title} className="mt-12 border-t border-[var(--border)] pt-8">
                <h3 className="heading-serif text-2xl text-[var(--accent)]">{group.title}</h3>
                {group.description ? <p className="mt-2 text-sm text-[var(--muted)]">{group.description}</p> : null}
                <ExpandableImageGrid
                  images={group.images}
                  gridClassName={`mt-6 ${photoColumns(group.images.length)}`}
                  cardClassName="mb-4 break-inside-avoid overflow-hidden bg-[var(--surface-soft)]"
                  imageClassName="h-auto w-full"
                />
              </section>
            ))}
            {caseStudy.sharedCollectionSlug ? (
              <p className="mt-8 text-sm text-[var(--muted)]">
                See the wider views in the{" "}
                <Link
                  href={`/projects/${caseStudy.sharedCollectionSlug}`}
                  className="font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
                >
                  full exterior project
                </Link>
                .
              </p>
            ) : null}
          </Container>
        </section>
      ) : null}

      {moreProjects.length > 0 ? (
        <section data-related-projects className="border-t border-[var(--border)] bg-[var(--surface-soft)] py-14 sm:py-20">
          <Container>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="heading-serif text-3xl text-[var(--accent)] sm:text-4xl">More like this.</h2>
              <Link
                href={`/services/${caseStudy.serviceSlug}`}
                className="text-sm font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
              >
                About {caseStudy.serviceName.toLowerCase()} →
              </Link>
            </div>
            <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {moreProjects.map((item) => (
                <ProjectCard key={item.slug} study={item} />
              ))}
            </div>
            {localLinks.length > 0 ? (
              <p className="mt-10 border-t border-[var(--border)] pt-5 text-sm leading-relaxed text-[var(--muted)]">
                Near you:{" "}
                {localLinks.map((link, index) => (
                  <span key={link.href}>
                    {index > 0 ? " · " : null}
                    <Link href={link.href} className="font-semibold text-[var(--accent)] underline-offset-4 hover:text-[var(--brand)] hover:underline">
                      {link.label}
                    </Link>
                  </span>
                ))}
              </p>
            ) : null}
          </Container>
        </section>
      ) : null}

      <BottomCTA quoteHref={quoteHref} title="Planning something similar?" showFinancing={!isCommercial} />
    </>
  );
}
