import { motion, useSpring, useScroll } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#3B6FFF] origin-left z-[100]"
      style={{
        scaleX,
        // Promote to a compositor layer so scaleX doesn't trigger layout/paint.
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    />
  );
}
