import PageHero from "../components/layout/PageHero";
import GalleryGrid from "../components/gallery/GalleryGrid";
import ClosingCTA from "../components/home/ClosingCTA";
import hero from "../../content/gallery/hero.json";
import closing from "../../content/gallery/closing-cta.json";

export default function Gallery() {
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        image={hero.image}
        minH="min-h-[46vh]"
      />
      <GalleryGrid />
      <ClosingCTA title={closing.title} body={closing.body} />
    </>
  );
}
