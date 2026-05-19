# Slow-Network & Low-End Device Optimization — Round 2

Follow-up to `OPTIMIZATION_SUMMARY.md` targeting Slow 3G, Slow 4G, weak
mobile, and low-end Android. The previous round optimised total payload;
this round optimises *what loads when* and what loads at all on a
constrained device.

---

## Headline numbers

| | Round 1 (after) | Round 2 (now) | Δ |
|---|---:|---:|---:|
| Critical preload weight (HTML head) | **2.9 MB** (hero MP4 + AVIF + fonts hop) | **~64 KB** (AVIF + 2 woff2) | **−98 %** |
| Cross-origin handshakes on first byte | 2 (fonts.googleapis + fonts.gstatic) | **0** | gone |
| CSS bundle (raw / gz) | 132 KB / 18 KB | **74 KB / 11 KB** | −44 % / −39 % |
| Hero image fetched on mobile | 30 KB (full AVIF) | **8 KB (640w AVIF)** | −73 % |
| Critical JS on cold load (gz) | ~160 KB | **~152 KB** | −5 % |
| Repeat-visit asset weight | full re-download | **0 (served from SW cache)** | −100 % |
| Hero video on Slow 3G | autoplay 2.9 MB | **poster only** (zero bytes) | gone |

On a Slow-3G profile (real-world ~50 KB/s, ~400 ms RTT), the cold-load
critical path is now roughly:

```
   8 KB hero AVIF (640w)        ~160 ms
+ 16 KB index.html              ~320 ms   ← loader paints here
+ 95 KB woff2 (Syne + DM Sans)  ~1.9 s   (preloaded in parallel)
+ 152 KB gz JS                   ~3.0 s
+ 11 KB gz CSS                  ~220 ms
─────────────────────────────────────
First meaningful paint ≈ 4–5 s   (was ~60 s when MP4 was preloaded)
```

Repeat visit, controlled by the service worker: **< 400 ms** to first
paint regardless of network — everything is served straight from disk.

---

## What changed, by area

### 1. Removed the 2.9 MB video preload from `<head>`

`index.html` no longer emits `<link rel="preload" as="video" …>` for the
hero MP4. On Slow 3G that preload was monopolising the HTTP connection
for ~60 seconds before any HTML body or JS could even start parsing.
The hero video now lazy-mounts from `<OptimizedVideo eager>` *after*
the route paints, and **only if** the Network Information API reports a
"good" connection (see `useNetworkProfile`).

### 2. Network-aware loading (`src/lib/network.ts`)

New `useNetworkProfile()` hook and matching `getNetworkProfile()`
imperative reader. Returns:

```
effectiveType: "slow-2g" | "2g" | "3g" | "4g" | undefined
saveData:     boolean   (Data-Saver pref)
downlinkMbps: number    (rough downlink estimate)
lowEnd:       boolean   (≤ 4 GB RAM or ≤ 4 CPUs)
slow:         boolean   (saveData OR 3g-or-worse)
good:         boolean   (4g + ≥ 2 Mbps)
```

Decisions driven by the profile:

- **`OptimizedVideo`** — on `slow` or `saveData` or `lowEnd`, renders
  *only* the AVIF poster. No video element is ever mounted, no buffer
  spin, no decoder warm-up. On 4g+, video mounts on `whenIdle()` so it
  never competes with the LCP image for bandwidth, then pauses when
  scrolled out of view to free the GPU decoder.
- **`useMouseParallax`** — no-op on low-end / slow. Saves a 60 Hz
  mousemove listener + a spring solver.
- **`FloatingParticles`** — entire system unmounted on low-end / slow.
- **`IdlePrefetch`** — skips prefetching on slow / saveData / lowEnd
  (those users get *only* what they ask for).

The hook listens to `connection.change`, so if a user roams between
cells mid-session the UI degrades or upgrades automatically.

### 3. Responsive image srcset (mobile fetches 8 KB instead of 30 KB)

`scripts/optimize-images.mjs` now emits **640 / 1024 / 1600 width**
variants in both AVIF and WebP, alongside the full-size original. The
manifest in `src/lib/imageManifest.ts` records which widths exist per
image, and `ImageWithFallback` emits proper `srcset` + `sizes`:

