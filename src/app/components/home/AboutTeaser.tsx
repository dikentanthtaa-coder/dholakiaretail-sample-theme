import { motion, MotionValue } from "motion/react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { ParallaxImage } from "./Shared";
import { ease, IMG } from "./constants";

interface AboutTeaserProps {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}

export function AboutTeaserSection({ smoothX, smoothY }: AboutTeaserProps) {
  return (
    <section className="py-20 md:py-32 lg:py-40 bg-bg-surface overflow-hidden border-y border-glass-border">
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: ease }}
          className="lg:col-span-5"
        >
          <span className="font-grotesk text-text-secondary tracking-[0.22em] uppercase text-[12px] font-semibold">The Group</span>
          <h2 className="font-syne mt-6 text-text-primary tracking-tighter text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.05]">
            Five Decades<br /><span className="italic font-light text-text-secondary">of Excellence</span>
          </h2>
          <p className="font-dm mt-8 text-text-secondary text-[clamp(1rem,2vw,1.1rem)] leading-[1.85]">
            Founded on master craftsmanship and visionary enterprise, Dholakia Retail has grown from a family legacy into one of India's most distinguished luxury retail groups.
          </p>
          <Link to="/about" data-cursor-hover
            className="font-grotesk group inline-flex items-center gap-3 mt-12 text-text-primary text-[13px] font-semibold tracking-[0.1em] uppercase"
          >
            <span className="relative overflow-hidden pb-1">
              Explore Our Story
              <span className="absolute bottom-0 left-0 w-full h-px bg-text-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500" style={{ transitionTimingFunction: `cubic-bezier(${ease})` }} />
            </span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
          </Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: ease }}
          className="lg:col-span-7"
        >
          <div className="rounded-[2rem] overflow-hidden border border-glass-border shadow-2xl">
            <ParallaxImage src={IMG.artisan} alt="Artisan craftsmanship" className="h-[500px] lg:h-[700px] w-full" smoothX={smoothX} smoothY={smoothY} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
