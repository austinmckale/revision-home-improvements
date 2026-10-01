/** Crawl a running local production build: npm run check:rendered-seo -- http://127.0.0.1:3107 */
import { writeFileSync } from "node:fs";

const base = new URL(process.argv[2] || "http://127.0.0.1:3107");
if (!["localhost", "127.0.0.1", "[::1]"].includes(base.hostname)) {
  throw new Error("Run this audit against a local build, not the live website.");
}
const productionOrigin = "https://www.rhipros.com";
const errors = [];
const pages = [];
const internalTargets = new Map();
const titles = new Map();
const decode = (value) =>
  value.replace(
    /&(?:amp|quot|apos|lt|gt|#39|#x27);/g,
    (entity) =>
      ({
        "&amp;": "&",
        "&quot;": '"',
        "&apos;": "'",
        "&#39;": "'",
        "&#x27;": "'",
        "&lt;": "<",
        "&gt;": ">",
      })[entity],
  );
function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], decode(m[2])]));
}
async function get(path) {
  return fetch(new URL(path, base), { redirect: "manual", signal: AbortSignal.timeout(30000) });
}
function check(condition, message) {
  if (!condition) errors.push(message);
}
function schemaNodes(value) {
  if (Array.isArray(value)) return value.flatMap(schemaNodes);
  if (!value || typeof value !== "object") return [];
  return [value, ...Object.values(value).flatMap(schemaNodes)];
}

const sitemapResponse = await get("/sitemap.xml");
check(sitemapResponse.status === 200, `Sitemap status: ${sitemapResponse.status}`);
const sitemapXml = await sitemapResponse.text();
const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]));
check(urls.length > 0, "Sitemap contains no URLs.");
check(new Set(urls).size === urls.length, "Sitemap contains duplicate URLs.");
for (const path of [
  "/services/whole-home-remodeling",
  "/projects/hamburg-laundry-bathroom-remodel",
  "/projects/berks-county-ranch-exterior-refresh",
]) {
  check(urls.includes(productionOrigin + path), `Missing required sitemap route: ${path}`);
}

