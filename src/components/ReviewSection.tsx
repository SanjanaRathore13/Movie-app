import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig"; // Ensure you have this file properly configured
import { collection, query, where, onSnapshot, updateDoc, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext"; // Assuming you have authentication context

interface Review {
  id: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  timestamp: any;
  upvotes: number;
  downvotes: number;
}

interface ReviewSectionProps {
  movieId: string | undefined; // Change here to allow undefined
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ movieId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sortOption, setSortOption] = useState<string>("recent"); // Default sorting by 'recent'
  const { user } = useAuth(); // Assuming you're using authentication context

  // Fetch reviews for the given movieId
  useEffect(() => {
    if (!movieId) return;

    const q = query(
      collection(db, "reviews"),
      where("movieId", "==", movieId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReviews: Review[] = snapshot.docs.map((doc) => {
        const reviewData = doc.data() as Omit<Review, 'id'>; // Omit id from object to return correct structure
        return {
          id: doc.id, // Attach the ID separately
          ...reviewData, // Spread the rest of the review fields
        };
      });
      setReviews(fetchedReviews); // Set the reviews state
    });

    return () => unsubscribe(); // Clean up subscription when component unmounts
  }, [movieId]);

  // Function to handle sorting of reviews
  const sortReviews = (reviews: Review[]) => {
    if (sortOption === "recent") {
      return reviews.sort((a, b) => b.timestamp - a.timestamp); // Sort by most recent
    } else if (sortOption === "helpful") {
      return reviews.sort((a, b) => b.upvotes - a.upvotes); // Sort by most upvotes (helpfulness)
    }
    return reviews; // Default sorting (no specific sort)
  };

  // Handle upvote/downvote actions
  const handleVote = async (reviewId: string, voteType: "upvote" | "downvote") => {
    if (!user) {
      alert("You must be logged in to vote on reviews.");
      return;
    }

    const reviewRef = doc(db, "reviews", reviewId);

    try {
      // Fetch the document data using getDoc (it returns a DocumentSnapshot)
      const reviewDoc = await getDoc(reviewRef);
      if (!reviewDoc.exists()) {
        console.log("Review not found");
        return;
      }

      const reviewData = reviewDoc.data();
      const currentUpvotes = reviewData?.upvotes || 0;
      const currentDownvotes = reviewData?.downvotes || 0;

      // Increment or decrement based on the vote type
      const newUpvotes = voteType === "upvote" ? currentUpvotes + 1 : currentUpvotes;
      const newDownvotes = voteType === "downvote" ? currentDownvotes + 1 : currentDownvotes;

      // Update the review document in Firestore
      await updateDoc(reviewRef, {
        upvotes: newUpvotes,
        downvotes: newDownvotes,
      });

      console.log(`Review ${voteType}d successfully.`);
    } catch (error) {
      console.error("Error updating review votes:", error);
    }
  };

  return (
    <div className="text-white space-y-4">
      <h2 className="text-2xl font-semibold">Reviews</h2>

      {/* Sort dropdown */}
      <div className="mb-4">
        <label className="mr-2 text-sm">Sort By:</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded"
        >
          <option value="recent">Most Recent</option>
          <option value="helpful">Most Helpful</option>
        </select>
      </div> {/* Closing div for the sort dropdown */}

      {reviews.length === 0 ? (
        <p className="text-gray-400">No reviews yet.</p>
      ) : (
        sortReviews(reviews).map((review) => (
          <div key={review.id} className="border p-4 rounded bg-gray-800">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">{review.username}</span>
              <span>⭐ {review.rating}</span>
            </div>
            <p>{review.comment}</p>

            {/* Voting buttons */}
            <div className="flex mt-2">
              <button
                onClick={() => handleVote(review.id, "upvote")}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Upvote ({review.upvotes})
              </button>
              <button
                onClick={() => handleVote(review.id, "downvote")}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Downvote ({review.downvotes})
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewSection;
