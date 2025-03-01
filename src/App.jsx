import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Favourite from "./pages/Favourite";

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar siempre visible */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies/:movieId" element={<MovieDetail />} />
        <Route path="/favourite" element={<Favourite />} />
      </Routes>

      <Footer /> {/* Footer siempre visible */}
    </Router>
  );
};

export default App;


