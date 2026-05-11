import { Link } from "react-router";
import { Linkedin, Instagram, Twitter, Youtube } from "lucide-react";
import { LOGO_URL, COMPANY, FOOTER_NAV, COMPLIANCE_BADGES, LEGAL_LINKS } from "./constants";

const socialIcons = [
  { name: "LinkedIn", href: COMPANY.social.linkedin, Icon: Linkedin },
  { name: "Instagram", href: COMPANY.social.instagram, Icon: Instagram },
  { name: "X (Twitter)", href: COMPANY.social.twitter, Icon: Twitter },
  { name: "YouTube", href: COMPANY.social.youtube, Icon: Youtube },
];

export function Footer() {
  return (
    <footer
      data-header-theme="dark"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#0A0E1F",
        color: "#E8E9ED",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-24 pb-8">
        {/* ── Block 1 — Brand + Navigation ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 group" aria-label="Dholakia Retail home">
              <img
                src={LOGO_URL}
                alt="Dholakia Retail"
                className="h-8 w-auto object-contain brightness-0 invert opacity-95 group-hover:opacity-100 transition-opacity"
              />
            </Link>
            <p
              className="font-dm mt-6 max-w-[320px] text-[15px] leading-[1.55]"
              style={{ color: "#B4BCC9" }}
            >
              {COMPANY.tagline}
            </p>

            <div className="mt-8 flex gap-3">
              {socialIcons.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="w-9 h-9 inline-flex items-center justify-center rounded-full border transition-all duration-200 hover:bg-[#1A2238]"
                  style={{ borderColor: "rgba(42, 53, 72, 0.7)", color: "#E8E9ED" }}
                >
                  <Icon size={15} strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {FOOTER_NAV.map((col) => (
              <div key={col.title}>
                <h4
                  className="font-dm text-[11px] font-medium uppercase mb-6"
                  style={{ color: "#6B8AB8", letterSpacing: "0.12em" }}
                >
                  {col.title}
                </h4>
                <ul className="space-y-4">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.path.startsWith("http") ? (
                        <a
                          href={link.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-dm text-[15px] hover:text-white transition-colors duration-200"
                          style={{ color: "#E8E9ED" }}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.path}
                          className="font-dm text-[15px] hover:text-white transition-colors duration-200"
                          style={{ color: "#E8E9ED" }}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* divider */}
        <div className="h-px w-full" style={{ background: "rgba(42, 53, 72, 0.30)" }} />

        {/* ── Block 2 — Corporate Identity ─────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12">
          <div className="md:col-span-3">
            <p
              className="font-dm text-[11px] font-medium uppercase mb-2"
              style={{ color: "#6B8AB8", letterSpacing: "0.12em" }}
            >
              CIN
            </p>
            <p className="font-mono text-[15px]" style={{ color: "#E8E9ED" }}>
              {COMPANY.cin}
            </p>
          </div>
          <div className="md:col-span-9">
            <p
              className="font-dm text-[11px] font-medium uppercase mb-2"
              style={{ color: "#6B8AB8", letterSpacing: "0.12em" }}
            >
              Registered Office
            </p>
            <p className="font-dm text-[15px] leading-[1.6]" style={{ color: "#E8E9ED" }}>
              {COMPANY.registeredOffice}
            </p>
          </div>
        </div>

        {/* divider */}
        <div className="h-px w-full" style={{ background: "rgba(42, 53, 72, 0.30)" }} />

        {/* ── Block 3 — Compliance ────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 py-12">
          <p
            className="font-dm text-[11px] font-medium uppercase shrink-0"
            style={{ color: "#6B8AB8", letterSpacing: "0.12em" }}
          >
            Compliance
          </p>
          <div className="flex flex-wrap gap-3">
            {COMPLIANCE_BADGES.map((badge) => (
              <span
                key={badge}
                className="font-dm inline-flex items-center px-4 h-10 rounded-full text-[13px] font-medium transition-colors duration-200 hover:border-[#6B8AB8]"
                style={{
                  border: "1px solid rgba(42, 53, 72, 0.7)",
                  color: "#E8E9ED",
                  letterSpacing: "0.02em",
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* divider */}
        <div className="h-px w-full" style={{ background: "rgba(42, 53, 72, 0.30)" }} />

        {/* ── Block 4 — Copyright ─────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8">
          <p className="font-dm text-[14px]" style={{ color: "#B4BCC9" }}>
            © 2026 {COMPANY.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 justify-center">
            {LEGAL_LINKS.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className="font-dm text-[14px] hover:text-white transition-colors"
                style={{ color: "#B4BCC9" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