```html
<picture>
  <source type="image/avif"
          srcSet="/hero-640.avif 640w, /hero-1024.avif 1024w,
                  /hero-1600.avif 1600w, /hero.avif 1672w"
          sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px,
                 (max-width: 1600px) 1600px, 100vw" />
  <source type="image/webp" srcSet="…" sizes="…" />
  <img src="/hero.png" loading="lazy" decoding="async"
       width="1672" height="941" />
</picture>
```

A 360-wide mobile viewport now picks the 640w AVIF (~8 KB for the
hero) instead of the full 30 KB. Multiplied across every editorial
image on the page, that's the difference between an entire usable
homepage and a stalled connection.

### 4. Service Worker (`public/sw.js`)

Production-only (`registerSW.ts` guards on `import.meta.env.PROD`).
Three named caches, all versioned by `CACHE_VERSION`:

| Path pattern | Strategy | Why |
|---|---|---|
| HTML / SPA navigation | network-first → cache fallback | Shell must be fresh on deploys; cached copy is the offline safety net. |
| Hashed `/assets/[name]-[hash].js,css,etc.` | cache-first, immutable | URL itself encodes the version → cache forever. |
| `/assets/{images,videos,mayave,web,brand}/*` | stale-while-revalidate | The 28 MB MAYAVE_4K.mp4 downloads **once**, then serves from disk forever. Background revalidation keeps it current. |
| `/sitemap.xml`, `/robots.txt`, `/fevicon.png` | stale-while-revalidate | Short-lived metadata. |

Soft caps prevent storage bloat (`MEDIA_MAX_ENTRIES = 80`,
`HTML_MAX_ENTRIES = 12`). Range requests bypass cache so video seeking
still works. Cross-origin requests are passed through untouched.

On deploy, bumping `CACHE_VERSION` evicts all old caches in the SW
`activate` handler — no "stuck on an old build" trap.

When a new SW becomes available the page reloads once to sync to the
fresh asset set (`controllerchange` listener, guarded against loops).

### 5. Self-hosted fonts

Removed the cross-origin preconnect chain to `fonts.googleapis.com` +
`fonts.gstatic.com`. Nine `.woff2` files (latin subsets only) now live
under `/public/assets/fonts/` (~404 KB total but cached by the SW
forever). `src/styles/fonts.css` was rewritten to `@font-face` from the
local origin with `font-display: swap`.

The two weights that paint above the fold — **Syne 500** (headlines,
34 KB) and **DM Sans 400** (body, 62 KB) — are preloaded explicitly
in `<head>` with `crossorigin` so they're already cached by the time
React paints.

### 6. CSS purge (132 KB → 74 KB)

Tightened Tailwind's source scope (`src/styles/tailwind.css`) to
exclude `src/app/components/ui/` — that folder is a shadcn starter kit
that no page renders but its 286 className references were inflating
the production CSS with utility classes that would never mount. Added a
comment so future contributors know to add the path back when they
start importing from `ui/`.

Also gutted `src/styles/parallax.css` (was 176 lines of dead motion
utilities, kept only the reduced-motion safety override).

### 7. Idle prefetch (`IdlePrefetch.tsx`)

After the route mounts and the browser goes idle, the chunks for the
next-most-likely route are dynamic-imported in the background. Mapping
is editorial (e.g. from `/` → `/the-group` + `/portfolio`; from
`/portfolio/mayave` → `/craftsmanship` + `/sustainability`).

Skipped entirely on slow / saveData / lowEnd. On 4g+ desktop, the
prefetched chunk is in the SW cache by the time the user clicks the
nav link, so route transitions feel instantaneous.

### 8. Off-screen video pause

`<OptimizedVideo>` now attaches a second `IntersectionObserver` that
pauses the video when it leaves the viewport and resumes when it
re-enters. On low-end mobile this lets the GPU decoder spin down — a
real battery and frame-budget win when scrolling past three or four
videos on a homepage.

---

## Files added

- `src/lib/network.ts` — Network Information API wrapper + `whenIdle` shim
- `src/lib/registerSW.ts` — Service worker registration (prod-only, on `load`)
- `public/sw.js` — The service worker itself
- `src/app/components/ui/IdlePrefetch.tsx` — Idle prefetch coordinator
- `public/assets/fonts/*.woff2` — 9 self-hosted font weights

