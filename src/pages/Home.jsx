// src/pages/Home.jsx

import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const [movieListPage, setMovieListPage] = useState(1)
  const [movieList, setMovieList] = useState([]);
  const [listType, setListType] = useState('now_playing');
  
  const UPCOMING_URL = `https://api.themoviedb.org/3/movie/${listType}?api_key=a67ff818ee91cb525d9643b776006095&language=es-ES&page=${movieListPage}`;
  useFetch(UPCOMING_URL, setMovieList);


  const mappedListType = (type) => {
    const listTypes = {
      'now_playing': 'Cartelera',
      'popular': 'Populares',
      'top_rated': 'Más votados',
      'upcoming': 'Estrenos'
    }

    return listTypes[type]
  }
  return (
    <>
      <div className="inline-block border-b-4 border-double border-gray-500">
        <ul className="flex space-x-4 p-4 bg-gray-900 text-white">
          <li
            onClick={() => setListType("now_playing")}
            className="px-4 py-2 cursor-pointer transition duration-300 hover:text-blue-800"
          >
            Cartelera
          </li>
          <li
            onClick={() => setListType("popular")}
            className="px-4 py-2 cursor-pointer transition duration-300 hover:text-blue-800"
          >
            Populares
          </li>
          <li
            onClick={() => setListType("top_rated")}
            className="px-4 py-2 cursor-pointer transition duration-300 hover:text-blue-800"
          >
            Más votados
          </li>
          <li
            onClick={() => setListType("upcoming")}
            className="px-4 py-2 cursor-pointer transition duration-300 hover:text-blue-800"
          >
            Estrenos
          </li>
        </ul>
      </div>
  
      <div className="p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          {mappedListType(listType)}
        </h2>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {movieList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
  
  
};

export default Home;
