import { motion } from "motion/react";
import { useTilt } from "./Shared";
import { ease, PRINCIPLES } from "./constants";

/**
 * P01-S03 — Guiding Principles · 4 cards on white
 */
export function ValuesSection() {
  return (
    <section className="bg-white py-32 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="max-w-[820px] mb-20 lg:mb-24"
        >
          <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
            Guiding Principles
          </p>
          <h2 className="font-syne text-[#0B1426] font-normal leading-[1.08] tracking-[-0.02em] text-[clamp(1.9rem,3.4vw,3.2rem)]">
            The standards behind every brand we build.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0B1426]/10">
          {PRINCIPLES.map((p, i) => {
            const { ref, springRotX, springRotY, onMouseMove, onMouseLeave } = useTilt(2);
            return (
              <motion.article
                key={p.title}
                ref={ref}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                style={{ rotateX: springRotX, rotateY: springRotY, transformPerspective: 1200 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease }}
                whileHover={{ y: -6 }}
                className="group relative bg-white p-10 lg:p-12 transition-all duration-500 hover:bg-[#F5F5F7]"
              >
                <span className="font-mono text-[#3B6FFF] text-[11px] tracking-[0.18em] block mb-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="text-[#3B6FFF] mb-6 inline-flex">{p.icon}</div>
                <h3 className="font-syne text-[#0B1426] font-medium text-[1.4rem] leading-[1.3]">
                  {p.title}
                </h3>
                <p className="font-dm mt-4 text-[#0B1426]/70 text-[15px] leading-[1.7]">{p.body}</p>
                <div className="absolute inset-x-10 bottom-10 h-px bg-[#3B6FFF] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
