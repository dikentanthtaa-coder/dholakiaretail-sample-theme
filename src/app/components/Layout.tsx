import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollProgress } from "./ScrollProgress";
import { RouteSeo } from "./ui/RouteSeo";
import { OrganizationJsonLd } from "./ui/Seo";
import { IdlePrefetch } from "./ui/IdlePrefetch";
import { VideoPrefetcher } from "./ui/VideoPrefetcher";

export { navLinks, LOGO_URL } from "./constants";

export function Layout() {
  const location = useLocation();

  /**
   * Route-change scroll handling.
   *
   *   - No hash → reset to top of viewport (instant jump; smooth would
   *     race a half-rendered lazy chunk and look glitchy).
   *   - With hash → smooth-scroll to the element with that id, but the
   *     element may not exist yet if the route is still loading its
   *     lazy chunk. We try once immediately, then attach a short-lived
   *     MutationObserver so the scroll fires the moment the element
   *     appears in the DOM. The observer self-disconnects after 6 s
   *     to avoid leaks if the target id was a typo.
   */
  useEffect(() => {
    const targetId = location.hash ? location.hash.slice(1) : "";

    if (!targetId) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      return;
    }

    let scrolled = false;
    const tryScroll = () => {
      const el = document.getElementById(targetId);
      if (!el) return false;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // For form anchors, focus the first interactive control so
      // keyboard users continue without a stray tab press.
      const firstFocusable = el.querySelector<HTMLElement>(
        "input, select, textarea, button, [tabindex]"
      );
      // Defer the focus until the smooth scroll has finished — otherwise
      // the browser snaps the focus target into view instantly and
      // overrides the smooth animation.
      window.setTimeout(() => firstFocusable?.focus({ preventScroll: true }), 700);
      scrolled = true;
      return true;
    };

    if (tryScroll()) return;

    const mo = new MutationObserver(() => {
      if (scrolled) return;
      if (tryScroll()) mo.disconnect();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    const timeout = window.setTimeout(() => mo.disconnect(), 6000);
    return () => {
      mo.disconnect();
      window.clearTimeout(timeout);
    };
  }, [location.pathname, location.hash, location.search]);

  return (
    <div className="min-h-screen bg-bg-deep text-text-primary selection:bg-[#3B6FFF] selection:text-white overflow-x-hidden font-dm">
      <RouteSeo />
      <OrganizationJsonLd />
      <IdlePrefetch />
      <VideoPrefetcher />
      <ScrollProgress />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
