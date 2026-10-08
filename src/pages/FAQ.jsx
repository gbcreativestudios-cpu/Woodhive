import PageHero from "../components/layout/PageHero";
import Accordion from "../components/ui/Accordion";
import Reveal from "../components/ui/Reveal";
import ClosingCTA from "../components/home/ClosingCTA";
import { FAQ_GROUPS } from "../data/faqs";
import hero from "../../content/faq/hero.json";
import closing from "../../content/faq/closing-cta.json";

export default function FAQ() {
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        image={hero.image}
        minH="min-h-[42vh]"
      />

      <div className="mx-auto max-w-[760px] px-6 pb-6 pt-16">
        {FAQ_GROUPS.map((g) => (
          <div key={g.title} className="mb-12">
            <Reveal>
              <h2 className="mb-4.5 font-display text-[22px] text-brown-900">{g.title}</h2>
            </Reveal>
            <Accordion items={g.items} defaultOpen={-1} />
          </div>
        ))}
      </div>

      <ClosingCTA title={closing.title} body={closing.body} />
    </>
  );
}
