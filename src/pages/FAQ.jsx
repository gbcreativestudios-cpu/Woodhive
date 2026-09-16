import PageHero from "../components/layout/PageHero";
import Accordion from "../components/ui/Accordion";
import Reveal from "../components/ui/Reveal";
import ClosingCTA from "../components/home/ClosingCTA";
import { FAQ_GROUPS } from "../data/faqs";
import { IMG } from "../lib/images";

export default function FAQ() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Answers before we begin"
        image={IMG.faqHero}
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

      <ClosingCTA
        title="Still have a question?"
        body="Send it our way — we're happy to walk through the details before you commit to anything."
      />
    </>
  );
}
