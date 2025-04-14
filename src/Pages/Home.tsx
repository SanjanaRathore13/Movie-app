// Pages/Home.tsx

import { Link } from "react-router-dom";
import Search from "../Pages/Search";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-white min-h-[80vh] px-6 bg-gradient-to-br from-gray-900 via-purple-800 to-black">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Welcome to <span className="text-yellow-400">Cineverse</span> 🎬
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mb-6 text-gray-300">
        Discover, explore and review your favorite Movies, TV Shows, and Actors — all in one place!
      </p>

      <div className="mb-8 w-full max-w-xl">
        <Search />
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          to="/movies"
          className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full hover:bg-yellow-300 transition"
        >
          Explore Movies
        </Link>
        <Link
          to="/actors"
          className="bg-pink-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-pink-400 transition"
        >
          Browse Actors
        </Link>
        <Link
          to="/watchlist"
          className="bg-purple-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-purple-500 transition"
        >
          Your Watchlist
        </Link>
      </div>
    </div>
  );
};

export default Home;
