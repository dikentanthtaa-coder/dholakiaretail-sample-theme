import { Link } from "react-router";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const MAYAVE = {
  name: "Mayavé",
  tag: "Coming Soon — 2026",
  category: "Bespoke Ultra-Luxury",
  hero: "/banner.jpg",
  img1: "/banner.jpg",
  img2: "/banner.jpg",
  story: "Mayavé is Dholakia Retail's first and defining expression of refined artistry — where every creation is a whisper of rare beauty, crafted for those who seek the extraordinary.",
  long: "Rooted in the DNA of India's finest diamond heritage and inspired by global luxury codes, Mayavé is built for a clientele that values provenance, silence, and the poetry of the handmade. Each piece is conceived as a singular statement — not merely worn, but experienced.",
  pillars: [
    { title: "Bespoke Craftsmanship", desc: "Each creation conceived in private consultation, realised by master artisans." },
    { title: "Rare Materials", desc: "Only the most exceptional stones, sourced through five decades of expertise." },
    { title: "Timeless Design", desc: "Pieces that transcend season and trend — made to be passed down." },
    { title: "Invitation Only", desc: "A brand for those who believe true luxury is never advertised." },
  ],
  strength: "Mayavé draws upon Dholakia Retail's unparalleled diamond sourcing network, world-class manufacturing, and half-century heritage to deliver creations no independent atelier could match.",
  cta: "Visit Mayavé",
  url: "https://mayave.com/",
  audience: "Connoisseurs & Ultra-HNI Collectors",
  segment: "Bespoke Fine Jewellery",
  origin: "India",
};

const ease = [0.76, 0, 0.24, 1] as const;

