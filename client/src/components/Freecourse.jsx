import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Star, User, BookOpen, Play, Download, Smartphone, Award, Calendar, Users, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import { AuthContext } from '../pages/AuthContext';
import Footer from './Footer';

const FreeCourseDetails = () => {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState(null);
  
  const {
    isAuthenticated,
    enrolledCourses,
    updateEnrolledCourses,
    user,
    token,
  } = useContext(AuthContext);

  const course = {
    id: 'free-python-basics',
    title: 'Python Programming Fundamentals - Free Course',
    subtitle: 'Learn Python basics with hands-on projects. Perfect for beginners starting their programming journey!',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.5,
    totalRatings: 15420,
    students: 89250,
    instructor: 'Sarah Johnson',
    instructorRole: 'Python Developer & Educator',
    lastUpdated: '5/2025',
    languages: ['English', 'Spanish [Auto]', '12 more'],
    free: true,
    duration: '8h 15m',
    sections: 12,
    lectures: 45,
    
    whatYouLearn: [
      'Understand Python syntax and basic programming concepts',
      'Work with variables, data types, and control structures',
      'Create simple programs and solve basic coding challenges',
      'Use functions and understand scope in Python',
      'Handle errors and exceptions in your code',
      'Build a foundation for advanced Python development',
      'Practice with real coding exercises and mini-projects',
      'Get comfortable with Python development environment'
    ],

    courseIncludes: [
      { icon: Play, text: '8 hours on-demand video' },
      { icon: BookOpen, text: '15 coding exercises' },
      { icon: Download, text: '25 downloadable resources' },
      { icon: Smartphone, text: 'Access on mobile and TV' },
      { icon: Award, text: 'Certificate of completion' }
    ],

    requirements: [
      'No programming experience required',
      'A computer with internet connection',
      'Willingness to learn and practice'
    ],

    topics: ['Python', 'Programming Fundamentals', 'Beginner Programming'],
    
    reviews: [
      {
        name: 'Amit K.',
        comment: 'Perfect introduction to Python! Clear explanations and great examples.',
        rating: 5
      },
      {
        name: 'Lisa M.',
        comment: 'Excellent free course. Helped me get started with programming.',
        rating: 5
      },
      {
        name: 'David R.',
        comment: 'Well-structured lessons. Great for absolute beginners.',
        rating: 4
      }
    ],

    courseContent: [
      {
        section: 1,
        title: 'Getting Started with Python',
        lectures: 5,
        duration: '45min',
        lessons: [
          { title: 'Welcome to Python Programming', duration: '05:30', preview: true },
          { title: 'Installing Python and Setting Up Your Environment', duration: '08:45' },
          { title: 'Your First Python Program', duration: '06:20', preview: true },
          { title: 'Understanding the Python Interpreter', duration: '12:15' },
          { title: 'Python Syntax and Indentation', duration: '12:45' }
        ]
      },
      {
        section: 2,
        title: 'Variables and Data Types',
        lectures: 6,
        duration: '1hr 10min',
        lessons: [
          { title: 'Python Variables Explained', duration: '10:30' },
          { title: 'Numbers and Mathematical Operations', duration: '15:20' },
          { title: 'Working with Strings', duration: '18:45' },
          { title: 'Boolean Values and Comparisons', duration: '08:30' },
          { title: 'Lists and Basic Operations', duration: '12:15' },
          { title: 'Practice Exercise: Calculator Project', duration: '05:40' }
        ]
      },
      {
        section: 3,
        title: 'Control Flow and Decision Making',
        lectures: 4,
        duration: '50min',
        lessons: [
          { title: 'If, Elif, and Else Statements', duration: '15:30' },
          { title: 'Loops: For and While', duration: '18:20' },
          { title: 'Break and Continue Statements', duration: '08:45' },
          { title: 'Practice: Number Guessing Game', duration: '07:25' }
        ]
      }
    ]
  };

  const isAlreadyEnrolled = enrolledCourses.some(c => c.id === course.id);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      alert('Please login to enroll in this course');
      return;
    }

    if (!isAlreadyEnrolled && user) {
      const updatedCourses = [...enrolledCourses, course];
      updateEnrolledCourses(updatedCourses);
      
      // Optional backend API call
      try {
        const response = await fetch('http://localhost:5000/api/enroll', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: user.id,
            courseId: course.id,
            courseTitle: course.title,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to enroll in course');
        }
        console.log('Enrollment successful');
      } catch (error) {
        console.error('Enrollment failed:', error);
      }
    }
  };

  const handleStartCourse = () => {
    navigate('/video');
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header Banner */}
        <div className="bg-gray-900 text-white py-4">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-lg md:text-xl font-semibold">{course.title}</h1>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Course Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Free Course
              </span>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 font-semibold">{course.rating}</span>
                <span className="ml-1 text-gray-600">({course.totalRatings.toLocaleString()} ratings)</span>
              </div>
              <span className="text-gray-600">{course.students.toLocaleString()} students</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-700 text-lg mb-6">{course.subtitle}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                Created by <span className="text-purple-600 ml-1">{course.instructor}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Last updated {course.lastUpdated}
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-1" />
                {course.languages.join(', ')}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {course.duration} total length
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {isAuthenticated ? (
                isAlreadyEnrolled ? (
                  <button
                    onClick={handleStartCourse}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Start Course
                  </button>
                ) : (
                  <button
                    onClick={handleEnroll}
                    className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Enroll Now - Free
                  </button>
                )
              ) : (
                <div className="flex flex-col">
                  <button
                    onClick={() => alert('Please login to enroll in this course')}
                    className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Enroll Now - Free
                  </button>
                  <p className="text-red-500 text-sm mt-2">Login required to enroll</p>
                </div>
              )}
            </div>
          </div>

          {/* Course Preview Image */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <button className="bg-white rounded-full p-4 hover:bg-gray-100 transition-colors">
                  <Play className="h-8 w-8 text-gray-800" />
                </button>
              </div>
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-2 rounded text-sm">
                Preview this course
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* What You'll Learn */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">What you'll learn</h2>
              <div className="space-y-3">
                {course.whatYouLearn.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* This Course Includes */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">This course includes:</h2>
              <div className="space-y-4">
                {course.courseIncludes.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <item.icon className="h-5 w-5 mr-3 text-gray-600" />
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
            <h2 className="text-xl font-bold mb-4">Requirements</h2>
            <ul className="space-y-2">
              {course.requirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-gray-400 mr-3 mt-1">•</span>
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Course Content */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Course content</h2>
              <button className="text-purple-600 text-sm hover:underline">
                Expand all sections
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              {course.sections} sections • {course.lectures} lectures • {course.duration} total length
            </p>
            
            {course.courseContent.map((section, index) => (
              <div key={index} className="border rounded-lg mb-4">
                <button
                  className="w-full p-4 text-left hover:bg-gray-50 flex justify-between items-center"
                  onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                >
                  <div>
                    <h3 className="font-medium">
                      Section {section.section}: {section.title}
                    </h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span>{section.lectures} lectures • {section.duration}</span>
                    {expandedSection === index ? (
                      <ChevronUp className="h-4 w-4 ml-2" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-2" />
                    )}
                  </div>
                </button>
                
                {expandedSection === index && (
                  <div className="border-t">
                    {section.lessons.map((lesson, lessonIndex) => (
                      <div key={lessonIndex} className="p-3 border-b last:border-b-0 flex justify-between items-center hover:bg-gray-50">
                        <div className="flex items-center">
                          <Play className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-sm">{lesson.title}</span>
                          {lesson.preview && (
                            <span className="ml-2 text-purple-600 text-xs">Preview</span>
                          )}
                        </div>
                        <span className="text-sm text-gray-600">{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Student Reviews */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
            <h2 className="text-xl font-bold mb-4">Student Reviews</h2>
            <div className="space-y-4">
              {course.reviews.map((review, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 font-medium">{review.name}</span>
                  </div>
                  <p className="text-gray-700">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FreeCourseDetails;