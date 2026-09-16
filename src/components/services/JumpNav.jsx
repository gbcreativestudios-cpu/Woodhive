const ITEMS = [
  { label: "Renovation & Maintenance", id: "renovation" },
  { label: "Wooden Products", id: "products" },
  { label: "Rentals", id: "rentals" },
];

export default function JumpNav() {
  const jump = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="sticky top-0 z-30 border-b border-sand-100 bg-cream-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1040px] gap-6 overflow-x-auto px-6 py-4">
        {ITEMS.map((it) => (
          <button
            key={it.id}
            onClick={() => jump(it.id)}
            className="whitespace-nowrap text-[13.5px] font-semibold text-brown-900 transition-colors hover:text-orange-500"
          >
            {it.label}
          </button>
        ))}
      </div>
    </div>
  );
}
