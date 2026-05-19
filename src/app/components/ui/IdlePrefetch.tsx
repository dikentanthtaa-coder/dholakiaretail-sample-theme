import { useEffect } from "react";
import { useLocation } from "react-router";
import { getNetworkProfile, whenIdle } from "@/lib/network";

/**
 * After the current route mounts and the browser goes idle, prefetch the
 * chunks for the routes the user is most likely to navigate to next.
 *
 *   - From /                       → /the-group, /portfolio
 *   - From /portfolio              → /portfolio/mayave, /craftsmanship
 *   - From /portfolio/:slug        → /craftsmanship, /sustainability
 *   - default                      → /contact (footer CTA target everywhere)
 *
 * Skipped if the user is on saveData, slow-2g/2g/3g, or low-end hardware —
 * those users get only what they ask for, when they ask for it.
 *
 * Prefetching is dynamic `import()` calls; Vite resolves them to the same
 * already-hashed chunk URLs so the service worker can persist them. After
 * the prefetch, navigating that route is effectively free.
 */
const PREFETCHERS: Record<string, Array<() => Promise<unknown>>> = {
  "/": [
    () => import("../AboutPage"),
    () => import("../PortfolioPage"),
  ],
  "/the-group": [
    () => import("../PortfolioPage"),
    () => import("../CraftsmanshipPage"),
  ],
  "/portfolio": [
    () => import("../BrandPage"),
    () => import("../CraftsmanshipPage"),
  ],
  "/portfolio/mayave": [
    () => import("../CraftsmanshipPage"),
    () => import("../SustainabilityPage"),
  ],
  "/craftsmanship": [
    () => import("../SustainabilityPage"),
    () => import("../InnovationPage"),
  ],
  "/sustainability": [() => import("../InnovationPage")],
  "/innovation": [() => import("../GlobalPresencePage")],
  "/news": [() => import("../NewsArticlePage")],
  "/blog": [() => import("../BlogPostPage")],
  "/careers": [() => import("../CareerDetailPage")],
};

const FALLBACK = [() => import("../ContactPage")];

export function IdlePrefetch() {
  const { pathname } = useLocation();
  useEffect(() => {
    const net = getNetworkProfile();
    if (net.slow || net.saveData || net.lowEnd) return;
    const tasks = PREFETCHERS[pathname] ?? FALLBACK;
    const cancels: Array<() => void> = [];
    for (const task of tasks) {
      cancels.push(
        whenIdle(() => {
          task().catch(() => {});
        }, 3000)
      );
    }
    return () => cancels.forEach((c) => c());
  }, [pathname]);
  return null;
}
