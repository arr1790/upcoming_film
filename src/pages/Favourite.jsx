import { db } from "../firebaseConfig";
import { collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";

function Favourite() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLogged } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState({ id: null, title: "" });

  useEffect(() => {
    const fetchFavourites = async () => {
      if (!isLogged) return;
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const q = query(collection(db, "favourites"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const favouritesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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

  const openImage = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const handleDeleteFavourite = async () => {
    try {
      await deleteDoc(doc(db, "favourites", deleteInfo.id));
      setFavourites(favourites.filter((fav) => fav.id !== deleteInfo.id));
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting favourite:", error);
    }
  };

  const handleRightClick = (event, favouriteId, title) => {
    event.preventDefault();
    setDeleteInfo({ id: favouriteId, title });
    setShowModal(true);
  };

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
            <li
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all relative group"
              onContextMenu={(e) => handleRightClick(e, fav.id, fav.title)}
              style={{ cursor: "context-menu" }} // Indica que hay interacción
            >
              <div className="flex">
                <div
                  className="relative w-32 h-48 flex-shrink-0 cursor-zoom-in"
                  onClick={() => openImage(`https://image.tmdb.org/t/p/w500${fav.poster_path}`)}
                >
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

              {/* Icono de basura con tooltip, colocado en la parte inferior derecha */}
              <div className="absolute bottom-2 right-2 hidden group-hover:flex flex-col items-center">
                <span className="text-xs text-gray-300 bg-gray-700 px-2 py-1 rounded opacity-90">
                  Clic derecho para eliminar
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 19.5V7.5m12 12V7.5m-9-6h6m-3 0V1.5m-4.5 6h12m-12 0h12"
                  />
                </svg>
              </div>
            </li>
          ))
        )}
      </ul>

      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          onClick={closeImage}
        >
          <div className="max-w-[300px] w-full bg-gray-800 rounded-lg overflow-hidden">
            <img
              src={selectedImage}
              alt="Imagen ampliada"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMACIÓN */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-gray-900 text-lg font-bold mb-4">Eliminar Favorito</h2>
            <p className="text-gray-700 mb-4">
              ¿Seguro que quieres eliminar <span className="font-bold">{deleteInfo.title}</span> de tus favoritos?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                onClick={handleDeleteFavourite}
              >
                Eliminar
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Favourite;
