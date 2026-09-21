import { motion } from "framer-motion";
import { IMG, OVERLAY, SHOW_HERO_CAROUSEL_ON_MOBILE } from "../../lib/images";
import Button, { ButtonRow } from "../ui/Button";
import Navbar from "../layout/Navbar";
import HeroCarousel from "./HeroCarousel";
import { useInquiryModal } from "../../context/InquiryModalContext";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } } };
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

// The section is always a full viewport height now (mobile and desktop) —
// the extra "push down" room on mobile when the carousel is showing comes
// entirely from the bigger top padding below, not from an oversized min-height.
const heroMinH = "min-h-screen";
// Trimmed the mobile/sm top padding a bit (was pt-52/pt-56) to close up the
// blank space above the carousel that was left over on phones.
const heroPadTop = SHOW_HERO_CAROUSEL_ON_MOBILE
  ? "pt-44 sm:pt-48 lg:pt-40"
  : "pt-36 sm:pt-40 lg:pt-40";

export default function Hero() {
  const { openStartProject } = useInquiryModal();

  return (
    <section className={`relative overflow-hidden ${heroMinH}`}>
      <img src={IMG.homeHero} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ background: OVERLAY.hero }} />
      <Navbar />

      {/* Two levels, mirroring how Navbar builds its box: an outer element
          carries the px-4 sm:px-5 edge margin (same values as Navbar's
          own outer header padding), and this inner element is the
          mx-auto max-w-[1040px] box with NO padding of its own — so its
          edges land exactly on the same 1040px reference frame as the
          navbar card's visible border, instead of being inset an extra
          20px inside it like before. */}
      <div className="relative z-10 px-4 sm:px-5">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className={`mx-auto flex w-full max-w-[1040px] flex-col justify-start pb-16 lg:justify-end lg:pb-[100px] ${heroMinH} ${heroPadTop}`}
        >
        {/* CSS grid (not flex) for the row: grid tracks resolve to a
            definite height even when driven by content, so the image's
            h-full reliably stretches to match the text column instead of
            collapsing — flex's two-pass sizing was leaving it at 0 height
            on desktop since its only content is an absolutely-positioned
            <img>. Tighter gap-4 keeps image/heading/text close together on
            mobile. On desktop the columns are now 42/58 instead of a flat
            50/50 (lg:grid-cols-[0.72fr_1fr]) with a tighter lg:gap-10, so
            the text column gets noticeably more width to grow the heading
            into — this is the "expand to match navbar width" change. */}
        <div className="grid w-full grid-cols-1 items-start gap-4 lg:grid-cols-[0.72fr_1fr] lg:items-stretch lg:gap-10">
          <motion.div
            variants={item}
            className={`w-full lg:h-full ${SHOW_HERO_CAROUSEL_ON_MOBILE ? "" : "hidden lg:block"}`}
          >
            <HeroCarousel images={IMG.heroCarousel} />
          </motion.div>

          <div className="flex w-full flex-col items-start text-left">
            {/* Sized up from the previous 30–44px mobile clamp and fixed 36px
                desktop override, scaled proportionally to the wider column
                from the grid change above: mobile floor 30→32px, the
                sub-lg clamp ceiling 44→48px, and the lg override 36→44px.
                max-w-full (was max-w-xl) so the heading can use the whole
                widened column instead of being capped at 576px. NOTE: exact
                text-wrapping depends on the actual rendered "Jomolhari"
                font's metrics, which I can't preview in this environment —
                these sizes are a proportional best estimate, so check the
                two lines still hold at your real breakpoints and nudge the
                clamp/lg value a touch if either one slips to a 3rd line. */}
            <motion.h1
              variants={item}
              className="max-w-full font-display text-[clamp(32px,5vw,48px)] leading-[1.1] text-cream-50 lg:text-[44px]"
            >
              Crafted in Wood.
              <br />
              Defined by Elegance.
            </motion.h1>
            {/* Tight heading→paragraph gap, then a clearly bigger gap before
                the buttons — groups heading+text as one cluster, buttons as
                a distinct next step, at every breakpoint. */}
            <motion.p
              variants={item}
              className="mt-3 max-w-md text-[15px] leading-relaxed text-cream-50/85"
            >
              We create thoughtful woodwork that bring warmth, character, and a sense of finish to
              the spaces you live, work, gather, and celebrate in.
            </motion.p>
            {/* Full width and stacked through sm/md (per design), but from
                lg up the !-prefixed classes flip back to ButtonRow/Button's
                own row/auto-width behavior so the two buttons sit side by
                side on desktop instead of stacking at every breakpoint. */}
            <motion.div variants={item} className="mt-6 w-full lg:mt-12">
              <ButtonRow className="sm:!w-full sm:!flex-col lg:!w-auto lg:!flex-row lg:!gap-4">
                <Button to="/gallery" variant="gold" uppercase className="sm:!w-full lg:!w-auto">
                  EXPLORE OUR WORK
                </Button>
                <Button onClick={openStartProject} variant="cream" uppercase className="sm:!w-full lg:!w-auto">
                  START A PROJECT
                </Button>
              </ButtonRow>
            </motion.div>
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
