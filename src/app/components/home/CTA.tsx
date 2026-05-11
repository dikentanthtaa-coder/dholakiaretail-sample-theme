import { motion, MotionValue } from "motion/react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { ease } from "./constants";

interface Props {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}

/**
 * P01-S09 — Final CTA · 120vh full-bleed Midnight Navy band
 */
export function CTASection(_: Props) {
  return (
    <section
      data-header-theme="dark"
      className="relative bg-[#0B1426] overflow-hidden py-32 lg:py-44"
    >
      {/* Subtle facet texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='facet' patternUnits='userSpaceOnUse' width='80' height='80'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z' fill='none' stroke='%23ffffff' stroke-width='0.5' /%3E%3C/pattern%3E%3C/defs%3E%3Crect width='400' height='400' fill='url(%23facet)' /%3E%3C/svg%3E\")",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 60%, rgba(59,111,255,0.18) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-12 lg:px-20 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="font-syne text-white font-normal leading-[1.1] tracking-[-0.02em] text-[clamp(2rem,4.4vw,3.5rem)]"
        >
          {"Start the conversation.".split(" ").map((w, i) => (
            <motion.span
              key={i}
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.06, ease }}
              className="inline-block mr-[0.18em]"
            >
              {w}
            </motion.span>
          ))}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-dm text-white/72 max-w-[58ch] mx-auto mt-7 text-[clamp(1rem,1.3vw,1.13rem)] leading-[1.7] font-light"
        >
          For partnerships, media inquiries, brand discussions, or future collaboration, connect with
          Dholakia Retail directly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mt-10"
        >
          <Link
            to="/contact"
            className="font-dm group inline-flex items-center gap-2 px-8 h-14 bg-[#3B6FFF] hover:bg-[#14275C] text-white rounded-sm text-[15px] font-semibold transition-colors duration-300"
          >
            Contact the House
            <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link
            to="/careers"
            className="font-dm inline-flex items-center gap-2 px-8 h-14 border border-white/30 text-white hover:bg-white/10 hover:border-white rounded-sm text-[15px] font-medium transition-all duration-300"
          >
            Explore Careers
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
