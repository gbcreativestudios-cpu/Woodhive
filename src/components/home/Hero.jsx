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

      {/* max-w-[1040px] matches the site's standard content width (used by
          the nav and every other section) so the hero lines up with them. */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex min-h-[92vh] w-full max-w-[1040px] flex-col justify-start px-6 pb-16 pt-36 sm:pt-40 lg:justify-end lg:pb-[100px]"
      >
        {/* CSS grid (not flex) for the row: grid tracks resolve to a
            definite height even when driven by content, so the image's
            h-full reliably stretches to match the text column instead of
            collapsing — flex's two-pass sizing was leaving it at 0 height
            on desktop since its only content is an absolutely-positioned
            <img>. */}
        <div className="grid w-full grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-14">
          <motion.div variants={item} className="w-full lg:h-full">
            <HeroCarousel images={IMG.heroCarousel} />
          </motion.div>

          <div className="flex w-full flex-col items-start text-left">
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
            {/* Buttons stay full width at every breakpoint (not just
                mobile) — the !-prefixed classes override ButtonRow/Button's
                own sm:w-auto default, which otherwise shrinks them to fit
                their text from sm upward. */}
            <motion.div variants={item} className="mt-8 w-full">
              <ButtonRow className="sm:!w-full sm:!flex-col">
                <Button to="/gallery" variant="gold" uppercase className="sm:!w-full">
                  EXPLORE OUR WORK
                </Button>
                <Button onClick={openStartProject} variant="cream" uppercase className="sm:!w-full">
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
