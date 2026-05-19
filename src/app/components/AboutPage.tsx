"use client";

import { Link } from "react-router";
import { ArrowRight, Building2, Hash, MapPin, Calendar, CircleDot } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { COMPANY } from "./constants";

const ease = [0.65, 0, 0.35, 1] as const;
const EASE_STANDARD = [0.25, 0.1, 0.25, 1] as const;

type Milestone = { yearLabel: string; yearCount?: number; title: string; body: string };

const MILESTONES: Milestone[] = [
  {
    yearLabel: "2024",
    yearCount: 2024,
    title: "Dholakia Retail is incorporated.",
    body:
      "Dholakia Retail Private Limited is incorporated in 2024, establishing the corporate vehicle through which a new generation of Indian luxury jewellery brands will be conceived, capitalised, and stewarded. The company is structured from inception with institutional governance, long-horizon ownership, and the operating discipline required to build a multi-house portfolio with patience and precision.",
  },
  {
    yearLabel: "Foundation",
    title: "Corporate identity and registered office established in Surat.",
    body:
      "Corporate identity, governance frameworks, and the registered office at the Gem & Jewellery Park, Ichhapore are formally established — placing the platform inside Surat's centre of cutting, polishing, and craft expertise. Reporting structures, financial controls, and brand-stewardship protocols are codified to support a portfolio designed to operate across multiple price points, design territories, and audiences.",
  },
  {
    yearLabel: "Next chapter",
    title: "Portfolio expansion and retail brand development.",
    body:
      "The platform begins building out its first house — Mayavé — and architects future territories spanning bespoke fine jewellery, bridal, everyday luxury, and high-jewellery editions. Each future house is designed to serve a specific audience and emotional register while drawing on a shared standard of provenance, governance, and craft. The roadmap is deliberately patient: brands launch only when their foundations meet the standard.",
  },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function CountUp({ to, durationMs = 1000 }: { to: number; durationMs?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / durationMs, 1);
              setValue(Math.floor(to * progress));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to, durationMs]);

  return <span ref={ref}>{value}</span>;
}

const ABOUT_HERO_IMG = "/assets/images/P02_S05_the_group_timeline_optA_image.png";
const TIMELINE_IMG = "/assets/images/P02_S05_the_group_timeline_optA_image.png";

const LEADERS = [
  {
    name: "Mr. Hasmukh Himmatbhai Dholakia",
    role: "Founder, Dholakia Lab Grown Diamond",
    bio: "Founding figure of the Group's manufacturing institution in Surat. Brings multigenerational continuity and the family-stewardship culture that defines the Group's craftsmanship discipline.",
    img: "/assets/images/Hasu_Dholakia.png",
  },
  {
    name: "Mr. Rajesh Himmatbhai Dholakia",
    role: "Director, Dholakia Retail Private Limited",
    bio: "Appointed at incorporation in October 2024. Stewards operations, governance, and partner-network growth across the retail entity.",
    meta: "DIN · 02173366 · Appointed 11 Oct 2024",
    img: "/assets/images/Rajesh_Dholakia.png",
  },
  {
    name: "Mr. Dravya Savjibhai Dholakia",
    role: "Director, Dholakia Retail Private Limited",
    bio: "Appointed at incorporation in October 2024. Stewards brand strategy and the Mayavé portfolio house. Second-generation Dholakia.",
    meta: "DIN · 08897843 · Appointed 11 Oct 2024",
    img: "/assets/images/Dravya_Dholakia.png",
  }

];

const IDENTITY = [
  { icon: Building2, label: "Company Name", value: COMPANY.legalName },
  { icon: Hash, label: "CIN", value: COMPANY.cin, mono: true },
  { icon: Hash, label: "ROC", value: COMPANY.roc },
  { icon: MapPin, label: "Registered Office", value: COMPANY.registeredOffice },
  { icon: Calendar, label: "Established", value: COMPANY.established },
];

/**
 * Page 2 — The Group (/the-group)
 *
 *  S01 About Hero
 *  S02 Corporate Identity (data table)
 *  S03 Leadership grid
 *  S04 Philosophy pull-quote
 *  S05 Timeline
 */
