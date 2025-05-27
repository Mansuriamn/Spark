import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import { CodeIcon, DeviceMobileIcon, DesktopComputerIcon, ChipIcon } from '@heroicons/react/outline'; // Install @heroicons/react

function SuccessStoriesSection() {
  const [courses, setCourses] = useState([]);
 //backend logic
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        //baad me replace karna h actual api se

        const response = await fetch('/api/courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        
        setCourses([
            {
              id: 'c1',
              icon: <CodeIcon className="h-8 w-8 text-purple-600" />,
              title: 'Web Development',
              instructorName: 'Erick Kehandz',
              instructorImage: 'https://randomuser.me/api/portraits/men/32.jpg', 
              rating: 4.7,
              students: '20K',
            },
            {
              id: 'c2',
              icon: <DeviceMobileIcon className="h-8 w-8 text-purple-600" />,
              title: 'App Development',
              instructorName: 'Alex Andres',
              instructorImage: 'https://randomuser.me/api/portraits/men/33.jpg',
              rating: 4.4,
              students: '15K',
            },
            {
              id: 'c3',
              icon: <DesktopComputerIcon className="h-8 w-8 text-purple-600" />,
              title: 'App Testing',
              instructorName: 'Sarah J.', 
              instructorImage: 'https://randomuser.me/api/portraits/women/40.jpg',
              rating: 4.5,
              students: '10K',
            },
            {
              id: 'c4',
              icon: <ChipIcon className="h-8 w-8 text-purple-600" />,
              title: 'Android Testamtan', 
              instructorName: 'John Doe', 
              instructorImage: 'https://randomuser.me/api/portraits/men/41.jpg', 
              rating: 4.6,
              students: '12K',
            },
          ]);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="container mx-auto p-6 md:py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
        Success stories
      </h2>

      {/* Main success story (the one with the person's photo) */}
      <div className="bg-purple-50 p-6 rounded-lg shadow-md mb-12 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        <img
          src="https://randomuser.me/api/portraits/men/7.jpg" // Placeholder image
          alt="Student"
          className="w-24 h-24 rounded-full object-cover border-4 border-purple-300"
        />
        <div className="text-center md:text-left">
          <p className="text-gray-700 text-lg leading-relaxed">
            "Firiiiding a perfect class was easy. I learned at my own pace. Great platform"
          </p>
          <p className="mt-4 text-gray-600 font-semibold">
            {/* Name or additional info */}
          </p>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            icon={course.icon}
            title={course.title}
            instructorName={course.instructorName}
            instructorImage={course.instructorImage}
            rating={course.rating}
            students={course.students}
          />
        ))}
      </div>
    </section>
  );
}

export default SuccessStoriesSection;