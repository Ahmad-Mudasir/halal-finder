import React, { useState, useMemo, useCallback } from "react";

// Feature Components
import MapView from "../features/restaurants/components/MapView";
import RestaurantCard from "../features/restaurants/components/RestaurantCard";
import RestaurantDetail from "../features/restaurants/components/RestaurantDetail";
import Filters from "../features/restaurants/components/Filters";
import Skeleton from "../features/restaurants/components/Skeleton";
import SearchEmptyState from "../features/restaurants/components/SearchEmptyState";

// Global Component Layout
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

// Hooks & Utilities
import { useRestaurants } from "../features/restaurants/hooks/useRestaurants";
import { filterRestaurants } from "../features/restaurants/utils/filterRestaurants";
import { listItemKey } from "../features/restaurants/utils/restaurantHelpers";
import { useDebounce } from "../hooks/useDebounce";

function App() {
  const { restaurants, loading, error, refetch } = useRestaurants();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCuisine, setActiveCuisine] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  const debouncedSearch = useDebounce(searchQuery);

  const restaurantsToDisplay = useMemo(
    () => filterRestaurants(restaurants, debouncedSearch, activeCuisine),
    [restaurants, debouncedSearch, activeCuisine]
  );

  const cuisineTypes = useMemo(
    () => [...new Set(restaurants.map((r) => r.cuisine).filter(Boolean))].sort(),
    [restaurants]
  );

  const clearSearchAndFilters = useCallback(() => {
    setSearchQuery("");
    setActiveCuisine("");
  }, []);

  const handleNearMeRequest = useCallback(() => {
    if (!navigator.geolocation) return alert("Geolocation not supported.");
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setUserCoordinates(coords);
        setIsLocating(false);
        if (restaurants.length > 0) {
          const nearest = restaurants
            .filter((r) => r.latitude)
            .reduce((min, r) => {
              const dist = Math.hypot(r.latitude - coords[0], r.longitude - coords[1]);
              return dist < min.d ? { r, d: dist } : min;
            }, { r: null, d: Infinity });
          if (nearest.r) setSelectedRestaurant(nearest.r);
        }
      },
      () => {
        setIsLocating(false);
        alert("Enable location.");
      }
    );
  }, [restaurants]);

  return (
    <div className="h-screen flex flex-col bg-white text-slate-900 font-sans select-none overflow-hidden">

      <Header
        search={searchQuery}
        setSearch={setSearchQuery}
        onNearMe={handleNearMeRequest}
        locating={isLocating}
        isDetailOpen={!!selectedRestaurant}
        onLogoClick={() => setSelectedRestaurant(null)}
      />

      {/* FIXED: main is now scrollable on mobile (overflow-y-auto), but fixed on desktop (lg:overflow-hidden) */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden bg-white no-scrollbar">

        {selectedRestaurant ? (
          <div className="flex-1 flex flex-col md:flex-row bg-white animate-in fade-in duration-500 overflow-hidden min-h-[100vh] lg:min-h-0">
            <div className="hidden md:block md:w-[55%] lg:w-[60%] h-full relative border-r border-slate-50 md:bg-slate-50/40 md:p-2">
              <div className="h-full w-full overflow-hidden rounded-2xl ring-1 ring-slate-200/60 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] md:rounded-[1.25rem]">
                <MapView restaurants={restaurantsToDisplay} onSelect={setSelectedRestaurant} userLocation={userCoordinates} />
              </div>
            </div>
            <div className="flex-1 md:w-[45%] lg:w-[40%] overflow-y-auto h-full">
              <RestaurantDetail restaurant={selectedRestaurant} onBack={() => setSelectedRestaurant(null)} />
            </div>
          </div>
        ) : (
          <>
            <Sidebar />

            <section className="flex-1 px-4 lg:px-12 py-10 bg-white lg:overflow-y-auto no-scrollbar scroll-smooth">
              <div className="sm:hidden mb-10 px-2">
                <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold" />
              </div>

              <div className="max-w-2xl xl:max-w-3xl mx-auto xl:mx-0">
                <Filters cuisine={activeCuisine} setCuisine={setActiveCuisine} cuisines={cuisineTypes} />
                <div className="flex flex-col gap-10 mt-14 pb-20 lg:pb-48">
                  {loading ? (
                    <Skeleton />
                  ) : restaurantsToDisplay.length === 0 ? (
                    <SearchEmptyState
                      isFilteredEmpty={restaurants.length > 0}
                      searchQuery={searchQuery}
                      activeCuisine={activeCuisine}
                      onClearFilters={clearSearchAndFilters}
                    />
                  ) : (
                    restaurantsToDisplay.map((r) => (
                      <RestaurantCard key={listItemKey(r)} restaurant={r} onClick={() => setSelectedRestaurant(r)} />
                    ))
                  )}
                </div>
              </div>
            </section>

            {/* In mobile, this follows the list naturally in the scroll flow */}
            <section className="w-full h-[500px] shrink-0 border-slate-50 px-3 pb-3 pt-0 sm:px-4 lg:h-full lg:w-[500px] lg:border-l lg:border-slate-100 lg:bg-slate-50/50 lg:p-3 xl:w-[580px]">
              <div className="h-full w-full overflow-hidden rounded-2xl ring-1 ring-slate-200/70 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.14)] lg:rounded-3xl">
                <MapView restaurants={restaurantsToDisplay} onSelect={setSelectedRestaurant} userLocation={userCoordinates} />
              </div>
            </section>
          </>
        )}
      </main>

      {error && (
        <div
          className="fixed bottom-0 inset-x-0 bg-red-600 text-white text-xs font-bold p-4 text-center z-[300] flex flex-col sm:flex-row items-center justify-center gap-3"
          role="alert"
        >
          <span>Error: {error}</span>
          <button
            type="button"
            onClick={() => refetch()}
            className="cursor-pointer bg-white text-red-700 px-4 py-2 rounded-lg font-black text-[10px] uppercase tracking-wide hover:bg-red-50"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
