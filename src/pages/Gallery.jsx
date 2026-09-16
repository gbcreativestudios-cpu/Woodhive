import PageHero from "../components/layout/PageHero";
import GalleryGrid from "../components/gallery/GalleryGrid";
import ClosingCTA from "../components/home/ClosingCTA";
import { IMG } from "../lib/images";

export default function Gallery() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Work across renovation, product, and rental"
        image={IMG.galleryHero}
        minH="min-h-[46vh]"
      />
      <GalleryGrid />
      <ClosingCTA
        title="See something you like?"
        body="Tell us which piece caught your eye, or bring your own idea — we'll help you shape it."
      />
    </>
  );
}
