import { Link } from "react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { motion } from "motion/react";

const ease = [0.76, 0, 0.24, 1] as const;

const locations = [
  {
    num: "01",
    city: "Surat",
    role: "Corporate Base",
    body: "The corporate seat of Dholakia Retail, located within Surat's Gem & Jewellery Park — at the centre of India's diamond ecosystem.",
    address: "Gem & Jewellery Park, Ichhapore, Surat, Gujarat – 394510, India",
  },
  {
    num: "02",
    city: "Mumbai",
    role: "Commercial Presence",
    body: "Linked through commercial and retail-facing engagements, supporting brand-development conversations and partner relations.",
    address: "Commercial liaison — by appointment",
  },
  {
    num: "03",
    city: "International",
    role: "Wider Group Footprint",
    body: "Connected through the wider Dholakia Group's established presence — Antwerp, Hong Kong, New York — for sourcing, partnerships, and brand expansion.",
    address: "Wider group offices and partner facilities",
  },
];

export function GlobalPresencePage() {
  return (
    <div className="bg-bg-deep text-text-primary">
      {/* HERO */}
      <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden bg-bg-deep">
        <div className="absolute inset-0 opacity-30">
          <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet" className="w-full h-full">
            <defs>
              <pattern id="globegrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--brand-primary)" strokeWidth="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#globegrid)" />
            <motion.ellipse initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3.5, ease: "easeOut" }} cx="600" cy="300" rx="500" ry="220" fill="none" stroke="var(--brand-primary)" strokeWidth="1" />
            <motion.ellipse initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3.5, ease: "easeOut", delay: 0.4 }} cx="600" cy="300" rx="320" ry="140" fill="none" stroke="var(--brand-primary)" strokeWidth="0.7" />
            {/* location dots */}
            {[
              { x: 480, y: 240 }, // Surat
              { x: 510, y: 250 }, // Mumbai
              { x: 720, y: 215 }, // Asia
              { x: 320, y: 220 }, // Europe
              { x: 270, y: 290 }, // NY
            ].map((p, i) => (
              <motion.circle
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.5 + i * 0.15, duration: 0.5 }}
                cx={p.x} cy={p.y} r="6"
                fill="var(--brand-primary)"
              />
            ))}
          </svg>
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-20 lg:pb-32 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: ease }}>
            <span className="font-grotesk text-text-secondary tracking-[0.22em] uppercase text-[12px] font-semibold">Global Presence</span>
            <h1 className="font-syne mt-6 max-w-3xl text-text-primary tracking-tighter text-[clamp(2.4rem,5vw,4.6rem)] font-bold leading-[1.05]">
              Rooted in Surat.<br /><span className="italic font-light text-text-secondary">Built for beyond.</span>
            </h1>
            <p className="font-dm mt-8 max-w-xl text-text-secondary text-[17px] leading-[1.85]">
              Dholakia Retail draws on Surat's standing in the diamond ecosystem while shaping a global growth story of its own.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ECOSYSTEM FOOTPRINT */}
      <section className="py-28 lg:py-40 bg-bg-surface border-y border-glass-border">
        <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: ease }} className="text-center mb-20 max-w-2xl mx-auto">
            <span className="font-grotesk text-text-muted tracking-[0.22em] uppercase text-[12px] font-semibold">Ecosystem Footprint</span>
            <h2 className="font-syne mt-4 text-text-primary text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold leading-[1.15]">
              From Surat outward.
            </h2>
            <p className="font-dm mt-6 text-text-secondary text-[15px] leading-[1.85]">
              Dholakia Retail's own footprint, supported by the wider Dholakia Group's established international relationships.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locations.map((l, i) => (
              <motion.div
                key={l.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: ease }}
                whileHover={{ y: -4 }}
                className="p-10 rounded-3xl bg-bg-surface-elevated border border-glass-border hover:border-brand-primary/30 transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="font-syne italic font-light text-brand-primary text-[2.4rem] leading-none">{l.num}</div>
                  <MapPin size={20} strokeWidth={1.5} className="text-brand-primary" />
                </div>
                <h3 className="font-syne text-text-primary text-[26px] font-bold tracking-[-0.02em]">{l.city}</h3>
                <p className="font-grotesk mt-2 text-text-muted tracking-[0.16em] uppercase text-[11px] font-semibold">{l.role}</p>
                <p className="font-dm mt-5 text-text-secondary text-[15px] leading-[1.8]">{l.body}</p>
                <div className="mt-6 pt-6 border-t border-glass-border">
                  <p className="font-grotesk text-text-muted tracking-[0.14em] uppercase text-[10px] font-semibold mb-2">Address</p>
                  <p className="font-dm text-text-secondary text-[13px] leading-[1.7]">{l.address}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-dm mt-10 text-text-muted text-center italic text-[13px]"
          >
            Note: Locations 02 and 03 reflect commercial liaisons and the wider Dholakia Group footprint, not a separate retail network.
          </motion.p>
        </div>
      </section>

      {/* PARTNERSHIPS — long-form essay */}
      <section className="py-28 lg:py-40 bg-bg-deep">
        <div className="max-w-[760px] mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: ease }} className="mb-12">
            <span className="font-grotesk text-text-muted tracking-[0.22em] uppercase text-[12px] font-semibold">Partnerships</span>
            <h2 className="font-syne mt-4 text-text-primary text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold leading-[1.15]">
              A platform built for partnerships.
            </h2>
          </motion.div>
          <div className="space-y-7 font-dm text-text-secondary text-[16px] leading-[1.9]">
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: ease }}>
              Our structure is purpose-built for retail development, strategic growth, and serious brand expansion conversations. We are open to partners aligned with the platform's values — heritage, ethics, and the discipline of restraint.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1, ease: ease }}>
              Whether you are an emerging house seeking governance and creative direction, an established brand exploring portfolio integration, or a retail partner with a proposition that fits, we welcome the conversation.
            </motion.p>
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: ease }}
              className="border-l-2 border-brand-primary pl-6 my-8 font-syne italic text-text-primary text-[clamp(1.2rem,2vw,1.6rem)] leading-[1.4]"
            >
              We don't grow by adding logos. We grow by adding houses we can stand behind for decades.
            </motion.blockquote>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1, ease: ease }}>
              Partnership conversations move at the pace of due diligence — never the pace of campaigns. The first call is always private and exploratory.
            </motion.p>
          </div>
        </div>
      </section>

      {/* CLOSER CTA */}
      <section className="py-24 lg:py-32 bg-bg-surface border-t border-glass-border">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: ease }}
            className="font-syne text-text-primary text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.15]"
          >
            Begin a partnership conversation.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: ease }}
          >
            <p className="font-dm text-text-secondary text-[16px] leading-[1.85]">
              Every serious enquiry is read by the partnerships team and answered within 48 hours.
            </p>
            <Link
              to="/contact?type=partnership"
              className="font-grotesk group inline-flex items-center gap-3 mt-8 px-8 py-4 bg-text-primary text-bg-deep rounded-full text-[14px] font-semibold tracking-[0.04em]"
            >
              Begin a partnership conversation
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
