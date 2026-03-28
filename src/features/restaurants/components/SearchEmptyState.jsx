/**
 * Shown when the list has no rows to display (search/filter or empty dataset).
 */
const SearchEmptyState = ({ isFilteredEmpty, searchQuery, activeCuisine, onClearFilters }) => {
  const q = (searchQuery || "").trim();

  const title = isFilteredEmpty ? "No restaurants found" : "No restaurants to show";

  let subtitle;
  if (!isFilteredEmpty) {
    subtitle = "The list is empty or could not be loaded. Check your connection and the Google Sheet link.";
  } else if (q && activeCuisine) {
    subtitle = `Nothing matches “${q}” with cuisine “${activeCuisine}”. Try different keywords or clear filters.`;
  } else if (q) {
    subtitle = `Nothing matches “${q}”. Try another name, city, or spelling.`;
  } else if (activeCuisine) {
    subtitle = `No venues for “${activeCuisine}”. Pick another cuisine or show all.`;
  } else {
    subtitle = "Adjust your search or filters to see venues on the map and in this list.";
  }

  return (
    <div
      className="search-empty-root relative mx-auto max-w-lg rounded-[26px] border border-emerald-200/35 bg-gradient-to-br from-white via-emerald-50/25 to-slate-50 px-6 py-14 text-center shadow-[0_16px_48px_-24px_rgba(6,78,59,0.18)] md:px-10 md:py-16"
      role="status"
      aria-live="polite"
    >
      <div className="search-empty-shimmer-bar pointer-events-none absolute inset-x-0 top-0 h-1" aria-hidden />

      <div className="relative mx-auto mb-10 flex h-36 w-36 items-center justify-center">
        <span className="search-empty-ring" aria-hidden />
        <span className="search-empty-ring search-empty-ring--delay" aria-hidden />
        <div className="search-empty-icon-wrap relative z-10 flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-950 text-[2.35rem] shadow-[0_14px_28px_-8px_rgba(6,78,59,0.45)]">
          🔍
        </div>
        <div
          className="pointer-events-none absolute -right-1 -top-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-amber-400 text-sm shadow-md"
          aria-hidden
        >
          ✕
        </div>
      </div>

      <h3 className="text-xl font-black tracking-tight text-slate-900 md:text-2xl">{title}</h3>
      <p className="mx-auto mt-3 max-w-sm text-sm font-medium leading-relaxed text-slate-500">{subtitle}</p>

      {isFilteredEmpty && (
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onClearFilters}
            className="rounded-2xl bg-emerald-900 px-8 py-3.5 text-[11px] font-black uppercase tracking-widest text-white shadow-lg transition-[transform,background-color,box-shadow] duration-200 hover:bg-emerald-950 hover:shadow-xl active:scale-[0.98]"
          >
            Clear search & filters
          </button>
        </div>
      )}

      <p className="mt-8 text-[10px] font-bold uppercase tracking-widest text-slate-300">
        Map updated — pins appear when results match
      </p>
    </div>
  );
};

export default SearchEmptyState;
