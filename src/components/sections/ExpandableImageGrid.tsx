"use client";

import { useState } from "react";
import Image from "next/image";
import ImageLightbox from "@/components/ui/ImageLightbox";

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
  expandLabel?: string;
};

export default function ExpandableImageGrid({
  images,
  inlineCount,
  gridClassName,
  cardClassName,
  imageClassName,
  captionClassName = "p-3 text-sm text-[var(--muted)]",
  expandLabel = "Tap to expand",
}: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const visibleImages = inlineCount ? images.slice(0, inlineCount) : images;
  const hiddenCount = images.length - visibleImages.length;

  return (
    <>
      <div className={gridClassName}>
        {visibleImages.map((image, index) => (
          <figure key={image.src} className={cardClassName}>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative block w-full cursor-zoom-in overflow-hidden text-left"
              aria-label={`Expand photo: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={1200}
                height={900}
                className={`${imageClassName} transition-transform duration-200 group-hover:scale-105`}
              />
              <span className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-1 text-xs font-semibold text-white">
                {expandLabel}
              </span>
            </button>
            {image.caption && <figcaption className={captionClassName}>{image.caption}</figcaption>}
          </figure>
        ))}
      </div>

      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setActiveIndex(visibleImages.length)}
          className="mt-3 text-sm font-semibold text-[var(--brand)] hover:underline"
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
