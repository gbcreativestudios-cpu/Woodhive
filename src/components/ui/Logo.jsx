export function LogoMark({ className = "h-7 w-7", tone = "light" }) {
  const bar = tone === "light" ? "#FAF6EF" : "#592D10";
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect x="4" y="6" width="4.5" height="28" rx="1" fill={bar} />
      <rect x="11.5" y="6" width="4.5" height="28" rx="1" fill={bar} />
      <rect x="19" y="6" width="4.5" height="28" rx="1" fill="#D88B36" />
      <rect x="26.5" y="6" width="4.5" height="28" rx="1" fill={bar} />
      <rect x="34" y="6" width="2.5" height="28" rx="1" fill={bar} />
    </svg>
  );
}

export default function Logo({ className = "", markClass = "h-7 w-7", textClass = "text-[15px]", tone = "light" }) {
  const text = tone === "light" ? "text-cream-50" : "text-brown-900";
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClass} tone={tone} />
      <span className={`font-sans font-semibold tracking-[0.08em] ${textClass} ${text}`}>
        <span className="font-normal opacity-85">THE</span>WOODHIVE
      </span>
    </span>
  );
}
