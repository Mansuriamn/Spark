import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Clock, Users, BookOpen, Check, Play, ArrowRight, Filter, Star, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import ActivityCard from '../components/Activitycard';
import ProgressCard from '../components/Progresscard';
import CourseCard from '../components/Course';
import ScheduleCard from '../components/Schedulecard';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

// Fallback course data (used when API fails or returns empty)
const fallbackCoursesData = [
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

// Course Card Component
const DashboardCourseCard = ({ course }) => {
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

const Dashboard = () => {
  const [DashData, setDashData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch dashboard data
    axios.get("").then((res) => {
      setDashData(res.data);
    }).catch((err) => {
      console.error("Error fetching dashboard data:", err);
    })

    // Fetch courses data
    fetchCourses();
  }, [])

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // api
      const response = await axios.get('/api/courses');
      
      //use fallback data
      if (response.data && response.data.length > 0) {
        setCoursesData(response.data);
      } else {
        // fallback
        setCoursesData(fallbackCoursesData);
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to load courses");
      
      // error
      setCoursesData(fallbackCoursesData);
    } finally {
      setLoading(false);
    }
  }

  const filteredCourses = coursesData.filter((course) => {
    if (filter === 'all') return true;
    return course.status === filter;
  });

  // loading state for courses
  const renderCoursesContent = () => {
    if (loading) {
      return (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center mb-12 border border-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Loading Courses...</h3>
          <p className="text-gray-600">Please wait while we fetch your courses.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center mb-12 border border-gray-100">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Courses</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">{error}</p>
          <button 
            onClick={fetchCourses}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (filteredCourses.length === 0) {
      return (
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
      );
    }

    return (
      <div className="space-y-6 mb-12">
        {filteredCourses.map((course, idx) => (
          <DashboardCourseCard key={idx} course={course} />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4">
        {/*dashboard grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="col-span-1">
            <ActivityCard />
          </div>
          <div className="col-span-1 flex flex-col gap-6 h-full">
            <div className="h-full">
              <ProgressCard />
            </div>
            <div className="h-full">
              <ScheduleCard />
            </div>
          </div>
          <div className="col-span-1">
            <CourseCard />
          </div>
        </div>

        {/* courses Section */}
        <div className="mt-12 max-w-6xl mx-auto">
          {/*filter Section */}
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

          {/* render*/}
          {renderCoursesContent()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;



