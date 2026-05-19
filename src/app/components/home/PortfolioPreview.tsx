import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Award, ShieldCheck, Gem } from "lucide-react";
import { useRef } from "react";
import { OptimizedVideo } from "../ui/OptimizedVideo";
import { ease, IMG } from "./constants";

interface Props {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}

const PROOFS = [
  { icon: <Award size={20} strokeWidth={1.5} />, label: "Heritage", note: "50+ years of family craft" },
  { icon: <ShieldCheck size={20} strokeWidth={1.5} />, label: "Ethics", note: "Verified · Kimberley · RJC" },
  { icon: <Gem size={20} strokeWidth={1.5} />, label: "Bespoke", note: "Made for collectors, not catalogues" },
];

/**
 * P01-S05 — Portfolio Preview · Mayavé spotlight
 * 100vh full-bleed cinematic feature with Off-White content stack on lower half.
 */
export function PortfolioPreviewSection({ smoothX, smoothY }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const mx = useTransform(smoothX, [-1, 1], ["10px", "-10px"]);
  const my = useTransform(smoothY, [-1, 1], ["10px", "-10px"]);

  return (
    <section ref={ref} className="bg-white">
      {/* Image band — dark surface */}
      <div
        data-header-theme="dark"
        className="relative h-[70vh] min-h-[480px] overflow-hidden bg-[#0B1426]"
      >
        <motion.div data-gpu style={{ y: imgY, scale: imgScale }} className="absolute inset-0 w-full h-[120%] -top-[8%]">
          <motion.div style={{ x: mx, y: my }} className="w-full h-full relative">
            <OptimizedVideo
              src={IMG.mayaveVideo}
              poster={IMG.mayave}
              posterAlt="Mayavé signature piece"
              className="absolute inset-0 w-full h-full opacity-90"
            />
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1426]/30 via-[#0B1426]/10 to-[#0B1426]/40" />
        <div className="absolute bottom-12 left-6 lg:left-20 max-w-[1280px]">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-dm text-white/75 text-[11px] font-medium tracking-[0.22em] uppercase mb-4"
          >
            The Portfolio
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            className="font-syne text-white font-normal leading-[1.05] tracking-[-0.02em] text-[clamp(2.4rem,5vw,4.6rem)]"
          >
            Mayavé
          </motion.h2>
        </div>
      </div>

      {/* Content band — light surface */}
      <div data-header-theme="light" className="bg-[#F5F5F7] py-24 lg:py-32">
        <div className="max-w-[820px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <motion.h3
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease }}
            className="font-syne text-[#0B1426] font-normal leading-[1.15] text-[clamp(1.8rem,3vw,2.6rem)]"
          >
            A curated house of distinct voices.
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="font-dm text-[#0B1426]/70 mt-6 text-[clamp(1rem,1.3vw,1.13rem)] leading-[1.75] font-light max-w-[60ch] mx-auto"
          >
            Each brand within the portfolio is shaped for a specific audience, emotional world, and
            market position, while drawing from a shared foundation of trust and excellence.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mt-12"
          >
            Signature Brand
          </motion.p>
          <motion.h4
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="font-syne italic text-[#0B1426] mt-3 text-[clamp(1.6rem,2.6vw,2.2rem)] font-normal leading-[1.1]"
          >
            Mayavé
          </motion.h4>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.6, ease }}
            className="font-dm text-[#0B1426]/65 max-w-[58ch] mx-auto mt-5 text-[clamp(0.98rem,1.2vw,1.1rem)] leading-[1.75] font-light"
          >
            Where silence becomes jewellery. A refined expression of bespoke luxury, Mayavé is
            crafted for those who seek rarity, intimacy, and quiet beauty.
          </motion.p>

          {/* Proof points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0B1426]/10 mt-14">
            {PROOFS.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="bg-[#F5F5F7] py-8 px-6"
              >
                <div className="flex items-center justify-center text-[#3B6FFF] mb-3">{p.icon}</div>
                <p className="font-dm text-[#0B1426] text-[12px] font-medium tracking-[0.16em] uppercase">
                  {p.label}
                </p>
                <p className="font-dm text-[#0B1426]/55 text-[13px] mt-1">{p.note}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            className="flex flex-wrap justify-center gap-3 mt-12"
          >
            <Link
              to="/portfolio/mayave"
              className="font-dm group inline-flex items-center gap-2 px-7 h-12 bg-[#3B6FFF] hover:bg-[#14275C] text-white rounded-sm text-[14px] font-semibold transition-colors duration-300"
            >
              Discover Mayavé
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/portfolio"
              className="font-dm inline-flex items-center gap-2 px-7 h-12 border border-[#0B1426]/30 text-[#0B1426] hover:border-[#3B6FFF] hover:text-[#3B6FFF] rounded-sm text-[14px] font-medium transition-all duration-300"
            >
              View Portfolio
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
