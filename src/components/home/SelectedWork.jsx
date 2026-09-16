import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import { IMG } from "../../lib/images";

const WORKS = [
  { img: IMG.work1, title: "Monolith Dining Table", category: "PRODUCT" },
  { img: IMG.work2, title: "Staircase Restring", category: "MAINTENANCE" },
];

export default function SelectedWork() {
  return (
    <section className="bg-sand-100 px-6 py-16">
      <div className="mx-auto max-w-[1040px]">
        <Reveal className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-[clamp(26px,3.4vw,36px)] text-brown-900">Selected Work</h2>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brown-900 transition-colors hover:text-orange-500"
          >
            View portfolio gallery <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {WORKS.map((w, i) => (
            <Reveal key={w.title} variant="scale" delay={i * 0.1}>
              <Link to="/gallery" className="group block">
                <img
                  src={w.img}
                  alt={w.title}
                  className="h-56 w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-[1.01] sm:h-72"
                />
                <h3 className="mt-4 font-display text-lg text-brown-900">{w.title}</h3>
                <p className="mt-1 text-xs font-bold tracking-wide text-orange-500">{w.category}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
