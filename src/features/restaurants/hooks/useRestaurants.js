import { useEffect, useState } from "react";
import { fetchRestaurantsCSV, fetchWithRetry } from "../services/restaurantService";
import { sheetParser } from "../utils/sheetParser";

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setError(null);
    setLoading(true);
    try {
      const csv = await fetchWithRetry(fetchRestaurantsCSV);
      const parsed = sheetParser(csv);
      setRestaurants(parsed);
    } catch (err) {
      setError(err.message || "Failed to load restaurants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { restaurants, loading, error, refetch: loadData };
};