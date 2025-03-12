import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favourite from "./pages/Favourite";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/movies/:movieId" element={<MovieDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer /> 
    </Router>
  );
};

export default App;
