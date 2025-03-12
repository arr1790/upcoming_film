import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import authService from '../authService';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const { isLogged, setIsLogged } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar el menú móvil

  const handleLogout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem("user"); // Limpiar datos del usuario del localStorage
      setIsLogged(false);
      setIsMenuOpen(false); // Cerrar menú después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center text-white">
        {/* Logo */}
        <Link to="/" className="text-lg font-semibold hover:text-blue-400">
          Cine
        </Link>

        {/* Botón de menú móvil */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 focus:outline-none"
        >
          ☰
        </button>

        {/* Menú en pantallas grandes */}
        <ul className="hidden lg:flex space-x-6">
          {!isLogged ? (
            <>
              <li><Link to="/login" className="hover:text-blue-400">Iniciar sesión</Link></li>
              <li><Link to="/register" className="hover:text-blue-400">Registrarse</Link></li>
              <li><Link to="/dashboard" className="hover:text-blue-400">Gráfico Favoritos</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/favourite" className="hover:text-blue-400">Favoritos</Link></li>
              <li><Link to="/dashboard" className="hover:text-blue-400">Gráfico Favoritos</Link></li>
              <li>
                <button onClick={handleLogout} className="text-red-500 hover:text-red-600">
                  Cerrar sesión
                </button>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Menú desplegable en móviles */}
      {isMenuOpen && (
        <ul className="lg:hidden flex flex-col space-y-4 mt-4 text-white bg-gray-800 p-4 rounded-md">
          {!isLogged ? (
            <>
              <li><Link to="/login" className="hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>Iniciar sesión</Link></li>
              <li><Link to="/register" className="hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>Registrarse</Link></li>
              <li><Link to="/dashboard" className="hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>Gráfico Favoritos</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/favourite" className="hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>Favoritos</Link></li>
              <li><Link to="/dashboard" className="hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>Gráfico Favoritos</Link></li>
              <li>
                <button onClick={handleLogout} className="text-red-500 hover:text-red-600">
                  Cerrar sesión
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
