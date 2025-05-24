import React from 'react';

export default function Instructors({ filters, onChange }) {
  const instructors = ['John Doe', 'Jane Smith', 'Alice Johnson'];

  const handleChange = (instructor) => {
    const updated = filters.instructor.includes(instructor)
      ? filters.instructor.filter(i => i !== instructor)
      : [...filters.instructor, instructor];
    onChange('instructor', updated);
  };

  return (
    <div>
      <h3 className="font-semibold mb-2">Instructor</h3>
      {instructors.map(instructor => (
        <div key={instructor}>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.instructor.includes(instructor)}
              onChange={() => handleChange(instructor)}
            />
            <span>{instructor}</span>
          </label>
        </div>
      ))}
    </div>
  );
}
