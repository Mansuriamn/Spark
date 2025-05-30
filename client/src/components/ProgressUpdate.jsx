import React, { useState } from 'react';
import { FaClock, FaUsers, FaBook, FaCheck, FaPlay, FaArrowRight, FaFilter, FaTrophy, FaMedal, FaStar, FaGraduationCap, FaChartLine, FaCrown, FaFire, FaAward, FaChevronDown } from 'react-icons/fa';
import { motion } from 'framer-motion';

const coursesData = [
  {
    title: 'Google Ads Training 2021: Profit With Pay Per Click',
    lessons: 6,
    students: 198,
    rating: 4.7,
    completed: 100,
    days: 56,
    status: 'completed',
    instructor: 'Jon Kantner',
    duration: '4h 30m',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Marketing',
    price: '$19.99',
    originalPrice: '$99.99',
    progressColor: 'bg-green-500'
  },
  {
    title: 'Complete SEO Masterclass: Beginner to Advanced',
    lessons: 8,
    students: 305,
    rating: 4.5,
    completed: 45,
    days: 30,
    status: 'in-progress',
    instructor: 'Alice Smith',
    duration: '6h 15m',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1115&q=80',
    category: 'SEO',
    price: '$24.99',
    originalPrice: '$89.99',
    progressColor: 'bg-blue-500'
  },
  {
    title: 'Advanced Facebook Ads Strategy for E-commerce',
    lessons: 10,
    students: 410,
    rating: 4.9,
    completed: 0,
    days: 60,
    status: 'not-started',
    instructor: 'Bob Johnson',
    duration: '5h 10m',
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Advertising',
    price: '$29.99',
    originalPrice: '$119.99',
    progressColor: 'bg-purple-500'
  },
];

const filterOptions = [
  { id: 'all', label: 'All Courses' },
  { id: 'completed', label: 'Completed' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'not-started', label: 'Not Started' }
];

