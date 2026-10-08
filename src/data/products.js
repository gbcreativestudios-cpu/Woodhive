/**
 * Wooden Products catalog shown as checkboxes in the "Start a project" and
 * "Wooden Products" inquiry forms. Lives in content/products.json — a
 * Decap-managed list, so adding/removing a product is a CMS edit, not a
 * code change.
 */
import productsData from "../../content/products.json";

export const WOODEN_PRODUCTS = productsData.items;
