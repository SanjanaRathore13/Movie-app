// src/components/MovieCard.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "../type";

type Props = {
  movie: Movie;
};

const MovieCard = ({ movie }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <div
        className="relative rounded-xl overflow-hidden shadow-md bg-gray-800 hover:scale-105 transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
          alt={movie.Title}
          className={`w-full h-80 object-cover transition-opacity duration-300 ${isHovered ? "opacity-20" : "opacity-100"}`}
        />
        {isHovered && (
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-80 text-white p-4 text-center transition-all duration-300">
            <p className="text-lg font-semibold">{movie.Title}</p>
            <p className="text-sm">{movie.Year}</p>
            <div className="mt-2 animate-bounce text-yellow-400">▶ Preview</div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
