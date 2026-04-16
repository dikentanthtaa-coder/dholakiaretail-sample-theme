import { SectionFrame } from "../editorial/SectionFrame";
import { ClosingCta } from "../editorial/ClosingCta";
import { useNavigate } from "react-router";

export function CTASection() {
  const navigate = useNavigate();
  return (
    <SectionFrame tone="surface" padding="lg">
      <ClosingCta
        eyebrow="Begin the Conversation"
        title={
          <>
            Let's Build Something <br/><span className="italic font-light text-[var(--accent-metal)]">Extraordinary</span>
          </>
        }
        description="Whether you're a partner, investor, journalist, or future colleague—we're ready for the conversation. Step into the future of retail with us."
        primaryAction={{
            kind: "button",
            label: "Contact Our Team",
            onClick: () => navigate("/contact")
        }}
        secondaryAction={{
            kind: "button",
            label: "Explore Careers",
            onClick: () => navigate("/careers")
        }}
      />
    </SectionFrame>
  );
}
