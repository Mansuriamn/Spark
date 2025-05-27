import React from 'react';

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
          <div key={index} className="min-w-[450px] bg-gray-70 p-4 rounded-lg shadow-sm mb-2">
            <div className="flex items-center gap-2 text-xs mb-2">
              <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full">{course.type}</span>
              <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full">{course.level}</span>
            </div>
            <h3 className="text-lg font-semibold">{course.title}</h3>
            <p className="text-sm text-gray-600 mt-1">Learn the basics without pain. No materials or software needed.</p>
            <div className="flex items-center mt-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white"
                    src={`https://randomuser.me/api/portraits/women/${60 + i}.jpg`}
                    alt="user"
                  />
                ))}
              </div>
              <div className="ml-auto w-1/3 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
            <button className="mt-4 bg-black text-white py-2 px-4 rounded-full text-sm">
              Continue learning
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCard;
