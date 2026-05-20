import { useEffect, useState, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LOGO_URL, navLinks } from "./constants";

type HeaderSurface = "dark" | "light";

const HEADER_HEIGHT = 80;
const SCROLL_BREAK = 48;

/**
 * Section-aware header theme detection.
 *
 * Each <section> in a page declares `data-header-theme="dark" | "light"`.
 * The header tracks scroll position and determines which section currently
 * sits beneath the header line, then adapts:
 *
 *  - Dark section under header → white logo, white nav, white CTAs.
 *  - Light section under header → black logo, navy nav, navy CTAs.
 *
 * Sections without an explicit attribute default to "light".
 *
 * The "scrolled" flag controls the transparent → solid glass transition; the
 * solid surface itself is themed per the active section so contrast holds at
 * every scroll position.
 */
function useHeaderSurface(routeKey: string) {
  const [surface, setSurface] = useState<HeaderSurface>("light");
  const [scrolled, setScrolled] = useState(false);

  const rafRef = useRef<number | null>(null);

  const compute = useCallback(() => {
    setScrolled(window.scrollY > SCROLL_BREAK);

    const probe = HEADER_HEIGHT / 2;
    const targets = document.querySelectorAll<HTMLElement>("[data-header-theme]");
    let active: HeaderSurface = "light";

    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= probe && rect.bottom > probe) {
        const t = el.getAttribute("data-header-theme");
        if (t === "dark" || t === "light") active = t;
      }
    });

    setSurface(active);
  }, []);

  /**
   * rAF-throttled scroll/resize handler. Without this, the section-aware
   * theme detection runs once per scroll event (~ once per pixel) — burning
   * main-thread time for a state we only need to refresh once per frame.
   */
  const scheduleCompute = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      compute();
    });
  }, [compute]);

  useEffect(() => {
    const t = window.setTimeout(compute, 30);
    compute();
    window.addEventListener("scroll", scheduleCompute, { passive: true });
    window.addEventListener("resize", scheduleCompute);

    /*
     * Recompute whenever the DOM changes shape.
     *
     * Critical on first load: the Header mounts inside <Layout> BEFORE the
     * lazy route chunk arrives. At that moment <Outlet> is showing the
     * Suspense fallback (RouteLoader), which has no [data-header-theme]
     * sections — so the probe sees nothing and the header defaults to the
     * "light" surface (black logo & text).
     *
     * A few hundred milliseconds later the real HomePage mounts and
     * inserts the dark hero section with data-header-theme="dark". Without
     * this MutationObserver nothing triggers a recompute and the header
     * stays black on top of the dark hero until the user happens to scroll
     * — exactly the bug shown in the reload screenshot.
     *
     * scheduleCompute is rAF-coalesced, so dozens of inserts during route
     * mount collapse into one compute on the next frame.
     */
    const mo = new MutationObserver(scheduleCompute);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", scheduleCompute);
      window.removeEventListener("resize", scheduleCompute);
      mo.disconnect();
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [compute, scheduleCompute, routeKey]);

  return { surface, scrolled };
}

interface HeaderProps {
  variant?: "global" | "hero";
}

