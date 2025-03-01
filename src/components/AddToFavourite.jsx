import { useState } from "react";
import { db, auth } from "../firebaseConfig"; 
import { collection, addDoc } from "firebase/firestore";

function AddToFavourite({ movieId }) {
  const [isFav, setIsFav] = useState(false); 

  const addToFav = async () => {
    const user = auth.currentUser; 
    if (!user) {
      console.error("Debes iniciar sesión para añadir a favoritos.");
      return;
    }

    try {
      await addDoc(collection(db, "favourites"), {
        userId: user.uid, 
        movieId: movieId,
        timestamp: new Date(), 
      });
      
      setIsFav(true);
      console.log(`Película ${movieId} añadida a favoritos.`);
    } catch (error) {
      console.error("Error al añadir a favoritos:", error);
    }
  };

  return (
    <div className="cursor-pointer" onClick={addToFav}>
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
    </div>
  );
}

export default AddToFavourite;
