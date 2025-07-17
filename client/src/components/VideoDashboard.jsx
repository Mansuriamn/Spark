import React, { useState, useEffect, useContext } from 'react';
import { Play, Clock, CheckCircle, User, Calendar, TrendingUp, BookOpen, Award, Video, Loader } from 'lucide-react';
import { AuthContext } from '../pages/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import { XCircle, ArrowRight, Code, Trophy, Target, Zap } from 'lucide-react';


const initialProblems = [
  { id: 1, title: "Online Stock Span", status: "Not Attempted", difficulty: "Medium", category: "Stack" },
  { id: 2, title: "Daily Temperatures", status: "Not Attempted", difficulty: "Medium", category: "Stack" },
  { id: 3, title: "Non-Overlapping Intervals", status: "Not Attempted", difficulty: "Medium", category: "Greedy" },
  { id: 4, title: "Minimum Number of Arrows to Burst Balloons", status: "Not Attempted", difficulty: "Medium", category: "Greedy" },
  { id: 5, title: "Unique Paths", status: "Not Attempted", difficulty: "Medium", category: "Dynamic Programming" },
  { id: 6, title: "Longest Common Subsequence", status: "Not Attempted", difficulty: "Medium", category: "Dynamic Programming" },
  { id: 7, title: "Best Time to Buy and Sell Stock", status: "Not Attempted", difficulty: "Easy", category: "Array" },
  { id: 8, title: "Edit Distance", status: "Not Attempted", difficulty: "Hard", category: "Dynamic Programming" },
  { id: 9, title: "Word Search", status: "Not Attempted", difficulty: "Medium", category: "Backtracking" },
  { id: 10, title: "Letter Combinations of a Phone Number", status: "Not Attempted", difficulty: "Medium", category: "Backtracking" }
];

