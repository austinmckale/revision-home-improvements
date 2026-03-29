import type { CaseStudy } from "@/content/caseStudies";

/** All image src values used in the Before/After toggle (for deduping the sidebar gallery). */
export function collectBeforeAfterSrcs(caseStudy: CaseStudy): Set<string> {
  const out = new Set<string>();
  for (const img of caseStudy.beforeImages ?? []) out.add(img.src);
  for (const img of caseStudy.afterImages ?? []) out.add(img.src);
  return out;
}

/**
 * Sidebar “Project Photos”: only images not already shown in Before/After.
 * Listing cards and the project hero use `caseStudy.images[0]` — keep that entry as your best thumbnail.
 */
export function getProjectGalleryImages(caseStudy: CaseStudy) {
  const inBeforeAfter = collectBeforeAfterSrcs(caseStudy);
  return caseStudy.images.filter((img) => !inBeforeAfter.has(img.src));
}
