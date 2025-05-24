import React from "react";

const categories = ["Commercial", "Office", "Shop", "Educate", "Academy", "Single family home", "Studio", "University"];
const instructors = ["Kenny White", "John Doe"];
const levels = ["All levels", "Beginner", "Intermediate", "Expert"];
const prices = ["All", "Free", "Paid"];
const reviews = [5, 4, 3, 2, 1];

export default function FilterSidebar({ filters, onChange }) {
  const handleCheckbox = (name, value) => {
    const prev = filters[name];
    const newValue = prev.includes(value)
      ? prev.filter((v) => v !== value)
      : [...prev, value];
    onChange(name, newValue);
  };

  return (
    <div className="w-64 p-4 border-r space-y-6">
      <div>
        <h4 className="font-semibold mb-2">Course Category</h4>
        {categories.map((cat) => (
          <div key={cat}>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.category.includes(cat)}
                onChange={() => handleCheckbox("category", cat)}
              />
              <span className="ml-2">{cat}</span>
            </label>
          </div>
        ))}
      </div>

      <div>
        <h4 className="font-semibold mb-2">Instructors</h4>
        {instructors.map((ins) => (
          <div key={ins}>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.instructor.includes(ins)}
                onChange={() => handleCheckbox("instructor", ins)}
              />
              <span className="ml-2">{ins}</span>
            </label>
          </div>
        ))}
      </div>

      <div>
        <h4 className="font-semibold mb-2">Price</h4>
        {prices.map((p) => (
          <div key={p}>
            <label className="flex items-center">
              <input
                type="radio"
                name="price"
                checked={filters.price === p}
                onChange={() => onChange("price", p)}
              />
              <span className="ml-2">{p}</span>
            </label>
          </div>
        ))}
      </div>

      <div>
        <h4 className="font-semibold mb-2">Review</h4>
        {reviews.map((star) => (
          <div key={star}>
            <label className="flex items-center">
              <input
                type="radio"
                name="review"
                checked={filters.review === star}
                onChange={() => onChange("review", star)}
              />
              <span className="ml-2">{"★".repeat(star)} ({star})</span>
            </label>
          </div>
        ))}
      </div>

      <div>
        <h4 className="font-semibold mb-2">Level</h4>
        {levels.map((lvl) => (
          <div key={lvl}>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.level.includes(lvl)}
                onChange={() => handleCheckbox("level", lvl)}
              />
              <span className="ml-2">{lvl}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
