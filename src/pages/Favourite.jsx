import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";  // useEffect ejecuta código cuando cambia un estado (para hacer la petición a Firebase).
import { AuthContext } from "../context/authContext";

function Favourite() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);
  const { isLogged } = useContext(AuthContext); // Obtiene del AuthContext si el usuario está autenticado.

  useEffect(() => {
    const fetchFavourites = async () => {
      if (!isLogged) return;
      setLoading(true); 
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const q = query(collection(db, "favourites"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const favouritesData = querySnapshot.docs.map(doc => doc.data());
        setFavourites(favouritesData);
      } catch (error) {
        setError("Error fetching favorites"); 
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, [isLogged]);

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <h1 className="text-white text-2xl font-bold mb-4">PELICULAS FAVORITAS</h1>

      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-4">
        {favourites.length === 0 ? (
          <p className="text-white">No tienes películas favoritas.</p>
        ) : (
          favourites.map((fav, index) => (
            <li key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="flex">
                <div className="relative w-32 h-48 flex-shrink-0"> 
                  <img
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    src={`https://image.tmdb.org/t/p/w500${fav.poster_path}`}
                    alt={fav.title}
                  />
                </div>
                <div className="p-3 flex-grow">
                  <h2 className="text-lg text-white font-bold mb-1">{fav.title}</h2>
                  <p className="text-gray-400 text-sm mb-2 line-clamp-2">{fav.overview}</p>
                  <p className="text-gray-500 text-xs">Estreno: {fav.release_date}</p>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Favourite;