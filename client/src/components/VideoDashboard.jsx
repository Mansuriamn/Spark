import React, { useState, useEffect, useContext } from 'react';
import { Play, Clock, CheckCircle, User, Calendar, TrendingUp, BookOpen, Award, Video, ArrowLeft, Loader } from 'lucide-react';
import { AuthContext } from '../pages/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const VideoDashboard = ({ Footer }) => {

  const navigate = useNavigate();
  const { courseId, lessonId: urlLessonId } = useParams();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [courseData, setCourseData] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const {
    isAuthenticated,
    enrolledCourses,
    updateEnrolledCourses,
    user,
    token,
    enrolledCourseIds,
    currentLessonId,
    updateCurrentLessonId
  } = useContext(AuthContext) || {};

  // Helper function to validate MongoDB ObjectId
  const isValidObjectId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
  };

  // Fetch course lessons
  const fetchCourseLessons = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}/lesson`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },

      });

      if (!response.ok) {
        throw new Error(`Failed to fetch lessons: ${response.status}`);
      }

      const data = await response.json();
      setLessons(data.lessons || []);

      // Set current lesson based on stored lesson ID or first uncompleted lesson
      let lessonToSet = null;
      if (currentLessonId) {
        lessonToSet = data.lessons?.find(lesson =>
          (lesson.id || lesson._id) === urlLessonId
        );
      }

      if (!lessonToSet && currentLessonId) {
        lessonToSet = data.lessons?.find(lesson =>
          (lesson.id || lesson._id) === currentLessonId
        );
      }

      if (!lessonToSet) {
        const firstIncomplete = data.lessons?.find(lesson => !lesson.completed);
        lessonToSet = firstIncomplete || data.lessons?.[0] || null;
      }

      setCurrentLesson(lessonToSet);

      return data.lessons;
    } catch (error) {
      setError(`Failed to load lessons: ${error.message}`);
      return [];
    }
  };

  // Fetch specific lesson details
  const fetchLessonDetails = async (lessonId) => {
    try {
      const response = await fetch(`/api/courses/${courseId}/lesson/${lessonId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch lesson details: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Fetch course details
  const fetchCourseDetails = async () => {
    if (!courseId) {
      setError("Course ID not provided");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const decodedId = decodeURIComponent(courseId);
      const isValidId = isValidObjectId(decodedId);

      // Try multiple API endpoints that might work
      const possibleEndpoints = [
        `/api/courses/${decodedId}`,
        `/api/course/${decodedId}`,
        `/api/track/${decodedId}`,
        `/api/courses/details/${decodedId}`,
        `/api/v1/courses/${decodedId}`
      ];

      let courseDetails = null;

      for (const endpoint of possibleEndpoints) {
        try {
          const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              ...(token && { 'Authorization': `Bearer ${token}` }),
            },
          });

          if (response.ok) {
            courseDetails = await response.json();
            break;
          }
        } catch (endpointError) {
          continue;
        }
      }

      if (!courseDetails) {
        throw new Error("Course not found in any endpoint");
      }

      setCourseData(courseDetails);

      // Fetch lessons after getting course details
      await fetchCourseLessons();

    } catch (error) {
      setError(`Failed to load course: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      // For demo purposes, load sample data if no token
      if (!token) {
        setLoading(false);
        setSampleData();
      } else {
        fetchCourseDetails();
      }
    }
  }, [courseId, token]);

  // Sample data for demo purposes
  const setSampleData = () => {
    const sampleLessons = [
      { id: 1, title: "Introduction to Data Science", duration: "8", completed: true, videoUrl: "https://www.youtube.com/embed/rjfchLPJ3m8", section: "Getting Started" },
      { id: 2, title: "Setting up Environment", duration: "6", completed: true, videoUrl: "https://www.youtube.com/embed/rjfchLPJ3m8", section: "Getting Started" },
      { id: 3, title: "Python Basics", duration: "12", completed: false, progress: 75, videoUrl: "https://www.youtube.com/embed/rjfchLPJ3m8", section: "Python Programming" },
      { id: 4, title: "Variables and Data Types", duration: "10", completed: false, videoUrl: "https://www.youtube.com/embed/rjfchLPJ3m8", section: "Python Programming" },
      { id: 5, title: "Control Flow", duration: "16", completed: false, videoUrl: "https://www.youtube.com/embed/rjfchLPJ3m8", section: "Python Control Flow" }
    ];

    setLessons(sampleLessons);

    // Set current lesson based on stored lesson ID or first uncompleted lesson
    let lessonToSet = null;
    if (currentLessonId) {
      lessonToSet = sampleLessons.find(lesson =>
        (lesson.id || lesson._id) === currentLessonId
      );
    }

    if (!lessonToSet) {
      lessonToSet = sampleLessons.find(l => !l.completed) || sampleLessons[0];
    }

    setCurrentLesson(lessonToSet);
    setCourseData({
      title: "Complete Data Science Bootcamp",
      description: "Master the theory, practice, and math behind Data Science, Machine Learning, Deep Learning, NLP",
      rating: "4.6",
      studentsCount: "80,397",
      level: "All Levels"
    });
  };

  // Handle lesson selection
  const handleLessonSelect = async (lesson) => {
    try {
      setSelectedVideo(lesson);
      setCurrentLesson(lesson);
      
      if (currentLessonId) {
  lessonToSet = data.lessons?.find(lesson =>
    (lesson.id || lesson._id) === urlLessonId
  );
}

      // Update current lesson ID in AuthContext (saves to localStorage)
      const lessonId = lesson.id || lesson._id;
      if (lessonId && updateCurrentLessonId) {
        updateCurrentLessonId(lessonId);
      }

      // Fetch detailed lesson content if needed
      if (lessonId && token) {
        const lessonDetails = await fetchLessonDetails(lessonId);
        setCurrentLesson({ ...lesson, ...lessonDetails });
      }
    } catch (error) {
      console.error('Error selecting lesson:', error.message);
    }
  };

  // Calculate progress statistics
  const calculateStats = () => {
    if (!lessons.length) {
      return {
        totalLessons: 0,
        completedLessons: 0,
        inProgress: 0,
        upcoming: 0,
        overallProgress: 0,
        totalDuration: 0
      };
    }

    const completed = lessons.filter(lesson => lesson.completed).length;
    const inProgress = lessons.filter(lesson => lesson.inProgress).length;
    const upcoming = lessons.length - completed - inProgress;
    const overallProgress = Math.round((completed / lessons.length) * 100);

    // Calculate total duration (assuming duration is in minutes)
    const totalDuration = lessons.reduce((acc, lesson) => {
      const duration = lesson.duration || 0;
      return acc + (typeof duration === 'string' ? parseInt(duration) : duration);
    }, 0);

    return {
      totalLessons: lessons.length,
      completedLessons: completed,
      inProgress,
      upcoming,
      overallProgress,
      totalDuration: Math.round(totalDuration / 60) // Convert to hours
    };
  };

  const stats = calculateStats();

  // Group lessons by sections if they have section information
  const groupLessonsBySection = () => {
    if (!lessons.length) return [];

    // If lessons have section info, group them
    if (lessons[0].section) {
      const sections = {};
      lessons.forEach(lesson => {
        const sectionName = lesson.section || 'General';
        if (!sections[sectionName]) {
          sections[sectionName] = [];
        }
        sections[sectionName].push(lesson);
      });

      return Object.entries(sections).map(([name, sectionLessons], index) => ({
        id: index + 1,
        title: name,
        lessons: sectionLessons.length,
        duration: calculateSectionDuration(sectionLessons),
        progress: calculateSectionProgress(sectionLessons),
        videos: sectionLessons
      }));
    }

    // Otherwise, create a single section with all lessons
    return [{
      id: 1,
      title: "Course Content",
      lessons: lessons.length,
      duration: `${stats.totalDuration}h`,
      progress: stats.overallProgress,
      videos: lessons
    }];
  };

  const calculateSectionDuration = (sectionLessons) => {
    const totalMinutes = sectionLessons.reduce((acc, lesson) => {
      const duration = lesson.duration || 0;
      return acc + (typeof duration === 'string' ? parseInt(duration) : duration);
    }, 0);

    if (totalMinutes >= 60) {
      return `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}min`;
    }
    return `${totalMinutes}min`;
  };

  const calculateSectionProgress = (sectionLessons) => {
    const completed = sectionLessons.filter(lesson => lesson.completed).length;
    return Math.round((completed / sectionLessons.length) * 100);
  };

  const videoSections = groupLessonsBySection();

  // Sample activity data - you might want to fetch this from API as well
  const recentActivity = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 1.8 },
    { day: 'Wed', hours: 3.2 },
    { day: 'Thu', hours: 2.1 },
    { day: 'Fri', hours: 4.2 },
    { day: 'Sat', hours: 3.8 },
    { day: 'Sun', hours: 2.9 }
  ];

  const maxHours = Math.max(...recentActivity.map(day => day.hours));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-gray-600">Loading course content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Course</h2>
            <p className="text-red-600 mb-4">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {courseData?.title || "Complete Data Science Bootcamp"}
                </h1>
                <p className="text-gray-600 text-lg">
                  {courseData?.description || "Master the theory, practice, and math behind Data Science, Machine Learning, Deep Learning, NLP"}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm font-medium">{courseData?.rating || "4.6"} Rating</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium">{courseData?.studentsCount || "80,397"} Students</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-6 mb-8 border-b border-gray-200">
            {['overview', 'progress', 'schedule'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSection(tab)}
                className={`pb-4 px-2 text-sm font-medium capitalize transition-colors ${activeSection === tab
                  ? 'border-b-2 border-purple-600 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              {activeSection === 'overview' && (
                <div className="space-y-6">
                  {/* Video Section */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

                      <div className="w-full aspect-video rounded overflow-hidden mb-0 z-10">
                        {currentLesson?.videoUrl ? (
                          <iframe
                            src={currentLesson.videoUrl}
                            title={currentLesson.title || 'Current Lesson'}
                            allowFullScreen
                            className="w-full h-full rounded"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white">
                            <div className="text-center">
                              <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                              <p>No video available</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold">
                          Current Lesson: {currentLesson?.title || "Select a lesson"}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{currentLesson?.duration || "0"} min</span>
                        </div>
                      </div>

                      {currentLesson && (
                        <>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${currentLesson.progress || 0}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Progress: {currentLesson.progress || 0}%</span>
                            <span>Status: {currentLesson.completed ? 'Completed' : 'In Progress'}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
                    {videoSections.map((section) => (
                      <div key={section.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="bg-purple-100 rounded-lg p-2">
                                <BookOpen className="w-5 h-5 text-purple-600" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {section.title}
                                </h3>
                                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                  <span>{section.lessons} lessons</span>
                                  <span>{section.duration}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-purple-600 mb-1">
                                {section.progress}%
                              </div>
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${section.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>

                          {/* Video List */}
                          <div className="space-y-2">
                            {section.videos.map((video) => (
                              <div
                                key={video.id || video._id}
                                className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group ${currentLesson && (currentLesson.id === video.id || currentLesson._id === video._id)
                                  ? 'bg-blue-50 border border-blue-200'
                                  : ''
                                  }`}
                                onClick={() => handleLessonSelect(video)}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className={`p-2 rounded-lg ${video.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                                    {video.completed ? (
                                      <CheckCircle className="w-4 h-4 text-green-600" />
                                    ) : (
                                      <Play className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                                    )}
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900">{video.title}</div>
                                    <div className="text-sm text-gray-500">{video.duration} min</div>
                                  </div>
                                </div>
                                {video.completed && (
                                  <div className="text-green-600 text-sm font-medium">Completed</div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'progress' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6">Learning Progress</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                          <CheckCircle className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{stats.completedLessons}</div>
                        <div className="text-sm text-gray-500">Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-3">
                          <Clock className="w-8 h-8 text-orange-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{stats.inProgress}</div>
                        <div className="text-sm text-gray-500">In Progress</div>
                      </div>
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
                          <Video className="w-8 h-8 text-gray-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{stats.upcoming}</div>
                        <div className="text-sm text-gray-500">Upcoming</div>
                      </div>
                    </div>

                    {/* Activity Chart */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-4">Weekly Activity</h3>
                      <div className="flex items-end space-x-2 h-40">
                        {recentActivity.map((day, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div
                              className="w-full bg-purple-600 hover:bg-purple-500 rounded-t-lg transition-all duration-500"
                              style={{ height: `${(day.hours / maxHours) * 100}%`, minHeight: '20px' }}
                            ></div>
                            <div className="text-xs text-gray-500 mt-2">{day.day}</div>
                            <div className="text-xs font-medium text-gray-700">{day.hours}h</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'schedule' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6">Learning Schedule</h2>
                    <div className="space-y-4">
                      <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-blue-900">Current Lesson</h3>
                          <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
                            {currentLesson?.duration || 0} min
                          </span>
                        </div>
                        <p className="text-blue-800">{currentLesson?.title || "No lesson selected"}</p>
                        <div className="flex items-center mt-2 text-sm text-blue-600">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>Duration: {currentLesson?.duration || 0} minutes</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-700">Next Lessons</h4>
                        {lessons.filter(lesson => !lesson.completed).slice(0, 3).map((lesson, index) => (
                          <div key={lesson.id || lesson._id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                                <p className="text-sm text-gray-500">Duration: {lesson.duration} min</p>
                              </div>
                              <Calendar className="w-5 h-5 text-gray-400" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Overall Progress */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Overall Progress</h3>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{stats.overallProgress}%</div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-purple-600 h-3 rounded-full transition-all duration-700"
                      style={{ width: `${stats.overallProgress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 text-center">
                  {stats.completedLessons} of {stats.totalLessons} lessons completed
                </div>
              </div>

              {/* Course Stats */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Course Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Total Duration</span>
                    </div>
                    <span className="font-medium">{stats.totalDuration} hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Video className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Total Lessons</span>
                    </div>
                    <span className="font-medium">{stats.totalLessons}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Skill Level</span>
                    </div>
                    <span className="font-medium">{courseData?.level || "All Levels"}</span>
                  </div>
                </div>
              </div>

              {/* Achievement */}
              {stats.completedLessons > 0 && (
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-yellow-100 rounded-full p-2">
                      <Award className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-yellow-900">Great Progress!</div>
                      <div className="text-sm text-yellow-700">
                        {stats.completedLessons} lessons completed
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-yellow-600">
                    Keep up the excellent work!
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VideoDashboard;