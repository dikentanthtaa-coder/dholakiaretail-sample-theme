import { Link } from "react-router";
import { LOGO_URL } from "./constants";

export function Footer() {
  return (
    <footer className="bg-bg-deep text-text-primary pt-24 pb-8 border-t border-glass-border relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          <div className="lg:col-span-5">
            <Link to="/" className="inline-block group mb-8">
              <img
                src={LOGO_URL}
                alt="Dholakia Retail Logo"
                className="h-14 w-auto object-contain theme-logo opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="font-dm text-text-secondary max-w-md text-[16px] leading-[1.8]">
              Established in 2024, Dholakia Retail Private Limited is a premium retail group uniting heritage craftsmanship with modern luxury across a curated portfolio of distinguished brands.
            </p>
            <div className="mt-8 flex gap-6">
              {['LinkedIn', 'Twitter', 'Instagram'].map(social => (
                <a key={social} href="#" className="font-grotesk text-text-muted hover:text-text-primary transition-colors text-[13px] uppercase tracking-[0.1em]">
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
              <h4 className="font-grotesk text-text-dim mb-6 text-[11px] font-semibold tracking-[0.15em] uppercase">{col.title}</h4>
              <div className="space-y-4">
                {col.links.map(([label, path]) => (
                  <Link key={label} to={path} className="font-dm group flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors w-fit text-[15px]">
                    <span className="w-0 h-px bg-text-primary group-hover:w-3 transition-all duration-300"></span>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-glass-border flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <p className="font-dm text-text-muted text-[13px]">&copy; 2026 Dholakia Retail Private Limited. CIN: U32111GJ2024PTC155690</p>
          <div className="flex flex-wrap justify-center gap-8">
            {["Privacy Policy", "Terms & Conditions", "Sitemap"].map((t) => (
              <span key={t} className="font-dm text-text-muted hover:text-text-secondary transition-colors text-[13px] cursor-pointer">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Massive Background Typography */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none flex justify-center translate-y-1/4 opacity-[0.03]">
        <h1 className="font-syne text-[22vw] font-black leading-[0.8] whitespace-nowrap">
          DHOLAKIA
        </h1>
      </div>
    </footer>
  );
}
