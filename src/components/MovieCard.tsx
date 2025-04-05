import * as React from "react";

interface Movie {
  id: string;
  title: string;
  image: string;
  rating: number;
  year: number;
  genre: string[];
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="bg-gray-800 rounded overflow-hidden shadow-lg hover:shadow-yellow-500 transition-shadow duration-300">
      <img
        src={movie.image}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4 text-white">
        <h3 className="text-xl font-semibold mb-1">{movie.title}</h3>
        <p className="text-sm text-gray-400 mb-2">
          ⭐ {movie.rating} • {movie.year}
        </p>
        <div className="flex flex-wrap gap-1">
          {movie.genre.length > 0 ? (
            movie.genre.map((g) => (
              <span
                key={g}
                className="bg-yellow-500 text-black px-2 py-0.5 rounded text-xs"
              >
                {g}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-400">No genre info</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
