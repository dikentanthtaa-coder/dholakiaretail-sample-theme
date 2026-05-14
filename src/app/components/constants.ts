export const LOGO_URL = "https://raw.githubusercontent.com/gondaliyabhavya70960/Portfolio/16257a3baf1579c4b6e991df2be4c2997c9f0ae0/dholakia_retail_logo.png";

/**
 * Single source of truth for primary navigation per build spec §1.8.
 * 7 centre-nav links · Contact CTA on the right.
 */
export const navLinks = [
  { label: "The Group", path: "/the-group" },
  {
    label: "Portfolio",
    path: "/portfolio",
    children: [
      { label: "Mayavé", path: "/portfolio/mayave" },
    ],
  },
  { label: "Craftsmanship", path: "/craftsmanship" },
  { label: "Sustainability", path: "/sustainability" },
  { label: "Innovation", path: "/innovation" },
  { label: "News", path: "/news" },
  { label: "Careers", path: "/careers" },
] as const;

/* Corporate identity facts (rendered across hero, contact, footer) */
export const COMPANY = {
  legalName: "Dholakia Retail Private Limited",
  shortName: "Dholakia Retail",
  cin: "U32111GJ2024PTC155690",
  roc: "Ahmedabad",
  established: "2024",
  registeredOffice: "Dholakia Ventures, Plot No. D-02 and D-11, Gem & Jewellery Park, GHB, Ichchhapor, Surat, Gujarat 394510, India",
  email: {
    general: "hello@dholakiaretail.com",
    press: "press@dholakiaretail.com",
    investor: "ir@dholakiaretail.com",
    careers: "careers@dholakiaretail.com",
    privacy: "privacy@dholakiaretail.com",
    legal: "legal@dholakiaretail.com",
    partnerships: "partnerships@dholakiaretail.com",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/dholakia-retail-private-limited",
    instagram: "https://www.instagram.com/dholakiaretail",
    twitter: "https://twitter.com/dholakiaretail",
    youtube: "https://www.youtube.com/@dholakiaretail",
  },
  tagline: "A corporate house for modern luxury jewellery — restraint, governance, and long-term thinking.",
} as const;

export const FOOTER_NAV = [
  {
    title: "The Group",
    links: [
      { label: "About", path: "/the-group" },
      { label: "Leadership", path: "/the-group#leadership" },
      { label: "Governance", path: "/the-group#governance" },
      { label: "Press Kit", path: "/press-kit" },
    ],
  },
  {
    title: "Brands",
    links: [
      { label: "Portfolio", path: "/portfolio" },
      { label: "Mayavé", path: "/portfolio/mayave" },
      { label: "Future Territories", path: "/portfolio#future-territories" },
      { label: "Newsroom", path: "/news" },
    ],
  },
  {
    title: "Responsibility",
    links: [
      { label: "Craftsmanship", path: "/craftsmanship" },
      { label: "Sustainability", path: "/sustainability" },
      { label: "Innovation", path: "/innovation" },
      { label: "Global Presence", path: "/global-presence" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Contact", path: "/contact" },
      { label: "Careers", path: "/careers" },
      { label: "Partnerships", path: "/contact?type=partnership" },
      { label: "Press", path: "/contact?type=press" },
    ],
  },
] as const;

export const COMPLIANCE_BADGES = [
  "RJC",
  "Kimberley Process",
  "SCS-007",
  "ISO 9001",
] as const;

export const LEGAL_LINKS = [
  { label: "Privacy", path: "/legal/privacy" },
  { label: "Terms", path: "/legal/terms" },
  { label: "Cookies", path: "/legal/cookies" },
  { label: "Disclaimer", path: "/legal/disclaimer" },
] as const;
