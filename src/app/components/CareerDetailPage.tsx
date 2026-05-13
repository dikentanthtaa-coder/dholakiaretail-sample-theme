import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Share2,
  ChevronRight,
} from "lucide-react";
import { motion } from "motion/react";
import { ROLES } from "./CareersPage";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const ease = [0.65, 0, 0.35, 1] as const;

/**
 * Per build spec §P11 — exact copy for the Senior Jewellery Designer · Mayavé role.
 * Other roles fall back to a sensible auto-built body until their detail copy is published.
 */
const ROLE_DETAILS: Record<
  string,
  {
    bodyLead: string;
    responsibilities: string[];
    requirements: string[];
    successIn12Months: string;
    teamDescription: string;
    managerName: string;
    managerTitle: string;
    managerBio: string;
    teamValues: string[];
    compensationSummary: string;
    benefits: string[];
    applicationInstructions: string;
    helperText: string;
  }
> = {
  "senior-jewellery-designer": {
    bodyLead:
      "Mayavé is the foundation brand of Dholakia Retail — a maison rooted in heritage Indian craft, modernised through clear design discipline. As Senior Jewellery Designer, you will own the creative direction of two major collections per year, working in close collaboration with our master atelier.",
    responsibilities: [
      "Lead concept-through-handoff design for two seasonal collections (~80 pieces per year)",
      "Partner with the master atelier on technical feasibility, stone selection, and production planning",
      "Maintain Mayavé's design philosophy: rarity, restraint, and a refusal of trend-led work",
      "Mentor two junior designers; review their work weekly",
      "Represent the design team in cross-functional reviews with brand, retail, and corporate",
    ],
    requirements: [
      "8+ years of jewellery or accessories design experience, including 3+ years leading collections",
      "Demonstrable understanding of stone setting, gem properties, and traditional Indian craft",
      "A portfolio that shows discipline — restraint as much as creativity",
      "Comfort with both hand-drawn ideation and CAD (Rhino or equivalent)",
      "Willingness to spend time at the bench in Surat — design here is not done from a desk alone",
    ],
    successIn12Months:
      "Mayavé's 2026 bridal and 2027 heritage collections shipped on time, with internal-review scores in the top quartile for design quality. Two junior designers retained and growing. The Surat atelier reports the design-to-production handoff has materially improved.",
    teamDescription:
      "You'll join a team of seven designers reporting into the Director of Design, working in close partnership with the master atelier (twelve craftspeople) and the Mayavé brand team (four).",
    managerName: "Rohan Mehta",
    managerTitle: "Director of Design, Mayavé",
    managerBio:
      "Rohan joined Dholakia Retail in 2024 from Tata CLiQ Luxury, where he led private-label jewellery design. He is a graduate of NID Ahmedabad and a former apprentice at the Surat atelier.",
    teamValues: [
      "Craft as discipline",
      "Mentorship as standard",
      "Restraint over expression",
    ],
    compensationSummary:
      "Compensation is benchmarked at the 75th percentile for Senior Jewellery Designer roles in luxury houses across India, with a long-term retention component vesting over four years.",
    benefits: [
      "Health insurance for self, spouse, and children (full coverage)",
      "Annual development budget — international travel for atelier visits, exhibitions, and design weeks",
      "Sabbatical eligibility from year 5",
      "Quarterly atelier days with master craftspeople — protected time off the production calendar",
    ],
    applicationInstructions:
      "Send a portfolio (PDF or website), a 200-word note on a Mayavé piece you would have designed differently, and current salary and notice period. Every application is read by the Director of Design.",
    helperText:
      "Applications close 30 April 2026. Shortlisting begins 15 April. Two interview rounds plus a portfolio review.",
  },
};

const DEFAULT_DETAIL = {
  bodyLead:
    "We're looking for senior creatives whose taste sits at the centre of their craft. Treat the work as a discipline, not a vocation — and you'll find a team that takes the same view.",
  responsibilities: [
    "Lead the work end-to-end with judgement, not procedure",
    "Partner closely with the atelier and adjacent functions",
    "Set bench-level standards for proportion, finish, and material discipline",
    "Mentor the next layer of the team",
    "Represent the team in cross-functional reviews",
  ],
  requirements: [
    "Senior-level experience in luxury or adjacent industries",
    "A portfolio that shows restraint, not just creativity",
    "Comfort working alongside master craftspeople, not above them",
    "Clear written and spoken communication",
  ],
  successIn12Months:
    "The function is operating at a higher standard than when you joined — measured against published benchmarks, not adjectives.",
  teamDescription:
    "You'll join a small team that takes its work seriously, reporting to a hands-on functional lead.",
  managerName: "To be confirmed at offer stage",
  managerTitle: "Functional lead",
  managerBio: "Manager bio will be shared during the interview process.",
  teamValues: [
    "Craft as discipline",
    "Mentorship as standard",
    "Restraint over expression",
  ],
  compensationSummary:
    "Compensation is benchmarked at the 75th percentile for the role in luxury houses across India, with a long-term retention component vesting over four years.",
  benefits: [
    "Health insurance for self, spouse, and children (full coverage)",
    "Annual development budget for craft and category research",
    "Sabbatical eligibility from year 5",
    "Quarterly atelier days with master craftspeople",
  ],
  applicationInstructions:
    "Send a portfolio (PDF or website), a 200-word note on the work you'd want to do here, and current salary and notice period. Every application is read by the hiring manager.",
  helperText: "Two interview rounds plus a portfolio or work-sample review.",
};

