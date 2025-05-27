import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function LevelFilter({ filters, onChange }) {
  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const [isOpen, setIsOpen] = useState(true); // State for accordion behavior

  const handleChange = (level) => {
    const updated = filters.level.includes(level)
      ? filters.level.filter(l => l !== level)
      : [...filters.level, level];
    onChange('level', updated);
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-gray-800 font-semibold mb-3 focus:outline-none"
      >
        <span>Level</span>
        <FaChevronDown className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-0' : '-rotate-90'}`} />
      </button>
      {isOpen && (
        <div className="space-y-2">
          {levels.map(level => (
            <div key={level}>
              <label className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-purple-600">
                <input
                  type="checkbox"
                  checked={filters.level.includes(level)}
                  onChange={() => handleChange(level)}
                  className="form-checkbox h-4 w-4 text-purple-600 rounded focus:ring-purple-500 border-gray-300"
                />
                <span>{level}</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}