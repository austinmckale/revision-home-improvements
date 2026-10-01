"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Image, { getImageProps } from "next/image";
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
  const gestureRef = useRef<{ id: number; x: number; y: number; started: number; vertical: boolean } | null>(null);
  const [retry, setRetry] = useState({ src: "", attempt: 0 });
  const [photoState, setPhotoState] = useState<{ key: string; status: "loaded" | "error" | "loading" }>({
    key: "",
    status: "loading",
  });
  const image = activeIndex === null ? undefined : images[activeIndex];
  const isOpen = Boolean(image);
  const attempt = retry.src === image?.src ? retry.attempt : 0;
  const imageSrc = image?.src
    ? `${image.src}${attempt ? `${image.src.includes("?") ? "&" : "?"}photo_retry=${attempt}` : ""}`
    : "";
  const photoStatus = photoState.key === imageSrc ? photoState.status : "loading";

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

  useEffect(() => {
    if (!isOpen || activeIndex === null || images.length < 2) return;
    // Prepare the same responsive candidates used by the viewer, without
    // promoting either neighboring image into the current photo's evidence.
    const adjacent = new Set([(activeIndex + 1) % images.length, (activeIndex - 1 + images.length) % images.length]);
    const prepared = Array.from(adjacent, (index) => {
      const next = images[index];
      const props = getImageProps({ src: next.src, alt: next.alt, width: 1600, height: 1200, sizes: "100vw" }).props;
      const loader = new window.Image();
      loader.decoding = "async";
      if (props.srcSet) loader.srcset = props.srcSet;
      if (props.sizes) loader.sizes = props.sizes;
      loader.src = props.src;
      return loader;
    });
    return () => {
      prepared.forEach((loader) => {
        loader.onload = null;
        loader.onerror = null;
      });
    };
  }, [activeIndex, images, isOpen]);

  function beginSwipe(event: PointerEvent<HTMLDivElement>) {
    if (
      images.length < 2 ||
      !event.isPrimary ||
      (event.pointerType === "mouse" && event.button !== 0) ||
      (event.target instanceof HTMLElement && event.target.closest("button, a"))
    )
      return;
    gestureRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      started: Date.now(),
      vertical: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function updateSwipe(event: PointerEvent<HTMLDivElement>) {
    const gesture = gestureRef.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    const distanceX = Math.abs(event.clientX - gesture.x);
    const distanceY = Math.abs(event.clientY - gesture.y);
    if (distanceY > 12 && distanceY > distanceX) gesture.vertical = true;
  }

  function finishSwipe(event: PointerEvent<HTMLDivElement>) {
    const gesture = gestureRef.current;
    gestureRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    if (!gesture || gesture.id !== event.pointerId || gesture.vertical || activeIndex === null) return;
    const distanceX = event.clientX - gesture.x;
    const distanceY = event.clientY - gesture.y;
    const threshold = Math.max(48, Math.min(100, event.currentTarget.clientWidth * 0.12));
    if (
      Math.abs(distanceX) >= threshold &&
      Math.abs(distanceX) > Math.abs(distanceY) * 1.5 &&
      Date.now() - gesture.started < 1500
    ) {
      onNavigate((activeIndex + (distanceX < 0 ? 1 : -1) + images.length) % images.length);
    }
  }

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
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <div
          className="relative mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute right-0 top-0 z-10 min-h-11 min-w-11 rounded-full bg-black/70 px-4 py-2 text-sm font-semibold text-white"
            aria-label="Close expanded photo"
          >
            Close
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => onNavigate((activeIndex - 1 + images.length) % images.length)}
                className="absolute left-2 top-1/2 z-10 min-h-11 min-w-11 -translate-y-1/2 rounded-full bg-black/70 px-4 py-2 text-sm font-semibold text-white"
                aria-label="Previous photo"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => onNavigate((activeIndex + 1) % images.length)}
                className="absolute right-2 top-1/2 z-10 min-h-11 min-w-11 -translate-y-1/2 rounded-full bg-black/70 px-4 py-2 text-sm font-semibold text-white"
                aria-label="Next photo"
              >
                Next
              </button>
            </>
          )}

          <div
            className="relative flex h-[75dvh] select-none items-center justify-center"
            style={{ touchAction: "pan-y pinch-zoom" }}
            aria-busy={photoStatus === "loading"}
            onPointerDown={beginSwipe}
            onPointerMove={updateSwipe}
            onPointerUp={finishSwipe}
            onPointerCancel={() => {
              gestureRef.current = null;
            }}
          >
            <Image
              key={imageSrc}
              src={imageSrc}
              alt={image.alt}
              width={1600}
              height={1200}
              draggable={false}
              onLoad={() => setPhotoState({ key: imageSrc, status: "loaded" })}
              onError={() => setPhotoState({ key: imageSrc, status: "error" })}
              className={`max-h-[75dvh] max-w-full w-auto rounded-xl object-contain transition-opacity duration-150 motion-reduce:transition-none ${photoStatus === "loaded" ? "opacity-100" : "opacity-0"}`}
              sizes="100vw"
              priority
            />
            {photoStatus !== "loaded" && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-16 text-center text-sm text-white"
                role="status"
              >
                <p>{photoStatus === "error" ? "This photo could not load." : "Loading photo…"}</p>
                {photoStatus === "error" && (
                  <button
                    type="button"
                    onClick={() => {
                      setRetry((previous) => ({ src: image.src, attempt: previous.attempt + 1 }));
                      setPhotoState({ key: "", status: "loading" });
                    }}
                    className="min-h-11 rounded-full border border-white/60 px-5 py-2 font-semibold hover:bg-white/10"
                  >
                    Try photo again
                  </button>
                )}
              </div>
            )}
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
