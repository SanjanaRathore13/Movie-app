import * as React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const Navbar: React.FC = () => {
  const { user } = useAuth();

  const [showLogin, setShowLogin] = React.useState(false);
  const [showSignup, setShowSignup] = React.useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <>
      <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Movie-App</Link>
        <ul className="flex space-x-4 items-center">
          <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
          <li><Link to="/movies" className="hover:text-yellow-400">Movies</Link></li>
          <li><Link to="/search" className="hover:text-yellow-400">Search</Link></li>
          {user ? (
            <>
              <li className="text-yellow-300">Hello, {user.email}</li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  onClick={() => setShowLogin(true)}
                  className="hover:text-yellow-400"
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowSignup(true)}
                  className="hover:text-yellow-400"
                >
                  Signup
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Modals */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </>
  );
};

export default Navbar;
