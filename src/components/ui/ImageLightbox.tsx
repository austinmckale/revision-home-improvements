"use client";

import { useEffect } from "react";
import Image from "next/image";

type LightboxImage = {
  src: string;
  alt: string;
  caption?: string;
};

type Props = {
  images: LightboxImage[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
};

export default function ImageLightbox({ images, activeIndex, onClose, onNavigate }: Props) {
  useEffect(() => {
    const currentIndex = activeIndex;
    if (currentIndex === null) return;
    const resolvedIndex = currentIndex;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (images.length < 2) return;

      if (event.key === "ArrowRight") {
        onNavigate((resolvedIndex + 1) % images.length);
      }

      if (event.key === "ArrowLeft") {
        onNavigate((resolvedIndex - 1 + images.length) % images.length);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, images.length, onClose, onNavigate]);

  if (activeIndex === null) return null;

  const image = images[activeIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Expanded project photo"
      onClick={onClose}
    >
      <div className="relative w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-0 top-0 z-10 rounded-full bg-black/70 px-3 py-2 text-sm font-semibold text-white"
          aria-label="Close expanded photo"
        >
          Close
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => onNavigate((activeIndex - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/70 px-3 py-2 text-sm font-semibold text-white"
              aria-label="Previous photo"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => onNavigate((activeIndex + 1) % images.length)}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/70 px-3 py-2 text-sm font-semibold text-white"
              aria-label="Next photo"
            >
              Next
            </button>
          </>
        )}

        <div className="flex min-h-[60vh] items-center justify-center">
          <Image
            src={image.src}
            alt={image.alt}
            width={1600}
            height={1200}
            className="max-h-[80vh] w-auto rounded-xl object-contain"
            sizes="100vw"
            priority
          />
        </div>

        <div className="mt-4 flex items-start justify-between gap-4 text-white">
          <div>
            <p className="text-sm font-semibold">{image.alt}</p>
            {image.caption && <p className="mt-1 text-sm text-white/75">{image.caption}</p>}
          </div>
          {images.length > 1 && (
            <p className="shrink-0 text-sm text-white/75">
              {activeIndex + 1} / {images.length}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
