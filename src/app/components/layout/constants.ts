// ─── Typography tokens ───────────────────────────────────────────────────────
export const syne = "'Syne', sans-serif";
export const grotesk = "'Space Grotesk', sans-serif";
export const dm = "'DM Sans', sans-serif";
export const inter = "'Inter', sans-serif";

export const LOGO_URL = "https://raw.githubusercontent.com/gondaliyabhavya70960/Portfolio/16257a3baf1579c4b6e991df2be4c2997c9f0ae0/dholakia_retail_logo.png";

export const navLinks = [
  { label: "About", path: "/about" },
  {
    label: "Portfolio",
    path: "/portfolio",
    children: [
      { label: "RARE", path: "/portfolio/rare" },
      { label: "Kisna", path: "/portfolio/kisna" },
      { label: "Unity Jewels", path: "/portfolio/unity-jewels" },
      { label: "HK Designs", path: "/portfolio/hk-designs" },
    ],
  },
  { label: "Sustainability", path: "/sustainability" },
  { label: "Investors", path: "/investor-relations" },
  { label: "News", path: "/news" },
  { label: "Careers", path: "/careers" },
];
