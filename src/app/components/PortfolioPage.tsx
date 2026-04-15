import { ArrowRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  MotionValue,
} from "motion/react";
import { useRef, useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const ease = [0.76, 0, 0.24, 1] as const;

// ─── Single brand ─────────────────────────────────────────────────────────
const MAYAVE = {
  name: "Mayavé",
  tag: "Coming Soon",
  tagline: "Where Silence Becomes Jewellery",
  category: "Bespoke Ultra-Luxury",
  desc: "A new chapter in bespoke luxury. Mayavé is Dholakia Retail's first and defining expression of refined artistry — where every creation is a whisper of rare beauty, crafted for those who seek the extraordinary.",
  long: "Rooted in the DNA of India's finest diamond heritage and inspired by global luxury codes, Mayavé is built for a clientele that values provenance, silence, and the poetry of the handmade. Each piece is conceived as a singular statement — not merely worn, but experienced.",
  pillars: ["Bespoke Craftsmanship", "Rare Materials", "Timeless Design", "Invitation Only"],
  audience: "Connoisseurs & Ultra-HNI Collectors",
  origin: "India",
  segment: "Bespoke Fine Jewellery",
  img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=90&w=2400&auto=format&fit=crop",
  imgAlt: "Mayavé bespoke luxury jewellery",
  url: "https://mayave.com/",
};

const HIGHLIGHTS = [
  { value: "01", label: "Flagship Brand" },
  { value: "∞", label: "Bespoke Pieces" },
  { value: "100%", label: "Handcrafted" },
  { value: "2026", label: "Launch Year" },
];

// ─── Global mouse parallax hook ───────────────────────────────────────────
function useMouseParallax() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { damping: 60, stiffness: 350 });
  const smoothY = useSpring(rawY, { damping: 60, stiffness: 350 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);
  return { smoothX, smoothY };
}

// ─── Magnetic cursor ──────────────────────────────────────────────────────
function MagneticCursor() {
  const cx = useMotionValue(-100);
  const cy = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);
  const sx = useSpring(cx, { damping: 28, stiffness: 300 });
  const sy = useSpring(cy, { damping: 28, stiffness: 300 });
  const tx = useSpring(trailX, { damping: 40, stiffness: 180 });
  const ty = useSpring(trailY, { damping: 40, stiffness: 180 });
  const [isHover, setIsHover] = useState(false);
  const scale = useSpring(isHover ? 2.4 : 1, { damping: 20, stiffness: 300 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cx.set(e.clientX - 10); cy.set(e.clientY - 10);
      trailX.set(e.clientX - 20); trailY.set(e.clientY - 20);
    };
    const onEnter = () => setIsHover(true);
    const onLeave = () => setIsHover(false);
    const els = document.querySelectorAll("a, button, [data-cursor-hover]");
    window.addEventListener("mousemove", onMove);
    els.forEach(el => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); });
    return () => {
      window.removeEventListener("mousemove", onMove);
      els.forEach(el => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); });
    };
  }, [cx, cy, trailX, trailY]);
  return (
    <>
      <motion.div style={{ x: tx, y: ty, scale }} className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white/40 pointer-events-none z-[9999] mix-blend-difference" />
      <motion.div style={{ x: sx, y: sy }} className="fixed top-0 left-0 w-5 h-5 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference" />
    </>
  );
}

