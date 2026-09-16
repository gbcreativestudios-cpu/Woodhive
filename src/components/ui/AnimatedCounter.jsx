import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

export default function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.6,
  className = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 60,
    duration,
  });
  const spanRef = useRef(null);

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (spanRef.current) {
        spanRef.current.textContent = Math.round(latest).toLocaleString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return (
    <motion.span ref={ref} className={className}>
      <span ref={spanRef}>0{suffix}</span>
    </motion.span>
  );
}
