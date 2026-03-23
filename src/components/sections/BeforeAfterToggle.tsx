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
  const [activeStage, setActiveStage] = useState<"BEFORE" | "AFTER">("AFTER");
  const activeImages = activeStage === "BEFORE" ? beforeImages : afterImages;

  return (
    <section className="surface mt-8 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-[var(--accent)]">Before and After</h3>
      <div className="mt-4 inline-flex rounded-lg border border-[var(--border)] p-1">
        <button
          type="button"
          onClick={() => setActiveStage("BEFORE")}
          className={`rounded-md px-3 py-1.5 text-sm font-semibold ${
            activeStage === "BEFORE"
              ? "bg-[var(--accent)] text-white"
              : "text-[var(--muted)]"
          }`}
        >
          Before
        </button>
        <button
          type="button"
          onClick={() => setActiveStage("AFTER")}
          className={`rounded-md px-3 py-1.5 text-sm font-semibold ${
            activeStage === "AFTER"
              ? "bg-[var(--accent)] text-white"
              : "text-[var(--muted)]"
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
        gridClassName="mt-4 grid gap-4 lg:grid-cols-2"
        cardClassName="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface-soft)]"
        imageClassName="h-auto w-full"
        captionClassName="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]"
      />
    </section>
  );
}
