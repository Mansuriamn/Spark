import React, { useState } from 'react';
import { FaChevronDown, FaStar } from 'react-icons/fa'; // Import FaStar for visual stars

export default function ReviewFilter({ filters, onChange }) {
  const [isOpen, setIsOpen] = useState(true); // State for accordion behavior

  const handleReviewChange = (value) => {
    onChange('review', value === filters.review ? null : value);
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-gray-800 font-semibold mb-3 focus:outline-none"
      >
        <span>Minimum Rating</span>
        <FaChevronDown className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-0' : '-rotate-90'}`} />
      </button>
      {isOpen && (
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <label key={star} className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-purple-600">
              <input
                type="radio"
                name="review"
                checked={filters.review === star}
                onChange={() => handleReviewChange(star)}
                className="form-radio h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
              />
              <div className="flex items-center">
                {[...Array(star)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 h-4 w-4" />
                ))}
                <span className="ml-1">{`${star} stars & up`}</span>
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}