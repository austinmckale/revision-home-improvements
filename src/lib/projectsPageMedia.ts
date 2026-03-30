import type { CaseStudy } from "@/content/caseStudies";

export type SupplementalProjectImage = {
  src: string;
  alt: string;
};

/**
 * Extra gallery images for /projects when a service filter is active.
 * Uses each case study's non-lead images only (index 1+), matching the cards above
 * and keeping the grid on-theme for that service.
 */
export function getSupplementalImagesForFilteredCaseStudies(
  studies: CaseStudy[],
  options?: { maxImages?: number },
): SupplementalProjectImage[] {
  const maxImages = options?.maxImages ?? 12;
  const seen = new Set<string>();
  const out: SupplementalProjectImage[] = [];

  for (const study of studies) {
    for (const img of study.images.slice(1)) {
      const src = img.src.trim();
      if (!src || seen.has(src)) continue;
      seen.add(src);
      out.push({ src, alt: img.alt });
      if (out.length >= maxImages) return out;
    }
  }

  return out;
}
