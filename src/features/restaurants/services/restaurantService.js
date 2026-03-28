const CACHE_KEY = "restaurants_cache";

/**
 * Retries a fetch function a few times (network flakiness).
 */
export const fetchWithRetry = async (fn, retries = 3) => {
  try {
    return await fn();
  } catch (err) {
    if (retries === 0) throw err;
    return fetchWithRetry(fn, retries - 1);
  }
};

/**
 * Fetches the published Google Sheet CSV in the browser via fetch (no CSV libraries).
 * Optional localStorage cache speeds repeat visits; clear site data or bump the cache key
 * if the sheet changes and you need fresh rows during development.
 */
export const fetchRestaurantsCSV = async () => {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) return cached;

  const res = await fetch(import.meta.env.VITE_SHEET_URL);

  if (!res.ok) throw new Error("Failed to fetch data");

  const text = await res.text();
  localStorage.setItem(CACHE_KEY, text);

  return text;
};
