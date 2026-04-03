/**
 * Shared cuisine → Unsplash image map.
 * Used by RestaurantCard and RestaurantDetail so we never duplicate this data.
 * Keys are LOWERCASE for case-insensitive look-up.
 */
export const CUISINE_IMAGES = {
  syrian:      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
  bangladeshi: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&q=80",
  turkish:     "https://images.unsplash.com/photo-1561626423-a51b45aef0a1?w=800&q=80",
  indian:      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
  default:     "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
};

/**
 * Returns the image URL for a cuisine name (case-insensitive).
 * Falls back to the default food image.
 */
export function getCuisineImage(cuisine) {
  return CUISINE_IMAGES[(cuisine || "").toLowerCase()] ?? CUISINE_IMAGES.default;
}
