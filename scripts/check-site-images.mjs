/** Verify local production imagery: npm run check:images -- http://127.0.0.1:3108 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import sharp from "sharp";

const base = new URL(process.argv[2] || "http://127.0.0.1:3108");
if (!["localhost", "127.0.0.1", "[::1]"].includes(base.hostname)) throw new Error("Use a local production preview.");
const errors = [];
const sourceReferences = new Set();
const deliveredImages = new Map();
const pages = [];
const rasterFiles = [];
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"');
const attributes = (tag) =>
  Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], decode(m[2])]));
const check = (ok, message) => {
  if (!ok) errors.push(message);
};
function walk(folder) {
  return readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    const path = join(folder, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}
async function pool(items, fn, concurrency = 4) {
  let next = 0;
  await Promise.all(
    Array.from({ length: concurrency }, async () => {
      while (next < items.length) {
        const item = items[next++];
        await fn(item);
      }
    }),
  );
}
async function get(path) {
  return fetch(new URL(path, base), { redirect: "manual", signal: AbortSignal.timeout(30000) });
}

for (const file of walk("src").filter((p) => /\.(tsx?|jsx?)$/.test(p))) {
  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(/\/images\/[^\s"'`<>${}]+\.(?:png|jpe?g|webp|avif|gif|svg|ico)(?=["'`])/gi)) {
    sourceReferences.add(match[0]);
    check(existsSync(join("public", match[0])), `${relative(process.cwd(), file)}: missing asset ${match[0]}`);
  }
}
await pool(
  walk("public/images").filter((p) => /\.(png|jpe?g|webp|avif|gif)$/i.test(p)),
  async (file) => {
    try {
      const metadata = await sharp(file).metadata();
      check(metadata.width > 0 && metadata.height > 0, `${file}: missing dimensions`);
      await sharp(file).stats(); // Decode full image pixels, not just the header.
      rasterFiles.push({
        path: relative("public", file).replaceAll("\\", "/"),
        width: metadata.width,
        height: metadata.height,
      });
    } catch (error) {
      errors.push(`${file}: image decode failed (${error.message})`);
    }
  },
);
console.log(
  `Image files: ${sourceReferences.size} distinct literal references, ${rasterFiles.length} rasters decoded.`,
);

const sitemap = await get("/sitemap.xml");
check(sitemap.status === 200, `Sitemap returned ${sitemap.status}`);
const routes = new Set(
  [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(decode(m[1])).pathname),
);
for (const path of ["/landing/bathroom-remodeling", "/landing/bathroom-remodeling/quote"]) routes.add(path);
for (const service of [
  "kitchen-remodeling",
  "bathroom-remodeling",
  "basement-finishing",
  "paver-installation",
  "exterior-remodeling",
  "flooring-installation",
  "drywall-installation-repair",
  "fire-damage-restoration",
  "water-damage-restoration",
]) {
  routes.add(`/projects?service=${service}`);
}
await pool([...routes], async (path) => {
  try {
    const response = await get(path);
    check(response.status === 200, `${path}: returned ${response.status}`);
    const html = await response.text();
    const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0] || "";
    const images = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => attributes(m[0]));
    const contentImages = [...main.matchAll(/<img\b[^>]*>/g)].map((m) => attributes(m[0]));
    const needsPhoto =
      /^\/services\//.test(path) ||
      /^\/(allentown|bethlehem|reading|wyomissing|berks-county|lehigh-valley)-pa$/.test(path) ||
      (/^\/projects\//.test(path) && path !== "/projects/lehigh-water-damage-rebuild");
    if (needsPhoto) check(contentImages.length > 0, `${path}: expected content imagery, found none`);
    const water = path === "/services/water-damage-restoration" || /^\/[^/]+-pa\/water-damage-restoration$/.test(path);
    if (water) {
      check(
        contentImages.some((i) =>
          decodeURIComponent(i.src || "").includes("/images/service-illustrations/water-damage-interior.png"),
        ),
        `${path}: missing water-damage hero`,
      );
      check(
        contentImages.some((i) => i.alt?.startsWith("AI-generated illustration of a water-damaged room")),
        `${path}: missing water-damage illustration alt text`,
      );
    }
    check(
      !/Two kitchens\. Separate photo groups\.|supplied photo|authenticated shared job/i.test(main),
      `${path}: internal audit wording remains in customer copy`,
    );
    for (const image of images) {
      check(Boolean(image.src), `${path}: image has empty src`);
      check("alt" in image, `${path}: image has no alt attribute`);
      if (!image.src || image.src.startsWith("data:")) continue;
      const url = new URL(image.src, base);
      if (url.origin !== base.origin) continue; // Do not fetch third-party tracking or authenticated feeds.
      let original = url.pathname;
      if (original === "/_next/image") original = url.searchParams.get("url") || "";
      if (original.startsWith("/images/"))
        check(existsSync(join("public", original)), `${path}: missing rendered original ${original}`);
      if (!deliveredImages.has(url.href)) deliveredImages.set(url.href, path);
    }
    pages.push({ path, status: response.status, contentImages: contentImages.length, waterHero: water });
  } catch (error) {
    errors.push(`${path}: page check failed (${error.message})`);
  }
});
console.log(`Image markup: ${pages.length} pages checked, ${deliveredImages.size} distinct local image URLs.`);
await pool([...deliveredImages], async ([url, page]) => {
  try {
    const response = await get(url);
    check(response.status === 200, `${page}: image delivery ${response.status} ${url}`);
    check((response.headers.get("content-type") || "").startsWith("image/"), `${page}: non-image response ${url}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    check(bytes.length > 0, `${page}: empty image response ${url}`);
    await sharp(bytes).metadata();
  } catch (error) {
    errors.push(`${page}: image delivery failed ${url} (${error.message})`);
  }
});
const result = {
  pages: pages.length,
  sourceReferences: sourceReferences.size,
  decodedRasterFiles: rasterFiles.length,
  deliveredImageUrls: deliveredImages.size,
  errors,
  routes: pages.sort((a, b) => a.path.localeCompare(b.path)),
  rasterFiles: rasterFiles.sort((a, b) => a.path.localeCompare(b.path)),
};
if (process.env.IMAGE_AUDIT_OUTPUT)
  writeFileSync(process.env.IMAGE_AUDIT_OUTPUT, JSON.stringify(result, null, 2) + "\n");
console.log(
  `Image audit: ${pages.length} pages, ${rasterFiles.length} decoded rasters, ${deliveredImages.size} delivered image URLs, ${errors.length} errors.`,
);
for (const error of errors) console.error(`- ${error}`);
if (errors.length) process.exitCode = 1;
