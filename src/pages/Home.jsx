// src/pages/Home.jsx

import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import MovieCard from '../components/MovieCard';
import Search from '../components/search';


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
      <div className="inline-block">
        {/* Menú de navegación y búsqueda en la misma línea */}
        <div className="flex items-center justify-between p-6 bg-gray-900 text-white">
          {/* Menú */}
          <ul className="flex space-x-4">
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
  
          {/* Campo de búsqueda alineado a la derecha */}
          <div className="flex-shrink-0 ml-12">
            <Search movieList={movieList} setMovieList={setMovieList} />
          </div>
        </div>
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
