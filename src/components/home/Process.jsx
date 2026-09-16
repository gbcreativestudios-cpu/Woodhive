import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "../ui/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Tell us what you need",
    d: "Share your vision, spatial challenge, repair requirement, or event concept through our tailored inquiry forms.",
  },
  {
    n: "02",
    title: "We understand the project",
    d: "We analyze structural requirements, material compatibility, and functional goals to design a cohesive system.",
  },
  {
    n: "03",
    title: "We build with intention",
    d: "Crafted in our studio or executed on-site by experienced woodworkers and structural specialists with uncompromising rigor.",
  },
  {
    n: "04",
    title: "A finished environment",
    d: "You receive a refined, durable, and purposeful finished space, custom product, or event installation ready for life.",
  },
];

/**
 * Each card sticks at an incrementing offset so the cards pile into a stack
 * as you scroll. Cards underneath scale down and dim to build depth.
 */
function StackCard({ step, index, total }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 0.32", "end 0.18"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  // Dimming is done with an opaque scrim, not card opacity — a translucent
  // card would let the text of the card beneath it bleed through the stack.
  const scrim = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.25, 0.55]);

  const topOffset = 110 + index * 16;

  return (
    <div ref={cardRef} className="sticky" style={{ top: topOffset, zIndex: index + 1 }}>
      <motion.div
        style={{ scale, transformOrigin: "center top" }}
        className="relative mb-5 overflow-hidden rounded-3xl bg-cream-50 px-7 py-8 shadow-[0_16px_40px_rgba(36,20,8,0.28)] sm:px-9 sm:py-10"
      >
        <div className="flex items-baseline gap-4">
          <span className="font-display text-2xl text-orange-500">{step.n}</span>
          <span className="text-[11px] font-semibold tracking-wide text-brown-900/40">
            STEP {index + 1} OF {total}
          </span>
        </div>
        <h3 className="mt-3 font-display text-xl text-brown-900 sm:text-2xl">{step.title}</h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-brown-900/60">{step.d}</p>

        {/* Scrim darkens cards as they recede into the stack */}
        <motion.div
          style={{ opacity: scrim }}
          className="pointer-events-none absolute inset-0 bg-brown-950"
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
}

export default function Process() {
  return (
    <section className="bg-brown-900 py-16 lg:py-24">
      <div className="mx-auto max-w-[900px] px-6">
        <Reveal className="text-center">
          <p className="text-[13.5px] font-bold text-gold-400">Our Process</p>
          <h2 className="mt-2.5 font-display text-3xl text-cream-50 lg:text-4xl">
            From idea to masterpiece
          </h2>
        </Reveal>

        {/* Extra bottom padding gives the last card room to settle in the stack */}
        <div className="mt-12 pb-[30vh]">
          {STEPS.map((step, i) => (
            <StackCard key={step.n} step={step} index={i} total={STEPS.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
