const API_KEY = process.env.REACT_APP_OMDB_API_KEY; // Ensure this is set correctly in your .env

// Fetch movies by search query (e.g., "Batman")
export const fetchMoviesBySearch = async (search: string, year = "", type = "") => {
  try {
    let url = `https://www.omdbapi.com/?s=${encodeURIComponent(search)}&apikey=${API_KEY}`;
    if (year) url += `&y=${year}`;
    if (type) url += `&type=${type}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "False") return [];
    return data.Search || [];
  } catch (err) {
    console.error("Error fetching movies:", err);
    return [];
  }
};

// Fetch a single movie's details by its ID
export const fetchMovieById = async (id: string) => {
  try {
    const url = `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "False") return null;
    return data;
  } catch (err) {
    console.error("Error fetching movie by ID:", err);
    return null;
  }
};
