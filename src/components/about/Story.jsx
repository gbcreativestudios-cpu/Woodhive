import Reveal from "../ui/Reveal";
import story from "../../../content/about/story.json";
import SectionLabel from "../ui/SectionLabel";

export default function Story() {
  return (
    <section className="mx-auto grid max-w-[1040px] items-center gap-10 px-6 py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:py-20">
      <Reveal variant="left">
        <img
          src={story.image}
          alt="The Wood Hive workshop"
          className="h-72 w-full rounded-lg object-cover sm:h-[460px]"
        />
      </Reveal>
      <Reveal variant="right">
        <SectionLabel id="aboutStory" fallback={story.eyebrow} />
        <h2 className="mt-2.5 first:mt-0 t-section leading-tight text-brown-900">
          {story.heading}
        </h2>
        <p className="mt-4 t-body-lg leading-[1.7] text-[#5b4636]">{story.paragraph1}</p>
        <p className="mt-3.5 t-body-lg leading-[1.7] text-[#5b4636]">{story.paragraph2}</p>
      </Reveal>
    </section>
  );
}
