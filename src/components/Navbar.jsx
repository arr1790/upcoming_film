// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import authService from '../authService';
import { AuthContext } from '../context/authContext';


const Navbar = () => {

  const { isLogged, setIsLogged } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem("user");
      setIsLogged(false);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged }}>
      <nav className="bg-gray-800 p-4">
        <ul className="flex justify-between items-center text-white">
          <li>
            <Link to="/" className="hover:text-blue-400 ">Cine</Link>
            <Link to="/login" className="hover:text-blue-400 pl-4 w-8 h-8">Iniciar sesion</Link>
            <Link to="/register" className="hover:text-blue-400 pl-4">Registrarse</Link>
            <Link to ="/favourite" className="hover:text-blue-400 pl-4">Favoritos</Link>
            
          </li>
           {/* <li>
            <img src="/camara.png" alt="Cine" className="w-8 h-8" />
          </li> */}
          <li>{isLogged && <button onClick={handleLogout} className="text-red-500 hover:text-red-600 pl-4">Cerrar sesion</button>}</li>
        </ul>
      </nav>
    </AuthContext.Provider>
  );
  
};

export default Navbar;
