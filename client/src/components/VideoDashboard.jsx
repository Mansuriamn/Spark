import React, { useState, useEffect, useContext } from 'react';
import { Play, Clock, CheckCircle, User, Calendar, TrendingUp, BookOpen, Award, Video, Loader } from 'lucide-react';
import { AuthContext } from '../pages/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from './Footer';

const VideoDashboard = () => {
  const navigate = useNavigate();
  const { courseId, lessonId } = useParams();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [courseData, setCourseData] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [videoProgress, setVideoProgress] = useState(0);

  const {
    isAuthenticated, enrolledCourses, user, token, enrolledCourseIds, currentLessonId, updateCurrentLessonId, } = useContext(AuthContext) || {};

  // Helper function to validate MongoDB ObjectId
  const isValidObjectId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
  };

  // Fetch course lessons
  const fetchCourseLessons = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}/lessons`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch lessons: ${response.status}`);
      }

      const data = await response.json();
      const validLessons = data.lessons?.filter((lesson) => isValidObjectId(lesson._id));

      setLessons(validLessons || []);

      // Set current lesson based on lessonId from URL or stored currentLessonId
      let lessonToSet = null;
      if (lessonId && isValidObjectId(lessonId)) {
        lessonToSet = validLessons.find((lesson) => lesson._id === lessonId);
      }

      if (!lessonToSet && currentLessonId) {
        lessonToSet = validLessons.find((lesson) => lesson._id === currentLessonId);
      }

      if (!lessonToSet) {
        const firstIncomplete = validLessons.find((lesson) => !lesson.completed);
        lessonToSet = firstIncomplete || validLessons[0] || null;
      }

      setCurrentLesson(lessonToSet);
      if (lessonToSet && lessonToSet._id !== lessonId) {
        console.log(lessonToSet._id)
        navigate(`/courses/${courseId}/lesson/${lessonToSet._id}`);
      }

      // Set course data for the current lesson
      if (lessonToSet) {
        setCourseData(lessonToSet);
      }

      return validLessons;
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
          ...(token && { Authorization: `Bearer ${token}` }),
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
    if (!courseId || !isValidObjectId(courseId)) {
      setError('Invalid Course ID');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch course details: ${response.status}`);
      }

      const courseDetails = await response.json();
      setCourseData((prev) => ({
        ...prev,
        title: courseDetails.title,
        description: courseDetails.description,
        rating: courseDetails.rating,
        studentsCount: courseDetails.studentsCount,
        level: courseDetails.level,
      }));

      // Fetch lessons after getting course details
      await fetchCourseLessons();
    } catch (error) {
      setError(`Failed to load course: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId && token) {
      fetchCourseDetails();
    } else {
      setError('Authentication required');
      setLoading(false);
    }
  }, [courseId, token, lessonId]);

  // Handle lesson selection
  const handleLessonSelect = async (lesson) => {
    try {
      setSelectedVideo(lesson);
      setCurrentLesson(lesson);

      // Update URL with new lessonId
      const lessonId = lesson._id;
      navigate(`/courses/${courseId}/lesson/${lessonId}`);

      // Update current lesson ID in AuthContext
      if (lessonId && updateCurrentLessonId) {
        updateCurrentLessonId(lessonId);
      }

      // Fetch detailed lesson content
      if (lessonId && token) {
        const lessonDetails = await fetchLessonDetails(lessonId);
        setCurrentLesson({ ...lesson, ...lessonDetails });
        setCourseData((prev) => ({ ...prev, ...lessonDetails }));
      }
    } catch (error) {
      console.error('Error selecting lesson:', error.message);
    }
  };
const handleVideoProgress = async (e) => {
  const current = e.target.currentTime;
  const duration = e.target.duration;
  if (duration > 0) {
    const progress = Math.round((current / duration) * 100);
    setVideoProgress(progress);

    // Optionally: send progress to backend here
    try {
      await fetch(`/api/lessons/${currentLesson?._id}/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          lessonId: currentLesson?._id,
          progress,
        }),
      });
    } catch (err) {
      // handle error
    }
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
        totalDuration: 0,
      };
    }

    const completed = lessons.filter((lesson) => lesson.completed).length;
    const inProgress = lessons.filter((lesson) => lesson.inProgress).length;
    const upcoming = lessons.length - completed - inProgress;
    const overallProgress = Math.round((completed / lessons.length) * 100);

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
      totalDuration: Math.round(totalDuration / 60),
    };
  };

  const stats = calculateStats();

  // Group lessons by sections
  const groupLessonsBySection = () => {
    if (!lessons.length) return [];

    if (lessons[0].section) {
      const sections = {};
      lessons.forEach((lesson) => {
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
        videos: sectionLessons,
      }));
    }

    return [{
      id: 1,
      title: 'Course Content',
      lessons: lessons.length,
      duration: `${stats.totalDuration}h`,
      progress: stats.overallProgress,
      videos: lessons,
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
    const completed = sectionLessons.filter((lesson) => lesson.completed).length;
    return Math.round((completed / sectionLessons.length) * 100);
  };

  const videoSections = groupLessonsBySection();

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
                  {courseData?.title || 'Course Title'}
                </h1>
                <p className="text-gray-600 text-lg">
                  {courseData?.description || 'Course Description'}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm font-medium">{courseData?.rating || 'N/A'} Rating</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium">{courseData?.studentsCount || '0'} Students</span>
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
                        {courseData?.videos?.length > 0 ? (
                          <video
                            src={courseData.videos[0]?.url}
                            controls
                            className="w-full h-full rounded"
                            onTimeUpdate={handleVideoProgress}
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
                          Current Lesson: {currentLesson?.title || 'Select a lesson'}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{currentLesson?.duration || '0'} min</span>
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
                      <div
                        key={section.id}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="bg-purple-100 rounded-lg p-2">
                                <BookOpen className="w-5 h-5 text-purple-600" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                  <span>{section.lessons} lessons</span>
                                  <span>{section.duration}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-purple-600 mb-1">{section.progress}%</div>
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
                                key={video._id}
                                className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group ${currentLesson && currentLesson._id === video._id
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
                        <p className="text-blue-800">{currentLesson?.title || 'No lesson selected'}</p>
                        <div className="flex items-center mt-2 text-sm text-blue-600">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>Duration: {currentLesson?.duration || 0} minutes</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-700">Next Lessons</h4>
                        {lessons
                          .filter((lesson) => !lesson.completed)
                          .slice(0, 3)
                          .map((lesson) => (
                            <div key={lesson._id} className="border border-gray-200 rounded-lg p-4">
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
                    <span className="font-medium">{courseData?.level || 'All Levels'}</span>
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
                      <div className="text-sm text-yellow-700">{stats.completedLessons} lessons completed</div>
                    </div>
                  </div>
                  <div className="text-xs text-yellow-600">Keep up the excellent work!</div>
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