// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <ul className="flex space-x-8 p-4 text-white">
        <li>
          <Link to="/" className="hover:text-blue-400">Cine</Link>
        </li>
        <li>
       
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
