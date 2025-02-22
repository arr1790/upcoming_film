import React, { useState } from 'react';

const items = [
  "Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", 
  "Item 7", "Item 8", "Item 9", "Item 10", "Item 11", "Item 12"
];

const PaginatedList = () => {
  const itemsPerPage = 3;  // Número de elementos por página
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular el índice de inicio y fin de los elementos que se mostrarán en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // Filtrar los elementos para mostrar solo los de la página actual
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Lista Paginada</h1>
      
      {/* Mostrar los elementos de la página actual */}
      <ul className="space-y-2">
        {currentItems.map((item, index) => (
          <li key={index} className="bg-gray-100 p-2 rounded shadow">{item}</li>
        ))}
      </ul>

      {/* Paginación */}
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 rounded-lg text-white 
              ${currentPage === index + 1 ? 'bg-blue-500' : 'bg-gray-300'} 
              hover:bg-blue-400 transition-colors duration-200`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaginatedList;
