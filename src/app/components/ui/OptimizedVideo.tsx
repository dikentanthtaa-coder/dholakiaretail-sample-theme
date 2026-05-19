import { useEffect, useRef, useState } from "react";
import { getOptimized } from "@/lib/imageManifest";
import { useNetworkProfile, whenIdle } from "@/lib/network";

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
 * Network/device-aware autoplay video.
 *
 * Decision matrix (per useNetworkProfile()):
 *
 *   - saveData OR slow-2g/2g/3g → never load video, render the AVIF poster
 *     instead. The user gets the brand still-frame in <100 ms; we don't
 *     burn their data plan on a loop they can't even buffer.
 *   - 4g + good downlink → autoplay as before.
 *   - prefers-reduced-motion → poster only.
 *   - Off-screen (not eager) → poster, then mount video when the section
 *     enters the viewport AND the network is good.
 *   - Off-screen offline → poster + freeze (no buffer spin).
 *
 * The video is paused when it scrolls out of the viewport to free the
 * decoder and battery on low-end mobile.
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
  preload = "metadata",
  ...rest
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(eager);
  const [firstFrame, setFirstFrame] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const net = useNetworkProfile();

  const posterMeta = poster ? getOptimized(poster) : null;
  const posterSources = poster
    ? (() => {
        const m = poster.match(/^(.*)\.(png|jpe?g)$/i);
        return m ? { avif: `${m[1]}.avif`, webp: `${m[1]}.webp` } : null;
      })()
    : null;

  /** Should we even attempt to mount a <video> element on this device? */
  const shouldMountVideo =
    !reduceMotion && !net.saveData && !net.slow && !net.lowEnd;

  // prefers-reduced-motion subscription
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  // IntersectionObserver — defer mount until visible (or eager).
  useEffect(() => {
    if (eager || !containerRef.current) return;
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
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [eager]);

  // Eager + good network: still wait for browser idle so the hero video
  // doesn't fight the LCP image for bandwidth.
  const [idlePassed, setIdlePassed] = useState(!eager);
  useEffect(() => {
    if (!eager) return;
    const cancel = whenIdle(() => setIdlePassed(true), 1500);
    return cancel;
  }, [eager]);

  // First-frame hook + pause-when-offscreen for low-end mobile battery.
  useEffect(() => {
    if (!inView || !videoRef.current) return;
    const v = videoRef.current;
    const handle = () => {
      setFirstFrame(true);
      onReady?.();
    };
    v.addEventListener("loadeddata", handle, { once: true });

    // Pause when off-screen so the GPU decoder can spin down.
    let pauseObserver: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      pauseObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && autoPlay) {
              v.play().catch(() => {});
            } else if (!entry.isIntersecting) {
              v.pause();
            }
          }
        },
        { threshold: 0.05 }
      );
      pauseObserver.observe(v);
    }
    return () => {
      v.removeEventListener("loadeddata", handle);
      pauseObserver?.disconnect();
    };
  }, [inView, onReady, autoPlay]);

  const fallbackPosterOnly = !shouldMountVideo;

  // ── Poster-only branch (slow network / save-data / reduced motion) ──
  if (fallbackPosterOnly && poster) {
    return (
      <div ref={containerRef} className={className} style={style}>
        <picture>
          {posterSources && <source type="image/avif" srcSet={posterSources.avif} />}
          {posterSources && <source type="image/webp" srcSet={posterSources.webp} />}
          <img
            src={poster}
            alt={posterAlt}
            className="w-full h-full object-cover"
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            width={posterMeta?.width}
            height={posterMeta?.height}
          />
        </picture>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className} style={style}>
      {/* LQIP/poster backdrop — visible until the video paints its first frame */}
      {poster && (
        <div
          aria-hidden
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: posterMeta?.lqip
              ? `url("${posterMeta.lqip}")`
              : `url("${poster}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: firstFrame ? 0 : 1,
            transition: "opacity 600ms cubic-bezier(0.65, 0, 0.35, 1)",
          }}
        />
      )}
      {inView && idlePassed && (
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
          }}
          {...rest}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
