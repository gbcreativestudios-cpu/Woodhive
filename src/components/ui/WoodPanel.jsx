const TONES = {
  walnut: "linear-gradient(135deg, #6E3A16 0%, #592D10 45%, #3D2209 100%)",
  amber: "linear-gradient(135deg, #E29C4F 0%, #D88B36 55%, #A85E1D 100%)",
  gold: "linear-gradient(135deg, #F4D19B 0%, #EDB65F 55%, #C98A38 100%)",
  dusk: "linear-gradient(135deg, #3D2209 0%, #241408 60%, #1B3357 130%)",
  sand: "linear-gradient(135deg, #F3EBDD 0%, #E0E0E0 60%, #D9C7A6 100%)",
};

let filterId = 0;

/**
 * Standing in for real site photography until assets are supplied.
 * Renders a wood-grain-toned panel (gradient + SVG grain) instead of a
 * generic gray box, so the placeholders still read as "on brand".
 */
export default function WoodPanel({
  tone = "walnut",
  className = "",
  label,
  ratio,
}) {
  const id = `wh-grain-${filterId++}`;
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: TONES[tone] ?? TONES.walnut,
        aspectRatio: ratio,
      }}
    >
      <svg className="absolute inset-0 h-full w-full opacity-[0.18] mix-blend-overlay" aria-hidden="true">
        <filter id={id}>
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.9" numOctaves="2" seed="7" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${id})`} />
      </svg>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(100deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 14px)",
        }}
      />
      {label ? (
        <span className="absolute bottom-4 left-4 rounded-full bg-black/20 px-3 py-1 text-xs font-medium tracking-wide text-cream-50/80 backdrop-blur-sm">
          {label}
        </span>
      ) : null}
    </div>
  );
}
