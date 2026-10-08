/**
 * Categories come from content/gallery/categories.json (a simple editable
 * list) and each gallery piece is its own file under content/gallery/items/
 * (a Decap folder collection) — import.meta.glob pulls all of them in at
 * build time, sorted by filename so the CMS's own file order controls the
 * grid order.
 */
import categoriesData from "../../content/gallery/categories.json";

const modules = import.meta.glob("../../content/gallery/items/*.json", { eager: true });

export const CATEGORIES = categoriesData.items;

export const WORKS = Object.keys(modules)
  .sort()
  .map((path) => modules[path].default ?? modules[path]);
