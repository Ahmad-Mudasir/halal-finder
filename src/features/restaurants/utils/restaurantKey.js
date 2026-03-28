/**
 * Stable React key for list items and map markers from sheet data.
 */
export function restaurantKey(r) {
  if (!r) return "";
  const name = String(r.name ?? "").trim();
  const lat = Number(r.latitude) || 0;
  const lng = Number(r.longitude) || 0;
  return `${name}|${lat}|${lng}`;
}
