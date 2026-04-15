import { Link } from "react-router";
import { ArrowUpRight, LayoutGrid } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// ─── Typography tokens ────────────────────────────────────────────────────────
const syne    = "'Syne', sans-serif";
const grotesk = "'Space Grotesk', sans-serif";
const dm      = "'DM Sans', sans-serif";

// ─── Images ──────────────────────────────────────────────────────────────────
const IMGS = {
  bg:       "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=90&w=2400&auto=format&fit=crop",
  card1:    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=85&w=900&auto=format&fit=crop",
  card2:    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=85&w=900&auto=format&fit=crop",
  card3:    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=85&w=900&auto=format&fit=crop",
};

const ease = [0.76, 0, 0.24, 1] as const;

// ─── Floating shape ───────────────────────────────────────────────────────────
function Shape({
  size, color, className, delay = 0, radius = "20%",
}: {
  size: number; color: string; className?: string; delay?: number; radius?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.9, ease }}
      className={`absolute pointer-events-none ${className ?? ""}`}
      style={{ width: size, height: size, background: color, borderRadius: radius }}
    />
  );
}

// ─── Floating image card ──────────────────────────────────────────────────────
function FloatingCard({
  src, alt, className, delay = 0, mx, my,
}: {
  src: string; alt: string; className?: string; delay?: number;
  mx: import("motion/react").MotionValue<string>;
  my: import("motion/react").MotionValue<string>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 1.2, ease }}
      style={{ x: mx, y: my }}
      className={`absolute overflow-hidden shadow-2xl pointer-events-none ${className ?? ""}`}
      style={{ borderRadius: "1.5rem" }}
    >
      <ImageWithFallback
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}

// ─── Text slide-up variant ────────────────────────────────────────────────────
const slideUp = {
  hidden:  { y: "110%", opacity: 0 },
  visible: (i: number) => ({
    y: 0, opacity: 1,
    transition: { delay: i * 0.12, duration: 1.1, ease },
  }),
};

