import React from 'react';

function CourseCard({ icon, title, instructorName, instructorImage, rating, students }) {
  const handleClick = () => {
    alert(`You clicked on ${title}`);
  };

  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center
                 transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer active:scale-95"
      onClick={handleClick}
    >
      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <div className="flex items-center justify-center space-x-2 mb-4">
        {instructorImage && (
          <img
            src={instructorImage}
            alt={instructorName}
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
        <p className="text-gray-600 text-sm">{instructorName}</p>
      </div>
      <div className="flex items-center text-yellow-500 mb-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-5 w-5 ${i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-gray-600 text-sm">{rating.toFixed(1)}</span>
      </div>
      <p className="text-gray-500 text-xs mt-1">{students} students</p>
    </div>
  );
}

export default CourseCard;
