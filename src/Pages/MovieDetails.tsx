import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieById } from "../api/omdb"; // Assuming your OMDb functions are imported from api.ts
import { db } from "../firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import ReviewSection from "../components/ReviewSection";

const MovieDetails: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieById(movieId); // Get movie details from OMDb API

        if (!data) {
          setError("Movie not found.");
          setLoading(false);
          return;
        }

        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Failed to fetch movie details.");
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return <div>Loading movie details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="text-white space-y-6">
      {/* Movie details section */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h1 className="text-3xl font-bold">{movie?.Title}</h1>
        <p className="text-lg">{movie?.Plot}</p>
        <div className="mt-4">
          <span className="text-sm font-semibold">Release Date: </span>
          <span className="text-sm">{movie?.Released}</span>
        </div>
        <div className="mt-2">
          <span className="text-sm font-semibold">Rating: </span>
          <span className="text-sm">⭐ {movie?.imdbRating}</span>
        </div>
      </div>

      {/* Reviews section */}
      <ReviewSection movieId={movieId} />
    </div>
  );
};

export default MovieDetails;
