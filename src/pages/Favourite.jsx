import { db, auth } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

function Favourite() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const q = query(collection(db, "favourites"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        setFavourites(querySnapshot.docs.map(doc => doc.data()));
      } catch (error) {
        console.error("Error obteniendo favoritos:", error);
      }
    };

    fetchFavourites();
  }, []);

  return (
    <div>
      <h1 className="text-white text-3xl font-semibold">Tus películas favoritas</h1>
      <ul>
        {favourites.map((fav, index) => (
          <li key={index}>ID de Película: {fav.movieId}</li>
        ))}
      </ul>
    </div>
  );
}

export default Favourite;
