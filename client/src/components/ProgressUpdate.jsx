import React, { useEffect, useState, useContext } from 'react';
import { Clock, Users, BookOpen, Check, Play, ArrowRight, Filter, Trophy, Medal, Star, GraduationCap, TrendingUp, Crown, Flame, Award, ChevronDown } from 'lucide-react';
import Footer from './Footer';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../pages/AuthContext'; // Add this import
import {
  FaClock, FaUsers, FaBookOpen, FaCheck, FaPlay, FaArrowRight, FaStar, FaFire, FaGraduationCap, FaAward, FaCompass, FaBook
} from 'react-icons/fa';
import Button from './Button';

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

const StatCard = ({ stat }) => (
  <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex items-center hover:shadow-md transition-shadow duration-200 min-h-[120px]">
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

const CourseCard = ({ course, courseProgress }) => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  // Helper: get instructor name
  const instructor =
    course.instructor?.name ||
    course.instructorName ||
    course.createdBy?.name ||
    course.createdBy ||
    'Expert Instructor';

  // Helper: get number of students enrolled
  const studentsCount = Array.isArray(course.userEnrolled)
    ? course.userEnrolled.length
    : (course.students || 0);

  // Helper: get rating (0-5)
  const rating = Number(course.rating) || 4;

  // Helper: get duration in hours/minutes
  let duration = '';
  if (course.estimatedDuration && !isNaN(course.estimatedDuration)) {
    const h = Math.floor(course.estimatedDuration / 60);
    const m = course.estimatedDuration % 60;
    duration = h > 0 ? `${h}h ${m}min` : `${m}min`;
  } else if (course.duration) {
    duration = course.duration;
  } else {
    duration = '0 min';
  }

  // Progress
  const progressData = courseProgress || {};
  const courseProgressPercentage = progressData.progressPercentage || course.completed || 0;
  const completedLessons = progressData.completedLessons || 0;
  const totalLessons = progressData.totalLessons || course.lessons?.length || 0;

  // Status
  let courseStatus = course.status || 'not-started';
  if (courseProgressPercentage >= 100) {
    courseStatus = 'completed';
  } else if (courseProgressPercentage > 0) {
    courseStatus = 'in-progress';
  }
  const statusBadge = statusBadges[courseStatus] || statusBadges['not-started'];

  // Navigation
  const handleNavigate = () => {
    const firstLessonId =
      course.lessons && course.lessons.length > 0
        ? course.lessons[0].id || course.lessons[0]._id || course.lessons[0]
        : null;
    if (firstLessonId) {
      navigate(`/courses/${course.id || course._id}/lesson/${firstLessonId}`);
    } else {
      navigate(`/courses/${course.id || course._id}`);
    }
  };

  // Render stars for rating
  const renderStars = () => (
    <div className="flex text-yellow-400 mr-2">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < Math.round(rating) ? "fill-current" : "text-gray-300"}`}
        />
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col lg:flex-row transition-all duration-300 hover:shadow-lg border border-gray-100 min-h-[320px] h-[320px]">
      <div className="relative lg:w-80 h-48 lg:h-auto">
        <img
          src={
            course.pictureUrl ||
            course.thumbnailUrl ||
            course.image ||
            'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
          }
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`${statusBadge.color} px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-opacity-90`}>
            {statusBadge.text}
          </span>
        </div>
        {courseStatus === 'in-progress' && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4">
            <div className="flex justify-between text-xs mb-2 font-medium">
              <span>Progress: {Math.round(courseProgressPercentage)}%</span>
              <span>{completedLessons}/{totalLessons} lessons</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${courseProgressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}
        {courseStatus === 'completed' && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-800/80 to-transparent text-white p-4">
            <div className="flex justify-between text-xs mb-2 font-medium">
              <span>✓ Completed</span>
              <span>{totalLessons}/{totalLessons} lessons</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full w-full"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500 font-medium">by {instructor}</p>
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg text-xs font-medium">
              {course.level || 'Beginner'}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{course.title}</h3>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-500" />
              <span>{studentsCount} Students</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-500" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-500" />
              <span>{totalLessons} Lessons</span>
            </div>
          </div>
          <div className="flex items-center mb-4">
            {renderStars()}
            <span className="text-sm text-gray-600 font-medium">{rating}/5.0</span>
          </div>
          {/* Progress Details */}
          {courseStatus === 'in-progress' && (
            <div className="mb-4 p-3 bg-purple-50 rounded-lg">
              <div className="flex justify-between text-sm text-purple-700 mb-1">
                <span>Course Progress</span>
                <span>{Math.round(courseProgressPercentage)}%</span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${courseProgressPercentage}%` }}
                ></div>
              </div>
              <div className="text-xs text-purple-600 mt-1">
                {completedLessons} of {totalLessons} lessons completed
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-purple-600">
              {course.price === 0 ? 'FREE' : `₹${course.price}`}
            </span>
          </div>
          <button onClick={handleNavigate} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${courseStatus === 'completed'
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : courseStatus === 'in-progress'
                ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
            }`}>
            {courseStatus === 'completed' ? (
              <>
                <Check className="w-4 h-4" /> View Certificate
              </>
            ) : courseStatus === 'in-progress' ? (
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

export default function MyCoursesPage() {
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [courseProgress, setCourseProgress] = useState({});
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  // Get user data and token
  const userData = JSON.parse(localStorage.getItem("userData"));


  const userId = userData?._id || user?._id;

  const [stats, setStats] = useState([
    { label: 'Total Courses', value: 0, icon: <FaBookOpen className="w-5 h-5" />, color: 'bg-purple-100 text-purple-600' },
    { label: 'Completed', value: 0, icon: <FaCheck className="w-5 h-5" />, color: 'bg-green-100 text-green-600' },
    { label: 'In Progress', value: 0, icon: <FaPlay className="w-5 h-5" />, color: 'bg-blue-100 text-blue-600' },
    { label: 'Learning Hours', value: '0h', icon: <FaClock className="w-5 h-5" />, color: 'bg-orange-100 text-orange-600' }
  ]);

  // Enhanced progress fetching with API integration
  useEffect(() => {
    const fetchAllProgress = async () => {
      if (!userId || !enrolledCourses || enrolledCourses.length === 0) {
        setIsLoadingProgress(false);
        return;
      }

      setIsLoadingProgress(true);
      const progressData = {};

      try {
        // Fetch progress for all enrolled courses
        const progressPromises = enrolledCourses.map(async (course) => {
          const courseId = course.id || course._id;
          try {
            // Primary API call with authentication
            const res = await axios.get(
              `http://localhost:5000/api/courses/${courseId}/progress`,
              { headers: { Authorization: `Bearer ${token}` } }
            );

            return {
              courseId,
              data: {
                progressPercentage: res.data.progressPercentage || res.data.overallProgress || 0,
                completedLessons: res.data.completedLessons || 0,
                totalLessons: res.data.totalLessons || course.lessons?.length || 0,
                ...res.data
              }
            };
          } catch (error) {
            console.warn(`Failed to fetch progress for course ${courseId}:`, error.message);

            console.log('Token used for progress API:', token);
            try {
              const fallbackRes = await axios.get(
                `http://localhost:5000/api/courses/${courseId}/progress`,
                {
                  headers: { Authorization: `Bearer ${token}` }

                }
              );

              return {
                courseId,
                data: {
                  progressPercentage: fallbackRes.data.progressPercentage || 0,
                  completedLessons: fallbackRes.data.completedLessons || 0,
                  totalLessons: fallbackRes.data.totalLessons || course.lessons?.length || 0,
                  ...fallbackRes.data
                }
              };
            } catch (fallbackError) {
              console.warn(`Fallback API also failed for course ${courseId}:`, fallbackError.message);

              // Use course data as final fallback
              return {
                courseId,
                data: {
                  progressPercentage: course.completed || 0,
                  completedLessons: 0,
                  totalLessons: course.lessons?.length || 0
                }
              };
            }
          }
        });

        const results = await Promise.all(progressPromises);

        // Build progress data object
        results.forEach(({ courseId, data }) => {
          progressData[courseId] = data;
        });

        setCourseProgress(progressData);

      } catch (error) {
        console.error('Error fetching course progress:', error);
      } finally {
        setIsLoadingProgress(false);
      }
    };

    fetchAllProgress();
  }, [userId, enrolledCourses, token]);

  // Update stats based on enrolled courses and progress data
  useEffect(() => {
  if (enrolledCourses && enrolledCourses.length > 0) {
    let completedCount = 0;
    let inProgressCount = 0;
    let totalMinutes = 0;

    enrolledCourses.forEach(course => {
      const courseId = course.id || course._id;
      const progress = courseProgress[courseId];
      const progressPercentage = progress?.progressPercentage || course.completed || 0;

      // Determine status based on progress
      if (progressPercentage >= 100) {
        completedCount++;
      } else if (progressPercentage > 0) {
        inProgressCount++;
      }

      // Calculate total minutes from estimatedDuration (prefer), else from duration string
      if (course.estimatedDuration && !isNaN(course.estimatedDuration)) {
        totalMinutes += Number(course.estimatedDuration);
      } else if (course.duration) {
        // Try to extract hours/minutes from string like "2h 30min"
        const match = course.duration.match(/(\d+)h\s*(\d*)min?/i);
        if (match) {
          totalMinutes += (parseInt(match[1], 10) * 60) + (parseInt(match[2] || "0", 10));
        } else {
          // If only minutes
          const minMatch = course.duration.match(/(\d+)\s*min/i);
          if (minMatch) totalMinutes += parseInt(minMatch[1], 10);
        }
      }
    });

    const totalHours = totalMinutes / 60;

    setStats([
      {
        label: 'Total Courses',
        value: enrolledCourses.length,
        icon: <FaBookOpen className="w-5 h-5" />,
        color: 'bg-purple-100 text-purple-600'
      },
      {
        label: 'Completed',
        value: completedCount,
        icon: <FaCheck className="w-5 h-5" />,
        color: 'bg-green-100 text-green-600'
      },
      {
        label: 'In Progress',
        value: inProgressCount,
        icon: <FaPlay className="w-5 h-5" />,
        color: 'bg-blue-100 text-blue-600'
      },
      {
        label: 'Learning Hours',
        value: `${totalHours > 0 ? totalHours.toFixed(1) : 0}h`,
        icon: <FaClock className="w-5 h-5" />,
        color: 'bg-orange-100 text-orange-600'
      }
    ]);
  }
}, [enrolledCourses, courseProgress]);

  // Filter enrolled courses based on status and progress
  const filteredCourses = (enrolledCourses || []).filter((course) => {
    if (filter === 'all') return true;

    const courseId = course.id || course._id;
    const progress = courseProgress[courseId];
    const progressPercentage = progress?.progressPercentage || course.completed || 0;

    // Determine status based on progress
    let status = 'not-started';
    if (progressPercentage >= 100) {
      status = 'completed';
    } else if (progressPercentage > 0) {
      status = 'in-progress';
    }

    return status === filter;
  });

  // Fallback API call for stats if context doesn't have enrolled courses
  useEffect(() => {
    const fetchStats = async () => {
      if (!enrolledCourses || enrolledCourses.length === 0) {
        try {
          const [
            completedRes,
            inProgressRes,
            totalRes,
            hoursRes
          ] = await Promise.all([
            axios.get(`http://localhost:5000/api/users/${userId}/completed-courses-count`),
            axios.get(`http://localhost:5000/api/users/${userId}/in-progress-courses-count`),
            axios.get(`http://localhost:5000/api/users/${userId}/total-courses-count`),
            axios.get(`http://localhost:5000/api/users/${userId}/learning-hours`)
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
      }
    };

    if (userId) {
      fetchStats();
    }
  }, [userId, enrolledCourses]);

  const handlebrowse = () => {
    navigate('/courses');
  };

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!userId || !token) return;
      try {
        const res = await fetch(`http://localhost:5000/api/users/${userId}/enrolled-courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch enrolled courses');
        const data = await res.json();
        // Only courses where user is in userEnrolled
        const filtered = (data.enrolledCourses || []).filter(
          (course) =>
            Array.isArray(course.userEnrolled) &&
            course.userEnrolled.map(String).includes(String(userId))
        );
        setEnrolledCourses(filtered);
      } catch (err) {
        setEnrolledCourses([]);
        console.error('Error fetching enrolled courses:', err);
      }
    };
    fetchEnrolledCourses();
  }, [userId, token]);

  return (
    <>
      <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
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
            
              <Button
               label="Explore New Courses"
               onClick={handlebrowse}
               className={`bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-500 transition-all duration-200 shadow-lg hover:shadow-xl`}
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0 flex items-center gap-2">
              <BookOpen className="text-purple-500 w-6 h-6" /> My Enrolled Courses
              {isLoadingProgress && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
              )}
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
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${filter === option.id
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

          {/* Course Cards - Only Enrolled Courses */}
          <div className="space-y-6 mb-12">
            {filteredCourses.map((course, idx) => {
              const courseId = course._id || course.id;
              const progress = courseProgress[courseId];

              return (
                <CourseCard
                  key={courseId || idx}
                  course={course}
                  courseProgress={progress}
                />
              );
            })}
          </div>

          {/* Empty State */}
          {(!enrolledCourses || enrolledCourses.length === 0) && (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center mb-12 border border-gray-100">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Enrolled Courses</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                You haven't enrolled in any courses yet. Start your learning journey today!
              </p>
              <button onClick={handlebrowse} className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors duration-200">
                Browse Courses
              </button>
            </div>
          )}

          {/* Filtered Empty State */}
          {enrolledCourses && enrolledCourses.length > 0 && filteredCourses.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center mb-12 border border-gray-100">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                You don't have any courses matching your selected filter.
              </p>
             
              <Button
                label="View All Courses"
                onClick={() => setFilter('all')}
                className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors duration-200"
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}