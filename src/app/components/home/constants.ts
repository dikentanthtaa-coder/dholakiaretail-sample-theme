import { Sparkles, ShieldCheck, Gem } from "lucide-react";
import React from "react";

/**
 * Imagery used across the homepage sections.
 * All images self-hosted via Unsplash for now (would be replaced with CDN-served WebP per build spec §1.12).
 */
/** Final assets per Option_A_Inventory.md — served from /public/assets */
export const IMG = {
  // P01-S01 — Cinematic Hero
  heroPoster: "/assets/images/P01_S01_home_hero_optA_image.png",
  heroVideo: "/assets/videos/P01_S01_Hero_Video_idea_360.mp4",
  // P01-S04 — Corporate Snapshot
  snapshot: "/assets/images/P01_S04_home_corporate_snapshot_optA_image.png",
  snapshotVideo: "/assets/videos/P01_S04_home_corporate_snapshot_optA_video.mp4",
  // P01-S05 — Portfolio / Mayavé spotlight
  mayave: "/assets/images/P01_S05_home_portfolio_preview_optA_image.png",
  mayaveVideo: "/assets/videos/P01_S01_home_hero_optA_video.mp4",
  // P01-S06 — Brand Film
  filmPoster: "/assets/images/P01_S06_home_brand_film_optA_image.png",
  filmVideo: "/assets/videos/P01_S06_home_brand_film_optA_video.mp4",
  // P01-S07 — Sustainability Teaser
  sustainability: "/assets/images/P01_S07_home_sustainability_teaser_optA_image.png",
  sustainabilityVideo: "/assets/videos/P01_S07_home_sustainability_teaser_optA_video.mp4",
  // P01-S08 — News thumbnails
  newsThumbnail: "/assets/images/P01_S08_home_news_press_preview_optA_image.png",
  newsAtelier: "/assets/images/P01_S08_home_news_press_preview_optA_image.png",
  newsLeader: "/assets/images/P01_S08_home_news_press_preview_optA_image.png",
  newsLaunch: "/assets/images/P01_S08_home_news_press_preview_optA_image.png",
};

/* P01-S03 — Guiding Principles · 3 cards · per build spec */
export const PRINCIPLES = [
  {
    icon: React.createElement(Sparkles, { size: 28, strokeWidth: 1.5 }),
    title: "Innovation",
    body: "We combine modern retail thinking, evolving consumer insight, and future-ready systems to shape brands that remain relevant as luxury changes.",
  },
  {
    icon: React.createElement(ShieldCheck, { size: 28, strokeWidth: 1.5 }),
    title: "Integrity",
    body: "Trust is built through transparency, governance, and responsible brand stewardship.",
  },
  {
    icon: React.createElement(Gem, { size: 28, strokeWidth: 1.5 }),
    title: "Craftsmanship",
    body: "Luxury begins in detail, proportion, material understanding, and the discipline to protect quality at every stage.",
  },
] as const;

/* P01-S04 — Corporate Snapshot · 4 metrics · per build spec */
export const SNAPSHOT = [
  { value: "2024", label: "Established", sub: "Year of incorporation" },
  {
    value: "U32111GJ2024PTC155690",
    label: "Corporate Identity Number",
    sub: "MCA registered · RoC Ahmedabad",
    mono: true,
  },
  {
    value: "Surat, Gujarat – 394510",
    label: "Registered Office",
    sub: "Dholakia Ventures, Plot No. D-02 and D-11, Gem & Jewellery Park, GHB, Ichchhapor, Surat, Gujarat 394510, India",
  },
  {
    value: "Luxury Retail & Jewellery",
    label: "Industry",
    sub: "Parent house for distinguished jewellery brands",
  },
] as const;

/* P01-S08 — News preview · 3 cards + 1 anchor — exact titles from build spec */
export const NEWS = [
  {
    slug: "building-the-future-of-luxury-retail",
    date: "14 March 2026",
    cat: "Company Updates",
    title: "Building a Corporate Platform for Luxury Jewellery Brands",
    excerpt: "How Dholakia Retail is being built as a parent house — not a single retailer.",
    img: IMG.newsAtelier,
  },
  {
    slug: "why-responsibility-matters-in-modern-jewellery",
    date: "28 February 2026",
    cat: "Sustainability",
    title: "Why Responsible Luxury Demands Better Systems",
    excerpt: "Notes on traceability, certifications, and what restraint really costs.",
    img: IMG.newsLeader,
  },
  {
    slug: "mayave-a-new-chapter-in-bespoke-luxury",
    date: "14 February 2026",
    cat: "Brand Launches",
    title: "Mayavé and the Poetics of Modern Jewellery",
    excerpt: "An editorial introduction to the first house in the portfolio.",
    img: IMG.newsLaunch,
  },
] as const;

export const ease = [0.65, 0, 0.35, 1] as const;

export const slideUp = {
  hidden: { y: "115%", opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.08, duration: 1, ease },
  }),
};
