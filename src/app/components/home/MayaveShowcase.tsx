import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { ease, MAYAVE } from "./constants";

interface MayaveShowcaseProps {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}

export function MayaveShowcase({ smoothX, smoothY }: MayaveShowcaseProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const imgParallaxY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0]);
  const mx = useTransform(smoothX, [-1, 1], ["2%", "-2%"]);
  const my = useTransform(smoothY, [-1, 1], ["2%", "-2%"]);
  const glowX = useTransform(smoothX, [-1, 1], ["-3%", "3%"]);
  const glowY = useTransform(smoothY, [-1, 1], ["-2%", "2%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.4, ease: ease }}
      className="relative rounded-[2.5rem] overflow-hidden border border-glass-border"
      style={{ minHeight: "clamp(520px, 65vh, 820px)" }}
    >
      <div className="absolute inset-0">
        <motion.div style={{ y: imgParallaxY, scale: imgScale }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
          <motion.div style={{ x: mx, y: my }} className="w-full h-full">
            <img
              src={MAYAVE.img}
              alt="Mayavé — Signature Jewellery Collection"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>
        </motion.div>
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, var(--bg-deep) 0%, var(--bg-deep) 32%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, transparent 30%, transparent 65%, rgba(5,5,5,0.7) 100%)" }}
      />
      <motion.div
        style={{
          x: glowX,
          y: glowY,
          background: "radial-gradient(ellipse, rgba(180,20,30,0.08) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
        className="absolute top-1/4 left-1/3 w-[50%] h-[60%] pointer-events-none"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\" opacity=\"1\"/%3E%3C/svg%3E')",
          opacity: 0.03,
        }}
      />
      <div className="relative z-10 h-full flex flex-col justify-center p-10 lg:p-16 xl:p-20 max-w-2xl text-text-primary">
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
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-200" />
            </span>
            {MAYAVE.tag}
          </span>
          <span className="block flex-1 h-px bg-white/10 max-w-[80px]" />
        </motion.div>
        <motion.h3
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, delay: 0.2, ease: ease }}
          className="font-syne text-white tracking-tighter mb-2 text-[clamp(3.5rem,7vw,8rem)] font-extrabold leading-[0.92] tracking-[-0.03em] whitespace-nowrap"
        >
          {MAYAVE.name}
        </motion.h3>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, delay: 0.35, ease: ease }}
          className="font-syne text-white/60 italic mb-8 text-[clamp(1rem,2vw,1.4rem)] font-light leading-[1.4]"
        >
          {MAYAVE.tagline}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.48, ease: ease }}
          className="font-dm text-white/50 mb-10 max-w-lg text-[clamp(15px,1.6vw,17px)] leading-[1.85]"
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
              className="font-grotesk px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 backdrop-blur-sm text-[11px] font-semibold tracking-[0.1em] uppercase shadow-sm"
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
            <span className="relative text-white overflow-hidden pb-1">
              Visit Mayavé
              <span
                className="absolute bottom-0 left-0 w-full h-px bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-600"
                style={{ transitionTimingFunction: `cubic-bezier(${ease})` }}
              />
            </span>
            <span className="flex items-center justify-center w-9 h-9 rounded-full border border-white/20 text-white group-hover:bg-white group-hover:text-black transition-all duration-400">
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
        </motion.div>
      </div>
      <div className="absolute right-[-2rem] bottom-[-1rem] pointer-events-none select-none hidden lg:block" aria-hidden>
        <span
          className="font-syne text-white/[0.06] tracking-tighter text-[clamp(8rem, 14vw, 18rem)] font-black leading-[1] whitespace-nowrap"
        >
          Mayavé
        </span>
      </div>
    </motion.div>
  );
}
