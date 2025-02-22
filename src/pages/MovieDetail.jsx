// src/pages/CourseDetail.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
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
      <div className="w-full  bg-black flex justify-center items-center">
        {videos.length > 0 ? (
          <div className="h-[500px] w-full">
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
          className="w-full"
        />
        )}
      </div>
  
      <div className="p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">{movie.title}</h2>
        <p className="text-lg text-gray-600 mb-4">{movie.overview}</p>
        <p className="text-gray-700 mt-4">Género: {movie?.genres?.map(genre => genre.name).join(', ')}</p>
      </div>
    </>
  );
  
};
export default MovieDetail;
