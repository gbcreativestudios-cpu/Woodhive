import { motion } from "framer-motion";

/**
 * Scroll-triggered reveal. Variant controls the entrance shape so motion
 * doesn't read as one repeated fade-up on every section.
 */
const variants = {
  up: {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -32 },
    show: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 32 },
    show: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1 },
  },
  clip: {
    hidden: { clipPath: "inset(0 0 100% 0)", opacity: 1 },
    show: { clipPath: "inset(0 0 0% 0)", opacity: 1 },
  },
};

export default function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  duration = 0.7,
  className = "",
  once = true,
  amount = 0.25,
}) {
  const MotionTag = motion[Tag] ?? motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants[variant]}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealGroup({
  children,
  className = "",
  stagger = 0.12,
  once = true,
  amount = 0.2,
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className = "", variant = "up" }) {
  return (
    <motion.div className={className} variants={variants[variant]} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}
