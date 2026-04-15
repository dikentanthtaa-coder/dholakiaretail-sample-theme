import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const ease = [0.76, 0, 0.24, 1] as const;

const timeline = [
  { year: "1972", title: "The Beginning",          desc: "Founded as a family diamond polishing enterprise in Surat." },
  { year: "1988", title: "Retail Expansion",        desc: "Entered the retail jewelry market with the first branded showroom." },
  { year: "1998", title: "Kisna Launch",            desc: "Launched Kisna as an accessible premium diamond jewelry brand." },
  { year: "2005", title: "Manufacturing Scale",     desc: "Opened state-of-the-art facility with 5,000+ artisans." },
  { year: "2012", title: "RARE Debut",              desc: "Introduced RARE as the ultra-luxury bespoke jewelry brand." },
  { year: "2018", title: "Global Reach",            desc: "Expanded to 25+ countries across Asia, Middle East, and Europe." },
  { year: "2024", title: "Corporate Consolidation", desc: "Established Dholakia Retail Private Limited to govern the growing brand portfolio." },
  { year: "2026", title: "Digital Future",          desc: "Next-generation investor portal and digital brand experiences." },
];

const stats = [
  { v: "10,000+", l: "Employees",       sub: "Skilled artisans & professionals" },
  { v: "25+",     l: "Export Markets",  sub: "Across Asia, Middle East & Europe" },
  { v: "500K+",   l: "Pieces Annually", sub: "Crafted with precision every year" },
  { v: "4",       l: "Portfolio Brands", sub: "Each curated for a distinct luxury tier" },
];

