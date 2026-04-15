import { Link } from "react-router";
import { LOGO_URL, syne, dm, grotesk } from "./constants";

export function Footer() {
  return (
    <footer className="bg-[#020202] text-white pt-24 pb-8 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          <div className="lg:col-span-5">
            <Link to="/" className="inline-block group mb-8">
              <img
                src={LOGO_URL}
                alt="Dholakia Retail Logo"
                className="h-14 w-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-white/50 max-w-md" style={{ fontFamily: dm, fontSize: 16, lineHeight: 1.8 }}>
              Established in 2024, Dholakia Retail Private Limited is a premium retail group uniting heritage craftsmanship with modern luxury across a curated portfolio of distinguished brands.
            </p>
            <div className="mt-8 flex gap-6">
              {['LinkedIn', 'Twitter', 'Instagram'].map(social => (
                <a key={social} href="#" className="text-white/40 hover:text-white transition-colors" style={{ fontFamily: grotesk, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {social}
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Group", links: [["About", "/about"], ["Manufacturing", "/about"], ["Sustainability", "/sustainability"], ["Investors", "/investor-relations"]] },
            { title: "Brands", links: [["RARE", "/portfolio/rare"], ["Kisna", "/portfolio/kisna"], ["Unity Jewels", "/portfolio/unity-jewels"], ["HK Designs", "/portfolio/hk-designs"]] },
            { title: "Connect", links: [["News", "/news"], ["Careers", "/careers"], ["Contact", "/contact"]] },
          ].map((col, idx) => (
            <div key={col.title} className={`lg:col-span-2 ${idx === 0 ? 'lg:col-start-7' : ''}`}>
              <h4 className="text-white/30 mb-6" style={{ fontFamily: grotesk, fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>{col.title}</h4>
              <div className="space-y-4">
                {col.links.map(([label, path]) => (
                  <Link key={label} to={path} className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors w-fit" style={{ fontFamily: dm, fontSize: 15 }}>
                    <span className="w-0 h-px bg-white group-hover:w-3 transition-all duration-300"></span>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <p className="text-white/30" style={{ fontSize: 13 }}>&copy; 2026 Dholakia Retail Private Limited. CIN: U32111GJ2024PTC155690</p>
          <div className="flex flex-wrap justify-center gap-8">
            {["Privacy Policy", "Terms & Conditions", "Sitemap"].map((t) => (
              <span key={t} className="text-white/30 hover:text-white/70 transition-colors" style={{ fontSize: 13 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Massive Background Typography */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none flex justify-center translate-y-1/4 opacity-[0.03]">
        <h1 style={{ fontFamily: syne, fontSize: "22vw", fontWeight: 800, lineHeight: 0.8, whiteSpace: "nowrap" }}>
          DHOLAKIA
        </h1>
      </div>
    </footer>
  );
}
