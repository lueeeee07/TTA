// Base URL for the TTA Backend API (Node.js + Express / Vite proxy / Production URL)
export const getApiBase = () => {
  if (import.meta.env.VITE_API_URL) {
    const custom = import.meta.env.VITE_API_URL.replace(/\/+$/, '');
    return custom.endsWith('/api') ? custom : `${custom}/api`;
  }
  if (typeof window !== 'undefined') {
    // If running on Vite dev server (port 5173), use relative proxy path
    if (window.location.port === '5173') {
      return '/api';
    }
    return `${window.location.origin}/api`;
  }
  return 'http://localhost:5000/api';
};

export const API_BASE = getApiBase();

export async function fetchApi(endpoint) {
  const cleanEndpoint = endpoint;
  const separator = cleanEndpoint.includes('?') ? '&' : '?';
  const url = `${API_BASE}/${cleanEndpoint}${separator}_=${Date.now()}`;

  try {
    const res = await fetch(url, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const json = await res.json();
    if (json && typeof json === 'object' && !Array.isArray(json) && json.error) {
      return null;
    }
    return json;
  } catch (err) {
    // Fallback: try direct localhost:5000 if running locally and relative failed
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost' && !API_BASE.includes(':5000')) {
      try {
        const directUrl = `http://localhost:5000/api/${cleanEndpoint}${separator}_=${Date.now()}`;
        const fallbackRes = await fetch(directUrl, { cache: 'no-store' });
        if (fallbackRes.ok) {
          const fallbackJson = await fallbackRes.json();
          if (fallbackJson && typeof fallbackJson === 'object' && !Array.isArray(fallbackJson) && fallbackJson.error) {
            return null;
          }
          return fallbackJson;
        }
      } catch (fallbackErr) {
        // Silent fallback error
      }
    }
    console.error(`Failed to fetch ${endpoint}:`, err);
    return null;
  }
}

export default API_BASE;
