import { Link } from "react-router";
import { ArrowRight, Download, Image as ImageIcon, FileText, Building2 } from "lucide-react";
import { motion } from "motion/react";
import { COMPANY } from "./constants";

const ease = [0.65, 0, 0.35, 1] as const;

const ASSETS = [
  {
    icon: ImageIcon,
    title: "Brand wordmark",
    desc: "DHOLAKIA RETAIL logo · SVG and PNG · light + dark variants",
    file: "/press-kit/dholakia-retail-logo.zip",
  },
  {
    icon: ImageIcon,
    title: "Mayavé wordmark",
    desc: "Mayavé logo · SVG and PNG · approved colourways",
    file: "/press-kit/mayave-logo.zip",
  },
  {
    icon: FileText,
    title: "Corporate fact sheet",
    desc: "PDF · CIN, registered office, leadership, certifications",
    file: "/press-kit/dholakia-retail-fact-sheet.pdf",
  },
  {
    icon: ImageIcon,
    title: "Leadership portraits",
    desc: "ZIP · approved high-resolution portraits and captions",
    file: "/press-kit/leadership-portraits.zip",
  },
  {
    icon: ImageIcon,
    title: "Brand photography",
    desc: "ZIP · selected campaign and editorial imagery",
    file: "/press-kit/brand-photography.zip",
  },
  {
    icon: Building2,
    title: "Compliance certificates",
    desc: "PDF · RJC, Kimberley Process, SCS-007, ISO 9001",
    file: "/press-kit/compliance-certificates.pdf",
  },
];

/**
 * /press-kit
 */
export function PressKitPage() {
  return (
    <div className="bg-white text-[#0B1426]">
      {/* Hero */}
      <section className="bg-[#F5F5F7] pt-40 lg:pt-52 pb-20 lg:pb-28 border-b border-[#0B1426]/10 text-center">
        <div className="max-w-[820px] mx-auto px-6 md:px-12 lg:px-20">
          <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
            Press Kit
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="font-syne text-[#0B1426] font-normal leading-[1.05] tracking-[-0.02em] text-[clamp(2.2rem,4.4vw,3.6rem)]"
          >
            Everything you need, in one download.
          </motion.h1>
          <p className="font-dm text-[#0B1426]/65 mx-auto max-w-[58ch] mt-6 text-[clamp(1rem,1.3vw,1.13rem)] leading-[1.7] font-light">
            Logos, leadership portraits, fact sheet, and compliance certificates — approved for press,
            partner, and analyst use.
          </p>
        </div>
      </section>

      {/* Assets */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0B1426]/10">
            {ASSETS.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease }}
                className="bg-white p-8 lg:p-10 group hover:bg-[#F5F5F7] transition-colors"
              >
                <a.icon size={28} strokeWidth={1.5} className="text-[#3B6FFF]" />
                <h3 className="font-syne text-[#0B1426] mt-7 text-[1.3rem] font-medium leading-[1.3]">
                  {a.title}
                </h3>
                <p className="font-dm text-[#0B1426]/65 mt-3 text-[14px] leading-[1.65]">{a.desc}</p>
                <a
                  href={a.file}
                  download
                  className="font-dm group/link inline-flex items-center gap-2 mt-7 text-[#3B6FFF] text-[13px] font-semibold"
                >
                  <Download size={14} />
                  Download
                  <ArrowRight
                    size={13}
                    className="group-hover/link:translate-x-1 transition-transform duration-300"
                  />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press contact */}
      <section
        data-header-theme="dark"
        className="bg-[#0B1426] text-white py-28 lg:py-36"
      >
        <div className="max-w-[820px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <h2 className="font-syne font-normal italic text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.2]">
            Need something specific?
          </h2>
          <p className="font-dm text-white/72 mt-6 max-w-[58ch] mx-auto text-[1.05rem] leading-[1.7]">
            For embargoed materials, interview requests, or bespoke imagery, reach the communications
            desk directly.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-9">
            <a
              href={`mailto:${COMPANY.email.press}`}
              className="font-dm group inline-flex items-center gap-2 px-7 h-12 bg-[#3B6FFF] hover:bg-[#14275C] text-white rounded-sm text-[14px] font-semibold transition-colors duration-300"
            >
              {COMPANY.email.press}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/contact?type=press"
              className="font-dm inline-flex items-center gap-2 px-7 h-12 border border-white/30 text-white hover:bg-white/10 rounded-sm text-[14px] font-medium transition-all duration-300"
            >
              Send a press inquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
