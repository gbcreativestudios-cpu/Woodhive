import { getLabel } from "../../data/labels";

/** The small coloured line above a section title. Renders nothing when switched off in Decap. */
export default function SectionLabel({ id, fallback, className = "text-orange-500" }) {
  const text = getLabel(id, fallback);
  if (!text) return null;
  return <p className={`t-label ${className}`}>{text}</p>;
}
