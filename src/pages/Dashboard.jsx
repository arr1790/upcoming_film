import React from "react";
import FavouriteMoviesChart from "../components/FavouriteMoviesChart"; // Asegúrate de importar correctamente el componente

const Dashboard = () => {
  return (
    <div>
      <h1>Grafico de peliculas favoritas</h1>
      <FavouriteMoviesChart /> {/* Aquí es donde se muestra el gráfico */}
    </div>
  );
};

export default Dashboard;
