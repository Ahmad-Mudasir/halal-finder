import React from "react";

/**
 * Sidebar component for primary navigation links.
 * Visible on desktop viewports.
 */
const Sidebar = () => {
  return (
    <nav className="hidden lg:flex w-60 border-r border-slate-100 p-8 flex-col shrink-0 bg-white">
      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest px-4 mb-8 leading-none">
        Nordic Concierge
      </p>
      
      <div className="space-y-4">
        <button className="flex items-center gap-4 w-full p-4 bg-emerald-50 text-emerald-950 rounded-[20px] font-black text-xs transition-colors">
          🍽️ <span>Venues</span>
        </button>
        <button className="flex items-center gap-4 w-full p-4 text-slate-300 hover:text-emerald-700 font-bold text-xs transition-colors">
          🕌 <span>Mosques</span>
        </button>
        <button className="flex items-center gap-4 w-full p-4 text-slate-300 hover:text-emerald-700 font-bold text-xs transition-colors">
          ⭐ <span>Saves</span>
        </button>
      </div>

      <button className="mt-auto w-full p-4 bg-emerald-950 text-white rounded-[20px] font-black text-[10px] uppercase tracking-widest hover:bg-black transition-colors">
        Add Business
      </button>
    </nav>
  );
};

export default Sidebar;
