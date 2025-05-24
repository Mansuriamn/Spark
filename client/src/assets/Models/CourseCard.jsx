import React from 'react';
import { FaClock, FaUsers, FaChartBar, FaBook } from 'react-icons/fa';

export default function CourseCard({ course }) {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden flex max-w-3xl">
      {/* Left Image Section */}
      <div className="relative w-1/2">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
        <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
          {course.category}
        </span>
      </div>

      {/* Right Content Section */}
      <div className="p-4 w-1/2 flex flex-col justify-between">
        <div>
          <p className="text-sm text-gray-500">by {course.instructor}</p>
          <h3 className="text-lg font-semibold mt-1 mb-2">{course.title}</h3>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center gap-1">
              <FaClock className="text-orange-500" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaUsers className="text-orange-500" />
              <span>{course.students} Students</span>
            </div>
            <div className="flex items-center gap-1">
              <FaChartBar className="text-orange-500" />
              <span>{course.level}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaBook className="text-orange-500" />
              <span>{course.lessons} Lessons</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-gray-400 line-through">${course.originalPrice}</span>
          <span className="text-green-600 font-bold">{course.price}</span>
          <button className="text-sm text-blue-600 hover:underline">View More</button>
        </div>
      </div>
    </div>
  );
}

