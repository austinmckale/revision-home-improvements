/**
 * Audits project-photo wiring for service and priority city pages.
 * Run: npx tsx scripts/audit-project-photos.ts
 */
import { caseStudies, visibleCaseStudies } from "../src/content/caseStudies";
import { getCityServiceLocalContent } from "../src/content/localSeo";
import { locations } from "../src/content/locations";
import { findExplicitFeaturedCaseStudy } from "../src/lib/serviceFeaturedCaseStudy";
import { getFeaturedCaseStudyGalleryImages } from "../src/lib/servicePageMedia";
import { primaryServices, services, getServiceBySlug } from "../src/content/services";

type GalleryReport = {
  url: string;
  section: string;
  caseStudySlug: string | null;
  caseStudyTitle: string | null;
  imageCount: number;
  imageFolders: string[];
  imageAlts: string[];
};

const AUDIT_SERVICES = [
  "water-damage-restoration",
  "fire-damage-restoration",
  "basement-finishing",
  "kitchen-remodeling",
  "bathroom-remodeling",
  "drywall-installation-repair",
  "flooring-installation",
  "paver-installation",
  "exterior-remodeling",
] as const;

const AUDIT_CITY_SERVICES = [
  "water-damage-restoration",
  "fire-damage-restoration",
  "basement-finishing",
  "kitchen-remodeling",
  "bathroom-remodeling",
] as const;

const AUDIT_CITIES = ["allentown-pa", "bethlehem-pa", "reading-pa", "berks-county-pa"] as const;

const PRIORITY_CASE_STUDIES = [
  "lehigh-water-damage-rebuild",
  "allentown-fire-damage-interior-rebuild",
  "lehigh-valley-basement-finish-and-detail",
] as const;

function folderFromSrc(src: string): string | null {
  const match = src.match(/\/images\/projects\/([^/]+)\//);
  return match ? match[1] : null;
}

function collectCaseStudyImages(slug: string | null | undefined) {
  if (!slug) return { count: 0, folders: [] as string[], alts: [] as string[] };
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) return { count: 0, folders: [] as string[], alts: [] as string[] };
  const images = [
    ...study.images,
    ...(study.beforeImages ?? []),
    ...(study.afterImages ?? []),
  ];
  return {
    count: images.length,
    folders: [...new Set(images.map((img) => folderFromSrc(img.src)).filter(Boolean))] as string[],
    alts: images.map((img) => img.alt),
  };
}

function auditServicePage(serviceSlug: string): GalleryReport[] {
  const service = getServiceBySlug(serviceSlug);
  if (!service) return [];
  const reports: GalleryReport[] = [];
  const explicitFeatured = findExplicitFeaturedCaseStudy(service, visibleCaseStudies);
  const hero = service.image.src?.trim() ?? "";
  const galleryImages = explicitFeatured
    ? getFeaturedCaseStudyGalleryImages(explicitFeatured, hero)
    : [];
  const pinned = Boolean(explicitFeatured);
  const fallbackGallery = pinned ? [] : service.gallery.slice(0, 4);

  if (galleryImages.length > 0) {
    reports.push({
      url: `/services/${serviceSlug}`,
      section: "From This Project",
      caseStudySlug: explicitFeatured?.slug ?? null,
      caseStudyTitle: explicitFeatured?.title ?? null,
      imageCount: galleryImages.length,
      imageFolders: [...new Set(galleryImages.map((img) => folderFromSrc(img.src)).filter(Boolean))] as string[],
      imageAlts: galleryImages.map((img) => img.alt),
    });
  } else if (fallbackGallery.length > 0) {
    reports.push({
      url: `/services/${serviceSlug}`,
      section: "Recent Work (service.gallery)",
      caseStudySlug: null,
      caseStudyTitle: null,
      imageCount: fallbackGallery.length,
      imageFolders: [...new Set(fallbackGallery.map((img) => folderFromSrc(img.src)).filter(Boolean))] as string[],
      imageAlts: fallbackGallery.map((img) => img.alt),
    });
  }

  if (hero) {
    reports.push({
      url: `/services/${serviceSlug}`,
      section: "Hero image",
      caseStudySlug: explicitFeatured?.slug ?? null,
      caseStudyTitle: explicitFeatured?.title ?? null,
      imageCount: 1,
      imageFolders: [folderFromSrc(hero)].filter(Boolean) as string[],
      imageAlts: [service.image.alt],
    });
  }

  return reports;
}

function auditCityPage(citySlug: string, serviceSlug: string): GalleryReport[] {
  const service = getServiceBySlug(serviceSlug);
  if (!service) return [];
  const localContent = getCityServiceLocalContent(citySlug, serviceSlug);
  const reports: GalleryReport[] = [];

  const localProof = visibleCaseStudies.filter(
    (item) => item.locationSlug === citySlug && item.serviceSlug === serviceSlug,
  );
  const topLocal = localProof[0];
  const relatedFromConfig = localContent?.relatedCaseStudySlug
    ? caseStudies.find((c) => c.slug === localContent.relatedCaseStudySlug)
    : undefined;
  const explicitFeatured = findExplicitFeaturedCaseStudy(service, visibleCaseStudies);
  const gallerySource = explicitFeatured ?? topLocal ?? relatedFromConfig;
  const hero = service.image.src?.trim() ?? "";
  const galleryImages = getFeaturedCaseStudyGalleryImages(gallerySource, hero);

  if (galleryImages.length > 0) {
    reports.push({
      url: `/${citySlug}/${serviceSlug}`,
      section: "Featured project photos",
      caseStudySlug: gallerySource?.slug ?? null,
      caseStudyTitle: gallerySource?.title ?? null,
      imageCount: galleryImages.length,
      imageFolders: [...new Set(galleryImages.map((img) => folderFromSrc(img.src)).filter(Boolean))] as string[],
      imageAlts: galleryImages.map((img) => img.alt),
    });
  }

  if (hero) {
    reports.push({
      url: `/${citySlug}/${serviceSlug}`,
      section: "Hero image (service)",
      caseStudySlug: gallerySource?.slug ?? null,
      caseStudyTitle: gallerySource?.title ?? null,
      imageCount: 1,
      imageFolders: [folderFromSrc(hero)].filter(Boolean) as string[],
      imageAlts: [service.image.alt],
    });
  }

  return reports;
}

