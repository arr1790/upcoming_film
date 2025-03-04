import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import { Bar } from "react-chartjs-2"; // Usamos un gráfico de barras
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Registrar los componentes de Chart.js necesarios
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const API_KEY = "a67ff818ee91cb525d9643b776006095"; 
const TMDB_URL = "https://api.themoviedb.org/3/movie/";

const FavouriteMoviesChart = () => {
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavouriteMovies = async () => {
      try {
        // Consulta todos los documentos de la colección "favourites"
        const q = query(collection(db, "favourites"));
        const querySnapshot = await getDocs(q);

        const movieCount = {};

        // Contar cuántas veces cada película ha sido marcada como favorita
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const movieId = data.movieId;
          movieCount[movieId] = (movieCount[movieId] || 0) + 1;
        });

        // Convertir los datos en formato adecuado para el gráfico
        const movies = Object.keys(movieCount).map((movieId) => ({
          movieId,
          count: movieCount[movieId],
        }));

    
        const sortedMovies = movies.sort((a, b) => b.count - a.count).slice(0, 6);

        setFavouriteMovies(sortedMovies);

        // Obtener los títulos reales de las películas desde TMDb API
        const movieTitles = await Promise.all(
          sortedMovies.map(async (movie) => {
            const response = await fetch(`${TMDB_URL}${movie.movieId}?api_key=${API_KEY}&language=es-ES`);
            const data = await response.json();
            return data.title || `Película ${movie.movieId}`; // Usar el título de TMDb o un valor por defecto
          })
        );

        const counts = sortedMovies.map((movie) => movie.count);

        // Preparar los datos para el gráfico
        setChartData({
          labels: movieTitles, // Usamos los títulos obtenidos de TMDb
          datasets: [
            {
              label: "Cantidad de veces que una película es favorita",
              data: counts,
              backgroundColor: "rgba(75, 192, 192, 0.6)", // Color más vibrante
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        setError("Hubo un problema al obtener los datos.");
        console.error("Error al obtener las películas favoritas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavouriteMovies();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Películas Favoritas
      </h2>
      {loading && <p className="text-center text-gray-600">Cargando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {chartData ? (
        <div className="w-full h-96">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: "Películas Favoritas por Usuarios",
                  font: {
                    size: 16,
                  },
                },
                legend: {
                  display: false, // Ocultar la leyenda si no es necesaria
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Películas",
                    font: {
                      size: 14,
                    },
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Cantidad de Favoritos",
                    font: {
                      size: 14,
                    },
                  },
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      ) : (
        !loading && <p className="text-center text-gray-600">No hay datos disponibles para mostrar.</p>
      )}
    </div>
  );
};

export default FavouriteMoviesChart;