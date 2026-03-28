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
      className={`group cursor-pointer bg-white rounded-[20px] md:rounded-[24px] overflow-hidden border transition-all duration-300 hover:shadow-xl ${
        isSelected ? "border-emerald-500 shadow-lg ring-1 ring-emerald-500/10" : "border-slate-100 shadow-sm hover:border-emerald-200"
      }`}
    >
      <div className="relative h-40 md:h-44 overflow-hidden">
        <img src={image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={restaurant.name} />
        <div className="absolute top-3 right-3 max-w-[85%] bg-emerald-900/90 backdrop-blur-md text-white text-[8px] md:text-[9px] font-black px-2 md:px-2.5 py-1 rounded-full border border-white/20 tracking-tighter shadow-xl truncate">
          {halalShort}
        </div>
      </div>

      <div className="p-4 md:p-5">
        <div className="flex justify-between items-start mb-1 gap-2">
          <h3 className="text-sm md:text-base font-extrabold text-slate-800 leading-snug group-hover:text-emerald-700 transition-colors">
            {restaurant.name}
          </h3>
        </div>

        <p className="text-[10px] md:text-[11px] text-slate-400 font-bold mb-3 md:mb-4 uppercase tracking-tighter">
          {restaurant.cuisine} • {restaurant.city}
        </p>

        <div className="flex gap-1.5 flex-wrap">
          <span className="text-[8px] md:text-[9px] font-black px-2 md:px-2.5 py-1 bg-slate-50 text-slate-500 rounded-full border border-slate-100 uppercase">
            {restaurant.cuisine}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
