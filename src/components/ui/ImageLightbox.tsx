"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Portal from "./Portal";
import useModalFocus from "./useModalFocus";

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
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const image = activeIndex === null ? undefined : images[activeIndex];
  const isOpen = Boolean(image);

  useModalFocus(isOpen, dialogRef, closeButtonRef, onClose);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;
    const resolvedIndex = activeIndex;

    function onKeyDown(event: KeyboardEvent) {
      if (images.length < 2) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNavigate((resolvedIndex + 1) % images.length);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onNavigate((resolvedIndex - 1 + images.length) % images.length);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, images.length, isOpen, onNavigate]);

  if (!image || activeIndex === null) return null;

  return (
    <Portal>
      <div
        className="fixed inset-0 z-[9999] overflow-y-auto bg-black/85 p-4 sm:p-6"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Expanded project photo"
        tabIndex={-1}
        onClick={onClose}
      >
        <div
          className="relative mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            ref={closeButtonRef}
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

          <div className="flex h-[75dvh] items-center justify-center">
            <Image
              src={image.src}
              alt={image.alt}
              width={1600}
              height={1200}
              className="max-h-[75dvh] max-w-full w-auto rounded-xl object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <div className="mt-4 flex items-start justify-between gap-4 text-white" aria-live="polite" aria-atomic="true">
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
    </Portal>
  );
}
