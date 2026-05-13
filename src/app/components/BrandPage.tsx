import { Link, useParams } from "react-router";
import { ArrowRight, ArrowUpRight, ChevronRight, Expand } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const ease = [0.65, 0, 0.35, 1] as const;

const MAYAVE = {
  hero: "/assets/images/P01_S05_home_portfolio_preview_optA_image.png",
  lookbookHero: "/assets/web/P04_S04_mayave_lookbook_optA_image.jpg",
  relatedBlog: "/assets/images/P04_S05_mayave_related_blog_optA_image.png",
  relatedNews: "/assets/images/P04_S06_mayave_related_news_optA_image.png",
  facts: [
    { label: "Audience", value: "Private luxury clientele" },
    { label: "Segment", value: "Bespoke fine jewellery" },
    { label: "Tone", value: "Quiet, poetic, precise" },
    { label: "Positioning", value: "Intimate modern elegance" },
  ],
  lookbook: [
    {
      src: "/assets/mayave/lookbook_01_stillness.jpg",
      caption: "Stillness in detail",
      ratio: "aspect-[4/5]",
    },
    {
      src: "/assets/mayave/lookbook_02_proportion.jpg",
      caption: "Light in proportion",
      ratio: "aspect-[1/1]",
    },
    {
      src: "/assets/mayave/lookbook_03_surface.jpg",
      caption: "The private surface",
      ratio: "aspect-[4/5]",
    },
    {
      src: "/assets/mayave/lookbook_04_whisper.jpg",
      caption: "Jewellery as whisper",
      ratio: "aspect-[1/1]",
    },
    {
      src: "/assets/mayave/lookbook_05_chain.jpg",
      caption: "Polished restraint",
      ratio: "aspect-[16/9]",
    },
    {
      src: "/assets/mayave/lookbook_06_bench.jpg",
      caption: "Material as memory",
      ratio: "aspect-[4/5]",
    },
  ],
  blog: [
    {
      slug: "tension-between-restraint-and-embellishment",
      cat: "Craft",
      title: "On the tension between restraint and embellishment",
      meta: "Craft · 8 min read · 3 April 2026",
      img: "/assets/mayave/journal_01_restraint.jpg",
    },
    {
      slug: "why-we-polish-for-nine-hours",
      cat: "Atelier",
      title: "Why we polish for nine hours when six would suffice",
      meta: "Atelier · 6 min read · 12 March 2026",
      img: "/assets/mayave/journal_02_polish.jpg",
    },
    {
      slug: "asha-collection-diamond-cutter",
      cat: "Conversations",
      title: "A dialogue with the diamond cutter behind the Asha collection",
      meta: "Conversations · 12 min read · 24 February 2026",
      img: "/assets/mayave/journal_03_cutter.jpg",
    },
  ],
  news: [
    {
      slug: "mayave-a-new-chapter-in-bespoke-luxury",
      cat: "Awards",
      title: "Mayavé awarded the 2026 Couture Design Prize for the Asha collection",
      meta: "Awards · 18 March 2026",
      img: "/assets/mayave/lookbook_03_surface.jpg",
    },
    {
      slug: "mayave-a-new-chapter-in-bespoke-luxury",
      cat: "Brand Launch",
      title: "Mayavé opens its first private salon outside Surat",
      meta: "Brand Launch · 5 February 2026",
      img: "/assets/mayave/lookbook_06_bench.jpg",
    },
    {
      slug: "mayave-a-new-chapter-in-bespoke-luxury",
      cat: "Press",
      title: "Mayavé featured in Vogue India's Heritage Houses 2026 issue",
      meta: "Press · 22 January 2026",
      img: "/assets/mayave/lookbook_04_whisper.jpg",
    },
  ],
};

/**
 * Page 4 — Mayavé brand page (/portfolio/mayave)
 *
 *  S01 Brand Hero
 *  S02 Brand Essence
 *  S03 Brand Facts
 *  S04 Lookbook (masonry)
 *  S05 Related Blog
 *  S06 Related News
 *  S07 Appointment CTA
 */
