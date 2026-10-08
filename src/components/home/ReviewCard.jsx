import { Quote } from "lucide-react";

const initials = (name = "") =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

export default function ReviewCard({ review, className = "" }) {
  const byline = [review.position, review.company].filter(Boolean).join(", ");
  return (
    <figure
      className={`flex h-full flex-col rounded-lg border border-sand-100 bg-cream-50 p-6 shadow-[0_10px_30px_rgba(36,20,8,0.06)] ${className}`}
    >
      <Quote className="h-5 w-5 text-orange-500" aria-hidden="true" />
      <blockquote className="mt-3 text-[14.5px] leading-relaxed text-[#5b4636]">{review.quote}</blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-5">
        {review.photo ? (
          <img src={review.photo} alt="" className="h-11 w-11 shrink-0 rounded-full object-cover" />
        ) : (
          <span
            aria-hidden="true"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brown-900 text-[13px] font-bold text-cream-50"
          >
            {initials(review.name)}
          </span>
        )}
        <span className="min-w-0">
          <span className="block text-sm font-bold text-brown-900">{review.name}</span>
          {byline && <span className="block text-[12.5px] text-[#8a7358]">{byline}</span>}
        </span>
      </figcaption>
    </figure>
  );
}
