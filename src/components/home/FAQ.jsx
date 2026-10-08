import { Link } from "react-router-dom";
import Reveal from "../ui/Reveal";
import Accordion from "../ui/Accordion";
import { HOME_FAQS } from "../../data/faqs";
import teaser from "../../../content/home/faq-teaser.json";

export default function FAQ() {
  return (
    <section className="mx-auto max-w-[800px] px-6 py-16">
      <Reveal>
        <p className="text-[13.5px] font-bold text-orange-500">{teaser.eyebrow}</p>
        <h2 className="mt-2.5 font-display text-[clamp(26px,3.4vw,36px)] text-brown-900">
          {teaser.heading}
        </h2>
        <p className="mt-3.5 max-w-lg text-sm leading-relaxed text-[#5b4636]">
          {teaser.paragraph}
        </p>
      </Reveal>

      <div className="mt-8">
        <Accordion items={HOME_FAQS} />
      </div>

      <div className="mt-7 text-center">
        <Link to="/faq" className="text-[13.5px] font-semibold text-brown-900 underline hover:text-orange-500">
          {teaser.linkLabel}
        </Link>
      </div>
    </section>
  );
}
