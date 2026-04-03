import { useState, useMemo, useCallback } from "react";
import { filterRestaurants } from "../utils/filterRestaurants";
import { useDebounce } from "../../../hooks/useDebounce";

/**
 * Encapsulates all filter/search state and derived data so App.jsx stays clean.
 * Returns everything the UI needs to render filters and display filtered results.
 */
export function useFilters(restaurants) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCuisine, setActiveCuisine] = useState("");

  const debouncedSearch = useDebounce(searchQuery);

  /** De-duplicated, sorted list of cuisines present in the data. */
  const cuisineOptions = useMemo(
    () =>
      [...new Set(restaurants.map((r) => r.cuisine).filter(Boolean))].sort(),
    [restaurants]
  );

  /** The filtered result to display in the list and on the map. */
  const filtered = useMemo(
    () => filterRestaurants(restaurants, debouncedSearch, activeCuisine),
    [restaurants, debouncedSearch, activeCuisine]
  );

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setActiveCuisine("");
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    activeCuisine,
    setActiveCuisine,
    cuisineOptions,
    filtered,
    clearFilters,
  };
}
