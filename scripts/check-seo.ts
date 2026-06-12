/**
 * SEO guardrails — run with: npm run check:seo
 * Fails on issues that commonly hurt crawlability or the conservative local SEO strategy.
 */
import { company } from "../src/content/company";
import { caseStudies, visibleCaseStudies } from "../src/content/caseStudies";
import { getCityServiceLocalContent } from "../src/content/localSeo";
import { locations } from "../src/content/locations";
import { primaryServices, services } from "../src/content/services";
import { siteConfig } from "../src/content/site";

type Issue = { level: "error" | "warn"; message: string };

const issues: Issue[] = [];

const PRIORITY_LOCAL_SEO_KEYS = [
  "allentown-pa/water-damage-restoration",
  "bethlehem-pa/water-damage-restoration",
  "reading-pa/water-damage-restoration",
  "reading-pa/fire-damage-restoration",
  "berks-county-pa/basement-finishing",
] as const;

const CANONICAL_ORIGIN = company.domain;

const PRIORITY_FEATURED_CASE_STUDIES = [
  "lehigh-water-damage-rebuild",
  "allentown-fire-damage-interior-rebuild",
  "lehigh-valley-basement-finish-and-detail",
] as const;

/** Verified image folders per case study slug. Empty array = text-only until real photos are added. */
const VERIFIED_CASE_STUDY_IMAGE_FOLDERS: Record<string, readonly string[]> = {
  "lehigh-water-damage-rebuild": [],
  "allentown-fire-damage-interior-rebuild": ["fireplace-construction-project"],
  "lehigh-valley-fire-damage-documentation": ["fire-damage-documentation"],
  "lehigh-valley-basement-finish-and-detail": ["lehigh-valley-basement-theater"],
};

const STRICT_PHOTO_ACCURACY_SERVICES = new Set([
  "water-damage-restoration",
  "fire-damage-restoration",
  "basement-finishing",
]);

