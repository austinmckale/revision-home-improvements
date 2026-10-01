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

test("every original route receives reviewed public content without unsupported job assertions", () => {
  assert.equal(content.caseStudies.length, inventory.projects.length);
  for (const original of inventory.projects) {
    const slug = original.route.split("/").pop();
    const current = content.getCaseStudyBySlug(slug);
    assert.ok(current, `Missing preserved route: ${slug}`);
    assert.ok(evidence.projectEvidenceOverrides[slug]);
    assert.equal(current.timeline, "");
    assert.equal(current.locationSlug, "");
    assert.equal(current.testimonial, undefined);
    assert.equal(current.challenge, "");
    assert.equal(current.solution, "");
    assert.equal(current.results.length, 0);
    assert.ok(["photos", "planning"].includes(current.mediaType));
  }
});

test("all original photos remain referenced in their own route and unchanged on disk", () => {
  const checked = new Set();
  for (const original of inventory.projects) {
    const current = content.getCaseStudyBySlug(original.route.split("/").pop());
    const paths = new Set(photos(current).map((image) => image.src));
    for (const image of original.images) {
      assert.ok(paths.has(image.src), `Photo lost from ${original.route}: ${image.src}`);
      if (checked.has(image.src)) continue;
      const file = new URL(`../public${image.src}`, import.meta.url);
      assert.ok(existsSync(file), `Missing asset: ${image.src}`);
      assert.equal(createHash("sha256").update(readFileSync(file)).digest("hex"), image.sha256, image.src);
      checked.add(image.src);
    }
  }
  assert.equal(checked.size, 103);
});

test("mixed kitchen and field documentation stay in separate named visual groups", () => {
  const kitchen = content.getCaseStudyBySlug("allentown-kitchen-layout-upgrade");
  assert.equal(kitchen.images.length, 2);
  assert.equal(kitchen.photoGroups.length, 1);
  assert.equal(kitchen.photoGroups[0].images.length, 2);
  assert.equal(kitchen.featureInServiceListings, false);
  const field = content.getCaseStudyBySlug("lehigh-valley-fire-damage-documentation");
  assert.equal(field.images.length, 27);
  assert.equal(field.photoGroups[0].images.length, 8);
  assert.equal(field.photoGroups[1].images.length, 3);
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
