import { useState } from 'react';

const CarteleraPortada = ({ featuredMovies, listType }) => {
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);

  if (!featuredMovies || featuredMovies.length === 0) {
    return null; // No mostrar nada si no hay películas
  }

  
  const movieTitle = featuredMovies[currentPosterIndex].title;


  const titleParts = movieTitle.split(':');
  const firstLine = titleParts[0] + (titleParts.length > 1 ? ':' : '');
  const secondLine = titleParts.length > 1 ? titleParts.slice(1).join(':') : '';

  // URL de la imagen por defecto (en caso de que no haya portada)
  const defaultPosterImage = "https://via.placeholder.com/600x300?text=Sin+Portada";

  const backdropImageUrl = featuredMovies[currentPosterIndex].backdrop_path
    ? `https://image.tmdb.org/t/p/original${featuredMovies[currentPosterIndex].backdrop_path}`
    : defaultPosterImage;

  return (
    <div className="flex justify-center items-center mb-8 px-4">
     
      <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-8">
      
        <div className="flex flex-col space-y-4 text-center lg:text-left">
          
          <h2 className="text-4xl lg:text-6xl font-bold text-white">
            {firstLine}
          </h2>

    
          {secondLine && (
            <h2 className="text-4xl lg:text-6xl font-bold text-white">
              {secondLine}
            </h2>
          )}
        </div>

  
        <div className="relative w-full lg:w-[600px] h-[200px] lg:h-[300px] rounded-lg overflow-hidden">
          <img
            src={backdropImageUrl} 
            alt={movieTitle}
            className="w-full h-full object-cover"
          />

         
          <button
            onClick={() =>
              setCurrentPosterIndex((prev) =>
                prev > 0 ? prev - 1 : featuredMovies.length - 1
              )
            }
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
          >
            &#10094; 
          </button>

       
          <button
            onClick={() =>
              setCurrentPosterIndex((prev) =>
                prev < featuredMovies.length - 1 ? prev + 1 : 0
              )
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
