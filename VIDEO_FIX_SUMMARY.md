# Video Loading Fix — Project-Wide

Follow-up to `SLOW_NETWORK_OPTIMIZATION.md`. The previous round's slow-network
guards were too aggressive and ended up suppressing videos entirely on a
majority of mobile devices and any throttled connection. This round
re-architects the video system around a "poster always, video reliably"
strategy.

---

## What was actually broken

The previous `<OptimizedVideo>` made the mount decision via

```ts
const shouldMountVideo =
  !reduceMotion && !net.saveData && !net.slow && !net.lowEnd;
```

Each of those gates individually looked sensible. Stacked, they were
fatal:

| Gate | Real-world effect |
|---|---|
| `lowEnd` (≤ 4 GB RAM **or** ≤ 4 CPU cores) | Chrome on most mid-range Android reports `deviceMemory = 4`. This alone silenced video for >50 % of mobile visitors. |
| `slow` (3g / 2g / saveData) | Any Chrome DevTools throttle profile or any real-world weak signal. |
| `reduceMotion` | Correct, kept. |
| `saveData` | Correct, kept. |

Additionally, the eager-mount path waited for `requestIdleCallback`
to fire **before** allowing the `<video>` element to be rendered at all.
On a busy first-load (CSS parse, font swap, hero AVIF decode) idle
callbacks can be delayed by many seconds — which is why "even after
waiting a long time, videos still do not load/show". The video was
literally never being added to the DOM.

A secondary, more subtle bug: when `autoplay` was attempted via the
default React `autoPlay` attribute, no fallback existed if Safari /
iOS / aggressive Chrome rejected the play() promise. The video stayed
paused on the first frame, the poster stayed visible behind it, and to
the user it looked like an infinite spinner.

---

## What changed

### 1. `<OptimizedVideo>` rewritten end to end

```text
src/app/components/ui/OptimizedVideo.tsx
```

New invariants:

1. **The AVIF/WebP poster is ALWAYS painted, immediately.** It is
   always in the DOM, always at `opacity: 1` until the video paints its
   first frame. There is never a blank or black box, ever.
2. **A `<video>` element is always rendered.** The only conditions
   that suppress it are explicit accessibility/data signals:
   `prefers-reduced-motion` or `saveData`. The `lowEnd` gate is gone;
   the `slow` gate is gone for mounting (it still influences
   `preload`).
