const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (endpoint: string) => {
  try {
    const originalUrl = endpoint.includes("?")
      ? `${BASE_URL}${endpoint}&api_key=${API_KEY}&language=en-US`
      : `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`;

    // 👇 CORS proxy added here
    const corsProxyUrl = `https://corsproxy.io/?${encodeURIComponent(originalUrl)}`;

    const response = await fetch(corsProxyUrl);
    if (!response.ok) throw new Error("Failed to fetch");
    
    const data = await response.json();
    console.log("✅ Movie Data:", data); // optional log
    return data;
  } catch (error) {
    console.error("❌ API Error:", error);
    return null;
  }
};
