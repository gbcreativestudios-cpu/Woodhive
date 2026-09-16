import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { OVERLAY } from "../../lib/images";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export default function PageHero({ eyebrow, title, subtitle, image, minH = "min-h-[48vh]" }) {
  return (
    <section className={`relative overflow-hidden ${minH}`}>
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ background: OVERLAY.pageHero }} />
      <Navbar />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={`relative z-10 flex flex-col items-center justify-center px-6 pb-14 pt-36 text-center ${minH}`}
      >
        {eyebrow && (
          <motion.span variants={item} className="mb-3.5 text-[13px] font-bold tracking-wide text-gold-400">
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          variants={item}
          className="max-w-2xl font-display text-[clamp(32px,5vw,48px)] leading-[1.15] text-cream-50"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p variants={item} className="mt-4 max-w-lg text-[15px] leading-relaxed text-cream-50/85">
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
