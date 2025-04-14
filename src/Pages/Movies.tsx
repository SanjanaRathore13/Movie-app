import React, { useState } from "react";
import { fetchMoviesBySearch } from "../api/omdb";
import MovieCard from "../components/MovieCard";
import { Movie } from "../type";

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const data = await fetchMoviesBySearch(searchTerm.trim());
      setMovies(data);
      setSearched(true);
    }
  };

  return (
    <div className="px-4 py-8 text-white">
      <h2 className="text-3xl font-semibold mb-6 text-center">Search Movies</h2>

      <form onSubmit={handleSearch} className="flex justify-center mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 text-black rounded-l-md w-64"
          placeholder="Enter movie name..."
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded-r-md hover:bg-red-700"
        >
          Search
        </button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        ) : searched ? (
          <p className="col-span-full text-center text-gray-400">No movies found.</p>
        ) : (
          <p className="col-span-full text-center text-gray-400">Search for a movie above ☝️</p>
        )}
      </div>
    </div>
  );
};

export default Movies;
