/**
 * Small helpers used in more than one component.
 *
 * listItemKey — React needs a stable unique `key` on each item in a list and on map markers.
 * We use name + lat + lng because the Google Sheet does not always have an `id` column.
 */
export function listItemKey(restaurant) {
  if (!restaurant) return "";
  const name = String(restaurant.name ?? "").trim();
  const lat = Number(restaurant.latitude) || 0;
  const lng = Number(restaurant.longitude) || 0;
  return `${name}|${lat}|${lng}`;
}
