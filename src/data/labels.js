import labels from "../../content/settings/labels.json";

/**
 * Small section labels ("eyebrows") are managed in Decap under
 * Site Settings -> Section Labels (content/settings/labels.json).
 * Returns the text to show, or null when the label is switched off / blank.
 * If the settings file has no entry for a key at all, the section's own
 * legacy text (fallback) is used so nothing disappears unexpectedly.
 */
export function getLabel(key, fallback = null) {
  const entry = labels[key];
  if (!entry) return fallback || null;
  if (entry.show === false) return null;
  const text = typeof entry.text === "string" ? entry.text.trim() : "";
  return text || null;
}

/** Whether a show-only toggle (no text) is on. Defaults to on. */
export function labelVisible(key) {
  return labels[key]?.show !== false;
}
