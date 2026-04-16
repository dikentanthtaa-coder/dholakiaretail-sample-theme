import { SectionFrame } from "../editorial/SectionFrame";
import { PageIntro } from "../editorial/PageIntro";
import { EditorialCard } from "../editorial/EditorialCard";
import { loopedNews } from "./constants";

export function NewsSection() {
  const newsItems = loopedNews.slice(0, 3);
  return (
    <SectionFrame tone="canvas" divider="bottom">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <PageIntro
          eyebrow="Latest"
          title="News & Insights"
          className="m-0 max-w-xl"
        />
        <a href="/news" className="font-grotesk mt-6 md:mt-0 inline-flex items-center gap-2 border-b border-text-primary pb-1 text-[13px] font-semibold tracking-[0.1em] uppercase text-text-primary hover:text-text-muted transition-colors">
            View All News &rarr;
        </a>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {newsItems.map((item, index) => (
          <EditorialCard 
            key={index} 
            title={item.title} 
            description={item.excerpt}
            image={{
              src: item.img,
              alt: item.title,
            }}
            meta={[item.cat, item.date]}
            href={item.href}
            className="h-full"
          />
        ))}
      </div>
    </SectionFrame>
  );
}
