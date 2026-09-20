import { motion } from "framer-motion";
import { IMG, OVERLAY } from "../../lib/images";
import Button, { ButtonRow } from "../ui/Button";
import Navbar from "../layout/Navbar";
import HeroCarousel from "./HeroCarousel";
import { useInquiryModal } from "../../context/InquiryModalContext";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } } };
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const { openStartProject } = useInquiryModal();

  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      <img src={IMG.homeHero} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ background: OVERLAY.hero }} />
      <Navbar />

      {/* Outer flex-col: content sits at the top on mobile (natural reading
          order under the nav) but drops to the BOTTOM on desktop, padded up
          from the edge — not vertically centered. */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex min-h-[92vh] w-full max-w-[1200px] flex-col justify-start px-6 pb-16 pt-36 sm:pt-40 lg:justify-end lg:px-10 lg:pb-[100px]"
      >
        {/* Inner row: image + text. `lg:items-stretch` (the flex default) is
            what makes the image match the text column's height exactly on
            desktop instead of keeping its own fixed ratio. */}
        <div className="flex w-full flex-col items-start gap-10 lg:flex-row lg:gap-14">
          <motion.div variants={item} className="w-full lg:flex-1">
            <HeroCarousel images={IMG.heroCarousel} />
          </motion.div>

          <div className="flex w-full flex-col items-start text-left lg:flex-1">
            <motion.h1
              variants={item}
              className="max-w-xl font-display text-[clamp(34px,5vw,52px)] leading-[1.1] text-cream-50"
            >
              Crafted in Wood.
              <br />
              Defined by Elegance.
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-5 max-w-md text-[15px] leading-relaxed text-cream-50/85"
            >
              We create thoughtful woodwork that bring warmth, character, and a sense of finish to
              the spaces you live, work, gather, and celebrate in.
            </motion.p>
            <motion.div variants={item} className="mt-8 w-full max-w-sm sm:max-w-none">
              <ButtonRow>
                <Button to="/gallery" variant="gold" uppercase>
                  EXPLORE OUR WORK
                </Button>
                <Button onClick={openStartProject} variant="cream" uppercase>
                  START A PROJECT
                </Button>
              </ButtonRow>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
