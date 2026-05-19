import { useEffect, useRef, useState } from "react";
import { getOptimized } from "@/lib/imageManifest";

type Props = React.VideoHTMLAttributes<HTMLVideoElement> & {
  /** mp4 source. */
  src: string;
  /** Poster path — if it's a managed asset we'll use the LQIP + avif/webp. */
  poster?: string;
  /** Eagerly load even when off-screen (hero usage). */
  eager?: boolean;
  /** Alt text used for the poster image when the video is offscreen. */
  posterAlt?: string;
  className?: string;
  /** Optional callback when the underlying video element finishes its first
   *  frame paint. Useful for fading out skeletons. */
  onReady?: () => void;
};

/**
 * Performance-aware <video>:
 *   - eager=false → renders only a poster image until the section enters
 *     the viewport, then attaches the <video>. Saves bandwidth on every
 *     below-the-fold autoplay loop.
 *   - eager=true  → mounts immediately with preload=metadata for the hero.
 *   - LQIP blur backdrop is rendered until the first frame is decoded so
 *     dark squares never appear during loading.
 *   - Respects `prefers-reduced-motion`: a still poster is shown instead
 *     of the looping video.
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

  const posterMeta = poster ? getOptimized(poster) : null;
  const posterSources = poster
    ? (() => {
        const m = poster.match(/^(.*)\.(png|jpe?g)$/i);
        return m ? { avif: `${m[1]}.avif`, webp: `${m[1]}.webp` } : null;
      })()
    : null;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    if (eager || !containerRef.current) return;
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
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [eager]);

  useEffect(() => {
    if (!inView || !videoRef.current) return;
    const v = videoRef.current;
    const handle = () => {
      setFirstFrame(true);
      onReady?.();
    };
    v.addEventListener("loadeddata", handle, { once: true });
    return () => v.removeEventListener("loadeddata", handle);
  }, [inView, onReady]);

  // Reduce motion: render a high-quality still poster instead of the video.
  if (reduceMotion && poster) {
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
            filter: posterMeta?.lqip ? "blur(0px)" : undefined,
          }}
        />
      )}
      {inView && (
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
