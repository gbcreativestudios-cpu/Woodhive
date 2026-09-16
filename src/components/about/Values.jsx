import Reveal from "../ui/Reveal";
import { IMG } from "../../lib/images";

const VALUES = [
  {
    img: IMG.value1,
    title: "Craft over shortcuts",
    d: "Every joint, finish, and structural decision is made for durability first, appearance second — the two usually agree.",
  },
  {
    img: IMG.value2,
    title: "Clarity before build",
    d: "We scope, measure, and confirm before a single cut is made, so there are no surprises mid-project.",
  },
  {
    img: IMG.value3,
    title: "Built for real use",
    d: "Furniture gets sat on, arches get leaned against, basements get lived in — we build for that reality.",
  },
];

export default function Values() {
  return (
    <section className="bg-sand-100 px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-[1040px]">
        <Reveal className="max-w-md">
          <p className="text-[13.5px] font-bold text-orange-500">What we stand for</p>
          <h2 className="mt-2.5 font-display text-[clamp(26px,3.4vw,36px)] text-brown-900">How we work</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <img src={v.img} alt="" className="h-48 w-full rounded-[20px] object-cover" />
              <h3 className="mt-4 font-display text-[19px] text-brown-900">{v.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#5b4636]">{v.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
