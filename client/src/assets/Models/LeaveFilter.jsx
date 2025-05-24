import React from 'react';

export default function LevelFilter({ filters, onChange }) {
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const handleChange = (level) => {
    const updated = filters.level.includes(level)
      ? filters.level.filter(l => l !== level)
      : [...filters.level, level];
    onChange('level', updated);
  };

  return (
    <div>
      <h3 className="font-semibold mb-2">Level</h3>
      {levels.map(level => (
        <label key={level} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={filters.level.includes(level)}
            onChange={() => handleChange(level)}
          />
          <span>{level}</span>
        </label>
      ))}
    </div>
  );
}
