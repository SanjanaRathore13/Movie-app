import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../type";
import { db } from "../firebaseConfig"; // Make sure Firebase is correctly initialized
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  // Fetch movie details from TMDb
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=0651c4e0406d94f5fd9f00d1fcf71796&language=en-US`
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.status_message || "Failed to fetch movie details");

        const movieData: Movie = {
          id: data.id.toString(),
          title: data.title,
          rating: data.vote_average,
          posterPath: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
          year: parseInt(data.release_date?.slice(0, 4) || "0"),
          genre: data.genres?.map((g: { id: number; name: string }) => g.name) || [],
        };

        setMovie(movieData);
      } catch (err) {
        setError("Error fetching movie details.");
        console.error("Movie details error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovieDetails();
  }, [id]);

  // Fetch reviews from Firebase
  useEffect(() => {
    const fetchReviews = async () => {
      const q = query(collection(db, "reviews"), where("movieId", "==", id));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setReviews(data);
    };

    if (id) fetchReviews();
  }, [id]);

  // Handle add/edit review
  const handleReviewSubmit = async () => {
    if (!name || !comment || !rating) return;

    if (editId) {
      await updateDoc(doc(db, "reviews", editId), { name, comment, rating });
      setEditId(null);
    } else {
      await addDoc(collection(db, "reviews"), {
        name,
        rating,
        comment,
        movieId: id,
      });
    }

    setName("");
    setRating(0);
    setComment("");

    // Re-fetch reviews after update
    const q = query(collection(db, "reviews"), where("movieId", "==", id));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setReviews(data);
  };

  // Delete a review
  const handleDelete = async (reviewId: string) => {
    await deleteDoc(doc(db, "reviews", reviewId));
    setReviews(reviews.filter((r) => r.id !== reviewId));
  };

  // Start editing a review
  const handleEdit = (review: any) => {
    setEditId(review.id);
    setName(review.name);
    setRating(review.rating);
    setComment(review.comment);
  };

  return (
    <div className="p-4">
      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {movie ? (
        <>
          <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
            <img src={movie.posterPath} alt={movie.title} className="w-64 rounded-lg shadow-lg" />
            <div className="md:ml-6">
              <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
              <p className="text-gray-400">Year: {movie.year}</p>
              <p className="text-yellow-400">Rating: {movie.rating}</p>
              <p className="text-gray-300">Genres: {movie.genre.join(", ")}</p>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-2">Reviews</h2>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-2 p-2 rounded bg-gray-700 text-white"
            />
            <input
              type="number"
              min={0}
              max={10}
              placeholder="Rating (0-10)"
              value={rating}
              onChange={(e) => setRating(parseFloat(e.target.value))}
              className="w-full mb-2 p-2 rounded bg-gray-700 text-white"
            />
            <textarea
              placeholder="Write your review"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full mb-2 p-2 rounded bg-gray-700 text-white"
            ></textarea>
            <button
              onClick={handleReviewSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editId ? "Update Review" : "Submit Review"}
            </button>

            <div className="mt-4 space-y-2">
              {reviews.map((review) => (
                <div key={review.id} className="bg-gray-700 p-2 rounded text-white">
                  <p className="font-semibold">{review.name} rated it {review.rating} stars</p>
                  <p>{review.comment}</p>
                  <div className="text-sm mt-1 space-x-4">
                    <button onClick={() => handleEdit(review)} className="text-blue-400">Edit</button>
                    <button onClick={() => handleDelete(review.id)} className="text-red-400">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        !loading && <p className="text-gray-400">Movie not found.</p>
      )}
    </div>
  );
};

export default MovieDetails;
