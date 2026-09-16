import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import Intro from "../components/home/Intro";
import Services from "../components/home/Services";
import CapabilitiesCTA from "../components/home/CapabilitiesCTA";
import Process from "../components/home/Process";
import SelectedWork from "../components/home/SelectedWork";
import FAQ from "../components/home/FAQ";
import ClosingCTA from "../components/home/ClosingCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Intro />
      <Services />
      <CapabilitiesCTA />
      <Process />
      <SelectedWork />
      <FAQ />
      <ClosingCTA />
    </>
  );
}
