/**
 * Filters restaurants by search query and cuisine type.
 * Both search and cuisine comparisons are CASE-INSENSITIVE.
 */
export const filterRestaurants = (data, search, cuisine) => {
  const s = search.trim().toLowerCase();
  const c = cuisine.trim().toLowerCase();

  return data.filter((r) => {
    const matchesSearch =
      !s ||
      r.name?.toLowerCase().includes(s) ||
      r.city?.toLowerCase().includes(s) ||
      r.cuisine?.toLowerCase().includes(s) ||
      r.address?.toLowerCase().includes(s);

    // Case-insensitive cuisine match
    const matchesCuisine = !c || r.cuisine?.toLowerCase() === c;

    return matchesSearch && matchesCuisine;
  });
};