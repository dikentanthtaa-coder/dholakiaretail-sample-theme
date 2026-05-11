import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useRef } from "react";
import { ease } from "./constants";
import { IMG } from "./constants";

interface HeroProps {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}

/**
 * P01-S01 — Cinematic Hero
 * 100vh full-bleed silent video loop with overlaid wordmark + tagline + CTA
 * Mouse Parallax: Hero3LayerParallax (background ±15px, overlay ±5px counter, foreground ±8px counter)
 */
export function Hero({ smoothX, smoothY }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOp = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  // Hero3LayerParallax — bg ±15px, fg ±8px counter
  const bgX = useTransform(smoothX, [-1, 1], ["15px", "-15px"]);
  const bgY = useTransform(smoothY, [-1, 1], ["15px", "-15px"]);
  const fgX = useTransform(smoothX, [-1, 1], ["-8px", "8px"]);
  const fgY = useTransform(smoothY, [-1, 1], ["-8px", "8px"]);

  return (
    <section
      ref={heroRef}
      data-header-theme="dark"
      className="relative h-screen min-h-[640px] overflow-hidden bg-[#0B1426]"
    >
      {/* Layer 1 — background video (P01-S01 video) over poster image (P01-S01 image) */}
      <motion.div style={{ x: bgX, y: bgY, scale: heroScale }} className="absolute inset-0">
        <img
          src={IMG.heroPoster}
          alt="Dholakia Retail editorial cover"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={IMG.heroPoster}
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={IMG.heroVideo} type="video/mp4" />
        </video>
      </motion.div>

      {/* Layer 2 — gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1426]/40 via-[#0B1426]/30 to-[#0B1426]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1426]/60 via-transparent to-transparent" />

      {/* Subtle film grain */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Layer 3 — foreground typography */}
      <motion.div
        style={{ opacity: heroOp, x: fgX, y: fgY }}
        className="relative z-10 flex flex-col justify-end h-full px-6 md:px-12 lg:px-20 pb-20 lg:pb-32 max-w-[1440px] mx-auto"
      >
        <div className="overflow-hidden mb-5">
          <motion.p
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease }}
            className="font-dm text-white/70 text-[12px] font-medium tracking-[0.22em] uppercase"
          >
            Dholakia Retail Private Limited
          </motion.p>
        </div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="font-syne text-white font-normal leading-[1.04] tracking-[-0.02em] max-w-[18ch] text-[clamp(2.6rem,6vw,5rem)]"
        >
          {"Building the Future of".split(" ").map((w, i) => (
            <motion.span
              key={i}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.6 + i * 0.06, ease }}
              className="inline-block mr-[0.2em]"
            >
              {w}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.95, ease }}
            className="inline-block italic font-light text-white/90"
          >
            Luxury Retail
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.25, ease }}
          className="font-dm text-white/70 max-w-[48ch] mt-8 text-[clamp(1rem,1.4vw,1.15rem)] leading-[1.7] font-light"
        >
          Dholakia Retail Private Limited serves as the corporate foundation for a growing portfolio
          of luxury jewellery brands, bringing together heritage, precision, and a future-facing
          approach to brand creation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.5, ease }}
          className="flex flex-wrap gap-3 mt-10"
        >
          <Link
            to="/the-group"
            className="font-dm group inline-flex items-center gap-2 px-7 h-12 bg-[#3B6FFF] hover:bg-[#14275C] text-white rounded-sm text-[14px] font-semibold transition-colors duration-300"
          >
            Explore the Group
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link
            to="/portfolio"
            className="font-dm inline-flex items-center gap-2 px-7 h-12 border border-white/30 text-white hover:border-white hover:bg-white/10 rounded-sm text-[14px] font-medium transition-all duration-300"
          >
            View Portfolio
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 right-6 lg:right-12 flex flex-col items-center gap-2 z-10 text-white/60"
      >
        <span className="font-dm text-[10px] tracking-[0.18em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
