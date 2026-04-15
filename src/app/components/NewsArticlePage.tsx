import { Link, useParams } from "react-router";
import { ArrowLeft, ArrowRight, Share2, Download } from "lucide-react";
import { motion } from "motion/react";

const syne = "'Syne', sans-serif";
const grotesk = "'Space Grotesk', sans-serif";
const dm = "'DM Sans', sans-serif";

export function NewsArticlePage() {
  const { id } = useParams();

  return (
    <div>
      <section className="py-20 lg:py-32">
        <div className="max-w-[720px] mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Link to="/news" className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-10" style={{ fontFamily: grotesk, fontSize: 13, fontWeight: 500 }}>
              <ArrowLeft size={14} /> Back to News
            </Link>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-muted text-foreground/60" style={{ fontFamily: grotesk, fontSize: 12, fontWeight: 500 }}>Corporate News</span>
              <span className="text-muted-foreground" style={{ fontSize: 13 }}>March 15, 2026</span>
            </div>
            <h1 style={{ fontFamily: syne, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.03em" }}>
              Dholakia Retail Reports Record FY26 Revenue of ₹8,500 Crore
            </h1>
            <div className="flex items-center gap-4 mt-8">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors" style={{ fontFamily: grotesk, fontSize: 13 }}>
                <Share2 size={14} /> Share
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors" style={{ fontFamily: grotesk, fontSize: 13 }}>
                <Download size={14} /> PDF
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 lg:pb-32">
        <article className="max-w-[720px] mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="space-y-6 text-foreground/70" style={{ fontFamily: dm, fontSize: 17, lineHeight: 2 }}
          >
            <p>
              <strong className="text-foreground">Surat, India — March 15, 2026</strong> — Dholakia Retail Private Limited, one of India's leading luxury retail groups, today announced consolidated revenue of ₹8,500 crore for FY 2025–26, representing an 18% increase over the prior year.
            </p>
            <p>
              The record performance was driven by strong growth across all four portfolio brands—RARE, Kisna, Unity Jewels, and HK Designs—alongside expanded international operations and continued investment in manufacturing excellence.
            </p>
            <blockquote className="border-l-4 border-foreground pl-8 py-4 my-10" style={{ fontFamily: syne, fontSize: 22, fontWeight: 600, color: "#0d0d0d", lineHeight: 1.5 }}>
              "This milestone reflects the collective strength of our portfolio, the dedication of our 10,000+ team members, and our unwavering commitment to quality and innovation."
            </blockquote>
            <p>
              Key highlights include the launch of RARE's bespoke atelier in Mumbai, Kisna's expansion to 500+ retail points, Unity Jewels' entry into three new markets, and HK Designs' international recognition.
            </p>
            <p>
              The group also achieved significant sustainability progress: 40MW solar capacity, one-millionth tree planted, and 95% ethical sourcing compliance.
            </p>
            <p>
              Looking ahead, Dholakia Retail plans to accelerate digital transformation, expand internationally, and deepen its ESG leadership while preserving the heritage craftsmanship that defines its brands.
            </p>
          </motion.div>

          <div className="mt-14 p-8 rounded-2xl bg-muted/50">
            <h4 className="text-muted-foreground mb-4" style={{ fontFamily: grotesk, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Related Tags</h4>
            <div className="flex flex-wrap gap-2">
              {["Financial Results", "FY26", "Corporate News", "Growth"].map((t) => (
                <span key={t} className="px-4 py-1.5 rounded-full bg-white border border-border text-muted-foreground" style={{ fontFamily: grotesk, fontSize: 13 }}>{t}</span>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-muted-foreground" style={{ fontFamily: dm, fontSize: 13 }}>Media Contact: press@dholakiaretail.com</p>
            </div>
          </div>
        </article>
      </section>

      {/* Related */}
      <section className="py-20 bg-muted/30 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <h3 className="mb-10" style={{ fontFamily: syne, fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { cat: "Sustainability", title: "Solar Initiative Achieves 40MW", date: "Feb 2026" },
              { cat: "Brand", title: "RARE Launches Bespoke Atelier", date: "Jan 2026" },
              { cat: "Investor", title: "Q3 FY26 Shows 18% Growth", date: "Jan 2026" },
            ].map((a) => (
              <Link to="/news/2" key={a.title} className="group block p-8 rounded-2xl bg-white border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full bg-muted text-foreground/60" style={{ fontFamily: grotesk, fontSize: 12, fontWeight: 500 }}>{a.cat}</span>
                  <span className="text-muted-foreground" style={{ fontSize: 13 }}>{a.date}</span>
                </div>
                <h4 className="group-hover:opacity-70 transition-opacity" style={{ fontFamily: syne, fontSize: 18, fontWeight: 700, lineHeight: 1.3 }}>{a.title}</h4>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/news" className="group inline-flex items-center gap-2 text-foreground" style={{ fontFamily: grotesk, fontSize: 14, fontWeight: 600 }}>
              All News <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
