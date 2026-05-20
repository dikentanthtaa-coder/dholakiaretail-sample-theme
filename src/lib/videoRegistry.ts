/**
 * Site-wide video registry.
 *
 * One source of truth for every autoplay loop on the site, grouped by
 * the route that owns it. Used by:
 *
 *   - <VideoPrefetcher /> in the Layout: after the current route mounts
 *     and the browser goes idle, it fetches the videos of the *next-most-
 *     likely* routes in the background so the service worker can persist
 *     them. Subsequent navigations feel instant.
 *
 *   - Anywhere we need to know "is this URL one of ours?" for caching /
 *     telemetry decisions.
 *
 * Ordered roughly by editorial importance (lighter / smaller videos
 * before the 28 MB MAYAVE_4K, so the prefetcher gets fast wins first).
 */

export type VideoEntry = {
  url: string;
  /** Rough file weight in MB. Lets the prefetcher skip the giants on slow links. */
  approxMb: number;
};

export const VIDEOS_BY_ROUTE: Record<string, VideoEntry[]> = {
  "/": [
    { url: "/assets/videos/P01_S01_Hero_Video_idea_360.mp4", approxMb: 2.9 },
    { url: "/assets/videos/P01_S07_home_sustainability_teaser_optA_video.mp4", approxMb: 6.0 },
    { url: "/assets/videos/P01_S06_home_brand_film_optA_video.mp4", approxMb: 5.0 },
  ],
  "/portfolio/mayave": [
    { url: "/assets/videos/MAYAVE_4K.mp4", approxMb: 28 },
  ],
  "/craftsmanship": [
    { url: "/assets/videos/P05_S01_craftsmanship_hero_optA_video_1.mp4", approxMb: 14 },
  ],
  "/sustainability": [
    { url: "/assets/videos/P06_S03_sustainability_wider_group_context_optA_video.mp4", approxMb: 3.9 },
    { url: "/assets/videos/P01_S07_home_sustainability_teaser_optA_video.mp4", approxMb: 6.0 },
  ],
};

/** Which routes to prefetch FROM each starting route, in priority order. */
export const PREFETCH_FROM: Record<string, string[]> = {
  "/": ["/sustainability", "/craftsmanship", "/portfolio/mayave"],
  "/the-group": ["/", "/sustainability"],
  "/portfolio": ["/portfolio/mayave", "/craftsmanship"],
  "/portfolio/mayave": ["/craftsmanship", "/sustainability"],
  "/craftsmanship": ["/sustainability", "/"],
  "/sustainability": ["/craftsmanship", "/"],
  "/innovation": ["/sustainability", "/"],
  "/news": ["/blog", "/"],
  "/blog": ["/news", "/"],
  "/careers": ["/"],
  "/contact": ["/"],
};

/** Flat list of every known video URL — used for cache prewarming. */
export function allVideoUrls(): string[] {
  const set = new Set<string>();
  for (const entries of Object.values(VIDEOS_BY_ROUTE)) {
    for (const e of entries) set.add(e.url);
  }
  return [...set];
}

/** Videos to prefetch for a given source route. */
export function videosForRoute(pathname: string): VideoEntry[] {
  // Exact match first; fall back to "/" if a dynamic route isn't mapped.
  return VIDEOS_BY_ROUTE[pathname] ?? [];
}

export function nextRoutesToPrefetch(pathname: string): string[] {
  return PREFETCH_FROM[pathname] ?? ["/"];
}
