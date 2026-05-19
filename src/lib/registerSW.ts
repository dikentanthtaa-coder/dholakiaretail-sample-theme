/**
 * Service worker registration.
 *
 * Production-only. Dev gets vanilla fetches so HMR isn't broken by stale
 * cache. We register on `load` (not on script eval) so the SW doesn't
 * compete with the LCP for bandwidth on the very first paint.
 *
 * The hook prompts the page to swap in a new SW when one is waiting —
 * keeps long-lived tabs in sync after a deploy without needing the user
 * to hard-reload.
 */
export function registerServiceWorker() {
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator)) return;
  if (!import.meta.env.PROD) return;

  const onLoad = () => {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((reg) => {
        if (reg.waiting) {
          reg.waiting.postMessage("SKIP_WAITING");
        }
        reg.addEventListener("updatefound", () => {
          const next = reg.installing;
          if (!next) return;
          next.addEventListener("statechange", () => {
            if (
              next.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // A new SW is ready; activate it now so the next route
              // navigation already runs against the fresh assets.
              next.postMessage("SKIP_WAITING");
            }
          });
        });
      })
      .catch(() => {
        // Swallow — SW failures must never break the app.
      });

    // If the controller changes (i.e. the new SW just took over) and we
    // had a previous one, reload once to make sure we're on consistent
    // assets. Guarded so we don't loop.
    let reloading = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (reloading) return;
      reloading = true;
      window.location.reload();
    });
  };

  if (document.readyState === "complete") onLoad();
  else window.addEventListener("load", onLoad, { once: true });
}
