import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Linkedin,
  Twitter,
  Mail,
  Copy,
  Share2,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BLOG_ARCHIVE } from "./BlogPage";

const ease = [0.65, 0, 0.35, 1] as const;

/** Per build spec §P19 — exact essay body for the canonical Hemant Patel post. */
const ESSAY_BODY = {
  lead:
    "There is a moment, at hour six of polishing a setting, when the surface looks finished. The light reads cleanly off every facet. The reflections are uniform. By every visible measure, the piece is done. We keep going for three more hours.",
  sections: [
    {
      heading: "What the last three hours change",
      body:
        "What we are pursuing in those final hours is not visibility. It is depth. The difference between a polished surface and a complete surface lives below the eye's first reading — in the way the metal catches secondary light, in how it ages over the next decade, in whether the wearer will still recognise it as itself in twenty years.",
    },
    {
      pullquote: "There is finished, and there is complete. We do not confuse the two.",
    },
    {
      body:
        "This is not a romantic argument. It is operational. When we audited our atelier output against pieces returned for refinement after five and ten years, the difference between six-hour and nine-hour polished pieces was not subtle. The shorter-polished pieces had measurably more surface degradation.",
    },
    {
      heading: "Why the discipline matters now",
      body:
        "The industry is shifting toward speed. Lab-grown diamonds, accelerated production, on-demand bespoke. Some of this we welcome. But where it pushes against the time required to do work that ages well, we resist it — quietly, and at our own cost. The wearer does not see the extra three hours. The piece, twenty years later, does.",
    },
  ],
  authorBio:
    "Hemant has worked in finishing and polishing for 28 years. He leads the atelier's quality benchmark programme and writes occasionally for the journal.",
};

