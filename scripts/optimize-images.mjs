#!/usr/bin/env node
/**
 * Image optimization pipeline.
 *
 * For each PNG/JPG in public/assets, generate:
 *   - <name>.avif     (q60, primary preferred format)
 *   - <name>.webp     (q80, broad-fallback modern format)
 *   - <name>-blur.webp (24px wide blur placeholder, base64 LQIP)
 *
 * Reports a JSON manifest at scripts/image-manifest.json so the runtime can:
 *   - decide if a <picture><source type="image/avif"/></picture> is available
 *   - render a blurred LQIP while the real image streams in
 *
 * Idempotent: skip work if the derived file is newer than the source.
 */
import { readdir, stat, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");

const TARGET_DIRS = [
  "assets/images",
  "assets/mayave",
  "assets/web",
];

const SOURCE_EXT = new Set([".png", ".jpg", ".jpeg"]);

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

async function isNewer(src, dest) {
  try {
    const [a, b] = await Promise.all([stat(src), stat(dest)]);
    return a.mtimeMs <= b.mtimeMs;
  } catch {
    return false;
  }
}

async function optimizeOne(src) {
  const rel = path.relative(PUBLIC, src);
  const ext = path.extname(src);
  const base = src.slice(0, -ext.length);
  const webp = base + ".webp";
  const avif = base + ".avif";

  const img = sharp(src);
  const meta = await img.metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;

  const results = { rel, width, height, ext: ext.slice(1) };

  if (!(await isNewer(src, webp))) {
    await img
      .clone()
      .webp({ quality: 80, effort: 5, smartSubsample: true })
      .toFile(webp);
  }
  results.webp = path.basename(webp);

  if (!(await isNewer(src, avif))) {
    await img
      .clone()
      .avif({ quality: 55, effort: 5 })
      .toFile(avif);
  }
  results.avif = path.basename(avif);

  // Generate a tiny base64 LQIP placeholder (24px wide, blurred webp).
  const lqipBuffer = await img
    .clone()
    .resize({ width: 24, withoutEnlargement: true })
    .blur(1.2)
    .webp({ quality: 40 })
    .toBuffer();
  results.lqip = `data:image/webp;base64,${lqipBuffer.toString("base64")}`;

  // Stats
  const origStat = await stat(src);
  const webpStat = await stat(webp);
  const avifStat = await stat(avif);
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
          lqip: r.lqip,
        };
        const best = Math.min(r.size.webp, r.size.avif);
        const saving = r.size.orig - best;
        savedBytes += Math.max(0, saving);
        processed += 1;
        process.stdout.write(
          `✓ ${key.padEnd(60)}  ${(r.size.orig / 1024).toFixed(0)}KB → avif ${(r.size.avif / 1024).toFixed(0)}KB / webp ${(r.size.webp / 1024).toFixed(0)}KB\n`
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
  console.log(`Optimised ${processed} images.`);
  console.log(`Approx. saved: ${(savedBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Manifest written to src/lib/image-manifest.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
