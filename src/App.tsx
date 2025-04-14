// src/App.tsx

import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Movies from "./Pages/Movies";
import Actors from "./Pages/Actor";
import Watchlist from "./Pages/Watchlist";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import MovieDetails from "./Pages/MovieDetails";

function App() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/actors" element={<Actors />} />
        <Route path="/watchlist" element={<Watchlist />} />

        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
