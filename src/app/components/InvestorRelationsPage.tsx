import { Link } from "react-router";
import { ArrowRight, Download, TrendingUp, Users, Globe, Building2, BarChart3, FileText } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const kpis = [
  { icon: <TrendingUp size={18} />, value: "₹8,500 Cr", label: "Annual Turnover", change: "+18% YoY" },
  { icon: <Users size={18} />, value: "10,000+", label: "Employees", change: "+12% YoY" },
  { icon: <Globe size={18} />, value: "25+", label: "Export Markets", change: "+3 New" },
  { icon: <Building2 size={18} />, value: "500K+", label: "Pieces Produced", change: "+22% YoY" },
  { icon: <BarChart3 size={18} />, value: "4", label: "Portfolio Brands", change: "Stable" },
  { icon: <FileText size={18} />, value: "95%", label: "ESG Compliance", change: "+5% YoY" },
];

const reportTabs = ["All", "Annual Reports", "Financials", "Governance", "ESG", "Press"];

const reports = [
  { title: "Annual Report FY 2024–25", type: "Annual Reports", date: "Mar 2026", size: "12.4 MB" },
  { title: "Q3 FY26 Financial Highlights", type: "Financials", date: "Feb 2026", size: "3.2 MB" },
  { title: "Board Governance Policy", type: "Governance", date: "Jan 2026", size: "1.1 MB" },
  { title: "ESG Performance Summary 2025", type: "ESG", date: "Dec 2025", size: "4.8 MB" },
  { title: "H1 FY26 Investor Presentation", type: "Financials", date: "Nov 2025", size: "8.6 MB" },
  { title: "Press Release: Record Revenue", type: "Press", date: "Oct 2025", size: "0.3 MB" },
];

