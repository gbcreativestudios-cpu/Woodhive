import typography from "../../content/settings/typography.json";

/**
 * Pushes the Decap Typography settings onto :root as CSS variables
 * (--t-<style>-p / -d / -t / -w, --<logo>-p / -d). Anything missing or
 * invalid is skipped, so the defaults in src/typography.css stay in force.
 */
const FIELDS = { sizePhone: "p", sizeDesktop: "d", sizeTablet: "t", weight: "w" };

function valid(value, min, max) {
  const n = Number(value);
  return Number.isFinite(n) && n >= min && n <= max ? n : null;
}

export function applyTypography() {
  const root = document.documentElement;
  for (const [id, style] of Object.entries(typography.styles || {})) {
    for (const [field, suffix] of Object.entries(FIELDS)) {
      const n = field === "weight" ? valid(style?.[field], 100, 900) : valid(style?.[field], 8, 160);
      if (n !== null) root.style.setProperty(`--t-${id}-${suffix}`, String(n));
    }
  }
  for (const [id, logo] of Object.entries(typography.logos || {})) {
    const p = valid(logo?.heightPhone, 10, 300);
    const d = valid(logo?.heightDesktop, 10, 300);
    if (p !== null) root.style.setProperty(`--${id}-p`, String(p));
    if (d !== null) root.style.setProperty(`--${id}-d`, String(d));
  }
}
