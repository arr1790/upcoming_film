import { useState } from 'react';

const CarteleraPortada = ({ featuredMovies, listType }) => {
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);

  if (!featuredMovies || featuredMovies.length === 0) {
    return null; // No mostrar nada si no hay películas
  }

  // Obtener el título de la película actual
  const movieTitle = featuredMovies[currentPosterIndex].title;

  // Dividir el título en dos líneas (si es necesario)
  const titleParts = movieTitle.split(':');
  const firstLine = titleParts[0] + (titleParts.length > 1 ? ':' : '');
  const secondLine = titleParts.length > 1 ? titleParts.slice(1).join(':') : '';

  return (
    <div className="flex justify-center items-center mb-8 p-4">
      <div className="flex flex-col sm:flex-row sm:space-x-8 w-full">
        {/* Título y etiqueta a la izquierda */}
        <div className="flex flex-col space-y-4 w-full sm:w-1/2">
          <h2 className="text-4xl sm:text-6xl font-bold text-white text-center sm:text-left">{firstLine}</h2>
          {secondLine && (
            <h2 className="text-4xl sm:text-6xl font-bold text-white text-center sm:text-left">{secondLine}</h2>
          )}

          {/* Mostrar la etiqueta solo si la lista es "now_playing" */}
          {listType === 'now_playing' && (
            <span className="text-xl sm:text-2xl bg-blue-600 px-4 py-2 rounded-full shadow-lg w-fit text-white mt-4">
              ¡Ya en tu cine!
            </span>
          )}
        </div>

        {/* Imagen de la película */}
        <div className="relative w-full sm:w-[600px] h-[300px] sm:h-[400px] rounded-lg overflow-hidden mt-4 sm:mt-0">
          <img
            src={`https://image.tmdb.org/t/p/original${featuredMovies[currentPosterIndex].backdrop_path}`}
            alt={movieTitle}
            className="w-full h-full object-cover"
          />

          {/* Botón para retroceder */}
          <button
            onClick={() =>
              setCurrentPosterIndex((prev) => (prev > 0 ? prev - 1 : featuredMovies.length - 1))
            }
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
          >
            &#10094;
          </button>

          {/* Botón para avanzar */}
          <button
            onClick={() =>
              setCurrentPosterIndex((prev) => (prev < featuredMovies.length - 1 ? prev + 1 : 0))
            }
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
          >
            &#10095;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarteleraPortada;
