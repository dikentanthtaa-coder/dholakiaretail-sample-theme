import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CTASection } from "./home/CTA";

const ease = [0.65, 0, 0.35, 1] as const;

/* P09-S02 — 5 categories per build spec */
const CATEGORIES = [
  "All",
  "Company Updates",
  "Brand Launches",
  "Sustainability",
  "Leadership",
  "Press Resources",
] as const;

/* P09-S03 + S04 — featured story + 4 grid cards per build spec */
export const NEWS_ARCHIVE = [
  {
    slug: "building-the-future-of-luxury-retail",
    cat: "Company Updates",
    date: "14 March 2026",
    title: "Building the Future of Luxury Retail",
    excerpt:
      "How Dholakia Retail is establishing the corporate foundation for a new generation of jewellery brands.",
    img: "/assets/images/building-the-future-of-luxury-retail.png",
    featured: true,
  },
  {
    slug: "mayave-a-new-chapter-in-bespoke-luxury",
    cat: "Brand Launches",
    date: "8 March 2026",
    title: "Mayavé: A New Chapter in Bespoke Luxury",
    excerpt:
      "An editorial introduction to Mayavé — the first house in Dholakia Retail's curated portfolio.",
    img: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "why-responsibility-matters-in-modern-jewellery",
    cat: "Sustainability",
    date: "28 February 2026",
    title: "Why Responsibility Matters in Modern Jewellery",
    excerpt:
      "Notes on traceability, certifications, and the discipline of measuring what matters in a luxury house.",
    img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "what-defines-a-house-of-brands",
    cat: "Leadership",
    date: "14 February 2026",
    title: "What Defines a House of Brands",
    excerpt:
      "How a curated portfolio differs from a multi-brand retailer — and why that distinction matters.",
    img: "/assets/images/what-defines-a-house-of-brands.png",
  }
];

/**
 * Page 9 — Newsroom
 */
export function NewsPage() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo(
    () => (active === "All" ? NEWS_ARCHIVE : NEWS_ARCHIVE.filter((n) => n.cat === active)),
    [active]
  );
  const featured = filtered.find((n) => n.featured) ?? filtered[0];
  const grid = filtered.filter((n) => n !== featured);

  return (
    <div className="bg-white text-[#0B1426]">
      {/* P09-S01 — Hero */}
      <section className="bg-white pt-40 lg:pt-52 pb-12 lg:pb-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
            Newsroom
          </p>
          <h1 className="font-syne text-[#0B1426] font-normal leading-[1.05] tracking-[-0.02em] text-[clamp(2.4rem,5.5vw,5rem)] max-w-[20ch]">
            A Record of What We Build — and Believe
          </h1>
          <p className="font-dm text-[#0B1426]/65 max-w-[58ch] mt-6 text-[clamp(1rem,1.3vw,1.13rem)] leading-[1.7] font-light">
            A space for company updates, brand launches, sustainability narratives, leadership
            perspectives, and press resources.
          </p>
        </div>
      </section>

      {/* P09-S02 — Categories */}
      <section className="bg-white py-6 border-y border-[#0B1426]/10 sticky top-[68px] lg:top-[72px] z-30 backdrop-blur-md bg-white/90">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`font-dm shrink-0 px-4 h-9 rounded-sm text-[12.5px] font-medium tracking-[0.04em] transition-all duration-200 ${
                active === c
                  ? "bg-[#3B6FFF] text-white"
                  : "border border-[#6B8AC9]/40 text-[#0B1426]/70 hover:border-[#3B6FFF] hover:text-[#3B6FFF]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* P09-S03 — Featured Story */}
      {featured && (
        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
            <Link
              to={`/news/${featured.slug}`}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 group"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#F5F5F7] rounded-2xl">
                <ImageWithFallback
                  src={featured.img}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.16em] uppercase">
                  Featured · {featured.cat}
                </p>
                <h2 className="font-syne text-[#0B1426] mt-4 text-[clamp(1.8rem,3.4vw,2.8rem)] font-normal leading-[1.15] tracking-[-0.01em] group-hover:text-[#3B6FFF] transition-colors">
                  {featured.title}
                </h2>
                <p className="font-dm text-[#0B1426]/65 mt-5 text-[clamp(1rem,1.3vw,1.13rem)] leading-[1.7]">
                  {featured.excerpt}
                </p>
                <p className="font-dm text-[#0B1426]/55 mt-5 text-[13px]">{featured.date}</p>
                <span className="font-dm text-[#3B6FFF] mt-7 inline-flex items-center gap-1.5 text-[14px] font-semibold">
                  Read the story
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* P09-S04 — Article Grid */}
      <section className="bg-[#F5F5F7] py-20 border-y border-[#0B1426]/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          {grid.length === 0 ? (
            <p className="text-center text-[#0B1426]/50 py-20 font-dm">
              No articles in this category yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
              {grid.map((n, i) => (
                <motion.div
                  key={n.slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease }}
                  className="bg-white overflow-hidden"
                >
                  <Link to={`/news/${n.slug}`} className="group flex flex-col h-full">
                    <div className="aspect-[16/9] overflow-hidden">
                      <ImageWithFallback
                        src={n.img}
                        alt={n.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-7 flex flex-col flex-1">
                      <p className="font-dm text-[#3B6FFF] text-[10px] font-medium tracking-[0.16em] uppercase">
                        {n.cat} · {n.date}
                      </p>
                      <h3 className="font-syne text-[#0B1426] mt-3 text-[18px] font-medium leading-[1.35] flex-1 group-hover:text-[#3B6FFF] transition-colors">
                        {n.title}
                      </h3>
                      <span className="font-dm text-[#3B6FFF] mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold">
                        Read
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* P09-S05 — Press Kit CTA */}
      <CTASection
        eyebrow="Press"
        heading="Need corporate information or brand assets?"
        body="Logos, fact sheet, leadership portraits — everything press teams require, in a single download."
        primary={{ label: "Request the Press Kit", to: "/press-kit" }}
        secondary={{ label: "Press inquiries", to: "/contact?type=press" }}
      />
    </div>
  );
}
