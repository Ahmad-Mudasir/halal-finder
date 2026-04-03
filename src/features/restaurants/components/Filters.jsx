import React from "react";

/**
 * Cuisine filter — dropdown only (chips removed per UX review).
 * Fully responsive: visible and usable on all screen sizes.
 */
const Filters = ({ cuisine, setCuisine, cuisines = [] }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3 px-1">
        <h3 className="text-2xl font-black text-slate-800 tracking-tighter">
          Top Halal Restaurants
        </h3>

        {/* ── Cuisine Dropdown — shown on ALL screen sizes ── */}
        <div className="relative w-full xl:w-auto">
          <select
            id="cuisine-filter"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            aria-label="Filter by cuisine"
            className="
              w-full xl:w-52
              appearance-none cursor-pointer
              pl-4 pr-10 py-3
              bg-white border border-slate-200 rounded-xl
              text-xs font-bold text-slate-700 uppercase tracking-tight
              shadow-sm
              transition-[border-color,box-shadow] duration-200
              hover:border-emerald-400
              focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500
            "
          >
            <option value="">All Cuisines</option>
            {cuisines.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {/* Custom chevron */}
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs select-none">
            ▾
          </span>
        </div>
      </div>
    </div>
  );
};

export default Filters;
