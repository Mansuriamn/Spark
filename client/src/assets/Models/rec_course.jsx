
import React from 'react';

const courses = [
  {
    id: 1,
    title: "Advanced JavaScript Programming",
    author: "David Miller",
    rating: 4.2,
    students: 3245,
    image: "	https://i.pinimg.com/736x/cd/34/8b/cd348b55d06f92d252109ad2784a9382.jpg", 
    tag: "Computer Science"
  },
  {
    id: 2,
    title: "Advanced JavaScript Programming",
    author: "David Miller",
    rating: 4.2,
    students: 3245,
    image: "	https://i.pinimg.com/736x/cd/34/8b/cd348b55d06f92d252109ad2784a9382.jpg",
    tag: "Computer Science"
  },
  {
    id: 3,
    title: "Advanced JavaScript Programming",
    author: "David Miller",
    rating: 4.2,
    students: 3245,
    image: "	https://i.pinimg.com/736x/cd/34/8b/cd348b55d06f92d252109ad2784a9382.jpg",
    tag: "Computer Science"
  }
];

const RecommendedCourses = () => {
  return (
    <div className="w-full px-20 py-10">
      <h2 className="text-3xl font-bold mb-15">Recommended Courses</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {courses.map(course => (
          <div key={course.id} className="w-80 rounded-2xl overflow-hidden border">
            <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
            <div className="px-4 py-3">
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full inline-block mb-2">{course.tag}</span>
              <h3 className="font-semibold">{course.title}</h3>
              <p className="text-gray-500 text-sm">By {course.author}</p>
              <div className="flex justify-between items-center text-sm mt-3">
                <div className="flex items-center gap-1">
                  ⭐ <span>{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  👤 <span>{course.students} Students</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-20 mb-10">
          <button className="bg-gray-100 text-gray-900  px-25 py-3 rounded-b-md text-sm hover:bg-gray-200">
            Browse All Courses
          </button>
        </div>
    </div>
  );
};

export default RecommendedCourses;
