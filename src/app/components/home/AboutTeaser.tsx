import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ease } from "./constants";

interface Props {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}

const MAYAVE_BANNER = "/assets/mayave/mayave_banner.png";

/**
 * P01-S02 — Intro Statement
 * Cinematic dark band on Midnight Navy, mirroring the hero's tonality.
 * Mayavé banner sits behind the copy with a navy gradient wash so the
 * editorial text reads clean white over the brand atmosphere.
 */
export function AboutTeaserSection({ smoothX, smoothY }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const mx = useTransform(smoothX, [-1, 1], ["10px", "-10px"]);
  const my = useTransform(smoothY, [-1, 1], ["10px", "-10px"]);

  return (
    <section
      ref={ref}
      data-header-theme="dark"
      className="relative bg-[#0B1426] py-32 lg:py-44 border-y border-white/10 overflow-hidden"
    >
      {/* Mayavé banner backdrop — parallaxed */}
      <motion.div
        data-gpu
        aria-hidden
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none"
      >
        <motion.div style={{ x: mx, y: my }} className="w-full h-full">
          <ImageWithFallback
            src={MAYAVE_BANNER}
            alt=""
            className="w-full h-full object-cover opacity-55"
          />
        </motion.div>
      </motion.div>

      {/* Dark gradient overlays — matches hero tonality and keeps text legible */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0B1426]/70 via-[#0B1426]/55 to-[#0B1426]"
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0B1426]/70 via-transparent to-[#0B1426]/70"
      />

      {/* Subtle film grain (same SVG noise as the hero) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-12 lg:px-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
          className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-8"
        >
          A House of Brands
        </motion.p>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1 }}
          className="font-syne text-white font-normal leading-[1.1] tracking-[-0.02em] text-[clamp(2rem,4vw,3.5rem)]"
        >
          {"A corporate foundation for".split(" ").map((w, i) => (
            <motion.span
              key={i}
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.06, ease }}
              className="inline-block mr-[0.18em]"
            >
              {w}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
            className="inline-block italic font-light text-[#6B8AC9]"
          >
            modern luxury.
          </motion.span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
          className="font-dm text-white/75 mx-auto max-w-[60ch] mt-10 text-[clamp(1.05rem,1.4vw,1.18rem)] leading-[1.7] font-light"
        >
          Headquartered in Surat, Gujarat, Dholakia Retail is built to create, guide, and grow
          distinguished jewellery brands with authenticity, discipline, and long-term relevance.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.9, ease }}
          className="mx-auto mt-12 h-px w-24 bg-[#3B6FFF] origin-center"
        />
      </div>
    </section>
  );
}
