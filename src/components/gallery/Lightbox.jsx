import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Lightbox({ items, index, onClose, onNavigate }) {
  const open = index !== null && index !== undefined;
  const item = open ? items[index] : null;

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
            aria-label="Close"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-cream-50 transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            onClick={() => onNavigate((index - 1 + items.length) % items.length)}
            aria-label="Previous"
            className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-lg bg-white/10 text-cream-50 transition-colors hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => onNavigate((index + 1) % items.length)}
            aria-label="Next"
            className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-lg bg-white/10 text-cream-50 transition-colors hover:bg-white/20 sm:right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <motion.div
            key={item?.title}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="max-h-full max-w-3xl"
          >
            <img
              src={`https://picsum.photos/seed/${item?.seed}/1000/${Math.round((item?.h || 400) * 1.7)}`}
              alt={item?.title}
              className="max-h-[75vh] w-auto rounded-lg object-contain"
            />
            <div className="mt-4 text-center">
              <h3 className="font-display text-lg text-cream-50">{item?.title}</h3>
              <p className="mt-1 text-[11.5px] font-bold uppercase tracking-wide text-gold-400">
                {item?.category}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
