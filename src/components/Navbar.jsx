// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-between items-center text-white">
        <li>
          <Link to="/" className="hover:text-blue-400 ">Cine</Link>
          <Link to="/" className="hover:text-blue-400 pl-4 w-8 h-8">Iniciar sesion</Link>
          <Link to="/" className="hover:text-blue-400 pl-4">Registrarse</Link>
        </li>
         <li>      
          <img src="/camara.png" alt="Cine" className="w-8 h-8" />
        </li>
      </ul>
    </nav>
  );
  
};

export default Navbar;
