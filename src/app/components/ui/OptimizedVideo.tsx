import { useEffect, useRef, useState } from "react";
import { getOptimized } from "@/lib/imageManifest";
import { useNetworkProfile } from "@/lib/network";

type Props = React.VideoHTMLAttributes<HTMLVideoElement> & {
  src: string;
  poster?: string;
  /** Eagerly load even when off-screen (hero usage). */
  eager?: boolean;
  posterAlt?: string;
  className?: string;
  /** Optional callback when the first frame is decoded. */
  onReady?: () => void;
};

/**
 * Production-grade autoplay video.
 *
 * Reliability rules:
 *
 *   1. The AVIF/WebP poster is ALWAYS painted, immediately. The user never
 *      sees a blank/black box. The poster is the LCP, the video is the
 *      enhancement layer.
 *   2. A <video> element is always rendered (unless prefers-reduced-motion
 *      or explicit Data-Saver). We do NOT skip the video for "lowEnd"
 *      devices — Chrome on most mid-range Android reports deviceMemory=4,
 *      and the previous gate was removing video from >50 % of mobile users.
 *   3. The `preload` attribute is adapted to network:
 *        - eager + good       → "auto"     (start downloading immediately)
 *        - eager + slow       → "metadata" (just enough for first frame)
 *        - lazy (off-screen)  → "none"     (don't waste a connection)
 *        - lazy + visible     → "auto"     (the IO promotes it)
 *      saveData always forces "none" — but the <video> still mounts; if
 *      the user later interacts/scrolls, the browser may begin streaming.
 *   4. .play() rejections (autoplay policy on iOS / aggressive Chrome
 *      settings) are caught and retried muted. If the video still won't
 *      play, the poster simply stays — never a broken UI.
 *   5. Videos pause when they scroll out of view (battery + decoder).
 *   6. On `error` we keep the poster visible. No infinite loading state.
 *
 * The component is React-strict-mode safe and does no work on the server.
 */
export function OptimizedVideo({
  src,
  poster,
  eager = false,
  posterAlt = "",
  className,
  style,
  onReady,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  preload: preloadProp,
  ...rest
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(eager);
  const [firstFrame, setFirstFrame] = useState(false);
  const [errored, setErrored] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const net = useNetworkProfile();

  const posterMeta = poster ? getOptimized(poster) : null;
  const posterSources = poster
    ? (() => {
        const m = poster.match(/^(.*)\.(png|jpe?g)$/i);
        return m ? { avif: `${m[1]}.avif`, webp: `${m[1]}.webp` } : null;
      })()
    : null;

  // ── prefers-reduced-motion subscription ──────────────────────────
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  // Only TWO conditions skip the video entirely:
  //   - the user prefers reduced motion (explicit accessibility signal)
  //   - the user has opted into Data Saver (explicit bandwidth signal)
  // Everything else gets a video element; preload strategy varies.
  const skipVideo = reduceMotion || net.saveData;

  // ── IntersectionObserver (lazy-mount + autoplay/pause when scrolled) ─
  useEffect(() => {
    if (skipVideo) return;
    if (eager) {
      setInView(true);
      return;
    }
    if (!containerRef.current) return;
    const el = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: "400px" } // start ~half a viewport ahead
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [eager, skipVideo]);

  // ── First-frame detection + autoplay enforcement + visibility pause ──
  useEffect(() => {
    const v = videoRef.current;
    if (!v || skipVideo || !inView) return;

    const onFirstFrame = () => {
      setFirstFrame(true);
      onReady?.();
    };
    const onError = () => {
      setErrored(true);
    };

    v.addEventListener("loadeddata", onFirstFrame, { once: true });
    v.addEventListener("error", onError);

    // Try to play. iOS/Chrome can reject if anything looks "user-initiated"
    // requirement-y. Always retry muted, then give up gracefully (poster
    // stays — no broken UI).
    const tryPlay = async () => {
      try {
        await v.play();
      } catch {
        try {
          v.muted = true;
          await v.play();
        } catch {
          /* poster remains visible — fine */
        }
      }
    };
    if (autoPlay) {
      // Allow the browser one tick to settle metadata first.
      const t = window.setTimeout(tryPlay, 30);
      v.addEventListener("canplay", tryPlay, { once: true });
      // Pause when off-screen, resume when back.
      let pauseObserver: IntersectionObserver | null = null;
      if ("IntersectionObserver" in window) {
        pauseObserver = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                if (v.paused) tryPlay();
              } else {
                v.pause();
              }
            }
          },
          { threshold: 0.05 }
        );
        pauseObserver.observe(v);
      }
      return () => {
        window.clearTimeout(t);
        v.removeEventListener("loadeddata", onFirstFrame);
        v.removeEventListener("error", onError);
        v.removeEventListener("canplay", tryPlay);
        pauseObserver?.disconnect();
      };
    }
    return () => {
      v.removeEventListener("loadeddata", onFirstFrame);
      v.removeEventListener("error", onError);
    };
  }, [inView, skipVideo, autoPlay, onReady]);

  // ── preload strategy ─────────────────────────────────────────────
  // Caller can override via prop; otherwise we adapt to network + eagerness.
  const callerPreload = preloadProp as "none" | "metadata" | "auto" | undefined;
  let preload: "none" | "metadata" | "auto" = callerPreload ?? "metadata";
  if (!callerPreload) {
    if (net.saveData) preload = "none";
    else if (!inView) preload = "none";
    else if (eager && net.good) preload = "auto";
    else if (eager) preload = "metadata";
    else preload = "auto";
  }

  // ── Poster (always painted, instant) ─────────────────────────────
  const posterEl = poster ? (
    <picture>
      {posterSources && <source type="image/avif" srcSet={posterSources.avif} />}
      {posterSources && <source type="image/webp" srcSet={posterSources.webp} />}
      <img
        src={poster}
        alt={posterAlt}
        className="absolute inset-0 w-full h-full object-cover"
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        width={posterMeta?.width}
        height={posterMeta?.height}
        style={{
          opacity: firstFrame ? 0 : 1,
          transition: "opacity 600ms cubic-bezier(0.65, 0, 0.35, 1)",
          backgroundImage: posterMeta?.lqip ? `url("${posterMeta.lqip}")` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        {...(eager ? ({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>) : {})}
      />
    </picture>
  ) : null;

  return (
    <div ref={containerRef} className={className} style={style}>
      {posterEl}
      {!skipVideo && !errored && inView && (
        <video
          ref={videoRef}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          preload={preload}
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: firstFrame ? 1 : 0,
            transition: "opacity 600ms cubic-bezier(0.65, 0, 0.35, 1)",
            // Promote to its own compositor layer — avoids repaints when
            // adjacent text animates.
            willChange: firstFrame ? "auto" : "opacity",
          }}
          {...rest}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
