import type { CaseStudy } from "@/content/caseStudies";

/** All image src values used in the Before/After toggle (for deduping the sidebar gallery). */
export function collectBeforeAfterSrcs(caseStudy: CaseStudy): Set<string> {
  const out = new Set<string>();
  for (const img of caseStudy.beforeImages ?? []) out.add(img.src);
  for (const img of caseStudy.afterImages ?? []) out.add(img.src);
  return out;
}

/**
 * Sidebar “Project Photos”: skip the hero (`images[0]`) and anything already in Before/After.
 * Listing cards and the project hero use `caseStudy.images[0]` as the lead thumbnail.
 */
export function getProjectGalleryImages(caseStudy: CaseStudy) {
  const inBeforeAfter = collectBeforeAfterSrcs(caseStudy);
  return caseStudy.images.filter(
    (img, index) => index > 0 && !inBeforeAfter.has(img.src),
  );
}
