import { Link } from 'react-router-dom';
import { useContext } from 'react';
import authService from '../authService';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const { isLogged, setIsLogged } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem("user"); // Limpiar datos del usuario del localStorage
      setIsLogged(false); 
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-between items-center text-white">
        <li>
          <Link to="/" className="hover:text-blue-400">Cine</Link>
         
          {!isLogged && (
            <>
              <Link to="/login" className="hover:text-blue-400 pl-4">Iniciar sesión</Link>
              <Link to="/register" className="hover:text-blue-400 pl-4">Registrarse</Link>
              <Link to="/dashboard" className="hover:text-blue-400 pl-4">Gráfico Favoritos</Link>
            </>
          )}

      
          {isLogged && (
            <>
              <Link to="/favourite" className="hover:text-blue-400 pl-4">Favoritos</Link>
              {/* Enlace al gráfico de las películas favoritas */}
              <Link to="/dashboard" className="hover:text-blue-400 pl-4">Gráfico Favoritos</Link>
            </>
          )}
        </li>

        {/* Mostrar botón de "Cerrar sesión" solo si el usuario está logueado */}
        <li>
          {isLogged && (
            <button onClick={handleLogout} className="text-red-500 hover:text-red-600 pl-4">
              Cerrar sesión
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
