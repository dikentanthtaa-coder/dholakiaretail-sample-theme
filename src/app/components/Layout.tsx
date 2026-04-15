import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { MagneticCursor } from "./MagneticCursor";
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
    <div className="min-h-screen bg-bg-deep text-text-primary selection:bg-brand-primary selection:text-white overflow-x-hidden font-dm" style={{ cursor: "none" }}>

      {/* Global Magnetic Cursor */}
      <MagneticCursor />

      {/* Cinematic Scroll Progress Bar */}
      <ScrollProgress />

      {/* Unified Header */}
      <Header variant="global" />

      <main className="pt-0">
        <Outlet />
      </main>

      {/* Unified Footer */}
      <Footer />
    </div>
  );
}
