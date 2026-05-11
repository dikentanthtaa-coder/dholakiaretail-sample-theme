import { motion } from "motion/react";
import { ease, SNAPSHOT } from "./constants";

/**
 * P01-S04 — Corporate Snapshot · 4 metrics on Off-White
 */
export function StatsSection() {
  return (
    <section className="bg-[#F5F5F7] py-24 lg:py-32 border-y border-[#0B1426]/8">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16 max-w-[780px] mx-auto"
        >
          <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
            Corporate Snapshot
          </p>
          <h2 className="font-syne text-[#0B1426] font-normal leading-[1.1] tracking-[-0.02em] text-[clamp(1.7rem,2.8vw,2.4rem)]">
            A young company with a clear mandate.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#0B1426]/10">
          {SNAPSHOT.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
              className="bg-[#F5F5F7] py-10 lg:py-12 px-6 lg:px-8"
            >
              <p className="font-dm text-[#0B1426]/55 text-[11px] font-medium tracking-[0.16em] uppercase mb-4">
                {s.label}
              </p>
              <p
                className={
                  "mono" in s && s.mono
                    ? "font-mono text-[#0B1426] text-[clamp(0.95rem,1.2vw,1.05rem)] leading-[1.4] break-words"
                    : "font-syne text-[#0B1426] font-normal italic leading-[1.2] text-[clamp(1.1rem,1.6vw,1.5rem)]"
                }
              >
                {s.value}
              </p>
              <p className="font-dm text-[#0B1426]/55 mt-3 text-[13px] leading-[1.55]">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
