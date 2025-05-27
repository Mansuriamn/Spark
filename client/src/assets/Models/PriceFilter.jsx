import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function PriceFilter({ filters, onChange }) {
  const [isOpen, setIsOpen] = useState(true); // State for accordion behavior

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-gray-800 font-semibold mb-3 focus:outline-none"
      >
        <span>Price</span>
        <FaChevronDown className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-0' : '-rotate-90'}`} />
      </button>
      {isOpen && (
        <div className="space-y-2">
          {['All', 'Free', 'Paid'].map(option => (
            <label key={option} className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-purple-600">
              <input
                type="radio"
                name="price"
                checked={filters.price === option}
                onChange={() => onChange('price', option)}
                className="form-radio h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
