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
const content = evaluateModule("../src/content/caseStudies.ts", { "./projectEvidence": evidence });
const reviews = evaluateModule("../src/content/testimonials.ts");
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

function getCollection(slug) {
  const current = content.getCaseStudyBySlug(slug);
  assert.ok(current, `Missing public collection: ${slug}`);
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
    assert.equal(current.locationSlug, "", current.slug);
    assert.equal(current.testimonial, undefined, current.slug);
    assert.equal(current.challenge, "", current.slug);
    assert.equal(current.solution, "", current.slug);
    assert.equal(current.results.length, 0, current.slug);
    assert.ok(["photos", "planning"].includes(current.mediaType), current.slug);
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

test("different kitchens have separate listed pages with disjoint photo sets", () => {
  const slugs = ["allentown-kitchen-layout-upgrade", "white-cabinet-open-plan-kitchen"];
  assertSeparateCollections(slugs, [2, 2]);
  for (const slug of slugs) {
    assert.ok(
      content.galleryCaseStudies.some((record) => record.slug === slug),
      `${slug}: missing gallery listing`,
    );
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
  for (const slug of ["bethlehem-bathroom-refresh", "ryan-bathroom-remodel", "allentown-kitchen-layout-upgrade"]) {
    const current = content.getCaseStudyBySlug(slug);
    assert.equal(current.beforeImages.length, 0, slug);
    assert.equal(current.afterImages.length, 0, slug);
  }
  const fireplace = content.getCaseStudyBySlug("allentown-fire-damage-interior-rebuild");
  assert.equal(fireplace.serviceSlug, "drywall-installation-repair");
  assert.equal(fireplace.featureInServiceListings, false);
  const duplicate = content.getCaseStudyBySlug("lehigh-valley-dormer-shutter-detail-refresh");
  assert.equal(duplicate.showInGallery, false);
  assert.equal(duplicate.sharedCollectionSlug, "lehigh-valley-full-exterior-refresh");
});

test("text-only water content is planning and cannot be promoted as a finished project", () => {
  const water = content.getCaseStudyBySlug("lehigh-water-damage-rebuild");
  assert.equal(water.mediaType, "planning");
  assert.equal(water.showInGallery, false);
  assert.equal(water.featureInServiceListings, false);
  assert.equal(photos(water).length, 0);
});

test("published reviews have traceable sources and no invented job, service or town links", () => {
  assert.equal(reviews.testimonials.length, 3);
  assert.equal(reviews.withheldTestimonials.length, 15);
  assert.equal(reviews.getFeaturedTestimonials().length, 3);
  assert.equal(reviews.getTestimonialsByLocation("allentown-pa").length, 0);
  assert.equal(reviews.getTestimonialsByService("bathroom-remodeling").length, 0);
  for (const review of reviews.testimonials) {
    assert.equal(reviews.isSourceCheckedTestimonial(review), true);
    assert.equal(review.verification.association, "company-only");
    assert.ok(review.verification.url.startsWith("https://www.angi.com/"));
    assert.equal(review.locationSlug, undefined);
    assert.equal(review.serviceSlug, undefined);
  }
});
