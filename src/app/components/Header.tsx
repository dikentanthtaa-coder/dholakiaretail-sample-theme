import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, ChevronDown, ArrowUpRight, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LOGO_URL, navLinks } from "./constants";
import { useTheme } from "../context/ThemeContext";

interface HeaderProps {
  variant?: "global" | "hero";
}

export function Header({ variant = "global" }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMobileOpen(false);
    setPortfolioOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The "global" header is hidden on the homepage because the Hero section renders its own "hero" variant
  if (variant === "global" && location.pathname === "/") return null;

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 pt-4">
          {/* Floating glass pill container */}
          <motion.div
            animate={{
              backgroundColor: scrolled ? (theme === 'dark' ? "rgba(10, 10, 10, 0.82)" : "rgba(255, 255, 255, 0.82)") : "var(--glass-bg)",
              borderColor: scrolled ? "rgba(255,255,255,0.08)" : "var(--glass-border)",
            }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="rounded-2xl border px-4 md:px-6 flex items-center justify-between h-[60px] backdrop-blur-[24px] saturate-[1.6]"
            style={{
              boxShadow: scrolled
                ? "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)"
                : "0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group z-50 shrink-0">
              <img
                src={LOGO_URL}
                alt="Dholakia Retail Logo"
                className={`h-8 w-auto object-contain transition-all duration-300 ${theme === 'dark' ? 'brightness-0 invert opacity-90 group-hover:opacity-100' : 'opacity-100'}`}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.classList.remove("hidden");
                  e.currentTarget.nextElementSibling?.classList.add("flex");
                }}
              />
              <div className="hidden items-center gap-1.5">
                <span className={`font-syne text-[18px] font-bold tracking-[-0.02em] transition-colors text-text-primary group-hover:text-text-primary/70`}>
                  DHOLAKIA
                </span>
                <span className={`font-grotesk text-[9px] font-normal tracking-[0.2em] uppercase text-text-muted`}>
                  Retail
                </span>
              </div>
            </Link>

            {/* Center Nav Links — floating pill style */}
            <nav className="hidden lg:flex items-center gap-1 mx-auto">
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={() => setPortfolioOpen(true)}
                    onMouseLeave={() => setPortfolioOpen(false)}
                  >
                    <Link
                      to={link.path}
                      className={`font-dm flex items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 text-[13px] font-medium ${isActive(link.path)
                          ? "text-text-primary bg-bg-surface-elevated"
                          : "text-text-secondary hover:text-text-primary hover:bg-glass-bg"
                        }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-300 opacity-50 ${portfolioOpen ? "rotate-180" : ""}`}
                      />
                    </Link>

                    {/* Modern dropdown */}
                    <AnimatePresence>
                      {portfolioOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                        >
                          <div
                            className="rounded-2xl border border-glass-border py-2 min-w-[220px] overflow-hidden backdrop-blur-[24px] saturate-[1.5]"
                            style={{
                              background: theme === 'dark' ? "rgba(12, 12, 12, 0.92)" : "rgba(255, 255, 255, 0.92)",
                              boxShadow: "0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
                            }}
                          >
                            {link.children.map((child, i) => (
                              <motion.div
                                key={child.path}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.04, duration: 0.3 }}
                              >
                                <Link
                                  to={child.path}
                                  className="font-dm group flex items-center justify-between px-5 py-3 text-text-muted hover:text-text-primary hover:bg-glass-bg transition-all duration-200 text-[13.5px] font-medium"
                                >
                                  <span className="flex items-center gap-2.5">
                                    <span className="w-1 h-1 rounded-full bg-text-muted transition-colors" />
                                    {child.label}
                                  </span>
                                  <ArrowUpRight
                                    size={13}
                                    className="opacity-0 translate-y-1 group-hover:opacity-50 group-hover:translate-y-0 transition-all duration-300"
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
                    className={`font-dm px-4 py-2 rounded-xl transition-all duration-300 text-[13px] font-medium ${isActive(link.path)
                        ? "text-text-primary bg-text-primary/10"
                        : "text-text-secondary hover:text-text-primary hover:bg-glass-bg"
                      }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Right side — CTA + Theme Toggle + mobile toggle */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl border border-glass-border bg-glass-bg text-text-primary hover:bg-glass-bg/20 transition-all duration-300 group relative overflow-hidden"
                aria-label="Toggle Theme"
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div
                      key="sun"
                      initial={{ y: 20, opacity: 0, scale: 0.5 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -20, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3, ease: "backOut" }}
                    >
                      <Sun size={18} className="text-amber-300" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ y: 20, opacity: 0, scale: 0.5 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -20, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3, ease: "backOut" }}
                    >
                      <Moon size={18} className="text-blue-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <Link
                to="/contact"
                className="font-dm hidden lg:inline-flex items-center gap-2 px-5 py-2 rounded-xl text-text-primary hover:text-text-primary/80 transition-all duration-300 group text-[13px] font-bold border border-glass-border"
                style={{
                  background: theme === 'dark'
                    ? "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))"
                    : "linear-gradient(135deg, rgba(0,0,0,0.06), rgba(0,0,0,0.02))",
                }}
              >
                Get in Touch
                <ArrowUpRight size={14} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </Link>

              <button
                className="lg:hidden text-text-primary p-2 rounded-xl hover:bg-white/10 transition-colors z-50 relative"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X size={22} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu size={22} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Cinematic Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 lg:hidden z-40 bg-bg-deep/97 backdrop-blur-[20px]"
          >
            <div className="flex flex-col justify-center items-center h-full px-8">
              <div className="space-y-5 text-center">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`font-dm block transition-colors duration-300 text-[clamp(1.8rem,7vw,2.8rem)] font-bold tracking-[-0.03em] leading-[1.3] ${isActive(link.path) ? "text-text-primary" : "text-text-dim hover:text-text-primary"
                        }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Theme Toggle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-12 flex flex-col items-center gap-6"
              >
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-3 px-6 py-3 rounded-full border border-glass-border bg-glass-bg text-text-primary"
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                  <span className="font-dm font-bold">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>

                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="font-dm inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-text-primary text-bg-deep transition-colors hover:bg-text-primary/90 text-[15px] font-bold"
                >
                  Get in Touch
                  <ArrowUpRight size={16} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
