import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollProgress } from "./ScrollProgress";

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
    window.scrollTo({ top: 0 });
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-bg-deep text-text-primary selection:bg-[#3B6FFF] selection:text-white overflow-x-hidden font-dm">
      <ScrollProgress />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
