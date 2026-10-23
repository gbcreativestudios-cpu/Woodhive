/**
 * Mobile toggle for the hero's 3-image carousel.
 * true  → carousel shows on mobile too, with extra top spacing that pushes
 *         the heading/text/buttons down to make room for it.
 * false → carousel is hidden on mobile (still always shows at desktop/lg+),
 *         and mobile spacing reverts to its original, tighter values — the
 *         heading/text/buttons stay exactly where they are now, no shift.
 */
export const SHOW_HERO_CAROUSEL_ON_MOBILE = true;

/**
 * Home hero overlay. Colour, the three opacity stops and the middle stop's
 * position are all editable in Decap (Home Page -> Hero). Anything missing or
 * invalid falls back to these defaults, so the hero never renders unstyled.
 */
const HERO_OVERLAY_DEFAULTS = { color: "#3D2209", bottom: 100, middle: 60, top: 40, position: 50 };

function hexToRgb(hex) {
  let h = String(hex || "").trim().replace(/^#/, "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  const n = parseInt(h, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

function pct(value, fallback, min = 0, max = 100) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
}

const PAGE_OVERLAY_DEFAULTS = { color: "#3D2209", opacity: 62 };

/** A single solid overlay for the non-home page headers, editable in Decap. */
export function buildSolidOverlay(color, opacity) {
  const rgb = hexToRgb(color) || hexToRgb(PAGE_OVERLAY_DEFAULTS.color);
  const alpha = pct(opacity, PAGE_OVERLAY_DEFAULTS.opacity) / 100;
  return `rgba(${rgb}, ${alpha})`;
}

export function buildHeroOverlay(hero = {}) {
  const d = HERO_OVERLAY_DEFAULTS;
  const rgb = hexToRgb(hero.overlayColor) || hexToRgb(d.color);
  const bottom = pct(hero.overlayBottomOpacity, d.bottom) / 100;
  const middle = pct(hero.overlayMiddleOpacity, d.middle) / 100;
  const top = pct(hero.overlayTopOpacity, d.top) / 100;
  const position = pct(hero.overlayMiddlePosition, d.position, 5, 95);
  return `linear-gradient(0deg, rgba(${rgb},${bottom}) 0%, rgba(${rgb},${middle}) ${position}%, rgba(${rgb},${top}) 100%)`;
}

/**
 * Most images now live in content/*.json (Decap-managed) instead of here —
 * see content/home/hero.json, content/about/*.json, content/services/items/*,
 * content/gallery/items/*, etc. This map only still holds servicesHero,
 * which is used by the orphaned src/pages/Services.jsx (not routed in
 * App.jsx — see that file's own comment).
 */
export const IMG = {
  servicesHero: "https://picsum.photos/seed/woodhive-services-hero/1600/900",
};

/** Overlay gradients reused across photo-backed sections. */
export const OVERLAY = {
  pageHero:
    "linear-gradient(100deg, rgba(46,26,8,0.85) 0%, rgba(61,34,9,0.62) 40%, rgba(61,34,9,0.32) 75%, rgba(61,34,9,0.18) 100%), linear-gradient(0deg, rgba(31,17,6,0.55) 0%, rgba(31,17,6,0.05) 35%, rgba(31,17,6,0.05) 65%, rgba(31,17,6,0.4) 100%)",
  gold: "linear-gradient(150deg, rgba(237,182,95,0.7) 0%, rgba(216,139,54,0.55) 42%, rgba(168,94,29,0.45) 75%, rgba(168,94,29,0.3) 100%)",
};
