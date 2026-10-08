/**
 * Each service is its own file under content/services/items/ (a Decap
 * folder collection) so adding/removing/reordering services is a CMS
 * operation, not a code change.
 */
import renovation from "../../content/services/items/renovation-and-maintenance.json";
import products from "../../content/services/items/wooden-products.json";
import rentals from "../../content/services/items/rentals.json";

export const SERVICES = [renovation, products, rentals];

export const SERVICES_BY_SLUG = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));
