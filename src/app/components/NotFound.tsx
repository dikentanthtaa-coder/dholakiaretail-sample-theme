import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

const syne = "'Syne', sans-serif";
const grotesk = "'Space Grotesk', sans-serif";
const dm = "'DM Sans', sans-serif";

export function NotFound() {
  return (
    <div className="py-40 lg:py-56 text-center">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-muted-foreground/20" style={{ fontFamily: syne, fontSize: 120, fontWeight: 800, lineHeight: 1 }}>404</span>
          <h1 className="mt-4" style={{ fontFamily: syne, fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em" }}>Page Not Found</h1>
          <p className="mt-4 text-muted-foreground" style={{ fontFamily: dm, fontSize: 17 }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="group inline-flex items-center gap-2 mt-10 px-8 py-4 bg-foreground text-white rounded-full" style={{ fontFamily: grotesk, fontSize: 14, fontWeight: 600 }}>
            <ArrowLeft size={16} /> Return Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
