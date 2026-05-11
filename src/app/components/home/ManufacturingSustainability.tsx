import { motion, MotionValue, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Play, X } from "lucide-react";
import { useRef, useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ease, IMG } from "./constants";

interface Props {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}

/**
 * P01-S06 — Brand Film band — single-CTA play interaction with modal
 * P01-S07 — Sustainability Teaser — full-bleed parallax band
 */
export function ManufacturingSustainabilitySection({ smoothX, smoothY }: Props) {
  const [filmOpen, setFilmOpen] = useState(false);
  const sustRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sustRef, offset: ["start end", "end start"] });
  const sustY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const sustScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const sustMx = useTransform(smoothX, [-1, 1], ["18px", "-18px"]);
  const sustMy = useTransform(smoothY, [-1, 1], ["18px", "-18px"]);

  return (
    <>
      {/* P01-S06 — Brand Film */}
      <section
        data-header-theme="dark"
        className="relative bg-[#0B1426] py-32 lg:py-40 overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="text-center mb-14"
          >
            <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase">
              Film
            </p>
            <h2 className="font-syne text-white font-normal italic mt-5 text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.2]">
              A quiet look inside the house.
            </h2>
            <p className="font-dm mt-4 max-w-[52ch] mx-auto text-white/60 text-[15px] leading-[1.7]">
              A short visual introduction to the values, atmosphere, and standards behind Dholakia Retail.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease }}
            className="relative aspect-[16/9] overflow-hidden border border-white/10 group"
          >
            <ImageWithFallback
              src={IMG.filmPoster}
              alt="Brand film poster"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={IMG.filmPoster}
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            >
              <source src={IMG.filmVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B1426]/30 via-transparent to-[#0B1426]/40" />

            <button
              onClick={() => setFilmOpen(true)}
              aria-label="Watch the film"
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="relative inline-flex items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-[#3B6FFF]/40 animate-ping" />
                <span className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#3B6FFF] text-white shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <Play size={28} fill="currentColor" />
                </span>
              </span>
            </button>

            <p className="absolute bottom-6 left-6 font-mono text-white/65 text-[11px] tracking-[0.16em]">
              02:30 · Silent · 4K
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-center mt-10"
          >
            <button
              onClick={() => setFilmOpen(true)}
              className="font-dm group inline-flex items-center gap-2 px-7 h-12 bg-[#3B6FFF] hover:bg-[#14275C] text-white rounded-sm text-[14px] font-semibold transition-colors duration-300"
            >
              Watch the film
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>

        {/* Film modal */}
        <AnimatePresence>
          {filmOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              role="dialog"
              aria-modal
              aria-label="Brand film"
              className="fixed inset-0 z-[60] bg-black/96 flex items-center justify-center p-4"
              onClick={() => setFilmOpen(false)}
            >
              <button
                onClick={() => setFilmOpen(false)}
                className="absolute top-6 right-6 text-white/80 hover:text-white p-2"
                aria-label="Close film"
              >
                <X size={24} />
              </button>
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.3, ease }}
                className="w-full max-w-[1280px] aspect-video"
                onClick={(e) => e.stopPropagation()}
              >
                <video
                  autoPlay
                  controls
                  className="w-full h-full object-contain"
                  src={IMG.filmVideo}
                  poster={IMG.filmPoster}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* P01-S07 — Sustainability Teaser */}
      <section
        ref={sustRef}
        data-header-theme="dark"
        className="relative h-[100vh] min-h-[600px] overflow-hidden bg-[#08203D]"
      >
        <motion.div
          style={{ y: sustY, scale: sustScale, x: sustMx }}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          <motion.div style={{ y: sustMy }} className="w-full h-full">
            <ImageWithFallback
              src={IMG.sustainability}
              alt="Solar field at blue hour"
              className="w-full h-full object-cover opacity-65"
            />
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={IMG.sustainability}
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            >
              <source src={IMG.sustainabilityVideo} type="video/mp4" />
            </video>
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#08203D] via-[#08203D]/40 to-transparent" />

        <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col justify-end pb-20 lg:pb-32">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="font-dm text-[#6B8AC9] text-[11px] font-medium tracking-[0.22em] uppercase mb-5"
          >
            Responsibility
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="font-syne text-white font-normal leading-[1.05] tracking-[-0.02em] text-[clamp(2rem,4.4vw,3.8rem)] max-w-[18ch]"
          >
            Luxury with a stronger sense of accountability.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="font-dm text-white/75 max-w-[58ch] mt-7 text-[clamp(1rem,1.3vw,1.13rem)] leading-[1.7] font-light"
          >
            The future of jewellery depends on beauty, traceability, and how brilliance is created.
            Responsibility is not a side note. It is part of the value itself.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.55, ease }}
            className="mt-9"
          >
            <Link
              to="/sustainability"
              className="font-dm group inline-flex items-center gap-2 px-7 h-12 bg-white/10 hover:bg-white text-white hover:text-[#0B1426] rounded-sm text-[14px] font-semibold border border-white/30 hover:border-white transition-all duration-300 backdrop-blur-md"
            >
              Explore Sustainability
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
