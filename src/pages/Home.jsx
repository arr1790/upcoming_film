import { useEffect, useState, useContext } from 'react';
import MovieCard from '../components/MovieCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Buscar from '../components/Buscar';
import { AuthContext } from '../context/authContext';
import CarteleraPortada from '../components/CarteleraPortada';
import Pagination from '../components/pagination';

const Home = () => {
  const [movieListPage, setMovieListPage] = useState(1);
  const [movieList, setMovieList] = useState([]);
  const [listType, setListType] = useState('now_playing');
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${listType}?api_key=a67ff818ee91cb525d9643b776006095&language=es-ES&page=${movieListPage}`
      );
      const data = await response.json();
      setMovieList(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      toast.error('Hubo un error al cargar las películas.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [listType, movieListPage]);

  const handleListTypeChange = (type) => {
    setListType(type);
    setMovieListPage(1);
  };

  const mappedListType = (type) => {
    const listTypes = {
      now_playing: 'Cartelera',
      popular: 'Populares',
      top_rated: 'Más votados',
      upcoming: 'Estrenos',
    };
    return listTypes[type];
  };

  const featuredMovies = movieList.slice(0, 4);

  return (
    <>
      <div className="inline-block">
        <div className="flex flex-wrap items-center justify-between p-6 bg-gray-900 text-white">
          <ul className="flex flex-wrap justify-center sm:justify-start space-x-4 sm:space-x-6 mb-4 sm:mb-0">
            {['now_playing', 'popular', 'top_rated', 'upcoming'].map((type) => (
              <li
                key={type}
                onClick={() => handleListTypeChange(type)}
                className="px-4 py-2 cursor-pointer transition duration-300 hover:text-blue-800"
              >
                {mappedListType(type)}
              </li>
            ))}
          </ul>
          <div className="flex-shrink-0 ml-0 sm:ml-12 w-full sm:w-auto mt-4 sm:mt-0">
            <Buscar movieList={movieList} setMovieList={setMovieList} />
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Mostrar la portada de las películas destacadas */}
        <CarteleraPortada featuredMovies={featuredMovies} listType={listType} />

        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          {mappedListType(listType)}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Mapeo de las películas */}
          {movieList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Paginación */}
        <Pagination 
          currentPage={movieListPage} 
          totalPages={totalPages} 
          onPageChange={setMovieListPage} 
        />
      </div>

      <ToastContainer />
    </>
  );
};

export default Home;
