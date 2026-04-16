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
    <div className="bg-[var(--bg-canvas)] text-[var(--text-primary)] font-editorial">
      <Hero smoothX={smoothX} smoothY={smoothY} />
      <ValuesSection />
      <AboutTeaserSection />
      <PortfolioPreviewSection />
      <StatsSection />
      <ManufacturingSustainabilitySection />
      <NewsSection />
      <CTASection />
    </div>
  );
}
