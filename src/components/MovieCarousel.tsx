import React from "react";
import { Movie } from "../type";

interface Props {
  movies: Movie[];
}

const MovieCarousel: React.FC<Props> = ({ movies }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="bg-gray-900 p-3 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          <img
            src={movie.posterPath}
            alt={movie.title}
            className="w-full h-64 object-cover rounded-md"
          />
          <h2 className="text-md text-white font-bold mt-2 truncate">{movie.title}</h2>
          <p className="text-sm text-gray-400 mt-1">
            ⭐ {movie.rating} | 📅 {movie.year}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MovieCarousel;
