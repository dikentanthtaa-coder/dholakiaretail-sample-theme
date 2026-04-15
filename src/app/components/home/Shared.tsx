import { motion, useMotionValue, useSpring, useTransform, useScroll, MotionValue } from "motion/react";
import { useRef, useEffect, useCallback } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

// ─── Global mouse parallax hook ───────────────────────────────────────────────
export function useMouseParallax() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { damping: 60, stiffness: 350 });
  const smoothY = useSpring(rawY, { damping: 60, stiffness: 350 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);
  return { smoothX, smoothY };
}

// ─── Per-element local mouse tilt hook ───────────────────────────────────────
export function useTilt(strength = 12) {
  const ref = useRef<HTMLDivElement>(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springRotX = useSpring(rotX, { damping: 30, stiffness: 200 });
  const springRotY = useSpring(rotY, { damping: 30, stiffness: 200 });
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    rotX.set(-ny * strength);
    rotY.set(nx * strength);
  }, [rotX, rotY, strength]);
  const onMouseLeave = useCallback(() => { rotX.set(0); rotY.set(0); }, [rotX, rotY]);
  return { ref, springRotX, springRotY, onMouseMove, onMouseLeave };
}

// ─── Parallax layer ─────────────────────────────────────────────────────────────
export function ParallaxLayer({
  children, smoothX, smoothY, depth = 1, className = "",
}: {
  children: React.ReactNode;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  depth?: number;
  className?: string;
}) {
  const px = useTransform(smoothX, [-1, 1], [`${depth * 2.5}%`, `${-depth * 2.5}%`]);
  const py = useTransform(smoothY, [-1, 1], [`${depth * 2.5}%`, `${-depth * 2.5}%`]);
  return (
    <motion.div style={{ x: px, y: py }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Cinematic scroll+mouse parallax image ─────────────────────────────────────────
export function ParallaxImage({
  src, alt, className, smoothX, smoothY,
}: {
  src: string; alt: string; className?: string;
  smoothX: MotionValue<number>; smoothY: MotionValue<number>;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scrollY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const mx = useTransform(smoothX, [-1, 1], ["1.8%", "-1.8%"]);
  const my = useTransform(smoothY, [-1, 1], ["1.8%", "-1.8%"]);
  return (
    <div ref={ref} className={`overflow-hidden relative ${className ?? ""}`}>
      <motion.div style={{ y: scrollY, scale: scrollScale }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
        <motion.div style={{ x: mx, y: my }} className="w-full h-full">
          <ImageWithFallback src={src} alt={alt} className="w-full h-full object-cover" />
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Floating particles ────────────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 4,
  depth: 0.4 + Math.random() * 1.2,
  delay: Math.random() * 4,
  duration: 6 + Math.random() * 6,
}));

export function FloatingParticles({ smoothX, smoothY }: { smoothX: MotionValue<number>; smoothY: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {PARTICLES.map(p => {
        const px = useTransform(smoothX, [-1, 1], [`${p.depth * 3}%`, `${-p.depth * 3}%`]);
        const py = useTransform(smoothY, [-1, 1], [`${p.depth * 3}%`, `${-p.depth * 3}%`]);
        return (
          <motion.div key={p.id} style={{ x: px, y: py, left: `${p.x}%`, top: `${p.y}%`, position: "absolute" }}>
            <motion.div
              animate={{ y: ["-8px", "8px", "-8px"], rotate: [0, 45, 90, 135, 180], opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: p.size, height: p.size }}
              className="bg-white" aria-hidden
            />
          </motion.div>
        );
      })}
    </div>
  );
}
