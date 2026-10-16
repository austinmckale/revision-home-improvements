import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

function evaluateModule(relativePath, imports = {}) {
  const source = readFileSync(new URL(relativePath, import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const evaluatedModule = { exports: {} };
  vm.runInNewContext(compiled, {
    module: evaluatedModule,
    exports: evaluatedModule.exports,
    require: (id) => {
      if (!(id in imports)) throw new Error(`Unexpected evidence dependency: ${id}`);
      return imports[id];
    },
  });
  return evaluatedModule.exports;
}

const evidence = evaluateModule("../src/content/projectEvidence.ts");
const retired = evaluateModule("../src/content/retiredProjects.ts");
const content = evaluateModule("../src/content/caseStudies.ts", {
  "./projectEvidence": evidence,
  "./retiredProjects": retired,
});
const company = evaluateModule("../src/content/company.ts");
const reviews = evaluateModule("../src/content/testimonials.ts", { "@/content/company": company });
const inventory = JSON.parse(
  readFileSync(new URL("../docs/audits/project-photo-inventory-2026-09-30.json", import.meta.url), "utf8"),
);
const photos = (record) => [
  ...record.images,
  ...(record.beforeImages ?? []),
  ...(record.afterImages ?? []),
  ...(record.photoGroups ?? []).flatMap((group) => group.images),
];

const expectedSplitSources = {
  "white-cabinet-open-plan-kitchen": "allentown-kitchen-layout-upgrade",
  "pink-tile-tub-reference": "bethlehem-bathroom-refresh",
  "dark-partition-commercial-restroom": "allentown-commercial-bathroom-renovation",
  "boarded-dormer-condition-photos": "lehigh-valley-fire-damage-documentation",
  "winter-exterior-damage-photos": "lehigh-valley-fire-damage-documentation",
};

// Evidence integrity covers every preserved record, including collections retired from public view.
function getCollection(slug) {
  const current = content.caseStudies.find((record) => record.slug === slug);
  assert.ok(current, `Missing collection record: ${slug}`);
  return current;
}

function assertSeparateCollections(slugs, imageCounts) {
  const seen = new Set();
  for (const [index, slug] of slugs.entries()) {
    const current = getCollection(slug);
    assert.equal(current.images.length, imageCounts[index], slug);
    assert.equal(current.photoGroups?.length ?? 0, 0, `${slug}: unrelated photo group remains`);
    for (const image of current.images) {
      assert.ok(!seen.has(image.src), `${slug}: photo still shared between separated collections: ${image.src}`);
      seen.add(image.src);
    }
  }
}

test("every original route and declared split receives reviewed content without unsupported job assertions", () => {
  assert.equal(inventory.projects.length, 24);
  assert.equal(content.caseStudies.length, 29);
  assert.equal(
    content.caseStudies.length,
    inventory.projects.length + Object.keys(evidence.projectEvidenceSplits).length,
  );
  assert.equal(new Set(content.caseStudies.map((record) => record.slug)).size, content.caseStudies.length);
  assert.deepEqual(Object.keys(evidence.projectEvidenceSplits).sort(), Object.keys(expectedSplitSources).sort());
  for (const original of inventory.projects) {
    const slug = original.route.split("/").pop();
    getCollection(slug);
    assert.ok(evidence.projectEvidenceOverrides[slug]);
  }
  const originalSlugs = new Set(inventory.projects.map((original) => original.route.split("/").pop()));
  for (const [slug, split] of Object.entries(evidence.projectEvidenceSplits)) {
    assert.equal(split.sourceSlug, expectedSplitSources[slug]);
    assert.ok(originalSlugs.has(split.sourceSlug), `${slug}: source is not a preserved original record`);
    getCollection(slug);
  }
  for (const current of content.caseStudies) {
    assert.equal(current.timeline, "", current.slug);
    // Towns come only from owner-confirmed job records (projectEvidence.ts); every other project stays unplaced.
    if (evidence.ownerConfirmedProjectLocations.has(current.slug)) {
      assert.match(current.locationSlug, /^(reading|wyomissing|berks-county|allentown|bethlehem|lehigh-valley)-pa$/, current.slug);
      assert.notEqual(current.locationName, "Photo collection", current.slug);
    } else {
      assert.equal(current.locationSlug, "", current.slug);
    }
    assert.equal(current.testimonial, undefined, current.slug);
    assert.equal(current.challenge, "", current.slug);
    assert.equal(current.solution, "", current.slug);
    assert.equal(current.results.length, 0, current.slug);
    assert.ok(["photos", "planning"].includes(current.mediaType), current.slug);
  }
  for (const slug of evidence.ownerConfirmedProjectLocations) {
    assert.ok(
      content.caseStudies.some((record) => record.slug === slug && record.locationSlug),
      `${slug}: confirmed location does not match a published original record`,
    );
  }
});

test("split exports reject a missing original source or a colliding public slug", () => {
  assert.throws(
    () =>
      evaluateModule("../src/content/caseStudies.ts", {
        "./projectEvidence": {
          ...evidence,
          projectEvidenceSplits: { "new-collection": { sourceSlug: "missing-original", evidence: {} } },
        },
        "./retiredProjects": retired,
      }),
    /Split project source missing: missing-original/,
  );
  assert.throws(
    () =>
      evaluateModule("../src/content/caseStudies.ts", {
        "./projectEvidence": {
          ...evidence,
          projectEvidenceSplits: {
            "allentown-kitchen-layout-upgrade": { sourceSlug: "allentown-kitchen-layout-upgrade", evidence: {} },
          },
        },
        "./retiredProjects": retired,
      }),
    /Split project slug must be new: allentown-kitchen-layout-upgrade/,
  );
});

test("every source photo remains in its original lineage and unchanged on disk after splitting", () => {
  const checked = new Set();
  for (const original of inventory.projects) {
    const sourceSlug = original.route.split("/").pop();
    const lineageSlugs = [
      sourceSlug,
      ...Object.entries(evidence.projectEvidenceSplits)
        .filter(([, split]) => split.sourceSlug === sourceSlug)
        .map(([slug]) => slug),
    ];
    const paths = new Set(lineageSlugs.flatMap((slug) => photos(getCollection(slug))).map((image) => image.src));
    const originalPaths = new Set(original.images.map((image) => image.src));
    assert.deepEqual([...paths].sort(), [...originalPaths].sort(), `Photo lineage changed: ${original.route}`);
    for (const image of original.images) {
      if (checked.has(image.src)) continue;
      const file = new URL(`../public${image.src}`, import.meta.url);
      assert.ok(existsSync(file), `Missing asset: ${image.src}`);
      assert.equal(createHash("sha256").update(readFileSync(file)).digest("hex"), image.sha256, image.src);
      checked.add(image.src);
    }
  }
  assert.equal(checked.size, 103);
});

test("different kitchens have separate pages with disjoint photo sets", () => {
  const slugs = ["allentown-kitchen-layout-upgrade", "white-cabinet-open-plan-kitchen"];
  assertSeparateCollections(slugs, [2, 2]);
  // The white kitchen is kept off the project grids by owner choice (October 16, 2026); its page stays.
  assert.ok(content.galleryCaseStudies.some((record) => record.slug === slugs[0]), `${slugs[0]}: missing gallery listing`);
  for (const slug of slugs) {
    assert.ok(content.getCaseStudyBySlug(slug), `${slug}: missing page`);
    const current = getCollection(slug);
    assert.equal(current.serviceSlug, "kitchen-remodeling");
    assert.equal(current.beforeImages.length, 0, slug);
    assert.equal(current.afterImages.length, 0, slug);
  }
});

test("unrelated bathroom references have their own pages and preserve the matching commercial corridor comparison", () => {
  assertSeparateCollections(["bethlehem-bathroom-refresh", "pink-tile-tub-reference"], [2, 1]);
  assertSeparateCollections(["allentown-commercial-bathroom-renovation", "dark-partition-commercial-restroom"], [2, 1]);
  const commercial = getCollection("allentown-commercial-bathroom-renovation");
  assert.equal(commercial.beforeImages.length, 1);
  assert.equal(commercial.afterImages.length, 1);
  assert.equal(
    commercial.beforeImages[0].src,
    "/images/projects/allentown-commercial-bathroom/before/hallway-before.png",
  );
  assert.equal(commercial.afterImages[0].src, "/images/projects/allentown-commercial-bathroom/after/hallway-after.png");
});

test("unproven building relationships are not presented as one field-documentation gallery", () => {
  assertSeparateCollections(
    ["lehigh-valley-fire-damage-documentation", "boarded-dormer-condition-photos", "winter-exterior-damage-photos"],
    [27, 8, 3],
  );
});

test("unproven transformations, fire-loss attribution and duplicate showcase are withheld", () => {
  for (const slug of ["bethlehem-bathroom-refresh", "allentown-kitchen-layout-upgrade"]) {
    const current = content.getCaseStudyBySlug(slug);
    assert.equal(current.beforeImages.length, 0, slug);
    assert.equal(current.afterImages.length, 0, slug);
  }
  // Owner confirmed (October 15, 2026) that the bathroom screenshot is the same room before the remodel.
  const doubleVanity = content.getCaseStudyBySlug("ryan-bathroom-remodel");
  assert.equal(doubleVanity.beforeImages.length, 1);
  assert.equal(doubleVanity.afterImages.length, 1);
  assert.equal(doubleVanity.photoGroups?.length ?? 0, 0);
  const fireplace = content.getCaseStudyBySlug("allentown-fire-damage-interior-rebuild");
  assert.equal(fireplace.serviceSlug, "drywall-installation-repair");
  assert.equal(fireplace.featureInServiceListings, false);
  const duplicate = getCollection("lehigh-valley-dormer-shutter-detail-refresh");
  assert.equal(duplicate.showInGallery, false);
  assert.equal(duplicate.sharedCollectionSlug, "lehigh-valley-full-exterior-refresh");
  // The duplicate close-up page is merged into the full exterior project.
  assert.equal(content.getCaseStudyBySlug("lehigh-valley-dormer-shutter-detail-refresh"), undefined);
  assert.equal(
    retired.retiredProjectRedirects["lehigh-valley-dormer-shutter-detail-refresh"],
    "/projects/lehigh-valley-full-exterior-refresh",
  );
});

test("owner-retired condition, documentation and planning collections are hidden but preserved", () => {
  const expected = [
    "lehigh-valley-fire-damage-documentation",
    "boarded-dormer-condition-photos",
    "winter-exterior-damage-photos",
    "pink-tile-tub-reference",
    "beige-bathroom-before-after",
    "lehigh-water-damage-rebuild",
  ];
  const merged = ["lehigh-valley-dormer-shutter-detail-refresh"];
  assert.deepEqual(Object.keys(retired.retiredProjectRedirects).sort(), [...expected, ...merged].sort());
  for (const slug of expected) {
    assert.ok(getCollection(slug), `${slug}: record must be preserved`);
    assert.equal(content.getCaseStudyBySlug(slug), undefined, `${slug}: must not be public`);
    assert.ok(!content.galleryCaseStudies.some((record) => record.slug === slug), `${slug}: must not be listed`);
    assert.match(retired.retiredProjectRedirects[slug], /^\/services\/[a-z-]+$/, `${slug}: redirect target`);
  }
});

test("text-only water content is planning and cannot be promoted as a finished project", () => {
  const water = getCollection("lehigh-water-damage-rebuild");
  assert.equal(water.mediaType, "planning");
  assert.equal(water.showInGallery, false);
  assert.equal(water.featureInServiceListings, false);
  assert.equal(photos(water).length, 0);
});

test("published reviews have traceable sources and no invented job, service or town links", () => {
  assert.equal(reviews.testimonials.length, 11);
  assert.equal(reviews.withheldTestimonials.length, 15);
  assert.equal(reviews.getFeaturedTestimonials().length, 3);
  assert.equal(reviews.getTestimonialsByLocation("allentown-pa").length, 0);
  assert.equal(reviews.getTestimonialsByService("bathroom-remodeling").length, 0);
  for (const review of reviews.testimonials) {
    assert.equal(reviews.isSourceCheckedTestimonial(review), true);
    const { platform, url, association, projectSlug } = review.verification;
    if (platform === "Google") assert.equal(url, company.company.social.googleBusinessProfile, review.name);
    else assert.ok(url.startsWith("https://www.angi.com/"), review.name);
    // A project link needs the review's own photos to show that project; only the pool review has them.
    if (association === "project") {
      assert.equal(projectSlug, "bethlehem-pool-patio-renovation", review.name);
      assert.ok(content.getCaseStudyBySlug(projectSlug), review.name);
    } else {
      assert.equal(association, "company-only", review.name);
      assert.equal(projectSlug, undefined, review.name);
    }
    assert.equal(review.locationSlug, undefined);
    assert.equal(review.serviceSlug, undefined);
  }
  assert.equal(reviews.getProjectTestimonial("bethlehem-pool-patio-renovation")?.name, "Sara M.");
});
