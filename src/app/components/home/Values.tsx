import { motion } from "motion/react";
import { useTilt } from "./Shared";
import { ease, valuesData } from "./constants";

export function ValuesSection() {
  return (
    <section className="py-20 md:py-32 lg:py-40 relative z-20 bg-bg-deep">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: ease }}
          className="text-center mb-24"
        >
          <span className="font-grotesk text-text-secondary tracking-[0.22em] uppercase text-[12px] font-semibold">Our Foundation</span>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {valuesData.map((v, i) => {
            const { ref, springRotX, springRotY, onMouseMove, onMouseLeave } = useTilt(8);
            return (
              <motion.div key={v.title} ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
                style={{ rotateX: springRotX, rotateY: springRotY, transformPerspective: 800 }}
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: i * 0.15, ease: ease }}
                className="group relative p-6 md:p-8 lg:p-12 rounded-3xl bg-bg-surface border border-glass-border hover:bg-glass-bg hover:border-glass-hover-border transition-colors duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div whileHover={{ scale: 1.08 }} className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-glass-bg text-text-primary mb-8 border border-glass-border">{v.icon}</motion.div>
                <h3 className="font-syne relative z-10 text-text-primary tracking-tight text-[clamp(1.25rem,3vw,1.75rem)] font-bold">{v.title}</h3>
                <p className="font-dm relative z-10 mt-4 text-text-secondary text-[16px] leading-[1.75]">{v.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
