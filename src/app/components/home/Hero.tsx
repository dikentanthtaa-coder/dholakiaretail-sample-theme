import { useRef } from "react";
import { MotionValue } from "motion/react";
import { Header } from "../Header";

interface HeroProps {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}

export function Hero({ smoothX, smoothY }: HeroProps) {
  const heroRef = useRef(null);

  return (
    <section ref={heroRef} className="relative overflow-hidden border-b border-[var(--border-soft)] bg-[var(--bg-canvas)]">
      <div className="mx-auto grid min-h-[calc(100svh-88px)] max-w-[1440px] items-end gap-10 px-6 pb-16 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-20">
        <div>
          <p className="mb-6 text-xs uppercase tracking-[0.24em] text-[var(--text-muted)] mt-12">
            Dholakia Retail Private Limited
          </p>
          <h1 className="font-syne text-[clamp(3.5rem,9vw,8rem)] leading-[0.92] tracking-[-0.05em] text-[var(--text-primary)]">
            PRECISION <br/><span className="font-light italic text-[var(--accent-metal)]">EMOTION</span>
          </h1>
          <p className="mt-8 max-w-xl text-[17px] leading-8 text-[var(--text-secondary)]">
            Heritage-rooted. Innovation-driven. A legacy of master craftsmanship, forging the future of luxury retail.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-[28px] border border-[var(--border-soft)]">
          <img src="/images/hero-bg.jpg" alt="Dholakia Retail Campus" className="w-full h-full object-cover aspect-[4/5] lg:aspect-auto lg:h-[calc(100svh-240px)]" />
        </div>
      </div>
    </section>
  );
}