function imageProjectFolder(src: string): string | null {
  const match = src.match(/\/images\/projects\/([^/]+)\//);
  return match ? match[1] : null;
}

function slugTokens(slug: string): string[] {
  return slug.split("-").filter((token) => token.length >= 4);
}

function folderMatchesCaseStudy(caseStudySlug: string, folder: string): boolean {
  const tokens = slugTokens(caseStudySlug);
  const folderLower = folder.toLowerCase();
  const slugLower = caseStudySlug.toLowerCase();
  if (folderLower.includes(slugLower) || slugLower.includes(folderLower)) return true;
  const matchedTokens = tokens.filter((token) => folderLower.includes(token));
  return matchedTokens.length >= 2;
}

function error(message: string) {
  issues.push({ level: "error", message });
}

function warn(message: string) {
  issues.push({ level: "warn", message });
}

// --- Sitemap URL origin ---
function checkSitemapOrigin() {
  if (!siteConfig.domain.startsWith("https://www.")) {
    error(`siteConfig.domain must use https://www — got ${siteConfig.domain}`);
  }
  if (siteConfig.domain.includes("rhipros.com") && !siteConfig.domain.startsWith("https://www.rhipros.com")) {
    error(`Non-www domain in site config: ${siteConfig.domain}`);
  }
}

// --- Featured case study wiring ---
function checkFeaturedCaseStudies() {
  for (const service of primaryServices) {
    const slug = service.featuredCaseStudySlug?.trim();
    if (!slug) continue;
    const match = caseStudies.find((c) => c.slug === slug);
    if (!match) {
      error(`Service "${service.slug}" featuredCaseStudySlug "${slug}" does not exist.`);
      continue;
    }
    if (match.hidden) {
      error(`Service "${service.slug}" featuredCaseStudySlug "${slug}" is hidden.`);
    }
    if (match.serviceSlug !== service.slug) {
      warn(
        `Service "${service.slug}" featured case study "${slug}" is tagged as service "${match.serviceSlug}".`,
      );
    }
    if (PRIORITY_FEATURED_CASE_STUDIES.includes(slug as (typeof PRIORITY_FEATURED_CASE_STUDIES)[number])) {
      const photoCount =
        match.images.length + (match.beforeImages?.length ?? 0) + (match.afterImages?.length ?? 0);
      if (photoCount === 0) {
        warn(
          `Featured case study "${slug}" for service "${service.slug}" has no verified photos (text-only is OK; do not add unrelated images).`,
        );
      }
    }
  }
}

function checkCaseStudyPhotoAccuracy() {
  for (const study of caseStudies) {
    if (study.hidden) continue;

    if (/representative/i.test(study.summary)) {
      error(`Case study "${study.slug}" summary uses representative photo wording.`);
    }

    const allImages = [
      ...study.images,
      ...(study.beforeImages ?? []),
      ...(study.afterImages ?? []),
    ];

    const verifiedFolders = VERIFIED_CASE_STUDY_IMAGE_FOLDERS[study.slug];
    if (verifiedFolders) {
      if (verifiedFolders.length === 0 && allImages.length > 0) {
        error(
          `Case study "${study.slug}" must remain text-only until verified water-damage photos are added.`,
        );
      }
      for (const img of allImages) {
        const folder = imageProjectFolder(img.src);
        if (!folder || !verifiedFolders.includes(folder)) {
          error(
            `Case study "${study.slug}" uses unverified image folder "${folder ?? "unknown"}": ${img.src}`,
          );
        }
      }
      continue;
    }

    if (!STRICT_PHOTO_ACCURACY_SERVICES.has(study.serviceSlug)) continue;

    for (const img of allImages) {
      const folder = imageProjectFolder(img.src);
      if (!folder) continue;
      if (!folderMatchesCaseStudy(study.slug, folder)) {
        error(
          `Case study "${study.slug}" uses image from unrelated folder "${folder}": ${img.src}`,
        );
      }
    }
  }

  for (const service of services) {
    if (!service.featuredCaseStudySlug) continue;
    if (service.gallery.length > 0) {
      const featured = caseStudies.find((c) => c.slug === service.featuredCaseStudySlug);
      const featuredPhotoCount =
        (featured?.images.length ?? 0) +
        (featured?.beforeImages?.length ?? 0) +
        (featured?.afterImages?.length ?? 0);
      if (featuredPhotoCount === 0) {
        warn(
          `Service "${service.slug}" has a service.gallery fallback while featured case study "${service.featuredCaseStudySlug}" has no verified photos.`,
        );
      }
    }
  }
}

// --- Image alt text ---
function checkImageAlts() {
  for (const study of caseStudies) {
    if (study.hidden) continue;
    const allImages = [
      ...study.images,
      ...(study.beforeImages ?? []),
      ...(study.afterImages ?? []),
    ];
    for (const img of allImages) {
      if (!img.alt?.trim()) {
        error(`Case study "${study.slug}" has an image with empty alt: ${img.src}`);
      }
      if (/project photo \d+/i.test(img.alt)) {
        warn(`Case study "${study.slug}" has generic alt text: ${img.alt}`);
      }
    }
  }

  for (const service of services) {
    if (service.image.src && !service.image.alt?.trim()) {
      error(`Service "${service.slug}" hero image has empty alt.`);
    }
    for (const img of service.gallery) {
      if (!img.alt?.trim()) {
        error(`Service "${service.slug}" gallery image has empty alt: ${img.src}`);
      }
    }
  }
}

// --- Priority page internal links should not point only to /projects ---
function checkPriorityInternalLinks() {
  for (const key of PRIORITY_LOCAL_SEO_KEYS) {
    const content = getCityServiceLocalContent(key.split("/")[0], key.split("/")[1]);
    if (!content) {
      warn(`Priority local SEO key missing content: ${key}`);
      continue;
    }
    const projectLinks = content.internalLinks.filter((l) => l.href === "/projects" || l.href === "/projects/");
    if (projectLinks.length > 0) {
      error(
        `Priority page /${key} still links to generic /projects (${projectLinks.map((l) => l.anchorText).join(", ")}).`,
      );
    }
    const relatedSlug = content.relatedCaseStudySlug;
    if (relatedSlug) {
      const related = caseStudies.find((c) => c.slug === relatedSlug);
      if (!related || related.hidden) {
        error(`Priority page /${key} relatedCaseStudySlug "${relatedSlug}" is missing or hidden.`);
      }
    }
  }
}

// --- Metadata sanity (static content) ---
function checkMetadataBasics() {
  const titles = new Map<string, string[]>();

  for (const key of PRIORITY_LOCAL_SEO_KEYS) {
    const [city, service] = key.split("/");
    const content = getCityServiceLocalContent(city, service);
    if (!content?.metadataTitle?.trim()) {
      error(`Priority page /${key} is missing metadataTitle.`);
    }
    if (!content?.metadataDescription?.trim()) {
      error(`Priority page /${key} is missing metadataDescription.`);
    }
    if (content?.metadataTitle) {
      const list = titles.get(content.metadataTitle) ?? [];
      list.push(key);
      titles.set(content.metadataTitle, list);
    }
    if (content?.metadataDescription && /24\/7|#1|best contractor/i.test(content.metadataDescription)) {
      warn(`Priority page /${key} metadata may include urgency/superlative claims.`);
    }
  }

  for (const [title, keys] of titles) {
    if (keys.length > 1) {
      warn(`Duplicate metadataTitle "${title}" on: ${keys.join(", ")}`);
    }
  }
}

// --- Route inventory for manual Rich Results follow-up ---
function printManualAuditReminder() {
  const sampleProject = visibleCaseStudies[0]?.slug ?? "allentown-kitchen-layout-upgrade";
  const urls = [
    `${CANONICAL_ORIGIN}/`,
    `${CANONICAL_ORIGIN}/services/water-damage-restoration`,
    `${CANONICAL_ORIGIN}/allentown-pa/water-damage-restoration`,
    `${CANONICAL_ORIGIN}/reading-pa/fire-damage-restoration`,
    `${CANONICAL_ORIGIN}/berks-county-pa/basement-finishing`,
    `${CANONICAL_ORIGIN}/projects/${sampleProject}`,
  ];

  console.log("\nManual follow-up (no code substitute):");
  console.log("  • Google Rich Results Test: https://search.google.com/test/rich-results");
  for (const url of urls) {
    console.log(`    - ${url}`);
  }
  console.log("  • Confirm GSC sitemap: " + `${CANONICAL_ORIGIN}/sitemap.xml`);
  console.log("  • Verify apex redirect: curl -I https://rhipros.com/");
  console.log(`  • GBP NAP should match: ${company.name}, ${company.phone.display}`);
}

// --- Company brand consistency ---
function checkBrandSource() {
  if (siteConfig.name !== company.name) {
    error("siteConfig.name diverges from company.name");
  }
  if (!company.license.hic) {
    warn("company.license.hic is empty");
  }
}

function main() {
  console.log("RHI Pros SEO guardrails\n");

  checkSitemapOrigin();
  checkBrandSource();
  checkFeaturedCaseStudies();
  checkCaseStudyPhotoAccuracy();
  checkImageAlts();
  checkPriorityInternalLinks();
  checkMetadataBasics();

  const errors = issues.filter((i) => i.level === "error");
  const warnings = issues.filter((i) => i.level === "warn");

  if (warnings.length > 0) {
    console.log("Warnings:");
    for (const w of warnings) console.log(`  ⚠ ${w.message}`);
    console.log("");
  }

  if (errors.length > 0) {
    console.log("Errors:");
    for (const e of errors) console.log(`  ✗ ${e.message}`);
    console.log("");
    printManualAuditReminder();
    process.exit(1);
  }

  console.log(`✓ ${issues.length === 0 ? "No issues" : `${warnings.length} warning(s), 0 errors`}`);
  console.log(
    `  Routes tracked: ${locations.length} cities × ${services.length} services, ${visibleCaseStudies.length} visible case studies`,
  );
  printManualAuditReminder();
}

main();
