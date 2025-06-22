import React, { useEffect } from 'react';
import { FaClock, FaUsers, FaChartBar, FaBook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../style/CourseCard.css';

export default function CourseCard({ course }) {
  const navigate = useNavigate();

  const lessonsCount = course.lessons ? course.lessons.length : 0;

  

  const handleNavigation = () => {
    navigate(`/courses/${course._id}`);
  };

  return (
    <div
      id="courseCard"
      className="course-card bg-white shadow-md rounded-2xl overflow-hidden flex flex-col sm:flex-row max-w-full sm:max-w-3xl cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={handleNavigation}
    >
      {/* Left Image Section */}
      <div className="relative w-full sm:w-1/2 h-48 sm:h-auto">
        <img
          style={{ height: "100%", width: "100%" }}
          src={course.pictureUrl}
          alt="Course"
          className="w-full h-full object-cover"
        />
        <span className="absolute top-2 left-2 text-white text-xs px-2 py-1 rounded bg-black bg-opacity-50">
          {course.category?.name || 'Uncategorized'}
        </span>
      </div>

      {/* Right Content Section */}
      <div className="p-4 w-full sm:w-1/2 flex flex-col justify-between">
        <div>
          {/* Instructor (optional) */}
          {/* <p className="text-sm text-gray-500">{course.createdBy?.email}</p> */}

          <h3 className="text-lg font-semibold mt-1 mb-2">{course.title}</h3>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center gap-1">
              <FaClock className="text-orange-500" />
              <span>{course.estimatedDuration} Minutes</span>
            </div>

            <div className="flex items-center gap-1">
              <FaUsers className="text-orange-500" />
              <span>Students</span> {/* Add actual student count if available */}
            </div>

            <div className="flex items-center gap-1">
              <FaChartBar className="text-orange-500" />
              <span>{course.level}</span>
            </div>

            <div className="flex items-center gap-1">
              <FaBook className="text-orange-500" />
              <span>Lessons: {lessonsCount}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-green-600 font-bold">₹ {course.price}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNavigation();
            }}
            className="text-sm text-blue-600 hover:underline"
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
}
