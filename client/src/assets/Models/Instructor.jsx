import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function Instructors({ filters, onChange }) {
  const instructors = ['John Doe', 'Jane Smith', 'Alice Johnson'];
  const [isOpen, setIsOpen] = useState(true); // State for accordion behavior

  const handleChange = (instructor) => {
    const updated = filters.instructor.includes(instructor)
      ? filters.instructor.filter(i => i !== instructor)
      : [...filters.instructor, instructor];
    onChange('instructor', updated);
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-gray-800 font-semibold mb-3 focus:outline-none"
      >
        <span>Instructor</span>
        <FaChevronDown className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-0' : '-rotate-90'}`} />
      </button>
      {isOpen && (
        <div className="space-y-2">
          {instructors.map(instructor => (
            <div key={instructor}>
              <label className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-purple-600">
                <input
                  type="checkbox"
                  checked={filters.instructor.includes(instructor)}
                  onChange={() => handleChange(instructor)}
                  className="form-checkbox h-4 w-4 text-purple-600 rounded focus:ring-purple-500 border-gray-300"
                />
                <span>{instructor}</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}