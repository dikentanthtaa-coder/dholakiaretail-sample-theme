import React, { useEffect, useRef, useState } from "react";
import { deriveModernSources, getOptimized } from "@/lib/imageManifest";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMTUiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMy43Ij48cmVjdCB4PSIxNiIgeT0iMTYiIHdpZHRoPSI1NiIgaGVpZ2h0PSI1NiIgcng9IjYiLz48cGF0aCBkPSJtMTYgNTggMTYtMTggMzIgMzIiLz48Y2lyY2xlIGN4PSI1MyIgY3k9IjM1IiByPSI3Ii8+PC9zdmc+Cgo=";

const DEFAULT_SIZES =
  "(max-width: 640px) 640px, (max-width: 1024px) 1024px, (max-width: 1600px) 1600px, 100vw";

export type ImageWithFallbackProps =
  React.ImgHTMLAttributes<HTMLImageElement> & {
    /**
     * Critical above-the-fold image — load eagerly with high fetch priority.
     * Defaults to lazy/low.
     */
    priority?: boolean;
    /** Override responsive sizes attribute. */
    sizes?: string;
  };

/**
 * Modern-format aware image with responsive srcset.
 *
 *   <picture>
 *     <source type="image/avif" srcSet="… 640w, … 1024w, … 1600w" sizes="…" />
 *     <source type="image/webp" srcSet="… 640w, … 1024w, … 1600w" sizes="…" />
 *     <img loading="lazy" decoding="async" src="<original>" … />
 *   </picture>
 *
 * Browsers on phones pick the smallest variant that fits — typically the
 * 640w AVIF (often <20 KB) instead of the full 1600w (>100 KB).
 *
 * Layout is reserved via intrinsic w/h from `image-manifest.json` so CLS
 * stays at 0. A 24px blurred LQIP is painted as a background until the
 * real image's `load` fires, then we fade it in.
 */
export function ImageWithFallback(props: ImageWithFallbackProps) {
  const {
    src,
    alt,
    style,
    className,
    priority = false,
    sizes,
    loading,
    decoding,
    onLoad,
    onError,
    width: propWidth,
    height: propHeight,
    fetchPriority: _fp,
    ...rest
  } = props as ImageWithFallbackProps & { fetchPriority?: "high" | "low" | "auto" };

  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const srcStr = typeof src === "string" ? src : undefined;
  const meta = getOptimized(srcStr ?? null);
  const sources = srcStr ? deriveModernSources(srcStr) : null;

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [srcStr]);

  if (errored || !srcStr) {
    return (
      <div
        className={`inline-block bg-[#0d0d0d]/5 text-center align-middle ${className ?? ""}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img
            src={ERROR_IMG_SRC}
            alt={alt ?? "Image unavailable"}
            data-original-url={srcStr}
            {...rest}
          />
        </div>
      </div>
    );
  }

  const eager = priority || loading === "eager";
  const effectiveSizes = sizes ?? (sources?.avifSrcSet ? DEFAULT_SIZES : undefined);

  const imgEl = (
    <img
      ref={imgRef}
      src={sources?.original ?? srcStr}
      alt={alt}
      className={className}
      style={{
        ...style,
        opacity: loaded ? 1 : 0,
        transition: "opacity 600ms cubic-bezier(0.65, 0, 0.35, 1)",
      }}
      loading={eager ? "eager" : loading ?? "lazy"}
      decoding={decoding ?? "async"}
      sizes={effectiveSizes}
      width={propWidth ?? meta?.width}
      height={propHeight ?? meta?.height}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      onError={(e) => {
        setErrored(true);
        onError?.(e);
      }}
      {...(eager ? ({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>) : {})}
      {...rest}
    />
  );

  if (!sources) return imgEl;

  const isAbsoluteFill =
    typeof className === "string" &&
    /\babsolute\b|\binset-0\b/.test(className);

  if (isAbsoluteFill && meta?.lqip) {
    return (
      <picture>
        <source
          type="image/avif"
          srcSet={sources.avifSrcSet ?? sources.avif}
          sizes={effectiveSizes}
        />
        <source
          type="image/webp"
          srcSet={sources.webpSrcSet ?? sources.webp}
          sizes={effectiveSizes}
        />
        {React.cloneElement(imgEl, {
          style: {
            ...imgEl.props.style,
            backgroundImage: loaded ? "none" : `url("${meta.lqip}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          },
        })}
      </picture>
    );
  }

  return (
    <picture>
      <source
        type="image/avif"
        srcSet={sources.avifSrcSet ?? sources.avif}
        sizes={effectiveSizes}
      />
      <source
        type="image/webp"
        srcSet={sources.webpSrcSet ?? sources.webp}
        sizes={effectiveSizes}
      />
      {imgEl}
    </picture>
  );
}
