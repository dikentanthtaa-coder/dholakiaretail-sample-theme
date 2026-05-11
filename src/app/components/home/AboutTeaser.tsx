import { motion, MotionValue } from "motion/react";
import { ease } from "./constants";

interface Props {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}

/**
 * P01-S02 — Intro Statement
 * Editorial type-led band on Off-White.
 */
export function AboutTeaserSection(_: Props) {
  return (
    <section className="relative bg-[#F5F5F7] py-32 lg:py-44 border-y border-[#0B1426]/8">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 lg:px-20 text-center">
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
          className="font-syne text-[#0B1426] font-normal leading-[1.1] tracking-[-0.02em] text-[clamp(2rem,4vw,3.5rem)]"
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
            className="inline-block italic font-light text-[#3B6FFF]"
          >
            modern luxury.
          </motion.span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
          className="font-dm text-[#0B1426]/72 mx-auto max-w-[60ch] mt-10 text-[clamp(1.05rem,1.4vw,1.18rem)] leading-[1.7] font-light"
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
