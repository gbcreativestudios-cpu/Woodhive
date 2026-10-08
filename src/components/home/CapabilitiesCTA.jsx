import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import { useInquiryModal } from "../../context/InquiryModalContext";
import content from "../../../content/home/capabilities-cta.json";

export default function CapabilitiesCTA() {
  const { openStartProject } = useInquiryModal();

  return (
    <section className="bg-sand-100 px-6 py-16 text-center">
      <Reveal variant="scale" className="mx-auto max-w-xl">
        <p className="text-[13.5px] font-bold text-orange-500">{content.eyebrow}</p>
        <h2 className="mt-2.5 font-display text-[clamp(26px,3.4vw,36px)] text-brown-900">
          {content.heading}
        </h2>
        <p className="mx-auto mt-3.5 max-w-md text-sm leading-relaxed text-[#5b4636]">
          {content.paragraph}
        </p>
        <div className="mt-6 flex justify-center">
          <Button onClick={openStartProject} variant="brown">
            {content.buttonLabel}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
