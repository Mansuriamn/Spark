import React ,{useState} from 'react';
import { FaChevronDown } from 'react-icons/fa'; // For a possible accordion icon

export default function CourseCategory({ filters, onChange }) {
  const categories = ['Educate', 'Design', 'Development', 'AI', 'Marketing'];
  const [isOpen, setIsOpen] = useState(true); // State for accordion behavior

  const handleChange = (category) => {
    const updated = filters.category.includes(category)
      ? filters.category.filter(c => c !== category)
      : [...filters.category, category];
    onChange('category', updated);
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-gray-800 font-semibold mb-3 focus:outline-none"
      >
        <span>Category</span>
        <FaChevronDown className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-0' : '-rotate-90'}`} />
      </button>
      {isOpen && (
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category}>
              <label className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-purple-600">
                <input
                  type="checkbox"
                  checked={filters.category.includes(category)}
                  onChange={() => handleChange(category)}
                  className="form-checkbox h-4 w-4 text-purple-600 rounded focus:ring-purple-500 border-gray-300"
                />
                <span>{category}</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}