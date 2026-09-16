import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import { IMG, OVERLAY } from "../../lib/images";

export default function Intro() {
  return (
    <section className="relative min-h-[560px] overflow-hidden">
      <img src={IMG.introBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ background: OVERLAY.gold }} />

      <div className="relative z-10 mx-auto max-w-[1040px] px-6 py-14">
        <Reveal
          variant="scale"
          className="grid items-center gap-8 rounded-[32px] bg-cream-50 p-5 shadow-[0_30px_60px_rgba(61,34,9,0.25)] md:grid-cols-[minmax(220px,380px)_1fr]"
        >
          <img
            src={IMG.introCard}
            alt="Finished living room interior"
            className="h-56 w-full rounded-[20px] object-cover sm:h-80"
          />
          <div className="px-1 py-3 sm:pr-5">
            <h2 className="font-display text-[clamp(26px,3.4vw,40px)] leading-[1.18] text-ink-900">
              More than woodwork. It&rsquo;s how a space comes together.
            </h2>
            <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-[#5b4636]">
              great space is rarely about one thing, its about elements that make those details
              feel intentional
            </p>
            <Link
              to="/about"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500 transition-colors hover:text-brown-900"
            >
              Discover Wood Hive <ArrowUpRight className="h-[15px] w-[15px]" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
