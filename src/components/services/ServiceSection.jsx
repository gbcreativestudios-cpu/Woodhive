import Reveal from "../ui/Reveal";
import InquiryForm from "./InquiryForm";

export default function ServiceSection({
  id,
  eyebrow,
  title,
  description,
  points,
  img,
  reverse,
  formName,
  formUpload,
}) {
  return (
    <section id={id} className="mx-auto max-w-[1040px] scroll-mt-24 px-6 py-16 lg:py-20">
      <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <Reveal
          variant={reverse ? "right" : "left"}
          className={reverse ? "lg:order-2" : "lg:order-1"}
        >
          <img src={img} alt={title} className="h-64 w-full rounded-3xl object-cover sm:h-[380px]" />
          <p className="mt-6 text-[13px] font-bold text-orange-500">{eyebrow}</p>
          <h2 className="mt-2 font-display text-[clamp(24px,3vw,32px)] text-brown-900">{title}</h2>
          <p className="mt-3.5 text-sm leading-[1.7] text-[#5b4636]">{description}</p>
          <ul className="mt-4.5 flex flex-col gap-2.5">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-[13.5px] text-[#5b4636]">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal variant="up" delay={0.1} className={reverse ? "lg:order-1" : "lg:order-2"}>
          <InquiryForm name={formName} withUpload={formUpload} />
        </Reveal>
      </div>
    </section>
  );
}
