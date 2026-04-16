import { SectionFrame } from "../editorial/SectionFrame";
import { ImageTextSplit } from "../editorial/ImageTextSplit";
import { IMG } from "./constants";

export function ManufacturingSustainabilitySection() {
  return (
    <SectionFrame tone="surface" divider="bottom">
      <div className="grid grid-cols-1 gap-24 lg:gap-36">
        <ImageTextSplit
            eyebrow="Manufacturing"
            title={
            <>
                Precision Meets<br /><span className="italic font-light text-[var(--text-secondary)]">Artistry</span>
            </>
            }
            description="State-of-the-art facilities blend cutting-edge technology with time-honoured techniques."
            image={{
            src: IMG.factory,
            alt: "Manufacturing precision"
            }}
            reverse={false}
        >
            <div className="mt-12 flex">
                <a href="/about" className="font-grotesk inline-flex items-center gap-2 border-b border-text-primary pb-1 text-[13px] font-semibold tracking-[0.1em] uppercase text-text-primary hover:text-text-muted transition-colors">
                    Explore Our Craft &rarr;
                </a>
            </div>
        </ImageTextSplit>
        
        <ImageTextSplit
            eyebrow="Sustainability & ESG"
            title={
            <>
                Responsible Growth,<br /><span className="italic font-light text-[var(--text-secondary)]">Lasting Impact</span>
            </>
            }
            description="From 100% ethical sourcing and renewable energy integration to vast community empowerment, sustainability is the bedrock of our long-term value creation."
            image={{
            src: IMG.forest,
            alt: "Sustainable forest and environment"
            }}
            reverse={true}
        >
            <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="border-l border-glass-border pl-4">
                    <p className="font-syne text-[24px] font-extrabold text-text-primary">95%</p>
                    <p className="font-dm text-[12px] text-text-muted">Ethical Sourcing</p>
                </div>
                <div className="border-l border-glass-border pl-4">
                    <p className="font-syne text-[24px] font-extrabold text-text-primary">40MW</p>
                    <p className="font-dm text-[12px] text-text-muted">Solar Power</p>
                </div>
            </div>
            <div className="mt-12 flex">
                <a href="/sustainability" className="font-grotesk inline-flex items-center gap-2 border-b border-text-primary pb-1 text-[13px] font-semibold tracking-[0.1em] uppercase text-text-primary hover:text-text-muted transition-colors">
                    View ESG Report &rarr;
                </a>
            </div>
        </ImageTextSplit>
      </div>
    </SectionFrame>
  );
}
