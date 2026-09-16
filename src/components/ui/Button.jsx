import { Link } from "react-router-dom";

/**
 * Site button. Full width on mobile (per design), auto-width from sm up.
 * Corner radius matches the hero buttons everywhere — never a full pill.
 */
const VARIANTS = {
  gold: "bg-gold-400 text-ink-900 hover:bg-orange-400",
  cream: "bg-cream-50 text-ink-900 hover:bg-cream-100",
  brown: "bg-brown-900 text-cream-50 hover:bg-brown-800",
  orange: "bg-orange-500 text-cream-50 hover:bg-orange-400",
  outline: "border border-brown-900/20 text-brown-900 hover:border-brown-900/40",
};

export default function Button({
  to,
  href,
  children,
  variant = "gold",
  uppercase = false,
  className = "",
  ...props
}) {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3.5",
    "text-sm font-bold transition-all duration-200 hover:scale-[1.02]",
    "w-full sm:w-auto text-center",
    uppercase ? "tracking-wide" : "",
    VARIANTS[variant],
    className,
  ].join(" ");

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}

/** Wrapper that stacks buttons full-width on mobile, inline on desktop. */
export function ButtonRow({ children, center = false, className = "" }) {
  return (
    <div
      className={`flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4 ${
        center ? "sm:justify-center" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
