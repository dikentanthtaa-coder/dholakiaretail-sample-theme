import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollProgress } from "./ScrollProgress";

export { navLinks, LOGO_URL } from "./constants";

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-bg-surface text-text-primary font-dm selection:bg-brand-primary selection:text-white">
      <ScrollProgress />
      <Header variant="global" />
      <main className="pt-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