// ─── HeroBanner ──────────────────────────────────────────────────────────────
export function HeroBanner() {
  // Global mouse parallax
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { damping: 55, stiffness: 320 });
  const smoothY = useSpring(rawY, { damping: 55, stiffness: 320 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  // Parallax transforms for each depth layer
  const d1x = useTransform(smoothX, [-1, 1], ["2.5%", "-2.5%"]);
  const d1y = useTransform(smoothY, [-1, 1], ["2.5%", "-2.5%"]);
  const d2x = useTransform(smoothX, [-1, 1], ["5%",   "-5%"]);
  const d2y = useTransform(smoothY, [-1, 1], ["5%",   "-5%"]);
  const d3x = useTransform(smoothX, [-1, 1], ["-4%",  "4%"]);
  const d3y = useTransform(smoothY, [-1, 1], ["-4%",  "4%"]);
  const d4x = useTransform(smoothX, [-1, 1], ["6%",   "-6%"]);
  const d4y = useTransform(smoothY, [-1, 1], ["6%",   "-6%"]);
  const d5x = useTransform(smoothX, [-1, 1], ["-7%",  "7%"]);
  const d5y = useTransform(smoothY, [-1, 1], ["-7%",  "7%"]);

  return (
    <section
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#0e0e0e" }}
    >
      {/* ── Background image with dark overlay ─────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={IMGS.bg}
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e0e]/60 via-[#0e0e0e]/50 to-[#0e0e0e]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0e0e0e_90%)]" />
      </div>

      {/* ── Sticky Navbar ──────────────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="relative z-30 flex items-center justify-between px-6 md:px-12 py-6"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-label="Dholakia Retail" role="img">
            <rect width="36" height="36" rx="8" fill="#D4AF37" />
            <path d="M8 10 L18 8 L28 10 L28 26 L18 28 L8 26 Z" stroke="#0e0e0e" strokeWidth="2" fill="none" />
            <circle cx="18" cy="18" r="4" fill="#0e0e0e" />
          </svg>
          <span
            className="text-white tracking-tight"
            style={{ fontFamily: syne, fontSize: 20, fontWeight: 700 }}
          >
            Dholakia
            <span style={{ color: "#D4AF37", fontWeight: 300 }}> Retail</span>
          </span>
        </Link>

        {/* Nav links – desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {["Overview", "Portfolio", "About", "Sustainability"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-white/70 hover:text-white transition-colors"
              style={{ fontFamily: grotesk, fontSize: 14, fontWeight: 500 }}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#D4AF37] text-black hover:bg-[#c9a52e] transition-colors"
            style={{ fontFamily: grotesk, fontSize: 14, fontWeight: 600 }}
          >
            Book a Meeting
            <ArrowUpRight size={16} />
          </Link>
          <button
            aria-label="Open menu"
            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <LayoutGrid size={18} />
          </button>
        </div>
      </motion.header>

      {/* ── Hero Content ───────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-8 pb-24">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 mb-10"
        >
          <span
            className="text-white/60"
            style={{ fontFamily: grotesk, fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" }}
          >
            India's Premier Luxury Retail Group
          </span>
        </motion.div>

        {/* Main headline — 3 lines like RACON360 */}
        <div className="flex flex-col items-center gap-1 max-w-5xl">
          <div className="overflow-hidden pb-2">
            <motion.h1
              custom={0}
              initial="hidden"
              animate="visible"
              variants={slideUp}
              className="text-white tracking-tighter"
              style={{ fontFamily: syne, fontSize: "clamp(2.6rem, 6vw, 6.5rem)", fontWeight: 700 }}
            >
              The all-in-one platform
            </motion.h1>
          </div>
          <div className="overflow-hidden pb-2">
            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={slideUp}
              className="tracking-tighter"
              style={{
                fontFamily: syne,
                fontSize: "clamp(2.6rem, 6vw, 6.5rem)",
                fontWeight: 700,
                color: "#D4AF37",
              }}
            >
              for the finest
            </motion.h1>
          </div>
          <div className="overflow-hidden pb-2">
            <motion.h1
              custom={2}
              initial="hidden"
              animate="visible"
              variants={slideUp}
              className="tracking-tighter"
              style={{
                fontFamily: syne,
                fontSize: "clamp(2.6rem, 6vw, 6.5rem)",
                fontWeight: 700,
                color: "#D4AF37",
              }}
            >
              luxury experience
            </motion.h1>
          </div>
        </div>

        {/* Sub-description */}
        <div className="overflow-hidden mt-8 max-w-2xl">
          <motion.p
            custom={3}
            initial="hidden"
            animate="visible"
            variants={slideUp}
            className="text-white/55"
            style={{ fontFamily: dm, fontSize: "clamp(1rem, 1.8vw, 1.15rem)", lineHeight: 1.7 }}
          >
            Manage every aspect of your luxury retail journey with a heritage-rooted,
            innovation-driven portfolio that is transparent, scalable, and future-proof.
          </motion.p>
        </div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease }}
          className="flex flex-wrap items-center justify-center gap-4 mt-10"
        >
          <Link
            to="/portfolio"
            className="group flex items-center gap-2 px-8 py-4 rounded-full bg-[#D4AF37] text-black hover:bg-[#c9a52e] transition-colors"
            style={{ fontFamily: grotesk, fontSize: 15, fontWeight: 600 }}
          >
            Explore Portfolio
            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            to="/about"
            className="group flex items-center gap-2 px-8 py-4 rounded-full border border-white/25 text-white hover:bg-white/10 transition-colors"
            style={{ fontFamily: grotesk, fontSize: 15, fontWeight: 500 }}
          >
            All Features
            <LayoutGrid size={16} />
          </Link>
        </motion.div>
      </div>

      {/* ── Floating image cards (RACON360-style scattered layout) ─────────── */}

      {/* Card 1 — left side, large */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, x: -40 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1.3, ease }}
        style={{ x: d2x, y: d2y }}
        className="absolute left-[2%] bottom-[12%] w-[18vw] min-w-[150px] max-w-[260px] aspect-square overflow-hidden pointer-events-none shadow-2xl z-20"
        css={{ borderRadius: "1.5rem" }}
      >
        <div style={{ borderRadius: "1.5rem", overflow: "hidden", width: "100%", height: "100%" }}>
          <ImageWithFallback src={IMGS.card1} alt="Jewellery manufacturing" className="w-full h-full object-cover" />
        </div>
      </motion.div>

      {/* Card 2 — left, lower portrait */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 1.3, ease }}
        style={{ x: d3x, y: d3y }}
        className="absolute left-[0%] bottom-[38%] w-[11vw] min-w-[100px] max-w-[170px] h-[22vw] max-h-[200px] overflow-hidden pointer-events-none shadow-2xl z-20"
      >
        <div style={{ borderRadius: "0 1.5rem 1.5rem 0", overflow: "hidden", width: "100%", height: "100%" }}>
          <ImageWithFallback src={IMGS.card3} alt="Luxury jewellery" className="w-full h-full object-cover" />
        </div>
      </motion.div>

      {/* Card 3 — right, medium with play button feel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, x: 40 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.55, duration: 1.3, ease }}
        style={{ x: d4x, y: d4y }}
        className="absolute right-[4%] bottom-[16%] w-[19vw] min-w-[160px] max-w-[280px] aspect-square overflow-hidden pointer-events-none shadow-2xl z-20"
      >
        <div style={{ borderRadius: "1.5rem", overflow: "hidden", width: "100%", height: "100%", position: "relative" }}>
          <ImageWithFallback src={IMGS.card2} alt="Diamond ring" className="w-full h-full object-cover" />
          {/* Play icon overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.25)" }}
          >
            <div
              className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Decorative geometric shapes (RACON360 colored squares) ──────────── */}

      {/* Gold square – top right */}
      <Shape size={80}  color="#D4AF37" className="top-[18%] right-[14%] z-10" delay={0.7}  radius="18px" />
      {/* Gold square – smaller mid right */}
      <Shape size={48}  color="#D4AF37" className="top-[36%] right-[9%]  z-10" delay={0.85} radius="12px" />
      {/* White/accent square – bottom left area */}
      <Shape size={36}  color="rgba(255,255,255,0.18)" className="bottom-[28%] left-[20%] z-10" delay={0.9} radius="8px" />
      {/* White dot – mid left */}
      <Shape size={16}  color="rgba(255,255,255,0.25)" className="bottom-[45%] left-[22%] z-10" delay={1.0} radius="50%" />
      {/* Accent dot – center low */}
      <Shape size={22}  color="#D4AF37" className="bottom-[22%] left-[48%] z-10" delay={1.05} radius="50%" />
      {/* Large muted square – far right bottom */}
      <Shape size={120} color="rgba(212,175,55,0.12)" className="bottom-[6%] right-[0%] z-10" delay={0.6} radius="1.5rem 0 0 0" />
      {/* Small white square – right mid */}
      <Shape size={28}  color="rgba(255,255,255,0.15)" className="top-[55%] right-[20%] z-10" delay={1.1} radius="6px" />

      {/* ── Subtle ambient glow ──────────────────────────────────────────────── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
        style={{
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </section>
  );
}
