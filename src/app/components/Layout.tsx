import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollProgress } from "./ScrollProgress";
import { RouteSeo } from "./ui/RouteSeo";
import { OrganizationJsonLd } from "./ui/Seo";

export { navLinks, LOGO_URL } from "./constants";

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    // Reset scroll on route change unless there's an in-page anchor
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    // Skip the animated default — for top-of-page reset, a hard jump avoids
    // a perceptible scroll back-up on slow chunks.
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-bg-deep text-text-primary selection:bg-[#3B6FFF] selection:text-white overflow-x-hidden font-dm">
      <RouteSeo />
      <OrganizationJsonLd />
      <ScrollProgress />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
