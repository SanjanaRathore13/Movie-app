import * as React from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import { fetchMovies } from "../api/tmdb";
import ReviewSection from "../components/ReviewSection";

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Filters
  const [genreFilter, setGenreFilter] = useState<string>("");
  const [yearFilter, setYearFilter] = useState<number | "">("");
  const [ratingFilter, setRatingFilter] = useState<number>(0);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastMovieRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  // Fetch Movies with Filters
  const loadMovies = async (currentPage: number, reset = false) => {
    let endpoint = `/discover/movie?page=${currentPage}`;

    if (genreFilter) {
      endpoint += `&with_genres=${genreFilter}`;
    }
    if (yearFilter) {
      endpoint += `&primary_release_year=${yearFilter}`;
    }
    endpoint += `&vote_average.gte=${ratingFilter}`;

    const data = await fetchMovies(endpoint);
    if (!data?.results) return;

    if (reset) {
      setMovies(data.results);
    } else {
      setMovies((prev) => [...prev, ...data.results]);
    }

    setHasMore(data.page < data.total_pages);
  };

  // Fetch on page scroll
  useEffect(() => {
    loadMovies(page);
  }, [page]);

  // Reset + fetch on filters change
  useEffect(() => {
    setPage(1);
    setMovies([]);
    loadMovies(1, true);
  }, [genreFilter, yearFilter, ratingFilter]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Popular Movies</h2>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4 items-center text-black">
        <select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          className="p-2 rounded"
        >
          <option value="">All Genres</option>
          <option value="28">Action</option>
          <option value="35">Comedy</option>
          <option value="18">Drama</option>
          <option value="10749">Romance</option>
        </select>

        <input
          type="number"
          placeholder="Year"
          value={yearFilter}
          onChange={(e) =>
            setYearFilter(e.target.value ? parseInt(e.target.value) : "")
          }
          className="p-2 rounded"
        />

        <input
          type="range"
          min="0"
          max="10"
          step="0.5"
          value={ratingFilter}
          onChange={(e) => setRatingFilter(Number(e.target.value))}
        />
        <span className="text-white">Min Rating: {ratingFilter}</span>
      </div>

      {/* Movie Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie, index) => {
          const isLast = index === movies.length - 1;
          return (
            <div
              key={movie.id}
              ref={isLast ? lastMovieRef : null}
              className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-96 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{movie.title}</h3>
                <p className="text-sm text-gray-400">
                  {movie.overview.substring(0, 100)}...
                </p>
              </div>
              <div className="p-4 border-t border-gray-700">
                <ReviewSection movieId={movie.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Movies;
