import React, { useState } from 'react';
import { FaClock, FaUsers, FaChartBar, FaBook } from 'react-icons/fa';
import { Button } from '../components/ui/button';

const coursesData = [
  {
    title: 'Google Ads Training 2021: Profit With Pay',
    lessons: 6,
    students: 198,
    rating: 'Intermediate',
    completed: 78,
    days: 56,
    status: 'completed',
    instructor: 'Jon Kantner',
    duration: '4h 30m',
    level: 'Intermediate',
    image: '	https://static1.bigstockphoto.com/5/3/3/large1500/335448619.jpg',
    category: 'Marketing',
    price: '$19.99',
    originalPrice: '$99.99',
  },
  {
    title: 'Complete SEO Masterclass',
    lessons: 8,
    students: 305,
    rating: 'Beginner',
    completed: 45,
    days: 30,
    status: 'in-progress',
    instructor: 'Alice Smith',
    duration: '6h 15m',
    level: 'Beginner',
    image: '	https://static1.bigstockphoto.com/5/3/3/large1500/335448619.jpg',
    category: 'SEO',
    price: '$24.99',
    originalPrice: '$89.99',
  },
  {
    title: 'Advanced Facebook Ads Strategy',
    lessons: 10,
    students: 410,
    rating: 'Advanced',
    completed: 0,
    days: 60,
    status: 'not-started',
    instructor: 'Bob Johnson',
    duration: '5h 10m',
    level: 'Advanced',
    image: '	https://static1.bigstockphoto.com/5/3/3/large1500/335448619.jpg',
    category: 'Advertising',
    price: '$29.99',
    originalPrice: '$119.99',
  },
];

export default function MyCoursesPage() {
  const [filter, setFilter] = useState('all');

  const filteredCourses = coursesData.filter((course) => {
    if (filter === 'all') return true;
    return course.status === filter;
  });

  return (
    <div className="min-h-screen px-20 py-12 bg-[#f7f8fa]">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Courses</h1>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-8">
        <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>
          All
        </Button>
        <Button variant={filter === 'completed' ? 'default' : 'outline'} onClick={() => setFilter('completed')}>
          Completed
        </Button>
        <Button variant={filter === 'in-progress' ? 'default' : 'outline'} onClick={() => setFilter('in-progress')}>
          In Progress
        </Button>
        <Button variant={filter === 'not-started' ? 'default' : 'outline'} onClick={() => setFilter('not-started')}>
          Not Started
        </Button>
      </div>

      {/* Course Cards */}
      <div className="grid gap-8">
        {filteredCourses.map((course, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-2xl overflow-hidden flex max-w-4xl">
            {/* Image Section */}
            <div className="relative w-1/2 min-w-[200px]">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                {course.category}
              </span>
            </div>

            {/* Content Section */}
            <div className="p-6 w-1/2 flex flex-col justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">by {course.instructor}</p>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{course.title}</h3>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <FaClock className="text-purple-500" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUsers className="text-purple-500" />
                    <span>{course.students} Students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaChartBar className="text-purple-500" />
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaBook className="text-purple-500" />
                    <span>{course.lessons} Lessons</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${course.completed}%` }}></div>
                </div>
                <p className="text-xs text-gray-500">
                  Completed: {course.completed}% &nbsp;|&nbsp; Access: {course.days} days
                </p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="text-sm text-gray-400 line-through mr-2">{course.originalPrice}</span>
                  <span className="text-sm text-green-600 font-bold">{course.price}</span>
                </div>
                <Button variant="default">
                  {course.status === 'not-started' ? 'Start' : 'Continue'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
