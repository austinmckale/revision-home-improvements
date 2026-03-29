/**
 * One-off: convert HEIC from extracted zip folders to JPEG and sort into before/process/after/marketing.
 * Run: node scripts/ingest-zip-projects.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import convert from "heic-convert";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsRoot = path.join(__dirname, "..", "public", "images", "projects");

function bucketFor(relPath, projectSlug) {
  const base = path.basename(relPath).toLowerCase();
  const full = relPath.toLowerCase();

  if (base.endsWith(".png") && (full.includes("instagram") || full.includes("before and after instagram"))) {
    return "marketing";
  }
  if (base.includes("diagram") || base.includes("layout")) return "marketing";

  if (projectSlug === "ryan-kitchen") {
    if (base.includes("before")) return "before";
    return "after";
  }

  if (projectSlug === "ryan-bathroom") {
    // Already extracted as JPG in before/after
    return null;
  }

  if (projectSlug === "fire-damage-documentation") {
    return "after";
  }

  const processHints = ["process", "in progress", "progress", "install", "counter top"];
  const beforeHints = ["before"];
  const afterHints = ["after", "done", "finished", "completed"];

  if (processHints.some((h) => base.includes(h))) return "process";
  if (beforeHints.some((h) => base.includes(h)) && !base.includes("before and after")) return "before";
  if (afterHints.some((h) => base.includes(h))) return "after";

  // ryan-bedroom: default non-before/process → after
  if (projectSlug === "ryan-bedroom") return "after";
  if (projectSlug === "blue-kitchen-cabinet-counters") return "after";

  return "after";
}

async function walkFiles(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name === "_staging") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walkFiles(p)));
    else out.push(p);
  }
  return out;
}

function safeName(name) {
  return name
    .toLowerCase()
    .replace(/\.(heic|heif)$/i, ".jpg")
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function convertHeicToJpeg(srcPath, destPath) {
  const input = await fs.readFile(srcPath);
  // Google exports sometimes mislabel JPEG as .heic
  if (input.length >= 3 && input[0] === 0xff && input[1] === 0xd8 && input[2] === 0xff) {
    await sharp(input).jpeg({ quality: 88 }).toFile(destPath);
    return;
  }
  const output = await convert({ buffer: input, format: "JPEG", quality: 0.88 });
  await fs.writeFile(destPath, Buffer.from(output));
}

async function ingestProject(slug) {
  const root = path.join(projectsRoot, slug);
  let stat;
  try {
    stat = await fs.stat(root);
  } catch {
    return;
  }
  if (!stat.isDirectory()) return;

  const marker = path.join(root, ".ingest-complete");
  if (process.env.FORCE_INGEST !== "1") {
    try {
      await fs.access(marker);
      console.log(`Skip ${slug}: .ingest-complete present (set FORCE_INGEST=1 to re-run).`);
      return;
    } catch {
      /* continue */
    }
  }

  const files = await walkFiles(root);
  const heic = files.filter((f) => /\.heic$/i.test(f));
  const png = files.filter((f) => /\.png$/i.test(f));
  const jpeg = files.filter((f) => /\.jpe?g$/i.test(f));

  if (heic.length === 0 && png.length === 0 && jpeg.length === 0) {
    console.log(`Skip ${slug}: no HEIC/PNG/JPEG to ingest (already organized or empty).`);
    return;
  }

  const staging = path.join(projectsRoot, slug, "_staging");
  await fs.rm(staging, { recursive: true, force: true });
  await fs.mkdir(path.join(staging, "before"), { recursive: true });
  await fs.mkdir(path.join(staging, "process"), { recursive: true });
  await fs.mkdir(path.join(staging, "after"), { recursive: true });
  await fs.mkdir(path.join(staging, "marketing"), { recursive: true });

  let seq = { before: 0, process: 0, after: 0, marketing: 0 };

  for (const file of [...heic, ...png, ...jpeg]) {
    const rel = path.relative(root, file);
    const bucket = bucketFor(rel, slug);
    if (!bucket) continue;
    seq[bucket] += 1;
    const lower = file.toLowerCase();
    const isPng = lower.endsWith(".png");
    const isJpeg = lower.endsWith(".jpg") || lower.endsWith(".jpeg");
    const outName = `${String(seq[bucket]).padStart(2, "0")}-${safeName(path.basename(file))}`;
    const dest = path.join(staging, bucket, outName);

    if (isPng || isJpeg) {
      await fs.copyFile(file, dest);
    } else {
      await convertHeicToJpeg(file, dest);
    }
    console.log(`${slug}: ${rel} → ${bucket}/${path.basename(dest)}`);
  }

  // Remove everything under slug except _staging, then move staging children up
  const keep = new Set(["_staging"]);
  for (const e of await fs.readdir(root)) {
    if (keep.has(e)) continue;
    await fs.rm(path.join(root, e), { recursive: true, force: true });
  }

  for (const sub of ["before", "process", "after", "marketing"]) {
    const from = path.join(staging, sub);
    const to = path.join(root, sub);
    const hasFiles = (await fs.readdir(from).catch(() => [])).length > 0;
    if (hasFiles) {
      await fs.rename(from, to);
    }
  }
  await fs.rm(staging, { recursive: true, force: true });
  await fs.writeFile(marker, `${new Date().toISOString()}\n`, "utf8");
}

const projects = [
  "ryan-bedroom",
  "blue-kitchen-cabinet-counters",
  "ryan-kitchen",
  "beige-bathroom-before-after",
  "fire-damage-documentation",
];

for (const slug of projects) {
  console.log(`\n--- ${slug} ---`);
  await ingestProject(slug);
}
console.log("\nDone.");
