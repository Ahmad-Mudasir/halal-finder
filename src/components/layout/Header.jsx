import React from "react";

/**
 * Header component for the application.
 * Contains the logo, global search (conditionally shown), and geolocation trigger.
 */
const Header = ({ search, setSearch, onNearMe, locating, isDetailOpen, onLogoClick }) => {
  return (
    <header className="h-20 lg:h-24 border-b border-slate-100 flex items-center justify-between px-6 lg:px-12 bg-white z-100 shrink-0">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={onLogoClick}
      >
        <span className="text-2xl lg:text-3xl text-emerald-600">🕌</span>
        <h1 className="text-xl lg:text-2xl font-black text-emerald-950 tracking-tighter">
          Verdant Halal
        </h1>
      </div>

      <div className="flex items-center gap-4 lg:gap-6 ml-auto lg:ml-0">
        {/* Only show search when the main list is active */}
        {!isDetailOpen && (
          <div className="relative group hidden sm:block md:min-w-[320px]">
            <input
              type="text"
              placeholder="Search local gems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 text-slate-800 placeholder-slate-400 font-bold rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-xs transition-all"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">🔍</span>
          </div>
        )}

        <button
          type="button"
          onClick={onNearMe}
          disabled={locating}
          className="cursor-pointer bg-emerald-950 hover:bg-black text-white text-[11px] font-black px-6 py-3.5 rounded-2xl flex items-center gap-2 shadow-xl shrink-0 active:scale-95 transition-all outline-none disabled:opacity-50"
        >
          <span>📍</span>
          <span>{locating ? "LOCATING..." : "NEAR ME"}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
