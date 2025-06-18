import React, { useEffect, useState, useContext } from 'react';
import '../assets/style/My_Courses.css';
import {
  FaClock,
  FaUsers,
  FaBookOpen,
  FaCheck,
  FaPlay,
  FaArrowRight,
  FaStar,
  FaFire,
  FaGraduationCap,
  FaAward,
  FaCompass,
  FaBook
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../pages/AuthContext'; // Update this path

const achievements = [
  {
    title: 'Course Explorer',
    icon: <FaCompass className="w-5 h-5 text-white" />,
    progress: 100,
    color: 'from-yellow-400 to-orange-500',
    count: '10 Courses',
    bgColor: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    progressBg: 'bg-yellow-500'
  },
  {
    title: 'Learning Streak',
    icon: <FaBookOpen className="w-5 h-5 text-white" />,
    progress: 65,
    color: 'from-red-500 to-orange-500',
    count: '7 Days',
    bgColor: 'bg-gradient-to-br from-red-500 to-orange-500',
    progressBg: 'bg-red-500'
  },
  {
    title: 'Certified Pro',
    icon: <FaGraduationCap className="w-5 h-5 text-white" />,
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

const AchievementCard = ({ achievement }) => {
  const Iconcomponent = achievement.icon;
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1 h-full flex flex-col">
      <div className="flex items-center mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 text-lg">{achievement.title}</h3>
          <div className="text-sm text-gray-500">{achievement.count}</div>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-end">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div className={`h-2 rounded-full ${achievement.progressBg}`} style={{ width: `${achievement.progress}%` }}></div>
        </div>
        <div className="text-right text-sm text-gray-600 font-medium">{achievement.progress}% complete</div>
      </div>
    </div>
  );
}

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100">
      <div className="relative h-48">
        <img src={course.image || course.thumbnail || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`${statusBadges[course.status || 'not-started'].color} px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-opacity-90`}>
            {statusBadges[course.status || 'not-started'].text}
          </span>
          <span className="bg-black bg-opacity-75 text-white text-xs px-3 py-1 rounded-full font-medium">
            {course.category || 'General'}
          </span>
        </div>
        {course.status === 'in-progress' && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4">
            <div className="flex justify-between text-xs mb-2 font-medium">
              <span>Progress: {course.completed || 0}%</span>
              <span>{course.days || 0} days left</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className={`${course.progressColor || 'bg-purple-500'} h-2 rounded-full transition-all duration-500`} style={{ width: `${course.completed || 0}%` }}></div>
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-500 font-medium">by {course.instructor || 'Unknown'}</p>
          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg text-xs font-medium">
            {course.level || 'Beginner'}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">{course.title}</h3>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <FaClock className="w-4 h-4 text-purple-500" />
            <span>{course.duration || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaUsers className="w-4 h-4 text-purple-500" />
            <span>{course.students || 0} Students</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBookOpen className="w-4 h-4 text-purple-500" />
            <span>{course.lessons || 0} Lessons</span>
          </div>
        </div>
        <div className="flex items-center mb-6">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={`w-4 h-4 ${i < Math.floor(course.rating || 0) ? "fill-current" : "text-gray-300"}`} />
            ))}
          </div>
          <span className="text-sm text-gray-600 font-medium">{course.rating || 0}/5.0</span>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">{course.originalPrice || course.price || 'Free'}</span>
          </div>
          {course.status === 'in-progress' ? (
            <Link
              to="/video"
              id="continue-learning-btn"
              className="continue-learning-btn flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ml-1 bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl"
            >
              <FaPlay className="w-4 h-4" /> Continue Learning
            </Link>
          ) : course.status === 'completed' ? (
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ml-1 bg-green-100 text-green-700 hover:bg-green-200"
            >
              <FaCheck className="w-4 h-4" /> View Certificate
            </button>
          ) : (
            <Link
              to="/video"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ml-1 bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl"
            >
              <FaArrowRight className="w-4 h-4" /> Start Course
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default function LearningDashboard({ UserId }) {
  const { enrolledCourses } = useContext(AuthContext);
  const [stats, setStats] = useState([
    { label: 'Total Courses', value: 0, icon: <FaBookOpen className="w-5 h-5" />, color: 'bg-purple-100 text-purple-600' },
    { label: 'Completed', value: 0, icon: <FaCheck className="w-5 h-5" />, color: 'bg-green-100 text-green-600' },
    { label: 'In Progress', value: 0, icon: <FaPlay className="w-5 h-5" />, color: 'bg-blue-100 text-blue-600' },
    { label: 'Learning Hours', value: '0h', icon: <FaClock className="w-5 h-5" />, color: 'bg-orange-100 text-orange-600' }
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          completedRes,
          inProgressRes,
          totalRes,
          hoursRes
        ] = await Promise.all([
          axios.get(`http://localhost:5000/api/users/${UserId}/completed-courses-count`),
          axios.get(`http://localhost:5000/api/users/${UserId}/in-progress-courses-count`),
          axios.get(`http://localhost:5000/api/users/${UserId}/total-courses-count`),
          axios.get(`http://localhost:5000/api/users/${UserId}/learning-hours`)
        ]);

        setStats([
          {
            label: 'Total Courses',
            value: totalRes.data.count || 0,
            icon: <FaBookOpen className="w-5 h-5" />,
            color: 'bg-purple-100 text-purple-600'
          },
          {
            label: 'Completed',
            value: completedRes.data.count || 0,
            icon: <FaCheck className="w-5 h-5" />,
            color: 'bg-green-100 text-green-600'
          },
          {
            label: 'In Progress',
            value: inProgressRes.data.count || 0,
            icon: <FaPlay className="w-5 h-5" />,
            color: 'bg-blue-100 text-blue-600'
          },
          {
            label: 'Learning Hours',
            value: `${hoursRes.data.hours || 0}h`,
            icon: <FaClock className="w-5 h-5" />,
            color: 'bg-orange-100 text-orange-600'
          }
        ]);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    if (UserId) {
      fetchStats();
    }
  }, [UserId]);

  // Calculate local stats from enrolled courses
  useEffect(() => {
    if (enrolledCourses && enrolledCourses.length > 0) {
      const completedCount = enrolledCourses.filter(course => course.status === 'completed').length;
      const inProgressCount = enrolledCourses.filter(course => course.status === 'in-progress').length;
      const totalHours = enrolledCourses.reduce((total, course) => {
        const hours = parseFloat(course.duration?.replace('h', '') || 0);
        return total + hours;
      }, 0);

      // Update stats with local data if API calls fail or for immediate display
      setStats(prevStats => [
        { ...prevStats[0], value: enrolledCourses.length },
        { ...prevStats[1], value: completedCount },
        { ...prevStats[2], value: inProgressCount },
        { ...prevStats[3], value: `${totalHours.toFixed(1)}h` }
      ]);
    }
  }, [enrolledCourses]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* My Learning Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FaBookOpen className="text-purple-500 w-6 h-6" /> My Learning
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
            <FaAward className="text-yellow-500 w-6 h-6" /> My Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, idx) => (
              <AchievementCard key={idx} achievement={achievement} />
            ))}
          </div>
        </div>

        {/* My Courses Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FaBookOpen className="text-purple-500 w-6 h-6" /> My Courses
          </h2>
          {enrolledCourses && enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course, idx) => (
                <div key={course.id || idx} className="w-full">
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaBookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">No Enrolled Courses</h3>
              <p className="text-gray-400 mb-6">Start your learning journey by enrolling in a course!</p>
              <Link 
                to="/courses" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-all duration-200"
              >
                <FaCompass className="w-4 h-4" />
                Browse Courses
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}