/**
 * Page 11 — Single Career (/careers/[slug])
 */
export function CareerDetailPage() {
  const { slug } = useParams();
  const role = ROLES.find((r) => r.slug === slug) ?? ROLES[0];
  const detail = ROLE_DETAILS[role.slug] ?? DEFAULT_DETAIL;

  return (
    <div className="bg-white text-[#0B1426]">
      {/* P11-S01 — Role Hero */}
      <section className="bg-[#F5F5F7] pt-40 lg:pt-52 pb-20 lg:pb-28 border-b border-[#0B1426]/10">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center gap-2 text-[12px] mb-8">
            <Link to="/" className="font-dm text-[#0B1426]/55 hover:text-[#3B6FFF] transition-colors">
              Home
            </Link>
            <ChevronRight size={12} className="text-[#0B1426]/45" />
            <Link to="/careers" className="font-dm text-[#0B1426]/55 hover:text-[#3B6FFF] transition-colors">
              Careers
            </Link>
            <ChevronRight size={12} className="text-[#0B1426]/45" />
            <span className="font-dm text-[#0B1426]/85">{role.function}</span>
          </div>

          <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
            {role.function} · {role.location} · {role.type}
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="font-syne text-[#0B1426] font-normal leading-[1.05] tracking-[-0.02em] text-[clamp(2rem,4.4vw,3.6rem)] max-w-[24ch]"
          >
            {role.title}
          </motion.h1>
          <p className="font-dm text-[#0B1426]/65 max-w-[58ch] mt-7 text-[clamp(1rem,1.3vw,1.18rem)] leading-[1.7] font-light">
            {role.summary}
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-7 text-[#0B1426]/55 text-[13px] font-dm">
            <span>{role.posted}</span>
            <span>{role.closing}</span>
          </div>

          <div className="flex flex-wrap gap-3 mt-10">
            <a
              href={`mailto:careers@dholakiaretail.com?subject=Application: ${encodeURIComponent(role.title)}`}
              className="font-dm group inline-flex items-center gap-2 px-7 h-12 bg-[#3B6FFF] hover:bg-[#14275C] text-white rounded-sm text-[14px] font-semibold transition-colors duration-300"
            >
              Apply for this role
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={() =>
                navigator.share?.({ title: role.title, url: window.location.href })
              }
              className="font-dm inline-flex items-center gap-2 px-7 h-12 border border-[#0B1426]/30 text-[#0B1426] hover:border-[#3B6FFF] hover:text-[#3B6FFF] rounded-sm text-[14px] font-medium transition-all duration-300"
            >
              <Share2 size={15} /> Share this role
            </button>
          </div>
        </div>
      </section>

      {/* P11-S02 — Role Body */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-3 gap-14">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="font-syne text-[#0B1426] font-medium text-[1.4rem] leading-[1.3]">
                About the role
              </h2>
              <p className="font-dm text-[#0B1426] mt-5 text-[clamp(1rem,1.2vw,1.13rem)] leading-[1.85]">
                {detail.bodyLead}
              </p>
            </div>

            <div>
              <h3 className="font-syne text-[#0B1426] font-medium text-[1.2rem] leading-[1.3]">
                What you will do
              </h3>
              <ul className="mt-5 space-y-3">
                {detail.responsibilities.map((r, i) => (
                  <li
                    key={i}
                    className="font-dm text-[#0B1426] flex gap-3 text-[clamp(1rem,1.15vw,1.05rem)] leading-[1.7]"
                  >
                    <span className="text-[#3B6FFF] shrink-0 mt-1">—</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-syne text-[#0B1426] font-medium text-[1.2rem] leading-[1.3]">
                What we are looking for
              </h3>
              <ul className="mt-5 space-y-3">
                {detail.requirements.map((q, i) => (
                  <li
                    key={i}
                    className="font-dm text-[#0B1426] flex gap-3 text-[clamp(1rem,1.15vw,1.05rem)] leading-[1.7]"
                  >
                    <span className="text-[#3B6FFF] shrink-0 mt-1">—</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-syne text-[#0B1426] font-medium text-[1.2rem] leading-[1.3]">
                What success looks like in 12 months
              </h3>
              <p className="font-dm text-[#0B1426] mt-5 text-[clamp(1rem,1.15vw,1.05rem)] leading-[1.7]">
                {detail.successIn12Months}
              </p>
            </div>

            <div>
              <h3 className="font-syne text-[#0B1426] font-medium text-[1.2rem] leading-[1.3]">
                How to apply
              </h3>
              <p className="font-dm text-[#0B1426] mt-5 text-[clamp(1rem,1.15vw,1.05rem)] leading-[1.7]">
                {detail.applicationInstructions}
              </p>
              <a
                href={`mailto:careers@dholakiaretail.com?subject=Application: ${encodeURIComponent(role.title)}`}
                className="font-dm group inline-flex items-center gap-2 mt-7 px-7 h-12 bg-[#3B6FFF] hover:bg-[#14275C] text-white rounded-sm text-[14px] font-semibold transition-colors duration-300"
              >
                Apply for this role
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="font-dm text-[#0B1426]/55 mt-4 text-[13px] leading-[1.6]">
                {detail.helperText}
              </p>
            </div>
          </div>

          {/* P11-S03 + S04 — Sidebar */}
          <aside className="space-y-10">
            <div className="border border-[#0B1426]/10 bg-[#F5F5F7] overflow-hidden rounded-2xl">
              <div className="aspect-[3/4] overflow-hidden">
                <ImageWithFallback
                  src="/assets/web/P11_S03_single_career_role_detail_about_the_team_optA_image.jpg"
                  alt="Team at the bench"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-7">
              <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.16em] uppercase">
                Who you'll work with
              </p>
              <p className="font-dm text-[#0B1426]/72 mt-4 text-[14px] leading-[1.7]">
                {detail.teamDescription}
              </p>
              <hr className="my-5 border-[#0B1426]/10" />
              <h3 className="font-syne text-[#0B1426] text-[1.05rem] font-medium leading-[1.3]">
                {detail.managerName}
              </h3>
              <p className="font-dm text-[#0B1426]/55 text-[12px] mt-1 tracking-[0.04em] uppercase">
                {detail.managerTitle}
              </p>
              <p className="font-dm text-[#0B1426]/72 mt-3 text-[13.5px] leading-[1.65]">
                {detail.managerBio}
              </p>
              <ul className="mt-5 space-y-1.5">
                {detail.teamValues.map((v) => (
                  <li
                    key={v}
                    className="font-dm text-[#0B1426] text-[12.5px] tracking-[0.04em]"
                  >
                    · {v}
                  </li>
                ))}
              </ul>
              </div>
            </div>

            <div className="border border-[#0B1426]/10 p-7">
              <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.16em] uppercase">
                Compensation and what to expect
              </p>
              <p className="font-dm text-[#0B1426]/72 mt-4 text-[14px] leading-[1.7]">
                {detail.compensationSummary}
              </p>
              <ul className="mt-5 space-y-2.5">
                {detail.benefits.map((b, i) => (
                  <li
                    key={i}
                    className="font-dm text-[#0B1426]/85 flex gap-2 text-[13px] leading-[1.6]"
                  >
                    <span className="text-[#3B6FFF] shrink-0">—</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* P11-S05 — Related roles */}
      <section className="bg-[#F5F5F7] py-20 border-y border-[#0B1426]/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-syne text-[#0B1426] font-normal text-[clamp(1.4rem,2.2vw,1.9rem)] leading-[1.2]">
              Other open roles in {role.function}
            </h2>
            <Link
              to="/careers"
              className="font-dm group inline-flex items-center gap-2 text-[#0B1426] hover:text-[#3B6FFF] transition-colors text-[13px] font-semibold"
            >
              View all open roles
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <ul className="border-t border-[#0B1426]/10">
            {ROLES.filter((r) => r.slug !== role.slug)
              .slice(0, 3)
              .map((r) => (
                <li key={r.slug} className="border-b border-[#0B1426]/10">
                  <Link
                    to={`/careers/${r.slug}`}
                    className="group flex items-center gap-6 py-5 hover:bg-white/60 transition-colors px-2"
                  >
                    <div className="flex-1">
                      <p className="font-dm text-[#3B6FFF] text-[10px] font-medium tracking-[0.16em] uppercase">
                        {r.location} · {r.type} · {r.posted}
                      </p>
                      <h3 className="font-syne text-[#0B1426] mt-1.5 text-[clamp(1rem,1.3vw,1.18rem)] font-medium leading-[1.3] group-hover:text-[#3B6FFF] transition-colors">
                        {r.title}
                      </h3>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-[#0B1426]/40 group-hover:text-[#3B6FFF] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300"
                    />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32 text-center">
        <Link
          to="/careers"
          className="font-dm group inline-flex items-center gap-2 px-7 h-12 border border-[#0B1426]/30 text-[#0B1426] hover:border-[#3B6FFF] hover:text-[#3B6FFF] rounded-sm text-[14px] font-medium transition-all duration-300"
        >
          <ArrowLeft size={15} /> Back to all roles
        </Link>
      </section>
    </div>
  );
}
