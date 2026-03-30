import type { CaseStudy } from "@/content/caseStudies";
import type { Service } from "@/content/services";

/** When set, this case study wins over location/title sort for featured card + gallery (must be visible). */
export function findExplicitFeaturedCaseStudy(
  service: Service,
  visibleCaseStudies: CaseStudy[],
): CaseStudy | undefined {
  const slug = service.featuredCaseStudySlug?.trim();
  if (!slug) return undefined;
  return visibleCaseStudies.find((c) => c.slug === slug && c.serviceSlug === service.slug);
}
