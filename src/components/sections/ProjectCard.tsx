import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/content/caseStudies";
import { getProjectPresentation } from "@/content/projectShowcase";
import { getProjectImageProps } from "@/content/projectImagePreviews";
import { getImageFocalClass } from "@/content/imageFocalPoints";

export default function ProjectCard({
  study,
  variant = "standard",
  priority = false,
}: {
  study: CaseStudy;
  variant?: "lead" | "support" | "standard";
  priority?: boolean;
}) {
  const { title, image } = getProjectPresentation(study);
  const isFeature = variant !== "standard";

  return (
    <Link
      href={`/projects/${study.slug}`}
      className={`group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)] ${isFeature ? `crop-marks relative isolate overflow-hidden bg-[#202823] [--crop-inset:.85rem] ${variant === "lead" ? "home-project-feature min-h-[28rem] lg:col-span-7 lg:row-span-2" : "home-project-support min-h-[19rem] lg:col-span-5"}` : "min-w-0"}`}
    >
      <div
        className={
          isFeature ? "absolute inset-0 -z-20" : "relative aspect-[4/3] overflow-hidden bg-[var(--surface-soft)]"
        }
      >
        {image ? (
          <Image
            {...getProjectImageProps(image)}
            alt={image.alt}
            fill
            priority={priority}
            sizes={
              variant === "lead"
                ? "(max-width: 1024px) 100vw, 60vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
            className={`home-project-image object-cover ${getImageFocalClass(image.src)}`}
          />
        ) : (
          <div className="media-placeholder absolute inset-0" aria-hidden="true" />
        )}
      </div>
      {isFeature && (
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/10 to-transparent"
          aria-hidden="true"
        />
      )}
      <div className={isFeature ? "absolute inset-x-0 bottom-0 p-6 text-white sm:p-8" : "pb-4 pt-5"}>
        <p
          className={`text-[0.65rem] font-semibold uppercase tracking-[.16em] ${isFeature ? "text-white/80" : "text-[var(--brand)]"}`}
        >
          {study.locationSlug ? `${study.locationName} · ` : ""}
          {study.serviceName}
        </p>
        <div className="mt-3 flex items-start justify-between gap-4">
          <h3
            className={`heading-serif leading-[1.08] ${variant === "lead" ? "max-w-lg text-4xl sm:text-5xl lg:text-6xl" : "text-2xl sm:text-3xl"} ${isFeature ? "text-white" : "text-[var(--accent)]"}`}
          >
            {title}
          </h3>
          <span
            className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 group-hover:rotate-45 group-hover:border-[var(--brand)] group-hover:bg-[var(--brand)] group-hover:text-white ${isFeature ? "border-white/50" : "border-[var(--border)] text-[var(--accent)]"}`}
            aria-hidden="true"
          >
            ↗
          </span>
        </div>
        {variant === "lead" && <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">{study.summary}</p>}
        {!isFeature && <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{study.summary}</p>}
        <span className="sr-only">View {study.title}</span>
      </div>
    </Link>
  );
}