export function Header(_props: HeaderProps = {}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const location = useLocation();

  const { surface, scrolled } = useHeaderSurface(location.pathname + location.hash);

  useEffect(() => {
    setMobileOpen(false);
    setPortfolioOpen(false);
  }, [location]);

  // ── Surface-aware tokens ──────────────────────────────────────────────
  const isDark = surface === "dark";
  const overSection = !scrolled; // transparent over its section

  // Logo: invert (white) on dark, plain black on light
  const logoFilter = isDark ? "brightness(0) invert(1)" : "brightness(0)";

  // Nav link colours
  const navIdle = isDark ? "text-white/82 hover:text-white" : "text-[#0B1426]/80 hover:text-[#3B6FFF]";
  const navActive = isDark ? "text-white" : "text-[#3B6FFF]";
  const navUnderline = isDark ? "bg-white" : "bg-[#3B6FFF]";

  // Solid bar background: light off-white when on light section, deep navy when on dark
  const solidBg = isDark ? "rgba(11, 20, 38, 0.88)" : "rgba(245, 245, 247, 0.92)";
  const solidBorder = isDark ? "rgba(255, 255, 255, 0.10)" : "rgba(11, 20, 38, 0.10)";

  // Mobile-menu icon colour
  const hamburgerColor = isDark ? "text-white" : "text-[#0B1426]";

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1], delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <motion.div
          animate={{
            backgroundColor: overSection ? "rgba(0,0,0,0)" : solidBg,
            borderBottomColor: overSection ? "rgba(0,0,0,0)" : solidBorder,
            backdropFilter: overSection ? "blur(0px)" : "blur(16px)",
          }}
          transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
          className="border-b"
          style={{
            WebkitBackdropFilter: overSection ? undefined : "blur(16px) saturate(140%)",
          }}
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between gap-4 h-[64px] sm:h-[68px] xl:h-[72px]">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center group shrink-0"
              aria-label="Dholakia Retail home"
            >
              <img
                src={LOGO_URL}
                alt="Dholakia Retail"
                width={140}
                height={28}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="h-6 sm:h-7 w-auto object-contain transition-[filter] duration-300"
                style={{ filter: logoFilter }}
              />
            </Link>

            {/* Centre Nav — desktop only at xl ≥ 1280px (1024–1279 → mobile drawer) */}
            <nav
              className="hidden xl:flex items-center gap-0 min-w-0 flex-shrink"
              aria-label="Primary"
            >
              {navLinks.map((link) =>
                "children" in link && link.children ? (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={() => setPortfolioOpen(true)}
                    onMouseLeave={() => setPortfolioOpen(false)}
                  >
                    <Link
                      to={link.path}
                      className={`font-dm flex items-center gap-1 whitespace-nowrap px-3 2xl:px-4 py-2 transition-colors duration-300 text-[13px] 2xl:text-[13.5px] font-medium tracking-[0.01em] ${
                        isActive(link.path) ? navActive : navIdle
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={13}
                        className={`opacity-60 transition-transform duration-300 ${portfolioOpen ? "rotate-180" : ""}`}
                      />
                      {isActive(link.path) && (
                        <span
                          className={`absolute bottom-1 left-3 2xl:left-4 right-7 h-px ${navUnderline}`}
                        />
                      )}
                    </Link>

                    <AnimatePresence>
                      {portfolioOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.22, ease: [0.65, 0, 0.35, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                        >
                          {/* Dropdown surface stays light for legibility regardless of header theme */}
                          <div className="bg-white border border-[#0B1426]/10 rounded-sm py-2 min-w-[220px] shadow-[0_18px_48px_rgba(11,20,38,0.18)]">
                            {link.children.map((child, i) => (
                              <motion.div
                                key={child.path}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.04, duration: 0.25 }}
                              >
                                <Link
                                  to={child.path}
                                  className="font-dm group flex items-center justify-between px-5 py-3 text-[#0B1426]/75 hover:text-[#3B6FFF] hover:bg-[#F5F5F7] transition-all duration-200 text-[13.5px] font-medium"
                                >
                                  {child.label}
                                  <ArrowRight
                                    size={13}
                                    className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#3B6FFF]"
                                  />
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative font-dm whitespace-nowrap px-3 2xl:px-4 py-2 transition-colors duration-300 text-[13px] 2xl:text-[13.5px] font-medium tracking-[0.01em] ${
                      isActive(link.path) ? navActive : navIdle
                    }`}
                  >
                    {link.label}
                    {isActive(link.path) && (
                      <span className={`absolute bottom-1 left-3 2xl:left-4 right-3 2xl:right-4 h-px ${navUnderline}`} />
                    )}
                  </Link>
                )
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2 shrink-0">
              {/* <button
                onClick={toggleTheme}
                className={`hidden sm:inline-flex p-2.5 rounded-sm transition-all duration-300 ${iconClass}`}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === "dark" ? (
                    <motion.div
                      key="sun"
                      initial={{ y: 12, opacity: 0, rotate: -45 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: -12, opacity: 0, rotate: 45 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Sun size={17} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ y: 12, opacity: 0, rotate: 45 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: -12, opacity: 0, rotate: -45 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Moon size={17} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button> */}

              {/* Contact CTA — visible at xl ≥ 1280px (matches desktop nav breakpoint) */}
              <Link
                to="/contact"
                aria-label="Go to contact page"
                className="font-dm hidden xl:inline-flex items-center gap-2 whitespace-nowrap px-4 2xl:px-5 h-9 rounded-sm text-white text-[12.5px] 2xl:text-[13px] font-semibold bg-[#3B6FFF] hover:bg-[#14275C] transition-colors duration-300 group shrink-0"
              >
                Contact us
                <ArrowRight
                  size={14}
                  className="-translate-x-1 group-hover:translate-x-0 transition-all duration-300"
                />
              </Link>

              <button
                className={`xl:hidden p-2 transition-colors ${hamburgerColor}`}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <X size={22} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Menu size={22} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile drawer — always dark for legibility, no surface adaptation needed */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 xl:hidden z-40 bg-[#0B1426]"
          >
            <div className="flex flex-col justify-center items-center h-full px-8 py-24">
              <div className="space-y-3 text-center w-full max-w-md">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      delay: 0.06 + i * 0.04,
                      duration: 0.4,
                      ease: [0.65, 0, 0.35, 1],
                    }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`font-syne block transition-colors duration-300 text-[clamp(1.6rem,6vw,2.4rem)] font-normal tracking-[-0.01em] leading-[1.15] ${
                        isActive(link.path) ? "text-[#3B6FFF]" : "text-white/85 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 flex flex-col items-center gap-4"
              >
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="font-dm inline-flex items-center gap-2 px-7 h-11 rounded-sm bg-[#3B6FFF] text-white hover:bg-[#14275C] transition-colors text-[14px] font-semibold"
                >
                  Contact us
                  <ArrowRight size={16} />
                </Link>
                {/* <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-sm border border-white/15 text-white/80 hover:text-white hover:border-white/30 transition-all"
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                  <span className="font-dm text-[12.5px] font-medium tracking-[0.04em] uppercase">
                    {theme === "dark" ? "Light mode" : "Dark mode"}
                  </span>
                </button> */}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
