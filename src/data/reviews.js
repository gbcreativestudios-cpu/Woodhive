/**
 * Each published review is its own file under content/reviews/items/ (a Decap
 * folder collection: /admin → Customer Reviews). Sorted oldest → newest so a
 * newly added review always lands at the end (the bottom of the grid / the
 * tail of the ticker). Untick "Published" in the CMS to hide one without
 * deleting it.
 */
const modules = import.meta.glob("../../content/reviews/items/*.json", { eager: true });

export const REVIEWS = Object.entries(modules)
  .map(([path, m]) => ({ ...(m.default ?? m), _file: path }))
  .filter((r) => r.published !== false)
  .sort((a, b) => {
    const diff = new Date(a.date || 0) - new Date(b.date || 0);
    return diff || a._file.localeCompare(b._file);
  });
