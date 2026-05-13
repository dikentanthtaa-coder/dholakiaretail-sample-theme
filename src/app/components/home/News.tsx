import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ease, NEWS } from "./constants";

/**
 * P01-S08 — News / Press Preview · 3+1 card pattern
 */
export function NewsSection() {
  return (
    <section className="bg-white py-32 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-4">
              Newsroom
            </p>
            <h2 className="font-syne text-[#0B1426] font-normal leading-[1.1] tracking-[-0.02em] text-[clamp(1.8rem,3vw,2.6rem)] max-w-[20ch]">
              Stories, milestones, and perspectives from the house.
            </h2>
          </div>
          <Link
            to="/news"
            className="font-dm group inline-flex items-center gap-2 text-[#0B1426] hover:text-[#3B6FFF] transition-colors text-[13px] font-semibold"
          >
            View all news
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {NEWS.map((n, i) => (
            <motion.div
              key={n.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
            >
              <Link
                to={`/news/${n.slug}`}
                className="group flex flex-col h-full border border-[#0B1426]/10 hover:border-[#3B6FFF] transition-all duration-300 bg-white rounded-2xl overflow-hidden"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <ImageWithFallback
                    src={n.img}
                    alt={n.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="font-dm text-[#3B6FFF] text-[10px] font-medium tracking-[0.16em] uppercase">
                    {n.cat} · {n.date}
                  </p>
                  <h3 className="font-syne text-[#0B1426] mt-3 text-[18px] font-medium leading-[1.35] line-clamp-2">
                    {n.title}
                  </h3>
                  <p className="font-dm text-[#0B1426]/65 mt-3 text-[14px] leading-[1.6] line-clamp-2 flex-1">
                    {n.excerpt}
                  </p>
                  <span className="font-dm text-[#3B6FFF] mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.04em]">
                    Read
                    <ArrowRight
                      size={13}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* 4th anchor card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.32, ease }}
          >
            <Link
              to="/news"
              className="group flex flex-col h-full border border-[#0B1426]/10 hover:border-[#3B6FFF] bg-[#F5F5F7] hover:bg-white transition-all duration-300 p-8 rounded-2xl"
            >
              <ArrowUpRight
                size={28}
                className="text-[#3B6FFF] mb-auto group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
              />
              <h3 className="font-syne text-[#0B1426] mt-12 text-[clamp(1.4rem,2vw,1.8rem)] font-normal leading-[1.15]">
                View all
                <br />
                news
              </h3>
              <p className="font-dm text-[#0B1426]/55 mt-3 text-[13px]">
                Press releases, brand stories, and longform.
              </p>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
