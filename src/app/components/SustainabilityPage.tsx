import { Link } from "react-router";
import { ArrowRight, Search, Sprout, Eye, Infinity as InfinityIcon, Download } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { OptimizedVideo } from "./ui/OptimizedVideo";

const ease = [0.65, 0, 0.35, 1] as const;

const PILLARS = [
  {
    icon: Search,
    title: "Traceability",
    body: "Every stone and material is tracked from origin through production, so each piece carries verifiable history.",
  },
  {
    icon: Sprout,
    title: "Responsible Creation",
    body: "Lab-grown diamonds and ethically sourced materials reduce environmental and human cost without compromising beauty.",
  },
  {
    icon: Eye,
    title: "Transparency",
    body: "Clear, accessible information on certifications, processes, and standards is part of the product, not a separate document.",
  },
  {
    icon: InfinityIcon,
    title: "Long-Term Value",
    body: "Pieces are designed and made to outlast trends — durable, repairable, and built to be inherited.",
  },
];

/**
 * Page 6 — Sustainability
 */
export function SustainabilityPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <div className="bg-white text-[#0B1426]">
      {/* P06-S01 — Hero */}
      <section
        ref={heroRef}
        data-header-theme="dark"
        className="relative h-screen min-h-[600px] flex items-end overflow-hidden bg-[#08203D]"
      >
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <ImageWithFallback
            src="/assets/images/P06_S01_sustainability_hero_optA_image.png"
            alt="Sustainability — environmental documentary"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08203D] via-[#08203D]/40 to-[#08203D]/30" />
        </motion.div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-20 lg:pb-32 w-full">
          <p className="font-dm text-[#6B8AC9] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
            Sustainability
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="font-syne text-white font-normal leading-[1.05] tracking-[-0.02em] text-[clamp(2.4rem,5.5vw,5rem)] max-w-[14ch]"
          >
            Luxury, Reconsidered
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease }}
            className="font-dm text-white/75 max-w-[58ch] mt-7 text-[clamp(1rem,1.3vw,1.18rem)] leading-[1.7] font-light"
          >
            The future of jewellery must consider not only beauty, but how it is created, verified,
            and carried forward.
          </motion.p>
        </div>
      </section>

      {/* P06-S02 — Pillars */}
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
              Pillars
            </p>
            <h2 className="font-syne text-[#0B1426] font-normal text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.15] tracking-[-0.01em]">
              Four commitments held above expediency.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#0B1426]/10">
            {PILLARS.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease }}
                className="bg-white p-10 lg:p-12 group"
              >
                <p.icon size={28} strokeWidth={1.5} className="text-[#3B6FFF]" />
                <h3 className="font-syne text-[#0B1426] mt-7 text-[1.4rem] font-medium leading-[1.3]">
                  {p.title}
                </h3>
                <p className="font-dm text-[#0B1426]/65 mt-4 text-[15px] leading-[1.7]">{p.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* P06-S03 — Wider Group Context · split */}
      <section className="grid grid-cols-1 lg:grid-cols-2 bg-[#F5F5F7]">
        <div className="px-8 lg:px-20 py-20 lg:py-28 flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease }}
            className="max-w-[520px]"
          >
            <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
              Wider Group
            </p>
            <h2 className="font-syne text-[#0B1426] font-normal text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.18]">
              A broader sustainability narrative.
            </h2>
            <p className="font-dm text-[#0B1426]/65 mt-5 text-[15px] leading-[1.75] font-light">
              The wider Dholakia Group publicly describes its lab-grown diamond production as
              solar-powered and certified under SCS 007, reinforcing a more accountable model of
              diamond creation.
            </p>
          </motion.div>
        </div>
        <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[560px] overflow-hidden">
          <OptimizedVideo
            src="/assets/videos/P06_S03_sustainability_wider_group_context_optA_video.mp4"
            poster="/assets/images/P06_S03_sustainability_wider_group_context_optA_image.png"
            posterAlt="Wider Group context — solar-powered lab-grown diamond facility"
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </section>

      {/* P06-S04 — Manifesto */}
      <section
        data-header-theme="dark"
        className="bg-[#08203D] text-white py-32 lg:py-44"
      >
        <div className="max-w-[820px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="font-syne font-normal italic text-[clamp(1.7rem,3vw,2.4rem)] leading-[1.2]"
          >
            Responsibility should feel precise, not performative.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="font-dm text-white/72 mt-8 text-[clamp(1rem,1.3vw,1.13rem)] leading-[1.7] font-light"
          >
            We measure what matters and report it plainly. Certifications, audited supply chains, and
            verifiable processes are how we work — not how we market. The goal is a record that holds
            up to inspection, year after year.
          </motion.p>
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <Link
              to="/contact?type=press"
              className="font-dm group inline-flex items-center gap-2 px-7 h-12 bg-[#3B6FFF] hover:bg-[#14275C] text-white rounded-sm text-[14px] font-semibold transition-colors duration-300"
            >
              Request our ESG materials
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <a
              href="/press-kit"
              className="font-dm inline-flex items-center gap-2 px-7 h-12 border border-white/30 text-white hover:bg-white/10 rounded-sm text-[14px] font-medium transition-all duration-300"
            >
              <Download size={15} /> Press kit
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
