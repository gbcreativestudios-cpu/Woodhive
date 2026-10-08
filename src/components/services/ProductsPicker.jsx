import { useState } from "react";
import { WOODEN_PRODUCTS } from "../../data/products";
import forms from "../../../content/forms.json";

const t = forms.productsPicker;

/**
 * Checkbox list of the wooden-products catalog, plus a "Not listed" option
 * that reveals a free-text field for a custom product name. Submits as:
 *   - "products": one value per checked box (multiple inputs, same name)
 *   - "other_product": the free-text value, only present once "Not listed"
 *     is checked (and only sent if the field actually has a name, i.e. the
 *     checkbox is on — see the conditional name below)
 * Both field names are pre-registered in public/__forms.html for Netlify's
 * static form detection.
 */
export default function ProductsPicker() {
  const [notListed, setNotListed] = useState(false);

  return (
    <div className="mt-3.5">
      <label className="mb-1.5 block text-[12.5px] font-semibold text-brown-900">{t.label}</label>
      <div className="grid gap-2 rounded-lg border border-sand-100 p-3.5 sm:grid-cols-2">
        {WOODEN_PRODUCTS.map((product) => (
          <label key={product} className="flex items-center gap-2 text-sm text-ink-900">
            <input type="checkbox" name="products" value={product} className="h-4 w-4 accent-orange-500" />
            {product}
          </label>
        ))}
        <label className="flex items-center gap-2 text-sm text-ink-900">
          <input
            type="checkbox"
            checked={notListed}
            onChange={(e) => setNotListed(e.target.checked)}
            className="h-4 w-4 accent-orange-500"
          />
          {t.notListedLabel}
        </label>
      </div>

      {notListed && (
        <input
          type="text"
          name="other_product"
          placeholder={t.otherPlaceholder}
          required
          className="mt-2.5 h-11 w-full rounded-lg border border-sand-100 bg-cream-50 px-3.5 text-sm text-ink-900 outline-none transition-colors focus:border-orange-500"
        />
      )}
    </div>
  );
}
