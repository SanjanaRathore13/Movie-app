// src/components/SearchBar.tsx
import React, { useEffect, useState } from "react";
import { fetchMoviesBySearch } from "../api/omdb";
import { Movie } from "../type";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 2) {
        setLoading(true);
        fetchMoviesBySearch(query).then((data) => {
          setResults(data);
          setLoading(false);
        });
      } else {
        setResults([]);
      }
    }, 500); // debounce delay

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="relative w-full max-w-xl mx-auto mt-8 text-black">
      <input
        type="text"
        placeholder="Search for movies, shows, or actors..."
        className="w-full px-4 py-2 rounded-lg shadow-md outline-none focus:ring focus:ring-yellow-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p className="text-white mt-2">Loading...</p>}

      {results.length > 0 && (
        <div className="absolute w-full bg-white shadow-lg rounded-b-lg mt-2 z-10 max-h-64 overflow-y-auto">
          {results.map((movie) => (
            <Link
              to={`/movie/${movie.imdbID}`}
              key={movie.imdbID}
              className="block px-4 py-2 hover:bg-gray-100 border-b"
            >
              🎬 {movie.Title} ({movie.Year})
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
