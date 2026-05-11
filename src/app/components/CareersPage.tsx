import { Link } from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Pencil,
  Sparkles,
  ShoppingBag,
  Store,
  Cog,
  Building,
} from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const ease = [0.65, 0, 0.35, 1] as const;

/* P10-S02 — 3 culture pillars per build spec */
const PILLARS = [
  {
    n: "01",
    title: "Ambition With Discipline",
    body: "We set high standards and meet them through process, not heroics.",
  },
  {
    n: "02",
    title: "Craft With Modernity",
    body: "We honour traditional jewellery craft while adopting precision technology where it improves outcomes.",
  },
  {
    n: "03",
    title: "Ownership With Integrity",
    body: "We trust our teams with consequential decisions and hold them accountable for outcomes.",
  },
];

/* P10-S03 — 6 functions per build spec */
const FUNCTIONS = [
  { icon: Pencil, label: "Design", desc: "Jewellery, brand, and creative direction." },
  { icon: Sparkles, label: "Brand", desc: "Editorial voice, communications, and positioning." },
  { icon: ShoppingBag, label: "Merchandising", desc: "Collections, assortment, and product planning." },
  { icon: Store, label: "Retail", desc: "Salon, client experience, and direct relationships." },
  { icon: Cog, label: "Operations", desc: "Atelier, supply chain, and production discipline." },
  { icon: Building, label: "Corporate Functions", desc: "Finance, governance, sustainability, and people." },
];

/* Live open roles — used by single role page */
export const ROLES = [
  {
    slug: "senior-jewellery-designer",
    function: "Design",
    title: "Senior Jewellery Designer — Mayavé",
    location: "Surat",
    type: "Full-time",
    posted: "Posted 2 March 2026",
    closing: "Applications close 30 April 2026",
    summary:
      "Lead the next chapter of Mayavé's bridal and heritage collections, working alongside the master atelier in Surat.",
  },
  {
    slug: "junior-jewellery-designer",
    function: "Design",
    title: "Junior Jewellery Designer — Mayavé",
    location: "Surat",
    type: "Full-time",
    posted: "Posted 14 Feb 2026",
    closing: "Applications close 30 April 2026",
    summary:
      "Support the senior design team across concept, CAD, and atelier handoff for Mayavé collections.",
  },
  {
    slug: "cad-designer-mayave",
    function: "Design",
    title: "CAD Designer — Mayavé Atelier",
    location: "Surat",
    type: "Full-time",
    posted: "Posted 22 Feb 2026",
    closing: "Applications close 30 April 2026",
    summary:
      "Translate hand-drawn ideation into production-ready 3D models in close partnership with the master atelier.",
  },
  {
    slug: "brand-designer-dholakia-retail",
    function: "Brand",
    title: "Brand Designer — Dholakia Retail",
    location: "Surat",
    type: "Full-time",
    posted: "Posted 8 Mar 2026",
    closing: "Applications close 30 April 2026",
    summary:
      "Steward the editorial voice across newsroom, journal, and corporate brand surfaces.",
  },
];

/**
 * Page 10 — Careers
 */
