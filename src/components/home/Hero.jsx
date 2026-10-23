import { motion } from "framer-motion";
import { buildHeroOverlay } from "../../lib/images";
import Button, { ButtonRow } from "../ui/Button";
import Navbar from "../layout/Navbar";
import AnimatedCounter from "../ui/AnimatedCounter";
import { useInquiryModal } from "../../context/InquiryModalContext";
import hero from "../../../content/home/hero.json";
import stats from "../../../content/home/stats.json";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } } };
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const { openStartProject } = useInquiryModal();

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-brown-950">
      <img
        src={hero.backgroundImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0" style={{ background: buildHeroOverlay(hero) }} />
      <Navbar />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1040px] items-end px-6 pb-10 pt-32 sm:pb-14 lg:pb-16"
      >
        <div className="grid w-full grid-cols-1 items-end gap-y-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)] lg:gap-x-12">
          <div className="flex flex-col items-start text-left">
            <motion.h1 variants={item} className="max-w-2xl t-hero leading-[1.05] text-cream-50">
              {hero.headingLine1}
              <br />
              {hero.headingLine2}
            </motion.h1>
            <motion.p variants={item} className="mt-4 max-w-xl t-banner leading-relaxed text-cream-50/90">
              {hero.paragraph}
            </motion.p>
            <motion.div variants={item} className="mt-6 w-full sm:w-auto">
              <ButtonRow className="flex-wrap gap-3">
                <Button
                  to="/gallery"
                  variant="gold"
                  uppercase
                  className="order-2 w-full sm:w-auto lg:order-1"
                >
                  {hero.primaryButtonLabel}
                </Button>
                <Button
                  onClick={openStartProject}
                  variant="cream"
                  uppercase
                  className="order-1 w-full sm:w-auto lg:order-2"
                >
                  {hero.secondaryButtonLabel}
                </Button>
              </ButtonRow>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-5 border-t border-cream-50/30 pt-5 lg:gap-8 lg:border-t-0 lg:pt-0">
            {stats.items.map((stat) => (
              <motion.div key={stat.label} variants={item}>
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="block t-stat text-cream-50"
                />
                <p className="mt-2 max-w-[12ch] t-tiny font-bold tracking-wide text-cream-50/85">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
