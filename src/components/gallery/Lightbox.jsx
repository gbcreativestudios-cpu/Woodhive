import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Lightbox({ items, index, onClose, onNavigate }) {
  const open = index !== null && index !== undefined;
  const item = open ? items[index] : null;
  const touchStartX = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % items.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + items.length) % items.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, index, items.length, onClose, onNavigate]);

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 48) return;
    onNavigate((index + (delta < 0 ? 1 : -1) + items.length) % items.length);
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/90 px-4 py-8"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <button
            onClick={onClose}
            aria-label="Close gallery"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-md bg-white/10 text-cream-50 transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            onClick={() => onNavigate((index - 1 + items.length) % items.length)}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-md bg-white/10 text-cream-50 transition-colors hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => onNavigate((index + 1) % items.length)}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-md bg-white/10 text-cream-50 transition-colors hover:bg-white/20 sm:right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <motion.div
            key={item?.image}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex max-h-full max-w-3xl items-center justify-center"
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={item?.image}
              alt={item?.title}
              className="max-h-[78vh] max-w-full rounded-md object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
