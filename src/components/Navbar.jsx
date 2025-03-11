import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import authService from '../authService';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const { isLogged, setIsLogged } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para controlar el menú móvil

  const handleLogout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem("user"); // Limpiar datos del usuario del localStorage
      setIsLogged(false); // Actualizar el estado de la autenticación
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center text-white">
        {/* Logo o Nombre de la app */}
        <Link to="/" className="text-lg font-semibold hover:text-blue-400">
          Cine
        </Link>

        {/* Botón para abrir/cerrar el menú móvil */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-white"
        >
          <span className={`text-2xl ${isMobileMenuOpen ? 'rotate-90' : ''}`}>☰</span>
        </button>

        {/* Menú en pantallas grandes */}
        <ul className="hidden lg:flex space-x-8 px-8">
          <li>
            <Link to="/" className="hover:text-blue-400">Inicio</Link>
          </li>
          <li>
            {!isLogged && (
              <>
                <Link to="/login" className="hover:text-blue-400">Iniciar sesión</Link>
                <Link to="/register" className="hover:text-blue-400">Registrarse</Link>
              </>
            )}
            {isLogged && (
              <>
                <Link to="/favourite" className="hover:text-blue-400 mr-4">Mis Películas</Link> {/* Agregado mr-4 */}
                <Link to="/dashboard" className="hover:text-blue-400 ml-4">Estadísticas de Películas Favoritas</Link> {/* Agregado ml-4 */}
              </>
            )}
          </li>
        </ul>
      </div>

      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <div className="lg:hidden flex flex-col items-center bg-gray-700 p-4 mt-2 space-y-4 rounded-lg w-full">
          {!isLogged && (
            <>
              <Link to="/login" className="text-white hover:text-blue-400 w-full text-center py-2">Iniciar sesión</Link>
              <Link to="/register" className="text-white hover:text-blue-400 w-full text-center py-2">Registrarse</Link>
            </>
          )}

          {isLogged && (
            <>
              <Link to="/favourite" className="text-white hover:text-blue-400 w-full text-center py-2 mb-2">Mis Películas</Link> {/* Agregado mb-2 */}
              <Link to="/dashboard" className="text-white hover:text-blue-400 w-full text-center py-2">Estadísticas de Películas Favoritas</Link>
            </>
          )}

          {/* Cerrar sesión */}
          {isLogged && (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-600 mt-4 w-full text-center py-2"
            >
              Cerrar sesión
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
