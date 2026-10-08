/**
 * Nav and footer logos are independent images now (each its own Decap
 * image field in content/settings/general.json), not a shared generated
 * mark. This is a thin <img> wrapper so both call sites stay one line each.
 */
export default function Logo({ src, alt = "The Wood Hive", className = "", imgClassName = "h-7 w-auto" }) {
  return (
    <span className={`flex items-center ${className}`}>
      <img src={src} alt={alt} className={imgClassName} />
    </span>
  );
}