// ─── Parallax image ───────────────────────────────────────────────────────
function ParallaxImage({
  src, alt, className, smoothX, smoothY,
}: {
  src: string; alt: string; className?: string;
  smoothX: MotionValue<number>; smoothY: MotionValue<number>;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scrollY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const mx = useTransform(smoothX, [-1, 1], ["1.8%", "-1.8%"]);
  const my = useTransform(smoothY, [-1, 1], ["1.8%", "-1.8%"]);
  return (
    <div ref={ref} className={`overflow-hidden relative ${className ?? ""}`}>
      <motion.div style={{ y: scrollY, scale: scrollScale }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
        <motion.div style={{ x: mx, y: my }} className="w-full h-full">
          <ImageWithFallback src={src} alt={alt} className="w-full h-full object-cover" />
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── PortfolioPage ────────────────────────────────────────────────────────
export function PortfolioPage() {
  const heroRef = useRef(null);
  const { smoothX, smoothY } = useMouseParallax();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOp = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Card parallax
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: cardScroll } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const imgY = useTransform(cardScroll, [0, 1], ["-10%", "10%"]);
  const imgScale = useTransform(cardScroll, [0, 1], [1.1, 1.0]);
  const imgMX = useTransform(smoothX, [-1, 1], ["2%", "-2%"]);
  const imgMY = useTransform(smoothY, [-1, 1], ["2%", "-2%"]);

  return (
    <div className="bg-bg-deep text-text-primary" style={{ cursor: "none" }}>
      <MagneticCursor />

      {/* ── HERO ── */}
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
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\" opacity=\"1\"/%3E%3C/svg%3E')" }} />

        {/* Atmospheric glow */}
        <motion.div
          style={{
            x: useTransform(smoothX, [-1, 1], ["4%", "-4%"]),
            y: useTransform(smoothY, [-1, 1], ["4%", "-4%"]),
            background: "radial-gradient(circle, var(--brand-accent) 0%, transparent 70%)",
            filter: "blur(70px)"
          }}
          className="absolute top-[20%] right-[15%] w-[40vw] h-[40vw] rounded-full pointer-events-none"
        />


        {/* Hero content */}
        <motion.div style={{ opacity: heroOp }} className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-14 pb-28 lg:pb-36">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: ease }}
            className="flex items-center gap-4 mb-10"
          >
            <span
              className="font-grotesk inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glass-border backdrop-blur-md bg-bg-surface-elevated text-text-secondary text-[11px] font-bold tracking-[0.18em] uppercase"
            >
              Portfolio
            </span>
            <span className="block h-px bg-glass-border w-12" />
            <span
              className="font-grotesk inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glass-border bg-bg-surface-elevated text-text-muted text-[11px] font-semibold tracking-[0.12em] uppercase"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary/60 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary" />
              </span>
              {MAYAVE.tag}
            </span>
          </motion.div>

          {/* Heading */}
          <div className="overflow-hidden mb-3">
            <motion.h1
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.3, delay: 0.3, ease: ease }}
              className="font-syne text-text-primary tracking-tighter leading-none text-[clamp(4rem,9vw,11rem)] font-extrabold"
            >
              House of
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.3, delay: 0.42, ease: ease }}
              className="font-syne text-brand-primary italic font-light tracking-tighter leading-none text-[clamp(4rem,9vw,11rem)]"
            >
              Brands
            </motion.h1>
          </div>

          {/* Subtitle row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.65, ease: ease }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <p className="font-dm text-text-secondary max-w-md text-[clamp(15px,1.8vw,18px)] leading-[1.78]">
              One singular brand. One radical vision. Built on five decades of diamond heritage.
            </p>
            <a
              href={MAYAVE.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="font-grotesk group inline-flex items-center gap-3 text-text-muted hover:text-text-primary transition-colors duration-300 text-[12px] font-semibold tracking-[0.14em] uppercase"
            >
              mayave.com
              <span className="flex items-center justify-center w-8 h-8 rounded-full border border-glass-border group-hover:bg-text-primary group-hover:text-bg-deep group-hover:border-text-primary transition-all duration-400">
                <ArrowRight size={13} />
              </span>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="border-y border-glass-border bg-bg-surface py-14">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-white/5">
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: ease }}
                className="text-center px-4"
              >
                <div className="font-syne text-text-primary tracking-tighter text-[clamp(2.4rem,4vw,4rem)] font-extrabold leading-[1]">{h.value}</div>
                <p className="font-grotesk mt-3 text-text-muted tracking-[0.14em] uppercase text-[11px] font-semibold">{h.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CINEMATIC BRAND CARD ── */}
      <section className="py-28 lg:py-40 bg-bg-deep">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-14">

          {/* Section eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: ease }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 lg:mb-20"
          >
            <div>
              <span className="font-grotesk text-text-dim tracking-[0.22em] uppercase text-[11px] font-semibold">Portfolio</span>
              <h2 className="font-syne mt-4 text-text-primary tracking-tighter text-[clamp(2.2rem,4vw,4rem)] font-bold leading-[1.08]">Our Flagship Brand</h2>
            </div>
            <p className="font-dm text-text-muted max-w-xs mt-4 md:mt-0 text-[14px] leading-[1.7]">
              Currently, Dholakia Retail's portfolio houses one defining brand — with the philosophy that less, done to perfection, is more.
            </p>
          </motion.div>

          {/* Full-width cinematic card */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.4, ease: ease }}
            className="relative rounded-[2.5rem] overflow-hidden border border-glass-border"
            style={{ minHeight: "clamp(580px, 70vh, 900px)" }}
          >
            {/* Image */}
            <div className="absolute inset-0">
              <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
                <motion.div style={{ x: imgMX, y: imgMY }} className="w-full h-full">
                  <ImageWithFallback src={MAYAVE.img} alt="Mayavé bespoke jewellery" className="w-full h-full object-cover" />
                </motion.div>
              </motion.div>
            </div>

            {/* Cinematic overlays */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(110deg, rgba(5,5,5,0.97) 0%, rgba(5,5,5,0.82) 38%, rgba(5,5,5,0.25) 65%, rgba(5,5,5,0.08) 100%)" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent 45%, rgba(5,5,5,0.90) 100%)" }} />
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\" opacity=\"1\"/%3E%3C/svg%3E')" }} />

            {/* Atmospheric glow */}
            <div
              className="absolute top-1/3 left-1/2 w-[55%] h-[65%] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse, var(--brand-accent) 0%, transparent 65%)", filter: "blur(70px)", transform: "translateX(-20%)" }}
            />

            {/* Right watermark */}
            <div className="absolute right-[-1.5rem] bottom-[-1.5rem] pointer-events-none select-none hidden lg:block" aria-hidden>
              <span
                className="font-syne text-text-primary/5 tracking-tighter text-[clamp(8rem,15vw,20rem)] font-black leading-[1] whitespace-nowrap"
              >
                Mayavé
              </span>
            </div>

            {/* Card content */}
            <div className="relative z-10 h-full flex flex-col justify-center p-10 lg:p-16 xl:p-20 max-w-3xl">

              {/* Category pill */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: 0.1, ease: ease }}
                className="flex items-center gap-4 mb-8"
              >
                <span
                  className="font-grotesk inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md bg-white/5 text-white text-[11px] font-bold tracking-[0.18em] uppercase shadow-sm"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary/60 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary" />
                  </span>
                  {MAYAVE.tag}
                </span>
                <span className="block flex-1 h-px bg-white/10 max-w-[70px]" />
                <span
                  className="font-grotesk text-white/40 text-[10px] font-semibold tracking-[0.12em] uppercase"
                >
                  {MAYAVE.category}
                </span>
              </motion.div>

              {/* Brand name */}
              <div className="mb-2">
                <motion.h2
                  initial={{ y: "100%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.2, delay: 0.2, ease: ease }}
                  className="font-syne text-white tracking-tighter text-[clamp(3rem,6vw,7.5rem)] font-extrabold leading-[1] tracking-[-0.03em]"
                >
                  {MAYAVE.name}
                </motion.h2>
              </div>

              {/* Tagline */}
              <div className="overflow-hidden mb-8">
                <motion.p
                  initial={{ y: "100%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.1, delay: 0.34, ease: ease }}
                  className="font-syne text-white/60 italic text-[clamp(1rem,2vw,1.45rem)] font-light leading-[1.4]"
                >
                  {MAYAVE.tagline}
                </motion.p>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, delay: 0.46, ease: ease }}
                className="font-dm text-white/50 mb-10 max-w-lg text-[clamp(15px,1.6vw,17px)] leading-[1.88]"
              >
                {MAYAVE.desc}
              </motion.p>

              {/* Pillars */}
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
                    className="font-grotesk px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur-sm text-[11px] font-semibold tracking-[0.1em] uppercase"
                  >{p}</span>
                ))}
              </motion.div>

              {/* CTA */}
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
                    <span className="absolute bottom-0 left-0 w-full h-px bg-text-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500" style={{ transitionTimingFunction: `cubic-bezier(${ease})` }} />
                  </span>
                  <span className="flex items-center justify-center w-9 h-9 rounded-full border border-glass-border text-text-primary group-hover:bg-text-primary group-hover:text-bg-deep transition-all duration-400">
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Below-card strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: ease }}
            className="mt-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6"
          >
            <p className="font-dm text-text-dim max-w-md text-[14px] leading-[1.7]">
              The first and only signature brand of Dholakia Retail — crafted for those who believe beauty is felt, not merely seen.
            </p>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="font-grotesk text-text-dim tracking-[0.14em] uppercase text-[10px] font-semibold">Audience</p>
                <p className="font-dm text-text-muted mt-1 text-[13px]">{MAYAVE.audience}</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="font-grotesk text-text-dim tracking-[0.14em] uppercase text-[10px] font-semibold">Segment</p>
                <p className="font-dm text-text-muted mt-1 text-[13px]">{MAYAVE.segment}</p>
              </div>
              <div className="w-px h-10 bg-glass-border" />
              <div className="text-center">
                <p className="font-grotesk text-text-dim tracking-[0.14em] uppercase text-[10px] font-semibold">Origin</p>
                <p className="font-dm text-text-muted mt-1 text-[13px]">{MAYAVE.origin}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BRAND STORY ── */}
      <section className="py-28 lg:py-44 bg-bg-surface border-t border-glass-border overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: ease }}
            className="lg:col-span-5"
          >
            <span className="font-grotesk text-text-dim tracking-[0.22em] uppercase text-[11px] font-semibold">The Story</span>
            <h2 className="font-syne mt-6 text-text-primary tracking-tighter text-[clamp(2.2rem, 4vw, 4rem)] font-bold leading-[1.06]">
              Born from<br /><span className="italic font-light opacity-70">Silence</span>
            </h2>
            <p className="font-dm mt-8 text-text-secondary opacity-80 text-[17px] leading-[1.88]">
              {MAYAVE.long}
            </p>
            <div className="mt-12 pt-10 border-t border-glass-border">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="font-grotesk text-text-dim tracking-[0.14em] uppercase mb-2 text-[10px] font-semibold">Ethos</p>
                  <p className="font-dm text-text-secondary" style={{ fontSize: 15 }}>Silence, rarity, and the handmade</p>
                </div>
                <div>
                  <p className="font-grotesk text-text-dim tracking-[0.14em] uppercase mb-2 text-[10px] font-semibold">Category</p>
                  <p className="font-dm text-text-secondary" style={{ fontSize: 15 }}>Bespoke Fine Jewellery</p>
                </div>
                <div>
                  <p className="font-grotesk text-text-dim tracking-[0.14em] uppercase mb-2 text-[10px] font-semibold">Launch</p>
                  <p className="font-dm text-text-secondary" style={{ fontSize: 15 }}>2026 — Worldwide</p>
                </div>
                <div>
                  <p className="font-grotesk text-text-dim tracking-[0.14em] uppercase mb-2 text-[10px] font-semibold">Heritage</p>
                  <p className="font-dm text-text-secondary" style={{ fontSize: 15 }}>50+ years of Dholakia craftsmanship</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: ease }}
            className="lg:col-span-7"
          >
            <div className="rounded-[2rem] overflow-hidden border border-glass-border shadow-2xl">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?q=80&w=2070&auto=format&fit=crop"
                alt="Mayavé craftsmanship detail"
                className="h-[500px] lg:h-[680px] w-full"
                smoothX={smoothX}
                smoothY={smoothY}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="relative py-32 lg:py-44 bg-bg-deep border-t border-glass-border text-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <ImageWithFallback src={MAYAVE.img} alt="Mayavé background" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-deep via-bg-deep/80 to-bg-deep" />
        </div>

        {/* Decorative glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, var(--brand-accent) 0%, transparent 70%)", filter: "blur(80px)" }} />

        {/* Large watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden>
          <span className="font-syne text-text-primary/5 tracking-tighter text-[clamp(10rem, 20vw, 28rem)] font-black leading-[1] whitespace-nowrap">
            Mayavé
          </span>
        </div>

        <div className="relative z-10 max-w-[900px] mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: ease }}
          >
            <span
              className="font-grotesk inline-flex items-center gap-3 text-text-dim tracking-[0.26em] uppercase mb-8 text-[11px] font-semibold"
            >
              <span className="block w-8 h-px bg-glass-border" />
              Experience Mayavé
              <span className="block w-8 h-px bg-glass-border" />
            </span>
            <div className="overflow-hidden mb-3">
              <motion.h2
                initial={{ y: "110%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.3, ease: ease }}
                className="font-syne text-text-primary tracking-tighter text-[clamp(2.5rem, 5vw, 5.5rem)] font-bold leading-[1.05]"
              >
                Where Beauty
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h2
                initial={{ y: "110%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.3, delay: 0.1, ease: ease }}
                className="font-syne text-brand-primary italic font-light tracking-tighter text-[clamp(2.5rem, 5vw, 5.5rem)] leading-[1.05]"
              >
                is Felt
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: ease }}
              className="font-dm text-text-dim max-w-md mx-auto mb-12 text-[16px] leading-[1.75]"
            >
              Step into the world of Mayavé — where every piece is a testament to rare craftsmanship and quiet luxury.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.25, ease: ease }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <a
                href={MAYAVE.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="font-grotesk group relative overflow-hidden px-10 py-4 bg-text-primary text-bg-deep rounded-full text-[15px] font-bold shadow-xl"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Visit Mayavé <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-bg-deep/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" style={{ transitionTimingFunction: `cubic-bezier(${ease})` }} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
