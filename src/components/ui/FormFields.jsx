/**
 * Shared field rendering for every form on the site. The field list for each
 * form lives in content/forms.json and is edited in Decap (add / delete /
 * reorder / change type) — these components just draw whatever is in it.
 *
 * Rendering order is fixed: short fields (text / email / tel) in a two-column
 * grid, then any special block the form adds (products checklist, project-type
 * select, photo upload), then long-answer fields (textarea).
 */
export const labelCls = "mb-1.5 block text-[12.5px] font-semibold text-brown-900";
export const inputCls =
  "h-11 w-full rounded-lg border border-sand-100 bg-cream-50 px-3.5 text-sm text-ink-900 outline-none transition-colors focus:border-orange-500";
export const textareaCls =
  "w-full rounded-lg border border-sand-100 bg-cream-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-orange-500";

export const isLong = (f) => f.type === "textarea";

export function ShortFields({ fields, idPrefix }) {
  const short = (fields ?? []).filter((f) => !isLong(f));
  if (short.length === 0) return null;
  return (
    <div className="grid gap-3.5 sm:grid-cols-2">
      {short.map((f) => (
        <div key={f.name} className={f.width === "full" ? "sm:col-span-2" : ""}>
          <label htmlFor={`${idPrefix}-${f.name}`} className={labelCls}>
            {f.label}
          </label>
          <input
            id={`${idPrefix}-${f.name}`}
            type={f.type || "text"}
            name={f.name}
            required={f.required}
            className={inputCls}
          />
        </div>
      ))}
    </div>
  );
}

export function LongFields({ fields, idPrefix }) {
  return (fields ?? []).filter(isLong).map((f) => (
    <div key={f.name} className="mt-3.5">
      <label htmlFor={`${idPrefix}-${f.name}`} className={labelCls}>
        {f.label}
      </label>
      <textarea
        id={`${idPrefix}-${f.name}`}
        name={f.name}
        rows={4}
        required={f.required}
        className={textareaCls}
      />
    </div>
  ));
}
