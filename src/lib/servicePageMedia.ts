import type { CaseStudy } from "@/content/caseStudies";
import { curatePhotos } from "@/content/photoCuration";

const MAX_FEATURED_PROJECT_PHOTOS = 8;

/**
 * Gallery for the service-page “Featured project photos” block: images from one case study only,
 * excluding the service hero (already shown above) to avoid duplication.
 */
export function getFeaturedCaseStudyGalleryImages(
  caseStudy: CaseStudy | undefined,
  serviceHeroImageSrc: string,
): Array<{ src: string; alt: string }> {
  if (!caseStudy?.images?.length) return [];
  return curatePhotos(caseStudy.images, [serviceHeroImageSrc.trim()]).slice(0, MAX_FEATURED_PROJECT_PHOTOS);
}