const statusBadges = {
  completed: { text: 'Completed', color: 'bg-green-100 text-green-800' },
  'in-progress': { text: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  'not-started': { text: 'Not Started', color: 'bg-purple-100 text-purple-800' }
};

const achievements = [
  { title: 'Course Explorer', icon: <FaBook />, progress: 100, color: 'bg-gradient-to-r from-yellow-400 to-orange-500', count: '10 Courses' },
  { title: 'Learning Streak', icon: <FaFire />, progress: 65, color: 'bg-gradient-to-r from-red-500 to-orange-500', count: '7 Days' },
  { title: 'Certified Pro', icon: <FaGraduationCap />, progress: 30, color: 'bg-gradient-to-r from-purple-500 to-indigo-600', count: '3 Certificates' }
];

const stats = [
  { label: 'Total Courses', value: 12, icon: <FaBook />, color: 'bg-indigo-100 text-indigo-600' },
  { label: 'Completed', value: 5, icon: <FaCheck />, color: 'bg-green-100 text-green-600' },
  { label: 'In Progress', value: 4, icon: <FaPlay />, color: 'bg-blue-100 text-blue-600' },
  { label: 'Learning Hours', value: '42h', icon: <FaClock />, color: 'bg-purple-100 text-purple-600' }
];

const Button = ({ children, variant = 'default', onClick, className = '' }) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center";
  
  const variants = {
    default: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg",
    secondary: "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-md hover:shadow-lg",
    outline: "bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50",
    ghost: "bg-transparent text-indigo-600 hover:bg-indigo-50"
  };
  
  return (
    <motion.button 
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
};

const StatCard = ({ stat }) => (
  <motion.div 
    className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex items-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mr-4`}>
      {stat.icon}
    </div>
    <div>
      <div className="text-gray-500 text-sm">{stat.label}</div>
      <div className="text-xl font-bold text-gray-900">{stat.value}</div>
    </div>
  </motion.div>
);

const AchievementCard = ({ achievement }) => (
  <motion.div 
    className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
    whileHover={{ y: -5 }}
  >
    <div className="flex items-center mb-4">
      <div className={`w-12 h-12 rounded-lg ${achievement.color} flex items-center justify-center mr-4 text-white`}>
        {achievement.icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-800">{achievement.title}</h3>
        <div className="text-sm text-gray-500">{achievement.count}</div>
      </div>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className={`h-2 rounded-full ${achievement.color.split(' ')[0]} ${achievement.color}`} 
        style={{ width: `${achievement.progress}%` }}
      ></div>
    </div>
    <div className="text-right text-sm text-gray-500 mt-1">{achievement.progress}% complete</div>
  </motion.div>
);

const CourseCard = ({ course }) => {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      {/* Image Section */}
      <div className="relative md:w-2/5 min-h-[200px]">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`${statusBadges[course.status].color} px-3 py-1 rounded-full text-xs font-medium`}>
            {statusBadges[course.status].text}
          </span>
          <span className="bg-black text-white text-xs px-2 py-1 rounded">
            {course.category}
          </span>
        </div>
        
        {/* Progress overlay for in-progress courses */}
        {course.status === 'in-progress' && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress: {course.completed}%</span>
              <span>{course.days} days left</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className={`${course.progressColor} h-2 rounded-full`} 
                style={{ width: `${course.completed}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">by {course.instructor}</p>
          <h3 className="text-xl font-bold text-gray-800 mb-3">{course.title}</h3>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <FaClock className="text-indigo-500" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaUsers className="text-indigo-500" />
              <span>{course.students} Students</span>
            </div>
            <div className="flex items-center gap-1">
              <FaBook className="text-indigo-500" />
              <span>{course.lessons} Lessons</span>
            </div>
          </div>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.floor(course.rating) ? "fill-current" : "text-gray-300"} />
              ))}
            </div>
            <span className="text-sm text-gray-600">{course.rating}/5.0</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <span className="text-sm text-gray-400 line-through mr-2">{course.originalPrice}</span>
            <span className="text-lg font-bold text-indigo-600">{course.price}</span>
          </div>
          
          <Button 
            variant={course.status === 'not-started' ? 'default' : 'outline'} 
            className="min-w-[120px]"
          >
            {course.status === 'completed' ? (
              <>
                <FaCheck className="mr-2" /> View Certificate
              </>
            ) : course.status === 'in-progress' ? (
              <>
                <FaPlay className="mr-2" /> Continue
              </>
            ) : (
              <>
                <FaArrowRight className="mr-2" /> Start Course
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const AchievementBanner = () => (
  <motion.div 
    className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
  >
    <div className="p-8 text-white flex flex-col md:flex-row items-center">
      <div className="flex-1 mb-6 md:mb-0">
        <h3 className="text-2xl font-bold mb-3">You're making great progress!</h3>
        <p className="text-indigo-100 max-w-lg">
          Complete 3 more courses to unlock your achievement badge and get featured on our leaderboard.
        </p>
        <Button variant="secondary" className="mt-4 inline-flex">
          <FaTrophy className="mr-2" /> View Leaderboard
        </Button>
      </div>
      <div className="flex flex-col items-center">
        <div className="relative mb-3">
          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
              <FaMedal className="text-white text-3xl" />
            </div>
          </div>
          <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            8
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-indigo-200">Achievement</div>
          <div className="text-xl font-bold">Course Master</div>
          <div className="text-xs text-indigo-200 mt-1">3 courses to unlock</div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function MyCoursesPage() {
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredCourses = coursesData.filter((course) => {
    if (filter === 'all') return true;
    return course.status === filter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              My Learning Journey
            </h1>
            <p className="text-gray-600 max-w-xl">
              Track your progress, continue learning, and discover your next course
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button variant="secondary">
              Explore New Courses
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        {/* Achievement Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center">
              <FaAward className="text-amber-500 mr-2" /> My Achievements
            </h2>
            <button className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm">
              View all <FaChevronDown className="ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement, idx) => (
              <AchievementCard key={idx} achievement={achievement} />
            ))}
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-0 flex items-center">
            <FaBook className="text-indigo-500 mr-2" /> My Courses
          </h2>
          
          <div className="flex flex-wrap gap-2">
            <div className="md:hidden">
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center text-sm"
              >
                <FaFilter className="mr-2" /> Filters
              </Button>
            </div>
            
            <div className={`${showFilters ? 'flex' : 'hidden'} md:flex flex-wrap gap-2`}>
              {filterOptions.map((option) => (
                <Button
                  key={option.id}
                  variant={filter === option.id ? 'default' : 'outline'}
                  onClick={() => {
                    setFilter(option.id);
                    setShowFilters(false);
                  }}
                  className="text-sm"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Cards */}
        <div className="grid gap-8 mb-12">
          {filteredCourses.map((course, idx) => (
            <CourseCard key={idx} course={course} />
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center mb-12">
            <div className="text-5xl text-gray-300 mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No courses found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              You don't have any courses matching your selected filter.
            </p>
            <Button variant="default" onClick={() => setFilter('all')}>
              View All Courses
            </Button>
          </div>
        )}

        {/* Achievement Banner */}
        <AchievementBanner />
      </div>
    </div>
  );
}