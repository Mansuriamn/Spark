import Footer from './Footer';
import React, { useState, useEffect, useContext } from 'react';
import { User, Edit3, Users, DollarSign, BookOpen, Plus, X, Save, TrendingUp, Award, Calendar, Eye, UserMinus, ChevronDown, ChevronUp, Upload, Trash2, FunctionSquare } from 'lucide-react';
import Student from './Seestudent';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../pages/AuthContext';
import axios from 'axios';
import '../assets/style/UserProfile.css'
import '../assets/style/Instructorpage.css'

export default function InstructorDashboard() {
  const navigate = useNavigate();
  const { user, token, updateUser } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    duration: '',
    topics: '',
    level: 'Beginner',
    price: '',
    category: '',
    picture: null,
    lessons: [{ title: '', content: '', duration: '' }]
  });

  const [editingCourse, setEditingCourse] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
  });
  const [Video, setVideo] = useState({});

  function AddeVideo(index, type, file) {
    if (type === 'video') {
      setVideo(file);
      console.log(file,index);
    }
  }

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
      const response = await fetch(`http://localhost:5000/api/courses/instructor/${user.id}`, {
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

  const createCourse = async () => {
    try {

      const lessonIds = [];


      for (const lesson of newCourse.lessons) {
        const res = await fetch('http://localhost:5000/api/lessons', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(lesson),
        });

        if (!res.ok) throw new Error('Lesson creation failed');

        const data = await res.json();
        lessonIds.push(data._id);
      }


      const formData = new FormData();
      formData.append('title', newCourse.title);
      formData.append('description', newCourse.description);
      formData.append('duration', newCourse.duration);
      formData.append('topics', newCourse.topics);
      formData.append('level', newCourse.level);
      formData.append('price', newCourse.price);
      formData.append('category', newCourse.category);
      formData.append('createdBy', user.id);
      lessonIds.forEach(id => {
        formData.append('lessons[]', id);
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
        window.alert("Course create successfully");

      }

      const createdCourse = await response.json();
      setCourses([...courses, createdCourse]);
      setNewCourse({
        title: '',
        description: '',
        duration: '',
        topics: '',
        level: 'Beginner',
        price: '',
        category: '',
        picture: null,
        lessons: [{ title: '', content: '', duration: '' }],
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
      const formData = new FormData();
      Object.keys(updatedData).forEach(key => {
        if (key === 'lessons') {
          formData.append(key, JSON.stringify(updatedData[key]));
        } else if (updatedData[key] !== null && updatedData[key] !== undefined) {
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
      setCourses(courses.map(course =>
        course.id === courseId ? updatedCourse : course
      ));
      setEditingCourse(null);
      setError('');
    } catch (err) {
      setError('Failed to update course: ' + err.message);
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete course');
      }

      setCourses(courses.filter(course => course.id !== courseId));
      setError('');
    } catch (err) {
      setError('Failed to delete course: ' + err.message);
    }
  };

  const updateProfile = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/profile`, {
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
      updateUser(updatedUser); // Updated user in AuthContext
      setProfileEdit(false);
      setError('');
    } catch (err) {
      setError('Failed to update profile: ' + err.message);
    }
  };

  // Lesson management functions
  const addLesson = () => {
    if (newCourse.lessons.length < 5) {
      setNewCourse({
        ...newCourse,
        lessons: [...newCourse.lessons, { title: '', content: '', duration: '' }]
      });
    }
  };

  const removeLesson = (index) => {
    if (newCourse.lessons.length > 1) {
      const updatedLessons = newCourse.lessons.filter((_, i) => i !== index);
      setNewCourse({ ...newCourse, lessons: updatedLessons });
    }
  };

  const updateLesson = (index, field, value) => {
    const updatedLessons = newCourse.lessons.map((lesson, i) =>
      i === index ? { ...lesson, [field]: value } : lesson
    );
    setNewCourse({ ...newCourse, lessons: updatedLessons });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'picture') {
      setNewCourse({ ...newCourse, [name]: files[0] });
    } else {
      setNewCourse({ ...newCourse, [name]: value });
    }
  };

  const handleEditChange = (e, courseId) => {
    const { name, value } = e.target;
    setCourses(courses.map(course =>
      course.id === courseId
        ? { ...course, [name]: value }
        : course
    ));
  };

  const handleSubmit = () => {

    if (newCourse.title && newCourse.description && newCourse.duration && newCourse.topics && newCourse.price) {
      // Validate lessons
      const validLessons = newCourse.lessons.filter(lesson =>
        lesson.title.trim() && lesson.content.trim()
      );

      if (validLessons.length === 0) {
        setError('Please add at least one valid lesson');
        return;
      }

      createCourse();

    } else {
      setError('Please fill in all required fields');
    }
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

  /*if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }*/

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
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="flex items-center space-x-6 mb-6 lg:mb-0">
                <div className="w-20 h-20 bg-purple-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg">
                  <User />
                </div>
                <div className="profile-details" id="profile-details">
                  {profileEdit ? (
                    <div className="edit-form">
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        id="edit-name"
                        className="edit-input name-input"
                        placeholder="Full Name"
                      />
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        id="edit-email"
                        className="edit-input email-input"
                        placeholder="Email Address"
                      />

                    </div>
                  ) : (
                    <>
                      <h2 className="text-3xl font-bold text-gray-800">{profile.name}</h2>
                      <p className="text-gray-600">{profile.email}</p>
                      <span className="inline-block text-sm bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full mt-2 font-medium">
                        Senior Instructor
                      </span>
                    </>
                  )}
                </div>
              </div>
              {/* <div className="flex space-x-3">
              {profileEdit ? (
                <>
                  <button
                    onClick={handleProfileSave}
                    className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => setProfileEdit(false)}
                    className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition-all duration-200 flex items-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setProfileEdit(true)}
                  className="bg-purple-500 text-white px-6 py-3 rounded-xl hover:bg-purple-600 transition-all duration-200 flex items-center space-x-2 shadow-lg"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div> */}
              <div className="profile-actions" id="profile-actions">
                {profileEdit ? (
                  <>
                    <button
                      onClick={() => setProfileEdit(false)}
                      className="btn cancel-btn"
                      id="cancel-edit"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleProfileSave}
                      className="btn save-btn"
                      id="save-profile"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setProfileEdit(true)}
                    className="btn edit-btn"
                    id="edit-toggle"
                  >
                    <Edit3 className="icon" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>
          </div>
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

              <div className="space-y-6">
                {/* Basic Course Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="title"
                    placeholder="Course Title"
                    className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    value={newCourse.title}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="duration"
                    placeholder="Duration (e.g., 8 weeks)"
                    className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    value={newCourse.duration}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Course Price (₹)"
                    className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    value={newCourse.price}
                    onChange={handleChange}
                  />
                  <select
                    name="level"
                    className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    value={newCourse.level}
                    onChange={handleChange}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                  <input
                    type="text"
                    name="category"
                    placeholder="Category ID"
                    className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    value={newCourse.category}
                    onChange={handleChange}
                  />
                 <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      name="picture"
                      accept="image/*"
                      onChange={handleChange}
                      className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all flex-1"
                    />
                    <Upload className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <textarea
                  name="description"
                  placeholder="Course Description"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  rows="3"
                  value={newCourse.description}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="topics"
                  placeholder="Topics (comma separated)"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={newCourse.topics}
                  onChange={handleChange}
                />

                {/* Lessons Section */}
                <div className="border-t pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="text-lg font-semibold text-gray-800">Course Lessons</h5>
                    <button
                      type="button"
                      onClick={addLesson}
                      disabled={newCourse.lessons.length >= 5}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Lesson ({newCourse.lessons.length}/5)</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {newCourse.lessons.map((lesson, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-xl border">
                        <div className="flex justify-between items-center mb-3">
                          <h6 className="font-medium text-gray-700">Lesson {index + 1}</h6>
                          {newCourse.lessons.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeLesson(index)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lesson_container">
                          <input
                            type="text"
                            placeholder="Lesson Title"
                            className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            value={lesson.title}
                            onChange={(e) => updateLesson(index, 'title', e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Content/Description"
                            className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            value={lesson.content}
                            onChange={(e) => updateLesson(index, 'content', e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Duration (e.g., 30 mins)"
                            className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            value={lesson.duration}
                            onChange={(e) => updateLesson(index, 'duration', e.target.value)}
                          />

                          <div className="flex items-center space-x-2">
                            <input
                              type="file"
                              name="video"
                              accept="video/*"
                              placeholder='Upload Video'
                              className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all flex-1"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  AddeVideo(index, 'video', e.target.files[0]);
                                }
                              }}
                            />
                           <Upload className="w-5 h-5  text-gray-400" />
                          </div>
                          {/* <Upload className="w-5 h-5  text-gray-400" /> */}


                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-xl transition-all duration-200 font-medium shadow-lg"
                >
                  Create Course
                </button>
              </div>
            </div>
          )}

          {/* Courses Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-sm px-3 py-1 rounded-full font-medium ${course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                      course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                    }`}>
                    {course.level}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <button
                      onClick={() => deleteCourse(course.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Delete Course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {editingCourse === course.id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="title"
                      value={course.title}
                      onChange={(e) => handleEditChange(e, course.id)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      name="topics"
                      value={course.topics}
                      onChange={(e) => handleEditChange(e, course.id)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      name="price"
                      value={course.price}
                      onChange={(e) => handleEditChange(e, course.id)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateCourse(course.id, course)}
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center justify-center space-x-1"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={() => setEditingCourse(null)}
                        className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-all duration-200 flex items-center justify-center space-x-1"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                      {course.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {course.description}
                    </p>
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
                          <span>₹{(course.revenue || 0).toLocaleString()}</span>
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

                      {/* Lessons Count */}
                      {course.lessons && course.lessons.length > 0 && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <BookOpen className="w-4 h-4" />
                          <span>{course.lessons.length} lessons</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => setEditingCourse(course.id)}
                        className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Edit Course</span>
                      </button>

                      <button
                        onClick={() => toggleStudentView(course.id)}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Students</span>
                        {expandedCourse === course.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Student List */}
                    {expandedCourse === course.id && (
                      <div className="mt-4 space-y-3 border-t pt-4">
                        <h5 className="font-medium text-gray-800 mb-3">Enrolled Students ({(course.enrolledStudents || []).length})</h5>
                        {(!course.enrolledStudents || course.enrolledStudents.length === 0) ? (
                          <p className="text-gray-500 text-sm">No students enrolled yet.</p>
                        ) : (
                          <div className="max-h-60 overflow-y-auto space-y-2">
                            {course.enrolledStudents.map((student) => (
                              <div key={student.id} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                      <User className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    <div>
                                      <span>
                                        <span
                                          className="font-medium text-blue-600 cursor-pointer hover:underline"
                                          onClick={() => navigate('/student', {
                                            state: { courseId: course.id }
                                          })}
                                        >
                                          {student.name || "Unnamed Student"}
                                        </span>
                                        {student.email && <span className="text-gray-500 ml-2">({student.email})</span>}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="mt-2 flex items-center justify-between">
                                    <span className="text-xs text-gray-500">
                                      Enrolled: {student.enrolledDate ? new Date(student.enrolledDate).toLocaleDateString() : 'N/A'}
                                    </span>
                                    <span className="text-xs text-gray-600">
                                      Progress: {student.progress || 0}%
                                    </span>
                                  </div>
                                </div>
                                <button
                                  onClick={() => removeStudent(course.id, student.id)}
                                  className="ml-3 bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition-colors duration-200"
                                  title="Remove student"
                                >
                                  <UserMinus className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Lessons Preview */}
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
            ))}
          </div>

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
