import { Link } from "react-router";
import { LOGO_URL } from "./constants";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-glass-border bg-bg-surface text-text-primary">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />
      <div className="mx-auto max-w-[1600px] px-6 py-16 lg:px-12 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Link to="/" className="mb-6 inline-flex items-center gap-2 group">
              <img
                src={LOGO_URL}
                alt="Dholakia Retail Logo"
                className="h-11 w-auto object-contain opacity-90 transition-opacity group-hover:opacity-100"
              />
            </Link>
            <p className="font-dm max-w-md text-[15px] leading-[1.8] text-text-secondary">
              Established in 2024, Dholakia Retail Private Limited is a premium retail group uniting heritage craftsmanship with modern luxury across a curated portfolio of distinguished brands.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {['LinkedIn', 'Twitter', 'Instagram'].map(social => (
                <a key={social} href="#" className="font-grotesk inline-flex items-center rounded-full border border-glass-border bg-bg-surface-elevated px-4 py-2 text-[12px] uppercase tracking-[0.12em] text-text-muted transition-colors hover:text-text-primary">
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
              <h4 className="font-grotesk mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">{col.title}</h4>
              <div className="space-y-3">
                {col.links.map(([label, path]) => (
                  <Link key={label} to={path} className="font-dm group flex w-fit items-center gap-2 text-[15px] text-text-secondary transition-colors hover:text-text-primary">
                    <span className="h-px w-0 bg-text-primary transition-all duration-300 group-hover:w-3" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-glass-border pt-6 md:flex-row md:items-center">
          <p className="font-dm text-[13px] text-text-muted">&copy; 2026 Dholakia Retail Private Limited. CIN: U32111GJ2024PTC155690</p>
          <div className="flex flex-wrap gap-4">
            {["Privacy Policy", "Terms & Conditions", "Sitemap"].map((t) => (
              <span key={t} className="font-dm cursor-pointer text-[13px] text-text-muted transition-colors hover:text-text-secondary">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
