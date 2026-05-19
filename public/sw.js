/* eslint-disable no-restricted-globals */
/**
 * Dholakia Retail — Service Worker.
 *
 * Strategy by URL class:
 *
 *   - HTML (navigation requests)   → network-first, fall back to cache.
 *     Ensures the SPA shell is always fresh on the first byte; the
 *     cached copy is the safety net for offline / hung-network.
 *
 *   - /assets/ (hashed JS / CSS / images / video / fonts)
 *                                  → cache-first, immutable.
 *     The Vite build content-hashes these so the URL itself is the
 *     version. Cache forever; new builds get new URLs.
 *
 *   - /assets/images/ /assets/videos/ /assets/mayave/ /assets/web/
 *     (non-hashed public media)    → stale-while-revalidate.
 *     Returns the cached copy instantly while a background fetch
 *     keeps it fresh. Critical for repeat visitors on Slow 3G — the
 *     2.9 MB hero video downloads ONCE, then serves from disk forever.
 *
 *   - everything else              → network-first.
 *
 * Cache versioning: the CACHE_VERSION string is bumped on every deploy;
 * old caches are evicted in `activate`. This prevents the "stuck on an
 * old build forever" trap.
 *
 * The SW is NEVER registered in dev; production-only. See main.tsx.
 */

const CACHE_VERSION = "dr-v1";
const CACHE_HTML = `${CACHE_VERSION}-html`;
const CACHE_STATIC = `${CACHE_VERSION}-static`;
const CACHE_MEDIA = `${CACHE_VERSION}-media`;

// Soft caps so the SW never exhausts the user's storage.
const MEDIA_MAX_ENTRIES = 80; // ~80 images/videos worth of cache
const HTML_MAX_ENTRIES = 12;

const MEDIA_PATH_RE =
  /^\/assets\/(images|videos|mayave|web|brand)\//;

const HASHED_ASSET_RE = /^\/assets\/[^/]+-[A-Za-z0-9_-]{6,}\.[a-z0-9]+$/;

self.addEventListener("install", (event) => {
  // Activate immediately on first install so we don't wait a refresh.
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_HTML).then((cache) =>
      // Prime the offline shell.
      cache.add("/").catch(() => {})
    )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => !k.startsWith(CACHE_VERSION))
          .map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // We only handle GETs. PUT/POST/etc go straight to network.
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Don't try to cache cross-origin requests (Google Fonts, analytics, …).
  if (url.origin !== self.location.origin) return;

  // Range requests (video seeking) must bypass cache entirely.
  if (req.headers.has("range")) return;

  // ── HTML / SPA navigation ────────────────────────────────────────
  if (
    req.mode === "navigate" ||
    (req.headers.get("accept") || "").includes("text/html")
  ) {
    event.respondWith(networkFirst(req, CACHE_HTML, HTML_MAX_ENTRIES));
    return;
  }

  // ── Hashed build assets (immutable) ──────────────────────────────
  if (HASHED_ASSET_RE.test(url.pathname)) {
    event.respondWith(cacheFirst(req, CACHE_STATIC));
    return;
  }

  // ── Non-hashed public media (images/videos/fonts/icons) ──────────
  if (MEDIA_PATH_RE.test(url.pathname)) {
    event.respondWith(
      staleWhileRevalidate(req, CACHE_MEDIA, MEDIA_MAX_ENTRIES)
    );
    return;
  }

  // ── /sitemap.xml /robots.txt /fevicon.png etc. ───────────────────
  if (
    url.pathname === "/sitemap.xml" ||
    url.pathname === "/robots.txt" ||
    url.pathname === "/fevicon.png" ||
    url.pathname === "/manifest.webmanifest"
  ) {
    event.respondWith(
      staleWhileRevalidate(req, CACHE_STATIC, HTML_MAX_ENTRIES)
    );
    return;
  }
});

// ─── Strategies ─────────────────────────────────────────────────────

async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res.ok && res.status === 200 && res.type === "basic") {
      cache.put(req, res.clone());
    }
    return res;
  } catch (err) {
    // Last-ditch: any version of the asset in any cache.
    const fallback = await caches.match(req);
    if (fallback) return fallback;
    throw err;
  }
}

async function networkFirst(req, cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(req);
    if (res.ok && res.type === "basic") {
      cache.put(req, res.clone());
      trim(cache, maxEntries);
    }
    return res;
  } catch (err) {
    const cached = await cache.match(req);
    if (cached) return cached;
    // For SPA navigation we can fall back to the cached index.
    if (req.mode === "navigate") {
      const shell = await cache.match("/");
      if (shell) return shell;
    }
    throw err;
  }
}

async function staleWhileRevalidate(req, cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  const networkPromise = fetch(req)
    .then((res) => {
      if (res.ok && res.type === "basic") {
        cache.put(req, res.clone()).then(() => trim(cache, maxEntries));
      }
      return res;
    })
    .catch(() => null);
  // If we have a cached copy, return it instantly. Otherwise wait for
  // the network. If both fail, the caller's error handler kicks in.
  return cached || (await networkPromise) || Promise.reject(new Error("Offline"));
}

async function trim(cache, maxEntries) {
  if (!maxEntries) return;
  const keys = await cache.keys();
  if (keys.length <= maxEntries) return;
  // Evict oldest-first. Cache.keys() returns insertion order in Chrome.
  const overflow = keys.length - maxEntries;
  for (let i = 0; i < overflow; i++) {
    cache.delete(keys[i]);
  }
}

// Listen for an explicit skip-waiting message from the page so a new
// SW can take over without forcing a manual hard-reload.
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});
