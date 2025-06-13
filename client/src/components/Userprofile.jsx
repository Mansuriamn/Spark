import React, { useState, useContext, useEffect } from 'react';
import { Edit3, Mail, User, BookOpen, Clock, Users, Camera } from 'lucide-react';
import Footer from './Footer';
import { AuthContext } from '../pages/AuthContext'; 

const UserProfile = () => {
  const { user, login } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    if (user) {
      setUserInfo(user);
    }
  }, [user]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSave = () => {
    setIsEditing(false);
    login(userInfo, localStorage.getItem('authToken'));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const enrolledCourses = [
    {
      id: 1,
      title: 'English punctuation made easy',
      description: 'Punctuation — learn the basics without the pain.',
      progress: 75,
      level: 'Advanced',
      participants: 4,
      instructor: 'Cody Fisher',
      duration: '12 weeks',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    {
      id: 2,
      title: 'Technical Spanish for Beginners',
      description: 'Master technical Spanish vocabulary.',
      progress: 45,
      level: 'Beginner',
      participants: 8,
      instructor: 'Maria Rodriguez',
      duration: '8 weeks',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600'
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
            <p className="text-gray-600">Manage your account information and enrolled courses</p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-6">
                {/* Profile Picture */}
                <div className="relative group">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                        {userInfo?.name?.[0] || 'U'}
                      </div>
                    )}
                  </div>

                  {/* Upload Overlay */}
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

                  {/* Online Status */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                </div>

                {/* User Info */}
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                        className="text-2xl font-bold bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <input
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        className="text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                          {userInfo.role}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Edit Button */}
              <div className="flex space-x-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                    >
                      Save
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

          {/* Enrolled Courses */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <BookOpen className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">Courses you have enrolled in</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className={`${course.color} p-6 text-white`}>
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                        {course.level}
                      </span>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{course.progress}%</div>
                        <div className="text-sm opacity-90">Complete</div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <p className="text-white/90 text-sm leading-relaxed">{course.description}</p>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{course.participants} participants</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Instructor: <span className="font-medium text-gray-900">{course.instructor}</span>
                      </div>
                      <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                        Continue Learning
                      </button>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm text-gray-600">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
