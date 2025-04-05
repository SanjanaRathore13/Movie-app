import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import StarRating from "./StarRating";
import { toast } from "react-toastify"; // ✅ toast import

interface Review {
  id: string;
  userId: string;
  text: string;
  rating: number;
  timestamp: Timestamp;
}

const ReviewSection: React.FC<{ movieId: number }> = ({ movieId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchReviews = async () => {
    const q = query(collection(db, "reviews"), where("movieId", "==", movieId));
    const querySnapshot = await getDocs(q);
    const reviewData: Review[] = [];

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      reviewData.push({
        id: docSnap.id,
        userId: data.userId,
        text: data.text,
        rating: data.rating,
        timestamp: data.timestamp,
      });
    });

    setReviews(reviewData);
  };

  useEffect(() => {
    fetchReviews();
  }, [movieId]);

  const handleAddOrUpdate = async () => {
    if (!user) return;

    try {
      if (editingId) {
        await updateDoc(doc(db, "reviews", editingId), {
          text: newReview,
          rating,
        });
        toast.success("Review updated ✏️");
      } else {
        await addDoc(collection(db, "reviews"), {
          movieId,
          userId: user.uid,
          text: newReview,
          rating,
          timestamp: Timestamp.now(),
        });
        toast.success("Review added ✅");
      }

      setNewReview("");
      setRating(0);
      setEditingId(null);
      fetchReviews();
    } catch (error) {
      toast.error("Failed to submit review ❌");
      console.error("Review submit error:", error);
    }
  };

  const handleEdit = (review: Review) => {
    setEditingId(review.id);
    setNewReview(review.text);
    setRating(review.rating);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "reviews", id));
      setReviews((prev) => prev.filter((r) => r.id !== id));
      toast.success("Review deleted 🗑️");
    } catch (error) {
      toast.error("Failed to delete review ❌");
      console.error("Delete error:", error);
    }
  };

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  return (
    <div className="text-white">
      {averageRating && (
        <p className="mb-2 text-yellow-400 font-semibold">
          ⭐ Average Rating: {averageRating}/5
        </p>
      )}

      {user ? (
        <div className="mb-4">
          <StarRating rating={rating} onRatingChange={setRating} />
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write a review..."
            className="w-full p-2 rounded mt-2 text-black"
          />
          <button onClick={handleAddOrUpdate} className="mt-2 px-4 py-2 bg-blue-600 rounded">
            {editingId ? "Update" : "Submit"}
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-300">Please log in to write a review.</p>
      )}

      <div className="space-y-3 mt-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-600 pb-2">
            <p>⭐ {review.rating} - {review.text}</p>
            {user?.uid === review.userId && (
              <div className="text-sm mt-1">
                <button
                  onClick={() => handleEdit(review)}
                  className="text-blue-400 hover:underline mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="text-red-400 hover:underline"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
