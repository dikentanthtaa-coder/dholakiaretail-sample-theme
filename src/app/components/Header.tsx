import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, ChevronDown, ArrowUpRight, Sun, Moon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
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
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (variant === "hero") return null;

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
        className="fixed inset-x-0 top-0 z-50 pt-4"
      >
        <div className="mx-auto max-w-[1600px] px-4 md:px-8 lg:px-12">
          <motion.div
            animate={{
              backgroundColor: scrolled ? "rgba(251, 249, 244, 0.96)" : "rgba(251, 249, 244, 0.9)",
              borderColor: "rgba(31, 33, 28, 0.08)",
              boxShadow: scrolled
                ? "0 18px 52px rgba(31, 33, 28, 0.09)"
                : "0 10px 28px rgba(31, 33, 28, 0.06)",
            }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="flex h-16 items-center gap-4 rounded-[1.5rem] border px-4 md:px-5 backdrop-blur-xl"
          >
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <img
                src={LOGO_URL}
                alt="Dholakia Retail Logo"
                className={`h-8 w-auto object-contain transition-opacity duration-300 ${theme === "dark" ? "brightness-0 invert opacity-90 group-hover:opacity-100" : "opacity-100"}`}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.classList.remove("hidden");
                  e.currentTarget.nextElementSibling?.classList.add("flex");
                }}
              />
              <div className="hidden items-center gap-1.5">
                <span className="font-syne text-[18px] font-bold tracking-[-0.02em] text-text-primary">
                  DHOLAKIA
                </span>
                <span className="font-grotesk text-[9px] font-normal uppercase tracking-[0.2em] text-text-muted">
                  Retail
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 mx-auto rounded-full border border-glass-border bg-bg-surface-elevated/75 px-2 py-1 shadow-[0_10px_24px_rgba(31,33,28,0.05)]">
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
                      className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${isActive(link.path) ? "bg-text-primary text-bg-deep" : "text-text-secondary hover:bg-bg-surface hover:text-text-primary"}`}
                    >
                      {link.label}
                      <ChevronDown size={13} className={`transition-transform duration-300 ${portfolioOpen ? "rotate-180" : ""}`} />
                    </Link>

                    <AnimatePresence>
                      {portfolioOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                          className="absolute left-0 top-full pt-3"
                        >
                          <div className="min-w-[224px] overflow-hidden rounded-[1.25rem] border border-glass-border bg-bg-surface/98 py-2 shadow-[0_20px_48px_rgba(31,33,28,0.12)] backdrop-blur-xl">
                            {link.children.map((child, i) => (
                              <motion.div
                                key={child.path}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.03, duration: 0.2 }}
                              >
                                <Link
                                  to={child.path}
                                  className="group flex items-center justify-between px-5 py-3 text-[13.5px] font-medium text-text-secondary transition-colors hover:bg-bg-surface-elevated hover:text-text-primary"
                                >
                                  <span className="flex items-center gap-2.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-brand-primary/40" />
                                    {child.label}
                                  </span>
                                  <ArrowUpRight
                                    size={13}
                                    className="opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-60 group-hover:translate-y-0"
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
                    className={`rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${isActive(link.path) ? "bg-text-primary text-bg-deep" : "text-text-secondary hover:bg-bg-surface hover:text-text-primary"}`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            <div className="ml-auto flex items-center gap-2 shrink-0">
              <button
                onClick={toggleTheme}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-glass-border bg-bg-surface-elevated text-text-primary shadow-sm transition-colors hover:bg-bg-surface"
                aria-label="Toggle Theme"
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div
                      key="sun"
                      initial={{ y: 10, opacity: 0, scale: 0.8 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -10, opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun size={17} className="text-amber-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ y: 10, opacity: 0, scale: 0.8 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -10, opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={17} className="text-slate-700" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              <Link
                to="/contact"
                className="hidden lg:inline-flex items-center gap-2 rounded-full border border-text-primary/10 bg-text-primary px-5 py-2 text-[13px] font-semibold text-bg-deep shadow-[0_12px_26px_rgba(31,33,28,0.12)] transition-transform hover:-translate-y-0.5"
              >
                Get in Touch
                <ArrowUpRight size={14} />
              </Link>

              <button
                className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-glass-border bg-bg-surface-elevated text-text-primary shadow-sm transition-colors hover:bg-bg-surface"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                      <X size={20} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                      <Menu size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px] lg:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
              className="fixed inset-x-4 top-[5.25rem] z-50 overflow-hidden rounded-[1.75rem] border border-glass-border bg-bg-surface/98 shadow-[0_30px_80px_rgba(31,33,28,0.16)] lg:hidden"
            >
              <div className="px-5 py-5">
                <div className="flex items-center justify-between border-b border-glass-border pb-4">
                  <div>
                    <p className="font-grotesk text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                      Navigation
                    </p>
                    <p className="mt-1 font-dm text-[13px] text-text-secondary">
                      Editorial header sheet
                    </p>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-glass-border bg-bg-surface-elevated text-text-primary"
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-5 py-5">
                  {navLinks.map((link) =>
                    link.children ? (
                      <div key={link.path} className="space-y-3">
                        <Link
                          to={link.path}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center justify-between rounded-2xl border border-glass-border px-4 py-3 text-[15px] font-medium transition-colors ${isActive(link.path) ? "bg-text-primary text-bg-deep" : "bg-bg-surface-elevated text-text-primary hover:bg-bg-surface"}`}
                        >
                          {link.label}
                          <ChevronDown size={14} className="opacity-50" />
                        </Link>
                        <div className="space-y-2 border-l border-glass-border pl-4">
                          {link.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              onClick={() => setMobileOpen(false)}
                              className={`block rounded-xl px-3 py-2 text-[14px] font-medium transition-colors ${isActive(child.path) ? "bg-brand-primary/8 text-text-primary" : "text-text-secondary hover:bg-bg-surface-elevated hover:text-text-primary"}`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setMobileOpen(false)}
                        className={`block rounded-2xl border px-4 py-3 text-[15px] font-medium transition-colors ${isActive(link.path) ? "border-text-primary/15 bg-text-primary text-bg-deep" : "border-glass-border bg-bg-surface-elevated text-text-primary hover:bg-bg-surface"}`}
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                </div>

                <div className="grid grid-cols-1 gap-3 border-t border-glass-border pt-5 sm:grid-cols-2">
                  <button
                    onClick={toggleTheme}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-glass-border bg-bg-surface-elevated px-5 py-3 text-[14px] font-semibold text-text-primary"
                  >
                    {theme === "dark" ? <Sun size={16} className="text-amber-500" /> : <Moon size={16} className="text-slate-700" />}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </button>

                  <Link
                    to="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-text-primary px-5 py-3 text-[14px] font-semibold text-bg-deep shadow-[0_12px_24px_rgba(31,33,28,0.12)]"
                  >
                    Get in Touch
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
