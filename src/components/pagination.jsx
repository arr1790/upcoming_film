import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= Math.min(totalPages, 5); i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center space-x-2 mt-6">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-4 py-2 rounded-lg bg-gray-300 text-black hover:bg-blue-400 transition-colors duration-200"
        >
          Anterior
        </button>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg text-white 
            ${currentPage === page ? 'bg-blue-500' : 'bg-gray-300'} 
            hover:bg-blue-400 transition-colors duration-200`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-4 py-2 rounded-lg bg-gray-300 text-black hover:bg-blue-400 transition-colors duration-200"
        >
          Siguiente
        </button>
      )}
    </div>
  );
};

export default Pagination;
