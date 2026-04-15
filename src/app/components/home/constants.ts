import { ArrowRight, Gem, Shield, Palette } from "lucide-react";
import React from "react";

// ─── Premium imagery ─────────────────────────────────────────────────────────
export const IMG = {
  hero: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=90&w=2400&auto=format&fit=crop",
  heroBg: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2400&auto=format&fit=crop",
  artisan: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=85&w=1800&auto=format&fit=crop",
  gold: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=85&w=1800&auto=format&fit=crop",
  store: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=85&w=1800&auto=format&fit=crop",
  factory: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=85&w=1800&auto=format&fit=crop",
  forest: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=85&w=1800&auto=format&fit=crop",
  ring: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=85&w=1800&auto=format&fit=crop",
  necklace: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=85&w=1800&auto=format&fit=crop",
  mayave: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=90&w=2400&auto=format&fit=crop",
  cta: "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?q=90&w=2400&auto=format&fit=crop",
};

// ─── Single brand: Mayavé ────────────────────────────────────────────────────
export const MAYAVE = {
  name: "Mayavé",
  tag: "Coming Soon",
  tagline: "Where Silence Becomes Jewellery",
  desc: "A new chapter in bespoke luxury. Mayavé is Dholakia Retail's latest expression of refined artistry—where every creation is a whisper of rare beauty, crafted for those who seek the extraordinary.",
  img: IMG.mayave,
  url: "https://mayave.com/",
  pillars: ["Bespoke Craftsmanship", "Rare Materials", "Timeless Design"],
};

export const stats = [
  { value: "50+", label: "Years of Heritage" },
  { value: "10K+", label: "Skilled Artisans" },
  { value: "25+", label: "Global Markets" },
  { value: "01", label: "Flagship Brand" },
];

// ─── News cards ────────────────────────────────────────────────────────────────
export const news = [
  {
    date: "Mar 2026", cat: "Corporate",
    title: "Record FY26 Revenue of ₹8,500 Crore",
    excerpt: "Milestone growth across all portfolio brands driven by strong domestic demand.",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=85&w=900&auto=format&fit=crop",
    href: "/news/1",
  },
  {
    date: "Feb 2026", cat: "Sustainability",
    title: "Solar Initiative Reaches 40MW Capacity",
    excerpt: "On track for 100% renewable energy integration across all manufacturing units.",
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=85&w=900&auto=format&fit=crop",
    href: "/news/1",
  },
  {
    date: "Jan 2026", cat: "Brand",
    title: "Mayavé — A New Luxury Brand is Born",
    excerpt: "Dholakia Retail unveils its most anticipated brand, redefining bespoke jewellery for a global audience.",
    img: "https://images.unsplash.com/photo-1573408301185-9519f94953fd?q=85&w=900&auto=format&fit=crop",
    href: "/news/1",
  },
  {
    date: "Dec 2025", cat: "Awards",
    title: "Dholakia Retail Wins India's Most Trusted Luxury Group",
    excerpt: "Recognised for customer trust, innovation and widest retail network across India.",
    img: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=85&w=900&auto=format&fit=crop",
    href: "/news/1",
  },
  {
    date: "Nov 2025", cat: "Global",
    title: "Expanding to 6 New Export Markets",
    excerpt: "Strategic B2B partnerships now cover the Middle East, Europe, and South-East Asia.",
    img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=85&w=900&auto=format&fit=crop",
    href: "/news/1",
  },
  {
    date: "Oct 2025", cat: "Innovation",
    title: "AI-Assisted Jewellery Design Studio Debuts",
    excerpt: "Pioneering a new era of personalised luxury with generative design technology.",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=85&w=900&auto=format&fit=crop",
    href: "/news/1",
  },
];

export const loopedNews = [...news, ...news];

export const ease = [0.76, 0, 0.24, 1] as const;

export const CAT_COLOR: Record<string, string> = {
  Corporate: "rgba(255,200,100,0.18)",
  Sustainability: "rgba(100,220,140,0.18)",
  Brand: "rgba(200,160,255,0.18)",
  Awards: "rgba(255,170,100,0.18)",
  Global: "rgba(100,190,255,0.18)",
  Innovation: "rgba(255,120,120,0.18)",
};

export const slideUp = {
  hidden: { y: "115%", opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { delay: i * 0.1, duration: 1.2, ease: ease } }),
};

export const valuesData = [
  { icon: React.createElement(Gem, { size: 32, strokeWidth: 1 }), title: "Innovation", desc: "Pioneering technology and design to shape the future of luxury retail across global markets." },
  { icon: React.createElement(Shield, { size: 32, strokeWidth: 1 }), title: "Integrity", desc: "Building trust through ethical practices, transparency, and unwavering commitment to excellence." },
  { icon: React.createElement(Palette, { size: 32, strokeWidth: 1 }), title: "Artistry", desc: "Celebrating the human hand—where heritage craftsmanship meets contemporary vision." },
] as const;
