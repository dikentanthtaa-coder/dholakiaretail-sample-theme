import { SectionFrame } from "../editorial/SectionFrame";
import { ImageTextSplit } from "../editorial/ImageTextSplit";
import { ClosingCta } from "../editorial/ClosingCta";
import { IMG } from "./constants";

export function AboutTeaserSection() {
  return (
    <SectionFrame tone="canvas" divider="bottom">
      <ImageTextSplit
        eyebrow="The Group"
        title={
          <>
            Five Decades<br /><span className="italic font-light text-[var(--text-secondary)]">of Excellence</span>
          </>
        }
        description="Founded on master craftsmanship and visionary enterprise, Dholakia Retail has grown from a family legacy into one of India's most distinguished luxury retail groups."
        image={{
          src: IMG.artisan,
          alt: "Artisan craftsmanship",
          caption: "Heritage"
        }}
        reverse={false}
      >
        <div className="mt-12 flex">
            <a href="/about" className="font-grotesk inline-flex items-center gap-2 border-b border-text-primary pb-1 text-[13px] font-semibold tracking-[0.1em] uppercase text-text-primary hover:text-text-muted transition-colors">
                Explore Our Story &rarr;
            </a>
        </div>
      </ImageTextSplit>
    </SectionFrame>
  );
}
