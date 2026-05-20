import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import {
  ArrowRight,
  Mail,
  MapPin,
  Building2,
  Hash,
  Loader2,
  CheckCircle2,
  Briefcase,
  Newspaper,
  Handshake,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { COMPANY } from "./constants";

/* P12-S04 — inquiry types per build spec */
const INQUIRY_OPTIONS = [
  { id: "business", label: "Business & Partnerships", icon: Handshake },
  { id: "press", label: "Media & Press", icon: Newspaper },
  { id: "careers", label: "Careers", icon: Briefcase },
  { id: "brand", label: "Brand Inquiries", icon: Sparkles },
] as const;

/* P12-S02 — 4 routing cards · exact spec copy */
const ROUTING_CARDS = [
  {
    type: "business",
    title: "Business & Partnerships",
    body: "Investor relations, strategic alliances, supplier partnerships, and joint ventures.",
    email: "partnerships@dholakiaretail.com",
  },
  {
    type: "press",
    title: "Media & Press",
    body: "Press inquiries, interview requests, and access to the press kit.",
    email: "press@dholakiaretail.com",
  },
  {
    type: "careers",
    title: "Careers",
    body: "Profile submissions, role inquiries, and recruitment partnerships.",
    email: "careers@dholakiaretail.com",
  },
  {
    type: "brand",
    title: "Brand Inquiries",
    body: "Mayavé private viewings, brand development inquiries, future-territory proposals.",
    email: "info@dholakiaretail.com",
  },
] as const;

const CONFIRMATIONS: Record<string, string> = {
  business:
    "The business development team will respond within 2 business days.",
  press: "Our communications team will be in touch within 24 hours.",
  careers: "The talent team will respond within 5 business days.",
  brand: "A member of our brand team will follow up within 48 hours.",
};

const TYPE_ALIASES: Record<string, string> = {
  partnership: "business",
  partner: "business",
  investor: "business",
  appointment: "brand",
  general: "business",
};

/**
 * Page 12 — Contact
 */
export function ContactPage() {
  const [params] = useSearchParams();
  const queryType = params.get("type") ?? "business";
  const initialType = TYPE_ALIASES[queryType] ?? queryType;

  const [form, setForm] = useState({
    fullName: "",
    organisation: "",
    email: "",
    inquiryType: initialType,
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setForm((f) => ({ ...f, inquiryType: initialType }));
  }, [initialType]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.fullName.trim().length < 2) e.fullName = "Please share your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "A valid email is required.";
    if (form.organisation.trim().length < 2) e.organisation = "Tell us where you're writing from.";
    if (form.message.trim().length < 20) e.message = "Please share at least 20 characters.";
    return e;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-white text-[#0B1426]">
      {/* P12-S01 — Hero */}
      <section className="bg-white pt-40 lg:pt-52 pb-12 lg:pb-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
            Contact · Dholakia Retail
          </p>
          <h1 className="font-syne text-[#0B1426] font-normal leading-[1.05] tracking-[-0.02em] text-[clamp(2.4rem,5.5vw,5rem)] max-w-[18ch]">
            The next conversation begins here.
          </h1>
          <p className="font-dm text-[#0B1426]/65 max-w-[58ch] mt-6 text-[clamp(1rem,1.3vw,1.18rem)] leading-[1.7] font-light">
            Partnership, press, careers, or future brand development — write to us, and the right
            desk will respond.
          </p>
        </div>
      </section>

      {/* P12-S02 — Inquiry Routing */}
      <section className="bg-[#F5F5F7] py-20 border-y border-[#0B1426]/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-4">
            Choose the right desk
          </p>
          <h2 className="font-syne text-[#0B1426] font-normal text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.18] mb-10 max-w-[24ch]">
            Each desk reads its own inbox.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#0B1426]/10">
            {ROUTING_CARDS.map((c) => (
              <a
                key={c.type}
                href={`mailto:${c.email}`}
                className="bg-white p-8 lg:p-10 group hover:bg-[#3B6FFF] hover:text-white transition-colors duration-300"
              >
                <h3 className="font-syne text-[1.2rem] font-medium leading-[1.3]">{c.title}</h3>
                <p className="font-dm text-[#0B1426]/65 group-hover:text-white/80 mt-3 text-[14px] leading-[1.65]">
                  {c.body}
                </p>
                <p className="font-mono text-[#0B1426] group-hover:text-white mt-7 text-[12.5px] inline-flex items-center gap-2">
                  <Mail size={13} /> {c.email}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* P12-S03 — Corporate Identity + P12-S04 — Form */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          <div>
            <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
              Corporate identity
            </p>
            <h2 className="font-syne text-[#0B1426] font-normal text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.18]">
              The facts every desk needs.
            </h2>
            <dl className="mt-10 border-t border-[#0B1426]/10">
              {[
                { icon: Building2, label: "Legal name", value: COMPANY.legalName },
                { icon: Hash, label: "CIN", value: COMPANY.cin, mono: true },
                {
                  icon: MapPin,
                  label: "Registered Office",
                  value:
                    "Dholakia Ventures, Plot No. D-02 and D-11, Gem & Jewellery Park, GHB, Ichchhapor, Surat, Gujarat 394510, India",
                },
                { icon: Mail, label: "Email", value: "info@dholakiaretail.com", mailto: true, mono: true },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col md:flex-row md:items-start gap-3 md:gap-6 py-5 border-b border-[#0B1426]/10"
                >
                  <span className="hidden md:flex w-9 h-9 text-[#3B6FFF] items-center justify-center shrink-0">
                    <row.icon size={18} strokeWidth={1.5} />
                  </span>
                  <dt className="font-dm text-[#0B1426]/55 text-[11px] font-medium tracking-[0.16em] uppercase md:w-[160px] shrink-0">
                    {row.label}
                  </dt>
                  <dd className={`flex-1 ${row.mono ? "font-mono" : "font-dm"} text-[#0B1426] text-[15px] leading-[1.6]`}>
                    {row.mailto ? (
                      <a
                        href={`mailto:${row.value}`}
                        className="hover:text-[#3B6FFF] transition-colors underline-offset-4 hover:underline"
                      >
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* P12-S04 — Form */}
          <div id="write-to-us" className="scroll-mt-28">
            <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
              Write to us
            </p>
            <h2 className="font-syne text-[#0B1426] font-normal text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.18]">
              Send us a note.
            </h2>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="mt-9 space-y-6"
                >
                  <Field
                    label="Full Name"
                    error={errors.fullName}
                    input={
                      <input
                        type="text"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="w-full bg-transparent border-b border-[#0B1426]/25 focus:border-[#3B6FFF] outline-none py-3 font-dm text-[#0B1426] text-[16px] transition-colors"
                        autoComplete="name"
                      />
                    }
                  />
                  <Field
                    label="Company / Organisation"
                    error={errors.organisation}
                    input={
                      <input
                        type="text"
                        value={form.organisation}
                        onChange={(e) => setForm({ ...form, organisation: e.target.value })}
                        className="w-full bg-transparent border-b border-[#0B1426]/25 focus:border-[#3B6FFF] outline-none py-3 font-dm text-[#0B1426] text-[16px] transition-colors"
                        autoComplete="organization"
                      />
                    }
                  />
                  <Field
                    label="Email Address"
                    error={errors.email}
                    input={
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-transparent border-b border-[#0B1426]/25 focus:border-[#3B6FFF] outline-none py-3 font-dm text-[#0B1426] text-[16px] transition-colors"
                        autoComplete="email"
                      />
                    }
                  />
                  <Field
                    label="Inquiry Type"
                    input={
                      <select
                        value={form.inquiryType}
                        onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                        className="w-full bg-transparent border-b border-[#0B1426]/25 focus:border-[#3B6FFF] outline-none py-3 font-dm text-[#0B1426] text-[16px] transition-colors"
                      >
                        {INQUIRY_OPTIONS.map((o) => (
                          <option key={o.id} value={o.id}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    }
                  />
                  <Field
                    label="Message"
                    error={errors.message}
                    input={
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-transparent border-b border-[#0B1426]/25 focus:border-[#3B6FFF] outline-none py-3 font-dm text-[#0B1426] text-[16px] resize-none transition-colors"
                      />
                    }
                  />

                  <p className="font-dm text-[#0B1426]/55 text-[12.5px] leading-[1.55]">
                    Every message is read by a human within 2 business days.
                  </p>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="font-dm group inline-flex items-center gap-2 px-7 h-12 bg-[#3B6FFF] hover:bg-[#14275C] disabled:bg-[#3B6FFF]/60 text-white rounded-sm text-[14px] font-semibold transition-colors duration-300"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Send inquiry
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-12 p-8 border border-[#3B6FFF]/30 bg-[#3B6FFF]/5"
                >
                  <CheckCircle2 size={36} className="text-[#3B6FFF]" />
                  <h3 className="font-syne text-[#0B1426] mt-5 text-[clamp(1.4rem,2vw,1.8rem)] font-normal italic leading-[1.2]">
                    Thank you.
                  </h3>
                  <p className="font-dm text-[#0B1426]/72 mt-3 text-[15px] leading-[1.7]">
                    {CONFIRMATIONS[form.inquiryType] ?? CONFIRMATIONS.business}
                  </p>
                  <Link
                    to="/"
                    className="font-dm inline-flex items-center gap-2 mt-7 text-[#3B6FFF] text-[13px] font-semibold"
                  >
                    Back to home <ArrowRight size={14} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* P12-S05 — Closing Statement */}
      <section className="bg-[#F5F5F7] py-24 lg:py-32 border-t border-[#0B1426]/10">
        <div className="max-w-[820px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <h2 className="font-syne text-[#0B1426] font-normal text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.2]">
            Or write to us directly.
          </h2>
          <p className="font-dm text-[#0B1426]/65 mt-5 max-w-[58ch] mx-auto text-[1.05rem] leading-[1.7]">
            Prefer email? Reach the right desk through the addresses below — every inbox is monitored
            daily.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 mt-9 max-w-[640px] mx-auto text-left">
            {[
              ["Business", "partnerships@dholakiaretail.com"],
              ["Press", "press@dholakiaretail.com"],
              ["Careers", "careers@dholakiaretail.com"],
              ["Brand", "info@dholakiaretail.com"],
            ].map(([label, email]) => (
              <li key={email} className="flex items-center justify-between gap-3 border-b border-[#0B1426]/10 py-2">
                <span className="font-dm text-[#0B1426]/55 text-[11px] font-medium tracking-[0.14em] uppercase">
                  {label}
                </span>
                <a
                  href={`mailto:${email}`}
                  className="font-mono text-[#0B1426] hover:text-[#3B6FFF] underline-offset-4 hover:underline transition-colors text-[12.5px]"
                >
                  {email}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  input,
  error,
}: {
  label: string;
  input: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      <label className="font-dm text-[#0B1426]/55 text-[11px] font-medium tracking-[0.16em] uppercase block">
        {label}
      </label>
      {input}
      {error && (
        <p className="font-dm text-[#3B6FFF] mt-1.5 text-[12px]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