export function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const timelineSectionRef = useRef<HTMLElement>(null);
  const railFillRef = useRef<SVGLineElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const heroOp = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  /**
   * Timeline rail progress.
   *
   * Replaces gsap.ScrollTrigger (209 KB) with motion/react's useScroll —
   * already in the bundle, ~0 extra bytes. Maps section-scroll progress
   * (0→1 between "top 70%" and "bottom 30%") onto the SVG dash-offset.
   */
  const { scrollYProgress: railProgress } = useScroll({
    target: timelineSectionRef,
    offset: ["start 70%", "end 30%"],
  });

  useEffect(() => {
    if (reduced && railFillRef.current) {
      railFillRef.current.setAttribute("stroke-dashoffset", "0");
    }
  }, [reduced]);

  useMotionValueEvent(railProgress, "change", (p) => {
    if (reduced || !railFillRef.current) return;
    railFillRef.current.setAttribute("stroke-dashoffset", String(1 - p));
  });

  return (
    <div className="bg-white text-[#0B1426]">
      {/* P02-S01 — About Hero */}
      <section
        ref={heroRef}
        data-header-theme="dark"
        className="relative h-screen min-h-[600px] flex items-end overflow-hidden bg-[#0B1426]"
      >
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <ImageWithFallback
            src={ABOUT_HERO_IMG}
            alt="Founder portrait — black-and-white editorial"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426] via-[#0B1426]/30 to-[#0B1426]/40" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOp }}
          className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-20 lg:pb-32 w-full"
        >
          <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
            The Group
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.3 }}
            className="font-syne text-white font-normal leading-[1.05] tracking-[-0.02em] text-[clamp(2.4rem,5.5vw,5rem)] max-w-[20ch]"
          >
            A New Corporate Chapter
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.6 }}
            className="font-dm text-white/75 max-w-[58ch] mt-7 text-[clamp(1rem,1.4vw,1.18rem)] leading-[1.7] font-light"
          >
            Established in 2024, Dholakia Retail was created to build, guide, and grow luxury jewellery
            brands with governance, precision, and long-term vision.
          </motion.p>
        </motion.div>
      </section>

      {/* P02-S02 — Corporate Identity */}
      <section className="bg-[#F5F5F7] py-24 lg:py-32 border-y border-[#0B1426]/10">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-12"
          >
            Corporate Identity
          </motion.p>

          <dl className="border-t border-[#0B1426]/10">
            {IDENTITY.map((row, i) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease }}
                className="group flex items-start gap-6 py-6 border-b border-[#0B1426]/10 hover:bg-white/50 transition-colors"
              >
                <div className="hidden md:flex items-center justify-center w-9 h-9 text-[#3B6FFF] shrink-0">
                  <row.icon size={18} strokeWidth={1.5} />
                </div>
                <dt className="font-dm text-[#0B1426]/55 text-[11px] font-medium tracking-[0.16em] uppercase w-full md:w-[200px] shrink-0 pt-1">
                  {row.label}
                </dt>
                <dd
                  className={
                    row.mono
                      ? "font-mono text-[#0B1426] text-[15px] flex-1"
                      : "font-syne text-[#0B1426] italic text-[clamp(1rem,1.4vw,1.2rem)] flex-1"
                  }
                >
                  {row.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>

      {/* P02-S03 — Leadership */}
      <section id="leadership" className="bg-white py-32 lg:py-40">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
            className="mb-14 max-w-[820px]"
          >
            <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
              Leadership
            </p>
            <h2 className="font-syne text-[#0B1426] font-normal leading-[1.1] tracking-[-0.02em] text-[clamp(1.9rem,3.4vw,3.2rem)]">
              Guided by long-term thinking.
            </h2>
            <p className="font-dm text-[#0B1426]/65 mt-5 max-w-[60ch] text-[clamp(1rem,1.3vw,1.1rem)] leading-[1.7] font-light">
              Decisions made with patience and precision — names and roles populated from public records
              or client-approved internal information only.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {LEADERS.map((p, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease }}
                className="bg-white group rounded-2xl overflow-hidden flex flex-col shadow-[0_1px_2px_rgba(11,20,38,0.04),0_8px_24px_rgba(11,20,38,0.06)] hover:shadow-[0_2px_4px_rgba(11,20,38,0.06),0_16px_40px_rgba(11,20,38,0.10)] transition-shadow duration-500"
              >
                <div className="aspect-[4/5] overflow-hidden bg-[#0B1426]">
                  <ImageWithFallback
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-syne text-[#0B1426] text-[clamp(1.25rem,1.55vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.01em]">
                    {p.name}
                  </h3>
                  <p className="font-dm text-[#3B6FFF] text-[12px] font-semibold tracking-[0.18em] uppercase mt-4">
                    {p.role}
                  </p>
                  <p className="font-dm text-[#0B1426]/75 text-[15px] leading-[1.7] mt-5 flex-1 font-light">
                    {p.bio}
                  </p>
                  {p.meta && (
                    <p className="font-mono text-[#3B6FFF] text-[12px] tracking-[0.04em] mt-7">
                      {p.meta}
                    </p>
                  )}
                </div>
              </motion.article>
            ))}
          </div>

          <div id="governance" className="mt-14 flex flex-wrap gap-x-10 gap-y-4 text-[14px]">
            {[
              ["Governance Framework", "/legal/disclaimer"],
              ["Code of Conduct", "/legal/terms"],
              ["Ethical Sourcing Charter", "/legal/terms"],
            ].map(([label, path]) => (
              <Link
                key={label}
                to={path}
                className="font-dm text-[#0B1426]/70 hover:text-[#3B6FFF] underline-offset-4 hover:underline transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* P02-S04 — Philosophy */}
      <section className="bg-[#F5F5F7] py-32 lg:py-44 border-y border-[#0B1426]/10">
        <div className="max-w-[820px] mx-auto px-6 md:px-12 lg:px-20 text-center relative">
          <span
            aria-hidden
            className="font-syne italic text-[#3B6FFF]/8 absolute -top-12 left-1/2 -translate-x-1/2 text-[14rem] leading-none select-none pointer-events-none"
          >
            "
          </span>
          <motion.blockquote
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease }}
            className="relative font-syne text-[#0B1426] font-normal italic leading-[1.18] tracking-[-0.01em] text-[clamp(1.6rem,3vw,2.6rem)]"
          >
            The parent company exists to give every brand more room to become itself.
          </motion.blockquote>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
            className="font-dm text-[#0B1426]/65 max-w-[58ch] mx-auto mt-9 text-[1.05rem] leading-[1.7] font-light"
          >
            Its purpose is to provide clarity, direction, and discipline without diminishing the
            individuality of the brands it supports.
          </motion.p>
        </div>
      </section>

      {/* P02-S05 — Timeline */}
      <section ref={timelineSectionRef} className="bg-white" style={{ paddingTop: "120px", paddingBottom: "120px" }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className=" mb-16 md:mb-24 flex justify-center">
            <div className="max-w-2xl text-center">
              <motion.p
                className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                Timeline
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: EASE_STANDARD }}
                style={{
                  fontSize: "clamp(1.875rem, 3.4vw, 3rem)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.015em",
                }}
                className="font-syne text-[#0B1426] font-normal"
              >
                From incorporation to future portfolio growth
              </motion.h2>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease }}
            className="aspect-[3/4] sm:aspect-[16/9] overflow-hidden bg-[#F5F5F7] mb-16 max-w-[680px] mx-auto rounded-2xl"
          >
            <ImageWithFallback
              src={TIMELINE_IMG}
              alt="Heritage timeline marker"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="relative">
            {/* Rail — SVG <line> with stroke-dashoffset scrubbed via ScrollTrigger */}
            <svg
              aria-hidden
              className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0"
              width="1"
              height="100%"
              preserveAspectRatio="none"
              viewBox="0 0 1 100"
              style={{ overflow: "visible" }}
            >
              <line
                x1="0.5"
                y1="0"
                x2="0.5"
                y2="100"
                stroke="rgba(107, 138, 201, 0.30)"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
              <line
                ref={railFillRef}
                x1="0.5"
                y1="0"
                x2="0.5"
                y2="100"
                stroke="#3B6FFF"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1}
                style={{ willChange: "stroke-dashoffset" }}
              />
            </svg>

            <ol className="relative space-y-12 md:space-y-16">
              {MILESTONES.map((m, i) => {
                const isRight = i % 2 === 1;
                return (
                  <motion.li
                    key={m.title}
                    className="relative"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: EASE_STANDARD }}
                  >
                    {/* Node — Lucide circle-dot, 12px Electric Blue, with glow pulse */}
                    <motion.span
                      aria-hidden
                      className="absolute left-6 md:left-1/2 -translate-x-1/2 -translate-y-1 inline-flex items-center justify-center z-10"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    >
                      <motion.span
                        className="absolute w-6 h-6 rounded-full bg-[#3B6FFF]"
                        initial={{ scale: 0.6, opacity: 0.4 }}
                        whileInView={{ scale: 2.2, opacity: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 2, ease: "easeOut", delay: 0.4 }}
                      />
                      <span className="relative inline-flex items-center justify-center bg-white rounded-full">
                        <CircleDot
                          size={12}
                          strokeWidth={2.5}
                          className="text-[#3B6FFF]"
                        />
                      </span>
                    </motion.span>

                    <div
                      className={[
                        "ml-16 md:ml-0 md:w-[46%]",
                        isRight ? "md:ml-auto md:pl-14" : "md:mr-auto md:pr-14",
                      ].join(" ")}
                    >
                      <div>
                        <p
                          className="font-syne italic text-[#3B6FFF] mb-3"
                          style={{ fontSize: "1.5rem", lineHeight: 1 }}
                        >
                          {m.yearCount ? <CountUp to={m.yearCount} durationMs={1000} /> : m.yearLabel}
                        </p>
                        <h3
                          className="font-syne text-[#0B1426] mb-4"
                          style={{ fontSize: "1.5rem", lineHeight: 1.25, fontWeight: 500 }}
                        >
                          {m.title}
                        </h3>
                        <p className="font-dm text-[#0B1426]/65 leading-relaxed text-[15px]">
                          {m.body}
                        </p>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-20">
            <Link
              to="/portfolio"
              className="font-dm group inline-flex items-center gap-2 px-7 h-12 bg-[#3B6FFF] hover:bg-[#14275C] text-white rounded-sm text-[14px] font-semibold transition-colors duration-300"
            >
              Explore the Portfolio
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/contact"
              className="font-dm inline-flex items-center gap-2 px-7 h-12 border border-[#0B1426]/30 text-[#0B1426] hover:border-[#3B6FFF] hover:text-[#3B6FFF] rounded-sm text-[14px] font-medium transition-all duration-300"
            >
              Contact the House
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
