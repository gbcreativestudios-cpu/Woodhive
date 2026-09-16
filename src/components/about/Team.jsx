import Reveal from "../ui/Reveal";
import { IMG } from "../../lib/images";

const TEAM = [
  { img: IMG.member1, name: "Studio Lead", role: "Founder & Lead Craftsman" },
  { img: IMG.member2, name: "Project Manager", role: "Client & Site Coordination" },
  { img: IMG.member3, name: "Structural Specialist", role: "Renovation & Maintenance" },
  { img: IMG.member4, name: "Production Lead", role: "Wooden Products & Rentals" },
];

export default function Team() {
  return (
    <section className="mx-auto max-w-[1040px] px-6 py-16 lg:py-20">
      <Reveal className="max-w-md">
        <p className="text-[13.5px] font-bold text-orange-500">The people behind it</p>
        <h2 className="mt-2.5 font-display text-[clamp(26px,3.4vw,36px)] text-brown-900">Our team</h2>
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {TEAM.map((m, i) => (
          <Reveal key={m.name} variant="scale" delay={i * 0.06}>
            <img src={m.img} alt={m.role} className="h-52 w-full rounded-lg object-cover" />
            <h3 className="mt-3.5 font-display text-base text-brown-900">{m.name}</h3>
            <p className="mt-1 text-[12.5px] text-[#5b4636]">{m.role}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
