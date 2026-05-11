import { Link } from "react-router";
import { Building2, Briefcase, Globe2, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const ease = [0.65, 0, 0.35, 1] as const;

/* P08-S02 — 3 locations per build spec */
const FOOTPRINT = [
  {
    icon: Building2,
    region: "01",
    city: "Surat",
    note: "Headquarters and diamond ecosystem base",
  },
  {
    icon: Briefcase,
    region: "02",
    city: "Mumbai",
    note: "Commercial and brand activation hub",
  },
  {
    icon: Globe2,
    region: "03",
    city: "New York-linked group presence",
    note: "Wider Dholakia Group context",
  },
];

/**
 * Page 8 — Global Presence & Partnerships
 */
export function GlobalPresencePage() {
  return (
    <div className="bg-white text-[#0B1426]">
      {/* P08-S01 — Hero */}
      <section
        data-header-theme="dark"
        className="relative h-[80vh] min-h-[560px] flex items-end overflow-hidden bg-[#0B1426]"
      >
        <ImageWithFallback
          src="/assets/images/P08_S01_global_presence_partnerships_hero_optA_image.png"
          alt="Surat — global gateway"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426] via-[#0B1426]/40 to-transparent" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-20 lg:pb-28 w-full">
          <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
            Global Presence
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="font-syne text-white font-normal leading-[1.05] tracking-[-0.02em] text-[clamp(2.2rem,5vw,4.4rem)] max-w-[20ch]"
          >
            Built in Surat. Positioned for Broader Markets.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease }}
            className="font-dm text-white/75 max-w-[58ch] mt-7 text-[clamp(1rem,1.3vw,1.18rem)] leading-[1.7] font-light"
          >
            Dholakia Retail draws strength from Surat's place within the diamond ecosystem while
            aligning to a broader global growth story.
          </motion.p>
        </div>
      </section>

      {/* P08-S02 — Ecosystem Footprint */}
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
              Footprint
            </p>
            <h2 className="font-syne text-[#0B1426] font-normal text-[clamp(1.7rem,2.8vw,2.4rem)] leading-[1.18]">
              Where the house operates today.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0B1426]/10">
            {FOOTPRINT.map((f, i) => (
              <motion.div
                key={f.region}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="bg-white p-10 lg:p-12"
              >
                <f.icon size={26} strokeWidth={1.5} className="text-[#3B6FFF]" />
                <p className="font-syne italic text-[#3B6FFF] text-[1.6rem] mt-6 leading-none">
                  {f.region}
                </p>
                <p className="font-syne text-[#0B1426] mt-3 text-[clamp(1.2rem,1.6vw,1.5rem)] font-medium leading-[1.3]">
                  {f.city}
                </p>
                <p className="font-dm text-[#0B1426]/65 mt-3 text-[14px] leading-[1.6]">{f.note}</p>
              </motion.div>
            ))}
          </div>
          <p className="font-dm text-[#0B1426]/45 text-[12.5px] mt-6 italic">
            Phrasing carefully distinguishes Dholakia Retail from the wider group context.
          </p>
        </div>
      </section>

      {/* P08-S03 — Partnerships */}
      <section className="bg-[#F5F5F7] py-28 lg:py-36 border-y border-[#0B1426]/10">
        <div className="max-w-[820px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
            Partnerships
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="font-syne text-[#0B1426] font-normal text-[clamp(1.7rem,2.8vw,2.4rem)] leading-[1.18]"
          >
            Designed for future collaboration.
          </motion.h2>
          <p className="font-dm text-[#0B1426]/65 mt-6 text-[clamp(1rem,1.3vw,1.13rem)] leading-[1.75] font-light">
            The platform is built to support partnerships across retail development, strategic
            growth, and brand expansion conversations.
          </p>
        </div>
      </section>

      {/* P08-S04 — CTA */}
      <section className="bg-white py-28 lg:py-36">
        <div className="max-w-[820px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <h2 className="font-syne text-[#0B1426] font-normal text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.2]">
            Open to partners with the right ambition.
          </h2>
          <Link
            to="/contact?type=partnership"
            className="font-dm group inline-flex items-center gap-2 mt-8 px-8 h-13 bg-[#3B6FFF] hover:bg-[#14275C] text-white rounded-sm text-[14px] font-semibold transition-colors duration-300"
          >
            Partner with the House
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  );
}
