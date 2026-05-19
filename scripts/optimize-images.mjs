#!/usr/bin/env node
/**
 * Image optimization pipeline.
 *
 * For each PNG/JPG in public/assets, generate:
 *   - <name>.avif                  (q55, full size — universal default)
 *   - <name>.webp                  (q80, full size — universal fallback)
 *   - <name>-<w>.avif / .webp      (640, 1024, 1600 widths — responsive)
 *
 * Plus a manifest at src/lib/image-manifest.json with intrinsic w/h and
 * a 24 px blurred LQIP base64 so the runtime can:
 *   - reserve layout (eliminate CLS)
 *   - paint a blurred placeholder until the real image decodes
 *   - emit srcset / sizes so mobile downloads ~640w (often <20 KB) instead
 *     of the full 1600w (>100 KB)
 *
 * Idempotent: a derived file newer than its source is skipped.
 */
import { readdir, stat, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");

const TARGET_DIRS = ["assets/images", "assets/mayave", "assets/web"];
const SOURCE_EXT = new Set([".png", ".jpg", ".jpeg"]);

/** Responsive widths — emitted only when the source is wider than the breakpoint. */
const RESPONSIVE_WIDTHS = [640, 1024, 1600];

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

async function isFresh(src, dest) {
  try {
    const [a, b] = await Promise.all([stat(src), stat(dest)]);
    return a.mtimeMs <= b.mtimeMs;
  } catch {
    return false;
  }
}

async function optimizeOne(src) {
  const ext = path.extname(src);
  const base = src.slice(0, -ext.length);
  const img = sharp(src);
  const meta = await img.metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;

  const results = { width, height, ext: ext.slice(1) };

  // Full-size .webp + .avif
  const fullWebp = `${base}.webp`;
  const fullAvif = `${base}.avif`;
  if (!(await isFresh(src, fullWebp))) {
    await img
      .clone()
      .webp({ quality: 80, effort: 5, smartSubsample: true })
      .toFile(fullWebp);
  }
  if (!(await isFresh(src, fullAvif))) {
    await img.clone().avif({ quality: 55, effort: 5 }).toFile(fullAvif);
  }

  // Responsive widths in AVIF + WebP
  const widthsEmitted = [];
  for (const w of RESPONSIVE_WIDTHS) {
    if (w >= width) continue; // never upscale
    const avifPath = `${base}-${w}.avif`;
    const webpPath = `${base}-${w}.webp`;
    if (!(await isFresh(src, avifPath))) {
      await img
        .clone()
        .resize({ width: w })
        .avif({ quality: 50, effort: 5 })
        .toFile(avifPath);
    }
    if (!(await isFresh(src, webpPath))) {
      await img
        .clone()
        .resize({ width: w })
        .webp({ quality: 78, effort: 5, smartSubsample: true })
        .toFile(webpPath);
    }
    widthsEmitted.push(w);
  }
  results.widths = widthsEmitted;

  // 24 px LQIP — base64'd into the manifest
  const lqipBuffer = await img
    .clone()
    .resize({ width: 24, withoutEnlargement: true })
    .blur(1.2)
    .webp({ quality: 40 })
    .toBuffer();
  results.lqip = `data:image/webp;base64,${lqipBuffer.toString("base64")}`;

  // Stats
  const [origStat, webpStat, avifStat] = await Promise.all([
    stat(src),
    stat(fullWebp),
    stat(fullAvif),
  ]);
  results.size = {
    orig: origStat.size,
    webp: webpStat.size,
    avif: avifStat.size,
  };
  return results;
}

async function main() {
  const manifest = {};
  let processed = 0;
  let savedBytes = 0;

  for (const sub of TARGET_DIRS) {
    const dir = path.join(PUBLIC, sub);
    try {
      await stat(dir);
    } catch {
      continue;
    }
    for await (const file of walk(dir)) {
      const ext = path.extname(file).toLowerCase();
      if (!SOURCE_EXT.has(ext)) continue;
      const key = "/" + path.relative(PUBLIC, file).split(path.sep).join("/");
      try {
        const r = await optimizeOne(file);
        manifest[key] = {
          width: r.width,
          height: r.height,
          ext: r.ext,
          widths: r.widths,
          lqip: r.lqip,
        };
        const best = Math.min(r.size.webp, r.size.avif);
        savedBytes += Math.max(0, r.size.orig - best);
        processed += 1;
        process.stdout.write(
          `✓ ${key.padEnd(60)}  ${(r.size.orig / 1024).toFixed(0)}KB → avif ${(r.size.avif / 1024).toFixed(0)}KB / webp ${(r.size.webp / 1024).toFixed(0)}KB  [${r.widths.join(",") || "–"}]\n`
        );
      } catch (err) {
        console.error(`✗ ${key}: ${err.message}`);
      }
    }
  }

  const outDir = path.join(ROOT, "src", "lib");
  await mkdir(outDir, { recursive: true });
  await writeFile(
    path.join(outDir, "image-manifest.json"),
    JSON.stringify(manifest, null, 2)
  );
  await writeFile(
    path.join(__dirname, "image-manifest.json"),
    JSON.stringify(manifest, null, 2)
  );

  console.log("\n────────────────────────────────────────────");
  console.log(`Optimised ${processed} images (with responsive widths).`);
  console.log(`Approx. saved: ${(savedBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Manifest written to src/lib/image-manifest.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
