import { Link, useSearchParams } from "react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const ease = [0.65, 0, 0.35, 1] as const;

const CATEGORIES = ["All", "Craft", "Materials", "Philosophy", "Conversations", "Atelier", "Sustainability"] as const;

/* Per build spec §P18 — featured post is "Why we polish for nine hours" by Hemant Patel,
 * grid carries the 6 specific posts called out in P18-S04. Order: featured first, then S04.
 */
export const BLOG_ARCHIVE = [
  {
    slug: "why-we-polish-for-nine-hours",
    cat: "Craft",
    title: "Why we polish for nine hours when six would suffice",
    excerpt:
      "An essay from the master polisher's desk on the difference between finished and complete — and why the last three hours are the ones that matter.",
    img: "/assets/web/P18_S02_blog_listing_featured_post_optA_image.jpg",
    date: "12 March 2026",
    read: "6 min read",
    author: "Hemant Patel",
    authorRole: "Master Polisher",
    featured: true,
  },
  {
    slug: "tension-between-restraint-and-embellishment",
    cat: "Craft",
    title: "On the tension between restraint and embellishment",
    excerpt:
      "On the discipline of leaving things out — and what it teaches you about the things you leave in.",
    img: "/assets/web/P18_S04_blog_listing_posts_grid_optA_image.jpg",
    date: "3 April 2026",
    read: "8 min",
    author: "Editorial Desk",
  },
  {
    slug: "asha-collection-diamond-cutter",
    cat: "Conversations",
    title: "A dialogue with the diamond cutter behind the Asha collection",
    excerpt:
      "On precision, patience, and the responsibility of knowing where every facet ends.",
    img: "/assets/web/P18_S04_blog_listing_posts_grid_optA_image.jpg",
    date: "24 February 2026",
    read: "12 min",
    author: "Editorial Desk",
  },
  {
    slug: "cool-tones-warm-metals",
    cat: "Materials",
    title: "Cool tones, warm metals: notes on a colour discipline",
    excerpt:
      "Why our finishes lean cool and what it means for how a piece sits on the body.",
    img: "/assets/web/P18_S04_blog_listing_posts_grid_optA_image.jpg",
    date: "12 February 2026",
    read: "5 min",
    author: "Editorial Desk",
  },
  {
    slug: "why-we-never-use-the-word-luxury",
    cat: "Philosophy",
    title: "Why we never use the word 'luxury'",
    excerpt:
      "A short note on the language we use — and the language we deliberately do not.",
    img: "/assets/web/P18_S04_blog_listing_posts_grid_optA_image.jpg",
    date: "28 January 2026",
    read: "4 min",
    author: "Editorial Desk",
  },
  {
    slug: "inside-the-audit-water-programme",
    cat: "Sustainability",
    title: "Inside the audit: how the water programme is verified each quarter",
    excerpt:
      "How independent verification turns intent into evidence — and what this means for ESG reporting.",
    img: "/assets/web/P18_S04_blog_listing_posts_grid_optA_image.jpg",
    date: "22 January 2026",
    read: "9 min",
    author: "Sustainability Desk",
  },
  {
    slug: "what-an-apprentice-learns",
    cat: "Atelier",
    title: "What an apprentice learns in their first ninety days",
    excerpt:
      "A field note from the bench on the first three months of every apprentice's tenure with us.",
    img: "/assets/web/P18_S04_blog_listing_posts_grid_optA_image.jpg",
    date: "11 December 2025",
    read: "7 min",
    author: "Atelier Desk",
  },
];

/**
 * Page 18 — Blog (listing) /blog
 */
