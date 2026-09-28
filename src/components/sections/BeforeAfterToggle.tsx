"use client";

import { useState } from "react";
import ExpandableImageGrid from "@/components/sections/ExpandableImageGrid";

type ToggleImage = {
  src: string;
  alt: string;
};

type Props = {
  beforeImages: ToggleImage[];
  afterImages: ToggleImage[];
};

export default function BeforeAfterToggle({ beforeImages, afterImages }: Props) {
  const hasBeforeImages = beforeImages.length > 0;
  const [activeStage, setActiveStage] = useState<"BEFORE" | "AFTER">("AFTER");
  const activeImages = activeStage === "BEFORE" ? beforeImages : afterImages;

  /* When no before images exist, show after gallery without a misleading toggle */
  if (!hasBeforeImages) {
    return (
      <section className="mt-8 border-y border-[var(--border)] bg-[var(--surface)] py-6 sm:py-8">
        <h3 className="heading-serif text-2xl text-[var(--accent)]">Project photos</h3>
        <p className="mt-3 text-sm text-[var(--muted)]">After photos for this project.</p>
        <ExpandableImageGrid
          images={afterImages.map((image) => ({
            ...image,
            caption: "After",
          }))}
          gridClassName="mt-4 columns-1 gap-4 lg:columns-2"
          cardClassName="mb-4 break-inside-avoid overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface-soft)]"
          imageClassName="h-auto w-full"
          captionClassName="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]"
        />
      </section>
    );
  }

  return (
    <section className="mt-8 border-y border-[var(--border)] bg-[var(--surface)] py-6 sm:py-8">
      <h3 className="heading-serif text-2xl text-[var(--accent)]">Before and after</h3>
      <div className="mt-4 inline-flex border-b border-[var(--border)]" role="group" aria-label="Choose which project photos to view">
        <button
          type="button"
          onClick={() => setActiveStage("BEFORE")}
          aria-pressed={activeStage === "BEFORE"}
          className={`border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
            activeStage === "BEFORE"
              ? "border-[var(--brand)] text-[var(--accent)]"
              : "border-transparent text-[var(--muted)] hover:text-[var(--accent)]"
          }`}
        >
          Before
        </button>
        <button
          type="button"
          onClick={() => setActiveStage("AFTER")}
          aria-pressed={activeStage === "AFTER"}
          className={`border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
            activeStage === "AFTER"
              ? "border-[var(--brand)] text-[var(--accent)]"
              : "border-transparent text-[var(--muted)] hover:text-[var(--accent)]"
          }`}
        >
          After
        </button>
      </div>
      <p className="mt-3 text-sm text-[var(--muted)]">
        Showing {activeStage.toLowerCase()} photos for this project.
      </p>
      <ExpandableImageGrid
        images={activeImages.map((image) => ({
          ...image,
          caption: activeStage === "BEFORE" ? "Before" : "After",
        }))}
        gridClassName="mt-4 columns-1 gap-4 lg:columns-2"
        cardClassName="mb-4 break-inside-avoid overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface-soft)]"
        imageClassName="h-auto w-full"
        captionClassName="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]"
      />
    </section>
  );
}
