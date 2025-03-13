import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Favourite from './pages/Favourite';
import About from './pages/About';
import Graph from './pages/Graph';
import MainLayout from './Mainlayouts';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/movies/:movieId" element={<MovieDetail />} />
            <Route path="/graph" element={<Graph />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </MainLayout>
      </Router>
    </AuthProvider>
  );
};

export default App;