export function BlogPostPage() {
  const { slug } = useParams();
  const post = BLOG_ARCHIVE.find((p) => p.slug === slug) ?? BLOG_ARCHIVE[0];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  const related = BLOG_ARCHIVE.filter((p) => p.slug !== post.slug).slice(0, 3);

  const onCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
    }
  };

  return (
    <div className="bg-white text-[#0B1426]">
      {/* P19-S01 — Hero (uses author portrait per spec) */}
      <section
        ref={ref}
        data-header-theme="dark"
        className="relative h-[80vh] min-h-[560px] overflow-hidden bg-[#0B1426]"
      >
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <ImageWithFallback
            src="/assets/web/P19_S01_single_blog_post_blog_article_hero_optA_image.webp"
            alt={post.title}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426] via-[#0B1426]/40 to-[#0B1426]/30" />
        </motion.div>

        <div className="absolute top-28 left-6 lg:left-12 flex items-center gap-2 text-[12px] z-10">
          <Link to="/blog" className="font-dm text-white/55 hover:text-white transition-colors">
            Journal
          </Link>
          <ChevronRight size={12} className="text-white/45" />
          <span className="font-dm text-white/85">{post.cat}</span>
        </div>

        <div className="relative z-10 h-full max-w-[900px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col justify-end pb-20 lg:pb-28">
          <p className="font-dm text-[#6B8AC9] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
            {post.cat.toUpperCase()} · {post.date.toUpperCase()}
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="font-syne text-white font-normal italic leading-[1.06] tracking-[-0.02em] text-[clamp(2rem,4.4vw,3.6rem)] max-w-[24ch]"
          >
            {post.title}
          </motion.h1>
          <p className="font-dm text-white/75 max-w-[58ch] mt-6 text-[clamp(1rem,1.3vw,1.18rem)] leading-[1.7] font-light">
            {post.excerpt}
          </p>
          <p className="font-dm text-white/60 mt-7 text-[13.5px] tracking-[0.04em]">
            By {post.author}
            {post.authorRole ? ` · ${post.authorRole}` : ""} · {post.read} read
          </p>
        </div>
      </section>

      {/* P19-S02 — Body with drop-cap */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[700px] mx-auto px-6 md:px-12 lg:px-20">
          <article>
            <p className="font-dm text-[#0B1426] text-[clamp(1.05rem,1.3vw,1.18rem)] leading-[1.85]">
              <span className="font-syne italic float-left text-[#3B6FFF] text-[5.5rem] leading-[0.85] mr-3 mt-2">
                {ESSAY_BODY.lead.charAt(0)}
              </span>
              {ESSAY_BODY.lead.slice(1)}
            </p>

            <figure className="my-12">
              <ImageWithFallback
                src="/assets/images/P19_S02_single_blog_post_article_body_optA_image.png"
                alt="Atelier macro · polishing detail"
                className="w-full aspect-[3/4] object-cover bg-[#F5F5F7] rounded-2xl"
              />
              <figcaption className="font-dm text-[#0B1426]/55 text-[12.5px] mt-3 italic">
                Hand-finishing at hour seven · Surat atelier.
              </figcaption>
            </figure>

            {ESSAY_BODY.sections.map((s, i) => (
              <div key={i} className="mt-10">
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
                  <p className="font-dm text-[#0B1426] text-[clamp(1.05rem,1.3vw,1.18rem)] leading-[1.85]">
                    {s.body}
                  </p>
                )}
              </div>
            ))}
          </article>

          {/* P19-S03 — Author block + share */}
          <div className="mt-16 pt-10 border-t border-[#0B1426]/10">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="flex items-start gap-4 max-w-[420px]">
                <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 bg-[#F5F5F7]">
                  <ImageWithFallback
                    src="/assets/web/P19_S03_single_blog_post_author_share_optA_image.jpg"
                    alt={post.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-dm text-[#0B1426] text-[14px] font-medium">{post.author}</p>
                  {post.authorRole && (
                    <p className="font-dm text-[#0B1426]/55 text-[12px] mt-0.5 tracking-[0.04em] uppercase">
                      {post.authorRole} · Dholakia Retail Atelier
                    </p>
                  )}
                  <p className="font-dm text-[#0B1426]/65 mt-3 text-[13px] leading-[1.65]">
                    {ESSAY_BODY.authorBio}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-dm text-[#0B1426]/55 text-[11px] font-medium tracking-[0.12em] uppercase mr-2">
                  Share this essay
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
                  href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
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
                    navigator.share?.({ title: post.title, url: window.location.href })
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

      {/* P19-S04 — Related */}
      <section className="bg-[#F5F5F7] py-20 border-y border-[#0B1426]/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-syne text-[#0B1426] font-normal text-[clamp(1.4rem,2.2vw,1.9rem)] leading-[1.2]">
              More from {post.cat}
            </h2>
            <Link
              to="/blog"
              className="font-dm group inline-flex items-center gap-2 text-[#0B1426] hover:text-[#3B6FFF] transition-colors text-[13px] font-semibold"
            >
              All essays
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0B1426]/10">
            {related.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="bg-white group flex flex-col rounded-2xl overflow-hidden"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <ImageWithFallback
                    src="/assets/images/P19_S04_single_blog_post_related_posts_optA_image.png"
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-7">
                  <p className="font-dm text-[#3B6FFF] text-[10px] font-medium tracking-[0.16em] uppercase">
                    {p.cat} · {p.read} · {p.date}
                  </p>
                  <h3 className="font-syne text-[#0B1426] mt-3 text-[18px] font-medium leading-[1.35] group-hover:text-[#3B6FFF] transition-colors">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* P19-S05 — Closer */}
      <section className="bg-white py-28 lg:py-36">
        <div className="max-w-[820px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <h2 className="font-syne text-[#0B1426] font-normal text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.2]">
            One essay every month.
          </h2>
          <p className="font-dm text-[#0B1426]/65 mt-5 max-w-[58ch] mx-auto text-[1.05rem] leading-[1.7]">
            Slow writing from the Dholakia Retail editorial team — delivered to your inbox once a
            month. Nothing else.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-9">
            <Link
              to="/contact?type=press"
              className="font-dm group inline-flex items-center gap-2 px-7 h-12 bg-[#3B6FFF] hover:bg-[#14275C] text-white rounded-sm text-[14px] font-semibold transition-colors duration-300"
            >
              Subscribe to the journal
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/blog"
              className="font-dm group inline-flex items-center gap-2 px-7 h-12 border border-[#0B1426]/30 text-[#0B1426] hover:border-[#3B6FFF] hover:text-[#3B6FFF] rounded-sm text-[14px] font-medium transition-all duration-300"
            >
              <ArrowLeft size={15} /> Back to all essays
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
