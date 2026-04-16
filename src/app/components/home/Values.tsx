import { SectionFrame } from "../editorial/SectionFrame";
import { PageIntro } from "../editorial/PageIntro";
import { EditorialCard } from "../editorial/EditorialCard";
import { valuesData } from "./constants";

export function ValuesSection() {
  return (
    <SectionFrame tone="surface" divider="bottom">
      <PageIntro
        eyebrow="Core Values"
        title={
          <>
            Built on principles that <span className="italic font-light text-[var(--accent-metal)]">outlast trend</span>
          </>
        }
        description="Our foundation is built upon values that have guided our legacy for over five decades."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {valuesData.map((item) => (
          <EditorialCard 
            key={item.title} 
            title={item.title} 
            description={item.desc}
            className="h-full"
          />
        ))}
      </div>
    </SectionFrame>
  );
}
