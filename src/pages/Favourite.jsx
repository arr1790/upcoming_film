import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";

function Favourite() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);  // For loading state
  const [error, setError] = useState(null);  // For error state
  const { isLogged } = useContext(AuthContext);

  useEffect(() => {
    const fetchFavourites = async () => {
      if (!isLogged) return; // Don't fetch if not logged in
      setLoading(true); // Start loading
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const q = query(collection(db, "favourites"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        setFavourites(querySnapshot.docs.map(doc => doc.data()));
      } catch (error) {
        setError("Error fetching favorites"); // Update error state
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchFavourites();
  }, [isLogged]); // Re-fetch if isLogged changes

  return (
    <div>
      <h1 className="text-white text-3xl font-semibold">Tus películas favoritas</h1>
      
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <ul>
        {favourites.length === 0 ? (
          <p>No tienes películas favoritas.</p>
        ) : (
          favourites.map((fav, index) => (
            <li key={index}>ID de Película: {fav.movieId}</li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Favourite;
