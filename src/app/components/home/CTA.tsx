import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ease, IMG } from "./constants";

interface CTAProps {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}

export function CTASection({ smoothX, smoothY }: CTAProps) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.14, 1.0]);
  const bgMX = useTransform(smoothX, [-1, 1], ["2%", "-2%"]);
  const bgMY = useTransform(smoothY, [-1, 1], ["2%", "-2%"]);
  const orb1X = useTransform(smoothX, [-1, 1], ["5%", "-5%"]);
  const orb1Y = useTransform(smoothY, [-1, 1], ["5%", "-5%"]);
  const orb2X = useTransform(smoothX, [-1, 1], ["-4%", "4%"]);
  const orb2Y = useTransform(smoothY, [-1, 1], ["-3%", "3%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden"
      style={{ height: "100svh", minHeight: "600px", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <div className="absolute inset-0">
        <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
          <motion.div style={{ x: bgMX, y: bgMY }} className="w-full h-full">
            <ImageWithFallback src={IMG.cta} alt="Luxury jewellery craftsmanship" className="w-full h-full object-cover" />
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute inset-0 pointer-events-none bg-bg-deep/60 dark:bg-bg-deep/75" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, transparent 10%, var(--bg-deep) 100%)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, var(--bg-surface) 0%, transparent 18%, transparent 78%, var(--bg-deep) 100%)" }} />
      <div className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100" style={{ background: "linear-gradient(135deg, rgba(200,155,60,0.06) 0%, transparent 60%)", mixBlendMode: "screen" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\" opacity=\"1\"/%3E%3C/svg%3E')", opacity: 0.035 }} />
      <motion.div style={{ x: orb1X, y: orb1Y, background: "radial-gradient(circle, rgba(220,170,70,0.09) 0%, transparent 70%)", filter: "blur(70px)" }} className="absolute top-[10%] right-[12%] w-[40vw] h-[40vw] rounded-full pointer-events-none" />
      <motion.div style={{ x: orb2X, y: orb2Y, background: "radial-gradient(circle, rgba(180,200,255,0.05) 0%, transparent 70%)", filter: "blur(90px)" }} className="absolute bottom-[5%] left-[8%] w-[35vw] h-[35vw] rounded-full pointer-events-none" />
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12 text-center flex flex-col items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.9, ease: ease }}>
          <span className="font-grotesk inline-flex items-center gap-3 text-text-muted tracking-[0.28em] uppercase mb-6 sm:mb-8 text-[11px] font-semibold">
            <span className="block w-10 h-px bg-brand-primary/25" />Begin the Conversation<span className="block w-10 h-px bg-brand-primary/25" />
          </span>
        </motion.div>
        <div className="overflow-hidden mb-2 sm:mb-3">
          <motion.h2 initial={{ y: "110%", opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.3, ease: ease }} className="font-syne text-text-primary tracking-tighter text-[clamp(1.8rem,4vw,4.5rem)] font-bold leading-[1.04]">Let's Build Something</motion.h2>
        </div>
        <div className="overflow-hidden mb-8 sm:mb-12">
          <motion.h2 initial={{ y: "110%", opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.3, delay: 0.1, ease: ease }} className="font-syne text-brand-primary tracking-tighter italic font-light text-[clamp(1.8rem,4vw,4.5rem)] leading-[1.04]">Extraordinary</motion.h2>
        </div>
        <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, delay: 0.25, ease: ease }} className="font-dm text-text-secondary max-w-2xl mx-auto mb-10 sm:mb-14 text-[clamp(1rem,1.8vw,1.15rem)] leading-[1.75]">
          Whether you're a partner, investor, journalist, or future colleague—we're ready for the conversation. Step into the future of retail with us.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, delay: 0.38, ease: ease }} className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-5">
          <Link to="/contact" data-cursor-hover className="font-grotesk group relative overflow-hidden px-8 sm:px-10 py-4 sm:py-5 rounded-full text-[15px] font-semibold shadow-xl" style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-deep)" }}>
            <span className="relative z-10 flex items-center justify-center gap-2">Contact Our Team <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></span>
            <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500" style={{ backgroundColor: "rgba(128,128,128,0.2)", transitionTimingFunction: `cubic-bezier(${ease})` }} />
          </Link>
          <Link to="/careers" data-cursor-hover className="font-grotesk px-8 sm:px-10 py-4 sm:py-5 border border-glass-border text-text-primary rounded-full hover:bg-glass-bg transition-all duration-400 backdrop-blur-sm text-center text-[15px] font-medium">Explore Careers</Link>
        </motion.div>
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.5, ease: ease }} className="mt-14 sm:mt-20 w-px h-12 sm:h-16 bg-glass-border mx-auto origin-top" />
      </div>
    </section>
  );
}
