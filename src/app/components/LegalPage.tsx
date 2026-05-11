import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Mail, Settings } from "lucide-react";

const ease = [0.65, 0, 0.35, 1] as const;

type LegalDoc = {
  title: string;
  lead: string;
  sections: { heading: string; body: string }[];
  closer: { heading: string; body: string; ctaLabel: string; ctaHref: string; ctaIcon?: "mail" | "settings" };
};

const LEGAL: Record<string, LegalDoc> = {
  privacy: {
    title: "Privacy Policy",
    lead:
      "Dholakia Retail Private Limited respects the privacy of every visitor to dholakiaretail.com. This document explains what we collect, why we collect it, how we use it, and the rights you retain over your personal data.",
    sections: [
      {
        heading: "1. Information we collect",
        body:
          "We collect information you provide directly (such as your name, email, organisation, and inquiry message via the contact form), information collected automatically (IP address, device, browser, page-level analytics), and information from third parties (where you choose to authenticate via LinkedIn or share content).",
      },
      {
        heading: "2. How we use your information",
        body:
          "Personal data is used solely to respond to your inquiries, process partnership or career applications, send opt-in newsletters, improve site performance, and meet legal obligations. We do not sell, rent, or share your personal data with advertisers.",
      },
      {
        heading: "3. Cookies and analytics",
        body:
          "Refer to the Cookie Policy for full details. In summary: essential cookies always run; analytics and preference cookies require your consent via the cookie banner.",
      },
      {
        heading: "4. Data retention",
        body:
          "Inquiry records are retained for 36 months from last contact; analytics data for 26 months; newsletter subscriptions until you unsubscribe. Records may be retained longer where law requires.",
      },
      {
        heading: "5. Your rights",
        body:
          "You may request access, correction, deletion, or export of your personal data, or object to specific processing. Email privacy@dholakiaretail.com — we respond within 30 days.",
      },
      {
        heading: "6. Contact",
        body:
          "Data Protection Officer · Dholakia Retail Private Limited · Plot No. E-03, Gem & Jewellery Park, GHB, Ichhapore, Surat, Gujarat – 394510 · privacy@dholakiaretail.com",
      },
    ],
    closer: {
      heading: "Questions about your data?",
      body: "Reach the Data Protection Officer directly. We commit to a 30-day response window for any privacy-related inquiry.",
      ctaLabel: "Contact privacy@dholakiaretail.com",
      ctaHref: "mailto:privacy@dholakiaretail.com",
      ctaIcon: "mail",
    },
  },
  terms: {
    title: "Terms & Conditions",
    lead:
      "These terms govern your use of dholakiaretail.com. By accessing the site you accept these terms. If you do not accept them, please discontinue use.",
    sections: [
      {
        heading: "1. Acceptance of terms",
        body:
          "By accessing or using dholakiaretail.com you agree to be bound by these Terms & Conditions and by all applicable laws and regulations. If you disagree with any of these terms, you are prohibited from using or accessing this site.",
      },
      {
        heading: "2. Use license",
        body:
          "Permission is granted to view and download materials from this site for personal, non-commercial reference only. This license does not grant ownership and may be terminated at any time.",
      },
      {
        heading: "3. Intellectual property",
        body:
          "All content, brand marks (including 'Dholakia Retail' and 'Mayavé'), logos, photography, copy, and designs are the intellectual property of Dholakia Retail Private Limited and protected under Indian and international copyright and trademark law. Unauthorised reproduction is prohibited.",
      },
      {
        heading: "4. Disclaimer",
        body:
          "Materials on this site are provided 'as is'. Dholakia Retail makes no warranties, expressed or implied, regarding accuracy, completeness, or fitness for purpose. Refer to the Disclaimer document for full terms.",
      },
      {
        heading: "5. Limitations",
        body:
          "In no event shall Dholakia Retail or its affiliates be liable for damages (including loss of data, business interruption, or profit) arising from use or inability to use this site.",
      },
      {
        heading: "6. Governing law",
        body:
          "These terms are governed by the laws of India. Any disputes are subject to the exclusive jurisdiction of the courts of Surat, Gujarat.",
      },
    ],
    closer: {
      heading: "Questions about these terms?",
      body: "For clarifications regarding our terms of service, partnership agreements, or commercial use, contact our legal team directly.",
      ctaLabel: "Contact legal@dholakiaretail.com",
      ctaHref: "mailto:legal@dholakiaretail.com",
      ctaIcon: "mail",
    },
  },
  cookies: {
    title: "Cookie Policy",
    lead:
      "Cookies are small text files placed on your device when you visit a website. This page explains which cookies dholakiaretail.com uses, what they do, and how you can manage your consent.",
    sections: [
      {
        heading: "1. What are cookies?",
        body:
          "Cookies are small text files stored by your browser when you visit a site. They allow sites to remember information about your visit — preferences, login state, analytics — across pages and sessions.",
      },
      {
        heading: "2. Cookies we use",
        body:
          "We use four categories: essential cookies (required for site function — e.g. session, CSRF token), preference cookies (e.g. language toggle), analytics cookies (e.g. PostHog, anonymised), and marketing cookies (none currently active).",
      },
      {
        heading: "3. Managing your consent",
        body:
          "On your first visit, a cookie consent banner offers Accept All / Reject All / Customise. You can revisit your preferences any time via the Cookie Settings link in the footer.",
      },
      {
        heading: "4. Third-party cookies",
        body:
          "Some embedded content (such as YouTube video players or Vimeo embeds) may set their own cookies when you interact with them. These are governed by the third party's policy and are loaded only when you engage with that content.",
      },
    ],
    closer: {
      heading: "Manage your cookie preferences.",
      body: "Update your consent at any time. Changes apply immediately and persist across sessions on this device.",
      ctaLabel: "Open Cookie Settings",
      ctaHref: "#cookie-settings",
      ctaIcon: "settings",
    },
  },
  disclaimer: {
    title: "Disclaimer",
    lead:
      "The information on this site is provided in good faith for general informational purposes only.",
    sections: [
      {
        heading: "1. General disclaimer",
        body:
          "Dholakia Retail Private Limited makes no representations or warranties, expressed or implied, about the completeness, accuracy, reliability, suitability, or availability of any information, products, services, or related graphics.",
      },
      {
        heading: "2. External links",
        body:
          "This site may contain links to external websites that are not under our control. The inclusion of such links does not imply endorsement of the views expressed therein. Dholakia Retail is not responsible for the content of external sites.",
      },
      {
        heading: "3. Forward-looking statements",
        body:
          "Sustainability targets, product launch timelines, and roadmap items reflect current plans and assumptions. Actual outcomes may differ. Investors and partners should not rely solely on forward-looking statements when making decisions.",
      },
      {
        heading: "4. Professional advice",
        body:
          "Information presented on this site does not constitute professional, legal, financial, or investment advice. For advice on any matter, please consult a qualified professional.",
      },
    ],
    closer: {
      heading: "Questions about specific statements?",
      body: "For inquiries about forward-looking statements, investor materials, or any other content, reach our investor relations or legal team.",
      ctaLabel: "Contact ir@dholakiaretail.com",
      ctaHref: "mailto:ir@dholakiaretail.com",
      ctaIcon: "mail",
    },
  },
};