export function BrandPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const heroOp = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <div className="bg-bg-deep text-text-primary">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-[85vh] flex items-end overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <ImageWithFallback src={MAYAVE.hero} alt="Mayavé" className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 0%, transparent 30%, var(--bg-deep) 100%)" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-deep/80 via-bg-deep/40 to-transparent" />
        </motion.div>

        <motion.div style={{ opacity: heroOp }} className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-14 pb-20 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: ease }}>
            <Link
              to="/portfolio"
              className="font-grotesk inline-flex items-center gap-2 mb-8 transition-colors text-text-muted hover:text-text-primary text-[12px] font-medium tracking-[0.12em] uppercase"
            >
              <ArrowLeft size={13} /> Portfolio
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <span
                className="font-grotesk inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glass-border backdrop-blur-md bg-bg-surface-elevated text-text-primary text-[11px] font-bold tracking-[0.16em] uppercase shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary/60 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary" />
                </span>
                {MAYAVE.tag}
              </span>
              <span className="h-px w-10 bg-glass-border" />
              <span className="font-grotesk text-text-dim text-[10px] font-semibold tracking-[0.12em] uppercase">{MAYAVE.category}</span>
            </div>

            <h1
              className="font-syne text-text-primary tracking-tighter leading-none text-[clamp(4rem, 9vw, 11rem)] font-extrabold"
            >
              {MAYAVE.name}
            </h1>
            <p
              className="font-syne mt-5 max-w-lg italic font-light text-text-dim text-[clamp(1rem, 1.8vw, 1.4rem)]"
            >
              Where Silence Becomes Jewellery
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── STORY ── */}
      <section className="py-28 lg:py-44 border-t border-glass-border bg-bg-deep">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: ease }}>
            <span className="font-grotesk text-text-dim text-[11px] font-semibold tracking-[0.2em] uppercase">The Story</span>
            <p
              className="font-syne mt-8 text-text-secondary font-medium leading-[1.72] text-[clamp(1.2rem, 2.2vw, 1.6rem)]"
            >
              {MAYAVE.story}
            </p>
            <p
              className="font-dm mt-6 text-text-muted leading-[1.88] text-[17px]"
            >
              {MAYAVE.long}
            </p>
            <a
              href={MAYAVE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-grotesk group mt-12 inline-flex items-center gap-3 text-[13px] font-semibold tracking-[0.12em] uppercase"
            >
              <span className="relative text-text-primary overflow-hidden pb-1">
                {MAYAVE.cta}
                <span className="absolute bottom-0 left-0 w-full h-px bg-text-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </span>
              <span className="flex items-center justify-center w-9 h-9 rounded-full border border-glass-border text-text-primary group-hover:bg-text-primary group-hover:text-bg-deep transition-all duration-400">
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section className="py-28 lg:py-40 bg-bg-surface border-t border-glass-border">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-14">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-grotesk block mb-12 text-text-dim text-[11px] font-semibold tracking-[0.2em] uppercase">Brand Pillars</motion.span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {MAYAVE.pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: ease }}
                whileHover={{ y: -4 }}
                className="p-8 rounded-2xl border border-glass-border bg-bg-surface-elevated hover:bg-bg-surface transition-all shadow-sm hover:shadow-xl"
              >
                <p className="font-grotesk text-text-dim mb-2 text-[10px] font-semibold tracking-[0.16em] uppercase">0{i + 1}</p>
                <h3 className="font-syne text-text-primary text-[20px] font-bold leading-[1.2]">{p.title}</h3>
                <p className="font-dm mt-3 text-text-muted text-[15px] leading-[1.7]">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DHOLAKIA ADVANTAGE ── */}
      <section className="py-28 lg:py-44 border-t border-glass-border bg-bg-deep">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-14 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.1, ease: ease }}>
            <span className="font-grotesk text-text-dim text-[11px] font-semibold tracking-[0.2em] uppercase">Dholakia Advantage</span>
            <h2
              className="font-syne mt-6 text-white tracking-tighter text-[clamp(2rem, 3.5vw, 3.5rem)] font-bold leading-[1.08]"
            >
              Backed by<br /><span className="italic font-light text-text-secondary">50 years of heritage</span>
            </h2>
            <p className="font-dm mt-8 text-text-muted text-[17px] leading-[1.88]">{MAYAVE.strength}</p>
            <div className="mt-12 pt-10 border-t border-glass-border flex items-center gap-8">
              {[{ label: "Audience", val: MAYAVE.audience }, { label: "Segment", val: MAYAVE.segment }, { label: "Origin", val: MAYAVE.origin }].map((m, i, arr) => (
                <div key={m.label} className="flex items-center gap-8">
                  <div key={m.label}>
                    <p className="font-grotesk text-text-dim text-[10px] font-semibold tracking-[0.14em] uppercase">{m.label}</p>
                    <p className="font-dm mt-1 text-text-secondary text-[14px]">{m.val}</p>
                  </div>
                  {i < arr.length - 1 && <div className="w-px h-10 bg-white/10" />}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.3, ease: ease }} className="rounded-[2rem] overflow-hidden border border-glass-border shadow-2xl">
            <ImageWithFallback src={MAYAVE.img1} alt="Mayavé jewellery craftsmanship" className="w-full h-[440px] object-cover" />
          </motion.div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="pb-20 border-t border-glass-border bg-bg-deep">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-14 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[MAYAVE.img1, MAYAVE.img2].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: ease }}
                className="rounded-2xl overflow-hidden h-[340px] border border-glass-border"
              >
                <ImageWithFallback src={img} alt={`Mayavé ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-28 lg:py-44 bg-bg-surface border-t border-glass-border text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: ease }}
          className="max-w-[800px] mx-auto px-6"
        >
          <span className="font-grotesk inline-flex items-center gap-3 mb-8 text-text-dim text-[11px] font-semibold tracking-[0.24em] uppercase">
            <span className="block w-8 h-px bg-white/20" />
            Experience Mayavé
            <span className="block w-8 h-px bg-white/20" />
          </span>
          <h2
            className="font-syne text-text-primary tracking-tighter text-[clamp(2.5rem, 5vw, 5rem)] font-bold leading-[1.05]"
          >
            Where Beauty <span className="italic font-light opacity-70">is Felt</span>
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={MAYAVE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-grotesk group relative overflow-hidden px-10 py-4 bg-text-primary text-bg-deep rounded-full text-[15px] font-bold shadow-xl"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {MAYAVE.cta} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-bg-deep/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
            <Link
              to="/portfolio"
              className="font-grotesk inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 transition-colors text-text-muted text-[14px] font-medium"
            >
              <ArrowLeft size={14} /> Back to Portfolio
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
