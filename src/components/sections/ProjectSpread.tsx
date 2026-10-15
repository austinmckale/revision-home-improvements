import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/content/caseStudies";
import { getFeaturedProjectPhotos, getProjectPresentation } from "@/content/projectShowcase";
import { getProjectImageProps } from "@/content/projectImagePreviews";
import { getImageFocalClass } from "@/content/imageFocalPoints";
import { serviceLabel } from "@/content/services";

type Photo = CaseStudy["images"][number];

function SpreadPhoto({ image, sizes, className }: { image: Photo; sizes: string; className: string }) {
  return (
    <div className={`relative overflow-hidden bg-[var(--surface-soft)] ${className}`}>
      <Image
        {...getProjectImageProps(image)}
        alt={image.alt}
        fill
        sizes={sizes}
        className={`home-project-image object-cover ${getImageFocalClass(image.src)}`}
      />
    </div>
  );
}

/**
 * A homepage project shown the way a job file reads: a lead photo, a detail or two from the same
 * project, and what was built. The title carries the link and stretches over the whole spread.
 */
export default function ProjectSpread({
  study,
  size = "standard",
  reverse = false,
  highlights = size === "lead",
}: {
  study: CaseStudy;
  size?: "lead" | "standard";
  /** Lead spreads only: photo on the right from 1024px up. */
  reverse?: boolean;
  /** Show the project's highlight list under the summary. */
  highlights?: boolean;
}) {
  const { title } = getProjectPresentation(study);
  const { lead, details } = getFeaturedProjectPhotos(study);
  const isLead = size === "lead";
  const label = serviceLabel({ slug: study.serviceSlug, name: study.serviceName });

  return (
    <article
      className={`project-spread group relative outline-offset-8 outline-[var(--brand)] has-[a:focus-visible]:outline-2 ${isLead ? "grid gap-6 lg:grid-cols-12 lg:gap-12" : "flex flex-col gap-6"}`}
    >
      {lead ? (
        <SpreadPhoto
          image={lead}
          sizes={isLead ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 100vw, 45vw"}
          className={`crop-marks aspect-[4/3] [--crop-inset:.85rem] ${isLead ? `lg:col-span-7 ${reverse ? "lg:order-2" : ""}` : ""}`}
        />
      ) : null}

      <div className={`flex flex-col ${isLead ? `lg:col-span-5 lg:py-1 ${reverse ? "lg:order-1" : ""}` : ""}`}>
        <p className="annotation text-[0.62rem] text-[var(--brand)]">
          {label}
          {study.locationSlug ? <span className="text-[var(--muted)]"> · {study.locationName}</span> : null}
        </p>
        <h3
          className={`heading-serif mt-4 leading-[1.04] tracking-[-.025em] text-[var(--accent)] ${isLead ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"}`}
        >
          <Link
            href={`/projects/${study.slug}`}
            className="transition-colors after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none group-hover:text-[var(--brand)]"
          >
            {title}
            <span className="sr-only"> View {study.title}</span>
          </Link>
        </h3>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--muted)]">{study.summary}</p>

        {highlights && study.scope.length > 0 ? (
          <ul className="mt-5 grid gap-1.5 text-sm text-[var(--foreground)]">
            {study.scope.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-[var(--brand)]" aria-hidden="true">
                  —
                </span>
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        {details.length > 0 ? (
          <div className={`grid grid-cols-2 gap-2 sm:gap-3 ${isLead ? "mt-7 lg:mt-auto lg:pt-8" : "mt-6"}`}>
            {details.map((image) => (
              <SpreadPhoto
                key={image.src}
                image={image}
                sizes={isLead ? "(max-width: 1024px) 50vw, 20vw" : "(max-width: 1024px) 50vw, 22vw"}
                // One detail runs full width; a pair is square beside it so neighbouring spreads line up.
                className={details.length === 1 ? "col-span-2 aspect-[2/1]" : isLead ? "aspect-[4/3]" : "aspect-square"}
              />
            ))}
          </div>
        ) : null}

        <p
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] underline-offset-4 group-hover:underline"
          aria-hidden="true"
        >
          See the project
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </p>
      </div>
    </article>
  );
}
