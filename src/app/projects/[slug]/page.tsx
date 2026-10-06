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
import { visibleCaseStudies, getCaseStudyBySlug, getSimilarCaseStudiesForProject } from "@/content/caseStudies";
import { siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/url";
import { businessEntityId, getBreadcrumbJsonLd } from "@/lib/structuredData";
import { getProjectGalleryImages } from "@/lib/projectPageMedia";
import { getProjectCollection, getProjectPresentation } from "@/content/projectShowcase";
import { getProjectImageProps } from "@/content/projectImagePreviews";
import { getImageFocalClass } from "@/content/imageFocalPoints";

type Params = { slug: string };

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
    { href: "/reading-pa/paver-installation", label: "Paver patio installation in Reading" },
    { href: "/allentown-pa/paver-installation", label: "Paver patio installation in Allentown" },
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
  const locationShort = caseStudy.locationName.replace(/, PA$/, "");
  const similarCaseStudies = getSimilarCaseStudiesForProject(caseStudy, 4);
  const galleryImages = getProjectGalleryImages(caseStudy);
  const heroImage = getProjectPresentation(caseStudy).image;
  const collection = getProjectCollection(caseStudy);
  const isCommercial = collection === "commercial";
  const isProcess = collection === "process";
  const isPlanning = caseStudy.mediaType === "planning";
  const isPhotoOverview = caseStudy.mediaType === "photos";
  const overviewImages = isPhotoOverview ? caseStudy.images : galleryImages;
  const showProjectPhotosAside = overviewImages.length > 0;
  const quoteHref = `/request-a-quote?service=${encodeURIComponent(caseStudy.serviceSlug)}`;

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
            <p className="eyebrow eyebrow-light">
              {caseStudy.serviceName} ·{" "}
              {isPlanning ? "Planning ideas" : isProcess ? "Existing conditions" : "Design & finish details"}
            </p>
            <h1 className="heading-serif mt-5 max-w-4xl text-4xl leading-[1.03] tracking-[-.03em] text-white sm:text-5xl lg:text-7xl">
              {caseStudy.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{caseStudy.summary}</p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-[.13em] text-white/65">
              {caseStudy.locationSlug ? <span>{caseStudy.locationName}</span> : null}
              {caseStudy.timeline ? <span>{caseStudy.timeline}</span> : null}
            </div>
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
          <div className="mt-12 border-t border-white/25 pt-4">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[.18em] text-white/55">
              {isPlanning ? "Planning topics" : isProcess ? "Condition details" : "Design highlights"}
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
              {caseStudy.scope.slice(0, 3).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
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

      <section className="py-14">
        <Container className={`grid gap-8 ${showProjectPhotosAside ? "lg:grid-cols-[1.2fr_0.8fr]" : ""}`}>
          <div>
            <h2 className="text-2xl font-bold text-[var(--accent)]">
              {isPhotoOverview ? "Take a closer look" : "Planning topics"}
            </h2>
            {caseStudy.evidenceNote ? (
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{caseStudy.evidenceNote}</p>
            ) : null}
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)]">
              {caseStudy.scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            {caseStudy.challenge ? (
              <>
                <h3 className="mt-8 text-xl font-semibold text-[var(--accent)]">Planning considerations</h3>
                <p className="mt-2 text-[var(--muted)]">{caseStudy.challenge}</p>
              </>
            ) : null}

            {caseStudy.solution ? (
              <>
                <h3 className="mt-8 text-xl font-semibold text-[var(--accent)]">Planning approach</h3>
                <p className="mt-2 text-[var(--muted)]">{caseStudy.solution}</p>
              </>
            ) : null}
            <p className="mt-3 text-sm text-[var(--muted)]">
              For your own space, discuss scope, existing conditions, materials and scheduling. Start with our{" "}
              <Link href={`/services/${caseStudy.serviceSlug}`} className="font-semibold text-[var(--brand)]">
                {caseStudy.serviceName.toLowerCase()} overview
              </Link>
              .
            </p>

            {caseStudy.results.length ? (
              <>
                <h3 className="mt-8 text-xl font-semibold text-[var(--accent)]">Planning direction</h3>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-[var(--muted)]">
                  {caseStudy.results.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : null}

            {caseStudy.testimonial ? (
              <blockquote className="surface mt-8 rounded-xl p-5">
                <p className="text-[var(--muted)]">&ldquo;{caseStudy.testimonial.quote}&rdquo;</p>
                <p className="mt-2 text-sm font-semibold text-[var(--accent)]">{caseStudy.testimonial.author}</p>
              </blockquote>
            ) : null}

            <section className="mt-10 border-t border-[var(--border)] pt-8" aria-labelledby="project-explore-next">
              <h3 id="project-explore-next" className="text-lg font-semibold text-[var(--accent)]">
                Explore next
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                <Link
                  href={`/services/${caseStudy.serviceSlug}`}
                  className="font-semibold text-[var(--brand)] underline-offset-2 hover:underline"
                >
                  Explore {caseStudy.serviceName.toLowerCase()}
                </Link>{" "}
                for how we plan work, what affects pricing, and more photos from this trade.
              </p>
              {similarCaseStudies.length > 0 ? (
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">
                    More ideas to explore
                  </p>
                  <ul className="mt-2 space-y-2 text-sm">
                    {similarCaseStudies.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/projects/${item.slug}`}
                          className="text-[var(--muted)] underline-offset-2 hover:text-[var(--brand)] hover:underline"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {caseStudy.locationSlug ? (
                <p className="mt-5 text-xs leading-relaxed text-[var(--muted)]">
                  <Link
                    href={`/${caseStudy.locationSlug}/${caseStudy.serviceSlug}`}
                    className="text-[var(--brand)] underline-offset-2 hover:underline"
                  >
                    Service area details: {locationShort}
                  </Link>
                </p>
              ) : null}
              {localPlanningLinks[caseStudy.serviceSlug] && (
                <nav aria-label="Plan a project in your area" className="mt-6 border-t border-[var(--border)] pt-5">
                  <p className="text-sm font-semibold text-[var(--accent)]">Planning similar work in your area?</p>
                  <ul className="mt-2 space-y-1">
                    {localPlanningLinks[caseStudy.serviceSlug].map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="inline-flex min-h-11 items-center text-sm text-[var(--brand)] underline-offset-4 hover:underline"
                        >
                          {link.label} ↗
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              <p className="mt-3 text-sm text-[var(--muted)]">
                Ready to talk about your space?{" "}
                <Link href={quoteHref} className="font-semibold text-[var(--brand)] underline-offset-2 hover:underline">
                  Request a quote
                </Link>
                {" · "}
                <Link
                  href={siteConfig.phoneHref}
                  className="font-semibold text-[var(--brand)] underline-offset-2 hover:underline"
                >
                  Call {siteConfig.phoneDisplay}
                </Link>
              </p>
            </section>
          </div>

          {showProjectPhotosAside ? (
            <div>
              <div className="surface rounded-xl p-5">
                <h3 className="text-lg font-semibold text-[var(--accent)]">
                  {isPlanning ? "Layout & finish ideas" : "Explore the photos"}
                </h3>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  {isPlanning
                    ? "Visual references for discussing layout and finish choices."
                    : "Select a photo for a closer look."}
                </p>
                <ExpandableImageGrid
                  images={overviewImages}
                  inlineCount={6}
                  gridClassName={overviewImages.length > 1 ? "mt-4 columns-1 gap-3 sm:columns-2" : "mt-4 max-w-2xl"}
                  cardClassName="mb-3 break-inside-avoid overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface-soft)]"
                  imageClassName="h-auto w-full"
                />
              </div>
              {caseStudy.photoGroups?.map((group) => (
                <section key={group.title} className="surface mt-5 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-[var(--accent)]">{group.title}</h3>
                  {group.description ? <p className="mt-2 text-sm text-[var(--muted)]">{group.description}</p> : null}
                  <ExpandableImageGrid
                    images={group.images}
                    inlineCount={4}
                    gridClassName="mt-4 columns-1 gap-3 sm:columns-2"
                    cardClassName="mb-3 break-inside-avoid overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface-soft)]"
                    imageClassName="h-auto w-full"
                  />
                </section>
              ))}
              {caseStudy.sharedCollectionSlug ? (
                <p className="mt-5 text-sm text-[var(--muted)]">
                  These photographs also appear in our{" "}
                  <Link
                    href={`/projects/${caseStudy.sharedCollectionSlug}`}
                    className="font-semibold text-[var(--brand)] underline"
                  >
                    exterior photo overview
                  </Link>
                  . Explore the wider views alongside these details.
                </p>
              ) : null}
            </div>
          ) : null}
        </Container>
      </section>

      <BottomCTA
        quoteHref={quoteHref}
        title={
          isProcess
            ? "Plan the next steps for your space"
            : `Want a similar ${caseStudy.serviceName.toLowerCase()} project?`
        }
        description="Tell us about your space, location and priorities, and we will help you define the next steps."
        showFinancing={!isCommercial}
        links={[
          { href: "/services/" + caseStudy.serviceSlug, label: "Explore " + caseStudy.serviceName.toLowerCase() },
          { href: "/projects", label: "More projects" },
        ]}
      />
    </>
  );
}
