const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (endpoint: string) => {
  try {
    const url = endpoint.includes("?")
      ? `${BASE_URL}${endpoint}&api_key=${API_KEY}&language=en-US`
      : `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch");
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};