/**
 * Pages 14–17 — Legal documents
 */
export function LegalPage() {
  const { slug } = useParams();
  const doc = LEGAL[slug ?? "privacy"] ?? LEGAL.privacy;
  const Icon = doc.closer.ctaIcon === "settings" ? Settings : Mail;

  return (
    <div className="bg-white text-[#0B1426]">
      {/* P14-S01 — Hero */}
      <section className="bg-[#F5F5F7] pt-40 lg:pt-52 pb-20 lg:pb-24 border-b border-[#0B1426]/10">
        <div className="max-w-[760px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <p className="font-dm text-[#3B6FFF] text-[11px] font-medium tracking-[0.22em] uppercase mb-5">
            Legal
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="font-syne text-[#0B1426] font-normal leading-[1.06] tracking-[-0.02em] text-[clamp(2.2rem,4vw,3.6rem)]"
          >
            {doc.title}
          </motion.h1>
          <p className="font-dm text-[#0B1426]/55 mt-5 text-[14px]">Last updated: 14 March 2026</p>
          <p className="font-dm text-[#0B1426]/72 mt-8 text-[clamp(1rem,1.3vw,1.13rem)] leading-[1.7]">
            {doc.lead}
          </p>
          <div className="mx-auto mt-10 h-px w-32 bg-[#3B6FFF]" />
        </div>
      </section>

      {/* P14-S02 — Body */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[760px] mx-auto px-6 md:px-12 lg:px-20">
          {doc.sections.map((s, i) => (
            <motion.div
              key={s.heading}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease }}
              className="mb-10 pb-10 border-b border-[#6B8AC9]/30 last:border-b-0"
            >
              <h2 className="font-syne text-[#0B1426] font-medium text-[clamp(1.2rem,1.8vw,1.5rem)] leading-[1.3]">
                {s.heading}
              </h2>
              <p className="font-dm text-[#0B1426] mt-4 text-[clamp(1rem,1.2vw,1.1rem)] leading-[1.85]">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* P14-S03 — Closer */}
      <section className="bg-[#F5F5F7] py-24 lg:py-32 border-t border-[#0B1426]/10">
        <div className="max-w-[540px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <div className="mx-auto mb-10 h-px w-24 bg-[#3B6FFF]" />
          <h2 className="font-syne text-[#0B1426] font-normal text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.2]">
            {doc.closer.heading}
          </h2>
          <p className="font-dm text-[#0B1426]/65 mt-6 text-[1.05rem] leading-[1.7]">
            {doc.closer.body}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <a
              href={doc.closer.ctaHref}
              className="font-dm group inline-flex items-center gap-2 px-7 h-12 bg-[#3B6FFF] hover:bg-[#14275C] text-white rounded-sm text-[14px] font-semibold transition-colors duration-300"
            >
              <Icon size={15} /> {doc.closer.ctaLabel}
            </a>
            <Link
              to="/"
              className="font-dm inline-flex items-center gap-2 px-7 h-12 border border-[#0B1426]/30 text-[#0B1426] hover:border-[#3B6FFF] hover:text-[#3B6FFF] rounded-sm text-[14px] font-medium transition-all duration-300"
            >
              <ArrowLeft size={15} /> Back to home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
