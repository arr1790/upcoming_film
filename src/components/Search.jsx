import { useState } from 'react';

 function Search({ setMovieList }) {
  const [searchTerms, setSearchTerms] = useState('');

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
        setMovieList(data.results);
      })
      .catch((error) => {
        console.error('Error en la búsqueda:', error); 
      });
  };

  return (
    <div className="search">
      <div className="search-container">
        <form className="search flex items-center bg-gray-800 p-2 rounded-lg max-w-md mx-auto" onSubmit={handleSearch}>
          <input
            value={searchTerms}
            type="text"
            className="search__input w-full py-2 pl-4 pr-12 bg-gray-700 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Buscar película..."
            onChange={(e) => setSearchTerms(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-r-lg transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Buscar
          </button>
        </form>
      </div>
      <div className="results mt-4 text-center">
        <h2 className="search-terms text-gray-300">
          {searchTerms !== '' ? `Búsqueda: ${searchTerms}` : ''}
        </h2>
      </div>
    </div>
  );
}
export default Search
