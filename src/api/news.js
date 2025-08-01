const API_KEY = "bc2744d9a2b14eaf8a6ed3265ee20719";
const BASE_URL = "https://newsapi.org/v2";

export async function getSources() {
  try {
    const res = await fetch(`${BASE_URL}/top-headlines/sources?apiKey=${API_KEY}`);
    if (!res.ok) throw new Error("Failed to fetch sources");
    const data = await res.json();
    return data.sources;
  } catch (err) {
    console.error("API error:", err);
    return [];
  }
}
