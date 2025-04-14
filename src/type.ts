type Review = {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  text: string;
  timestamp: any;
  upvotes: number;    // Upvotes count
  downvotes: number; // Or: Firebase Timestamp
};
// src/type.ts

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}
