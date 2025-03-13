import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import { Bar } from "react-chartjs-2";
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
            return data.title || `Película ${movie.movieId}`; 
          })
        );

        const counts = sortedMovies.map((movie) => movie.count);

        // Generar colores aleatorios para cada barra
        const randomColors = sortedMovies.map(() => 
          `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`
        );

        // Preparar los datos para el gráfico
        setChartData({
          labels: movieTitles, // Usamos los títulos obtenidos de TMDb
          datasets: [
            {
              label: "Cantidad de veces que una película es favorita",
              data: counts,
              backgroundColor: randomColors, 
              borderColor: randomColors.map((color) => color.replace("0.7", "1")), // Hacemos el borde de cada barra más oscuro
              borderWidth: 2,
              borderRadius: 10, // Bordes redondeados
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
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-white mb-6">
        Top 6 Películas Más favoritas por los Usuarios
      </h2>
      {loading && <p className="text-center text-gray-400">Cargando...</p>}
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
                  text: "Ranking de Películas Más Votadas como Favoritas",
                  font: {
                    size: 18,
                  },
                  padding: 20,
                  color: "#fff", // Color del título
                },
                legend: {
                  display: false, // Ocultar la leyenda si no es necesaria
                },
                tooltip: {
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  titleFont: {
                    size: 14,
                  },
                  bodyFont: {
                    size: 12,
                  },
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
                    color: "#fff", // Color del texto en el eje X
                  },
                  ticks: {
                    autoSkip: true, // Evitar que los títulos se solapen
                    maxRotation: 45, // Rotar etiquetas para mejor visibilidad
                    minRotation: 30,
                    color: "#fff", // Color de las etiquetas
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Cantidad de Favoritos",
                    font: {
                      size: 14,
                    },
                    color: "#fff", // Color del texto en el eje Y
                  },
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1, // Asegurarse de que las barras se vean bien
                    color: "#fff", // Color de las etiquetas
                  },
                },
              },
            }}
          />
        </div>
      ) : (
        !loading && <p className="text-center text-gray-400">No hay datos disponibles para mostrar.</p>
      )}
    </div>
  );
};

export default FavouriteMoviesChart;