export function InvestorRelationsPage() {
  return (
    <div className="bg-bg-deep text-text-primary">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" alt="Investor Relations - Corporate" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-bg-deep/60 dark:bg-black/55" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}>
            <span className="font-grotesk inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-text-secondary rounded-full mb-6 text-[13px] font-medium tracking-[0.15em] uppercase">Investor Relations</span>
            <h1 className="font-syne text-text-primary max-w-3xl mx-auto text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              Performance, Governance & Long-Term Value
            </h1>
            <p className="font-dm mt-6 text-text-secondary max-w-xl mx-auto text-[17px] leading-[1.7]">
              Transparent access to financial highlights, governance, and ESG commitments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* KPIs */}
      <section className="py-20 bg-bg-surface border-y border-glass-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {kpis.map((k, i) => (
              <motion.div key={k.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center p-6 bg-bg-surface-elevated rounded-2xl border border-glass-border backdrop-blur-sm shadow-sm"
              >
                <div className="text-brand-primary/60 mb-2 flex justify-center">{k.icon}</div>
                <div className="font-syne text-[24px] font-extrabold text-brand-primary">{k.value}</div>
                <p className="font-dm text-text-muted mt-1 text-[12px]">{k.label}</p>
                <p className="font-grotesk text-brand-primary/70 mt-1 text-[11px] font-semibold">{k.change}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-28 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="font-grotesk text-text-muted tracking-[0.15em] uppercase text-[12px] font-medium">Dashboard Preview</span>
            <h2 className="font-syne mt-3 mb-12 text-[clamp(1.5rem,2.5vw,2rem)] font-bold tracking-[-0.02em]">Investor Portal</h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="rounded-3xl border border-glass-border bg-bg-surface text-text-primary p-6 lg:p-10 overflow-hidden shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1 space-y-2">
                {["Overview", "Revenue", "Portfolio", "ESG Metrics", "Reports", "Disclosures"].map((item, i) => (
                  <div key={item} className={`font-grotesk px-4 py-3 rounded-xl text-[14px] transition-colors ${i === 0 ? "bg-white/10 text-white" : "text-text-muted hover:text-text-secondary"}`}>
                    {item}
                  </div>
                ))}
              </div>
              <div className="lg:col-span-3 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-6 bg-white/5 rounded-2xl border border-glass-border">
                    <p className="font-grotesk text-text-muted text-[11px] uppercase tracking-[0.1em]">Revenue FY26</p>
                    <p className="font-syne mt-3 text-[30px] font-extrabold">₹8,500 Cr</p>
                    <div className="mt-4 h-14 flex items-end gap-1">
                      {[40, 55, 48, 62, 70, 65, 80, 75, 88, 82, 95, 100].map((h, i) => (
                        <div key={i} className="flex-1 bg-white/20 rounded-sm" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-glass-border">
                    <p className="font-grotesk text-text-muted text-[11px] uppercase tracking-[0.1em]">Business Mix</p>
                    <div className="mt-4 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full border-[5px] border-white/30 relative flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full border-[5px] border-brand-primary/40 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-white/10" />
                        </div>
                      </div>
                    </div>
                    <div className="font-grotesk mt-4 flex justify-center gap-4 text-[11px]">
                      <span className="text-text-secondary">● Retail 60%</span>
                      <span className="text-brand-primary">● B2B 30%</span>
                      <span className="text-text-muted">● Export 10%</span>
                    </div>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-glass-border">
                    <p className="font-grotesk text-text-muted text-[11px] uppercase tracking-[0.1em]">ESG Score</p>
                    <p className="font-syne mt-3 text-[30px] font-extrabold text-brand-primary">A+</p>
                    <p className="font-dm text-text-muted mt-3 text-[13px] leading-[1.5]">Industry-leading ESG compliance across all criteria.</p>
                  </div>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-glass-border">
                  <p className="font-grotesk text-text-muted mb-4 text-[11px] uppercase tracking-[0.1em]">Recent Disclosures</p>
                  {reports.slice(0, 3).map((r) => (
                    <div key={r.title} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                      <div>
                        <p className="font-grotesk text-text-secondary text-[14px]">{r.title}</p>
                        <p className="font-dm text-text-muted text-[12px]">{r.date}</p>
                      </div>
                      <Download size={14} className="text-text-muted" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reports */}
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
            <h2 className="font-syne text-text-primary text-[clamp(2rem, 3.5vw, 2.8rem)] font-bold tracking-[-0.02em]">Reports & Filings</h2>
          </motion.div>

          <div className="flex flex-wrap gap-2 mb-10">
            {reportTabs.map((t, i) => (
              <button key={t} className={`font-grotesk px-4 py-2 rounded-full transition-colors text-[13px] font-medium ${i === 0 ? "bg-text-primary text-bg-deep shadow-lg" : "border border-glass-border text-text-secondary hover:text-text-primary hover:border-text-muted"}`}>
                {t}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {reports.map((r, i) => (
                  <motion.div 
                    key={r.title} 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-center justify-between p-6 lg:p-8 rounded-2xl bg-bg-surface-elevated border border-glass-border hover:bg-bg-surface hover:border-brand-primary/40 transition-all duration-500 group cursor-pointer backdrop-blur-sm shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center gap-6">
                      {/* File Icon Circle */}
                      <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-bg-surface border border-glass-border group-hover:bg-brand-primary/10 group-hover:border-brand-primary/30 transition-colors duration-500">
                        <div className="text-text-muted group-hover:text-brand-primary transition-colors duration-500">
                          <FileText size={20} strokeWidth={1.5} />
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
            All filings are independently audited and verified annually.
          </motion.p>
        </div>
      </section>

      {/* Governance + ESG */}
      <section className="py-28 lg:py-40 bg-bg-deep">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[
            { label: "Governance", title: "Strong Governance, Transparent Leadership", desc: "Our board comprises leaders with deep expertise in luxury retail, finance, governance, and sustainability.", link: "/about", linkText: "Meet Leadership" },
            { label: "ESG Integration", title: "Sustainability as Value Creation", desc: "ESG is integrated into every business decision—from ethical sourcing to community investment.", link: "/sustainability", linkText: "ESG Commitment" },
          ].map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-10 rounded-3xl bg-white/[0.03] border border-glass-border hover:border-brand-primary/20 transition-colors duration-500"
            >
              <span className="font-grotesk text-text-muted tracking-[0.2em] uppercase text-[12px] font-semibold">{item.label}</span>
              <h3 className="font-syne mt-4 text-text-primary text-[22px] font-bold tracking-[-0.02em]">{item.title}</h3>
              <p className="font-dm mt-4 text-text-secondary leading-[1.8] text-[15px]">{item.desc}</p>
              <Link to={item.link} className="font-grotesk group inline-flex items-center gap-2 mt-6 text-brand-primary hover:text-brand-secondary transition-colors text-[14px] font-semibold">
                {item.linkText} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="py-28 bg-bg-surface text-text-primary text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="font-syne text-[clamp(1.5rem, 3vw, 2.5rem)] font-bold tracking-[-0.03em]">Investor Contact</h2>
          <p className="font-dm mt-4 text-text-secondary text-[16px]">ir@dholakiaretail.com · +91 63535 18935</p>
          <Link to="/contact" className="font-grotesk group inline-flex items-center gap-2 mt-8 px-8 py-4 bg-white text-black rounded-full text-[14px] font-semibold hover:bg-white/90 transition-all">
            Contact IR Team <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
