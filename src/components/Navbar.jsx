import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import authService from '../authService';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const { isLogged, setIsLogged } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem("user");
      setIsLogged(false);
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex flex-col lg:flex-row justify-center items-center text-white">
        
        {/* Logo centrado junto con el menú */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <Link to="/" className="flex items-center text-xl font-semibold hover:text-blue-400">
            <span className="text-xl">🍿</span>
            <span className="ml-2 text-xl">CINE</span>
            <span className="ml-2 text-xl">🎞️</span>
          </Link>

          {/* Menú en pantallas grandes */}
          <ul className="hidden lg:flex space-x-6 items-center">
            <li><Link to="/dashboard" className="hover:text-blue-400">Gráfico Favoritos</Link></li>
            <li><Link to="/about" className="hover:text-blue-400">Quiénes Somos</Link></li>

            {/* Aquí está la comprobación de si el usuario está logueado */}
            {!isLogged ? (
              <>
                <li><Link to="/login" className="hover:text-blue-400">Iniciar sesión</Link></li>
                <li><Link to="/register" className="hover:text-blue-400">Registrarse</Link></li>
              </>
            ) : (
              <>
                {/* El enlace "Favoritos" siempre se muestra, pero la ruta no será accesible sin estar logueado */}
                <li><Link to="/favourite" className="hover:text-blue-400">Favoritos</Link></li>
                <li>
                  <button onClick={handleLogout} className="text-red-500 hover:text-red-600">
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Botón de menú móvil */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 focus:outline-none">
          ☰
        </button>
      </div>

      {/* Menú desplegable en móviles */}
      {isMenuOpen && (
        <ul className="lg:hidden flex flex-col space-y-4 mt-4 text-white bg-gray-800 p-4 rounded-md">
          <li><Link to="/dashboard" className="hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>Gráfico Favoritos</Link></li>
          <li><Link to="/about" className="hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>Quiénes Somos</Link></li>
          
          {/* Aquí también se comprueba si el usuario está logueado en el menú móvil */}
          {!isLogged ? (
            <>
              <li><Link to="/login" className="hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>Iniciar sesión</Link></li>
              <li><Link to="/register" className="hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>Registrarse</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/favourite" className="hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>Favoritos</Link></li>
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
