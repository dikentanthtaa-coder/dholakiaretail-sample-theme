import { motion, useSpring, useMotionValue } from "motion/react";
import { useState, useEffect } from "react";

export function MagneticCursor() {
  const cx = useMotionValue(-100);
  const cy = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);
  const sx = useSpring(cx, { damping: 28, stiffness: 300 });
  const sy = useSpring(cy, { damping: 28, stiffness: 300 });
  const tx = useSpring(trailX, { damping: 40, stiffness: 180 });
  const ty = useSpring(trailY, { damping: 40, stiffness: 180 });
  const [isHover, setIsHover] = useState(false);
  const scale = useSpring(isHover ? 2.4 : 1, { damping: 20, stiffness: 300 });

  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.id = "magnetic-cursor-global";
    styleEl.textContent = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(styleEl);

    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      cx.set(e.clientX - 10);
      cy.set(e.clientY - 10);
      trailX.set(e.clientX - 20);
      trailY.set(e.clientY - 20);
    };
    const onEnter = () => setIsHover(true);
    const onLeave = () => setIsHover(false);

    window.addEventListener("mousemove", onMove);

    const attachListeners = () => {
      const els = document.querySelectorAll("a, button, [data-cursor-hover]");
      els.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
      return els;
    };

    let els = attachListeners();

    const observer = new MutationObserver(() => {
      els.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      els = attachListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      els.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      observer.disconnect();
      document.getElementById("magnetic-cursor-global")?.remove();
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
    };
  }, [cx, cy, trailX, trailY]);

  return (
    <>
      <motion.div
        style={{ x: tx, y: ty, scale }}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white/40 pointer-events-none z-[9999] mix-blend-difference"
      />
      <motion.div
        style={{ x: sx, y: sy }}
        className="fixed top-0 left-0 w-5 h-5 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference"
      />
    </>
  );
}
