// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <ul className="flex space-x-8 p-4 text-white">
        <li>
          <Link to="/" className="hover:text-blue-400">Inicio</Link>
        </li>
        <li>
          <Link to="/courses" className="hover:text-blue-400">Cursos</Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-blue-400">Sobre Nosotros</Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-blue-400">Contacto</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
