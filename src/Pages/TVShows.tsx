import * as React from "react";
import { useEffect, useState } from "react";
import { Movie } from "../type";
import MovieCarousel from "../components/MovieCarousel";

const TVShows: React.FC = () => {
  const [shows, setShows] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTVShows = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/popular?api_key=0651c4e0406d94f5fd9f00d1fcf71796&language=en-US&page=1`
        );
        const data = await response.json();

        if (!response.ok) throw new Error(data.status_message || "Failed to fetch TV Shows");

        const mappedShows: Movie[] = data.results.map((show: any) => ({
          id: show.id.toString(),
          title: show.name, // TV Shows use 'name' instead of 'title'
          rating: show.vote_average,
          posterPath: `https://image.tmdb.org/t/p/w500${show.poster_path}`,
          year: parseInt(show.first_air_date?.slice(0, 4) || "0"),
          genre: show.genre_ids?.map((id: number) => id.toString()) || [],
        }));

        setShows(mappedShows);
      } catch (err) {
        setError("Error fetching TV Shows.");
        console.error("TV Shows error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTVShows();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Popular TV Shows</h1>

      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {shows.length > 0 ? (
        <MovieCarousel movies={shows} />
      ) : (
        <p className="text-gray-400">No TV Shows found.</p>
      )}
    </div>
  );
};

export default TVShows;
