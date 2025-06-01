
import React, { useState } from 'react';
import { Clock, Users, BookOpen, Check, Play, ArrowRight, Star, Flame, GraduationCap, Award, Compass, Book } from 'lucide-react';

const coursesData = [
  {
    title: 'English punctuation made easy',
    lessons: 12,
    students: 198,
    rating: 4.7,
    completed: 75,
    days: 14,
    status: 'in-progress',
    instructor: 'Cody Fisher',
    duration: '4h 30m',
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Language',
    price: '$19.99',
    originalPrice: '$99.99',
    progressColor: 'bg-purple-500'
  },
  {
    title: 'Technical Spanish for Beginners',
    lessons: 8,
    students: 305,
    rating: 4.5,
    completed: 45,
    days: 30,
    status: 'in-progress',
    instructor: 'Jacob Jones',
    duration: '6h 15m',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Language',
    price: '$24.99',
    originalPrice: '$89.99',
    progressColor: 'bg-blue-500'
  },
  {
    title: 'Advanced React Development',
    lessons: 16,
    students: 410,
    rating: 4.9,
    completed: 100,
    days: 0,
    status: 'completed',
    instructor: 'Sarah Wilson',
    duration: '8h 45m',
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Programming',
    price: '$29.99',
    originalPrice: '$119.99',
    progressColor: 'bg-green-500'
  }
];

const stats = [
  { label: 'Total Courses', value: 12, icon: <BookOpen className="w-5 h-5" />, color: 'bg-purple-100 text-purple-600' },
  { label: 'Completed', value: 5, icon: <Check className="w-5 h-5" />, color: 'bg-green-100 text-green-600' },
  { label: 'In Progress', value: 4, icon: <Play className="w-5 h-5" />, color: 'bg-blue-100 text-blue-600' },
  { label: 'Learning Hours', value: '42h', icon: <Clock className="w-5 h-5" />, color: 'bg-orange-100 text-orange-600' }
];

const achievements = [
  { 
    title: 'Course Explorer', 
    icon: <Compass className="w-5 h-5 text-white" />, 
    progress: 100, 
    color: 'from-yellow-400 to-orange-500', 
    count: '10 Courses',
    bgColor: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    progressBg: 'bg-yellow-500'
  },
  { 
    title: 'Learning Streak', 
    icon: <BookOpen className="w-5 h-5 text-white stroke-2" />, 
    progress: 65, 
    color: 'from-red-500 to-orange-500', 
    count: '7 Days',
    bgColor: 'bg-gradient-to-br from-red-500 to-orange-500',
    progressBg: 'bg-red-500'
  },
  { 
    title: 'Certified Pro', 
    icon: <GraduationCap className="w-5 h-5 text-white" />, 
    progress: 30, 
    color: 'from-purple-500 to-indigo-600', 
    count: '3 Certificates',
    bgColor: 'bg-gradient-to-br from-purple-500 to-indigo-600',
    progressBg: 'bg-purple-500'
  }
];

const statusBadges = {
  completed: { text: 'Completed', color: 'bg-green-100 text-green-700' },
  'in-progress': { text: 'In Progress', color: 'bg-purple-100 text-purple-700' },
  'not-started': { text: 'Not Started', color: 'bg-gray-100 text-gray-700' }
};

const StatCard = ({ stat }) => (
  <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex items-center hover:shadow-md transition-shadow duration-200">
    <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mr-4`}>
      {stat.icon}
    </div>
    <div>
      <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
    </div>
  </div>
);

const AchievementCard = ({ achievement }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1 h-full flex flex-col">
    <div className="flex items-center mb-4">
      <div className={`w-12 h-12 rounded-xl ${achievement.bgColor} flex items-center justify-center mr-3 text-white shadow-lg`}>
        {achievement.icon}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-gray-800 text-lg">{achievement.title}</h3>
        <div className="text-sm text-gray-500">{achievement.count}</div>
      </div>
    </div>
    <div className="flex-1 flex flex-col justify-end">
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div 
          className={`h-2 rounded-full ${achievement.progressBg}`} 
          style={{ width: `${achievement.progress}%` }}
        ></div>
      </div>
      <div className="text-right text-sm text-gray-600 font-medium">{achievement.progress}% complete</div>
    </div>
  </div>
);

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100">
      {/* Image Section */}
      <div className="relative h-48">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`${statusBadges[course.status].color} px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-opacity-90`}>
            {statusBadges[course.status].text}
          </span>
          <span className="bg-black bg-opacity-75 text-white text-xs px-3 py-1 rounded-full font-medium">
            {course.category}
          </span>
        </div>
        
        {/* Progress overlay for in-progress courses */}
        {course.status === 'in-progress' && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4">
            <div className="flex justify-between text-xs mb-2 font-medium">
              <span>Progress: {course.completed}%</span>
              <span>{course.days} days left</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className={`${course.progressColor} h-2 rounded-full transition-all duration-500`} 
                style={{ width: `${course.completed}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-500 font-medium">by {course.instructor}</p>
          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg text-xs font-medium">
            {course.level}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">{course.title}</h3>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-500" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-500" />
            <span>{course.students} Students</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-500" />
            <span>{course.lessons} Lessons</span>
          </div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center mb-6">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.floor(course.rating) ? "fill-current" : "text-gray-300"}`} />
            ))}
          </div>
          <span className="text-sm text-gray-600 font-medium">{course.rating}/5.0</span>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 ">{course.originalPrice}</span>
           
          </div>
          
          <button className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ml-1 ${
            course.status === 'completed' 
              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
              : course.status === 'in-progress'
              ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl'
              : 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
          }`}>
            {course.status === 'completed' ? (
              <>
                <Check className="w-4 h-4" /> View Certificate
              </>
            ) : course.status === 'in-progress' ? (
              <>
                <Play className="w-4 h-4" /> Continue Learning
              </>
            ) : (
              <>
                <ArrowRight className="w-4 h-4" /> Start Course
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function LearningDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* My Learning Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="text-purple-500 w-6 h-6" /> My Learning
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>
        </div>

        {/* My Achievements Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Award className="text-yellow-500 w-6 h-6" /> My Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, idx) => (
              <AchievementCard key={idx} achievement={achievement} />
            ))}
          </div>
        </div>

        {/* My Courses Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2 ">
            <BookOpen className="text-purple-500 w-6 h-6" /> My Courses
          </h2>
          <div className="flex gap-6 overflow-x-auto mx-auto place-items-center justify-center">
            {coursesData.map((course, idx) => (
              <div key={idx} className="flex-shrink-0 w-80">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}