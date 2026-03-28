import React from "react";

/**
 * Cuisine filter chips; works together with the search in App (name/city).
 */
const Filters = ({ cuisine, setCuisine, cuisines = [] }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-2xl font-black text-slate-800 tracking-tighter">Top Halal Restaurants</h3>
      </div>

      <div className="flex gap-2.5 items-center overflow-x-auto no-scrollbar scroll-smooth">
        <button
          type="button"
          onClick={() => setCuisine("")}
          className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-tighter whitespace-nowrap transition-all border ${
            cuisine === ""
              ? "bg-[#064e3b] text-white border-[#064e3b] shadow-md shadow-emerald-50"
              : "bg-white text-slate-400 border-slate-100 hover:border-emerald-200"
          }`}
        >
          All
        </button>

        {cuisines.map((type) => (
          <button
            type="button"
            key={type}
            onClick={() => setCuisine(type)}
            className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-tighter whitespace-nowrap transition-all border ${
              cuisine === type
                ? "bg-[#064e3b] text-white border-[#064e3b] shadow-md shadow-emerald-50"
                : "bg-white text-slate-400 border-slate-100 hover:border-emerald-200"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;
