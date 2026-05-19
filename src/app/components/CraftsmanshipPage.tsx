import { Link } from "react-router";
import { ArrowRight, Pencil, Gem, Grid3x3, Wrench, Package } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { OptimizedVideo } from "./ui/OptimizedVideo";

const ease = [0.65, 0, 0.35, 1] as const;

const PROCESS = [
  { n: "01", icon: Pencil, label: "Concept", desc: "The first sketch — a brief translated into form." },
  { n: "02", icon: Gem, label: "Material Understanding", desc: "Stone selection, metal alloying, provenance verification." },
  { n: "03", icon: Grid3x3, label: "Design Development", desc: "Iteration through CAD, prototype, and weight study." },
  { n: "04", icon: Wrench, label: "Setting & Finishing", desc: "Hand-set stones, hand-polished surfaces, hand-checked tolerances." },
  { n: "05", icon: Package, label: "Presentation", desc: "Bench-finished piece, packaged for the moment of arrival." },
];

/**
 * Page 5 — Craftsmanship
 */
export function CraftsmanshipPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <div className="bg-white text-[#0B1426]">
      {/* P05-S01 — Hero */}
      <section
        ref={heroRef}
        data-header-theme="dark"
        className="relative h-screen min-h-[600px] flex items-end overflow-hidden bg-[#0B1426]"
      >
        <motion.div data-gpu style={{ scale: heroScale }} className="absolute inset-0">
          <OptimizedVideo
            src="/assets/videos/P05_S01_craftsmanship_hero_optA_video_1.mp4"
            poster="/assets/images/P05_S01_craftsmanship_hero_optA_image.png"
            posterAlt="Artisan hands at work"
            eager
            preload="auto"
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426] via-[#0B1426]/30 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-20 lg:pb-32 w-full">
          <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
            Craftsmanship
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="font-syne text-white font-normal leading-[1.05] text-[clamp(2.4rem,5.5vw,5rem)] max-w-[16ch]"
          >
            The Hand Behind the Brilliance
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease }}
            className="font-dm text-white/75 max-w-[58ch] mt-7 text-[clamp(1rem,1.3vw,1.18rem)] leading-[1.7] font-light"
          >
            Luxury jewellery is defined by detail, balance, finish, and the intelligence of skilled hands.
          </motion.p>
        </div>
      </section>

      {/* P05-S02 — Craft Philosophy */}
      <section className="bg-[#F5F5F7] py-32 lg:py-44 border-y border-[#0B1426]/10">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease }}
            className="aspect-[4/3] overflow-hidden bg-white mb-14 max-w-[640px] mx-auto rounded-2xl"
          >
            <ImageWithFallback
              src="/assets/images/P05_S02_craftsmanship_craft_philosophy_optA_image.png"
              alt="Craft macro detail"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
        <div className="max-w-[640px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="font-syne text-[#0B1426] font-normal text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.18] tracking-[-0.01em]"
          >
            Every detail must earn its place.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="font-dm text-[#0B1426]/65 mt-7 text-[clamp(1rem,1.3vw,1.13rem)] leading-[1.75] font-light"
          >
            Proportion, polish, setting, and finish are never accidental. They are the result of
            disciplined craft decisions made with patience and care.
          </motion.p>
        </div>
      </section>

      {/* P05-S03 — Making Ecosystem · split */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[640px] overflow-hidden bg-[#0B1426]">
          <ImageWithFallback
            src="/assets/images/P05_S01_craftsmanship_hero_optA_image.png"
            alt="Surat manufacturing facility"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1426]/60 via-transparent to-transparent" />
        </div>
        <div className="bg-[#F5F5F7] flex items-center px-8 lg:px-20 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease }}
            className="max-w-[520px]"
          >
            <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
              Ecosystem
            </p>
            <h2 className="font-syne text-[#0B1426] font-normal text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.18]">
              Where design, manufacturing, and finish meet.
            </h2>
            <p className="font-dm text-[#0B1426]/65 mt-5 text-[15px] leading-[1.7] font-light">
              Across the wider Dholakia ecosystem, craft is strengthened by systems, expertise, and a
              commitment to quality at every stage.
            </p>
            <Link
              to="/innovation"
              className="font-dm group inline-flex items-center gap-2 mt-8 text-[#3B6FFF] text-[13.5px] font-semibold"
            >
              Visit the Surat workshop
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* P05-S04 — Process Timeline */}
      <section className="bg-white py-28 lg:py-36">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="mb-14 max-w-[820px]"
          >
            <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
              Process
            </p>
            <h2 className="font-syne text-[#0B1426] font-normal text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.18]">
              Five steps. No shortcuts.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease }}
            className="aspect-[16/9] overflow-hidden bg-[#F5F5F7] mb-14 rounded-2xl"
          >
            <ImageWithFallback
              src="/assets/images/P05_S04_craftsmanship_process_timeline_optA_image.png"
              alt="Atelier process — step by step"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="relative">
            {/* Connecting flow line behind cards (desktop) */}
            <div
              aria-hidden
              className="hidden lg:block absolute top-[68px] left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-[#3B6FFF]/35 to-transparent"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-5">
              {PROCESS.map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease }}
                  className="group relative bg-white rounded-2xl p-7 lg:p-6 border border-[#0B1426]/8 hover:border-[#3B6FFF]/40 hover:shadow-[0_28px_60px_-22px_rgba(59,111,255,0.28)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden"
                >
                  {/* Decorative watermark numeral */}
                  {/* <span
                    aria-hidden
                    className="font-syne italic text-[#3B6FFF]/[0.06] group-hover:text-[#3B6FFF]/[0.14] absolute -top-6 -right-3 text-[7.5rem] leading-none select-none pointer-events-none transition-colors duration-700"
                  >
                    {step.n}
                  </span> */}

                  <div className="relative z-10">
                    {/* Gradient icon badge */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3B6FFF] to-[#14275C] text-white flex items-center justify-center shadow-[0_10px_24px_-8px_rgba(59,111,255,0.55)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                      <step.icon size={22} strokeWidth={1.75} />
                    </div>

                    <p className="font-mono text-[#3B6FFF] text-[10.5px] tracking-[0.22em] uppercase mt-7">
                      Step · {step.n}
                    </p>

                    <h3 className="font-syne text-[#0B1426] text-[17px] font-medium leading-[1.25] mt-2 tracking-[-0.005em]">
                      {step.label}
                    </h3>

                    <p className="font-dm text-[#0B1426]/65 mt-3 text-[13.5px] leading-[1.65] font-light">
                      {step.desc}
                    </p>
                  </div>

                  {/* Animated bottom accent on hover */}
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#3B6FFF] to-transparent scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-700"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* P05-S05 — Editorial Quote */}
      <section className="bg-[#F5F5F7] py-32 lg:py-44 border-y border-[#0B1426]/10 relative">
        <span
          aria-hidden
          className="font-syne italic text-[#3B6FFF]/8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16rem] leading-none select-none pointer-events-none"
        >
          "
        </span>
        <div className="relative max-w-[820px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease }}
            className="font-syne text-[#0B1426] font-normal italic text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.18] tracking-[-0.01em]"
          >
            Craft is not a style. It is a discipline of attention.
          </motion.blockquote>
        </div>
      </section>
    </div>
  );
}
