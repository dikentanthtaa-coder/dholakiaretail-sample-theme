/**
 * Image manifest produced by `scripts/optimize-images.mjs`.
 *
 * Keys are absolute public-root paths (e.g. "/assets/images/hero.png").
 * For every entry we have:
 *   - width / height — intrinsic pixel size (lets <img> reserve space → no CLS)
 *   - lqip          — base64 data-uri of a 24px blurred WebP placeholder
 *   - ext           — original extension ("png" | "jpg" | "jpeg")
 *
 * The matching `.webp` and `.avif` files live alongside the original under the
 * same basename, so we don't need to store those paths explicitly.
 */
import manifest from "./image-manifest.json";

export type OptimizedImage = {
  width: number;
  height: number;
  ext: string;
  lqip: string;
};

const map = manifest as Record<string, OptimizedImage>;

export function getOptimized(src: string | undefined | null): OptimizedImage | null {
  if (!src) return null;
  return map[src] ?? null;
}

/**
 * Given a source like "/assets/images/foo.png" returns alternative source URLs
 * for the modern formats produced by the optimizer.
 */
export function deriveModernSources(src: string): { avif: string; webp: string; original: string } | null {
  const m = src.match(/^(.*)\.(png|jpe?g)$/i);
  if (!m) return null;
  return {
    avif: `${m[1]}.avif`,
    webp: `${m[1]}.webp`,
    original: src,
  };
}
