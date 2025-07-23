import Footer from './Footer';
import React, { useState, useEffect, useContext } from 'react';
import { User, Edit3, Users, DollarSign, BookOpen, Plus, X, Save, TrendingUp, Award, Calendar, Eye, UserMinus, ChevronDown, ChevronUp, Upload, Trash2, FunctionSquare } from 'lucide-react';
import Student from './Seestudent';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../pages/AuthContext';
import axios from 'axios';
import '../assets/style/UserProfile.css'
import '../assets/style/Instructorpage.css'
import Button from './Button';
import ProfileHeader from './ProfileHeader';

export default function InstructorDashboard() {
  const navigate = useNavigate();
  // Context and State
  const { user, token, updateUser } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [createCourses, setCreateCourses] = useState([]);

  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    duration: '',
    topics: '',
    level: '',
    price: '',
    category: '',
    picture: null,
    language: '',
    prerequisites: '',
    skillTags: '',
    whatWillLearn: ''
  });

  const [editingCourse, setEditingCourse] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [deletingCourse, setDeletingCourse] = useState(null);
  const [updatingCourse, setUpdatingCourse] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  // Fetch courses on component mount
  useEffect(() => {
    if (user?.id) {
      fetchCourses();
    }
  }, [user]);

  // API Functions
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/courses/instructor/${user.id || user._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }

      const data = await response.json();
      setCourses(data);
    } catch (err) {
      setError('Failed to load courses: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  const [Video, setVideo] = useState({});

  function AddeVideo(index, type, file) {
    if (type === 'video' && file) {
      setVideo(file);
      console.log(file, index);
    }
  }

  const createCourse = async () => {
    try {
      const formData = new FormData();
      formData.append('title', newCourse.title);
      formData.append('description', newCourse.description);
      formData.append('duration', newCourse.duration);
      formData.append('topics', newCourse.topics);
      formData.append('level', newCourse.level);
      formData.append('price', newCourse.price);
      formData.append('category', newCourse.category);
      formData.append('createdBy', user.id || user._id);
      formData.append('language', newCourse.language);
      formData.append('whatWillLearn', newCourse.whatWillLearn);

      // Convert comma-separated to array for prerequisites and skillTags
      (newCourse.prerequisites || '').split(',').map(s => s.trim()).forEach(val => {
        if (val) formData.append('prerequisites[]', val);
      });
      (newCourse.skillTags || '').split(',').map(s => s.trim()).forEach(val => {
        if (val) formData.append('skillTags[]', val);
      });

      if (newCourse.picture) {
        formData.append('picture', newCourse.picture);
      }

      const response = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create course');
      } else {
        setSuccess('Course created successfully!');
        setTimeout(() => setSuccess(''), 3000);
      }

      const createdCourse = await response.json();
      setCourses([...courses, createdCourse]);
      setNewCourse({
        title: '',
        description: '',
        duration: '',
        topics: '',
        level: '',
        price: '',
        category: '',
        picture: null,
        language: '',
        prerequisites: '',
        skillTags: '',
        whatWillLearn: ''
      });
      setShowAddForm(false);
      setError('');
    } catch (err) {
      setError('Failed to create course: ' + err.message);
    }
  };
  function PostCourse() {
    axios.post(`http://localhost:5000/api/courses`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: formData
    }).then((res) => {
      console.log("Data push done ", res.data)
    }).catch((err) => {
      console.error("Error", err)
    })
  }

  const updateCourse = async (courseId, updatedData) => {
    try {
      setUpdatingCourse(courseId);
      const formData = new FormData();

      // Handle file uploads and data
      Object.keys(updatedData).forEach(key => {
        if (key === 'lessons') {
          formData.append(key, JSON.stringify(updatedData[key]));
        } else if (key === 'picture' && updatedData[key] instanceof File) {
          formData.append(key, updatedData[key]);
        } else if (updatedData[key] !== null && updatedData[key] !== undefined && updatedData[key] !== '') {
          formData.append(key, updatedData[key]);
        }
      });

      const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update course');
      }

      const updatedCourse = await response.json();

      // Update both states to ensure UI consistency
      setCourses(courses.map(course =>
        course.id === courseId ? updatedCourse : course
      ));
      setCreateCourses(createCourses.map(course =>
        course.id === courseId ? updatedCourse : course
      ));

      setEditingCourse(null);
      setEditFormData({});
      setError('');
      setSuccess('Course updated successfully!');
      console.log('Course updated successfully:', courseId);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update course: ' + err.message);
      console.error('Update course error:', err);
    } finally {
      setUpdatingCourse(null);
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      setDeletingCourse(courseId);
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete course');
      }

      // Update both states to ensure UI consistency
      setCourses(courses.filter(course => course.id !== courseId));
      setCreateCourses(createCourses.filter(course => course.id !== courseId));
      setError('');
      setSuccess('Course deleted successfully!');
      console.log('Course deleted successfully:', courseId);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete course: ' + err.message);
      console.error('Delete course error:', err);
    } finally {
      setDeletingCourse(null);
    }
  };

  const updateProfile = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${user.id || user._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      updateUser(updatedUser);
      setProfileEdit(false);
      setError('');
    } catch (err) {
      setError('Failed to update profile: ' + err.message);
    }
  };

  const fetchCreatedCourses = async () => {
    if (!user || !(user.id || user._id) || !token) return;

    try {
      const userId = user.id || user._id;
      console.log('User ID being sent:', userId);
      console.log('User object:', user);
      const res = await fetch(`http://localhost:5000/api/courses/creator/${userId}`);

      if (!res.ok) throw new Error('Failed to fetch created courses');

      const data = await res.json();
      console.log('API Response:', data);

      const normalizedCourses = (data.courses || []).map(course => ({
        ...course,
        id: course._id || course.id,
      }));

      console.log('Normalized courses:', normalizedCourses);
      setCreateCourses(normalizedCourses);
    } catch (err) {
      setCreateCourses([]);
      console.error('Error fetching created courses:', err);
    }
  };

  useEffect(() => {
    fetchCreatedCourses();
  }, [user, token]);

  useEffect(() => {
    const fetchAllQuizzes = async () => {
      try {

        const res = await fetch('http://localhost:5000/api/quizzes', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch quizzes');
        const data = await res.json();
        // Map courseId to quizId and mark quizInfoSaved true for existing quizzes
        const mapping = {};
        const infoSaved = {};
        (data || []).forEach(q => {
          if (q.courseId) {
            mapping[q.courseId] = q._id || q.id;
            infoSaved[q.courseId] = true;
          }
        });
        setQuizIdForCourse(mapping);
        setQuizInfoSaved(infoSaved);
      } catch (err) {

      }
    };
    if (user && token) fetchAllQuizzes();
  }, [user, token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'picture') {
      setNewCourse({ ...newCourse, [name]: files[0] });
    } else {
      setNewCourse({ ...newCourse, [name]: value });
    }
  };

  const handleEditChange = (e, courseId) => {
    const { name, value, files } = e.target;

    if (name === 'picture' && files && files[0]) {
      setEditFormData(prev => ({
        ...prev,
        [courseId]: {
          ...prev[courseId],
          [name]: files[0]
        }
      }));
    } else {
      setEditFormData(prev => ({
        ...prev,
        [courseId]: {
          ...prev[courseId],
          [name]: value
        }
      }));
    }
  };

  const startEditing = (course) => {
    setEditingCourse(course.id);
    setEditFormData(prev => ({
      ...prev,
      [course.id]: {
        title: course.title || '',
        description: course.description || '',
        price: course.price || '',
        level: course.level || '',
        category: course.category || '',
        duration: course.duration || '',
        topics: course.topics || '',
        language: course.language || '',
        prerequisites: course.prerequisites || '',
        skillTags: course.skillTags || '',
        whatWillLearn: course.whatWillLearn || '',
        picture: null
      }
    }));
  };

  const cancelEditing = () => {
    setEditingCourse(null);
    setEditFormData({});
  };

  const handleChangeonNext = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));

    // clear error if the field becomes non-empty
    if (value.trim() !== '') {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleNext = () => {
    const newErrors = {};

    if (!newCourse.title.trim()) newErrors.title = true;
    if (!newCourse.description.trim()) newErrors.description = true;
    if (!newCourse.duration.trim()) newErrors.duration = true;
    if (!newCourse.level.trim()) newErrors.level = true;
    if (!newCourse.price.trim()) newErrors.price = true;
    if (!newCourse.category.trim()) newErrors.category = true;
    if (!newCourse.language.trim()) newErrors.language = true;
    if (!newCourse.whatWillLearn.trim()) newErrors.whatWillLearn = true;
    // add more field validations as needed

    setErrors(newErrors);

    // stop if any error exists
    if (Object.keys(newErrors).length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setError(''); // Remove generic error, rely on per-field errors
      return;
    }

  };

  // Validation function for required fields and lessons
  const requiredFields = [
    'title', 'description', 'duration', 'level',
    'price', 'category', 'language', 'whatWillLearn'
  ];

  const validate = () => {
    const newErrors = {};
    requiredFields.forEach(field => {
      if (!newCourse[field] || !newCourse[field].toString().trim()) {
        newErrors[field] = 'This field is required';
      }
    });
    return newErrors;
  };

  // Handle field blur (touched)
  const handleBlur = (e) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  // Update handleSubmit for robust validation and scroll to top on error
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    // Mark all fields as touched
    const allTouched = {};
    requiredFields.forEach(field => { allTouched[field] = true; });
    setTouched(allTouched);

    const validationErrors = validate();
    setErrors(validationErrors);
    console.log('Validation errors:', validationErrors);
    console.log('newCourse:', newCourse);

    if (Object.keys(validationErrors).length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setError(''); // Remove generic error, rely on per-field errors
      return;
    }

    setError('');
    createCourse();
  };

  const handleProfileSave = () => {
    updateProfile();
  };

  const removeStudent = (courseId, studentId) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        const updatedStudents = course.enrolledStudents?.filter(student => student.id !== studentId) || [];
        return {
          ...course,
          enrolledStudents: updatedStudents,
          students: updatedStudents.length,
          revenue: updatedStudents.length * course.price
        };
      }
      return course;
    }));
  };

  const toggleStudentView = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  const totalStudents = courses.reduce((sum, course) => sum + (course.students || 0), 0);
  const totalRevenue = courses.reduce((sum, course) => sum + (course.revenue || 0), 0);
  const avgRating = courses.length > 0 ? (courses.reduce((sum, course) => sum + (course.rating || 0), 0) / courses.length).toFixed(1) : 0;

  const [courseId, setCourseId] = useState(null);
  const [QuizInfo, setQuizInfo] = useState({
    courseId: '',
    title: '',
    level: '',
    description: '',
  });

  const [submittedCourses, setSubmittedCourses] = useState([]); // Track which courses have a submitted quiz
  const [QuizInfoData, setQuizInfoData] = useState([]); // Store quiz details

  // For debugging quiz data
  useEffect(() => {
    console.log("Updated QuizInfoData:", QuizInfoData);
  }, [QuizInfoData]);

  // Open form popup
  const OpenPopup = (course) => {
    setCourseId(course.id);
    setQuizInfo((prev) => ({ ...prev, courseId: course.id }));
  };

  // Close form popup
  const ClosePopup = () => {
    setCourseId(null);
    setQuizInfo({ courseId: '', title: '', level: '', description: '' });
  };

  // Handle form input
  const OpenQuizPopup = (e) => {
    setQuizInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit quiz form
  const SubmitQuiz = () => {
    if (QuizInfo.title && QuizInfo.level && QuizInfo.description && courseId) {
      // Prevent duplicate submission for same course
      if (submittedCourses.includes(courseId)) {
        window.alert('Quiz already submitted for this course.');
        return;
      }

      setQuizInfoData((prev) => [...prev, QuizInfo]);
      setSubmittedCourses((prev) => [...prev, courseId]);
      ClosePopup();
    } else {
      window.alert('Please fill all fields');
    }
  };

  // Navigate to quiz page
  const Go_Quiz = (id) => {
    navigate(`/quiz/${id}`);
  };

  // --- QUIZ & QUESTION STATE ---
  const [quizIdForCourse, setQuizIdForCourse] = useState({}); // { [courseId]: quizId }
  const [showQuestionForm, setShowQuestionForm] = useState(null); // courseId for which to show question form
  const [questionForm, setQuestionForm] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
  });
  const [questions, setQuestions] = useState({}); // { [quizId]: [questions] }
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizError, setQuizError] = useState('');
  const [quizSuccess, setQuizSuccess] = useState('');

  // Add a state to track if quiz info has been saved for a course
  const [quizInfoSaved, setQuizInfoSaved] = useState({}); // { [courseId]: true/false }

  const createQuizForCourse = async (course) => {
    setQuizLoading(true);
    setQuizError('');
    try {
      const res = await fetch('http://localhost:5000/api/quizzes', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: course.id,
          title: course.title + ' Quiz',
          level: course.level,
          description: course.description,
        }),
      });
      if (!res.ok) throw new Error('Failed to create quiz');
      const quiz = await res.json();
      setQuizIdForCourse((prev) => ({ ...prev, [course.id]: quiz._id || quiz.id }));
      setShowQuestionForm(course.id);
      setQuizSuccess('Quiz created! Now add quiz info.');
      setQuizInfoSaved(prev => ({ ...prev, [course.id]: false }));
      setTimeout(() => setQuizSuccess(''), 2000);
    } catch (err) {
      setQuizError('Quiz creation failed: ' + err.message);
    } finally {
      setQuizLoading(false);
    }
  };

  const addQuestionToQuiz = async (courseId) => {
    const quizId = quizIdForCourse[courseId];
    if (!quizId) return;
    setQuizLoading(true);
    setQuizError('');
    try {
      const res = await fetch(`http://localhost:5000/api/quizzes/${quizId}/questions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: questionForm.question,
          options: questionForm.options,
          correctAnswer: questionForm.correctAnswer,
        }),
      });
      if (!res.ok) throw new Error('Failed to add question');
      const q = await res.json();
      setQuestions((prev) => ({
        ...prev,
        [quizId]: [...(prev[quizId] || []), q],
      }));
      setQuestionForm({ question: '', options: ['', '', '', ''], correctAnswer: 0 });
      setQuizSuccess('Question added!');
      setTimeout(() => setQuizSuccess(''), 1500);
    } catch (err) {
      setQuizError('Add question failed: ' + err.message);
    } finally {
      setQuizLoading(false);
    }
  };

  const handleQuestionInput = (e, idx = null) => {
    const { name, value } = e.target;
    if (name === 'question') {
      setQuestionForm((prev) => ({ ...prev, question: value }));
    } else if (name.startsWith('option')) {
      const i = parseInt(name.replace('option', ''));
      setQuestionForm((prev) => {
        const opts = [...prev.options];
        opts[i] = value;
        return { ...prev, options: opts };
      });
    } else if (name === 'correctAnswer') {
      setQuestionForm((prev) => ({ ...prev, correctAnswer: parseInt(value) }));
    }
  };

  const closeQuestionForm = () => {
    setShowQuestionForm(null);
    setQuestionForm({ question: '', options: ['', '', '', ''], correctAnswer: 0 });
  };

  // Add state for editing quiz info
  const [quizEditForm, setQuizEditForm] = useState({ title: '', description: '', level: '' });
  const [quizEditLoading, setQuizEditLoading] = useState(false);
  const [quizEditSuccess, setQuizEditSuccess] = useState('');
  const [quizEditError, setQuizEditError] = useState('');

  // Fetch quiz info when showQuestionForm is set
  useEffect(() => {
    const fetchQuizInfo = async () => {
      const quizId = quizIdForCourse[showQuestionForm];
      if (!quizId) return;
      try {
        const res = await fetch(`http://localhost:5000/api/quizzes/${quizId}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch quiz info');
        const data = await res.json();
        setQuizEditForm({
          title: data.title || '',
          description: data.description || '',
          level: data.level || '',
        });
      } catch (err) {
        setQuizEditForm({ title: '', description: '', level: '' });
      }
    };
    if (showQuestionForm && quizIdForCourse[showQuestionForm]) {
      fetchQuizInfo();
    }
  }, [showQuestionForm, quizIdForCourse, token]);

  const handleQuizEditChange = (e) => {
    const { name, value } = e.target;
    setQuizEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuizEditSave = async () => {
    const quizId = quizIdForCourse[showQuestionForm];
    if (!quizId) return;
    setQuizEditLoading(true);
    setQuizEditError('');
    setQuizEditSuccess('');
    try {
      const res = await fetch(`http://localhost:5000/api/quizzes/${quizId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(quizEditForm),
      });
      if (!res.ok) throw new Error('Failed to update quiz info');
      setQuizEditSuccess('Quiz info updated!');
      setQuizInfoSaved(prev => ({ ...prev, [showQuestionForm]: true }));
      setTimeout(() => setQuizEditSuccess(''), 2000);
      // Optionally close the form after save
      setTimeout(() => setShowQuestionForm(null), 1200);
    } catch (err) {
      setQuizEditError('Failed to update quiz info: ' + err.message);
    } finally {
      setQuizEditLoading(false);
    }
  };

  // Cross icon handler
  const closeQuizPopup = () => {
    setShowQuestionForm(null);
    setQuizEditForm({ title: '', description: '', level: '' });
    setQuizEditError('');
    setQuizEditSuccess('');
  };

  // Add effect to fetch questions for the quiz when showQuestionForm is set
  useEffect(() => {
    const fetchQuizQuestions = async () => {
      const quizId = quizIdForCourse[showQuestionForm];
      if (!quizId) return;
      try {
        const res = await fetch(`http://localhost:5000/api/quizzes/${quizId}/questions`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch quiz questions');
        const data = await res.json();
        setQuestions(prev => ({ ...prev, [quizId]: data.questions || data }));
      } catch (err) {
        setQuestions(prev => ({ ...prev, [quizId]: [] }));
      }
    };
    if (showQuestionForm && quizIdForCourse[showQuestionForm]) {
      fetchQuizQuestions();
    }
  }, [showQuestionForm, quizIdForCourse, token]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
        <div className="max-w-7xl mx-auto">

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6">
              {error}
              <button
                onClick={() => setError('')}
                className="float-right font-bold"
              >
                ×
              </button>
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-6">
              {success}
              <button
                onClick={() => setSuccess('')}
                className="float-right font-bold"
              >
                ×
              </button>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Students</p>
                  <p className="text-3xl font-bold">{totalStudents}</p>
                </div>
                <Users className="w-8 h-8 text-blue-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Total Revenue</p>
                  <p className="text-3xl font-bold">₹{totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Active Courses</p>
                  <p className="text-3xl font-bold">{courses.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-purple-200" />
              </div>
            </div>
            <div className="bg-orange-400 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Avg Rating</p>
                  <p className="text-3xl font-bold">{avgRating}</p>
                </div>
                <Award className="w-8 h-8 text-orange-200" />
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <ProfileHeader
            userInfo={profile}
            isEditing={profileEdit}
            profilePic={null}
            loading={false}
            handleEditToggle={() => setProfileEdit(true)}
            handleSave={updateProfile}
            handleImageUpload={() => { }}
            setIsEditing={setProfileEdit}
            setUserInfo={setProfile}
          />

          {/* Course Header */}
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Your Courses</h3>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Course</span>
            </button>
          </div>

          {/* Add Course Form */}
          {showAddForm && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-xl font-bold text-gray-800 flex items-center">
                  <BookOpen className="w-6 h-6 mr-2" />
                  Add New Course
                </h4>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div>
                    {touched.title && errors.title && (
                      <p className="text-red-500 text-sm mb-1">{errors.title}</p>
                    )}
                    <input
                      type="text"
                      name="title"
                      placeholder="Course Title"
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      value={newCourse.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {/* Duration */}
                  <div>
                    {touched.duration && errors.duration && (
                      <p className="text-red-500 text-sm mb-1">{errors.duration}</p>
                    )}
                    <input
                      type="text"
                      name="duration"
                      placeholder="Duration (e.g., 8 weeks)"
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      value={newCourse.duration}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {/* Price */}
                  <div>
                    {touched.price && errors.price && (
                      <p className="text-red-500 text-sm mb-1">{errors.price}</p>
                    )}
                    <input
                      type="number"
                      name="price"
                      placeholder="Course Price (₹)"
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      value={newCourse.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {/* Level */}
                  <div>
                    {touched.level && errors.level && (
                      <p className="text-red-500 text-sm mb-1">{errors.level}</p>
                    )}
                    <select
                      name="level"
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      value={newCourse.level}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="" disabled>Level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  {/* Category */}
                  <div>
                    {touched.category && errors.category && (
                      <p className="text-red-500 text-sm mb-1">{errors.category}</p>
                    )}
                    <select
                      name="category"
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      value={newCourse.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="" disabled>Category</option>
                      <option value="Educate">Educate</option>
                      <option value="Design">Design</option>
                      <option value="Development">Development</option>
                      <option value="AI">AI</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Machine Learning">Machine Learning</option>
                      <option value="Iot">Iot</option>
                      <option value="Health">Health</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Finance">Finance</option>
                    </select>
                  </div>
                  {/* Picture */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      name="picture"
                      accept="image/*"
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      onBlur={handleBlur}
                    />
                    <Upload className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                {/* Description */}
                <div>
                  {touched.description && errors.description && (
                    <p className="text-red-500 text-sm mb-1">{errors.description}</p>
                  )}
                  <textarea
                    name="description"
                    placeholder="Course Description"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    rows="3"
                    value={newCourse.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Language */}
                  <div>
                    {touched.language && errors.language && (
                      <p className="text-red-500 text-sm mb-1">{errors.language}</p>
                    )}
                    <select
                      name="language"
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      value={newCourse.language}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="" disabled>Language</option>
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Marathi">Marathi</option>
                      <option value="Tamil">Tamil</option>
                      <option value="Telegu">Telegu</option>
                      <option value="Gujurati">Gujurati</option>
                      <option value="Bengali">Bengali</option>
                    </select>
                  </div>
                </div>
                {/* Prerequisites */}
                <div>
                  <textarea
                    name="prerequisites"
                    placeholder="Requirements / Prerequisites (comma separated)"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    rows="2"
                    value={newCourse.prerequisites}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {/* Skill Tags */}
                <div>
                  <textarea
                    name="skillTags"
                    placeholder="Skills (comma separated, e.g. HTML, CSS, React)"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    rows="2"
                    value={newCourse.skillTags}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {/* What Will Learn */}
                <div>
                  {touched.whatWillLearn && errors.whatWillLearn && (
                    <p className="text-red-500 text-sm mb-1">{errors.whatWillLearn}</p>
                  )}
                  <textarea
                    name="whatWillLearn"
                    placeholder="What will students learn? (summary, comma separated)"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    rows="2"
                    value={newCourse.whatWillLearn}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <Button
                  label=" Create Course"
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-xl transition-all duration-200 font-medium shadow-lg"
                />
              </form>
            </div>
          )}

          {/* Courses Grid */}
          {createCourses && createCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
              {createCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 group flex flex-col h-full"
                >
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <span className={`text-sm px-3 py-1 rounded-full font-medium ${course.level === 'Beginner' ? 'bg-green-100 text-green-700' : course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {course.level}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${course.title}"? This action cannot be undone.`)) {
                              deleteCourse(course.id);
                            }
                          }}
                          disabled={deletingCourse === course.id}
                          className={`transition-colors ${deletingCourse === course.id
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-red-500 hover:text-red-700'
                            }`}
                          title={deletingCourse === course.id ? "Deleting..." : "Delete Course"}
                        >
                          {deletingCourse === course.id ? (
                            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {editingCourse === course.id ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center mb-4">
                          <h5 className="text-lg font-semibold text-gray-800">Edit Course</h5>
                          <button
                            onClick={cancelEditing}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                              type="text"
                              name="title"
                              value={editFormData[course.id]?.title || ''}
                              onChange={(e) => handleEditChange(e, course.id)}
                              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              placeholder="Course Title"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                            <input
                              type="number"
                              name="price"
                              value={editFormData[course.id]?.price || ''}
                              onChange={(e) => handleEditChange(e, course.id)}
                              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              placeholder="Course Price"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                            <select
                              name="level"
                              value={editFormData[course.id]?.level || ''}
                              onChange={(e) => handleEditChange(e, course.id)}
                              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                              <option value="">Select Level</option>
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                              name="category"
                              value={editFormData[course.id]?.category || ''}
                              onChange={(e) => handleEditChange(e, course.id)}
                              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                              <option value="">Select Category</option>
                              <option value="Educate">Educate</option>
                              <option value="Design">Design</option>
                              <option value="Development">Development</option>
                              <option value="AI">AI</option>
                              <option value="Marketing">Marketing</option>
                              <option value="Machine Learning">Machine Learning</option>
                              <option value="Iot">Iot</option>
                              <option value="Health">Health</option>
                              <option value="Data Science">Data Science</option>
                              <option value="Finance">Finance</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                            <input
                              type="text"
                              name="duration"
                              value={editFormData[course.id]?.duration || ''}
                              onChange={(e) => handleEditChange(e, course.id)}
                              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              placeholder="e.g., 8 weeks"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                            <select
                              name="language"
                              value={editFormData[course.id]?.language || ''}
                              onChange={(e) => handleEditChange(e, course.id)}
                              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                              <option value="">Select Language</option>
                              <option value="English">English</option>
                              <option value="Hindi">Hindi</option>
                              <option value="Marathi">Marathi</option>
                              <option value="Tamil">Tamil</option>
                              <option value="Telegu">Telegu</option>
                              <option value="Gujurati">Gujurati</option>
                              <option value="Bengali">Bengali</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea
                            name="description"
                            value={editFormData[course.id]?.description || ''}
                            onChange={(e) => handleEditChange(e, course.id)}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            rows="3"
                            placeholder="Course Description"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Topics</label>
                          <input
                            type="text"
                            name="topics"
                            value={editFormData[course.id]?.topics || ''}
                            onChange={(e) => handleEditChange(e, course.id)}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="Course Topics"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Prerequisites</label>
                          <textarea
                            name="prerequisites"
                            value={editFormData[course.id]?.prerequisites || ''}
                            onChange={(e) => handleEditChange(e, course.id)}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            rows="2"
                            placeholder="Requirements / Prerequisites (comma separated)"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                          <textarea
                            name="skillTags"
                            value={editFormData[course.id]?.skillTags || ''}
                            onChange={(e) => handleEditChange(e, course.id)}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            rows="2"
                            placeholder="Skills covered (comma separated)"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">What Will Learn</label>
                          <textarea
                            name="whatWillLearn"
                            value={editFormData[course.id]?.whatWillLearn || ''}
                            onChange={(e) => handleEditChange(e, course.id)}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            rows="2"
                            placeholder="Learning outcomes (comma separated)"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Course Image</label>
                          <input
                            type="file"
                            name="picture"
                            accept="image/*"
                            onChange={(e) => handleEditChange(e, course.id)}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>

                        <div className="flex space-x-3 pt-4">
                          <button
                            onClick={() => updateCourse(course.id, editFormData[course.id])}
                            disabled={updatingCourse === course.id}
                            className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {updatingCourse === course.id ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Updating...</span>
                              </>
                            ) : (
                              <>
                                <Save className="w-4 h-4" />
                                <span>Update Course</span>
                              </>
                            )}
                          </button>
                          <button
                            onClick={cancelEditing}
                            disabled={updatingCourse === course.id}
                            className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <X className="w-4 h-4" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>
                    ) : courseId === course.id ? (
                      <>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center mb-4">
                            <h5 className="text-lg font-semibold text-gray-800">Initialize Quiz</h5>
                            <button
                              onClick={() => ClosePopup()}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                              <input
                                type="text"
                                name="title"
                                value={QuizInfo.title}
                                onChange={(e) => OpenQuizPopup(e)}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Course Title"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                              <select
                                name="level"
                                value={QuizInfo.level}
                                onChange={(e) => OpenQuizPopup(e)}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              >
                                <option value="">Select Level</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                              </select>
                            </div>

                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                              name="description"
                              value={QuizInfo.description}
                              onChange={(e) => OpenQuizPopup(e)}
                              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              rows="3"
                              placeholder="Course Description"
                            />
                          </div>

                          <div className="flex space-x-3 pt-4">
                            <button
                              onClick={SubmitQuiz}
                              className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <span>Submit</span>
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                          {course.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                        <p className="text-sm text-gray-600 mb-4">
                          <span className="font-medium">Topics:</span> {course.topics}
                        </p>

                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between items-center">
                            <span className="flex items-center space-x-2 text-sm text-gray-600">
                              <Users className="w-4 h-4" />
                              <span>{course.students || 0} students</span>
                            </span>
                            <span className="flex items-center space-x-2 text-sm font-medium text-green-600">
                              <span>₹{course.price}</span>
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Course Price: ₹{course.price}</span>

                            {course.rating > 0 && (
                              <span className="flex items-center space-x-1 text-sm text-yellow-600">
                                <Award className="w-4 h-4" />
                                <span>{course.rating}/5</span>
                              </span>
                            )}
                          </div>

                          {course.completion > 0 && (
                            <div>
                              <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Avg Completion</span>
                                <span>{course.completion}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${course.completion}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="mt-6 flex flex-col space-y-2">
                          <button
                            onClick={() => startEditing(course)}
                            className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                          >
                            <Edit3 className="w-4 h-4" />
                            <span>Edit Course</span>
                          </button>
                          {quizIdForCourse[course.id] && quizInfoSaved[course.id] ? (
                            <button
                              onClick={() => navigate(`/quiz/${quizIdForCourse[course.id]}`)}
                              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                            >
                              <span>Go to Quiz</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => createQuizForCourse(course)}
                              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                              disabled={quizLoading}
                            >
                              <span>{quizLoading ? 'Creating Quiz...' : 'Initialize Quiz'}</span>
                            </button>
                          )}
                          <button
                            onClick={() => toggleStudentView(course.id)}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View Students</span>
                            {expandedCourse === course.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => navigate(`/add-lesson/${course.id}`, {
                              state: { courseId: course.id, courseTitle: course.title }
                            })}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add Lesson</span>
                          </button>
                        </div>
                        {course.lessons && course.lessons.length > 0 && (
                          <div className="mt-4 border-t pt-4">
                            <h5 className="font-medium text-gray-800 mb-3">Course Lessons</h5>
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                              {course.lessons.map((lesson, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg p-3">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h6 className="font-medium text-sm text-gray-800">
                                        Lesson {index + 1}: {lesson.title}
                                      </h6>
                                      <p className="text-xs text-gray-600 mt-1">
                                        {lesson.content}
                                      </p>
                                    </div>
                                    {lesson.duration && (
                                      <span className="text-xs text-gray-500 ml-2">
                                        {lesson.duration}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No courses created yet.</p>
          )}

          {/* Empty State */}
          {courses.length === 0 && !loading && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-500 mb-2">No courses yet</h3>
              <p className="text-gray-400 mb-6">Create your first course to get started</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl transition-all duration-200"
              >
                Create Your First Course
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
