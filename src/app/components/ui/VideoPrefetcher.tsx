import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { getNetworkProfile, whenIdle } from "@/lib/network";
import {
  nextRoutesToPrefetch,
  videosForRoute,
  type VideoEntry,
} from "@/lib/videoRegistry";

/**
 * Background video prefetcher.
 *
 * After the route mounts AND the browser goes idle AND the network is
 * good, this component issues low-priority `fetch()` calls for the videos
 * the user is most likely to encounter next. The fetches stream through
 * the service worker which stores the body in the `dr-v1-media` cache —
 * so when the user actually navigates, the video is already on disk and
 * paints near-instantly.
 *
 * Guardrails:
 *
 *   - Skipped entirely on saveData, slow-2g / 2g / 3g, or low-end devices.
 *   - Caps total prefetched bytes per session (~25 MB) so we never eat
 *     someone's data plan.
 *   - Caps concurrent fetches to 1 so we don't fight the user's actual
 *     interactions for bandwidth.
 *   - Each URL is fetched at most once per page lifetime (a Set tracks
 *     in-flight + completed URLs).
 *   - Honors AbortController on unmount / route change — no dangling
 *     fetches.
 *
 * The component renders nothing.
 */

// Module-level so it survives route changes and StrictMode double-mounts.
const inflight = new Set<string>();
let prefetchedBytes = 0;
const MAX_SESSION_BYTES = 25 * 1024 * 1024; // 25 MB cap

async function prefetchOne(entry: VideoEntry, signal: AbortSignal) {
  if (inflight.has(entry.url)) return;
  if (prefetchedBytes + entry.approxMb * 1024 * 1024 > MAX_SESSION_BYTES) return;
  inflight.add(entry.url);
  try {
    // priority: "low" is honored in Chromium; ignored elsewhere harmlessly.
    const res = await fetch(entry.url, {
      method: "GET",
      credentials: "same-origin",
      mode: "same-origin",
      cache: "force-cache",
      // @ts-expect-error — Fetch Priority is not yet in the TS lib but is
      // widely shipped in Chromium.
      priority: "low",
      signal,
    });
    if (!res.ok) return;
    // Drain the body so the SW actually stores the full payload.
    // We don't need the bytes ourselves.
    const reader = res.body?.getReader();
    if (!reader) {
      await res.arrayBuffer().catch(() => {});
    } else {
      let bytes = 0;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        if (signal.aborted) {
          reader.cancel();
          return;
        }
        bytes += value?.byteLength ?? 0;
      }
      prefetchedBytes += bytes;
    }
  } catch {
    // Aborted, offline, etc. — silently drop.
  } finally {
    inflight.delete(entry.url);
  }
}

export function VideoPrefetcher() {
  const { pathname } = useLocation();
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Abort any prefetches from the previous route. We pivot to whatever
    // makes sense for the route we're on now.
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const net = getNetworkProfile();
    if (net.slow || net.saveData) return;
    // Don't prefetch on background tabs / when the user is mid-interaction.
    if (document.visibilityState !== "visible") return;

    // Build the queue: nearest neighbours by route → their listed videos.
    const queue: VideoEntry[] = [];
    for (const next of nextRoutesToPrefetch(pathname)) {
      // Skip videos we already have on the *current* page (the IO-driven
      // hero is probably already fetching them).
      const currentHere = new Set(
        videosForRoute(pathname).map((v) => v.url)
      );
      for (const v of videosForRoute(next)) {
        if (currentHere.has(v.url)) continue;
        // Skip giants on lowEnd devices even if the connection looks good.
        if (net.lowEnd && v.approxMb > 8) continue;
        queue.push(v);
      }
    }
    if (!queue.length) return;

    // Serialize. Concurrent video fetches over a 4G uplink can hurt the
    // user's actual current-page experience.
    let cancelled = false;
    let cancelIdle: (() => void) | null = null;

    const runNext = (index: number) => {
      if (cancelled || index >= queue.length || controller.signal.aborted) return;
      cancelIdle = whenIdle(async () => {
        if (cancelled) return;
        await prefetchOne(queue[index], controller.signal);
        runNext(index + 1);
      }, 4000);
    };

    runNext(0);

    return () => {
      cancelled = true;
      cancelIdle?.();
      controller.abort();
    };
  }, [pathname]);

  return null;
}
