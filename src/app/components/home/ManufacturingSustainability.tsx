import { motion, MotionValue } from "motion/react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { ParallaxImage } from "./Shared";
import { ease, IMG } from "./constants";

interface ManufacturingSustainabilityProps {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}

export function ManufacturingSustainabilitySection({ smoothX, smoothY }: ManufacturingSustainabilityProps) {
  return (
    <section className="py-20 md:py-32 lg:py-40 bg-bg-deep overflow-hidden">
      {/* MANUFACTURING */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center mb-20 md:mb-32 lg:mb-40">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: ease }}
          className="order-2 lg:order-1"
        >
          <div className="rounded-[2rem] overflow-hidden border border-glass-border">
            <ParallaxImage src={IMG.factory} alt="Manufacturing precision" className="h-[500px] lg:h-[700px]" smoothX={smoothX} smoothY={smoothY} />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: ease }}
          className="order-1 lg:order-2 lg:pl-10"
        >
          <span className="font-grotesk text-text-secondary tracking-[0.22em] uppercase text-[12px] font-semibold">Manufacturing</span>
          <h2 className="font-syne mt-6 text-text-primary tracking-tighter text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.05]">
            Precision Meets<br /><span className="italic font-light text-text-secondary">Artistry</span>
          </h2>
          <p className="font-dm mt-8 text-text-secondary text-[18px] leading-[1.85]">
            State-of-the-art facilities blend cutting-edge technology with time-honoured techniques.
          </p>
          <Link to="/about" data-cursor-hover
            className="font-grotesk group inline-flex items-center gap-3 mt-12 text-text-primary text-[13px] font-semibold tracking-[0.1em] uppercase"
          >
            <span className="relative overflow-hidden pb-1">
              Explore Our Craft
              <span className="absolute bottom-0 left-0 w-full h-px bg-text-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500" style={{ transitionTimingFunction: `cubic-bezier(${ease})` }} />
            </span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
          </Link>
        </motion.div>
      </div>

      {/* SUSTAINABILITY */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: ease }}
          className="lg:pr-10"
        >
          <span className="font-grotesk text-text-secondary tracking-[0.22em] uppercase text-[12px] font-semibold">Sustainability & ESG</span>
          <h2 className="font-syne mt-6 text-text-primary tracking-tighter text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.05]">
            Responsible Growth,<br /><span className="italic font-light text-text-secondary">Lasting Impact</span>
          </h2>
          <p className="font-dm mt-8 text-text-secondary text-[18px] leading-[1.85]">
            From 100% ethical sourcing and renewable energy integration to vast community empowerment, sustainability is the bedrock of our long-term value creation.
          </p>
          <div className="grid grid-cols-2 gap-6 mt-10">
            {([{ v: "95%", l: "Ethical Sourcing" }, { v: "40MW", l: "Solar Power" }] as const).map(s => (
              <div key={s.l} className="border-l border-glass-border pl-6">
                <div className="font-syne text-text-primary text-[32px] font-extrabold">{s.v}</div>
                <p className="font-dm text-text-muted mt-2 text-[13px]">{s.l}</p>
              </div>
            ))}
          </div>
          <Link to="/sustainability" data-cursor-hover
            className="font-grotesk group inline-flex items-center gap-3 mt-12 text-text-primary text-[13px] font-semibold tracking-[0.1em] uppercase"
          >
            <span className="relative overflow-hidden pb-1">
              View ESG Report
              <span className="absolute bottom-0 left-0 w-full h-px bg-text-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500" style={{ transitionTimingFunction: `cubic-bezier(${ease})` }} />
            </span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
          </Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: ease }}
        >
          <div className="rounded-[2rem] overflow-hidden border border-glass-border">
            <ParallaxImage src={IMG.forest} alt="Sustainable forest and environment" className="h-[500px] lg:h-[700px]" smoothX={smoothX} smoothY={smoothY} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
