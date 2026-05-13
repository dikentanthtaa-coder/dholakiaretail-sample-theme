import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Share2,
  Linkedin,
  Twitter,
  ChevronRight,
  Mail,
  Copy,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { NEWS_ARCHIVE } from "./NewsPage";

const ease = [0.65, 0, 0.35, 1] as const;

/**
 * P13 — Single News Article
 * Sample article copy is the spec's "Restoring 37 billion litres" piece — used
 * verbatim for the canonical sustainability article. Other slugs use
 * generated copy until full content lands in CMS.
 */
const FEATURED_ARTICLE = {
  slug: "restoring-37-billion-litres",
  category: "Sustainability",
  publishedDate: "14 March 2026",
  lastUpdated: "14 March 2026",
  title: "Restoring 37 billion litres: a five-year update on the water programme",
  subtitle:
    "What began as a single rural intervention has become a structured ESG commitment — verified, audited, and reported.",
  authorMeta: "By the Sustainability Desk · 6 min read",
  authorName: "The Sustainability Desk",
  authorRole: "Dholakia Retail",
  authorBio:
    "The Sustainability Desk publishes the company's annual ESG report and quarterly programme updates.",
  img: "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1920&q=80",
  body: {
    lead:
      "When Dholakia Retail's water-restoration programme launched in 2021, the brief was deliberately narrow: revive one neglected water body in a single district, document everything, and only scale once the model proved it could be measured.",
    sections: [
      {
        heading: "What changed in five years",
        body:
          "Today, that programme spans 14 districts and a cumulative restored volume verified at 37 billion litres. Independent auditors review the methodology twice a year. The data is published in the annual ESG report and made available on request to investors and journalists.",
      },
      {
        pullquote:
          "Sustainability is not a marketing posture. It is a discipline measured against numbers we publish whether the numbers flatter us or not.",
      },
      {
        body:
          "The programme has shifted from environmental philanthropy to operational practice. Every restoration site is selected with the local watershed authority, designed with hydrology consultants, and monitored over 24 months post-completion.",
      },
      {
        heading: "What the next five years require",
        body:
          "Climate volatility is widening the gap between intention and impact. Restoration alone is no longer enough — the next phase combines watershed restoration with rainwater harvesting infrastructure at our manufacturing sites and partner ateliers.",
      },
    ],
  },
  related: [
    {
      slug: "rjc-assurance-programme",
      title: "Dholakia Retail joins the Responsible Jewellery Council assurance programme",
      meta: "Press Release · 8 February 2026",
      img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1600&q=80",
    },
    {
      slug: "inside-the-audit",
      title: "Inside the audit: how the water programme is verified each quarter",
      meta: "Sustainability · 22 January 2026",
      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80",
    },
    {
      slug: "open-letter-esg-investors",
      title: "The case for measured impact: an open letter to ESG investors",
      meta: "Leadership · 11 December 2025",
      img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80",
    },
  ],
};