for (const url of urls) {
  const target = new URL(url);
  check(target.origin === productionOrigin, `Noncanonical sitemap origin: ${url}`);
  const path = target.pathname;
  const response = await get(path);
  check(response.status === 200, `${path}: expected 200, got ${response.status}`);
  const html = await response.text();
  const documentTitles = [...html.matchAll(/<title>([\s\S]*?)<\/title>/g)].map((m) => decode(m[1]));
  const title = documentTitles[0] || "";
  check(documentTitles.length === 1, `${path}: expected one document title.`);
  check((title.match(/RHI Pros/g) || []).length === 1, `${path}: brand must appear exactly once in title: ${title}`);
  check(!titles.has(title), `${path}: duplicate title also used by ${titles.get(title)}: ${title}`);
  titles.set(title, path);
  const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map((m) => attributes(m[0]));
  check(
    metas.some((m) => m.name === "description" && m.content?.trim()),
    `${path}: missing description.`,
  );
  check(
    !metas.some((m) => /^(robots|googlebot)$/.test(m.name) && /noindex/i.test(m.content)),
    `${path}: sitemap route is noindex.`,
  );
  const canonicals = [...html.matchAll(/<link\b[^>]*>/g)]
    .map((m) => attributes(m[0]))
    .filter((a) => a.rel === "canonical");
  check(
    canonicals.length === 1 && new URL(canonicals[0].href, productionOrigin).href === target.href,
    `${path}: incorrect or duplicate canonical.`,
  );
  check((html.match(/<h1\b/g) || []).length === 1, `${path}: expected one h1.`);

  const links = [...html.matchAll(/<a\b[^>]*>/g)].map((m) => attributes(m[0]));
  const hrefs = [];
  for (const link of links) {
    if (!link.href || /^(tel:|mailto:)/.test(link.href)) continue;
    check(!link.href.startsWith("//"), `${path}: protocol-relative or empty-area internal link ${link.href}`);
    if (link.href.startsWith("#")) {
      const id = decodeURIComponent(link.href.slice(1));
      if (id) check(html.includes(`id="${id}"`), `${path}: missing anchor target ${link.href}`);
      continue;
    }
    const linked = new URL(link.href, url);
    if (!/^(www\.)?rhipros\.com$/.test(linked.hostname)) continue;
    check(linked.origin === productionOrigin, `${path}: noncanonical internal link ${link.href}`);
    check(
      link.href.startsWith("/") || link.href.startsWith(productionOrigin),
      `${path}: relative internal URL ${link.href}`,
    );
    hrefs.push(linked.pathname);
    internalTargets.set(linked.pathname, [...(internalTargets.get(linked.pathname) || []), path]);
    if (linked.pathname === path && linked.hash) {
      const id = decodeURIComponent(linked.hash.slice(1));
      check(html.includes(`id="${id}"`), `${path}: missing anchor target ${linked.hash}`);
    }
  }

  const structured = [];
  for (const match of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      structured.push(...schemaNodes(JSON.parse(match[1])));
    } catch {
      errors.push(`${path}: invalid JSON-LD.`);
    }
  }
  const businesses = structured.filter((n) =>
    /GeneralContractor|HomeAndConstructionBusiness|LocalBusiness/.test(n["@type"] || ""),
  );
  check(businesses.length === 1, `${path}: expected a single business entity, found ${businesses.length}.`);
  check(businesses[0]?.["@id"] === `${productionOrigin}/#business`, `${path}: business entity ID missing.`);
  check(!businesses[0]?.address, `${path}: an unverified market label must not be a physical business address.`);
  check(
    businesses[0]?.logo === `${productionOrigin}/images/brand/chat-logo.png`,
    `${path}: business schema must use the reviewed RHI logo.`,
  );
  check(
    !structured.some((n) => n.aggregateRating || n["@type"] === "Review"),
    `${path}: review/rating schema needs verified source support.`,
  );

  if (/^\/(allentown|bethlehem|reading|wyomissing|berks-county|lehigh-valley)-pa$/.test(path)) {
    check(hrefs.includes(`${path}/water-damage-restoration`), `${path}: missing local water-damage link.`);
  }
  if (path === "/service-areas")
    check(hrefs.includes("/services/water-damage-restoration"), "Service Areas: missing water-damage link.");
  if (path === "/request-a-quote") {
    check((html.match(/>Browse Services<\/a>/g) || []).length === 1, "Quote page: expected one Browse Services link.");
    const form = html.match(/<form\b[^>]*id="quote-form-section"[\s\S]*?<\/form>/)?.[0] || "";
    const formAttributes = attributes(form.split(">")[0]);
    check(
      formAttributes.method === "post" && formAttributes.action === "/api/quote",
      "Quote page: native submission must not place contact details into a GET URL.",
    );
    const controls = [...form.matchAll(/<(?:input|select|button)\b[^>]*>/g)].map((m) => m[0]);
    for (const name of ["name", "phone", "email", "service"]) {
      const control = controls.find((tag) => attributes(tag).name === name);
      check(control && /\bdisabled(?:="")?(?:\s|\/?>)/.test(control), `Quote page: ${name} must wait for hydration.`);
    }
    check(
      controls.some((tag) => attributes(tag).type === "submit" && /\bdisabled(?:="")?(?:\s|\/?>)/.test(tag)),
      "Quote page: server HTML must not expose an active submit button before its handler is ready.",
    );
    check(
      form.includes("<noscript>") && form.includes("tel:+14847069229"),
      "Quote page: no-JavaScript phone fallback missing.",
    );
  }
  const description = metas.find((m) => m.name === "description")?.content;
  // Project document titles also identify the collection/reference type;
  // their shorter sharing titles are checked against CreativeWork below.
  if (!path.startsWith("/projects/")) {
    check(
      metas.find((m) => m.property === "og:title")?.content === title &&
        metas.find((m) => m.name === "twitter:title")?.content === title,
      `${path}: sharing title must match this page's title.`,
    );
  }
  check(
    metas.find((m) => m.property === "og:description")?.content === description &&
      metas.find((m) => m.name === "twitter:description")?.content === description,
    `${path}: sharing description must match this page.`,
  );
  check(
    new URL(metas.find((m) => m.property === "og:url")?.content || "/missing-og-url", productionOrigin).href ===
      target.href,
    `${path}: sharing URL must match this page.`,
  );
  check(
    metas.find((m) => m.property === "og:image")?.content === metas.find((m) => m.name === "twitter:image")?.content,
    `${path}: Open Graph and Twitter must use the same reviewed image.`,
  );
  if (
    [
      "/about",
      "/request-a-quote",
      "/insurance-claims",
      "/fire-water-damage-restoration",
      "/financing",
      "/financing-terms",
      "/our-process",
      "/privacy",
      "/projects",
      "/licenses-and-insurance",
      "/service-areas",
      "/services",
      "/warranty",
    ].includes(path) ||
    /^\/(allentown|bethlehem|reading|wyomissing|berks-county|lehigh-valley)-pa$/.test(path)
  ) {
    check(
      metas.find((m) => m.property === "og:image")?.content === `${productionOrigin}/images/brand/rhi-pros-share.png`,
      `${path}: information pages must use the neutral RHI sharing image.`,
    );
  }
  if (/^\/projects\//.test(path)) {
    check(
      !html.includes("/images/service-illustrations/"),
      `${path}: generic service imagery must not appear in a case study.`,
    );
    const collections = structured.filter((n) => n["@type"] === "CreativeWork");
    check(collections.length === 1, `${path}: expected one photo collection/planning schema.`);
    check(
      collections[0]?.publisher?.["@id"] === `${productionOrigin}/#business` && !collections[0]?.provider,
      `${path}: collection schema must identify the publisher without asserting job provenance.`,
    );
    check(!/Case Study/.test(title), `${path}: unsupported case-study metadata.`);
    const shareTitle = `${collections[0]?.name} | RHI Pros`;
    check(
      metas.find((m) => m.property === "og:title")?.content === shareTitle &&
        metas.find((m) => m.name === "twitter:title")?.content === shareTitle,
      `${path}: sharing titles must identify this collection.`,
    );
    check(
      metas.find((m) => m.property === "og:description")?.content === collections[0]?.description &&
        metas.find((m) => m.name === "twitter:description")?.content === collections[0]?.description,
      `${path}: sharing descriptions must match this collection.`,
    );
    check(metas.find((m) => m.property === "og:url")?.content === url, `${path}: incorrect sharing URL.`);
    check(
      !metas.some((m) => m.property === "og:image" && m.content?.includes("/service-illustrations/")),
      `${path}: generic generated imagery must not be a collection's sharing image.`,
    );
  }
  if (/^\/services\/(kitchen-remodeling|bathroom-remodeling|basement-finishing)$/.test(path)) {
    const photoSection = html.split('id="project-photos"')[1]?.split("</section>")[0] || "";
    check(photoSection.includes("<img"), `${path}: curated photo gallery is empty.`);
    check(!photoSection.includes("After photos for this project."), `${path}: empty comparison fallback rendered.`);
  }
  if (path === "/projects/allentown-kitchen-layout-upgrade") {
    check(html.includes("White cabinetry &amp; open-plan living"), `${path}: mixed kitchens must remain separate.`);
    check(!html.includes("The transformation"), `${path}: unsupported kitchen transformation claim.`);
  }
  if (/^\/projects\/(allentown-commercial-bathroom-renovation|reading-commercial-bar-window-upgrade)$/.test(path)) {
    check(!html.includes("We serve homeowners across"), `${path}: residential-only project CTA.`);
  }
  pages.push({
    path,
    status: response.status,
    title,
    canonical: canonicals[0]?.href,
    internalLinks: new Set(hrefs).size,
  });
}

