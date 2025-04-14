import {
    collection,
    addDoc,
    query,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    serverTimestamp,
    where,
  } from "firebase/firestore";
  import { db } from "../firebaseConfig"; // ✅ adjust path if your file is firebase.ts
  
  export const addReview = async (movieId: string, review: any) => {
    await addDoc(collection(db, "reviews"), {
      ...review,
      movieId,
      timestamp: serverTimestamp(),
    });
  };
  
  export const getReviews = async (movieId: string) => {
    const q = query(collection(db, "reviews"), where("movieId", "==", movieId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };
  
  export const deleteReview = async (reviewId: string) => {
    await deleteDoc(doc(db, "reviews", reviewId));
  };
  
  export const updateReview = async (
    reviewId: string,
    newText: string,
    newRating: number
  ) => {
    await updateDoc(doc(db, "reviews", reviewId), {
      text: newText,
      rating: newRating,
      timestamp: serverTimestamp(),
    });
  };
  