import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CATEGORIES, WORKS } from "../../data/gallery";

export default function GalleryGrid() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? WORKS : WORKS.filter((w) => w.category === active);

  return (
    <>
      <div className="mx-auto flex max-w-[1040px] flex-wrap gap-2.5 px-6 pt-10">
        {CATEGORIES.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-lg border px-4 py-2.5 text-[13px] font-semibold transition-all ${
                isActive
                  ? "border-brown-900 bg-brown-900 text-cream-50"
                  : "border-sand-100 text-brown-900 hover:border-brown-900/40"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="mx-auto max-w-[1040px] px-6 pb-20 pt-8 [column-gap:20px] sm:columns-2 lg:columns-3">
        <AnimatePresence>
          {filtered.map((w, i) => (
            <motion.figure
              key={w.title}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}
              className="mb-5 break-inside-avoid"
            >
              <img
                src={`https://picsum.photos/seed/${w.seed}/560/${w.h}`}
                alt={w.title}
                loading="lazy"
                className="w-full rounded-[20px]"
              />
              <figcaption>
                <h3 className="mt-3 font-display text-[16.5px] text-brown-900">{w.title}</h3>
                <p className="mt-1 text-[11.5px] font-bold uppercase tracking-wide text-orange-500">
                  {w.category}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
