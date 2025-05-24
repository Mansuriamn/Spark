import React from 'react';

export default function PriceFilter({ filters, onChange }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">Price</h3>
      {['All', 'Free', 'Paid'].map(option => (
        <label key={option} className="flex items-center space-x-2">
          <input
            type="radio"
            name="price"
            checked={filters.price === option}
            onChange={() => onChange('price', option)}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}
