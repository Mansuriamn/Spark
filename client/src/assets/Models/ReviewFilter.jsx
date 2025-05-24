import React from 'react';

export default function ReviewFilter({ filters, onChange }) {
  const handleReviewChange = (value) => {
    onChange('review', value === filters.review ? null : value);
  };

  return (
    <div>
      <h3 className="font-semibold mb-2">Minimum Rating</h3>
      {[5, 4, 3, 2, 1].map((star) => (
        <label key={star} className="flex items-center space-x-2">
          <input
            type="radio"
            name="review"
            checked={filters.review === star}
            onChange={() => handleReviewChange(star)}
          />
          <span>{`${star} stars & up`}</span>
        </label>
      ))}
    </div>
  );
}
