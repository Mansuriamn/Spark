import React, { useState, useContext, useEffect } from 'react';
import { Edit3, Mail, User, BookOpen, Clock, Users, Camera, ShoppingCart, Trash2, Play, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { AuthContext } from '../pages/AuthContext';

const UserProfile = () => {
  const navigate = useNavigate();
  const { 
    user, 
    login, 
    enrolledCourses, 
    updateEnrolledCourses,
    cartCourses = [],
    updateCartCourses,
    token 
  } = useContext(AuthContext);
  
  const { userProfile, updateUserProfile } = useContext(AuthContext);
  const [courseProgress, setCourseProgress] = useState({});

const saveProfile = async (newProfileData) => {
  // maybe call API first, then update
  updateUserProfile(newProfileData);
};

  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    role: '',
    profilePic: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUserInfo({
        name: user.name,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
      });
      setProfilePic(user.profilePic);
    }
  }, [user]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (!userInfo.name.trim() || !userInfo.email.trim()) {
      alert('Name and email are required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email)) {
      alert('Please enter a valid email');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/user/67f0b81f2fc577093ad382b6', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: userInfo.name,
          email: userInfo.email,
          profilePic: profilePic,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const updatedUser = await response.json();
      login(updatedUser, token); 
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Profile update failed:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Please select an image smaller than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => setProfilePic(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleNavigate = (course) => {
  const firstLessonId =
    course.lessons && course.lessons.length > 0
      ? course.lessons[0].id || course.lessons[0]._id
      : null;

  if (firstLessonId) {
    navigate(`/courses/${course.id || course._id}/lesson/${firstLessonId}`);
  } else {
    navigate(`/courses/${course.id || course._id}`);
  }
};


  const handleRemoveFromCart = async (courseId) => {
    try {
      const updatedCart = cartCourses.filter(course => course.id !== courseId);
      updateCartCourses(updatedCart);

      await fetch('http://localhost:5000/api/cart/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          courseId: courseId,
        }),
      });
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  const handleEnrollFromCart = async (course) => {
    try {
      const updatedEnrolled = [...enrolledCourses, course];
      updateEnrolledCourses(updatedEnrolled);

      const updatedCart = cartCourses.filter(c => c.id !== course.id);
      updateCartCourses(updatedCart);

      await fetch('http://localhost:5000/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          courseId: course.id,
          courseTitle: course.title,
        }),
      });

      alert(`Successfully enrolled in ${course.title}!`);
    } catch (error) {
      console.error('Enrollment failed:', error);
      alert('Failed to enroll. Please try again.');
    }
  };

  const calculateProgress = (courseId) => {
    return Math.floor(Math.random() * 100);
  };

  useEffect(() => {
  const fetchAllProgress = async () => {
    if (!user || !token || !enrolledCourses || enrolledCourses.length === 0) return;
    const progressData = {};
    for (const course of enrolledCourses) {
      try {
        const res = await fetch(
          `http://localhost:5000/api/courses/${course.id}/progress?userId=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        // Use progressPercentage from API, fallback to 0
        progressData[course.id] = data.progressPercentage || 0;
      } catch {
        progressData[course.id] = 0;
      }
    }
    setCourseProgress(progressData);
  };
  fetchAllProgress();
}, [user, token, enrolledCourses]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to view your profile.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
            <p className="text-gray-600">Manage your account information and enrolled courses</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-6">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg">
                    {profilePic ? (
                     <User className='bg-purple-600 text-white h-full w-full' />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                        {userInfo?.name?.[0]?.toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer">
                      <label htmlFor="profile-upload" className="cursor-pointer">
                        <Camera className="w-6 h-6 text-white" />
                      </label>
                      <input
                        id="profile-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  )}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                        className="text-2xl font-bold bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Full Name"
                      />
                      <input
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        className="text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Email Address"
                      />
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{userInfo.name}</h2>
                      <div className="flex items-center space-x-4 text-gray-600 mb-2">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>{userInfo.email}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                          {userInfo.role || 'Student'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex space-x-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50"
                    >
                      {loading ? 'Saving...' : 'Save'}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEditToggle}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span className="font-medium">Edit Profile</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {enrolledCourses && enrolledCourses.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <BookOpen className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">My Enrolled Courses</h2>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                  {enrolledCourses.length}
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {enrolledCourses.map((course) => {
                  const progress = courseProgress[course.id] ?? 0;
                  return (
                    <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                      <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white">
                        <div className="flex justify-between items-start mb-4">
                          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                            {course.level || 'Beginner'}
                          </span>
                          <div className="text-right">
                            <div className="text-2xl font-bold">{Math.min(progress, 100)}%</div>
                            <div className="text-sm opacity-90">Complete</div>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                        <p className="text-white/90 text-sm leading-relaxed">
                          {course.subtitle || course.description || 'Continue your learning journey'}
                        </p>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{course.students || 0} students</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{course.duration || '8 weeks'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm text-gray-600">
                            Instructor: <span className="font-medium text-gray-900">{course.instructor || 'Expert Instructor'}</span>
                          </div>
                          <button
                            onClick={() => handleNavigate(course)}
                            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center space-x-1"
                          >
                            <Play className="w-4 h-4" />
                            <span>Continue Learning</span>
                          </button>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">Progress</span>
                            <span className="text-sm text-gray-600">{Math.min(progress, 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {cartCourses && cartCourses.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <ShoppingCart className="w-6 h-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">Cart</h2>
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                  {cartCourses.length}
                </span>
              </div>
              <div className="space-y-4">
                {cartCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start space-x-4">
                        <img
                          src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'}
                          alt={course.title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{course.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {course.subtitle || course.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{course.rating || 4.5}</span>
                            </div>
                            <span>By {course.instructor || 'Expert Instructor'}</span>
                            <span>{course.duration || '8 hours'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            {course.price || '₹2,999'}
                          </div>
                          {course.originalPrice && (
                            <div className="text-sm text-gray-500 line-through">
                              {course.originalPrice}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col space-y-2">
                          <button
                            onClick={() => handleEnrollFromCart(course)}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                          >
                            Enroll Now
                          </button>
                          <button
                            onClick={() => handleRemoveFromCart(course.id)}
                            className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium flex items-center space-x-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(!enrolledCourses || enrolledCourses.length === 0) && (!cartCourses || cartCourses.length === 0) && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses yet</h3>
              <p className="text-gray-600 mb-6">Start your learning journey by exploring our courses!</p>
              <button
                onClick={() => navigate('/courses')}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Browse Courses
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;