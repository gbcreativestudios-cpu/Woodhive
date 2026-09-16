import Reveal from "../ui/Reveal";
import { IMG } from "../../lib/images";

export default function Story() {
  return (
    <section className="mx-auto grid max-w-[1040px] items-center gap-10 px-6 py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:py-20">
      <Reveal variant="left">
        <img
          src={IMG.story}
          alt="The Wood Hive workshop"
          className="h-72 w-full rounded-3xl object-cover sm:h-[460px]"
        />
      </Reveal>
      <Reveal variant="right">
        <p className="text-[13.5px] font-bold text-orange-500">Our story</p>
        <h2 className="mt-2.5 font-display text-[clamp(26px,3.4vw,36px)] leading-tight text-brown-900">
          Built by people who take wood seriously
        </h2>
        <p className="mt-4 text-[14.5px] leading-[1.7] text-[#5b4636]">
          The Wood Hive started as a small renovation crew solving one basement at a time. Over the
          years the work grew into three connected disciplines — structural renovation, custom
          wooden products, and event rental structures — all held together by the same standard of
          craft.
        </p>
        <p className="mt-3.5 text-[14.5px] leading-[1.7] text-[#5b4636]">
          Today the studio is a small team of woodworkers, structural specialists, and project
          leads who treat every space — a home, a storefront, a wedding tent — as something worth
          building with intention.
        </p>
      </Reveal>
    </section>
  );
}
