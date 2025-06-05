import React from 'react';
import '../assets/style/Continue_Learning.css'
const courseData = [
  {
    title: 'English punctuation made easy',
    type: 'Group course',
    level: 'Advanced',
    progress: 75,
  },
  {
    title: 'Technical English for Beginners',
    type: '1-on-1',
    level: 'Beginner',
    progress: 50,
  },
];

const CourseCard = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md  h-full">
      <h2 className="text-lg font-bold mb-4">Continue Learning</h2>
      <div className=" gap-4 mb-6">
      {courseData.map((course, index) => (
  <div
    key={index}
    id={`course-card-${index}`}
    className="course-card w-full sm:w-[450px] md:w-[600px] lg:w-[600px] bg-gray-100 p-4 sm:p-5 md:p-6 rounded-lg shadow-md mb-6 transition-all duration-300"
  >
    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm mb-3">
      <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full">{course.type}</span>
      <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full">{course.level}</span>
    </div>

    <h3 className="text-base sm:text-lg md:text-xl font-semibold">{course.title}</h3>

    <p className="text-sm sm:text-base text-gray-600 mt-2">
      Learn the basics without pain. No materials or software needed.
    </p>

    <div className="flex items-center mt-4">
      <div className="flex -space-x-2">
        {[1, 2, 3, 4].map((i) => (
          <img
            key={i}
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border-2 border-white"
            src={`https://randomuser.me/api/portraits/women/${60 + i}.jpg`}
            alt="user"
          />
        ))}
      </div>

      <div className="ml-auto w-1/3 h-2 md:h-3 bg-gray-300 rounded-full">
        <div
          className="h-full bg-yellow-500 rounded-full"
          style={{ width: `${course.progress}%` }}
        ></div>
      </div>
    </div>

    <button className="mt-5 bg-black text-white w-full sm:w-auto py-2 px-4 sm:px-6 rounded-full text-sm sm:text-base">
      Continue learning
    </button>
  </div>
))}

      </div>
    </div>
  );
};

export default CourseCard;
