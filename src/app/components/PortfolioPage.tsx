import { Link } from "react-router";
import { ArrowRight, Award, ShieldCheck, Gem, Clock } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CTASection } from "./home/CTA";

const ease = [0.65, 0, 0.35, 1] as const;

const FUTURE_TERRITORIES = [
  {
    n: "01",
    name: "Bespoke Fine Jewellery",
    desc: "Made-to-order pieces for collectors who value intent over inventory.",
    target: "Q3 2026",
  },
  {
    n: "02",
    name: "Bridal & Commitment",
    desc: "A modern interpretation of the bridal occasion — built around heritage and ceremony.",
    target: "TBA",
  },
  {
    n: "03",
    name: "Everyday Luxury",
    desc: "Wearable fine jewellery: pieces that hold value through daily use.",
    target: "TBA",
  },
  {
    n: "04",
    name: "High Jewellery Editions",
    desc: "Limited editions for couture moments — released in counted runs, never restocked.",
    target: "TBA",
  },
];

/**
 * Page 3 — Portfolio (/portfolio)
 *
 *  S01 Hero (typographic)
 *  S02 Brand Matrix
 *  S03 Featured Brand · Mayavé spotlight
 *  S04 Future Territories
 *  S05 Closing CTA
 */
export function PortfolioPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const heroOp = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const brandRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: brandScrollY } = useScroll({ target: brandRef, offset: ["start end", "end start"] });
  const mayaveImgY = useTransform(brandScrollY, [0, 1], ["-8%", "8%"]);
  const mayaveImgScale = useTransform(brandScrollY, [0, 1], [1.06, 1]);

  return (
    <div className="bg-white text-[#0B1426]">
      {/* P03-S01 — Full-screen Hero */}
      <section
        ref={heroRef}
        data-header-theme="dark"
        className="relative h-screen min-h-[600px] flex items-end overflow-hidden bg-[#0B1426]"
      >
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <ImageWithFallback
            src="/assets/images/P03_S01_portfolio_hero_optB_image.png"
            alt="Portfolio hero — brand expressions"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426] via-[#0B1426]/30 to-[#0B1426]/40" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOp }}
          className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-20 lg:pb-32 w-full"
        >
          <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
            Portfolio
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.3 }}
            className="font-syne text-white font-normal leading-[1.05] tracking-[-0.02em] text-[clamp(2.4rem,5.5vw,5rem)] max-w-[20ch]"
          >
            A House of Distinct Brand Expressions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.6 }}
            className="font-dm text-white/75 max-w-[58ch] mt-7 text-[clamp(1rem,1.4vw,1.18rem)] leading-[1.7] font-light"
          >
            Each brand is designed to serve a specific audience and emotional territory while
            benefiting from a shared standard of quality and trust.
          </motion.p>
        </motion.div>
      </section>

      {/* P03-S02 — Brand Matrix · feature card on top */}
      <section ref={brandRef} className="bg-white pt-24 lg:pt-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            data-header-theme="dark"
            className="relative h-[70vh] min-h-[480px] overflow-hidden bg-[#0B1426] rounded-2xl"
          >
            <motion.div style={{ y: mayaveImgY, scale: mayaveImgScale }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
              <ImageWithFallback
                src="/assets/mayave/mayave_banner.png"
                alt="Mayavé feature"
                className="w-full h-full object-cover opacity-90"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426] via-[#0B1426]/40 to-transparent" />

            <div className="relative z-10 h-full flex flex-col justify-end p-8 lg:p-14 max-w-[640px]">
              <p className="font-dm text-white/75 text-[11px] font-medium tracking-[0.22em] uppercase mb-4">
                The House
              </p>
              <h2 className="font-syne text-white font-normal italic text-[clamp(2.4rem,5vw,4.4rem)] leading-[1] tracking-[-0.02em]">
                Mayavé
              </h2>
              <p className="font-dm text-white/80 mt-5 text-[clamp(1rem,1.3vw,1.13rem)] leading-[1.7] font-light max-w-[40ch]">
                Where silence becomes jewellery — bespoke fine jewellery built for collectors who
                value rarity, intimacy, and refined beauty.
              </p>
              <div className="mt-7">
                <Link
                  to="/portfolio/mayave"
                  className="font-dm group inline-flex items-center gap-2 px-7 h-12 bg-[#3B6FFF] hover:bg-[#14275C] text-white rounded-sm text-[14px] font-semibold transition-colors duration-300"
                >
                  Discover Mayavé
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Future territories sub-band */}
        <div id="future-territories" className="bg-[#F5F5F7] mt-20 py-20 border-y border-[#0B1426]/10">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
            >
              <div>
                <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-4">
                  Future Territories
                </p>
                <h2 className="font-syne text-[#0B1426] font-normal text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.2]">
                  Architected for what comes next.
                </h2>
              </div>
              <p className="font-dm text-[#0B1426]/55 text-[14px] max-w-[40ch] flex items-center gap-2">
                <Clock size={14} className="shrink-0 text-[#6B8AC9]" /> In development · sequenced behind disciplined gates
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#0B1426]/10">
              {FUTURE_TERRITORIES.map((t, i) => (
                <motion.div
                  key={t.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease }}
                  className="bg-[#F5F5F7] p-8 hover:bg-white transition-colors duration-300 group relative"
                >
                  <span className="absolute top-4 right-4 font-dm text-[#0B1426]/45 text-[10px] font-medium tracking-[0.16em] uppercase">
                    {t.target}
                  </span>
                  <p className="font-syne italic text-[#3B6FFF] text-[2.4rem] font-light leading-none">
                    {t.n}
                  </p>
                  <h3 className="font-syne text-[#0B1426] mt-5 text-[18px] font-medium leading-[1.3]">
                    {t.name}
                  </h3>
                  <p className="font-dm text-[#0B1426]/65 mt-3 text-[14px] leading-[1.65]">{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* P03-S03 — Featured Mayavé spotlight */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
          >
            <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
              The House
            </p>
            <h2 className="font-syne text-[#0B1426] font-normal text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] tracking-[-0.02em]">
              Where Silence Becomes Jewellery
            </h2>
            <p className="font-dm text-[#0B1426]/70 mt-6 text-[clamp(1rem,1.3vw,1.13rem)] leading-[1.75] font-light">
              Mayavé represents a more intimate expression of luxury, built around refinement,
              emotion, and the beauty of restraint.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-6">
              {[
                { icon: Award, label: "Heritage", note: "Surat-rooted" },
                { icon: ShieldCheck, label: "Ethics", note: "Verified provenance" },
                { icon: Gem, label: "Bespoke", note: "Made for collectors" },
              ].map((p) => (
                <div key={p.label}>
                  <p.icon size={22} strokeWidth={1.5} className="text-[#3B6FFF]" />
                  <p className="font-dm text-[#0B1426] text-[12px] font-medium tracking-[0.14em] uppercase mt-3">
                    {p.label}
                  </p>
                  <p className="font-dm text-[#0B1426]/55 text-[13px] mt-1">{p.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/portfolio/mayave"
                className="font-dm group inline-flex items-center gap-2 px-7 h-12 bg-[#3B6FFF] hover:bg-[#14275C] text-white rounded-sm text-[14px] font-semibold transition-colors duration-300"
              >
                Explore Mayavé
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/contact?type=appointment"
                className="font-dm inline-flex items-center gap-2 px-7 h-12 border border-[#0B1426]/30 text-[#0B1426] hover:border-[#3B6FFF] hover:text-[#3B6FFF] rounded-sm text-[14px] font-medium transition-all duration-300"
              >
                Book a viewing
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease }}
            className="aspect-[4/5] overflow-hidden bg-[#F5F5F7] rounded-2xl"
          >
            <ImageWithFallback
              src="/assets/images/P01_S05_home_portfolio_preview_optB_image.png"
              alt="Mayavé signature piece"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* P03-S05 — Closing CTA */}
      <CTASection
        eyebrow="Portfolio"
        heading="Interested in partnerships or future brand development?"
        body="We build with patience. If your ambition aligns with the long-term stewardship of luxury jewellery houses, we would welcome the conversation."
        primary={{ label: "Start a conversation", to: "/contact?type=partnership" }}
        secondary={{ label: "Meet The Group", to: "/the-group" }}
      />
    </div>
  );
}
