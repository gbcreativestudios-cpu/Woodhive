import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import { useInquiryModal } from "../../context/InquiryModalContext";

/**
 * `to` links somewhere; omit it and the button opens the general
 * Start a Project modal instead (the default — most closing CTAs are a
 * generic "let's talk" rather than a link to a specific page).
 */
export default function ClosingCTA({
  title = "Let's build something purposeful",
  body = "Whether you're transforming a space, creating something custom, or preparing for an event, tell us what you're working on.",
  cta = "Start a Conversation",
  to,
}) {
  const { openStartProject } = useInquiryModal();

  return (
    <section className="bg-orange-500 px-6 py-16 text-center">
      <Reveal variant="scale" className="mx-auto max-w-xl">
        <h2 className="font-display text-[clamp(26px,3.4vw,36px)] text-cream-50">{title}</h2>
        <p className="mx-auto mt-3.5 max-w-md text-sm leading-relaxed text-cream-50/90">{body}</p>
        <div className="mt-6 flex justify-center">
          {to ? (
            <Button to={to} variant="brown">
              {cta}
            </Button>
          ) : (
            <Button onClick={openStartProject} variant="brown">
              {cta}
            </Button>
          )}
        </div>
      </Reveal>
    </section>
  );
}
