import { useState, useSyncExternalStore } from "react";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import { REVIEWS } from "../../data/reviews";
import section from "../../../content/reviews/section.json";

function useMediaQuery(query) {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

// Seconds of travel per card — keeps the scroll speed the same however many reviews there are.
const SECONDS_PER_CARD = 7;
// Cards per half-track; enough to overfill the widest screen so the loop never shows a gap.
const MIN_CARDS_PER_HALF = 12;

/**
 * Reviews section. Below the threshold the cards sit in a static, centred
 * grid. At or above it (3 on desktop, 2 on mobile — both editable in the CMS)
 * they become a continuously scrolling ticker that pauses on hover/focus.
 */
export default function Reviews() {
  const [formOpen, setFormOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const threshold = isDesktop ? section.tickerFromDesktop : section.tickerFromMobile;
  const ticker = REVIEWS.length >= Math.max(1, threshold);

  const copies = Math.ceil(MIN_CARDS_PER_HALF / Math.max(1, REVIEWS.length));
  const duration = REVIEWS.length * copies * SECONDS_PER_CARD;

  return (
    <section className="bg-sand-100 px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-[1040px]">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="text-[13.5px] font-bold text-orange-500">{section.eyebrow}</p>
          <h2 className="mt-2.5 font-display text-[clamp(26px,3.4vw,36px)] text-brown-900">{section.heading}</h2>
          <p className="mx-auto mt-3.5 max-w-md text-sm leading-relaxed text-[#5b4636]">{section.paragraph}</p>
        </Reveal>
      </div>

      {REVIEWS.length === 0 && (
        <p className="mx-auto mt-8 max-w-md text-center text-sm text-[#5b4636]">{section.emptyMessage}</p>
      )}

      {REVIEWS.length > 0 && !ticker && (
        <div className="mx-auto mt-10 flex max-w-[1040px] flex-wrap justify-center gap-5">
          {REVIEWS.map((r) => (
            <div key={r._file} className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
              <ReviewCard review={r} />
            </div>
          ))}
        </div>
      )}

      {REVIEWS.length > 0 && ticker && (
        <div className="mt-10">
          <div className="reviews-marquee" role="region" aria-label={section.heading} tabIndex={0}>
            <div className="reviews-track" style={{ "--marquee-duration": `${duration}s` }}>
            {[0, 1].map((half) => (
              <div key={half} className="flex shrink-0 gap-5 pr-5" aria-hidden={half === 1 ? "true" : undefined}>
                {Array.from({ length: copies }).flatMap((_, c) =>
                  REVIEWS.map((r) => (
                    <div key={`${c}-${r._file}`} className="w-[290px] sm:w-[340px]">
                      <ReviewCard review={r} />
                    </div>
                  ))
                )}
              </div>
            ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <Button onClick={() => setFormOpen(true)} variant="brown">
          {section.leaveReviewLabel}
        </Button>
      </div>

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={section.leaveReviewLabel}>
        <ReviewForm />
      </Modal>
    </section>
  );
}
