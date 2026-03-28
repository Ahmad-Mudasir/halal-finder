const CUISINE_IMAGES = {
  Syrian: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
  Bangladeshi: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600&q=80",
  Turkish: "https://images.unsplash.com/photo-1561626423-a51b45aef0a1?w=600&q=80",
  Indian: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
  default: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
};

const RestaurantCard = ({ restaurant, isSelected, onClick }) => {
  if (!restaurant) return null;

  const image = CUISINE_IMAGES[restaurant.cuisine] || CUISINE_IMAGES.default;
  const halalShort = (restaurant.halal_status || "").trim() || "Halal";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={[
        "group relative cursor-pointer rounded-[22px] md:rounded-[26px] overflow-hidden border bg-white",
        "shadow-[0_2px_12px_-4px_rgba(15,23,42,0.08)]",
        "transition-[box-shadow,border-color,ring] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:shadow-[0_12px_36px_-12px_rgba(6,78,59,0.18)] hover:ring-2 hover:ring-emerald-500/15",
        "active:scale-[0.995] active:transition-transform active:duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        isSelected
          ? "border-emerald-400 shadow-[0_14px_36px_-18px_rgba(6,78,59,0.28)] ring-2 ring-emerald-500/25"
          : "border-slate-100/90 hover:border-emerald-300/70",
      ].join(" ")}
    >
      <div className="relative h-40 md:h-44 overflow-hidden">
        <img
          src={image}
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          alt={restaurant.name}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
          aria-hidden
        />
        <div className="absolute top-3 right-3 z-10 max-w-[85%]">
          <span className="inline-block truncate rounded-full border border-white/30 bg-emerald-950/80 px-2.5 py-1 text-[8px] font-black uppercase tracking-tighter text-white shadow-md backdrop-blur-md transition-[background,border-color] duration-300 group-hover:border-emerald-200/50 group-hover:bg-emerald-900/90 md:px-3 md:text-[9px]">
            {halalShort}
          </span>
        </div>
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white drop-shadow-md">Open details</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm text-emerald-800 shadow-lg transition-[background,color] duration-300 group-hover:bg-emerald-50">
            →
          </span>
        </div>
      </div>

      <div className="relative bg-gradient-to-b from-white to-slate-50/30 p-4 md:p-5 transition-colors duration-500 group-hover:from-emerald-50/40 group-hover:to-white">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="text-sm font-extrabold leading-snug text-slate-800 transition-colors duration-300 group-hover:text-emerald-800 md:text-base">
            {restaurant.name}
          </h3>
        </div>

        <p className="mb-3 text-[10px] font-bold uppercase tracking-tighter md:mb-4 md:text-[11px]">
          <span className="text-slate-500 transition-colors duration-300 group-hover:text-emerald-700">
            {restaurant.cuisine}
          </span>
          <span className="text-slate-300 transition-colors duration-300 group-hover:text-emerald-200/80"> • </span>
          <span className="text-slate-400 transition-colors duration-300 group-hover:text-slate-600">
            {restaurant.city}
          </span>
        </p>

        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-full border border-slate-200/80 bg-slate-50 px-2.5 py-1 text-[8px] font-black uppercase tracking-tighter text-slate-500 transition-[color,background-color,border-color] duration-300 group-hover:border-emerald-200 group-hover:bg-emerald-100/50 group-hover:text-emerald-900 md:px-3 md:text-[9px]">
            {restaurant.cuisine}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
