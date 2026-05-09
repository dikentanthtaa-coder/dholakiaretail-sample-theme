import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

const ease = [0.76, 0, 0.24, 1] as const;

const content: Record<string, { title: string; intro: string; sections: { heading: string; body: string }[] }> = {
  privacy: {
    title: "Privacy Policy",
    intro: "Dholakia Retail Private Limited respects your privacy. This policy explains what information we collect, how we use it, and the rights you have over your data.",
    sections: [
      { heading: "Information you give us", body: "We collect information you provide through the contact form, newsletter subscription, and career applications: name, email address, organisation, and the message content. We retain this information solely to respond to your enquiry and, where applicable, to communicate further with your consent." },
      { heading: "Information we collect automatically", body: "We collect anonymised analytics through privacy-friendly tooling — page views, referrers, and aggregate traffic data. We do not use third-party advertising trackers. IP addresses are hashed for rate-limiting; raw IPs are not stored." },
      { heading: "Cookies", body: "We use a small number of strictly necessary cookies. See the Cookie Policy for the full list and how to manage preferences." },
      { heading: "How we use your information", body: "To respond to enquiries, route messages to the relevant internal team, send confirmations, and improve the editorial experience. We never sell your data." },
      { heading: "Your rights", body: "You may request access, correction, or deletion of your personal data at any time by writing to our compliance team. We will respond within the timeframes required under applicable data-protection law." },
      { heading: "Contact", body: "For any privacy enquiry, contact us via the form on the Contact page selecting 'General' as the inquiry type." },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    intro: "These terms govern your use of the Dholakia Retail website. By using the site, you agree to these terms.",
    sections: [
      { heading: "Acceptable use", body: "You may access and read the contents of this site for personal and informational purposes. You may not republish, mirror, or commercialise the content without written consent from Dholakia Retail Private Limited." },
      { heading: "Content accuracy", body: "We make every effort to keep the information accurate and up to date, but content may change without notice. We do not warrant the completeness or timeliness of all information." },
      { heading: "Intellectual property", body: "All trademarks, logos, copy, and imagery on this site are owned by Dholakia Retail Private Limited or its licensors and are protected by applicable intellectual-property law." },
      { heading: "Third-party links", body: "Some pages may link to external sites. Dholakia Retail is not responsible for the content, policies, or practices of those sites." },
      { heading: "Liability", body: "Dholakia Retail will not be liable for any indirect or consequential loss arising from the use of the site, to the extent permitted by law." },
      { heading: "Governing law", body: "These terms are governed by the laws of India, with exclusive jurisdiction in the courts of Surat, Gujarat." },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    intro: "This policy explains the cookies and similar technologies the Dholakia Retail website uses, and how you can manage your preferences.",
    sections: [
      { heading: "What cookies are", body: "Cookies are small text files placed on your device when you visit a website, used to make sites work or work more efficiently and to provide reporting information." },
      { heading: "Strictly necessary", body: "Used for core site functions — preserving your theme preference, rate-limiting form submissions, and maintaining session integrity. These cannot be disabled." },
      { heading: "Analytics", body: "We use privacy-friendly analytics that do not track individuals. No advertising or cross-site cookies are set." },
      { heading: "Managing preferences", body: "You can clear cookies or block them via your browser settings. Doing so may affect functionality." },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    intro: "Information on this website reflects current plans and statements at the time of publication. Forward-looking content is indicative, not guaranteed.",
    sections: [
      { heading: "Forward-looking statements", body: "Statements about future plans, brand launches, or partnerships are intentions at the time of writing. Actual outcomes may differ as circumstances evolve." },
      { heading: "ESG & sustainability", body: "Sustainability targets, launch timelines, and roadmap items reflect current intent. Reporting and certification statements are subject to ongoing audit and renewal." },
      { heading: "Third-party content", body: "References to external publications, certifications, and partner facilities are provided for context. Dholakia Retail does not control and is not responsible for the contents of external sources." },
    ],
  },
};

export function LegalPage() {
  const { slug } = useParams();
  const page = content[slug ?? "privacy"];

  if (!page) {
    return (
      <div className="bg-bg-deep text-text-primary min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-syne text-text-primary text-[clamp(2rem,4vw,3rem)] font-bold">Page not found</h1>
          <Link to="/" className="font-grotesk inline-flex items-center gap-2 mt-6 text-text-secondary hover:text-text-primary transition-colors text-[13px] uppercase tracking-[0.12em]">
            <ArrowLeft size={14} /> Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-deep text-text-primary">
      <section className="pt-40 pb-16 lg:pt-48 lg:pb-24 bg-bg-surface border-b border-glass-border">
        <div className="max-w-[860px] mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: ease }}>
            <span className="font-grotesk text-text-secondary tracking-[0.22em] uppercase text-[12px] font-semibold">Legal</span>
            <h1 className="font-syne mt-4 text-text-primary text-[clamp(2.4rem,4.5vw,3.8rem)] font-bold leading-[1.05] tracking-[-0.03em]">{page.title}</h1>
            <p className="font-dm mt-6 text-text-secondary text-[17px] leading-[1.85] max-w-2xl">{page.intro}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-[760px] mx-auto px-6 lg:px-10 space-y-10">
          {page.sections.map((s, i) => (
            <motion.div
              key={s.heading}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: ease }}
              className="border-t border-glass-border pt-10"
            >
              <h2 className="font-syne text-text-primary text-[clamp(1.2rem,2vw,1.6rem)] font-bold tracking-[-0.02em]">{s.heading}</h2>
              <p className="font-dm mt-4 text-text-secondary text-[16px] leading-[1.85]">{s.body}</p>
            </motion.div>
          ))}
          <div className="pt-12">
            <Link to="/" className="font-grotesk inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-[13px] uppercase tracking-[0.12em]">
              <ArrowLeft size={14} /> Back home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
