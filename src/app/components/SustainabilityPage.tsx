import { Link } from "react-router";
import { ArrowRight, Leaf, Users, ShieldCheck, Download } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const metrics = [
  { value: "95%", label: "Ethical Sourcing" },
  { value: "40MW", label: "Solar Capacity" },
  { value: "1M+", label: "Trees Planted" },
  { value: "50K+", label: "Lives Impacted" },
  { value: "Zero", label: "Conflict Diamonds" },
  { value: "30%", label: "Water Recycled" },
];

const reports = [
  { title: "Annual ESG Report 2025", type: "PDF", size: "4.2 MB", date: "Jan 2026" },
  { title: "Ethical Sourcing Declaration", type: "PDF", size: "1.8 MB", date: "Dec 2025" },
  { title: "Kimberley Process Certification", type: "PDF", size: "0.5 MB", date: "Nov 2025" },
  { title: "Carbon Footprint Assessment", type: "PDF", size: "2.1 MB", date: "Oct 2025" },
];

const milestones = [
  { year: "2018", desc: "Committed to 100% ethical sourcing across all operations." },
  { year: "2020", desc: "Installed first 10MW solar plant at manufacturing hub." },
  { year: "2022", desc: "Achieved 1 million trees through afforestation initiative." },
  { year: "2024", desc: "Launched water recycling systems across all facilities." },
  { year: "2026", desc: "Targeting 100% renewable energy in all manufacturing." },
];

