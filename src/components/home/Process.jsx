import Reveal from "../ui/Reveal";
import process from "../../../content/home/process.json";
import SectionLabel from "../ui/SectionLabel";

function ProcessStep({ step, index, total }) {
  const number = String(index + 1).padStart(2, "0");
  const numberBlock = (
    <div className="w-[72px] shrink-0 text-center sm:w-[92px]">
      <span className="t-stat leading-none text-ink-900">{number}</span>
      <span className="t-micro mt-1 block font-medium uppercase tracking-wide text-ink-900/75">
        Step {index + 1} of {total}
      </span>
    </div>
  );

  const card = (
    <div className="min-h-[124px] flex-1 rounded-md bg-ink-900 px-5 py-5 text-cream-50 sm:min-h-[136px] sm:px-8 sm:py-6">
      <h3 className="t-step leading-tight text-orange-500">{step.title}</h3>
      <p className="mt-1.5 max-w-2xl t-body leading-snug text-cream-50/90">{step.description}</p>
    </div>
  );

  return (
    <Reveal key={step.title} className={`flex w-full items-center gap-3 sm:w-[88%] sm:gap-5 ${index % 2 === 0 ? "justify-end" : "justify-start"}`}>
      {index % 2 === 0 ? <>{numberBlock}{card}</> : <>{card}{numberBlock}</>}
    </Reveal>
  );
}

export default function Process() {
  return (
    <section className="bg-cream-50 py-16 lg:py-24">
      <div className="mx-auto max-w-[1040px] px-5 sm:px-6">
        <Reveal className="mb-10 text-center sm:mb-14">
          <SectionLabel id="homeProcess" fallback={process.eyebrow} />
          <h2 className="mt-2.5 first:mt-0 t-process text-brown-900">{process.heading}</h2>
        </Reveal>
        <div className="space-y-5 sm:space-y-6">
          {process.steps.map((step, i) => (
            <ProcessStep key={step.title} step={step} index={i} total={process.steps.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
