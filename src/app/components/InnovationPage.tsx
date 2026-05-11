import { Link } from "react-router";
import { ArrowRight, Sparkles, Layers, Gem, Scissors, Box } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const ease = [0.65, 0, 0.35, 1] as const;

const PROCESS_STEPS = [
  {
    n: "01",
    icon: Sparkles,
    title: "Diamond Seed",
    body: "A microscopic carbon seed begins the controlled growth — the moment a future stone is committed to.",
  },
  {
    n: "02",
    icon: Layers,
    title: "Controlled Growth",
    body: "CVD chambers recreate the conditions under which diamond forms, layer by layer, atom by atom.",
  },
  {
    n: "03",
    icon: Gem,
    title: "Crystal Development",
    body: "The rough develops over weeks; structure, colour, and clarity are monitored continuously.",
  },
  {
    n: "04",
    icon: Scissors,
    title: "Cutting & Polishing",
    body: "Master cutters bring the rough to its final geometry — precision cutting refined over generations.",
  },
  {
    n: "05",
    icon: Box,
    title: "Jewellery Application",
    body: "The finished stone is set, finished, and prepared for the piece it has been made for.",
  },
];

/**
 * Page 7 — Innovation
 */
export function InnovationPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <div className="bg-white text-[#0B1426]">
      {/* P07-S01 — Hero */}
      <section
        ref={heroRef}
        data-header-theme="dark"
        className="relative h-screen min-h-[600px] flex items-end overflow-hidden bg-[#0B1426]"
      >
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <ImageWithFallback
            src="/assets/images/P07_S01_innovation_hero_optA_image.png"
            alt="Innovation — precision technology"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426] via-[#0B1426]/30 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-20 lg:pb-32 w-full">
          <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
            Innovation
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="font-syne text-white font-normal leading-[1.05] tracking-[-0.02em] text-[clamp(2.4rem,5.5vw,5rem)] max-w-[14ch]"
          >
            Precision Is the New Luxury
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease }}
            className="font-dm text-white/75 max-w-[58ch] mt-7 text-[clamp(1rem,1.3vw,1.18rem)] leading-[1.7] font-light"
          >
            Innovation makes luxury more consistent, more scalable, and more relevant to the next
            generation of consumers.
          </motion.p>
        </div>
      </section>

      {/* P07-S02 — Lab-Grown Diamond Story */}
      <section className="bg-[#F5F5F7] py-32 lg:py-40 border-y border-[#0B1426]/10">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
              Lab-Grown Diamonds
            </p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease }}
              className="font-syne text-[#0B1426] font-normal text-[clamp(1.7rem,2.8vw,2.4rem)] leading-[1.18]"
            >
              Technology as controlled brilliance.
            </motion.h2>
            <p className="font-dm text-[#0B1426]/70 mt-6 text-[clamp(1rem,1.3vw,1.13rem)] leading-[1.75] font-light">
              Public Dholakia Group messaging describes advanced CVD processes refined to reduce
              colour and defects while recreating the natural conditions that form diamond.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease }}
            className="aspect-[16/10] overflow-hidden bg-white"
          >
            <ImageWithFallback
              src="/assets/images/P07_S02_innovation_lab_grown_diamond_story_optA_image.png"
              alt="Lab-grown diamond rough"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* P07-S03 — Process Explainer */}
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
            <h2 className="font-syne text-[#0B1426] font-normal text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.15]">
              From seed to setting.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease }}
            className="aspect-[16/9] overflow-hidden bg-[#F5F5F7] mb-14"
          >
            <ImageWithFallback
              src="/assets/images/P07_S03_innovation_process_explainer_optA_image.png"
              alt="CVD process — diamond growth chamber"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-9 left-12 right-12 h-px bg-[#3B6FFF]/30" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-px lg:gap-0">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease }}
                  className="relative bg-white px-4 py-6 text-center"
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#F5F5F7] border border-[#3B6FFF] text-[#3B6FFF] flex items-center justify-center relative z-10">
                    <step.icon size={20} strokeWidth={1.5} />
                  </div>
                  <p className="font-syne italic text-[#3B6FFF] text-[14px] mt-4">{step.n}</p>
                  <h3 className="font-syne text-[#0B1426] text-[16px] font-medium mt-1.5">
                    {step.title}
                  </h3>
                  <p className="font-dm text-[#0B1426]/55 mt-2 text-[13px] leading-[1.6] max-w-[28ch] mx-auto">
                    {step.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* P07-S04 — Quality & Relevance */}
      <section className="bg-[#F5F5F7] py-28 lg:py-36 border-y border-[#0B1426]/10">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease }}
            className="aspect-[16/10] overflow-hidden bg-white order-2 lg:order-1"
          >
            <ImageWithFallback
              src="/assets/images/P07_S04_innovation_quality_relevance_optA_image.png"
              alt="Quality, control, and consistency"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="order-1 lg:order-2">
            <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
              Why It Matters
            </p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease }}
              className="font-syne text-[#0B1426] font-normal text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.18]"
            >
              Why this matters for a luxury brand house.
            </motion.h2>
            <p className="font-dm text-[#0B1426]/65 mt-6 text-[clamp(1rem,1.3vw,1.13rem)] leading-[1.75] font-light">
              Technology strengthens control, consistency, and credibility — qualities that matter
              deeply when building enduring luxury brands.
            </p>
          </div>
        </div>
      </section>

      {/* P07-S05 — CTA */}
      <section className="bg-white py-28 lg:py-36">
        <div className="max-w-[820px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <Link
            to="/contact?type=partnership"
            className="font-dm group inline-flex items-center gap-2 px-8 h-13 bg-[#3B6FFF] hover:bg-[#14275C] text-white rounded-sm text-[14px] font-semibold transition-colors duration-300"
          >
            Explore the wider approach
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
