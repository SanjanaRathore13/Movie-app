import * as React from "react";
import { useState } from "react";
import { fetchMovies } from "../api/tmdb";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
  
    const endpoint = `/search/movie?query=${encodeURIComponent(query)}`;
    console.log("Fetching from:", endpoint); // 👈 Logs the final URL path
  
    const data = await fetchMovies(endpoint);
    console.log("API Response:", data);
    
    if (data && data.results && data.results.length > 0) {
      setResults(data.results);
      setNoResults(false);
    } else {
      setResults([]);
      setNoResults(true);
    }
  };
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Search Movies</h2>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded w-full text-black"
          placeholder="Enter movie name"
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {noResults && (
        <p className="text-red-500 text-center">No results found. Try something else!</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {results.map((movie) => (
          <div key={movie.id} className="bg-gray-800 text-white p-4 rounded shadow">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto rounded mb-2"
            />
            <h3 className="text-lg">{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
