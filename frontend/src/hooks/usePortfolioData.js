import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Module-level cache so multiple components don't re-fetch
let cachedData = null;
let fetchPromise = null;

const fetchPortfolio = async () => {
  if (cachedData) return cachedData;
  if (fetchPromise) return fetchPromise;

  fetchPromise = (async () => {
    try {
      const res = await axios.get(`${API_URL}/api/portfolio`);
      cachedData = res.data;
      return cachedData;
    } catch (err) {
      console.error('Failed to fetch portfolio data:', err);
      throw err;
    } finally {
      fetchPromise = null;
    }
  })();

  return fetchPromise;
};

export const usePortfolioData = () => {
  const [data, setData] = useState({
    academic: [],
    experience: [],
    works: [],
    archive: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const result = await fetchPortfolio();
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { ...data, loading, error };
};

// Allow cache invalidation (e.g., after admin saves)
export const invalidatePortfolioCache = () => {
  cachedData = null;
  fetchPromise = null;
};
