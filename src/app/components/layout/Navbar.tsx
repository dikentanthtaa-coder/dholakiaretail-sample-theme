import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LOGO_URL, navLinks, inter, syne, grotesk } from "./constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setPortfolioOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hidden on homepage (navbar rendered inside hero there)
  if (location.pathname === "/") return null;

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: scrolled ? "rgba(5, 5, 5, 0.9)" : "rgba(5, 5, 5, 0)",
        backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
      }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent" }}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex items-center justify-between h-[72px]">
        <Link to="/" className="flex items-center gap-1.5 group z-50">
          <img
            src={LOGO_URL}
            alt="Dholakia Retail Logo"
            className="h-9 w-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
              e.currentTarget.nextElementSibling?.classList.add('flex');
            }}
          />
          <div className="hidden items-center gap-1.5">
            <span style={{ fontFamily: syne, fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }} className="text-white group-hover:text-white/80 transition-colors">
              DHOLAKIA
            </span>
            <span className="text-white/50" style={{ fontFamily: grotesk, fontSize: 10, fontWeight: 400, letterSpacing: "0.2em", textTransform: "uppercase" }}>Retail</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-2 bg-white/5 border border-white/10 px-2 py-1.5 rounded-full backdrop-blur-md">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => setPortfolioOpen(true)}
                onMouseLeave={() => setPortfolioOpen(false)}
              >
                <Link to={link.path} className="flex items-center gap-1.5 px-5 py-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all" style={{ fontFamily: inter, fontSize: 13, fontWeight: 500 }}>
                  {link.label} <ChevronDown size={14} className={`transition-transform duration-300 ${portfolioOpen ? "rotate-180" : ""}`} />
                </Link>
                <AnimatePresence>
                  {portfolioOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                      className="absolute top-full left-0 pt-4"
                    >
                      <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl py-3 min-w-[240px] overflow-hidden backdrop-blur-2xl">
                        {link.children.map((child, i) => (
                          <motion.div
                            key={child.path}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <Link to={child.path} className="group flex items-center justify-between px-6 py-3.5 text-white/60 hover:text-white hover:bg-white/5 transition-all" style={{ fontFamily: inter, fontSize: 14 }}>
                              {child.label}
                              <ArrowUpRight size={14} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link key={link.path} to={link.path} className="px-5 py-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all" style={{ fontFamily: inter, fontSize: 13, fontWeight: 500 }}>
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/contact" className="relative overflow-hidden group px-7 py-3 bg-white text-black rounded-full transition-all" style={{ fontFamily: inter, fontSize: 13, fontWeight: 600 }}>
            <span className="relative z-10">Get in Touch</span>
            <div className="absolute inset-0 bg-neutral-200 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </Link>
        </div>

        <button className="lg:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors z-50 relative" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Cinematic Mobile Nav Takeover */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 lg:hidden bg-[#050505] z-40 flex flex-col justify-center px-8"
          >
            <div className="space-y-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.05), duration: 0.5 }}
                >
                  <Link to={link.path} className="block text-white/80 hover:text-white transition-colors" style={{ fontFamily: syne, fontSize: "clamp(2rem, 8vw, 3rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
