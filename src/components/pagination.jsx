import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [1, 2, 3].filter(page => page <= totalPages);

  return (
    <div className="flex justify-center space-x-2 mt-6">
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
    </div>
  );
};

export default Pagination;
