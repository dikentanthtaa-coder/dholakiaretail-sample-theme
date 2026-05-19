/**
 * Image manifest produced by `scripts/optimize-images.mjs`.
 *
 * Keys are absolute public-root paths (e.g. "/assets/images/hero.png").
 * For every entry we have:
 *   - width / height — intrinsic pixel size (lets <img> reserve space → no CLS)
 *   - lqip          — base64 data-uri of a 24px blurred WebP placeholder
 *   - ext           — original extension ("png" | "jpg" | "jpeg")
 *   - widths        — responsive widths emitted (subset of [640, 1024, 1600])
 *
 * The .webp/.avif (full-size) and -<w>.webp / -<w>.avif (responsive)
 * variants live alongside the original under the same basename.
 */
import manifest from "./image-manifest.json";

export type OptimizedImage = {
  width: number;
  height: number;
  ext: string;
  lqip: string;
  widths?: number[];
};

const map = manifest as Record<string, OptimizedImage>;

export function getOptimized(src: string | undefined | null): OptimizedImage | null {
  if (!src) return null;
  return map[src] ?? null;
}

export type ModernSources = {
  avif: string;
  webp: string;
  /** Full-resolution original (used for `<img src>` fallback). */
  original: string;
  /** srcset entries for AVIF responsive widths, e.g. "/foo-640.avif 640w, …". */
  avifSrcSet?: string;
  /** srcset entries for WebP responsive widths. */
  webpSrcSet?: string;
};

/**
 * Given a source like "/assets/images/foo.png" returns alternative source URLs
 * for the modern formats produced by the optimizer, plus responsive srcset
 * strings if the manifest reports we generated widths.
 */
export function deriveModernSources(src: string): ModernSources | null {
  const m = src.match(/^(.*)\.(png|jpe?g)$/i);
  if (!m) return null;
  const stem = m[1];
  const meta = getOptimized(src);
  const widths = meta?.widths ?? [];

  const avif = `${stem}.avif`;
  const webp = `${stem}.webp`;

  let avifSrcSet: string | undefined;
  let webpSrcSet: string | undefined;
  if (widths.length) {
    const fullW = meta?.width ?? 0;
    const avifParts = widths.map((w) => `${stem}-${w}.avif ${w}w`);
    const webpParts = widths.map((w) => `${stem}-${w}.webp ${w}w`);
    // Append the full-resolution variant so very large viewports still get
    // the highest quality.
    if (fullW) {
      avifParts.push(`${avif} ${fullW}w`);
      webpParts.push(`${webp} ${fullW}w`);
    }
    avifSrcSet = avifParts.join(", ");
    webpSrcSet = webpParts.join(", ");
  }

  return {
    avif,
    webp,
    original: src,
    avifSrcSet,
    webpSrcSet,
  };
}
