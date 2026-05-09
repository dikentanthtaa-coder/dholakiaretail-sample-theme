import { Link } from "react-router";
import { ArrowRight, Cpu, Microscope, Layers, ShieldCheck, Check, X } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const ease = [0.76, 0, 0.24, 1] as const;

const areas = [
  { icon: <Cpu size={28} strokeWidth={1.5} />, title: "Precision Cutting", body: "Machine-assisted cutting and finishing techniques refine consistency to a degree the hand alone cannot reach. The bench remains the soul; the machine sharpens its hand." },
  { icon: <Microscope size={28} strokeWidth={1.5} />, title: "Lab-Grown Diamonds", body: "Public Dholakia Group communications describe refined CVD processes that recreate the conditions that form diamond — with reduced colour and defect rates, certified to SCS-007." },
  { icon: <Layers size={28} strokeWidth={1.5} />, title: "Provenance & Tech", body: "Traceability platforms record origin, cut, and journey of each stone. The information is part of the product, not the paperwork." },
  { icon: <ShieldCheck size={28} strokeWidth={1.5} />, title: "Quality Systems", body: "ISO-aligned QMS, audited supply chains, and review cycles built to stand inspection — credibility that survives time." },
];

const steps = [
  { num: "01", title: "Seed Selection", body: "Research-grade seed crystals selected for purity and structure — the foundation of every controlled growth cycle." },
  { num: "02", title: "Controlled Growth Chamber", body: "CVD chambers replicate the precise conditions diamond requires to form, monitored continuously for stability." },
  { num: "03", title: "Crystal Maturation", body: "Crystal grows over weeks, layer by layer, under controlled gas mixture and temperature curves." },
  { num: "04", title: "Cutting & Polishing", body: "Precision cutting equipment and master cutters take the rough crystal to its final geometry, light, and finish." },
  { num: "05", title: "Setting in Jewellery", body: "Stones move to the bench — set, finished, and prepared for the piece they were always meant for." },
];

const compare = [
  { criterion: "Origin", a: "Earth-mined", b: "Lab-grown", c: "Audited & certified", aPos: false, bPos: false, cPos: true },
  { criterion: "Sourcing", a: "Variable", b: "Controlled", c: "Traceable end-to-end", aPos: false, bPos: true, cPos: true },
  { criterion: "Carbon Footprint", a: "Higher", b: "Lower (solar-powered)", c: "Disclosed publicly", aPos: false, bPos: true, cPos: true },
  { criterion: "Certification", a: "Kimberley Process", b: "SCS-007 standard", c: "RJC + KP + SCS-007", aPos: true, bPos: true, cPos: true },
  { criterion: "Long-term value", a: "Established", b: "Emerging", c: "Engineered to outlast", aPos: true, bPos: false, cPos: true },
];

