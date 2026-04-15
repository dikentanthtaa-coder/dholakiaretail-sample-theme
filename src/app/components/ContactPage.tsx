import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const ease = [0.76, 0, 0.24, 1] as const;

const inquiryTypes = ["General Inquiry", "Business Partnership", "Investor Relations", "Press & Media", "Careers", "Brand-Specific"];

const quickContacts = [
  { title: "Investor Relations", email: "ir@dholakiaretail.com", phone: "+91 63535 18935" },
  { title: "Press & Media", email: "press@dholakiaretail.com", phone: "+91 63535 18935" },
  { title: "Careers", email: "careers@dholakiaretail.com", phone: "+91 63535 18935" },
  { title: "Brand Inquiries", email: "brands@dholakiaretail.com", phone: "+91 63535 18935" },
];

// Background image — luxury retail / editorial
const BG_IMAGE = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=90&w=2400&auto=format&fit=crop";

const slideUp = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.12, duration: 1.1, ease },
  }),
};

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-bg-deep text-text-primary">

      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={BG_IMAGE}
            alt=""
            className="w-full h-full object-cover opacity-[0.08] dark:opacity-25 transition-opacity duration-700"
          />
          {/* Theme-aware overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-bg-deep via-bg-deep/80 to-bg-deep" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg-deep)_80%)]" />
        </div>

        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
          style={{
            width: "70vw",
            height: "70vw",
            background: "radial-gradient(circle, var(--brand-accent) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />


        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 py-32 max-w-[900px] mx-auto">

          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease }}
            className="font-grotesk inline-flex items-center gap-2 px-5 py-2 rounded-full border border-brand-primary/35 bg-brand-primary/7 mb-10 text-[12px] font-semibold tracking-[0.18em] uppercase text-brand-primary"
          >
            Contact Us
          </motion.div>

          {/* Main headline */}
          <div className="flex flex-col items-center gap-1">
            <div className="overflow-hidden pb-2">
              <motion.h1
                custom={0}
                initial="hidden"
                animate="visible"
                variants={slideUp}
                className="font-syne tracking-tighter text-text-primary text-[clamp(2.8rem,5.5vw,6rem)] font-bold"
              >
                Let's Build Something
              </motion.h1>
            </div>
            <div className="overflow-hidden pb-2">
              <motion.h1
                custom={1}
                initial="hidden"
                animate="visible"
                variants={slideUp}
                className="font-syne text-[clamp(2.8rem,5.5vw,6rem)] font-bold italic text-brand-primary tracking-[-0.02em]"
              >
                Extraordinary
              </motion.h1>
            </div>
          </div>

          {/* Sub-description */}
          <div className="overflow-hidden mt-8">
            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={slideUp}
              className="font-dm text-[clamp(1rem,1.6vw,1.15rem)] leading-[1.75] text-text-secondary max-w-[54ch]"
            >
              Whether you're a partner, investor, journalist, or future colleague—we're ready for
              the conversation. Step into the future of retail with us.
            </motion.p>
          </div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.9, ease }}
            className="flex flex-wrap items-center justify-center gap-4 mt-10"
          >
            <a
              href="#contact-form"
              className="font-grotesk group flex items-center gap-2 px-8 py-4 rounded-full transition-all text-[15px] font-bold shadow-xl"
              style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-deep)" }}
            >
              Contact Our Team
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              to="/careers"
              className="font-grotesk group flex items-center gap-2 px-8 py-4 rounded-full border border-glass-border text-text-secondary hover:text-text-primary transition-all hover:bg-glass-bg text-[15px] font-medium"
            >
              Explore Careers
            </Link>
          </motion.div>


        </div>
      </section>

      {/* ── Form + Info ────────────────────────────────────────────────────── */}
      <section id="contact-form" className="py-28 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-14 rounded-3xl text-center bg-brand-primary/6 border border-brand-primary/18"
                >
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                    <CheckCircle size={48} className="mx-auto text-brand-primary" />
                  </motion.div>
                  <h3 className="font-syne mt-6 text-text-primary text-[28px] font-bold">
                    Thank You
                  </h3>
                  <p className="font-dm mt-4 text-text-muted text-[16px]">
                    Your inquiry has been received. We'll respond within 2 business days.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="space-y-6"
                >
                  <div>
                    <label className="font-grotesk block mb-2 text-[13px] font-medium text-text-muted tracking-[0.08em] uppercase">
                      Reason for Inquiry
                    </label>
                    <select
                      className="font-dm w-full px-5 py-3.5 rounded-xl outline-none transition-all bg-bg-surface-elevated border border-glass-border text-text-primary focus:border-brand-primary/40 focus:bg-bg-surface text-[15px] shadow-sm"
                    >
                      {inquiryTypes.map((t) => <option key={t} className="bg-bg-surface text-text-primary">{t}</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["First Name", "Last Name"].map((label) => (
                      <div key={label}>
                        <label className="font-grotesk block mb-2 text-[13px] font-medium text-text-muted tracking-[0.08em] uppercase">
                          {label}
                        </label>
                        <input
                          type="text"
                          className="font-dm w-full px-5 py-3.5 rounded-xl outline-none transition-all bg-bg-surface-elevated border border-glass-border text-text-primary focus:border-brand-primary/40 focus:bg-bg-surface text-[15px] shadow-sm"
                        />
                      </div>
                    ))}
                  </div>

                  {[{ label: "Email", type: "email" }, { label: "Organization", type: "text" }].map(({ label, type }) => (
                    <div key={label}>
                      <label className="font-grotesk block mb-2 text-[13px] font-medium text-text-muted tracking-[0.08em] uppercase">
                        {label}
                      </label>
                      <input
                        type={type}
                        className="font-dm w-full px-5 py-3.5 rounded-xl outline-none transition-all bg-bg-surface-elevated border border-glass-border text-text-primary focus:border-brand-primary/40 focus:bg-bg-surface text-[15px] shadow-sm"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="font-grotesk block mb-2 text-[13px] font-medium text-text-muted tracking-[0.08em] uppercase">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      className="font-dm w-full px-5 py-3.5 rounded-xl outline-none resize-none transition-all bg-bg-surface-elevated border border-glass-border text-text-primary focus:border-brand-primary/40 focus:bg-bg-surface text-[15px] shadow-sm"
                    />
                  </div>

                  <motion.button
                    className="font-grotesk w-full py-4 rounded-full bg-black text-white dark:bg-white dark:text-black text-[15px] font-bold transition-all hover:scale-[1.01] active:scale-[0.99] shadow-xl"
                  >
                    Submit Inquiry
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {[
              {
                title: "Corporate Headquarters",
                address: "Dholakia Retail Private Limited\nPlot No. E-03, Gem & Jewellery Park, GHB, Ichhapore\nSurat, Gujarat – 394510, India\nCIN: U32111GJ2024PTC155690",
              },
              {
                title: "Mumbai Office",
                address: "Dholakia Retail — Mumbai\nBandra Kurla Complex\nMumbai 400051, Maharashtra",
              },
            ].map((office) => (
              <div
                key={office.title}
                className="p-8 rounded-2xl bg-bg-surface-elevated border border-glass-border shadow-sm"
              >
                <h3 className="font-syne text-text-primary text-[20px] font-bold">
                  {office.title}
                </h3>
                <div className="mt-4 flex items-start gap-3">
                  <MapPin size={16} className="mt-1 shrink-0 text-brand-primary" />
                  <p className="font-dm whitespace-pre-line text-[15px] leading-[1.7] text-text-secondary">
                    {office.address}
                  </p>
                </div>
              </div>
            ))}

            <div
              className="p-8 rounded-2xl bg-bg-surface-elevated border border-glass-border shadow-sm"
            >
              <h3 className="font-syne text-text-primary text-[20px] font-bold">
                Reach Us
              </h3>
              <div className="mt-4 space-y-4">
                {[
                  { Icon: Mail, text: "info@dholakiaretail.com" },
                  { Icon: Phone, text: "+91 63535 18935" },
                  { Icon: Clock, text: "Mon – Sat, 9:00 AM – 6:00 PM IST" },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <Icon size={16} className="shrink-0 text-brand-primary" />
                    <p className="font-dm text-[15px] text-text-secondary">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Quick Contacts ─────────────────────────────────────────────────── */}
      <section
        className="py-24 bg-brand-primary/2 border-t border-text-primary/7"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <span
              className="font-grotesk text-[12px] font-semibold tracking-[0.18em] uppercase text-brand-primary"
            >
              Direct Pathways
            </span>
            <h3
              className="font-syne mt-4 text-text-primary text-[clamp(1.6rem, 2.5vw, 2.4rem)] font-bold"
            >
              Connect with the Right Team
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickContacts.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl text-center cursor-pointer transition-all bg-bg-surface border border-glass-border hover:border-brand-primary/30 shadow-sm"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 bg-brand-primary/10"
                >
                  <Mail size={16} className="text-brand-primary" />
                </div>
                <h4 className="font-grotesk text-text-primary text-[14px] font-semibold">
                  {c.title}
                </h4>
                <p className="font-dm mt-2 text-[13px] text-text-secondary">
                  {c.email}
                </p>
                <p className="font-dm mt-1 text-[13px] text-text-muted">
                  {c.phone}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer note ───────────────────────────────────────────────────── */}
      <section className="py-10 text-center border-t border-text-primary/7">
        <p className="font-dm text-[15px] text-text-muted opacity-80">
          We aim to respond to all inquiries within 2 business days.
        </p>
      </section>
    </div>
  );
}
