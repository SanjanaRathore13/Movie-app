import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Correctly track user auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <>
      <nav className="flex flex-col md:flex-row justify-between items-center px-6 py-4 bg-gradient-to-r from-purple-700 via-indigo-600 to-yellow-400 text-white shadow-md z-50">
        <Link to="/" className="text-2xl font-bold mb-2 md:mb-0">
          🎬 <span className="text-yellow-300">Cineverse</span>
        </Link>

        <div className="flex gap-4 items-center text-base font-medium">
          <Link to="/movies" className="hover:underline hover:text-yellow-300 transition">Explore Movies</Link>
          <Link to="/actors" className="hover:underline hover:text-yellow-300 transition">Browse Actors</Link>
          <Link to="/watchlist" className="hover:underline hover:text-yellow-300 transition">Your Watchlist</Link>

          {!user ? (
            <>
              <button onClick={() => setShowLogin(true)} className="hover:text-green-300 transition">Login</button>
              <button onClick={() => setShowSignup(true)} className="hover:text-blue-300 transition">Signup</button>
            </>
          ) : (
            <>
              <span className="text-sm font-semibold">{user.email}</span>
              <button onClick={handleLogout} className="hover:text-red-400 transition">Logout</button>
            </>
          )}
        </div>
      </nav>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </>
  );
};

export default Navbar;
