import { useMouseParallax } from "./home/Shared";
import { Hero } from "./home/Hero";
import { ValuesSection } from "./home/Values";
import { AboutTeaserSection } from "./home/AboutTeaser";
import { PortfolioPreviewSection } from "./home/PortfolioPreview";
import { StatsSection } from "./home/Stats";
import { ManufacturingSustainabilitySection } from "./home/ManufacturingSustainability";
import { NewsSection } from "./home/News";
import { CTASection } from "./home/CTA";

export function HomePage() {
  const { smoothX, smoothY } = useMouseParallax();

  return (
    <div className="bg-[#050505] text-neutral-200">
      {/* ── HERO ── */}
      <Hero smoothX={smoothX} smoothY={smoothY} />

      {/* ── VALUES ── */}
      <ValuesSection />

      {/* ── ABOUT TEASER ── */}
      <AboutTeaserSection smoothX={smoothX} smoothY={smoothY} />

      {/* ── PORTFOLIO PREVIEW ── */}
      <PortfolioPreviewSection smoothX={smoothX} smoothY={smoothY} />

      {/* ── STATS ── */}
      <StatsSection />

      {/* ── MANUFACTURING & SUSTAINABILITY ── */}
      <ManufacturingSustainabilitySection smoothX={smoothX} smoothY={smoothY} />

      {/* ── NEWS ── */}
      <NewsSection />

      {/* ── CTA ── */}
      <CTASection smoothX={smoothX} smoothY={smoothY} />
    </div>
  );
}
