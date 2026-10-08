// Base URL for the PHP API (XAMPP / Apache / Vite dev server)
const getApiBase = () => {
  if (typeof window !== 'undefined') {
    // If running on local dev server or Apache, use relative path first for proxy / same-origin
    if (window.location.port === '5173') {
      return '/TTA/api/endpoints';
    }
    return `${window.location.origin}/TTA/api/endpoints`;
  }
  return 'http://localhost/TTA/api/endpoints';
};

const API_BASE = getApiBase();

export async function fetchApi(endpoint) {
  const separator = endpoint.includes('?') ? '&' : '?';
  const url = `${API_BASE}/${endpoint}${separator}_=${Date.now()}`;

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
    // If relative path failed, try direct absolute URL fallback
    if (!API_BASE.startsWith('http://localhost/')) {
      try {
        const directUrl = `http://localhost/TTA/api/endpoints/${endpoint}${separator}_=${Date.now()}`;
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
