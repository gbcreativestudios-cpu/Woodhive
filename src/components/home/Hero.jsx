import { motion } from "framer-motion";
import { IMG, OVERLAY } from "../../lib/images";
import Button, { ButtonRow } from "../ui/Button";
import Navbar from "../layout/Navbar";
import { useInquiryModal } from "../../context/InquiryModalContext";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } } };
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const { openStartProject } = useInquiryModal();

  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      <img src={IMG.homeHero} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ background: OVERLAY.hero }} />
      <Navbar />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex min-h-[88vh] flex-col items-center justify-center px-6 pb-16 pt-32 text-center"
      >
        <motion.h1
          variants={item}
          className="max-w-3xl font-display text-[clamp(34px,6vw,58px)] leading-[1.1] text-cream-50"
        >
          Crafted in Wood.
          <br />
          Defined by Elegance.
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-5 max-w-xl text-[15px] leading-relaxed text-cream-50/85"
        >
          We create thoughtful woodwork that bring warmth, character, and a sense of finish to the
          spaces you live, work, gather, and celebrate in.
        </motion.p>
        <motion.div variants={item} className="mt-8 w-full max-w-sm sm:max-w-none">
          <ButtonRow center>
            <Button to="/gallery" variant="gold" uppercase>
              EXPLORE OUR WORK
            </Button>
            <Button onClick={openStartProject} variant="cream" uppercase>
              START A PROJECT
            </Button>
          </ButtonRow>
        </motion.div>
      </motion.div>
    </section>
  );
}
