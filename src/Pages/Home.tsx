import * as React from "react";
import { useEffect, useState } from "react";
import MovieCarousel from "../components/MovieCarousel";
import { Movie } from "../type";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=0651c4e0406d94f5fd9f00d1fcf71796&language=en-US&page=1`
        );
        const data = await response.json();

        const mappedMovies: Movie[] = data.results.map((movie: any) => ({
          id: movie.id.toString(),
          title: movie.title,
          rating: movie.vote_average,
          posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          year: parseInt(movie.release_date?.slice(0, 4) || "0"),
          genre: movie.genre_ids?.map((id: number) => id.toString()) || [],
        }));

        setMovies(mappedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen text-white p-6">
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold mb-4 text-yellow-400">🎬 Welcome to MovieVerse</h1>
        <p className="text-lg text-gray-300 mb-6">Your one-stop destination for movie reviews, ratings & more!</p>
        <button
          onClick={() => navigate("/movies")}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded transition"
        >
          Explore All Movies
        </button>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-white">🔥 Trending Now</h2>
        <MovieCarousel movies={movies} />
      </div>
    </div>
  );
};

export default Home;
