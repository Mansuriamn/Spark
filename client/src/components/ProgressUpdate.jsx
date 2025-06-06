
import React, { useState } from 'react';
import { Clock, Users, BookOpen, Check, Play, ArrowRight, Filter, Trophy, Medal, Star, GraduationCap, TrendingUp, Crown, Flame, Award, ChevronDown } from 'lucide-react';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

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
  },
  {
    title: 'UX/UI Design Fundamentals',
    lessons: 10,
    students: 256,
    rating: 4.6,
    completed: 0,
    days: 45,
    status: 'not-started',
    instructor: 'Mike Chen',
    duration: '5h 20m',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Design',
    price: '$34.99',
    originalPrice: '$149.99',
    progressColor: 'bg-pink-500'
  }
];

const filterOptions = [
  { id: 'all', label: 'All Courses' },
  { id: 'completed', label: 'Completed' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'not-started', label: 'Not Started' }
];

const statusBadges = {
  completed: { text: 'Completed', color: 'bg-green-100 text-green-700' },
  'in-progress': { text: 'In Progress', color: 'bg-purple-100 text-purple-700' },
  'not-started': { text: 'Not Started', color: 'bg-gray-100 text-gray-700' }
};

const achievements = [
  { 
    title: 'Course Explorer', 
    icon: <BookOpen className="w-5 h-5" />, 
    progress: 100, 
    color: 'from-yellow-400 to-orange-500', 
    count: '10 Courses',
    bgColor: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    progressBg: 'bg-yellow-500'
  },
  { 
    title: 'Learning Streak', 
    icon: <Flame className="w-5 h-5" />, 
    progress: 65, 
    color: 'from-red-500 to-orange-500', 
    count: '7 Days',
    bgColor: 'bg-gradient-to-br from-red-500 to-orange-500',
    progressBg: 'bg-red-500'
  },
  { 
    title: 'Certified Pro', 
    icon: <GraduationCap className="w-5 h-5" />, 
    progress: 30, 
    color: 'from-purple-500 to-indigo-600', 
    count: '3 Certificates',
    bgColor: 'bg-gradient-to-br from-purple-500 to-indigo-600',
    progressBg: 'bg-purple-500'
  }
];

const stats = [
  { label: 'Total Courses', value: 12, icon: <BookOpen className="w-5 h-5" />, color: 'bg-purple-100 text-purple-600' },
  { label: 'Completed', value: 5, icon: <Check className="w-5 h-5" />, color: 'bg-green-100 text-green-600' },
  { label: 'In Progress', value: 4, icon: <Play className="w-5 h-5" />, color: 'bg-blue-100 text-blue-600' },
  { label: 'Learning Hours', value: '42h', icon: <Clock className="w-5 h-5" />, color: 'bg-orange-100 text-orange-600' }
];

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

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/video`); 
  };
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col lg:flex-row transition-all duration-300 hover:shadow-lg border border-gray-100">
    
      <div className="relative lg:w-80 h-48 lg:h-auto">
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

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
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
          
          <div className="flex items-center mb-6">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(course.rating) ? "fill-current" : "text-gray-300"}`} />
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium">{course.rating}/5.0</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 line-through">{course.originalPrice}</span>
            <span className="text-2xl font-bold text-purple-600">{course.price}</span>
          </div>
          
          <button onClick={handleNavigate} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
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

const AchievementBanner = () => (
  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl overflow-hidden">
    <div className="p-8 text-white flex flex-col lg:flex-row items-center">
      <div className="flex-1 mb-6 lg:mb-0">
        <h3 className="text-2xl font-bold mb-3">You're making great progress!</h3>
        <p className="text-purple-100 max-w-lg mb-4">
          Complete 3 more courses to unlock your achievement badge and get featured on our leaderboard.
        </p>
        <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2">
          <Trophy className="w-4 h-4" /> View Leaderboard
        </button>
      </div>
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
              <Medal className="text-white w-8 h-8" />
            </div>
          </div>
          <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            8
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-purple-200">Achievement</div>
          <div className="text-xl font-bold">Course Master</div>
          <div className="text-xs text-purple-200 mt-1">3 courses to unlock</div>
        </div>
      </div>
    </div>
  </div>
);

export default function MyCoursesPage() {
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredCourses = coursesData.filter((course) => {
    if (filter === 'all') return true;
    return course.status === filter;
  });

  return (
    <>
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
       
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              My Learning Journey
            </h1>
            <p className="text-gray-600 max-w-xl">
              Track your progress, continue learning, and discover your next course
            </p>
          </div>
          
          <div className="mt-4 lg:mt-0">
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-500 transition-all duration-200 shadow-lg hover:shadow-xl">
              Explore New Courses
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        {/* Achievement Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Award className="text-yellow-500 w-6 h-6" /> My Achievements
            </h2>
            <button className="text-purple-600 hover:text-purple-800 flex items-center text-sm font-medium">
              View all <ChevronDown className="ml-1 w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, idx) => (
              <AchievementCard key={idx} achievement={achievement} />
            ))}
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0 flex items-center gap-2">
            <BookOpen className="text-purple-500 w-6 h-6" /> My Courses
          </h2>
          
          <div className="flex flex-wrap gap-3">
            <div className="md:hidden">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200 text-sm font-medium"
              >
                <Filter className="w-4 h-4" /> Filters
              </button>
            </div>
            
            <div className={`${showFilters ? 'flex' : 'hidden'} md:flex flex-wrap gap-3`}>
              {filterOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setFilter(option.id);
                    setShowFilters(false);
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    filter === option.id 
                      ? 'bg-purple-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Cards */}
        <div className="space-y-6 mb-12">
          {filteredCourses.map((course, idx) => (
            <CourseCard key={idx} course={course} />
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center mb-12 border border-gray-100">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              You don't have any courses matching your selected filter.
            </p>
            <button 
              onClick={() => setFilter('all')}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors duration-200"
            >
              View All Courses
            </button>
          </div>
        )}

        
        <AchievementBanner />
      </div>
    </div>
    <Footer></Footer>
    </>
  );
}