export function BrandPage() {
  const { slug } = useParams();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const heroOp = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [lightbox, setLightbox] = useState<number | null>(null);

  // For now slug is unused (we only have mayave) but supports future brands
  const isMayave = !slug || slug === "mayave";

  if (!isMayave) {
    return (
      <div className="bg-white text-[#0B1426] min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-[480px]">
          <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-4">
            Future Territory
          </p>
          <h1 className="font-syne text-[2rem] font-normal leading-[1.2]">
            This brand territory is in development.
          </h1>
          <p className="font-dm text-[#0B1426]/60 mt-5">
            Currently, Mayavé is the active house under Dholakia Retail's portfolio.
          </p>
          <Link
            to="/portfolio/mayave"
            className="font-dm group inline-flex mt-8 items-center gap-2 px-7 h-12 bg-[#3B6FFF] hover:bg-[#14275C] text-white rounded-sm text-[14px] font-semibold transition-colors duration-300"
          >
            Explore Mayavé
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-[#0B1426]">
      {/* P04-S01 — Brand Hero */}
      <section
        ref={heroRef}
        data-header-theme="dark"
        className="relative h-screen min-h-[640px] overflow-hidden bg-[#0B1426]"
      >
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <ImageWithFallback
            src={MAYAVE.hero}
            alt="Mayavé signature"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426] via-[#0B1426]/40 to-[#0B1426]/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1426] via-[#0B1426]/40 to-[#0B1426]/30" />
          {/* <div className="absolute inset-0 bg-gradient-to-l from-[#0B1426] via-[#0B1426]/40 to-[#0B1426]/30" /> */}
          {/* <div className="absolute inset-0 bg-gradient-to-r from-[#0B1426] via-[#0B1426]/40 to-[#0B1426]/30" /> */}
        </motion.div>

        <motion.div
          style={{ opacity: heroOp }}
          className="absolute top-28 left-6 lg:left-12 flex items-center gap-2 text-[12px] z-10"
        >
          <Link to="/" className="font-dm text-white/55 hover:text-white transition-colors">
            Dholakia Retail
          </Link>
          <ChevronRight size={12} className="text-white/45" />
          <Link to="/portfolio" className="font-dm text-white/55 hover:text-white transition-colors">
            Portfolio
          </Link>
          <ChevronRight size={12} className="text-white/45" />
          <span className="font-dm text-white/85">Mayavé</span>
        </motion.div>

        <motion.div
          style={{ opacity: heroOp }}
          className="relative z-10 h-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col justify-end pb-24 lg:pb-32"
        >
          <p className="font-dm text-white/70 text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
            Mayavé
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease }}
            className="font-syne text-white font-normal italic leading-[1.04] tracking-[-0.025em] text-[clamp(2.6rem,6vw,5.4rem)] max-w-[18ch]"
          >
            Where Silence Becomes Jewellery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
            className="font-dm text-white/75 max-w-[58ch] mt-7 text-[clamp(1rem,1.4vw,1.18rem)] leading-[1.7] font-light"
          >
            A new chapter in bespoke luxury, crafted for those who seek rarity, intimacy, and refined
            beauty.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link
              to="/contact?type=appointment"
              className="font-dm group inline-flex items-center gap-2 px-7 h-12 bg-[#3B6FFF] hover:bg-[#14275C] text-white rounded-sm text-[14px] font-semibold transition-colors duration-300"
            >
              Book a Private Viewing
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* P04-S02 — Brand Essence */}
      <section className="bg-[#F5F5F7] py-32 lg:py-44 border-y border-[#0B1426]/10">
        <div className="max-w-[640px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="border-l border-[#6B8AC9]/40 pl-8">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease }}
              className="font-syne text-[#0B1426] font-normal text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.18] tracking-[-0.01em]"
            >
              A language of restraint, intimacy, and rare detail.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="font-dm text-[#0B1426]/70 mt-6 text-[clamp(1rem,1.3vw,1.13rem)] leading-[1.75] font-light"
            >
              Mayavé should feel like a private room rather than a public display — considered, quiet,
              and emotionally resonant.
            </motion.p>
          </div>
        </div>
      </section>

      {/* P04-S03 — Brand Facts */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#0B1426]/10 border border-[#0B1426]/10">
            {MAYAVE.facts.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease }}
                className="bg-white p-8 lg:p-10"
              >
                <dt className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.16em] uppercase">
                  {f.label}
                </dt>
                <dd className="font-syne italic text-[#0B1426] text-[clamp(1.1rem,1.6vw,1.4rem)] mt-3">
                  {f.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>

      {/* P04-S04 — Lookbook (masonry) */}
      <section className="bg-[#F5F5F7] py-24 lg:py-32 border-y border-[#0B1426]/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="mb-12 flex items-end justify-between"
          >
            <div>
              <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-4">
                Lookbook
              </p>
              <h2 className="font-syne text-[#0B1426] font-normal text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.2]">
                Stillness, light, and the private surface.
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {MAYAVE.lookbook.map((shot, i) => (
              <motion.button
                key={i}
                onClick={() => setLightbox(i)}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease }}
                className={`group block w-full text-left ${shot.ratio} overflow-hidden bg-white relative rounded-2xl`}
              >
                <ImageWithFallback
                  src={shot.src}
                  alt={shot.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#0B1426] via-[#0B1426]/10 to-[#0B1426]/10 pointer-events-none" />
                <span className="absolute inset-0 bg-gradient-to-b from-[#0B1426] via-[#0B1426]/10 to-[#0B1426]/10 pointer-events-none" />
                <span className="absolute inset-0 bg-[#0B1426]/0 group-hover:bg-[#0B1426]/15 transition-colors duration-500" />
                <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/85 backdrop-blur text-[#3B6FFF] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Expand size={14} />
                </span>
                <span className="absolute bottom-3 left-3 right-3 font-syne italic text-white text-[14px] tracking-[0.04em] opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md">
                  {shot.caption}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Lightbox modal */}
          {lightbox !== null && (
            <div
              role="dialog"
              aria-modal
              onClick={() => setLightbox(null)}
              className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-6"
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-6 right-6 text-white text-[28px]"
                aria-label="Close"
              >
                ×
              </button>
              <img
                src={MAYAVE.lookbook[lightbox].src}
                alt=""
                className="max-w-[1100px] w-full max-h-[80vh] object-contain rounded-2xl"
              />
              <p className="absolute bottom-8 left-1/2 -translate-x-1/2 font-syne italic text-white text-[16px]">
                {MAYAVE.lookbook[lightbox].caption}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* P04-S05 — Related Blog */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <h2 className="font-syne text-[#0B1426] font-normal text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.18]">
              From the Mayavé journal
            </h2>
            <p className="font-dm text-[#0B1426]/65 text-[15px] leading-[1.7] md:max-w-[42ch]">
              Long-form notes on craft, materials, and the philosophy behind the house.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0B1426]/10">
            {MAYAVE.blog.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="bg-white"
              >
                <Link to={`/blog/${post.slug}`} className="group block">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <ImageWithFallback
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-[#0B1426] via-[#0B1426]/10 to-[#0B1426]/10 pointer-events-none" />
                    <span className="absolute inset-0 bg-gradient-to-b from-[#0B1426] via-[#0B1426]/10 to-[#0B1426]/10 pointer-events-none" />
                  </div>
                  <div className="p-7">
                    <p className="font-dm text-[#3B6FFF] text-[10px] font-medium tracking-[0.16em] uppercase">
                      {post.cat}
                    </p>
                    <h3 className="font-syne text-[#0B1426] mt-3 text-[18px] font-medium leading-[1.35] line-clamp-3 group-hover:text-[#3B6FFF] transition-colors">
                      {post.title}
                    </h3>
                    <p className="font-dm text-[#0B1426]/55 mt-3 text-[13px]">{post.meta}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/blog?category=mayave"
              className="font-dm group inline-flex items-center gap-2 px-7 h-12 border-2 border-[#3B6FFF] text-[#3B6FFF] hover:bg-[#3B6FFF] hover:text-white rounded-sm text-[14px] font-semibold transition-all duration-300"
            >
              Read the full journal
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* P04-S06 — Related News */}
      <section className="bg-[#F5F5F7] py-20 lg:py-28 border-y border-[#0B1426]/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-syne text-[#0B1426] font-normal text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.2]">
              Mayavé in the news
            </h2>
            <Link
              to="/news?category=mayave"
              className="font-dm group inline-flex items-center gap-2 text-[#0B1426] hover:text-[#3B6FFF] transition-colors text-[13px] font-semibold"
            >
              View all Mayavé press
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <ul className="border-t border-[#0B1426]/10">
            {MAYAVE.news.map((n, i) => (
              <motion.li
                key={n.slug}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease }}
                className="border-b border-[#0B1426]/10"
              >
                <Link
                  to={`/news/${n.slug}`}
                  className="group flex items-center gap-5 lg:gap-8 py-5 hover:bg-white/50 transition-colors px-2"
                >
                  <div className="relative w-24 h-14 lg:w-32 lg:h-20 overflow-hidden bg-white shrink-0">
                    <ImageWithFallback
                      src={n.img}
                      alt={n.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-[#0B1426] via-[#0B1426]/10 to-[#0B1426]/10 pointer-events-none" />
                    <span className="absolute inset-0 bg-gradient-to-b from-[#0B1426] via-[#0B1426]/10 to-[#0B1426]/10 pointer-events-none" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-dm text-[#3B6FFF] text-[10px] font-medium tracking-[0.16em] uppercase">
                      {n.cat}
                    </p>
                    <h3 className="font-syne text-[#0B1426] mt-1.5 text-[clamp(1rem,1.3vw,1.18rem)] font-medium leading-[1.35] line-clamp-2 group-hover:text-[#3B6FFF] transition-colors">
                      {n.title}
                    </h3>
                    <p className="font-dm text-[#0B1426]/55 mt-1 text-[12px]">{n.meta}</p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-[#0B1426]/40 group-hover:text-[#3B6FFF] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300 shrink-0"
                  />
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* P04-S07 — Appointment CTA */}
      <section className="bg-white py-32 lg:py-44">
        <div className="max-w-[820px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="font-syne text-[#0B1426] font-normal italic text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.15]"
          >
            By appointment, by intention.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="font-dm text-[#0B1426]/65 max-w-[58ch] mx-auto mt-6 text-[clamp(1rem,1.3vw,1.13rem)] leading-[1.7] font-light"
          >
            For private consultations, bespoke discussions, and brand inquiries, connect with Mayavé
            directly through Dholakia Retail.
          </motion.p>
          <Link
            to="/contact?type=appointment"
            className="font-dm group inline-flex mt-9 items-center gap-2 px-8 h-13 bg-[#3B6FFF] hover:bg-[#14275C] text-white rounded-sm text-[14px] font-semibold transition-colors duration-300"
          >
            Arrange a Viewing
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  );
}