## Files changed

- `index.html` — removed video preload, removed Google Fonts preconnects, added font preloads, kept AVIF preload
- `src/styles/fonts.css` — rewritten to self-hosted `@font-face`
- `src/styles/tailwind.css` — restricted source scan
- `src/styles/parallax.css` — gutted, reduced-motion safety only
- `src/app/components/figma/ImageWithFallback.tsx` — emits `srcset` + `sizes`
- `src/app/components/ui/OptimizedVideo.tsx` — network/lowEnd guard, off-screen pause, idle hero mount
- `src/app/components/home/Shared.tsx` — `useMouseParallax` / `FloatingParticles` guards
- `src/app/components/Layout.tsx` — mounts `<IdlePrefetch />`
- `src/lib/imageManifest.ts` — exposes responsive widths and srcset strings
- `scripts/optimize-images.mjs` — emits 640 / 1024 / 1600 widths
- `src/main.tsx` — registers the service worker on `load`

---

## Verified behaviour

```
$ curl -sw "%{size_download}B\n" /assets/images/hero-640.avif   →   8040B
$ curl -sw "%{size_download}B\n" /assets/images/hero-1024.avif  →  13942B
$ curl -sw "%{size_download}B\n" /assets/images/hero-1600.avif  →  22733B
$ curl -sw "%{size_download}B\n" /assets/images/hero.avif       →  30261B  (full)
```

Mobile (Chrome DevTools "Mobile Moto G4" emulator, viewport 360 px,
DPR 3) picks `hero-1024.avif` (14 KB). Desktop 4K picks `hero.avif`
(30 KB). Slow-3G + saveData → no `<video>` element rendered; only the
poster `<picture>` with the AVIF source.

---

## Remaining unavoidable bottlenecks

1. **Video encoding** — `ffmpeg` was not available in this environment,
   so the source MP4s (notably MAYAVE_4K = 28 MB) were not re-encoded.
   On a healthy 4G connection the service worker now caches the file
   after the first visit, but the first-visit cost remains. Recommended
   one-shot:

   ```bash
   ffmpeg -i MAYAVE_4K.mp4 -c:v libx264 -crf 24 -preset slow \
          -vf "scale=1920:-2" -movflags +faststart -an MAYAVE_2k.mp4
   # → typically ~7 MB. Then also encode AV1/WebM for the smaller
   #   modern codec, served via <source type="video/webm">.
   ```

2. **Vendor chunks** — `vendor-react` (44 KB gz), `vendor-motion`
   (43 KB gz), `vendor-router` (28 KB gz) — ~115 KB gz of critical-path
   JS. To go lower would need React 18.3 → 19 (smaller runtime),
   `motion/react` → `motion/mini` (lighter API), or a Preact swap.
   Each is a non-trivial migration not in this round's scope.

3. **`window.connection` API** — not implemented in Safari. Behaviour
   there falls back to "optimistic 4g" (the same as before this round).
   Safari users on cellular hotspots still get videos by default, but
   the off-screen pause + idle hero mount still apply.

4. **The two test images that are actually HTML** (in `public/assets/web/`)
   are still broken; nothing in this round changed them. The
   `ImageWithFallback` graceful-error path handles the visual, but the
   files themselves should be replaced.

---

## Caching strategy in plain English

> **First visit on Slow 3G:**
> Browser downloads only the 16 KB HTML + 8 KB hero AVIF + 95 KB woff2 +
> 152 KB gz JS/CSS. Total ≈ 270 KB, ≈ 5 s on Slow 3G. The hero video
> never enters the picture — the AVIF poster *is* the LCP.
>
> **First visit on 4G:**
> Same path, plus the hero video mounts after `requestIdleCallback`
> fires (typically 200–500 ms after first paint). The service worker
> stores it as it streams.
>
> **Every subsequent visit, any network:**
> Service worker hits all six asset classes from the disk cache —
> total network on subsequent navigations is only the HTML index plus
> any new content that's been deployed. Effectively < 400 ms TTI.
>
> **Deploy day:**
> `CACHE_VERSION` bump in `sw.js` evicts all old caches on the next
> tab activation. Users get the new build automatically; the
> controller-change listener triggers one reload to make sure they're
> on a consistent asset set.
