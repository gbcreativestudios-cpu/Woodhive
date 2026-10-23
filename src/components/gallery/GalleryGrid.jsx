import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CATEGORIES, WORKS } from "../../data/gallery";
import Lightbox from "./Lightbox";

export default function GalleryGrid() {
  const [active, setActive] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const filtered = active === "All" ? WORKS : WORKS.filter((w) => w.category === active);

  return (
    <>
      <div className="mx-auto flex max-w-[1040px] flex-wrap gap-2 px-4 pt-10 sm:gap-2.5 sm:px-6">
        {CATEGORIES.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setActive(cat);
                setLightboxIndex(null);
              }}
              className={`rounded-md border px-3 py-2 t-small font-semibold transition-all sm:px-4 sm:py-2.5 ${
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

      <div className="mx-auto grid max-w-[1040px] grid-cols-2 gap-2.5 px-4 pb-20 pt-6 sm:gap-5 sm:px-6 sm:pt-8 lg:grid-cols-3">
        <AnimatePresence>
          {filtered.map((w, i) => (
            <motion.figure
              key={w.title}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}
            >
              <button
                onClick={() => setLightboxIndex(i)}
                className="block w-full cursor-zoom-in"
                aria-label={`View ${w.title}`}
              >
                <img
                  src={w.image}
                  alt={w.title}
                  loading="lazy"
                  className="aspect-square w-full rounded-md object-cover transition-transform duration-300 hover:scale-[1.01]"
                />
              </button>
            </motion.figure>
          ))}
        </AnimatePresence>
      </div>

      <Lightbox
        items={filtered}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}