export function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <div className="bg-bg-deep text-text-primary">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[450px] flex items-center overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1655111379423-b85edc4da9ac?q=80&w=2400&auto=format&fit=crop"
            alt="Heritage artisan hands"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-deep/60 dark:from-black/60 via-bg-deep/40 dark:via-black/40 to-bg-deep" />
        </motion.div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: ease }}>
            <span className="font-grotesk text-text-secondary tracking-[0.18em] uppercase text-[13px] font-medium">About Us</span>
            <h1 className="font-syne mt-4 text-text-primary max-w-3xl text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              The Vision Behind<br /><span className="italic font-light opacity-80">Modern Luxury</span>
            </h1>
            <p className="font-dm mt-6 text-text-secondary max-w-lg text-[17px] leading-[1.7]">
              A heritage-rooted enterprise building the future of luxury retail with innovation, integrity, and artistry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── INTRODUCTION ────────────────────────────────────────────────── */}
      <section className="py-28 lg:py-40 bg-bg-deep">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.9, ease: ease }}
          >
            <h2 className="font-syne text-text-primary text-[clamp(1.8rem, 3vw, 2.5rem)] font-bold leading-[1.15] tracking-[-0.03em]">
              Building the Future of Luxury Retail
            </h2>
            <p className="font-dm mt-6 text-text-secondary text-[16px] leading-[1.8]">
              Established in 2024, Dholakia Retail Private Limited serves as the corporate foundation for our growing portfolio of luxury jewellery brands. Headquartered in Surat, Gujarat—India's renowned diamond processing hub—we are uniquely positioned at the intersection of tradition and innovation.
            </p>
            <p className="font-dm mt-4 text-text-secondary text-[16px] leading-[1.8]">
              Our commitment to quality, authenticity, and customer experience drives everything we do. As a registered corporate entity (CIN: U32111GJ2024PTC155690), we maintain the highest standards of governance and transparency.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.9, ease: ease }}
            className="rounded-3xl overflow-hidden border border-glass-border"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=85&w=1800&auto=format&fit=crop"
              alt="Luxury store interior"
              className="w-full h-[400px] lg:h-[500px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ── TIMELINE ────────────────────────────────────────────────────── */}
      <section className="py-28 lg:py-40 bg-bg-surface border-y border-glass-border">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: ease }}
            className="text-center mb-20"
          >
            <span className="font-grotesk text-text-muted tracking-[0.18em] uppercase text-[13px] font-medium">Our Journey</span>
            <h2 className="font-syne mt-3 text-text-primary text-[clamp(1.8rem, 3vw, 2.5rem)] font-bold tracking-[-0.03em]">Heritage Timeline</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-glass-border" />
            <div className="space-y-12">
              {timeline.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, ease: ease }}
                  className={`relative flex items-start gap-6 lg:gap-0 ${
                    i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div className={`lg:w-1/2 ${
                    i % 2 === 0 ? "lg:text-right lg:pr-16" : "lg:text-left lg:pl-16"
                  } pl-16 lg:pl-0`}>
                    <span className="font-syne text-[36px] font-extrabold text-brand-primary/40 dark:text-brand-primary/25">{t.year}</span>
                    <h3 className="font-syne mt-1 text-text-primary text-[18px] font-bold">{t.title}</h3>
                    <p className="font-dm mt-2 text-text-secondary opacity-80 text-[15px] leading-[1.6]">{t.desc}</p>
                  </div>
                  <div className="absolute left-8 lg:left-1/2 top-3 w-3 h-3 bg-text-primary rounded-full -translate-x-1/2 z-10 ring-4 ring-bg-surface shadow-[0_0_15px_rgba(0,0,0,0.1)]" />
                  <div className="hidden lg:block lg:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION & MISSION ────────────────────────────────────────────── */}
      <section className="py-28 lg:py-40 bg-bg-deep">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: ease }}
          >
            <span className="font-grotesk text-text-muted tracking-[0.18em] uppercase text-[13px] font-medium">Our Purpose</span>
            <h2 className="font-syne mt-6 text-text-primary text-[clamp(1.5rem, 3vw, 2.4rem)] font-bold leading-[1.25] tracking-[-0.02em]">
              &ldquo;To build a global luxury retail ecosystem that honours heritage while pioneering the future of craftsmanship and commerce.&rdquo;
            </h2>
          </motion.div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Vision",   text: "To be the world's most admired luxury retail group of Indian origin—setting benchmarks for quality, innovation, and responsible business." },
              { label: "Mission",  text: "To create enduring value through brands that unite master craftsmanship with modern design, ethical sourcing with global reach." },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: ease }}
                className="text-left p-10 rounded-2xl border border-glass-border bg-bg-surface-elevated backdrop-blur-sm hover:bg-bg-surface hover:border-brand-primary/30 transition-all duration-500 shadow-sm hover:shadow-xl"
              >
                <h3 className="font-syne text-text-primary text-[20px] font-bold">{item.label}</h3>
                <div className="mt-3 w-8 h-px bg-brand-primary/20" />
                <p className="font-dm mt-5 text-text-secondary leading-[1.85] text-[15px]">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ─────────────────────────────────────────────────── */}
      <section className="py-28 lg:py-40 bg-bg-surface border-y border-glass-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.h2
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: ease }}
            className="font-syne text-center text-text-primary mb-16 text-[clamp(1.8rem, 3vw, 2.5rem)] font-bold tracking-[-0.03em]"
          >
            Core Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Innovation", desc: "Embracing technology, design thinking, and creative ambition to reimagine luxury." },
              { title: "Integrity",  desc: "Operating with transparency, ethical conviction, and deep respect for every stakeholder." },
              { title: "Artistry",   desc: "Preserving the soul of handcraftsmanship while evolving techniques that define fine jewelry." },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12, ease: ease }}
                whileHover={{ y: -4 }}
                className="p-10 rounded-2xl border border-glass-border bg-bg-surface-elevated text-center hover:bg-bg-surface hover:border-brand-primary/30 transition-all duration-500 shadow-sm hover:shadow-xl"
              >
                <h3 className="font-syne text-text-primary text-[24px] font-bold">{v.title}</h3>
                <p className="font-dm mt-4 text-text-secondary lg:text-text-muted group-hover:text-text-secondary text-[15px] leading-[1.7]">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS — BY THE NUMBERS ──────────────────────────────────────── */}
      <section className="relative py-28 lg:py-36 overflow-hidden bg-bg-deep border-y border-glass-border">
        {/* Radial glow top-center */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 70%)" }}
        />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: ease }}
            className="text-center mb-16"
          >
            <span
              className="font-grotesk inline-flex items-center gap-3 text-text-muted tracking-[0.22em] uppercase text-[12px] font-medium"
            >
              <span className="w-8 h-px bg-brand-primary/30" />
              By The Numbers
              <span className="w-8 h-px bg-brand-primary/30" />
            </span>
          </motion.div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6 lg:gap-0 items-stretch">
            {stats.map((s, i) => (
              <div key={s.l} className="lg:contents">
                {/* Gradient divider line (between cards, desktop only) */}
                {i > 0 && (
                  <div className="hidden lg:flex items-center justify-center">
                    <div
                      className="w-px h-[70%]"
                      style={{
                        background: "linear-gradient(to bottom, transparent, var(--brand-primary) 40%, var(--brand-primary) 60%, transparent)",
                        opacity: 0.3
                      }}
                    />
                  </div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.13, ease: ease }}
                  whileHover={{ y: -3 }}
                  className="group flex flex-col items-center text-center px-6 lg:px-8 py-8 sm:border sm:border-white/[0.06] lg:border-0 sm:rounded-2xl lg:rounded-none transition-all duration-500 lg:col-span-1"
                >
                  {/* Index */}
                  <span
                    className="font-grotesk text-text-dim mb-5 group-hover:text-text-muted transition-colors duration-500 text-[12px] font-semibold letter-spacing-[0.1em]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Top accent line — animates on hover */}
                  <div className="w-8 h-px bg-brand-primary/30 mb-6 transition-all duration-500 group-hover:w-14 group-hover:bg-brand-primary" />

                  {/* Stat value */}
                  <div
                    className="font-syne text-text-primary leading-none group-hover:text-brand-primary transition-colors duration-300 text-[clamp(2rem,3.5vw,3.2rem)] font-extrabold tracking-[-0.04em]"
                  >
                    {s.v}
                  </div>

                  {/* Label */}
                  <div
                    className="font-grotesk mt-4 text-text-primary tracking-[0.1em] uppercase text-[12px] font-semibold"
                  >
                    {s.l}
                  </div>

                  {/* Sub-descriptor */}
                  <p
                    className="font-dm mt-2 text-text-muted group-hover:text-text-secondary transition-colors leading-relaxed text-[13px]"
                  >
                    {s.sub}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-28 text-center bg-bg-deep">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: ease }}
        >
          <h2 className="font-syne text-text-primary text-[clamp(1.8rem, 3vw, 2.5rem)] font-bold tracking-[-0.03em]">
            Discover What We’ve Built
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              to="/portfolio"
              className="font-grotesk group inline-flex items-center gap-2 px-8 py-4 bg-text-primary text-bg-deep rounded-full hover:scale-105 transition-all text-[14px] font-semibold shadow-xl"
            >
              Explore Portfolio <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="font-grotesk inline-flex items-center gap-2 px-8 py-4 border border-glass-border text-text-primary rounded-full hover:bg-glass-bg transition-all text-[14px] font-medium"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
