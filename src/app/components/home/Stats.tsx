import { motion } from "motion/react";
import { ease, stats } from "./constants";

export function StatsSection() {
  return (
    <section className="py-16 md:py-24 border-y border-glass-border bg-bg-surface overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-x divide-glass-border">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1, ease: ease }}
              className="text-center"
            >
              <div className="font-syne text-text-primary tracking-tighter text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1]">{s.value}</div>
              <p className="font-grotesk mt-4 text-text-muted tracking-[0.16em] uppercase text-[12px] font-semibold">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
