import { SectionFrame } from "../editorial/SectionFrame";
import { ImageTextSplit } from "../editorial/ImageTextSplit";
import { MAYAVE } from "./constants";

export function PortfolioPreviewSection() {
  return (
    <SectionFrame tone="surface" divider="bottom">
      <ImageTextSplit
        eyebrow="Portfolio"
        title={MAYAVE.name}
        description={MAYAVE.desc}
        image={{
          src: MAYAVE.img,
          alt: "Mayavé bespoke jewellery",
          caption: MAYAVE.tag
        }}
        reverse={true}
      >
        <div className="mt-8 flex flex-wrap gap-2">
            {MAYAVE.pillars.map((p) => (
              <span
                key={p}
                className="font-grotesk inline-flex items-center rounded-full border border-glass-border bg-bg-surface-elevated px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-text-muted"
              >
                {p}
              </span>
            ))}
        </div>
        <div className="mt-12 flex">
            <a href="/portfolio" className="font-grotesk inline-flex items-center gap-2 border-b border-text-primary pb-1 text-[13px] font-semibold tracking-[0.1em] uppercase text-text-primary hover:text-text-muted transition-colors">
                View Complete Portfolio &rarr;
            </a>
        </div>
      </ImageTextSplit>
    </SectionFrame>
  );
}
