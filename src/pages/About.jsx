import PageHero from "../components/layout/PageHero";
import Story from "../components/about/Story";
import Values from "../components/about/Values";
import Team from "../components/about/Team";
import ClosingCTA from "../components/home/ClosingCTA";
import { IMG } from "../lib/images";

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About The Wood Hive"
        title="Craftsmanship built on structural intelligence"
        subtitle="A small studio of woodworkers and structural specialists building renovation, product, and rental work that's made to last."
        image={IMG.aboutHero}
        minH="min-h-[54vh]"
      />
      <Story />
      <Values />
      <Team />
      <ClosingCTA
        title="Want to work with us?"
        body="Tell us about your space, your product idea, or your event — we'll take it from there."
      />
    </>
  );
}
