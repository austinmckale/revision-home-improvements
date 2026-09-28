"use client";

import { useEffect, useRef } from "react";
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = activeIndex !== null;

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (activeIndex === null) return;
    const resolvedIndex = activeIndex;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab") {
        const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusableElements?.length) return;
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
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
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, images.length, onClose, onNavigate]);

  if (activeIndex === null) return null;

  const image = images[activeIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6"
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Expanded project photo"
      onClick={onClose}
    >
      <div className="relative w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
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

        <div className="flex h-[80vh] items-center justify-center">
          <Image
            src={image.src}
            alt={image.alt}
            width={1600}
            height={1200}
            className="max-h-[80vh] max-w-full w-auto rounded-xl object-contain"
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
