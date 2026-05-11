import { Link } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function NotFound() {
  return (
    <div className="bg-white text-[#0B1426] min-h-screen flex items-center">
      <div className="max-w-[820px] mx-auto px-6 md:px-12 lg:px-20 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-6">
            404 · Page not found
          </p>
          <h1 className="font-syne font-normal italic leading-[1.06] tracking-[-0.02em] text-[clamp(2.4rem,5vw,4.4rem)]">
            This page does not exist — yet.
          </h1>
          <p className="font-dm text-[#0B1426]/65 mt-6 max-w-[58ch] mx-auto text-[clamp(1rem,1.3vw,1.13rem)] leading-[1.7]">
            The link you followed may have moved, expired, or never existed. Try one of the routes below.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <Link
              to="/"
              className="font-dm group inline-flex items-center gap-2 px-7 h-12 bg-[#3B6FFF] hover:bg-[#14275C] text-white rounded-sm text-[14px] font-semibold transition-colors duration-300"
            >
              <ArrowLeft size={15} /> Return home
            </Link>
            <Link
              to="/portfolio"
              className="font-dm inline-flex items-center gap-2 px-7 h-12 border border-[#0B1426]/30 text-[#0B1426] hover:border-[#3B6FFF] hover:text-[#3B6FFF] rounded-sm text-[14px] font-medium transition-all duration-300"
            >
              Explore portfolio
              <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
