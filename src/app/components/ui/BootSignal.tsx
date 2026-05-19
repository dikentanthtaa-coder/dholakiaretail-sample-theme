import { useEffect } from "react";

/**
 * Mounted as a sibling to every lazy-loaded route component inside its
 * Suspense boundary. When this component runs its first effect, the
 * Suspense fallback has resolved, the route chunk has been parsed, and
 * the real page is sitting in the DOM — *that's* the moment the boot
 * loader is allowed to retire.
 *
 * The handshake is one-shot: index.html's gate ignores repeat calls.
 */
export function BootSignal() {
  useEffect(() => {
    // Wait one frame so the route's first paint actually lands before
    // we hand the screen over.
    const raf = window.requestAnimationFrame(() => {
      window.__bootReady?.("app");
    });
    return () => window.cancelAnimationFrame(raf);
  }, []);
  return null;
}
