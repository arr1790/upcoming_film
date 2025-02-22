// src/components/MovieCard.jsx
import { Link } from 'react-router-dom';
import AddToFavourite from './AddToFavourite';

const MovieCard = ({ movie }) => {

  const imageUrlBase = 'https://image.tmdb.org/t/p/w500/'

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-xl">
      <img src={imageUrlBase + movie.poster_path} alt={movie.title} className="object-cover mb-4" />
      <div className="flex justify-between">
        <h2 className="text-white text-lg font-semibold">{movie.title}</h2>
        <AddToFavourite movieId={movie.id} />
      </div>
      
      {/* Limitar las líneas de texto usando line-clamp */}
      <p className="text-gray-600 mt-2 line-clamp-3">
        {movie.overview}
      </p>
      
      <div className="flex justify-between items-center mt-2">
        <span className="text-gray-600">
          {new Date(movie.release_date).toLocaleDateString("es-ES")}
        </span>
        
        {/* Mostrar la valoración del movie */}
        <span className="text-yellow-400 font-semibold"> 
          {movie.vote_average.toFixed(1)} {/* Asegúrate de que se muestre con 1 decimal */}
        </span>
  
        <Link
          to={`/movies/${movie.id}`}
          className="text-blue-600 hover:text-blue-800"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
  
  
  
};

export default MovieCard;
