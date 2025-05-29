import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    if (totalPages <= 5) { 
      return pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 mx-1 rounded-full ${
            currentPage === number ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {number}
        </button>
      ));
    } else { 
      const visiblePages = [];
      if (currentPage <= 3) {
        visiblePages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        visiblePages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        visiblePages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }

      return visiblePages.map((item, index) =>
        item === '...' ? (
          <span key={index} className="px-3 py-1 mx-1">...</span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(item)}
            className={`px-3 py-1 mx-1 rounded-full ${
              currentPage === item ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {item}
          </button>
        )
      );
    }
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 mx-1 rounded-full bg-gray-200 text-gray-700 disabled:opacity-50"
      >
        &lt;
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 mx-1 rounded-full bg-gray-200 text-gray-700 disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;