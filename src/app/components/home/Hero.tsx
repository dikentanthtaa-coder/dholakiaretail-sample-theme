import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { navLinks, LOGO_URL } from "../Layout";
import { slideUp, ease } from "./constants";
import { Header } from "../Header";

interface HeroProps {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}

export function Hero({ smoothX, smoothY }: HeroProps) {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const heroOp = useTransform(heroScroll, [0, 0.65], [1, 0]);
  const textY = useTransform(heroScroll, [0, 1], ["0%", "-20%"]);

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden">
      {/* Image background */}
      <img
        src="/images/hero-bg.jpg"
        alt="Dholakia Retail Campus"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Header is now fixed globally via the Header component */}
      <Header variant="hero" />

      <motion.div style={{ y: textY, opacity: heroOp }}
        className="absolute bottom-0 left-0 right-0 z-10 pb-24 md:pb-28 lg:pb-32 px-6 md:px-12 lg:px-16"
      >
        <div className="max-w-[1600px] mx-auto flex flex-col items-center text-center">
          <div className="overflow-hidden mb-6">
            <motion.p custom={0} initial="hidden" animate="visible" variants={slideUp}
              className="font-dm text-white tracking-[0.22em] uppercase text-[12px] font-medium"
            >Dholakia Retail Private Limited</motion.p>
          </div>
          <div className="max-w-6xl w-full flex flex-col items-center gap-0">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="font-syne text-[clamp(3rem,10vw,10rem)] font-black leading-[0.9] tracking-[-0.045em] text-white text-center"
            >
              PRECISION<br />
              <span className="italic font-light opacity-85">EMOTION</span>
            </motion.h1>
            
            <div className="overflow-hidden mt-10 max-w-xl text-center">
              <motion.p custom={3} initial="hidden" animate="visible" variants={slideUp}
                className="font-dm text-white/60 leading-[1.7] text-[clamp(1rem,1.8vw,1.3rem)] font-light"
              >Heritage-rooted. Innovation-driven. A legacy of master craftsmanship, forging the future of luxury retail.</motion.p>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 1, ease: ease }}
            className="flex flex-wrap justify-center gap-5 mt-12"
          >
            <Link to="/portfolio" data-cursor-hover
              className="font-dm group relative overflow-hidden px-9 py-4 bg-white text-black rounded-full text-[14px] font-semibold"
            >
              <span className="relative z-10 flex items-center gap-2">Explore Portfolio <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span>
              <div className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500" style={{ transitionTimingFunction: `cubic-bezier(${ease})` }} />
            </Link>
            <Link to="/about" data-cursor-hover
              className="font-dm px-9 py-4 border border-white/25 text-white rounded-full hover:bg-white/10 transition-all text-[14px] font-medium"
            >Discover the Group</Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
      >
        {/* Mouse outline */}
        <div className="w-[26px] h-[42px] rounded-full border-2 border-white/40 flex items-start justify-center pt-2 relative">
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-[3px] h-[7px] rounded-full bg-white"
          />
        </div>
        {/* Chevron arrows */}
        <motion.div
          animate={{ y: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center -mt-1"
        >
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" className="opacity-50">
            <path d="M1 1L7 7L13 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