export function BlogPage() {
  const [params, setParams] = useSearchParams();
  const queryCategory = params.get("category");
  const initial: (typeof CATEGORIES)[number] = (CATEGORIES as readonly string[]).includes(
    queryCategory ?? ""
  )
    ? (queryCategory as (typeof CATEGORIES)[number])
    : "All";
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>(initial);

  useEffect(() => {
    if (queryCategory && (CATEGORIES as readonly string[]).includes(queryCategory)) {
      setActive(queryCategory as (typeof CATEGORIES)[number]);
    }
  }, [queryCategory]);

  const filtered = useMemo(
    () => (active === "All" ? BLOG_ARCHIVE : BLOG_ARCHIVE.filter((p) => p.cat === active)),
    [active]
  );
  const featured = filtered.find((p) => p.featured) ?? filtered[0];
  const grid = filtered.filter((p) => p !== featured);

  return (
    <div className="bg-white text-[#0B1426]">
      {/* P18-S01 — Hero */}
      <section className="bg-[#F5F5F7] pt-40 lg:pt-52 pb-20 lg:pb-28 border-b border-[#0B1426]/10 text-center">
        <div className="max-w-[880px] mx-auto px-6 md:px-12 lg:px-20">
          <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
            The Journal
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="font-syne text-[#0B1426] font-normal leading-[1.05] tracking-[-0.02em] text-[clamp(2.2rem,5vw,4.4rem)]"
          >
            Notes from the house.
          </motion.h1>
          <p className="font-dm text-[#0B1426]/65 mx-auto max-w-[58ch] mt-7 text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.7] font-light">
            Long-form writing on craft, materials, philosophy, and the people behind Dholakia
            Retail's work.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-9">
            <Link
              to="/contact?type=press"
              className="font-dm inline-flex items-center gap-2 px-7 h-12 border-2 border-[#3B6FFF] text-[#3B6FFF] hover:bg-[#3B6FFF] hover:text-white rounded-sm text-[14px] font-semibold transition-all duration-300"
            >
              Subscribe to the journal
              <ArrowRight size={16} />
            </Link>
          </div>
          <ChevronDown size={22} className="mx-auto mt-12 text-[#0B1426]/40 animate-bounce" />
        </div>
      </section>

      {/* P18-S03 — Categories */}
      <section className="bg-white py-6 border-b border-[#0B1426]/10 sticky top-[68px] lg:top-[72px] z-30 backdrop-blur-md bg-white/90">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => {
                setActive(c);
                if (c === "All") setParams({});
                else setParams({ category: c });
              }}
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

      {/* P18-S02 — Featured */}
      {featured && (
        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-[1100px] mx-auto px-6 md:px-12 lg:px-20">
            <Link
              to={`/blog/${featured.slug}`}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center group"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#F5F5F7] rounded-2xl">
                <ImageWithFallback
                  src={featured.img}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div>
                <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.16em] uppercase">
                  Featured · {featured.cat}
                </p>
                <h2 className="font-syne text-[#0B1426] mt-4 text-[clamp(1.6rem,3vw,2.4rem)] font-normal leading-[1.18] tracking-[-0.01em] group-hover:text-[#3B6FFF] transition-colors">
                  {featured.title}
                </h2>
                <p className="font-dm text-[#0B1426]/65 mt-5 text-[clamp(1rem,1.2vw,1.1rem)] leading-[1.7]">
                  {featured.excerpt}
                </p>
                <p className="font-dm text-[#0B1426]/55 mt-5 text-[13px]">
                  By {featured.author} · {featured.date} · {featured.read}
                </p>
                <span className="font-dm text-[#3B6FFF] mt-7 inline-flex items-center gap-1.5 text-[14px] font-semibold">
                  Read the essay
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* P18-S04 — Asymmetric Grid */}
      <section className="bg-[#F5F5F7] py-20 border-y border-[#0B1426]/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          {grid.length === 0 ? (
            <p className="text-center text-[#0B1426]/50 py-20 font-dm">
              No posts in this category yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0B1426]/10">
              {grid.map((p, i) => (
                <motion.article
                  key={p.slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease }}
                  className="bg-white rounded-2xl overflow-hidden"
                >
                  <Link to={`/blog/${p.slug}`} className="group flex flex-col h-full">
                    <div className="aspect-[16/9] overflow-hidden">
                      <ImageWithFallback
                        src={p.img}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-7 flex flex-col flex-1">
                      <p className="font-dm text-[#3B6FFF] text-[10px] font-medium tracking-[0.16em] uppercase">
                        {p.cat}
                      </p>
                      <h3 className="font-syne text-[#0B1426] mt-3 text-[18px] font-medium leading-[1.35] flex-1 group-hover:text-[#3B6FFF] transition-colors line-clamp-3">
                        {p.title}
                      </h3>
                      <p className="font-dm text-[#0B1426]/55 mt-5 text-[12px]">
                        {p.read} · {p.date}
                      </p>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* P18-S05 — Subscribe closer */}
      <section
        data-header-theme="dark"
        className="bg-[#0B1426] text-white py-28 lg:py-36"
      >
        <div className="max-w-[680px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <h2 className="font-syne font-normal text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.25]">
            Slow reading, monthly.
          </h2>
          <p className="font-dm text-white/72 mt-6 text-[1.05rem] leading-[1.7]">
            One long-form essay every month from the Dholakia Retail editorial team. No promotion,
            no aggregation — only the writing.
          </p>
          <Link
            to="/contact?type=press"
            className="font-dm group inline-flex items-center gap-2 mt-8 px-8 h-12 bg-[#3B6FFF] hover:bg-[#14275C] text-white rounded-sm text-[14px] font-semibold transition-colors duration-300"
          >
            Subscribe to the journal
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="font-dm text-white/55 mt-5 text-[12.5px]">
            We email once per month. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
}
