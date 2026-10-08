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
 * Hero overlay color — an easy code-level control until this becomes a
 * proper Decap color field once the site is fully converted to CMS. Set to
 * match the footer's background (brown-950, #3D2209) as requested; change
 * this one value (an "R, G, B" triplet, no "rgb()" wrapper) to retune the
 * whole gradient in one place — every stop in OVERLAY.hero below reads
 * from it.
 */
export const HERO_OVERLAY_COLOR = "61, 34, 9";

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
  hero: `linear-gradient(0deg, rgba(${HERO_OVERLAY_COLOR},1) 0%, rgba(${HERO_OVERLAY_COLOR},0.6) 50%, rgba(${HERO_OVERLAY_COLOR},0.4) 100%)`,
  pageHero:
    "linear-gradient(100deg, rgba(46,26,8,0.85) 0%, rgba(61,34,9,0.62) 40%, rgba(61,34,9,0.32) 75%, rgba(61,34,9,0.18) 100%), linear-gradient(0deg, rgba(31,17,6,0.55) 0%, rgba(31,17,6,0.05) 35%, rgba(31,17,6,0.05) 65%, rgba(31,17,6,0.4) 100%)",
  gold: "linear-gradient(150deg, rgba(237,182,95,0.7) 0%, rgba(216,139,54,0.55) 42%, rgba(168,94,29,0.45) 75%, rgba(168,94,29,0.3) 100%)",
};
