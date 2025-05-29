import React from 'react';
import { FaClock, FaStar, FaUserTie, FaBookOpen } from 'react-icons/fa';
import { Button } from '../components/ui/button';

const Trackdetails = () => {
  const course = {
    title: 'Artificial Intelligence & Machine Learning',
    description:
      'Dive into AI & ML fundamentals, algorithms, real-world applications, and hands-on projects. Ideal for tech enthusiasts and future innovators.',
    duration: '12 weeks',
    image: '	https://www.stemrobo.com/wp-content/uploads/2024/04/blog-26.jpg',
    rating: 4.8,
    instructor: 'Simon Shaw',
    role: 'Illustrator and 3D Designer',
    topics: [
      'AI vs ML - Key Differences',
      'Supervised & Unsupervised Learning',
      'Neural Networks Basics',
      'Natural Language Processing',
      'Real-world ML Applications',
      'Mini Projects and Assignments',
    ],
    reviews: [
      {
        name: 'Priya S.',
        comment: 'Very well explained and interactive course!',
      },
      {
        name: 'Ankit R.',
        comment: 'Good balance between theory and practicals.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f3f6fc] px-6 py-10 text-gray-800">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="relative">
          <img src={course.image} alt={course.title} className="w-full h-72 object-cover" />
          <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-xl text-sm">
            AI & ML
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-2 text-purple-800">{course.title}</h1>
          <p className="text-md text-gray-600 mb-4">{course.description}</p>

          <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <FaClock className="text-purple-600" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUserTie className="text-purple-600" />
              <span>{course.instructor} ({course.role})</span>
            </div>
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              <span>{course.rating} / 5.0</span>
            </div>
          </div>

          {/* Topics Covered */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Topics Covered:</h2>
          <ul className="list-disc ml-6 mb-6 text-gray-700 space-y-1">
            {course.topics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>

          {/* Reviews */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Student Reviews:</h2>
          <div className="bg-purple-50 p-4 rounded-xl space-y-3">
            {course.reviews.map((review, index) => (
              <div key={index} className="bg-white p-3 rounded-xl shadow-sm">
                <p className="text-gray-800 font-medium">{review.name}</p>
                <p className="text-gray-600 text-sm">"{review.comment}"</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 flex justify-end">
            <Button variant="default">Start Learning</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trackdetails;
