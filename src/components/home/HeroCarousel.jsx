import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Rounded photo card with a crossfading image carousel and dot controls,
 * matching the hero reference layout. Images are passed in (see
 * IMG.heroCarousel in lib/images.js) and can be swapped independently of
 * the hero's background photo.
 */
export default function HeroCarousel({ images, interval = 5000, className = "" }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval, index]);

  if (!images.length) return null;

  return (
    <div
      className={`relative aspect-[8/5] w-full overflow-hidden rounded-[20px] border border-white/15 shadow-[0_30px_60px_rgba(20,11,4,0.45)] ${className}`}
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-5 bg-cream-50" : "w-1.5 bg-cream-50/45 hover:bg-cream-50/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