export function CareersPage() {
  return (
    <div className="bg-white text-[#0B1426]">
      {/* P10-S01 — Hero */}
      <section
        data-header-theme="dark"
        className="relative h-[80vh] min-h-[560px] flex items-end overflow-hidden bg-[#0B1426]"
      >
        <ImageWithFallback
          src="/assets/images/P10_S01_careers_hero_optA_image.png"
          alt="Careers — team at work"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426] via-[#0B1426]/40 to-transparent" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-20 lg:pb-28 w-full">
          <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
            Careers · Dholakia Retail
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="font-syne text-white font-normal leading-[1.05] tracking-[-0.02em] text-[clamp(2.8rem,6vw,5.4rem)]"
          >
            Build with us.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease }}
            className="font-dm text-white/75 max-w-[58ch] mt-7 text-[clamp(1rem,1.3vw,1.18rem)] leading-[1.7] font-light"
          >
            We hire people who care about craft, who think clearly, and who treat the discipline of
            luxury as a long-term commitment — not a short-term aesthetic.
          </motion.p>
          <div className="flex flex-wrap gap-3 mt-9">
            <a
              href="#open-roles"
              className="font-dm group inline-flex items-center gap-2 px-7 h-12 bg-[#3B6FFF] hover:bg-[#14275C] text-white rounded-sm text-[14px] font-semibold transition-colors duration-300"
            >
              View open roles
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/contact?type=careers"
              className="font-dm inline-flex items-center gap-2 px-7 h-12 border border-white/30 text-white hover:bg-white/10 rounded-sm text-[14px] font-medium transition-all duration-300"
            >
              Submit your profile
            </Link>
          </div>
        </div>
      </section>

      {/* P10-S02 — Culture Pillars */}
      <section className="bg-white py-28 lg:py-36">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
            Culture
          </p>
          <h2 className="font-syne text-[#0B1426] font-normal text-[clamp(1.7rem,2.8vw,2.4rem)] leading-[1.2] max-w-[20ch] mb-14">
            How we operate together.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0B1426]/10">
            {PILLARS.map((p, i) => (
              <motion.article
                key={p.n}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease }}
                className="bg-white p-10 lg:p-14"
              >
                <p className="font-syne italic text-[#3B6FFF] text-[2.4rem] leading-none">{p.n}</p>
                <h3 className="font-syne text-[#0B1426] mt-6 text-[1.4rem] font-medium leading-[1.3]">
                  {p.title}
                </h3>
                <p className="font-dm text-[#0B1426]/65 mt-4 text-[15px] leading-[1.7]">{p.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* P10-S03 — Roles & Functions */}
      <section id="open-roles" className="bg-[#F5F5F7] py-28 lg:py-36 border-y border-[#0B1426]/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
            className="mb-12 max-w-[820px]"
          >
            <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-4">
              Functions
            </p>
            <h2 className="font-syne text-[#0B1426] font-normal text-[clamp(1.7rem,2.8vw,2.4rem)] leading-[1.18]">
              Where you might fit
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[#0B1426]/10 mb-16">
            {FUNCTIONS.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease }}
                className="bg-[#F5F5F7] hover:bg-white p-6 lg:p-7 transition-colors"
              >
                <f.icon size={22} strokeWidth={1.5} className="text-[#3B6FFF]" />
                <p className="font-syne text-[#0B1426] mt-5 text-[15px] font-medium leading-[1.3]">
                  {f.label}
                </p>
                <p className="font-dm text-[#0B1426]/55 mt-2 text-[12.5px] leading-[1.55]">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-8">
            <h3 className="font-syne text-[#0B1426] font-medium text-[clamp(1.2rem,1.8vw,1.5rem)]">
              Currently hiring
            </h3>
            <span className="font-dm text-[#0B1426]/55 text-[12px]">
              {ROLES.length} open roles
            </span>
          </div>

          <ul className="border-t border-[#0B1426]/10">
            {ROLES.map((r, i) => (
              <motion.li
                key={r.slug}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease }}
                className="border-b border-[#0B1426]/10"
              >
                <Link
                  to={`/careers/${r.slug}`}
                  className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-6 py-6 px-2 hover:bg-white/60 hover:pl-4 transition-all duration-300"
                >
                  <div className="md:w-1/2">
                    <p className="font-dm text-[#3B6FFF] text-[10px] font-medium tracking-[0.16em] uppercase">
                      {r.function} · {r.location} · {r.type}
                    </p>
                    <h3 className="font-syne text-[#0B1426] mt-2 text-[clamp(1.1rem,1.5vw,1.3rem)] font-medium leading-[1.3] group-hover:text-[#3B6FFF] transition-colors">
                      {r.title}
                    </h3>
                    <p className="font-dm text-[#0B1426]/55 mt-2 text-[14px]">{r.summary}</p>
                  </div>
                  <p className="md:flex-1 font-dm text-[#0B1426]/60 text-[13px]">{r.posted}</p>
                  <ArrowUpRight
                    size={20}
                    className="text-[#0B1426]/40 group-hover:text-[#3B6FFF] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300"
                  />
                </Link>
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3 mt-12">
            <Link
              to="/contact?type=careers"
              className="font-dm group inline-flex items-center gap-2 px-7 h-12 bg-[#3B6FFF] hover:bg-[#14275C] text-white rounded-sm text-[14px] font-semibold transition-colors duration-300"
            >
              Share your profile
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#open-roles"
              className="font-dm inline-flex items-center gap-2 px-7 h-12 border border-[#0B1426]/30 text-[#0B1426] hover:border-[#3B6FFF] hover:text-[#3B6FFF] rounded-sm text-[14px] font-medium transition-all duration-300"
            >
              View all open roles
            </a>
          </div>
        </div>
      </section>

      {/* P10-S04 — Closing Statement */}
      <section className="bg-white py-32 lg:py-40">
        <div className="max-w-[820px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <h2 className="font-syne text-[#0B1426] font-normal text-[clamp(1.7rem,2.8vw,2.4rem)] leading-[1.2]">
            Speak to us about a career.
          </h2>
          <p className="font-dm text-[#0B1426]/65 mt-5 max-w-[58ch] mx-auto text-[1.05rem] leading-[1.7]">
            Send your profile, your portfolio, or simply a note. Every serious application is read by
            a human.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-9">
            <Link
              to="/contact?type=careers"
              className="font-dm group inline-flex items-center gap-2 px-8 h-12 bg-[#3B6FFF] hover:bg-[#14275C] text-white rounded-sm text-[14px] font-semibold transition-colors duration-300"
            >
              Share your profile
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="font-dm inline-flex items-center gap-2 px-8 h-12 border border-[#0B1426]/30 text-[#0B1426] hover:border-[#3B6FFF] hover:text-[#3B6FFF] rounded-sm text-[14px] font-medium transition-all duration-300"
            >
              Visit Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
