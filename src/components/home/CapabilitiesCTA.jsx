import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import { useInquiryModal } from "../../context/InquiryModalContext";

export default function CapabilitiesCTA() {
  const { openStartProject } = useInquiryModal();

  return (
    <section className="bg-sand-100 px-6 py-16 text-center">
      <Reveal variant="scale" className="mx-auto max-w-xl">
        <p className="text-[13.5px] font-bold text-orange-500">Limitless capabilities</p>
        <h2 className="mt-2.5 font-display text-[clamp(26px,3.4vw,36px)] text-brown-900">
          Have something else in mind?
        </h2>
        <p className="mx-auto mt-3.5 max-w-md text-sm leading-relaxed text-[#5b4636]">
          Bring us the idea, the problem, or the space. We&rsquo;ll work with you to understand
          what it needs and determine the right way to build it.
        </p>
        <div className="mt-6 flex justify-center">
          <Button onClick={openStartProject} variant="brown">
            Tell Us What You Need
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