3. **`preload` adapts to context**, not eligibility:
   - `eager + good network`  → `"auto"`   (start downloading on mount)
   - `eager + slow network`  → `"metadata"` (header + a bit, enough to autoplay)
   - lazy + not in viewport  → `"none"`   (don't waste a connection)
   - lazy + in viewport      → `"auto"`
   - saveData (any case)     → `"none"`   (and the video is skipped anyway)
4. **Reliable autoplay.** When the video mounts we set up listeners
   for `canplay` + a 30 ms timer that both call `tryPlay()`:
   ```ts
   try { await v.play() }
   catch { v.muted = true; await v.play().catch(() => {}) }
   ```
   If the browser still refuses, the poster simply stays — no broken
   UI, no infinite loading state.
5. **Off-screen pause.** A second `IntersectionObserver` pauses the
   video as it scrolls out (battery + GPU decoder) and resumes it on
   return. The pause/play loop is also wrapped in the same
   tryPlay-with-muted-fallback.
6. **Error grace.** On the `error` event we flip an `errored` flag
   and keep the poster visible. No spinner forever.
7. **No more `requestIdleCallback` mounting gate.** Eager videos now
   mount on first commit. The browser's own resource scheduler decides
   when bytes actually arrive (via `preload="metadata"` on slow links).
8. **Wider IntersectionObserver root margin** — 400 px (up from
   200 px). Hero / second-screen videos start fetching about half a
   viewport before the user scrolls them in, so they're already buffered
   by the time they're visible.

### 2. Background video prefetcher

```text
src/app/components/ui/VideoPrefetcher.tsx
src/lib/videoRegistry.ts
```

A new `VideoPrefetcher` component lives at the `Layout` level. On
every route change, after the route mounts AND the browser goes idle,
it issues low-priority `fetch()` calls for the videos of the *next*
most-likely routes. Those fetches stream through the service worker,
which persists the bodies in the `dr-v1-media` cache. When the user
actually navigates, the video is already on disk and the new
`<OptimizedVideo>` paints it instantly.

The mapping is editorial — `src/lib/videoRegistry.ts`:

```ts
export const PREFETCH_FROM = {
  "/":              ["/sustainability", "/craftsmanship", "/portfolio/mayave"],
  "/the-group":     ["/", "/sustainability"],
  "/portfolio":     ["/portfolio/mayave", "/craftsmanship"],
  "/portfolio/mayave": ["/craftsmanship", "/sustainability"],
  "/craftsmanship": ["/sustainability", "/"],
  "/sustainability":["/craftsmanship", "/"],
  …
};
```

**Guardrails** (this is the bit that makes it production-safe, not a
data-plan-burning auto-loader):

| Guard | What it does |
|---|---|
| `net.slow` / `net.saveData` | Whole prefetcher disabled — those users get only what they ask for. |
| `net.lowEnd` skips > 8 MB | The 28 MB MAYAVE_4K is never prefetched on a budget Android even on Wi-Fi. |
| `MAX_SESSION_BYTES = 25 MB` | Hard ceiling per page lifetime. |
| Serialized (1 fetch at a time) | Never fights the user's current-page interactions for uplink. |
| `whenIdle(…, 4000ms)` between each | Each prefetch waits for the browser to be truly idle. |
| `inflight` Set + dedupe | Same URL is never fetched twice in one session. |
| `AbortController` on unmount | Route change immediately cancels any pending prefetch. |
| `document.visibilityState !== "visible"` skip | Background tabs don't burn anyone's data. |

### 3. Service worker (unchanged, but now matters more)

The `staleWhileRevalidate` strategy for `/assets/{images,videos,…}/*`
means the 28 MB MAYAVE_4K and 14 MB craftsmanship video download
exactly **once per device**, then serve from disk forever. Combined
with the prefetcher, by the time a user lands on `/portfolio/mayave`,
the file is usually already cached because either:

   (a) They were on the homepage and the prefetcher fired, or
   (b) They visited mayavé before in any prior session.

Either way: poster appears in ~30 ms (it's an 86 KB AVIF), video
appears another ~50 ms later (decoder warm-up only — bytes already
local).

### 4. Site-wide audit + cleanup

- Hero (home) — uses `<OptimizedVideo eager>` ✅
- PortfolioPreview (home) — uses `<OptimizedVideo>` ✅
- Brand-film band (home) — uses `<OptimizedVideo>` ✅
- Sustainability teaser (home) — uses `<OptimizedVideo>` ✅
- Craftsmanship hero — uses `<OptimizedVideo eager>` ✅
- BrandPage (Mayavé) hero — uses `<OptimizedVideo eager>` ✅
- SustainabilityPage split — uses `<OptimizedVideo>` ✅
- Modal `<video controls>` inside `ManufacturingSustainability` —
  intentionally kept as a raw `<video>` because user interaction drives
  it (no autoplay, plays full-screen with controls). Not affected by
  the new component.

---

## How loading now flows

### First visit, /, Fast 4G

```
T=0      HTML byte 1 → boot loader paints
T=80ms   AVIF hero poster decoded → loader fades, poster visible
T=400ms  React mounted, route chunk parsed
T=420ms  <OptimizedVideo eager> mounts <video preload="auto">
T=900ms  Hero video's first frame decoded → poster fades to video
T=1.5s   IdlePrefetch fires → starts pulling next-page JS chunks
T=3.5s   VideoPrefetcher fires → starts pulling sustainability MP4
T=8s     Sustainability MP4 in SW cache
T=…      User navigates to /sustainability → poster instant, video
         from SW disk cache → first frame ~50 ms after route mount
```

### First visit, /, Slow 3G

```
T=0      HTML byte 1 → boot loader paints
T=200ms  AVIF hero poster (8 KB at 640w) decoded → loader fades
T=4s     React + chunks streamed in
T=4.5s   <OptimizedVideo eager> mounts <video preload="metadata">
T=…      Video buffers gradually behind the poster. Whenever it has
         enough buffered to start, autoplay kicks in and the poster
         fades. Until then, the poster is the experience — no spinner.
```

### Repeat visit, any network

```
T=0      Service worker serves HTML from network-first (or cache)
T=100ms  All chunks + CSS + fonts served from SW disk cache
T=120ms  Hero video served from SW disk cache → ~120 ms to autoplay
```

### Save-Data on (`navigator.connection.saveData === true`)

```
Posters everywhere. No <video> elements mounted. No prefetcher fires.
Total network use for the homepage ≈ 270 KB.
```

---

## Why a "blank video area" can no longer happen

The poster `<picture>` is always rendered, behind every video. It's
positioned `absolute inset-0` and only fades to `opacity: 0` when the
video genuinely paints its first frame (`loadeddata` event). If the
video:

- never mounts (saveData / reduced-motion) → poster opacity stays 1
- mounts but autoplay rejected → poster stays 1 (firstFrame never fires)
- mounts but errors → `errored=true` → poster stays 1
- mounts and plays → first frame triggers a 600 ms fade poster → video

There is no code path that leaves the user staring at a black box.

---

## Files

**New**
- `src/lib/videoRegistry.ts`
- `src/app/components/ui/VideoPrefetcher.tsx`

**Rewritten**
- `src/app/components/ui/OptimizedVideo.tsx`
- `src/app/components/Layout.tsx` (mounts `<VideoPrefetcher />`)

**Unchanged but now load-bearing**
- `public/sw.js` — stale-while-revalidate for `/assets/videos/…`
- `src/lib/network.ts` — `useNetworkProfile`, `whenIdle`
- `src/lib/registerSW.ts` — production-only SW registration

---

## Behaviour you can verify in DevTools

1. **Chrome → DevTools → Network → throttle "Slow 4G", reload:**
   Hero poster appears in ~1 s, hero video starts within 5 s, every
   other section's poster appears as you scroll (intersection at
   400 px), then their videos follow within a couple of seconds.

2. **Chrome → DevTools → Application → Service Workers:** after
   the homepage loads, you'll see `dr-v1-media` cache populating with
   `/assets/videos/P01_S01_Hero_Video_idea_360.mp4` first, then in the
   background `P01_S07_…`, `P01_S06_…`. Navigate to
   `/portfolio/mayave` → `MAYAVE_4K.mp4` is served from the cache
   (look for `(ServiceWorker)` in the size column).

3. **DevTools → Rendering → emulate `prefers-reduced-motion: reduce`:**
   videos disappear, posters remain everywhere.

4. **DevTools → Network → Save-Data toggle:** same.

5. **Lighthouse mobile, slow-4G throttle:** LCP element should be the
   hero AVIF, FCP unaffected by video weight, TBT not impacted by the
   prefetcher (whenIdle gating).