const sitemapPaths = new Set(urls.map((url) => new URL(url).pathname));
for (const [path, sources] of internalTargets) {
  if (sitemapPaths.has(path)) continue;
  const response = await get(path);
  check(
    response.status >= 200 && response.status < 400,
    `Internal target ${path}: ${response.status}; linked from ${sources.slice(0, 3).join(", ")}`,
  );
  if (response.status >= 300 && response.status < 400) {
    const destination = new URL(response.headers.get("location"), base);
    if (destination.origin === base.origin) {
      const redirected = await get(destination.pathname);
      check(redirected.status === 200, `${path}: redirect target ${destination.pathname} did not return 200.`);
    }
  }
  await response.body?.cancel();
}
const robots = await get("/robots.txt");
check(robots.status === 200, `Robots status: ${robots.status}`);
check((await robots.text()).includes(`Sitemap: ${productionOrigin}/sitemap.xml`), "Robots sitemap URL is incorrect.");

const result = {
  routes: pages.length,
  projectRoutes: pages.filter((p) => p.path.startsWith("/projects/")).length,
  internalTargets: internalTargets.size,
  errors,
  pages,
};
if (process.env.SEO_AUDIT_OUTPUT) writeFileSync(process.env.SEO_AUDIT_OUTPUT, JSON.stringify(result, null, 2) + "\n");
console.log(
  `Rendered SEO audit: ${pages.length} sitemap routes, ${result.projectRoutes} project pages, ${internalTargets.size} internal targets, ${errors.length} errors.`,
);
for (const error of errors) console.error(`- ${error}`);
if (errors.length) process.exitCode = 1;
