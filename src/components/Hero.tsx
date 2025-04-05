import * as React from "react";
import { useEffect, useState } from "react";

const featuredMovies = [
  {
    title: "Inception",
    image: "https://image.tmdb.org/t/p/original/8tNX8s3j1O0eqilOQkuroRLyOZA.jpg",
  },
  {
    title: "The Dark Knight",
    image: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    title: "Interstellar",
    image: "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
  },
];

const Hero: React.FC = () => {
  const [currentMovie, setCurrentMovie] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMovie((prev) => (prev + 1) % featuredMovies.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const movie = featuredMovies[currentMovie];

  return (
    <div
      className="h-[500px] relative bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: `url(${movie.image})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-4xl font-bold">{movie.title}</h1>
      </div>
    </div>
  );
};

export default Hero;
