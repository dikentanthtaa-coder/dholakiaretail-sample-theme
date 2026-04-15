import { Link } from "react-router";
import { ArrowRight, MapPin, Briefcase, Clock, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const pillars = [
  { title: "Excellence", desc: "We pursue mastery in every discipline—design, manufacturing, retail, and corporate.", emoji: "01" },
  { title: "Growth", desc: "Continuous learning, mentorship, and career progression at every level.", emoji: "02" },
  { title: "Innovation", desc: "Freedom to explore new ideas, technologies, and creative approaches.", emoji: "03" },
  { title: "Belonging", desc: "A diverse, inclusive culture rooted in mutual respect and shared purpose.", emoji: "04" },
];

const roles = [
  { title: "Senior Diamond Grader", dept: "Manufacturing", loc: "Surat", type: "Full-time" },
  { title: "Brand Marketing Manager", dept: "Marketing", loc: "Mumbai", type: "Full-time" },
  { title: "Retail Store Manager — Kisna", dept: "Retail", loc: "Delhi", type: "Full-time" },
  { title: "CAD Jewelry Designer", dept: "Design", loc: "Surat", type: "Full-time" },
  { title: "Financial Analyst", dept: "Finance", loc: "Mumbai", type: "Full-time" },
  { title: "ESG & Sustainability Associate", dept: "Corporate", loc: "Surat", type: "Full-time" },
  { title: "Digital Experience Designer", dept: "Technology", loc: "Mumbai", type: "Full-time" },
  { title: "Export Sales Executive", dept: "Sales", loc: "Surat", type: "Full-time" },
];

const process = [
  { step: "01", title: "Apply", desc: "Submit your profile through our careers portal." },
  { step: "02", title: "Review", desc: "Our talent team evaluates every application carefully." },
  { step: "03", title: "Interview", desc: "Meet with hiring managers and team leads." },
  { step: "04", title: "Offer", desc: "Receive and review your personalized offer." },
];

export function CareersPage() {
  return (
    <div className="bg-bg-deep text-text-primary">
      {/* Hero — Full Screen */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070&auto=format&fit=crop" alt="Team Collaboration" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-bg-deep/60 dark:bg-black/55" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}>
            <span className="font-grotesk inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-text-secondary rounded-full mb-6 text-[13px] font-medium tracking-[0.15em] uppercase">Talent & Culture</span>
            <h1 className="font-syne text-text-primary max-w-3xl mx-auto text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              Build the Future of Luxury With Us
            </h1>
            <p className="font-dm mt-6 text-text-secondary max-w-lg mx-auto text-[17px] leading-[1.7]">
              Where craftsmanship, innovation, and ambition converge.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-28 lg:py-40 bg-bg-deep">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}>
            <span className="font-grotesk text-text-muted tracking-[0.2em] uppercase text-[12px] font-semibold">Why Join Us</span>
            <h2 className="font-syne mt-4 text-text-primary text-[clamp(1.8rem, 3vw, 2.5rem)] font-bold leading-[1.15] tracking-[-0.03em]">
              A Culture of Craftsmanship & Ambition
            </h2>
            <p className="font-dm mt-6 text-text-secondary leading-[1.8] text-[16px]">
              At Dholakia Retail, you join 10,000+ professionals across design, manufacturing, retail, marketing, finance, and technology. Our culture celebrates mastery, rewards innovation, and invests deeply in growth.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="rounded-3xl overflow-hidden border border-glass-border">
            <ImageWithFallback src="https://images.unsplash.com/photo-1624639949703-1d8e58184691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwY3V0dGluZyUyMHBvbGlzaGluZyUyMGZhY3Rvcnl8ZW58MXx8fHwxNzc1Njk5MDE3fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Craftsmanship" className="w-full h-[400px] lg:h-[480px] object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Culture Pillars */}
      <section className="py-28 lg:py-40 bg-bg-surface border-y border-glass-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="font-grotesk text-text-muted tracking-[0.2em] uppercase mb-4 block text-[12px] font-semibold">Values</span>
            <h2 className="font-syne text-text-primary text-[clamp(1.8rem, 3vw, 2.5rem)] font-bold tracking-[-0.03em]">Our Culture</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, borderColor: "var(--color-brand-primary)" }}
                className="p-8 rounded-2xl bg-bg-surface-elevated border border-glass-border backdrop-blur-sm transition-all text-center shadow-sm hover:shadow-xl"
              >
                <span className="font-syne text-brand-primary/20 text-[40px] font-extrabold">{p.emoji}</span>
                <h3 className="font-syne mt-2 text-text-primary text-[22px] font-bold">{p.title}</h3>
                <p className="font-dm mt-4 text-text-secondary leading-[1.7] text-[14px]">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-28 lg:py-40 bg-bg-deep">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="font-grotesk text-text-muted tracking-[0.2em] uppercase text-[12px] font-semibold">Opportunities</span>
              <h2 className="font-syne mt-3 text-text-primary text-[clamp(1.8rem, 3vw, 2.5rem)] font-bold tracking-[-0.03em]">Open Roles</h2>
            </div>
            <div className="hidden md:flex gap-2 mt-4 md:mt-0">
              {["All", "Manufacturing", "Design", "Retail", "Corporate"].map((f, i) => (
                <button key={f} className={`font-grotesk px-4 py-2 rounded-full transition-colors text-[13px] font-medium ${i === 0 ? "bg-text-primary text-bg-deep shadow-md" : "border border-glass-border text-text-secondary hover:text-text-primary hover:border-text-muted"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {roles.map((r, i) => (
              <motion.div key={r.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ x: 10 }}
                className="flex flex-col md:flex-row md:items-center justify-between p-6 lg:p-8 rounded-2xl bg-bg-surface-elevated border border-glass-border hover:bg-bg-surface hover:border-brand-primary/30 transition-all duration-500 group cursor-pointer backdrop-blur-sm shadow-sm hover:shadow-lg"
              >
                <div>
                  <h4 className="font-syne text-text-primary group-hover:text-brand-primary transition-colors text-[16px] font-bold">{r.title}</h4>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <span className="font-dm flex items-center gap-1.5 text-text-secondary opacity-60 text-[13px]"><Briefcase size={13} /> {r.dept}</span>
                    <span className="font-dm flex items-center gap-1.5 text-text-secondary opacity-60 text-[13px]"><MapPin size={13} /> {r.loc}</span>
                    <span className="font-dm flex items-center gap-1.5 text-text-secondary opacity-60 text-[13px]"><Clock size={13} /> {r.type}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-glass-border group-hover:bg-white group-hover:border-white group-hover:text-black transition-all duration-500 mt-3 md:mt-0">
                  <ArrowUpRight size={16} strokeWidth={2} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-28 lg:py-40 bg-bg-surface border-t border-glass-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="font-grotesk text-text-muted tracking-[0.2em] uppercase mb-4 block text-[12px] font-semibold">Process</span>
            <h2 className="font-syne text-text-primary text-[clamp(1.8rem, 3vw, 2.5rem)] font-bold tracking-[-0.03em]">Hiring Process</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((p, i) => (
              <motion.div 
                key={p.step} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5, delay: i * 0.1 }} 
                className="text-center group"
              >
                <div className="font-syne text-[56px] font-extrabold text-brand-primary/50 dark:text-brand-primary/30 group-hover:text-brand-primary transition-colors duration-500 mt-2">
                  {p.step}
                </div>
                <div className="w-8 h-[2px] bg-brand-primary/20 mx-auto my-5 transition-all duration-500 group-hover:w-16 group-hover:bg-brand-primary" />
                <h4 className="font-syne text-text-primary text-[19px] font-bold">{p.title}</h4>
                <p className="font-dm mt-3 text-text-secondary leading-[1.65] text-[15px]">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-bg-deep text-center relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative z-10">
          <h2 className="font-syne text-text-primary text-[clamp(1.8rem, 3vw, 2.5rem)] font-bold tracking-[-0.03em]">Ready to Shape the Future?</h2>
          <p className="font-dm mt-4 text-text-muted text-[16px]">careers@dholakiaretail.com</p>
          <Link to="/contact" className="font-grotesk group inline-flex items-center gap-2 mt-8 px-8 py-4 bg-text-primary text-bg-deep rounded-full hover:scale-105 transition-transform duration-300 text-[14px] font-semibold shadow-xl">
            Apply Now <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
