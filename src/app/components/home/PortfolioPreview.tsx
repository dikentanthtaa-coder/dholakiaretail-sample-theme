import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ease, MAYAVE } from "./constants";

interface PortfolioPreviewProps {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}

export function PortfolioPreviewSection({ smoothX, smoothY }: PortfolioPreviewProps) {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const heroOp = useTransform(heroScroll, [0, 0.65], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "40%"]);

  const orbGlowX = useTransform(smoothX, [-1, 1], ["4%", "-4%"]);
  const orbGlowY = useTransform(smoothY, [-1, 1], ["4%", "-4%"]);

  return (
    <>
      {/* ── PORTFOLIO PREVIEW HEADER ── */}
      <section className="pt-32 lg:pt-48 bg-bg-deep">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: ease }}
            className="flex flex-col md:flex-row md:items-end md:justify-between"
          >
            <div>
              <span className="font-grotesk text-text-secondary tracking-[0.22em] uppercase text-[12px] font-semibold">Portfolio</span>
              <h2 className="font-syne mt-4 text-text-primary tracking-tighter text-[clamp(2.5rem,4vw,4.2rem)] font-bold leading-[1.1]">House of Brands</h2>
            </div>
            <Link to="/portfolio" data-cursor-hover
              className="font-grotesk group inline-flex items-center gap-2 mt-6 md:mt-0 text-text-secondary hover:text-text-primary transition-colors text-[13px] font-semibold tracking-[0.1em] uppercase"
            >View Complete Portfolio <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" /></Link>
          </motion.div>
        </div>
      </section>

      {/* ── MAYAVE FULL SECTION ── */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ minHeight: "100svh", display: "flex", alignItems: "flex-end" }}>
        {/* Background */}
        <div className="absolute inset-0">
          <motion.div style={{ y: heroY, scale: 1.08 }} className="absolute inset-0 w-full h-full">
            <motion.div style={{ x: useTransform(smoothX, [-1, 1], ["2%", "-2%"]), y: useTransform(smoothY, [-1, 1], ["2%", "-2%"]) }} className="w-full h-full">
              <ImageWithFallback src={MAYAVE.img} alt="Mayavé bespoke jewellery" className="w-full h-full object-cover opacity-60" />
            </motion.div>
          </motion.div>
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, var(--bg-deep) 0%, transparent 20%, transparent 55%, var(--bg-deep) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, var(--bg-deep) 0%, transparent 50%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\" opacity=\"1\"/%3E%3C/svg%3E')", opacity: 0.035 }} />

        {/* Atmospheric gold glow */}
        <motion.div
          style={{
            x: orbGlowX,
            y: orbGlowY,
            background: "radial-gradient(circle, rgba(210,165,60,0.08) 0%, transparent 70%)",
            filter: "blur(70px)"
          }}
          className="absolute top-[20%] right-[15%] w-[40vw] h-[40vw] rounded-full pointer-events-none"
        />

        {/* Hero content */}
        <motion.div className="text-text-primary relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-14 pb-28 lg:pb-36">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: ease }}
            className="flex items-center gap-4 mb-10"
          >
            <span
              className="font-grotesk inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glass-border backdrop-blur-md bg-bg-surface-elevated text-text-secondary text-[11px] font-bold tracking-[0.18em] uppercase shadow-sm"
            >
              Portfolio
            </span>
            <span className="block h-px bg-glass-border w-12" />
            <span
              className="font-grotesk inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glass-border bg-bg-surface-elevated text-text-muted text-[11px] font-semibold tracking-[0.12em] uppercase shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary" />
              </span>
              {MAYAVE.tag}
            </span>
          </motion.div>

          <motion.h3
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: ease }}
            className="font-syne text-text-primary tracking-tighter mb-2 text-[clamp(3.5rem,7vw,8rem)] font-extrabold leading-[0.92] tracking-[-0.03em] whitespace-nowrap"
          >
            {MAYAVE.name}
          </motion.h3>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, delay: 0.35, ease: ease }}
            className="font-syne text-text-muted italic mb-8 text-[clamp(1rem,2vw,1.4rem)] font-light leading-[1.4]"
          >
            {MAYAVE.tagline}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.48, ease: ease }}
            className="font-dm text-text-secondary mb-10 max-w-lg text-[clamp(15px,1.6vw,17px)] leading-[1.85]"
          >
            {MAYAVE.desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.58, ease: ease }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {MAYAVE.pillars.map((p) => (
              <span
                key={p}
                className="font-grotesk px-4 py-2 rounded-full bg-bg-surface-elevated border border-glass-border text-text-muted backdrop-blur-sm text-[11px] font-semibold tracking-[0.1em] uppercase shadow-sm"
              >
                {p}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.68, ease: ease }}
          >
            <a
              href={MAYAVE.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="font-grotesk group inline-flex items-center gap-3 text-[13px] font-semibold tracking-[0.12em] uppercase"
            >
              <span className="relative text-text-primary overflow-hidden pb-1">
                Visit Mayavé
                <span
                  className="absolute bottom-0 left-0 w-full h-px bg-text-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-600"
                  style={{ transitionTimingFunction: `cubic-bezier(${ease})` }}
                />
              </span>
              <span className="flex items-center justify-center w-9 h-9 rounded-full border border-glass-border text-text-primary group-hover:bg-text-primary group-hover:text-bg-deep transition-all duration-400">
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: ease }}
            className="mt-10 flex items-center justify-between"
          >
            <p className="font-dm text-text-dim max-w-sm text-[14px] leading-[1.7]">
              The first signature brand of Dholakia Retail — crafted for those who believe beauty is felt, not just seen.
            </p>
            <a
              href={MAYAVE.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="font-grotesk hidden md:flex items-center gap-2 text-text-dim hover:text-text-primary transition-colors duration-300 text-[11px] font-semibold tracking-[0.14em] uppercase"
            >
              mayave.com <ArrowRight size={12} />
            </a>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