export function NewsArticlePage() {
  const { id } = useParams();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  // If the URL slug matches an item in the news archive, render that header data.
  // Otherwise fall back to related-article metadata, then to the spec sample article.
  // The body always uses the spec sample article (richest copy available).
  const indexed = NEWS_ARCHIVE.find((n) => n.slug === id);
  const relatedMatch = FEATURED_ARTICLE.related.find((r) => r.slug === id);
  const headline = indexed
    ? {
        title: indexed.title,
        subtitle: indexed.excerpt,
        category: indexed.cat,
        publishedDate: indexed.date,
        img: indexed.img,
      }
    : relatedMatch
    ? {
        title: relatedMatch.title,
        subtitle: FEATURED_ARTICLE.subtitle,
        category: relatedMatch.meta.split(" · ")[0],
        publishedDate: relatedMatch.meta.split(" · ")[1] ?? FEATURED_ARTICLE.publishedDate,
        img: relatedMatch.img,
      }
    : {
        title: FEATURED_ARTICLE.title,
        subtitle: FEATURED_ARTICLE.subtitle,
        category: FEATURED_ARTICLE.category,
        publishedDate: FEATURED_ARTICLE.publishedDate,
        img: FEATURED_ARTICLE.img,
      };

  const onCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
    }
  };

  return (
    <div className="bg-white text-[#0B1426]">
      {/* P13-S01 — Article Hero */}
      <section
        ref={ref}
        data-header-theme="dark"
        className="relative h-[80vh] min-h-[560px] overflow-hidden bg-[#0B1426]"
      >
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <ImageWithFallback
            src={headline.img}
            alt={headline.title}
            className="w-full h-full object-cover opacity-80"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426] via-[#0B1426]/40 to-[#0B1426]/40" />
        </motion.div>

        <div className="absolute top-28 left-6 lg:left-12 flex items-center gap-2 text-[12px] z-10">
          <Link to="/news" className="font-dm text-white/55 hover:text-white transition-colors">
            Newsroom
          </Link>
          <ChevronRight size={12} className="text-white/45" />
          <span className="font-dm text-white/85">{headline.category}</span>
        </div>

        <div className="relative z-10 h-full max-w-[1100px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col justify-end pb-20 lg:pb-28">
          <p className="font-dm text-[#6B8AC9] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
            {headline.category.toUpperCase()} · {headline.publishedDate.toUpperCase()}
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="font-syne text-white font-normal leading-[1.06] tracking-[-0.02em] text-[clamp(2rem,4.4vw,3.6rem)] max-w-[24ch]"
          >
            {headline.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease }}
            className="font-dm text-white/75 max-w-[58ch] mt-7 text-[clamp(1rem,1.3vw,1.18rem)] leading-[1.7] font-light"
          >
            {headline.subtitle}
          </motion.p>
          <p className="font-dm text-white/60 mt-7 text-[13.5px] tracking-[0.04em]">
            {FEATURED_ARTICLE.authorMeta}
          </p>
        </div>
      </section>

      {/* P13-S02 — Article Body */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[760px] mx-auto px-6 md:px-12 lg:px-20">
          <article>
            <p className="font-syne italic text-[#0B1426] text-[clamp(1.25rem,1.8vw,1.5rem)] leading-[1.5] mb-10">
              {FEATURED_ARTICLE.body.lead}
            </p>
            <figure className="my-10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80"
                alt="Editorial inline — water restoration site"
                className="w-full aspect-[3/4] object-cover bg-[#F5F5F7] rounded-2xl"
                loading="lazy"
              />
              <figcaption className="font-dm text-[#0B1426]/55 text-[12.5px] mt-3 italic">
                Field photography · audited site, Q1 2026.
              </figcaption>
            </figure>
            {FEATURED_ARTICLE.body.sections.map((s, i) => (
              <div key={i} className="mt-8">
                {s.heading && (
                  <h2 className="font-syne text-[#0B1426] text-[1.4rem] font-medium leading-[1.3] mb-5">
                    {s.heading}
                  </h2>
                )}
                {s.pullquote && (
                  <blockquote className="my-12 border-l-2 border-[#3B6FFF] pl-6 font-syne italic text-[#14275C] text-[clamp(1.4rem,2.2vw,1.9rem)] leading-[1.4]">
                    {s.pullquote}
                  </blockquote>
                )}
                {s.body && (
                  <p className="font-dm text-[#0B1426] text-[clamp(1rem,1.2vw,1.13rem)] leading-[1.85]">
                    {s.body}
                  </p>
                )}
              </div>
            ))}
          </article>

          {/* P13-S03 — Article Meta */}
          <div className="mt-14 pt-10 border-t border-[#0B1426]/10">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="flex items-start gap-4 max-w-[420px]">
                <div className="w-11 h-11 rounded-full bg-[#3B6FFF]/10 text-[#3B6FFF] flex items-center justify-center font-syne font-medium shrink-0">
                  SD
                </div>
                <div>
                  <p className="font-dm text-[#0B1426] text-[14px] font-medium">
                    {FEATURED_ARTICLE.authorName} · {FEATURED_ARTICLE.authorRole}
                  </p>
                  <p className="font-dm text-[#0B1426]/65 mt-1 text-[13px] leading-[1.6]">
                    {FEATURED_ARTICLE.authorBio}
                  </p>
                  <p className="font-dm text-[#0B1426]/55 mt-2 text-[12px]">
                    Published {FEATURED_ARTICLE.publishedDate} · Last updated{" "}
                    {FEATURED_ARTICLE.lastUpdated}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-dm text-[#0B1426]/55 text-[11px] font-medium tracking-[0.12em] uppercase mr-2">
                  Share this article
                </span>
                <a
                  href="https://www.linkedin.com/sharing/share-offsite/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="w-9 h-9 inline-flex items-center justify-center border border-[#0B1426]/15 hover:bg-[#3B6FFF] hover:border-[#3B6FFF] hover:text-white text-[#0B1426]/70 transition-colors"
                >
                  <Linkedin size={15} />
                </a>
                <a
                  href="https://twitter.com/intent/tweet"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X"
                  className="w-9 h-9 inline-flex items-center justify-center border border-[#0B1426]/15 hover:bg-[#3B6FFF] hover:border-[#3B6FFF] hover:text-white text-[#0B1426]/70 transition-colors"
                >
                  <Twitter size={15} />
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent(headline.title)}&body=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                  aria-label="Share via email"
                  className="w-9 h-9 inline-flex items-center justify-center border border-[#0B1426]/15 hover:bg-[#3B6FFF] hover:border-[#3B6FFF] hover:text-white text-[#0B1426]/70 transition-colors"
                >
                  <Mail size={15} />
                </a>
                <button
                  onClick={onCopy}
                  aria-label="Copy link"
                  className="w-9 h-9 inline-flex items-center justify-center border border-[#0B1426]/15 hover:bg-[#3B6FFF] hover:border-[#3B6FFF] hover:text-white text-[#0B1426]/70 transition-colors"
                >
                  <Copy size={15} />
                </button>
                <button
                  onClick={() =>
                    navigator.share?.({ title: headline.title, url: window.location.href })
                  }
                  aria-label="Share"
                  className="w-9 h-9 inline-flex items-center justify-center border border-[#0B1426]/15 hover:bg-[#3B6FFF] hover:border-[#3B6FFF] hover:text-white text-[#0B1426]/70 transition-colors"
                >
                  <Share2 size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* P13-S04 — More from Sustainability */}
      <section className="bg-[#F5F5F7] py-20 lg:py-28 border-y border-[#0B1426]/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-syne text-[#0B1426] font-normal text-[clamp(1.4rem,2.2vw,1.9rem)] leading-[1.2]">
              More from {headline.category}
            </h2>
            <Link
              to="/news"
              className="font-dm group inline-flex items-center gap-2 text-[#0B1426] hover:text-[#3B6FFF] transition-colors text-[13px] font-semibold"
            >
              All news
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0B1426]/10">
            {FEATURED_ARTICLE.related.map((r) => (
              <Link
                key={r.slug}
                to={`/news/${r.slug}`}
                className="bg-white group flex flex-col overflow-hidden"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <ImageWithFallback
                    src={r.img}
                    alt={r.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-7">
                  <p className="font-dm text-[#3B6FFF] text-[10px] font-medium tracking-[0.16em] uppercase">
                    {r.meta}
                  </p>
                  <h3 className="font-syne text-[#0B1426] mt-3 text-[18px] font-medium leading-[1.35] group-hover:text-[#3B6FFF] transition-colors line-clamp-3">
                    {r.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* P13-S05 — Article Closer */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-[820px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <h2 className="font-syne text-[#0B1426] font-normal text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.2]">
            Stay informed.
          </h2>
          <p className="font-dm text-[#0B1426]/65 mt-5 max-w-[58ch] mx-auto text-[1.05rem] leading-[1.7]">
            Quarterly updates from the Sustainability Desk delivered to your inbox. No marketing, no
            noise — only the numbers.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Link
              to="/contact?type=press"
              className="font-dm group inline-flex items-center gap-2 px-7 h-12 bg-[#3B6FFF] hover:bg-[#14275C] text-white rounded-sm text-[14px] font-semibold transition-colors duration-300"
            >
              Subscribe to updates
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/news"
              className="font-dm group inline-flex items-center gap-2 px-7 h-12 border border-[#0B1426]/30 text-[#0B1426] hover:border-[#3B6FFF] hover:text-[#3B6FFF] rounded-sm text-[14px] font-medium transition-all duration-300"
            >
              <ArrowLeft size={15} /> Back to Newsroom
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
