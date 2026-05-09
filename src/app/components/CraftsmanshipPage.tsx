import { Link } from "react-router";
import { ArrowRight, Pencil, Gem, Grid as GridIcon, Wrench, Package } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const ease = [0.76, 0, 0.24, 1] as const;

const chapters = [
  {
    num: "01",
    title: "Proportion",
    body: "Every piece begins with proportion — the silent grammar of jewellery. Where stones sit, how light falls, what is left empty. Decisions made with patience and care, never by default.",
  },
  {
    num: "02",
    title: "Polish",
    body: "Surface, finish, and the discipline of the second look. We treat polish as a craft in itself — the moment a piece earns the right to be worn.",
  },
  {
    num: "03",
    title: "Setting",
    body: "Stones held without strain. Settings shaped to feel weightless. The hand of the setter is invisible — and that invisibility is the work.",
  },
];

const steps = [
  { icon: <Pencil size={28} strokeWidth={1.5} />, num: "01", title: "Brief & Concept", body: "Private consultation defines tone, intention, and the emotional register of the piece. Sketches follow, never the other way round." },
  { icon: <Gem size={28} strokeWidth={1.5} />, num: "02", title: "Material Selection", body: "Stones, metals, and supporting materials chosen for traceable provenance and the discipline of restraint — quality before display." },
  { icon: <GridIcon size={28} strokeWidth={1.5} />, num: "03", title: "Design & Development", body: "Concept becomes proportion. Working drawings, prototypes, and modelling resolve every line before any cut is made." },
  { icon: <Wrench size={28} strokeWidth={1.5} />, num: "04", title: "Setting & Finishing", body: "Stones set; surfaces brought to finish; the piece earns its weight. The bench is the slowest stage of the process — intentionally so." },
  { icon: <Package size={28} strokeWidth={1.5} />, num: "05", title: "Final Presentation", body: "Quality control, archival photography, and the quiet handover. The piece leaves the atelier as a finished object — not a draft." },
];