export function InnovationPage() {
  return (
    <div className="bg-bg-deep text-text-primary">
      {/* HERO */}
      <section className="relative h-screen min-h-[640px] flex items-end overflow-hidden bg-bg-surface">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <defs>
              <pattern id="innogrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--brand-primary)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#innogrid)" />
            <motion.circle initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeOut" }} cx="600" cy="400" r="200" fill="none" stroke="var(--brand-primary)" strokeWidth="1.2" />
            <motion.circle initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeOut", delay: 0.4 }} cx="600" cy="400" r="120" fill="none" stroke="var(--brand-primary)" strokeWidth="1" />
            <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.8 }} x1="100" y1="400" x2="1100" y2="400" stroke="var(--brand-primary)" strokeWidth="0.7" />
            <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1.0 }} x1="600" y1="100" x2="600" y2="700" stroke="var(--brand-primary)" strokeWidth="0.7" />
          </svg>
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-20 lg:pb-32 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: ease }}>
            <span className="font-grotesk text-text-secondary tracking-[0.22em] uppercase text-[12px] font-semibold">Innovation</span>
            <h1 className="font-syne mt-6 max-w-3xl text-text-primary tracking-tighter text-[clamp(2.4rem,5vw,4.6rem)] font-bold leading-[1.05]">
              Luxury, now measured<br /><span className="italic font-light text-text-secondary">in precision.</span>
            </h1>
            <p className="font-dm mt-8 max-w-xl text-text-secondary text-[17px] leading-[1.85]">
              Innovation makes the luxury experience more consistent, more scalable, and more relevant to the people who will define it next.
            </p>
          </motion.div>
        </div>
      </section>

      {/* INNOVATION AREAS */}
      <section className="py-28 lg:py-40 bg-bg-deep">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: ease }} className="mb-20 max-w-2xl">
            <span className="font-grotesk text-text-muted tracking-[0.22em] uppercase text-[12px] font-semibold">Innovation Areas</span>
            <h2 className="font-syne mt-4 text-text-primary text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold leading-[1.15]">
              Brilliance, but engineered with control.
            </h2>
            <p className="font-dm mt-6 text-text-secondary text-[16px] leading-[1.85]">
              Public Dholakia Group communications describe refined CVD processes, precision-cutting systems, and traceability platforms that work together to bring brilliance under engineering rigour.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {areas.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: ease }}
                whileHover={{ y: -4 }}
                className="p-10 rounded-3xl bg-bg-surface-elevated border border-glass-border hover:border-brand-primary/30 transition-all"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-bg-surface border border-glass-border text-brand-primary mb-6">{a.icon}</div>
                <h3 className="font-syne text-text-primary text-[22px] font-bold tracking-[-0.02em]">{a.title}</h3>
                <p className="font-dm mt-4 text-text-secondary text-[15px] leading-[1.85]">{a.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS FLOW */}
      <section className="py-28 lg:py-40 bg-bg-surface border-y border-glass-border">
        <div className="max-w-[820px] mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: ease }} className="text-center mb-20">
            <span className="font-grotesk text-text-muted tracking-[0.22em] uppercase text-[12px] font-semibold">Process</span>
            <h2 className="font-syne mt-4 text-text-primary text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold leading-[1.15]">
              From seed crystal to finished piece.
            </h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-6 top-2 bottom-2 w-px bg-brand-primary/25" />
            <div className="space-y-12">
              {steps.map((s, i) => (
                <motion.div key={s.num}
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay: i * 0.08, ease: ease }}
                  className="relative pl-16"
                >
                  <div className="absolute left-0 top-1 w-12 h-12 rounded-full border border-brand-primary/40 bg-bg-surface flex items-center justify-center font-syne italic text-brand-primary text-[17px]">
                    {s.num}
                  </div>
                  <h3 className="font-syne text-text-primary text-[20px] font-bold">{s.title}</h3>
                  <p className="font-dm mt-3 text-text-secondary text-[15px] leading-[1.8]">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-28 lg:py-40 bg-bg-deep">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: ease }} className="mb-16 max-w-2xl">
            <span className="font-grotesk text-text-muted tracking-[0.22em] uppercase text-[12px] font-semibold">Quality &amp; Relevance</span>
            <h2 className="font-syne mt-4 text-text-primary text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold leading-[1.15]">
              Why this matters for the brands we build.
            </h2>
            <p className="font-dm mt-6 text-text-secondary text-[16px] leading-[1.85]">
              Technology gives us tighter control, more consistent output, and clearer credibility — the conditions enduring luxury brands require.
            </p>
          </motion.div>

          <div className="rounded-3xl border border-glass-border overflow-hidden bg-bg-surface">
            <div className="grid grid-cols-4 border-b border-glass-border">
              <div className="p-5 font-grotesk text-text-muted tracking-[0.16em] uppercase text-[11px] font-semibold">Criterion</div>
              <div className="p-5 font-grotesk text-text-muted tracking-[0.16em] uppercase text-[11px] font-semibold text-center">Natural</div>
              <div className="p-5 font-grotesk text-text-muted tracking-[0.16em] uppercase text-[11px] font-semibold text-center">Lab-Grown</div>
              <div className="p-5 font-grotesk text-brand-primary tracking-[0.16em] uppercase text-[11px] font-semibold text-center bg-brand-primary/5">Dholakia</div>
            </div>
            {compare.map((row, i) => (
              <div key={row.criterion} className={`grid grid-cols-4 ${i < compare.length - 1 ? 'border-b border-glass-border' : ''}`}>
                <div className="p-5 font-syne text-text-primary text-[15px] font-semibold">{row.criterion}</div>
                <div className="p-5 font-dm text-text-secondary text-[14px] text-center flex items-center justify-center gap-2">
                  {row.aPos ? <Check size={14} className="text-brand-primary" /> : <X size={14} className="text-text-muted" />}
                  {row.a}
                </div>
                <div className="p-5 font-dm text-text-secondary text-[14px] text-center flex items-center justify-center gap-2">
                  {row.bPos ? <Check size={14} className="text-brand-primary" /> : <X size={14} className="text-text-muted" />}
                  {row.b}
                </div>
                <div className="p-5 font-dm text-text-primary text-[14px] text-center bg-brand-primary/5 flex items-center justify-center gap-2 font-semibold">
                  {row.cPos ? <Check size={14} className="text-brand-primary" /> : <X size={14} className="text-text-muted" />}
                  {row.c}
                </div>
              </div>
            ))}
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
            See the wider approach.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: ease }}
          >
            <p className="font-dm text-text-secondary text-[16px] leading-[1.85]">
              Innovation, sustainability, and craftsmanship operate as one system across the platform.
            </p>
            <Link
              to="/sustainability"
              className="font-grotesk group inline-flex items-center gap-3 mt-8 text-text-primary text-[13px] font-semibold tracking-[0.1em] uppercase"
            >
              <span className="relative overflow-hidden pb-1">
                Sustainability
                <span className="absolute bottom-0 left-0 w-full h-px bg-text-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
