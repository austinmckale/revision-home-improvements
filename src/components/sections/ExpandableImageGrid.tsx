"use client";

import { useState } from "react";
import Image from "next/image";
import ImageLightbox from "@/components/ui/ImageLightbox";
import { getProjectImageProps } from "@/content/projectImagePreviews";
import { getProjectImageDimensions } from "@/content/projectImageDimensions";

export type ExpandableImage = {
  src: string;
  alt: string;
  caption?: string;
};

type Props = {
  images: ExpandableImage[];
  /** Show only the first N images inline; the rest are accessible via lightbox navigation. */
  inlineCount?: number;
  gridClassName: string;
  cardClassName: string;
  imageClassName: string;
  captionClassName?: string;
};

export default function ExpandableImageGrid({
  images,
  inlineCount,
  gridClassName,
  cardClassName,
  imageClassName,
  captionClassName = "p-3 text-sm text-[var(--muted)]",
}: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const visibleImages = inlineCount ? images.slice(0, inlineCount) : images;
  const hiddenCount = images.length - visibleImages.length;

  return (
    <>
      <div className={gridClassName}>
        {visibleImages.map((image, index) => {
          const imageProps = getProjectImageProps(image);
          const dimensions = getProjectImageDimensions(imageProps.src);

          return (
            <figure key={image.src} className={cardClassName}>
              <button
                type="button"
                onClick={() => {
                  setActiveIndex(index);
                  window.dispatchEvent(
                    new CustomEvent("rhi:project_gallery_open", {
                      detail: { image_src: image.src, image_alt: image.alt },
                    }),
                  );
                }}
                className="group relative block w-full cursor-zoom-in overflow-hidden text-left"
                aria-label={`Expand photo: ${image.alt}`}
              >
                <Image
                  {...imageProps}
                  {...dimensions}
                  alt={image.alt}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  className={`${imageClassName} transition-transform duration-200 group-hover:scale-105`}
                />
                <span
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white opacity-90 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M9.5 2.5h4v4M6.5 13.5h-4v-4M13.5 2.5 9 7M2.5 13.5 7 9" />
                  </svg>
                </span>
              </button>
              {image.caption && <figcaption className={captionClassName}>{image.caption}</figcaption>}
            </figure>
          );
        })}
      </div>

      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setActiveIndex(visibleImages.length)}
          className="mt-3 inline-flex min-h-11 items-center border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--brand)] transition-colors hover:bg-[var(--surface-soft)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
        >
          +{hiddenCount} more photo{hiddenCount > 1 ? "s" : ""}
        </button>
      )}

      <ImageLightbox
        images={images}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </>
  );
}