export function CraftsmanshipPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <div className="bg-bg-deep text-text-primary">
      {/* HERO */}
      <section ref={heroRef} className="relative h-screen min-h-[640px] grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="relative h-[60vh] lg:h-full overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=85&w=1800&auto=format&fit=crop"
            alt="Artisan hands at work"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-bg-deep/30" />
        </motion.div>
        <div className="relative bg-bg-surface flex flex-col justify-center px-8 lg:px-16 py-12 lg:py-0">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: ease }}>
            <span className="font-grotesk text-text-secondary tracking-[0.22em] uppercase text-[12px] font-semibold">Craftsmanship</span>
            <h1 className="font-syne mt-6 text-text-primary tracking-tighter text-[clamp(2.4rem,5vw,4.4rem)] font-bold leading-[1.05]">
              Brilliance,<br />
              <span className="italic font-light text-text-secondary">held in the hand.</span>
            </h1>
            <p className="font-dm mt-8 max-w-md text-text-secondary text-[17px] leading-[1.85]">
              Luxury jewellery is the sum of detail, balance, finish, and the quiet intelligence of skilled hands.
            </p>
            <div className="mt-12 h-px w-24 bg-brand-primary/40" />
          </motion.div>
        </div>
      </section>

      {/* PHILOSOPHY — NUMBERED CHAPTERS */}
      <section className="py-28 lg:py-40 bg-bg-deep">
        <div className="max-w-[800px] mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: ease }} className="text-center mb-20">
            <span className="font-grotesk text-text-muted tracking-[0.22em] uppercase text-[12px] font-semibold">Craft Philosophy</span>
            <h2 className="font-syne mt-4 text-text-primary text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold leading-[1.15]">
              Nothing on the piece is accidental.
            </h2>
            <p className="font-dm mt-6 text-text-secondary text-[16px] leading-[1.85]">
              Proportion, polish, setting, finish — each is the outcome of a disciplined choice, made with patience and care, never by default.
            </p>
          </motion.div>

          <div className="space-y-16">
            {chapters.map((c, i) => (
              <motion.div
                key={c.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: ease }}
                className="border-t border-glass-border pt-12"
              >
                <div className="font-syne text-brand-primary italic font-light text-[clamp(3.5rem,6vw,5.5rem)] leading-none">{c.num}</div>
                <h3 className="font-syne mt-4 text-text-primary text-[clamp(1.3rem,2.4vw,1.85rem)] font-bold tracking-[-0.02em]">{c.title}</h3>
                <p className="font-dm mt-4 text-text-secondary text-[16px] leading-[1.85] max-w-xl">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MAKING ECOSYSTEM — full bleed image with floating panel */}
      <section className="relative h-[110vh] min-h-[700px] flex items-end overflow-hidden bg-bg-deep">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=85&w=2400&auto=format&fit=crop"
            alt="Manufacturing facility"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-bg-deep/60" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: ease }}
          className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-10 pb-20 lg:pb-32 w-full"
        >
          <div className="bg-bg-surface/95 backdrop-blur-md border border-glass-border rounded-3xl p-10 lg:p-14 max-w-[760px] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-brand-primary" />
            <span className="font-grotesk text-brand-primary tracking-[0.22em] uppercase text-[11px] font-semibold">Making Ecosystem</span>
            <h2 className="font-syne mt-4 text-text-primary text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.15]">
              Design, manufacture, and finish — under one philosophy.
            </h2>
            <p className="font-dm mt-6 text-text-secondary text-[16px] leading-[1.85]">
              Across the wider Dholakia ecosystem, our craft is supported by deep systems, decades of expertise, and a quality commitment at every stage.
            </p>
            <Link
              to="/innovation"
              className="font-grotesk group inline-flex items-center gap-3 mt-10 text-text-primary text-[13px] font-semibold tracking-[0.1em] uppercase"
            >
              <span className="relative overflow-hidden pb-1">
                Explore Innovation
                <span className="absolute bottom-0 left-0 w-full h-px bg-text-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="py-28 lg:py-40 bg-bg-surface border-y border-glass-border">
        <div className="max-w-[820px] mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: ease }} className="text-center mb-20">
            <span className="font-grotesk text-text-muted tracking-[0.22em] uppercase text-[12px] font-semibold">Process</span>
            <h2 className="font-syne mt-4 text-text-primary text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold leading-[1.15]">
              From brief to finished object.
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 top-2 bottom-2 w-px bg-brand-primary/20" />
            <div className="space-y-12">
              {steps.map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: ease }}
                  className="relative pl-16"
                >
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-bg-surface-elevated border border-glass-border flex items-center justify-center text-brand-primary">
                    {s.icon}
                  </div>
                  <div className="font-syne text-brand-primary italic font-light text-[2rem] leading-none">{s.num}</div>
                  <h3 className="font-syne mt-2 text-text-primary text-[20px] font-bold">{s.title}</h3>
                  <p className="font-dm mt-3 text-text-secondary text-[15px] leading-[1.8]">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL QUOTE */}
      <section className="py-28 lg:py-40 bg-bg-deep border-t border-glass-border">
        <div className="max-w-[920px] mx-auto px-6 lg:px-10 text-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: ease }}
            className="font-syne italic font-light text-text-primary text-[clamp(1.6rem,3.5vw,3rem)] leading-[1.25]"
          >
            &ldquo;Craft is not an aesthetic. It is the discipline of paying attention.&rdquo;
          </motion.blockquote>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: ease }}
            className="font-grotesk mt-8 text-text-muted tracking-[0.22em] uppercase text-[11px] font-semibold"
          >
            — Atelier Statement
          </motion.p>
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
            Step inside the atelier.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: ease }}
          >
            <p className="font-dm text-text-secondary text-[16px] leading-[1.85]">
              Speak with our team about commissioning a piece, partnership, or visiting the workshop.
            </p>
            <Link
              to="/contact"
              className="font-grotesk group inline-flex items-center gap-3 mt-8 text-text-primary text-[13px] font-semibold tracking-[0.1em] uppercase"
            >
              <span className="relative overflow-hidden pb-1">
                Get in touch
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
