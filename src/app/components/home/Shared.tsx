import { motion, useMotionValue, useSpring, useTransform, useScroll, MotionValue } from "motion/react";
import { useRef, useEffect, useCallback, useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

/**
 * Hook: detect "I'm on a touch device or a mouse-free screen" so we can
 * skip mouse-driven parallax (saves an event listener firing 60 Hz).
 */
function useHasFineMouse() {
  const [fine, setFine] = useState(() =>
    typeof window === "undefined"
      ? true
      : window.matchMedia("(pointer: fine)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const handle = () => setFine(mq.matches);
    mq.addEventListener?.("change", handle);
    return () => mq.removeEventListener?.("change", handle);
  }, []);
  return fine;
}

// ─── Global mouse parallax hook ───────────────────────────────────────────────
export function useMouseParallax() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { damping: 60, stiffness: 350 });
  const smoothY = useSpring(rawY, { damping: 60, stiffness: 350 });
  const hasFineMouse = useHasFineMouse();
  useEffect(() => {
    if (!hasFineMouse) return;
    let raf = 0;
    let nextX = 0;
    let nextY = 0;
    const apply = () => {
      raf = 0;
      rawX.set(nextX);
      rawY.set(nextY);
    };
    const onMove = (e: MouseEvent) => {
      nextX = (e.clientX / window.innerWidth) * 2 - 1;
      nextY = (e.clientY / window.innerHeight) * 2 - 1;
      // Coalesce to one update per animation frame.
      if (!raf) raf = window.requestAnimationFrame(apply);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [rawX, rawY, hasFineMouse]);
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
const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 4,
  depth: 0.4 + Math.random() * 1.2,
  delay: Math.random() * 4,
  duration: 6 + Math.random() * 6,
}));

/**
 * Per-particle wrapper. We must NOT call useTransform inside .map() because
 * the parent re-renders would change hook order. Each particle owns its
 * hooks in its own component instance.
 */
function Particle({
  p,
  smoothX,
  smoothY,
}: {
  p: (typeof PARTICLES)[number];
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}) {
  const px = useTransform(smoothX, [-1, 1], [`${p.depth * 3}%`, `${-p.depth * 3}%`]);
  const py = useTransform(smoothY, [-1, 1], [`${p.depth * 3}%`, `${-p.depth * 3}%`]);
  return (
    <motion.div
      style={{
        x: px,
        y: py,
        left: `${p.x}%`,
        top: `${p.y}%`,
        position: "absolute",
        willChange: "transform",
      }}
    >
      <motion.div
        animate={{
          y: ["-8px", "8px", "-8px"],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: p.duration,
          delay: p.delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ width: p.size, height: p.size, willChange: "transform" }}
        className="bg-white"
        aria-hidden
      />
    </motion.div>
  );
}

export function FloatingParticles({
  smoothX,
  smoothY,
}: {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}) {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  if (reduced) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {PARTICLES.map((p) => (
        <Particle key={p.id} p={p} smoothX={smoothX} smoothY={smoothY} />
      ))}
    </div>
  );
}
