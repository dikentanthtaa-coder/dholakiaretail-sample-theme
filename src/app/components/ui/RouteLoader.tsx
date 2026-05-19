import { useEffect, useState } from "react";

/**
 * Premium full-bleed skeleton shown during React.lazy() chunk loading.
 *
 * Mounted only when a route Suspense triggers — for an already-cached chunk
 * the user never sees it. We delay rendering 80ms to avoid flashing the
 * loader on instantaneous resolutions.
 */
export function RouteLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setShow(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  if (!show) return <div className="min-h-screen bg-[#0B1426]" aria-hidden />;

  return (
    <div
      role="status"
      aria-label="Loading"
      className="min-h-screen bg-[#0B1426] flex flex-col"
    >
      <div className="h-[72px] border-b border-white/[0.04]" />

      <div className="flex-1 max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-20 py-20 flex flex-col gap-16">
        <div className="space-y-5">
          <div className="shimmer h-4 w-32 rounded-sm" />
          <div className="shimmer h-12 sm:h-14 lg:h-20 w-[80%] rounded-sm" />
          <div className="shimmer h-12 sm:h-14 lg:h-20 w-[60%] rounded-sm" />
          <div className="shimmer h-4 w-[40%] rounded-sm mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[0, 1, 2].map((i) => (
            <div key={i} className="shimmer aspect-[4/5] rounded-sm" />
          ))}
        </div>
      </div>

      <span className="sr-only">Loading content…</span>
    </div>
  );
}

/** Inline shimmer block — reusable in any layout. */
export function Shimmer({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return <span className={`shimmer block ${className ?? ""}`} style={style} />;
}
