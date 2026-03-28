export const filterRestaurants = (data, search, cuisine) => {
  const s = search.toLowerCase();

  return data.filter(r => {
    return (
      (!search ||
        r.name?.toLowerCase().includes(s) ||
        r.city?.toLowerCase().includes(s)) &&
      (!cuisine || r.cuisine === cuisine)
    );
  });
};