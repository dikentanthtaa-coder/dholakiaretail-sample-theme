import { Link } from "react-router";
import { ArrowRight, Mail } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const featured = {
  id: "1", cat: "Corporate News", date: "March 15, 2026",
  title: "Dholakia Retail Reports Record FY26 Revenue of ₹8,500 Crore",
  excerpt: "Milestone growth driven by strong performance across all portfolio brands, expanded export markets, and manufacturing excellence.",
  img: "https://images.unsplash.com/photo-1765614765034-ab49d03d4c28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwamV3ZWxyeSUyMGx1eHVyeSUyMGNyYWZ0c21hbnNoaXB8ZW58MXx8fHwxNzc1Njk5MDE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
};

const articles = [
  { id: "2", cat: "Sustainability", date: "Feb 28, 2026", title: "Solar Initiative Achieves 40MW Across Facilities", excerpt: "On track for 100% renewable energy." },
  { id: "3", cat: "Brand", date: "Jan 20, 2026", title: "RARE Launches Bespoke Atelier in Mumbai", excerpt: "Redefining fine jewelry retail." },
  { id: "4", cat: "Investor", date: "Jan 5, 2026", title: "Q3 FY26 Shows 18% Year-on-Year Growth", excerpt: "Strong domestic and international demand." },
  { id: "5", cat: "Corporate", date: "Dec 12, 2025", title: "Kisna Expands to 500+ Retail Points", excerpt: "Strengthening national presence." },
  { id: "6", cat: "Sustainability", date: "Nov 28, 2025", title: "One Million Trees Planted", excerpt: "Environmental commitment delivers impact." },
  { id: "7", cat: "Brand", date: "Nov 10, 2025", title: "HK Designs Wins Design Innovation Award", excerpt: "Recognized for blending tradition with contemporary." },
];

const categories = ["All", "Corporate", "Brand", "Sustainability", "Investor"];

export function NewsPage() {
  return (
    <div className="bg-bg-deep text-text-primary">
      {/* Hero */}
      <section className="py-24 lg:py-36 bg-bg-deep">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}>
            <span className="font-grotesk text-text-muted tracking-[0.2em] uppercase text-[12px] font-semibold">Newsroom</span>
            <h1 className="font-syne mt-4 text-text-primary text-[clamp(2.5rem, 5vw, 4.5rem)] font-bold leading-[1.05] tracking-[-0.03em]">News & Press</h1>
            <p className="font-dm mt-6 text-text-secondary max-w-lg text-[17px] leading-[1.7]">Corporate announcements, brand stories, and industry insights.</p>
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      <section className="pb-16 bg-bg-deep">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <Link to={`/news/${featured.id}`} className="group grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden bg-bg-surface border border-glass-border hover:border-brand-primary/30 transition-all duration-500 shadow-sm hover:shadow-xl">
              <div className="h-[300px] lg:h-[420px] overflow-hidden">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.7 }} className="w-full h-full">
                  <ImageWithFallback src={featured.img} alt={featured.title} className="w-full h-full object-cover" />
                </motion.div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-grotesk px-3 py-1 rounded-full bg-bg-surface-elevated border border-glass-border text-text-muted text-[12px] font-medium transition-colors">{featured.cat}</span>
                  <span className="text-text-muted text-[13px]">{featured.date}</span>
                </div>
                <h2 className="font-syne text-text-primary group-hover:text-brand-primary transition-colors text-[clamp(1.3rem, 2vw, 1.8rem)] font-bold leading-[1.3] tracking-[-0.02em]">{featured.title}</h2>
                <p className="font-dm mt-4 text-text-secondary text-[16px] leading-[1.7]">{featured.excerpt}</p>
                <span className="font-grotesk group inline-flex items-center gap-2 mt-6 text-brand-primary text-[14px] font-semibold">
                  Read More <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8 bg-bg-deep">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((c, i) => (
              <button key={c} className={`font-grotesk px-4 py-2 rounded-full transition-colors text-[13px] font-medium ${i === 0 ? "bg-text-primary text-bg-deep shadow-md" : "border border-glass-border text-text-secondary hover:text-text-primary hover:border-text-muted"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-12 lg:py-16 bg-bg-deep">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a, i) => (
              <motion.div key={a.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <Link to={`/news/${a.id}`} className="group block p-8 rounded-2xl bg-bg-surface-elevated border border-glass-border hover:bg-bg-surface hover:border-brand-primary/30 hover:-translate-y-1 transition-all duration-500 h-full backdrop-blur-sm shadow-sm hover:shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-grotesk px-3 py-1 rounded-full bg-text-primary/5 border border-glass-border text-text-muted text-[12px] font-medium">{a.cat}</span>
                    <span className="text-text-muted text-[13px]">{a.date}</span>
                  </div>
                  <h3 className="font-syne text-text-primary group-hover:text-brand-primary transition-colors text-[20px] font-bold leading-[1.3] tracking-[-0.01em]">{a.title}</h3>
                  <p className="font-dm mt-3 text-text-secondary text-[15px] leading-[1.6]">{a.excerpt}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media + Subscribe */}
      <section className="py-24 bg-bg-surface border-t border-glass-border text-text-primary">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="font-syne text-[22px] font-bold">Media Resources</h3>
            <p className="font-dm mt-4 text-text-secondary text-[15px] leading-[1.7]">
              Access brand assets, logos, and press contacts. For inquiries, reach our communications team.
            </p>
            <Link to="/contact" className="font-grotesk group inline-flex items-center gap-2 mt-4 text-text-primary text-[14px] font-semibold">
              Press Contact <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div>
            <h3 className="font-syne text-[22px] font-bold">Stay Updated</h3>
            <p className="font-dm mt-4 text-text-secondary text-[15px]">Subscribe for corporate updates.</p>
            <div className="flex gap-2 mt-4">
              <input type="email" placeholder="your@email.com" className="font-dm flex-1 px-5 py-3.5 bg-bg-surface-elevated border border-glass-border rounded-full text-text-primary placeholder:text-text-muted focus:border-brand-primary outline-none text-[14px]" />
              <button className="font-grotesk px-6 py-3.5 bg-text-primary text-bg-deep rounded-full hover:bg-text-primary/90 transition-all text-[14px] font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
