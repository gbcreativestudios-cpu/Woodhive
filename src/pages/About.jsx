import PageHero from "../components/layout/PageHero";
import Story from "../components/about/Story";
import Values from "../components/about/Values";
import Team from "../components/about/Team";
import ClosingCTA from "../components/home/ClosingCTA";
import hero from "../../content/about/hero.json";
import closing from "../../content/about/closing-cta.json";
import { getLabel } from "../data/labels";

export default function About() {
  return (
    <>
      <PageHero
        eyebrow={getLabel("aboutHero", hero.eyebrow)}
        title={hero.title}
        subtitle={hero.subtitle}
        image={hero.image}
        overlayColor={hero.overlayColor}
        overlayOpacity={hero.overlayOpacity}
        minH="min-h-[54vh]"
      />
      <Story />
      <Values />
      <Team />
      <ClosingCTA title={closing.title} body={closing.body} />
    </>
  );
}
