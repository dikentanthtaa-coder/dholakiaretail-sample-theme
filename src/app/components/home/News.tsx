import { motion, useMotionValue } from "motion/react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ease, loopedNews, CAT_COLOR } from "./constants";

function NewsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const xVal = useMotionValue(0);          // current x offset in px
  const rafRef = useRef<number>(0);
  const isHovered = useRef(false);
  const isDragging = useRef(false);
  const dragStart = useRef(0);

  // Speeds in px/frame at 60fps
  const SPEED_NORMAL = 0.55;
  const SPEED_SLOW = 0.13;

  useEffect(() => {
    const tick = () => {
      if (!isDragging.current && trackRef.current) {
        const speed = isHovered.current ? SPEED_SLOW : SPEED_NORMAL;
        const halfWidth = trackRef.current.scrollWidth / 2;
        let next = xVal.get() - speed;
        // Reset: once we've scrolled exactly half the duplicated track, snap back to 0.
        if (Math.abs(next) >= halfWidth) next = 0;
        xVal.set(next);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [xVal]);

  return (
    <div
      className="relative"
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
    >
      {/* Edge fade mask — cinematic, continuous feel */}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}
      >
        <motion.div
          ref={trackRef}
          className="flex"
          style={{
            x: xVal,
            gap: "1.75rem",
            // Prevent layout shifts during animation
            willChange: "transform",
          }}
          // Touch drag support
          drag="x"
          dragConstraints={{ left: -9999, right: 0 }}
          dragElastic={0.08}
          onDragStart={() => { isDragging.current = true; dragStart.current = xVal.get(); }}
          onDragEnd={(_e, info) => {
            isDragging.current = false;
            // Snap back if dragged too far right
            if (xVal.get() > 0) xVal.set(0);
          }}
          whileTap={{ cursor: "grabbing" }}
        >
          {loopedNews.map((item, index) => (
            <Link
              key={`${item.href}-${index}`}
              to={item.href}
              data-cursor-hover
              draggable={false}
              className="group flex-shrink-0 overflow-hidden rounded-[2rem] border border-glass-border bg-bg-surface hover:border-glass-hover-border transition-all duration-500"
              style={{
                width: "clamp(300px, 82vw, 26rem)",
              }}
              aria-label={item.title}
              // Prevent link clicks during drag
              onClick={(e) => {
                if (Math.abs(xVal.get() - dragStart.current) > 8) e.preventDefault();
              }}
            >
              {/* Card image */}
              <div className="relative overflow-hidden h-52 w-full flex-shrink-0">
                <div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background: CAT_COLOR[item.cat] ?? "transparent",
                    mixBlendMode: "screen",
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-16 z-10 pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, transparent, var(--bg-surface))" }}
                />
                <div
                  className="w-full h-full scale-[1.04] group-hover:scale-[1.10] transition-transform duration-700"
                  style={{ transitionTimingFunction: `cubic-bezier(${ease})` }}
                >
                  <ImageWithFallback
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                  />
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-8 pt-5 text-text-primary">
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="font-grotesk px-3 py-1 rounded-full bg-glass-bg text-text-primary text-[10px] font-bold tracking-[0.12em] uppercase"
                  >
                    {item.cat}
                  </span>
                  <span className="font-dm text-text-muted text-[12px]">
                    {item.date}
                  </span>
                </div>

                <h3
                  className="font-syne tracking-tight group-hover:text-text-secondary transition-colors duration-300 text-[20px] font-bold leading-[1.4]"
                >
                  {item.title}
                </h3>

                <p
                  className="font-dm mt-3 text-text-secondary text-[14px] leading-[1.75]"
                >
                  {item.excerpt}
                </p>

                <div className="mt-6 flex items-center gap-2 text-text-muted group-hover:text-text-secondary transition-colors duration-300">
                  <span
                    className="font-grotesk text-[11px] font-semibold tracking-[0.1em] uppercase"
                  >
                    Read more
                  </span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Mobile "View all" link — shown below the carousel on small screens */}
      <div className="mt-8 md:hidden">
        <Link
          to="/news"
          className="font-grotesk inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors text-[12px] font-semibold tracking-[0.18em] uppercase"
        >
          View all news <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

export function NewsSection() {
  return (
    <section className="py-32 lg:py-48 bg-bg-surface overflow-hidden border-t border-glass-border">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: ease }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 px-6 lg:px-12"
        >
          <div>
            <span
              className="font-grotesk text-text-secondary tracking-[0.22em] uppercase text-[12px] font-semibold"
            >
              Latest
            </span>
            <h2
              className="font-syne mt-4 text-text-primary tracking-tighter text-[clamp(2.5rem,4vw,4.2rem)] font-bold leading-[1.1]"
            >
              News & Insights
            </h2>
          </div>
          <Link
            to="/news"
            data-cursor-hover
            className="font-grotesk group hidden md:inline-flex items-center gap-2 mt-6 md:mt-0 text-text-secondary hover:text-text-primary transition-colors text-[13px] font-semibold tracking-[0.1em] uppercase"
          >
            View All News{" "}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.15, ease: ease }}
        >
          <NewsCarousel />
        </motion.div>
      </div>
    </section>
  );
}
