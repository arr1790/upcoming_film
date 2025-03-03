import { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig"; 
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

const API_KEY = 'a67ff818ee91cb525d9643b776006095';
const API_BASE_URL = 'https://api.themoviedb.org/3';

function AddToFavourite({ movieId }) {
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkIfFavourite = async () => {
      const user = auth.currentUser;
      if (!user) return;

      setLoading(true);
      setError(null);

      try {
        const q = query(
          collection(db, "favourites"),
          where("userId", "==", user.uid),
          where("movieId", "==", movieId)
        );

        const querySnapshot = await getDocs(q);
        setIsFav(!querySnapshot.empty);
      } catch (err) {
        setError(err.message || "Error al comprobar favoritos.");
      } finally {
        setLoading(false);
      }
    };

    checkIfFavourite();
  }, [movieId, auth.currentUser]);

  const addToFav = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.error("Debes iniciar sesión para añadir a favoritos.");
      return;
    }

    const sessionId = localStorage.getItem('tmdb_session_id');
    if (!sessionId) {
      console.error("No hay sesión válida de TMDb.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Obtener account_id de TMDb
      const accountResponse = await fetch(`${API_BASE_URL}/account?api_key=${API_KEY}&session_id=${sessionId}`);
      const accountData = await accountResponse.json();
      if (!accountData.id) {
        throw new Error("No se pudo obtener la cuenta de TMDb.");
      }
      const accountId = accountData.id;

      // Añadir a favoritos en TMDb
      const response = await fetch(`${API_BASE_URL}/account/${accountId}/favorite?api_key=${API_KEY}&session_id=${sessionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ media_type: "movie", media_id: movieId, favorite: true }),
      });
       console.log(response);

      const data = await response.json();
      if (!response.ok || data.status_code !== 1) {
        throw new Error(data.status_message || "Error al agregar a favoritos en TMDb.");
      }

      // Guardar en Firestore si TMDb confirma la acción
      await addDoc(collection(db, "favourites"), {
        userId: user.uid,
        movieId,
        timestamp: new Date(),
      });

      setIsFav(true);
      console.log(`Película ${movieId} añadida a favoritos.`);
    } catch (err) {
      setError(err.message || "Error al añadir a favoritos.");
      console.error("Error al añadir a favoritos:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cursor-pointer" onClick={addToFav}>
      {loading ? (
        <span>Loading...</span>
      ) : error ? (
        <span className="text-red-500">{error}</span>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isFav ? "red" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      )}
    </div>
  );
}

export default AddToFavourite;
