import { Link } from "react-router-dom";
import AddToFavourite from "./AddToFavourite";

const MovieCard = ({ movie }) => {
  const imageUrlBase = "https://image.tmdb.org/t/p/w500/";

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-xl">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={movie.poster_path ? imageUrlBase + movie.poster_path : "ruta_imagen_respaldo.jpg"}
          alt={movie.title}
          className="object-cover mb-4 transition-transform duration-300 transform hover:scale-110"
        />
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-white text-lg font-semibold truncate">{movie.title}</h2>
        <AddToFavourite movieId={movie.id} /> {/* Asegúrate de pasar el ID de la película */}
      </div>

      <p className="text-gray-600 mt-2 line-clamp-3">{movie.overview}</p>

      <div className="flex justify-between items-center mt-2">
        <span className="text-gray-600">
          {new Date(movie.release_date).toLocaleDateString("es-ES")}
        </span>

        <span className="text-yellow-400 font-semibold">
          {movie.vote_average.toFixed(1)}
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
