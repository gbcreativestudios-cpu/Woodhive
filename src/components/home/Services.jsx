import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import { SERVICES } from "../../data/services";
import intro from "../../../content/home/services-intro.json";
import SectionLabel from "../ui/SectionLabel";

export default function Services() {
  return (
    <section className="mx-auto max-w-[1040px] px-6 py-16">
      <Reveal className="max-w-md">
        <SectionLabel id="homeServices" fallback={intro.eyebrow} />
        <h2 className="mt-2.5 first:mt-0 t-section text-brown-900">{intro.heading}</h2>
      </Reveal>

      <div className="mt-12 flex flex-col gap-14">
        {SERVICES.map((s, i) => (
          <div key={s.slug} className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-center lg:gap-10">
            <Reveal variant={i % 2 === 0 ? "left" : "right"}>
              <img
                src={s.img}
                alt={s.title}
                className="h-56 w-full rounded-lg object-cover sm:h-80"
              />
            </Reveal>
            <Reveal variant="up" delay={0.1}>
              <h3 className="t-card-lg text-brown-900">{s.title}</h3>
              <p className="mt-2.5 t-body leading-relaxed text-[#5b4636]">{s.description}</p>
              <Link
                to={`/services/${s.slug}`}
                className="mt-8 inline-flex items-center gap-1.5 t-body font-semibold text-brown-900 transition-colors hover:text-orange-500"
              >
                Explore {s.navLabel} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
