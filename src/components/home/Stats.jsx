import { motion } from "framer-motion";
import AnimatedCounter from "../ui/AnimatedCounter";

const STATS = [
  { value: 340, suffix: "+", label: "SUCCESSFUL PROJECTS" },
  { value: 10, suffix: "+", label: "TEAM MEMBERS" },
  { value: 75, suffix: "+", label: "SATISFIED CLIENTS" },
  { value: 100, suffix: "%", label: "CLIENT SATISFACTION" },
];

export default function Stats() {
  return (
    <section className="bg-cream-50 px-6 py-14">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        className="mx-auto grid max-w-[1040px] grid-cols-2 gap-7 text-center sm:grid-cols-4"
      >
        {STATS.map((s) => (
          <motion.div
            key={s.label}
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          >
            <AnimatedCounter
              value={s.value}
              suffix={s.suffix}
              className="block font-sans text-[clamp(30px,4vw,44px)] font-bold text-brown-900"
            />
            <p className="mt-2 text-[12.5px] font-bold tracking-wide text-brown-900/75">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
