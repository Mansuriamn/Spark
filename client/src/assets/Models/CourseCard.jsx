import React, { use, useEffect } from 'react';
import { FaClock, FaUsers, FaChartBar, FaBook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../style/CourseCard.css'
import axios from 'axios';
export default function CourseCard({ course }) {
  console.log(course)
  const navigate = useNavigate();
 const  lessonsCount = course.lessons ? Object.keys(course.lessons).length : 0;
  

  const handleNavigation = (id) => {
    navigate(`/courses/${id}`); 

  };

  return (
  <div
  id="courseCard"
  className="course-card bg-white shadow-md rounded-2xl overflow-hidden flex flex-col sm:flex-row max-w-full sm:max-w-3xl cursor-pointer transition-transform hover:scale-[1.02]"
  onClick={handleNavigation}
>
  {/* Left Image Section */}
  <div className="relative w-full sm:w-1/2 h-48 sm:h-auto">
    <img style={{
      height:"100%",
      width:"100%"
    }} src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />
    <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
      {course.category}
    </span>
  </div>

  {/* Right Content Section */}
  <div className="p-4 w-full sm:w-1/2 flex flex-col justify-between">
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
          <span> Lessons :  { lessonsCount}</span>
        </div>
      </div>
    </div>

    <div className="flex items-center justify-between mt-2">
      <span className="text-gray-400 ">${course.originalPrice}</span>
      <span className="text-green-600 font-bold">{course.price}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNavigation(course._id);
         
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