const VideoDashboard = () => {
  const [problems, setProblems] = useState(initialProblems);
  const [filter, setFilter] = useState('All');
  const solvedCount = problems.filter(p => p.status === 'Solved').length;
  const progressPercentage = Math.round((solvedCount / problems.length) * 100);

  const filteredProblems = problems.filter(problem => {
    if (filter === 'Solved') return problem.status === 'Solved';
    if (filter === 'Unsolved') return problem.status === 'Not Attempted';
    return true;
  });

  const handleSolve = (problemId) => {
    setProblems(prevProblems => {
      const updatedProblems = prevProblems.map(problem =>
        problem.id === problemId
          ? { ...problem, status: 'Solved' }
          : problem
      );
      console.log('Updated problems:', updatedProblems);
      return updatedProblems;
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Stack': 'bg-blue-50 text-blue-700',
      'Greedy': 'bg-purple-50 text-purple-700',
      'Dynamic Programming': 'bg-indigo-50 text-indigo-700',
      'Array': 'bg-orange-50 text-orange-700',
      'Backtracking': 'bg-pink-50 text-pink-700'
    };
    return colors[category] || 'bg-gray-50 text-gray-700';
  };
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
  const [studentCount, setStudentCount] = useState(0);
  const [apiProgress, setApiProgress] = useState({
    overallProgress: 0, completedLessons: 0, totalLessons: 0,
  });
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDurations, setVideoDurations] = useState({});

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
        setCourseData(prev => ({
          ...prev,
          ...lessonToSet
        }));
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


  useEffect(() => {
    const fetchAllData = async () => {
      if (!courseId || !token) {
        setError('Authentication required');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');

      try {
        // Fetch course details
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
          studentsCount: courseDetails.studentsCount, // fallback if API fails
          level: courseDetails.level,
        }));

        // Fetch lessons after getting course details
        await fetchCourseLessons();

        // Fetch enrolled users and count students (role: "user" and deleted: false)
        const studentRes = await axios.get(`http://localhost:5000/api/courses/${courseId}/enrolled-users`);
        const users = studentRes.data.users || [];
        const studentCount = users.filter(
          (u) => u.role === "user" && !u.deleted
        ).length;
        setStudentCount(studentCount);

      } catch (error) {
        setError(`Failed to load course: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
    // eslint-disable-next-line
  }, [courseId, token, lessonId]);


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
        totalTimeString: '0min',
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

    const hours = Math.floor(totalDuration / 60);
    const minutes = totalDuration % 60;
    const totalTimeString = hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;

    return {
      totalLessons: lessons.length,
      completedLessons: completed,
      inProgress,
      upcoming,
      overallProgress,
      totalDuration: Math.round(totalDuration / 60),
      totalTimeString,
    };
  };

  const stats = calculateStats();

  useEffect(() => {
    const fetchProgress = async () => {
      if (!courseId || !user?._id) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/courses/${courseId}/progress`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // Ensure overallProgress is set for UI
        setApiProgress({
          ...res.data,
          overallProgress: res.data.progressPercentage || 0,
        });
      } catch (err) {
        // fallback to local stats if API fails
        setApiProgress({
          overallProgress: stats.overallProgress,
          completedLessons: stats.completedLessons,
          totalLessons: stats.totalLessons,
          progressPercentage: stats.progressPercentage || 0,
        });
      }
    };
    fetchProgress();
  }, [courseId, user, token, stats.overallProgress, stats.completedLessons, stats.totalLessons]);
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

  const handleLoadedMetadata = (lessonId, e) => {
    setVideoDurations(prev => ({
      ...prev,
      [lessonId]: e.target.duration
    }));
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

  // --- Quiz Dashboard State ---
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedQuizQuestions, setSelectedQuizQuestions] = useState([]);
  const [addForm, setAddForm] = useState({
    questionText: '',
    category: '',
    level: '',
    status: 'Not Solve',
    questionURL: ''
  });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState('');

  // Fetch all quizzes on mount
  useEffect(() => {
    const fetchAllQuizzes = async () => {
      try {
        const res = await fetch('/api/quizzes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setAllQuizzes(Array.isArray(data) ? data : data.quizzes || []);
      } catch (err) {
        setAllQuizzes([]);
      }
    };
    fetchAllQuizzes();
  }, [token]);

  // Fetch selected quiz and its questions
  useEffect(() => {
    if (!selectedQuizId) return;
    const fetchQuizAndQuestions = async () => {
      try {
        const resQuiz = await fetch(`/api/quizzes/${selectedQuizId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const quizData = await resQuiz.json();
        setSelectedQuiz(quizData.quiz || quizData);
        const resQuestions = await fetch(`/api/quizzes/${selectedQuizId}/questions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const questionsData = await resQuestions.json();
        setSelectedQuizQuestions(Array.isArray(questionsData) ? questionsData : questionsData.questions || []);
      } catch (err) {
        setSelectedQuiz(null);
        setSelectedQuizQuestions([]);
      }
    };
    fetchQuizAndQuestions();
  }, [selectedQuizId, token]);

  // Add a new question to the selected quiz
  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setAddForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!addForm.questionText || !addForm.category || !addForm.level || !addForm.questionURL) {
      setAddError('Please fill all fields');
      return;
    }
    setAddLoading(true);
    setAddError('');
    setAddSuccess('');
    try {
      const res = await fetch(`/api/quizzes/${selectedQuizId}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(addForm)
      });
      if (!res.ok) throw new Error('Failed to add question');
      setAddForm({ questionText: '', category: '', level: '', status: 'Not Solve', questionURL: '' });
      setAddSuccess('Question added!');
      // Refresh questions
      const qRes = await fetch(`/api/quizzes/${selectedQuizId}/questions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const qData = await qRes.json();
      setSelectedQuizQuestions(Array.isArray(qData) ? qData : qData.questions || []);
    } catch (err) {
      setAddError('Failed to add question: ' + err.message);
    } finally {
      setAddLoading(false);
      setTimeout(() => setAddSuccess(''), 2000);
    }
  };

  // --- Student Quiz Display State ---
  const [courseQuiz, setCourseQuiz] = useState(null);
  const [courseQuizQuestions, setCourseQuizQuestions] = useState([]);

  // Fetch the quiz for the current course and its questions
  useEffect(() => {
    const fetchCourseQuizAndQuestions = async () => {
      if (!courseId) return;
      try {
        // Fetch all quizzes and find the one for this course
        const res = await fetch('/api/quizzes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const quizzes = Array.isArray(data) ? data : data.quizzes || [];
        const quiz = quizzes.find(q => q.courseId === courseId || q.courseId === (courseId + ''));
        setCourseQuiz(quiz || null);
        if (quiz && (quiz._id || quiz.id)) {
          // Fetch questions for this quiz
          const resQ = await fetch(`/api/quizzes/${quiz._id || quiz.id}/questions`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const qData = await resQ.json();
          setCourseQuizQuestions(Array.isArray(qData) ? qData : qData.questions || []);
        } else {
          setCourseQuizQuestions([]);
        }
      } catch (err) {
        setCourseQuiz(null);
        setCourseQuizQuestions([]);
      }
    };
    fetchCourseQuizAndQuestions();
  }, [courseId, token]);

  // Add local state to track attempted questions
  const [attemptedQuestions, setAttemptedQuestions] = useState({}); // { [questionId]: true }

  const handleSolveClick = (questionId) => {
    setAttemptedQuestions((prev) => ({ ...prev, [questionId]: true }));
  };

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
              <div className="flex flex-wrap items-center ml-2 space-x-4">
                <div className="bg-white rounded-lg px-2 py-2 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm font-medium">{courseData?.rating || '4.5'} Rating</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg px-2 py-2 shadow-sm mt-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium">{studentCount || '0'} Students</span>
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
                            onLoadedMetadata={e => setDuration(e.target.duration)}
                            onTimeUpdate={e => {
                              setCurrentTime(e.target.currentTime);
                              handleVideoProgress(e);
                            }}
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
                          <span>Time: {Math.floor(currentTime)} / {Math.floor(duration)} seconds</span>
                        </div>
                      </div>

                      {currentLesson && (
                        <>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{
                                width: duration > 0
                                  ? `${(currentTime / duration) * 100}%`
                                  : '0%'
                              }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Progress: {currentLesson.content || 0}</span>

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
                        <div className="text-2xl font-bold text-gray-900">
                          {Math.min(apiProgress.completedLessons, apiProgress.totalLessons)}
                        </div>
                        <div className="text-sm text-gray-500">Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-3">
                          <Clock className="w-8 h-8 text-orange-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {Math.max(apiProgress.totalLessons - apiProgress.completedLessons, 0)}
                        </div>
                        <div className="text-sm text-gray-500">In Progress</div>
                      </div>
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
                          <Video className="w-8 h-8 text-gray-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {Math.max(apiProgress.totalLessons - apiProgress.completedLessons, 0)}
                        </div>
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
                            {/* Show actual video duration if available, otherwise fallback */}
                            {typeof duration === 'number' && duration > 0
                              ? `${Math.floor(duration / 60)}m ${Math.round(duration % 60)}s`
                              : (currentLesson?.duration ? `${currentLesson.duration} min` : '0 min')}
                          </span>
                        </div>
                        <p className="text-blue-800">{currentLesson?.title || 'No lesson selected'}</p>
                        <div className="flex items-center mt-2 text-sm text-blue-600">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>
                            Video Duration: {typeof duration === 'number' && duration > 0
                              ? `${Math.floor(duration / 60)}m ${Math.round(duration % 60)}s`
                              : '0 min'}
                          </span>
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
                                  <p className="text-sm text-gray-500">
                                    Duration: {lesson.duration} min
                                    {lesson.videoUrl && (
                                      <>
                                        {/* Hidden video to get duration */}
                                        <video
                                          src={lesson.videoUrl}
                                          style={{ display: 'none' }}
                                          onLoadedMetadata={e => handleLoadedMetadata(lesson._id, e)}
                                        />
                                        {videoDurations[lesson._id] &&
                                          <> | Video: {Math.floor(videoDurations[lesson._id] / 60)}m {Math.round(videoDurations[lesson._id] % 60)}s</>
                                        }
                                      </>
                                    )}
                                  </p>
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
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {Math.min(apiProgress.overallProgress, 100)}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-purple-600 h-3 rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(apiProgress.overallProgress, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Total {Math.min(apiProgress.completedLessons, apiProgress.totalLessons)} Lesson Completed
                </div>
                <div className="text-sm text-gray-500"></div>
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
                    <span className="font-medium">{stats.totalTimeString}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Video className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Total Lessons</span>
                    </div>
                    <span className="font-medium">{apiProgress.totalLessons}</span>
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
              {currentTime > 0 && (
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-yellow-100 rounded-full p-2">
                      <Award className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-yellow-900">Great Progress!</div>
                      <div className="text-sm text-yellow-700">{apiProgress.completedLessons} lessons completed</div>
                    </div>
                  </div>
                  <div className="text-xs text-yellow-600">Keep up the excellent work!</div>
                </div>
              )}
            </div>
          </div>

          {/* --- Student Quiz Display UI --- */}
          {courseQuiz && (
            <div className="max-w-7xl w-full mx-auto my-10 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrabold text-purple-800">Practice Questions</h2>
                <BookOpen className="w-7 h-7 text-purple-400" />
              </div>
              <div className="mb-2 text-xl font-bold text-gray-800">{courseQuiz.title}</div>
              <div className="mb-3 text-base text-gray-700 italic">{courseQuiz.description}</div>
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-semibold text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Level: {courseQuiz.level}
                </span>
                <span className="inline-flex items-center bg-green-100 text-green-700 px-4 py-1 rounded-full font-semibold text-sm">
                  <Award className="w-4 h-4 mr-1" />
                  Total Questions: {courseQuizQuestions.length}
                </span>
              </div>
              <h4 className="font-semibold mb-3 text-lg text-purple-700">Questions</h4>
              <div className="overflow-x-auto rounded-xl border border-purple-200 bg-white/90 shadow">
                <table className="min-w-full text-sm">
                  <thead className="bg-purple-100 text-gray-800">
                    <tr>
                      <th className="p-3 text-left font-semibold">#</th>
                      <th className="p-3 text-left font-semibold">Question</th>
                      <th className="p-3 text-left font-semibold">Category</th>
                      <th className="p-3 text-left font-semibold">Level</th>
                      <th className="p-3 text-left font-semibold">Solve</th>
                      <th className="p-3 text-left font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseQuizQuestions.length > 0 ? courseQuizQuestions.map((item, index) => {
                      const qid = item._id || item.id || index;
                      const isAttempted = attemptedQuestions[qid] || item.status === 'Attempted';
                      return (
                        <tr key={qid} className="hover:bg-purple-50">
                          <td className="p-3 font-semibold">{index + 1}</td>
                          <td className="p-3">
                            <span className="font-medium text-gray-800">{item.questionText}</span>
                            {/* Show options if present */}
                            {item.options && item.options.length > 0 && (
                              <ul className="ml-4 mt-1 text-xs">
                                {item.options.map((opt, i) => (
                                  <li key={i} className={opt === item.correctAnswer ? 'font-bold text-green-600' : ''}>
                                    {opt}
                                  </li>
                                ))}
                              </ul>
                            )}
                            {/* Show correct answer if present */}
                            {item.correctAnswer && (
                              <div className="text-xs text-green-700 mt-1">Correct: {item.correctAnswer}</div>
                            )}
                          </td>
                          <td className="p-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-blue-400 ${getCategoryColor(item.category)}`}>{item.category}</span>
                          </td>
                          <td className="p-3">{item.level}</td>
                          <td className="p-3">
                            <a
                              href={item.questionURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => handleSolveClick(qid)}
                              className={`inline-block px-4 py-2 rounded-lg font-semibold transition-colors duration-150 ${isAttempted ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
                              style={{ pointerEvents: isAttempted ? 'none' : 'auto' }}
                            >
                              Solve
                            </a>
                          </td>
                          <td className="p-3">
                            {isAttempted ? (
                              <span className="text-green-700 font-semibold">Attempted</span>
                            ) : (
                              <span className="text-gray-500">Not Attempted</span>
                            )}
                          </td>
                        </tr>
                      );
                    }) : (
                      <tr>
                        <td colSpan="6" className="text-center text-gray-500 p-4">No questions added yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {!courseQuiz && (
            <div className="my-8 p-4 bg-white rounded-xl shadow text-center text-gray-500">
              No quiz available for this course.
            </div>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
};

export default VideoDashboard;