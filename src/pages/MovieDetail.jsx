// src/pages/CourseDetail.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Spinner from '../components/Spinner';


const MovieDetail = () => {
  const { movieId } = useParams();

  const MOVIE_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=a67ff818ee91cb525d9643b776006095&language=es-ES`;
  const VIDEO_URL = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=a67ff818ee91cb525d9643b776006095&language=es-ES`;

  const [movie, setMovie] = useState({});
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true)
      try {
        const [movieResponse, videoResponse] = await Promise.all([
          fetch(MOVIE_URL).then((res) => res.json()),
          fetch(VIDEO_URL).then((res) => res.json()),
        ]);

        setMovie(movieResponse);
        setVideos(videoResponse.results);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setLoading(false)
      }
    };

    fetchMovieData();
  }, [movieId]);

  return (
    <>
      <Spinner loading={loading} />
      <div className="relative w-full bg-[#0b1b35] flex justify-center items-center">
        {videos.length > 0 ? (
          <div className="w-full h-[500px]">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videos[0].key}`}
              title={movie.title}
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-[500px] object-cover"
          />
        )}
      </div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto p-6 lg:flex lg:items-start lg:space-x-10 bg-[#0b1b35] text-white mt-10 rounded-lg shadow-lg">
        <div className="w-full lg:w-[250px] flex flex-col items-center">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        
        <div className="flex-1">
          <h2 className="text-4xl font-bold">{movie.title}</h2>
          
          {/* Actores */}
          <div className="mt-4">
            <p className="text-gray-300">{movie?.actors?.join(', ')}</p>
          </div>
  
          {/* Sinopsis */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">SINOPSIS</h3>
            <p className="text-gray-300">{movie.overview}</p>
          </div>
  
          {/* Detalles */}
          <div className="mt-4 flex flex-wrap gap-4 text-gray-300">
            <div>
              <h3 className="text-lg font-semibold">DURACIÓN</h3>
              <p>{movie.runtime} min</p>
            </div>
  
            <div>
              <h3 className="text-lg font-semibold">VALORACIÓN</h3>
              <p>{movie.vote_average}/10</p>
            </div>
  
            <div>
              <h3 className="text-lg font-semibold">FECHA DE ESTRENO</h3>
              <p>{new Date(movie.release_date).toLocaleDateString("es-ES")}</p>
            </div>
          </div>
  
          {/* Géneros */}
          <div className="mt-4 flex gap-2">
            {movie?.genres?.map((genre) => (
              <span key={genre.id} className="px-3 py-1 border rounded-lg text-sm">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};  
export default MovieDetail;
