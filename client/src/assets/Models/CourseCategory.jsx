import React from 'react';

export default function CourseCategory({ filters, onChange }) {
  const categories = ['Educate', 'Design', 'Development', 'AI', 'Marketing'];

  const handleChange = (category) => {
    const updated = filters.category.includes(category)
      ? filters.category.filter(c => c !== category)
      : [...filters.category, category];
    onChange('category', updated);
  };

  return (
    <div>
      <h3 className="font-semibold mb-2">Category</h3>
      {categories.map(category => (
        <div key={category}>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.category.includes(category)}
              onChange={() => handleChange(category)}
            />
            <span>{category}</span>
          </label>
        </div>
      ))}
    </div>
  );
}
