import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import Intro from "../components/home/Intro";
import Services from "../components/home/Services";
import CapabilitiesCTA from "../components/home/CapabilitiesCTA";
import Process from "../components/home/Process";
import SelectedWork from "../components/home/SelectedWork";
import FAQ from "../components/home/FAQ";
import Reviews from "../components/home/Reviews";
import ClosingCTA from "../components/home/ClosingCTA";
import page from "../../content/home/page.json";

/**
 * Which sections appear on the home page, and in what order, is controlled
 * from content/home/page.json (edited in Decap under Home Page → Section
 * Order) — a plain list of these keys. Dragging an entry reorders the
 * section, deleting one removes it, and adding one back (via the CMS's
 * "Add" button, which offers this same set as a dropdown) brings it back
 * with whatever content that section's own file already has. Each
 * section's actual copy still lives in and is edited from its own file
 * (Hero, Stats, Intro, etc. further down the same Home Page list) — this
 * file only controls the sequence.
 */
const SECTION_COMPONENTS = {
  hero: Hero,
  stats: Stats,
  intro: Intro,
  services: Services,
  capabilitiesCta: CapabilitiesCTA,
  process: Process,
  selectedWork: SelectedWork,
  faq: FAQ,
  reviews: Reviews,
  closingCta: ClosingCTA,
};

export default function Home() {
  return (
    <>
      {page.sections.map((key, i) => {
        const Section = SECTION_COMPONENTS[key];
        return Section ? <Section key={`${key}-${i}`} /> : null;
      })}
    </>
  );
}
