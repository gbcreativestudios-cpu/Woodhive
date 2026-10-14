import Reveal from "../ui/Reveal";
import team from "../../../content/about/team.json";
import SectionLabel from "../ui/SectionLabel";

export default function Team() {
  return (
    <section className="mx-auto max-w-[1040px] px-6 py-16 lg:py-20">
      <Reveal className="max-w-md">
        <SectionLabel id="aboutTeam" fallback={team.eyebrow} />
        <h2 className="mt-2.5 first:mt-0 t-section text-brown-900">{team.heading}</h2>
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {team.members.map((m, i) => (
          <Reveal key={m.name} variant="scale" delay={i * 0.06}>
            <img src={m.img} alt={m.role} className="h-52 w-full rounded-lg object-cover" />
            <h3 className="mt-3.5 t-mini text-brown-900">{m.name}</h3>
            <p className="mt-1 t-tiny text-[#5b4636]">{m.role}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
