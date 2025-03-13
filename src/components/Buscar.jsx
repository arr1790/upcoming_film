import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Importamos useLocation

function Search({ setMovieList }) {
  const [searchTerms, setSearchTerms] = useState('');
  const [noResults, setNoResults] = useState(false); // Estado para controlar si hay resultados
  const location = useLocation(); // Hook para obtener la ruta actual

  const handleSearch = (e) => {
    e.preventDefault();

    // Verifica que el término de búsqueda no esté vacío
    if (!searchTerms.trim()) return;

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=a67ff818ee91cb525d9643b776006095&language=es-ES&query=${searchTerms}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('Datos de la búsqueda:', data);

        // Filtramos las películas que no tienen imagen de fondo
        const filteredMovies = data.results.filter((movie) => movie.backdrop_path);

        // Si no hay películas con imagen, mostramos el mensaje sin resultados
        if (filteredMovies.length === 0) {
          setNoResults(true);
          setMovieList([]); // Limpiar la lista de películas si no hay resultados
        } else {
          setNoResults(false);
          setMovieList(filteredMovies); // Establecer las películas si hay resultados
        }

        // Limpiar el campo de búsqueda después de buscar
        setSearchTerms('');
      })
      .catch((error) => {
        console.error('Error en la búsqueda:', error);
      });
  };

  // Restablecer `noResults` a false cuando el usuario cambie de ruta
  useEffect(() => {
    setNoResults(false); // Restablecemos noResults a false cada vez que cambie la ruta
  }, [location]); // Este efecto se ejecutará cada vez que cambie la ubicación

  // Restablecer `noResults` a `false` cuando el usuario empiece a escribir nuevamente
  const handleChange = (e) => {
    setSearchTerms(e.target.value);

    // Si el campo de búsqueda no está vacío, restablecemos noResults a false
    if (e.target.value.trim() !== '') {
      setNoResults(false);
    }
  };

  return (
    <div className="search py-6">
      <div className="search-container px-4">
        <form
          className="search flex items-center bg-gray-800 p-2 rounded-lg max-w-lg mx-auto"
          onSubmit={handleSearch}
        >
          <input
            value={searchTerms}
            type="text"
            className="search__input w-full py-2 pl-4 pr-12 bg-gray-700 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Buscar película..."
            onChange={handleChange} // Usamos la nueva función handleChange
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-r-lg transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* Mostrar el mensaje de "No hay películas" si no hay resultados */}
      {noResults && (
        <div className="results mt-4 text-center">
          <h2 className="text-gray-300">No hay películas con ese nombre.</h2>
        </div>
      )}

      {/* Mostrar el término de búsqueda si está presente */}
      <div className="results mt-4 text-center">
        <h2 className="search-terms text-gray-300">
          {searchTerms !== '' ? `Búsqueda: ${searchTerms}` : ''}
        </h2>
      </div>
    </div>
  );
}

export default Search;
