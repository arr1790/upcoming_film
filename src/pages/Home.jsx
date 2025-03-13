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

  const { welcomeMessage } = useContext(AuthContext);

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
      <div className="inline-block w-full">
        {/* Contenedor de la lista y el buscador */}
        <div className="flex flex-col sm:flex-row items-center justify-center p-4 sm:p-6 bg-gray-900 text-white">
          {/* Lista de opciones (Cartelera, Populares, etc.) */}
          <ul className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-0">
            {['now_playing', 'popular', 'top_rated', 'upcoming'].map((type) => (
              <li
                key={type}
                onClick={() => handleListTypeChange(type)}
                className="px-3 sm:px-4 py-2 cursor-pointer transition duration-300 hover:text-blue-400 text-sm sm:text-base"
              >
                {mappedListType(type)}
              </li>
            ))}
          </ul>

          {/* Buscador */}
          <div className="w-full sm:w-auto">
            <Buscar movieList={movieList} setMovieList={setMovieList} />
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-4 sm:p-6">
        {welcomeMessage && (
          <h1 className="text-2xl sm:text-4xl text-center text-gray-500 font-semibold transition-all duration-1000 transform scale-105 opacity-100 mb-4 sm:mb-6 animate-fadeIn p-4 rounded-lg">
            {welcomeMessage}
          </h1>
        )}

        {/* Cartelera de portada */}
        <CarteleraPortada featuredMovies={featuredMovies} listType={listType} />

        {/* Título de la lista */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6">
          {mappedListType(listType)}
        </h2>

        {/* Lista de películas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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

      {/* Notificaciones */}
      <ToastContainer />
    </>
  );
};

export default Home;