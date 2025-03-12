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
    <div className="flex justify-center items-center mb-8 px-4">
      {/* Contenedor principal (título y etiqueta a la izquierda, imagen a la derecha) */}
      <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-8">
        {/* Título y etiqueta a la izquierda */}
        <div className="flex flex-col space-y-4 text-center lg:text-left">
          {/* Primera línea del título */}
          <h2 className="text-4xl lg:text-6xl font-bold text-white">
            {firstLine}
          </h2>

          {/* Segunda línea del título (si existe) */}
          {secondLine && (
            <h2 className="text-4xl lg:text-6xl font-bold text-white">
              {secondLine}
            </h2>
          )}

          {/* Mostrar la etiqueta "¡Ya en tu cine!" solo si el tipo es "now_playing" */}
          {listType === 'now_playing' && (
            <span className="text-xl lg:text-2xl bg-blue-600 px-4 py-2 rounded-full shadow-lg w-fit mx-auto lg:mx-0 text-white">
              ¡Ya en tu cine!
            </span>
          )}
        </div>

        {/* Imagen de la película (formato horizontal) */}
        <div className="relative w-full lg:w-[600px] h-[200px] lg:h-[300px] rounded-lg overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/original${featuredMovies[currentPosterIndex].backdrop_path}`}
            alt={movieTitle}
            className="w-full h-full object-cover"
          />

          {/* Botón para retroceder */}
          <button
            onClick={() =>
              setCurrentPosterIndex((prev) =>
                prev > 0 ? prev - 1 : featuredMovies.length - 1
              )
            }
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
          >
            &#10094; {/* Ícono de flecha izquierda */}
          </button>

          {/* Botón para avanzar */}
          <button
            onClick={() =>
              setCurrentPosterIndex((prev) =>
                prev < featuredMovies.length - 1 ? prev + 1 : 0
              )
            }
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
          >
            &#10095; {/* Ícono de flecha derecha */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarteleraPortada;