function auditCaseStudyPage(slug: string): GalleryReport[] {
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study || study.hidden) {
    return [{ url: `/projects/${slug}`, section: "Case study", caseStudySlug: slug, caseStudyTitle: null, imageCount: 0, imageFolders: [], imageAlts: [] }];
  }
  const images = [...study.images, ...(study.beforeImages ?? []), ...(study.afterImages ?? [])];
  return [
    {
      url: `/projects/${slug}`,
      section: "Case study gallery/hero",
      caseStudySlug: study.slug,
      caseStudyTitle: study.title,
      imageCount: images.length,
      imageFolders: [...new Set(images.map((img) => folderFromSrc(img.src)).filter(Boolean))] as string[],
      imageAlts: images.map((img) => img.alt),
    },
  ];
}

function flagIssues(report: GalleryReport): string[] {
  const issues: string[] = [];
  const url = report.url;

  if (url.includes("water-damage") && report.imageCount > 0) {
    const badFolders = report.imageFolders.filter(
      (f) =>
        !f.includes("water") &&
        !folderFromSrc(report.imageAlts.join(" ") ?? "") &&
        ["ryan-bathroom", "ryan-bedroom", "fogelsville-basement", "bethlehem-interior-flooring", "allentown-flooring", "blue-kitchen", "bethlehem-bathroom", "lehigh-valley-basement-theater"].includes(f),
    );
    if (badFolders.length > 0) {
      issues.push(`Water page shows unrelated folders: ${badFolders.join(", ")}`);
    }
    if (
      report.caseStudySlug === "lehigh-water-damage-rebuild" &&
      report.imageCount > 0 &&
      report.imageFolders.length > 0
    ) {
      issues.push("Water case study gallery should be text-only until verified photos exist");
    }
  }

  if (url.includes("fire-damage") && report.imageCount > 0) {
    const nonFire = report.imageFolders.filter(
      (f) => !f.includes("fire") && f !== "fireplace-construction-project" && !f.includes("fire-damage"),
    );
    if (nonFire.length > 0) {
      issues.push(`Fire page shows non-fire folders: ${nonFire.join(", ")}`);
    }
  }

  if (
    report.section.includes("From This Project") ||
    report.section.includes("Featured project photos")
  ) {
    if (report.imageCount > 0 && !report.caseStudySlug) {
      issues.push("Project-labeled gallery has images but no linked case study");
    }
  }

  return issues;
}

function main() {
  const allReports: GalleryReport[] = [];
  const allIssues: Array<{ report: GalleryReport; issues: string[] }> = [];

  for (const serviceSlug of AUDIT_SERVICES) {
    allReports.push(...auditServicePage(serviceSlug));
  }

  for (const city of AUDIT_CITIES) {
    for (const serviceSlug of AUDIT_CITY_SERVICES) {
      allReports.push(...auditCityPage(city, serviceSlug));
    }
  }

  for (const slug of PRIORITY_CASE_STUDIES) {
    allReports.push(...auditCaseStudyPage(slug));
  }

  console.log("RHI Pros project-photo audit (codebase wiring)\n");

  const withGalleries = allReports.filter((r) => r.imageCount > 0);
  const withoutGalleries = allReports.filter((r) => r.imageCount === 0);

  console.log(`Pages/sections with images: ${withGalleries.length}`);
  for (const report of withGalleries) {
    const issues = flagIssues(report);
    if (issues.length) allIssues.push({ report, issues });
    console.log(`\n${report.url}`);
    console.log(`  Section: ${report.section}`);
    console.log(`  Case study: ${report.caseStudyTitle ?? "(none)"} [${report.caseStudySlug ?? "n/a"}]`);
    console.log(`  Images: ${report.imageCount}`);
    console.log(`  Folders: ${report.imageFolders.join(", ") || "(none)"}`);
    if (issues.length) {
      for (const issue of issues) console.log(`  ISSUE: ${issue}`);
    }
  }

  console.log(`\n---\nPages/sections with no images (expected for text-only): ${withoutGalleries.length}`);
  const waterNoImages = withoutGalleries.filter((r) => r.url.includes("water-damage"));
  for (const report of waterNoImages) {
    console.log(`  ${report.url} — ${report.section}`);
  }

  if (allIssues.length > 0) {
    console.log(`\n✗ ${allIssues.length} issue(s) found in codebase wiring`);
    process.exit(1);
  }

  console.log("\n✓ No mismatched project-photo wiring detected in codebase");
}

main();
