import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CourseCard({ course = {} }) {
 
  const {
    title = 'Untitled Course',
    instructor = 'Unknown Instructor',
    instructorImage,
    review = 0,
    totalReviews = 0,
    students = 0,
    imageUrl,
    lesson = [],
    price = 'N/A',
    category = 'Unknown',
    level = 'Unknown',
  } = course;

 const navigate = useNavigate();
  // lesson count
  const lessonCount = Array.isArray(lesson) ? lesson.length : 0;
  // console.log(lessonCount);
  const handleClick = () => {
    alert(`You clicked on ${title}`);
  };

  if (!course || Object.keys(course).length === 0) {
    return <div className="text-gray-500 text-center">No course data available</div>;
  }

  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center
                 transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer active:scale-95"
      onClick={handleClick}
    >
      {/* Course Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-32 object-cover rounded-t-lg mb-4"
        />
      )}
      
     
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      
      {/* Instructor Info*/}
      <div className="flex items-center justify-center space-x-2 mb-4">
        {instructorImage && (
          <img
            src={instructorImage}
            alt={instructor}
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
        <p className="text-gray-600 text-sm">{instructor}</p>
      </div>
      
      {/* Star  */}
      <div className="flex items-center text-yellow-500 mb-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-5 w-5 ${i < Math.floor(review) ? 'text-yellow-500' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783 .57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
          </svg>
        ))}
        {typeof review === 'number' && (
          <span className="ml-2 text-gray-600 text-sm">{review.toFixed(1)}</span>
        )}
        {typeof totalReviews === 'number' && totalReviews > 0 && (
          <span className="ml-1 text-gray-500 text-xs">({totalReviews} ratings)</span>
        )}
      </div>
      
      {/* Course Metadata */}
      <p className="text-gray-700 text-sm mb-1">
        <span className="font-medium">Category:</span> {category}
      </p>
      <p className="text-gray-700 text-sm mb-1">
        <span className="font-medium">Level:</span> {level}
      </p>
      <p className="text-gray-700 text-sm font-bold mb-2">
        Price: {price}
      </p>

      {/* lesson*/}
      <p className="text-gray-800 font-bold text-sm mb-1">
        Total Lessons: {totalPages}
      </p>

      {/* no. of student*/}
      {typeof students === 'number' && (
        <p className="text-gray-500 text-xs mt-1">{students} students</p>
      )}

      {/* button */}
      <button className="mt-4 px-5 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
        View Details
      </button>
    </div>
  );
}

export default CourseCard;