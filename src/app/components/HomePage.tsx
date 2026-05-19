import { useMouseParallax } from "./home/Shared";
import { Hero } from "./home/Hero";
import { AboutTeaserSection } from "./home/AboutTeaser";
import { ValuesSection } from "./home/Values";
import { StatsSection } from "./home/Stats";
import { PortfolioPreviewSection } from "./home/PortfolioPreview";
import { ManufacturingSustainabilitySection } from "./home/ManufacturingSustainability";
import { NewsSection } from "./home/News";
import { CTASection } from "./home/CTA";

/**
 * Page 1 — Home (per build spec §Part 2 · P01)
 *
 *  S01 Cinematic Hero
 *  S02 Intro Statement
 *  S03 Guiding Principles (4 cards)
 *  S04 Corporate Snapshot (4 facts)
 *  S05 Portfolio Preview · Mayavé spotlight
 *  S06 Brand Film band
 *  S07 Sustainability Teaser
 *  S08 News / Press 3+1
 *  S09 Final CTA
 */
export function HomePage() {
  const { smoothX, smoothY } = useMouseParallax();

  return (
    <main className="bg-white text-[#0B1426]">
      <Hero smoothX={smoothX} smoothY={smoothY} />
      <AboutTeaserSection smoothX={smoothX} smoothY={smoothY} />
      <ValuesSection />
      <StatsSection />
      <PortfolioPreviewSection smoothX={smoothX} smoothY={smoothY} />
      <ManufacturingSustainabilitySection smoothX={smoothX} smoothY={smoothY} />
      <NewsSection />
      <CTASection />
    </main>
  );
}