export function SustainabilityPage() {
  return (
    <div className="bg-bg-deep text-text-primary">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop" alt="Sustainability - Solar Energy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-bg-deep/30 dark:bg-black/50" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}>
            <span className="font-grotesk inline-block px-4 py-1.5 bg-brand-primary/20 backdrop-blur-sm text-brand-primary/80 rounded-full mb-6 text-[13px] font-medium tracking-wide">Sustainability & ESG</span>
            <h1 className="font-syne text-text-primary max-w-3xl mx-auto text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              Crafting Impact Beyond Commerce
            </h1>
            <p className="font-dm mt-6 text-text-secondary max-w-lg mx-auto text-[17px] leading-[1.7]">
              Responsible growth woven into every facet of our operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-20 bg-bg-surface border-y border-glass-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {metrics.map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center p-6 bg-bg-surface-elevated rounded-2xl border border-glass-border backdrop-blur-sm shadow-sm"
              >
                <div className="font-syne text-[28px] font-extrabold text-brand-primary">{m.value}</div>
                <p className="font-dm text-text-muted mt-2 text-[12px]">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-28 lg:py-40 bg-bg-deep">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 space-y-24">
          {[
            { icon: <Leaf size={28} strokeWidth={1.5} />, title: "Environmental Stewardship", desc: "From our 40MW solar installations to water recycling systems, we minimize our environmental footprint. Our afforestation programme has planted over one million trees, targeting 100% renewable energy by 2027.", img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop" },
            { icon: <Users size={28} strokeWidth={1.5} />, title: "Social Impact", desc: "Through education, healthcare, artisan welfare, and community development, we've impacted over 50,000 lives. Our commitment extends beyond our workforce to the broader communities where we operate.", img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1200&auto=format&fit=crop" },
            { icon: <ShieldCheck size={28} strokeWidth={1.5} />, title: "Ethics & Traceability", desc: "Every diamond is ethically sourced, verified through Kimberley Process compliance and proprietary traceability systems. We maintain rigorous standards for conduct, audits, and governance.", img: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1200&auto=format&fit=crop" },
          ].map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              <div>
                <motion.div whileHover={{ scale: 1.05 }} className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-bg-surface-elevated border border-glass-border text-brand-primary mb-6 shadow-sm">
                  {p.icon}
                </motion.div>
                <h2 className="font-syne text-text-primary text-[clamp(1.5rem,2.5vw,2rem)] font-bold tracking-[-0.02em]">{p.title}</h2>
                <p className="font-dm mt-4 text-text-secondary leading-[1.8] text-[16px]">{p.desc}</p>
              </div>
              <div className="h-[320px] rounded-3xl overflow-hidden border border-glass-border relative group">
                <ImageWithFallback src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Progress Roadmap */}
      <section className="py-28 lg:py-40 bg-bg-deep text-text-primary relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <span className="font-grotesk text-text-muted tracking-[0.2em] uppercase mb-4 block text-[12px] font-semibold">Evolution</span>
            <h2 className="font-syne text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.03em]">Progress Roadmap</h2>
          </motion.div>

          <div className="relative">
            {/* Centered vertical line */}
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-primary/0 via-brand-primary/20 to-brand-primary/0 lg:-translate-x-1/2" />

            <div className="space-y-12 lg:space-y-0">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className={`relative flex items-center justify-start lg:justify-between w-full ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Content Card */}
                  <div className="lg:w-[45%] pl-12 lg:pl-0">
                    <motion.div
                      whileHover={{ y: -5, borderColor: "var(--glass-hover-border)" }}
                      className="p-8 rounded-[2rem] border border-glass-border bg-bg-surface backdrop-blur-md transition-all duration-500 group shadow-sm hover:shadow-xl"
                    >
                      <div className={`flex items-center gap-4 mb-4 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                        <span className="font-syne text-[32px] font-extrabold" style={{ color: i === milestones.length - 1 ? "var(--brand-primary)" : "var(--brand-primary)", opacity: i === milestones.length - 1 ? 1 : 0.6 }}>
                          {m.year}
                        </span>
                        <div className={`h-px flex-1 bg-gradient-to-r ${i % 2 === 1 ? 'lg:from-transparent lg:to-brand-primary/40 from-brand-primary/40 to-transparent' : 'from-brand-primary/40 to-transparent'}`} />
                      </div>
                      <p className="font-dm text-text-secondary group-hover:text-text-primary transition-colors text-[16px] leading-[1.75]">
                        {m.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* Centered Dot */}
                  <div className="absolute left-4 lg:left-1/2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center lg:-translate-x-1/2 z-10">
                    <div className={`w-3 h-3 rounded-full ${i === milestones.length - 1 ? 'bg-brand-primary' : 'bg-white/20'} relative`}>
                      {i === milestones.length - 1 && (
                        <span className="absolute inset-0 rounded-full bg-brand-primary animate-ping opacity-75" />
                      )}
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden lg:block lg:w-[45%]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reports & Certifications */}
      <section className="py-28 lg:py-40 bg-bg-surface border-t border-glass-border relative overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/[0.02] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[900px] mx-auto px-6 lg:px-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="font-grotesk text-text-muted tracking-[0.2em] uppercase mb-4 block text-[12px] font-semibold">Transparency</span>
            <h2 className="font-syne text-text-primary text-[clamp(2rem,3.5vw,2.8rem)] font-bold tracking-[-0.02em]">Reports & Certifications</h2>
          </motion.div>

          <div className="space-y-4">
            {reports.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ x: 10 }}
                className="flex items-center justify-between p-6 lg:p-8 rounded-2xl bg-white/[0.03] border border-glass-border hover:bg-white/[0.06] hover:border-brand-primary/30 transition-all duration-500 group cursor-pointer backdrop-blur-sm"
              >
                <div className="flex items-center gap-6">
                  {/* File Icon Circle */}
                  <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-bg-surface-elevated border border-glass-border group-hover:bg-brand-primary/10 group-hover:border-brand-primary/20 transition-colors duration-500">
                    <div className="text-text-muted group-hover:text-brand-primary transition-colors duration-500">
                      <Leaf size={20} strokeWidth={1.5} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-grotesk text-text-primary group-hover:text-brand-primary transition-colors text-[16px] font-semibold">{r.title}</h4>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="font-grotesk px-2 py-0.5 rounded-md bg-glass-border/50 text-text-muted text-[10px] uppercase tracking-wider font-bold">{r.type}</span>
                      <span className="w-1 h-1 rounded-full bg-glass-border" />
                      <p className="font-dm text-text-muted text-[13px]">{r.size} · {r.date}</p>
                    </div>
                  </div>
                </div>

                <div className="text-text-secondary flex items-center justify-center w-10 h-10 rounded-full border border-glass-border group-hover:bg-text-primary group-hover:border-text-primary group-hover:text-bg-deep transition-all duration-500">
                  <Download size={16} strokeWidth={2} />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="font-dm mt-12 text-text-muted text-center italic text-[14px]"
          >
            All certifications are independently audited and verified annually.
          </motion.p>
        </div>
      </section>

      {/* CTA — Cinematic Finale */}
      <section className="relative py-32 lg:py-48 mt-12 overflow-hidden">
        {/* Background Image with Fixed/Parallax feel */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
            alt="Nature - Sustainable Future"
            className="w-full h-full object-cover opacity-60"
          />
          {/* Theme-aware overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-bg-deep via-bg-deep/60 to-bg-deep" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg-deep)_80%)]" />
        </div>

        {/* Decorative glows */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
          >
            <span className="font-grotesk text-brand-primary/60 tracking-[0.3em] uppercase mb-6 block text-[13px] font-bold">Our Eternal Commitment</span>

            <h2 className="font-syne text-text-primary max-w-4xl mx-auto text-[clamp(2.5rem,5vw,4.2rem)] font-bold leading-1.1 tracking-[-0.04em]">
              Sustainability is<br />
              <span className="italic font-light opacity-70">Long-Term Value</span>
            </h2>

            <p className="font-dm mt-8 text-text-muted max-w-xl mx-auto text-[17px] leading-[1.7]">
              We don't just build for the quarter; we build for the century. Every decision is a testament to our responsibility to the future.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mt-12">
              <Link
                to="/investor-relations"
                className="font-grotesk group relative overflow-hidden px-10 py-4 bg-text-primary text-bg-deep rounded-full transition-transform hover:scale-105 duration-300 text-[15px] font-bold shadow-xl"
              >
                <div className="absolute inset-0 bg-bg-deep/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.76, 0, 0.24, 1]" />
                <span className="relative z-10 flex items-center gap-2">
                  Investor Relations <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                to="/careers"
                className="font-grotesk group flex items-center gap-2 px-8 py-4 rounded-full border border-glass-border text-text-secondary hover:text-text-primary transition-all hover:bg-bg-surface-elevated text-[15px] font-medium"
              >
                Explore Careers
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
