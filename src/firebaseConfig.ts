// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // 👈 Add this line
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEzFot2Fg_IKG8oCu0Bl6JfZ21E__GpzA",
  authDomain: "movie-app-1aa29.firebaseapp.com",
  projectId: "movie-app-1aa29",
  storageBucket: "movie-app-1aa29.firebasestorage.app",
  messagingSenderId: "846445697133",
  appId: "1:846445697133:web:03834e5440ab3f9e0fc764",
  measurementId: "G-C0PEP21Y0J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 👇 Initialize Firestore and export it
export const db = getFirestore(app);
export const auth = getAuth(app);