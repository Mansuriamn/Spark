import React, { useContext, useEffect, useState } from 'react';
import { User, Save, X, Edit3, DollarSign, BookOpen, TrendingUp, Users } from 'lucide-react';
import '../assets/style/Admin.css';
import { AuthContext } from './AuthContext';

export default function Admin() {
  const { user, login } = useContext(AuthContext);

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    role: '',
    bio: ''
  });

  const [profileImage, setProfileImage] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedInstructor, setExpandedInstructor] = useState(null);
  const [instructorDetails, setInstructorDetails] = useState({});
  const [profileEdit, setProfileEdit] = useState(false);
  
  // Revenue and courses data
  const [revenueData, setRevenueData] = useState({
    totalRevenue: 125000,
    monthlyRevenue: 15000,
    growthRate: 12.5
  });
  
  const [coursesData, setCoursesData] = useState({
    totalCourses: 45,
    activeCourses: 38,
    completedCourses: 7
  });

  const [expandedRevenue, setExpandedRevenue] = useState(false);
  const [expandedCourses, setExpandedCourses] = useState(false);

  const selectedRole = localStorage.getItem("selectedRole");

  // API function to fetch instructors (empty for now)
  const fetchInstructors = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API endpoint
      // const response = await fetch('/api/instructors');
      // const data = await response.json();
      // setInstructors(data);
      
      // Temporary mock data - remove when API is implemented
      setTimeout(() => {
        setInstructors([
          { id: 1, name: 'Dr. Meena Joshi', email: 'meena@edu.com', joinedDate: '2023-12-01', courses: 5, students: 120 },
          { id: 2, name: 'Ravi Verma', email: 'ravi@edu.com', joinedDate: '2023-12-15', courses: 3, students: 85 },
          { id: 3, name: 'Priya Sharma', email: 'priya@edu.com', joinedDate: '2024-01-10', courses: 4, students: 95 },
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching instructors:', error);
      setLoading(false);
    }
  };

  // API function to fetch revenue data (empty for now)
  const fetchRevenueData = async () => {
    try {
      // TODO: Replace with actual API endpoint
      // const response = await fetch('/api/revenue');
      // const data = await response.json();
      // setRevenueData(data);
      
      console.log('Revenue API call - implement when backend is ready');
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    }
  };

  // API function to fetch specific instructor details (empty for now)
  const fetchInstructorDetails = async (instructorId) => {
    try {
      // TODO: Replace with actual API endpoint
      // const response = await fetch(`/api/instructors/${instructorId}/details`);
      // const data = await response.json();
      // setInstructorDetails(prev => ({ ...prev, [instructorId]: data }));
      
      // Mock data for instructor details - remove when API is implemented
      const mockDetails = {
        revenue: {
          total: Math.floor(Math.random() * 50000) + 10000,
          monthly: Math.floor(Math.random() * 8000) + 2000,
          lastMonth: Math.floor(Math.random() * 7000) + 1500,
        },
        courses: [
          { id: 1, name: 'Advanced React Development', students: 45, revenue: 12500, status: 'Active', completion: 75 },
          { id: 2, name: 'JavaScript Fundamentals', students: 67, revenue: 8900, status: 'Active', completion: 90 },
          { id: 3, name: 'Web Design Basics', students: 23, revenue: 4600, status: 'Completed', completion: 100 },
        ],
        performance: {
          rating: (Math.random() * 1.5 + 3.5).toFixed(1),
          totalStudents: Math.floor(Math.random() * 200) + 50,
          completionRate: Math.floor(Math.random() * 30) + 70,
        }
      };
      
      setInstructorDetails(prev => ({ ...prev, [instructorId]: mockDetails }));
    } catch (error) {
      console.error('Error fetching instructor details:', error);
    }
  };

  useEffect(() => {
    if (user) {
      setProfile(user);
      const savedImage = localStorage.getItem('profileImage');
      if (savedImage) setProfileImage(savedImage);
    }
    
    // Fetch data on component mount
    fetchInstructors();
    fetchRevenueData();
    fetchCoursesData();
  }, [user]);

  // API function to fetch courses data (empty for now)
  const fetchCoursesData = async () => {
    try {
      // TODO: Replace with actual API endpoint
      // const response = await fetch('/api/courses');
      // const data = await response.json();
      // setCoursesData(data);
      
      console.log('Courses API call - implement when backend is ready');
    } catch (error) {
      console.error('Error fetching courses data:', error);
    }
  };

  const toggleExpand = (id) => {
    const wasExpanded = expandedInstructor === id;
    setExpandedInstructor(prev => (prev === id ? null : id));
    
    // Fetch instructor details when expanding
    if (!wasExpanded && !instructorDetails[id]) {
      fetchInstructorDetails(id);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSave = () => {
    setProfileEdit(false);
    login({ ...profile, image: profileImage }, localStorage.getItem('authToken'));
    localStorage.setItem('profileImage', profileImage);
  };

  return (
    <div className='Admin_Container'>
      <h2 id='admin_h2'>Admin Dashboard</h2>

      {/* Profile Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex items-center space-x-6 mb-6 lg:mb-0">
            <div className="relative">
              {profileImage ? (
                <img
                  src={profile.profilePic}
                  alt="Profile"
                  className="profile_image"
                />
              ) : (
                <div className="w-20 h-20 bg-purple-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg">
                  <User />
                </div>
              )}
              {profileEdit && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute bottom-0 left-0 opacity-0 w-20 h-20 cursor-pointer"
                  title="Upload new profile image"
                />
              )}
            </div>

            <div>
              {profileEdit ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="input-box"
                  />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="input-box"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-gray-800">{profile.name}</h2>
                  <p className="text-gray-600">{profile.email}</p>
                  
                  <span className="inline-block text-sm bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full mt-2 font-medium">
                    Administrator
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex space-x-3">
            {profileEdit ? (
              <>
                <button onClick={handleProfileSave} className="save_button">
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button onClick={() => setProfileEdit(false)} className="cancel_button">
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
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Revenue Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Revenue Overview</h3>
                <p className="text-2xl font-bold text-green-600">${revenueData.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
            <button
              onClick={() => setExpandedRevenue(!expandedRevenue)}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              {expandedRevenue ? 'Hide Details' : 'Show Details'}
            </button>
          </div>

          {expandedRevenue && (
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Monthly Revenue:</span>
                <span className="font-semibold">${revenueData.monthlyRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Growth Rate:</span>
                <span className="font-semibold text-green-600 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {revenueData.growthRate}%
                </span>
              </div>
              <div className="mt-4">
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: `${revenueData.growthRate}%`}}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Growth progress this quarter</p>
              </div>
            </div>
          )}
        </div>

        {/* Courses Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Courses Overview</h3>
                <p className="text-2xl font-bold text-blue-600">{coursesData.totalCourses}</p>
              </div>
            </div>
            <button
              onClick={() => setExpandedCourses(!expandedCourses)}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              {expandedCourses ? 'Hide Details' : 'Show Details'}
            </button>
          </div>

          {expandedCourses && (
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Courses:</span>
                <span className="font-semibold text-green-600">{coursesData.activeCourses}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Completed Courses:</span>
                <span className="font-semibold text-gray-600">{coursesData.completedCourses}</span>
              </div>
              <div className="mt-4">
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{width: `${(coursesData.activeCourses / coursesData.totalCourses) * 100}%`}}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Active vs Total</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Instructors Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Users className="w-6 h-6 mr-2 text-purple-600" />
            Instructor Management
          </h2>
          <button
            onClick={fetchInstructors}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Refresh Data
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="ml-2 text-gray-600">Loading instructors...</span>
          </div>
        ) : (
          <>
            {instructors.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No instructors found. API integration pending.</p>
              </div>
            ) : (
              instructors.map((instructor) => (
                <div
                  key={instructor.id}
                  className="mb-4 bg-gray-50 shadow-sm rounded-lg p-4 border border-gray-100 last:mb-0"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{instructor.name}</h4>
                      <p className="text-sm text-gray-600">{instructor.email}</p>
                      <div className="flex space-x-4 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {instructor.courses} Courses
                        </span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          {instructor.students} Students
                        </span>
                      </div>
                    </div>
                    <button
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      onClick={() => toggleExpand(instructor.id)}
                    >
                      {expandedInstructor === instructor.id ? 'Hide Details' : 'Show Details'}
                    </button>
                  </div>

                  {expandedInstructor === instructor.id && (
                    <div className="mt-6 space-y-6 border-t pt-6">
                      {instructorDetails[instructor.id] ? (
                        <>
                          {/* Revenue Section */}
                          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                            <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                              <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                              Revenue Performance
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="text-center">
                                <p className="text-2xl font-bold text-green-600">
                                  ${instructorDetails[instructor.id].revenue.total.toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-600">Total Revenue</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xl font-semibold text-green-500">
                                  ${instructorDetails[instructor.id].revenue.monthly.toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-600">This Month</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xl font-semibold text-gray-600">
                                  ${instructorDetails[instructor.id].revenue.lastMonth.toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-600">Last Month</p>
                              </div>
                            </div>
                          </div>

                          {/* Performance Metrics */}
                          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                            <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                              Performance Metrics
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="text-center">
                                <p className="text-2xl font-bold text-blue-600">
                                  {instructorDetails[instructor.id].performance.rating}★
                                </p>
                                <p className="text-sm text-gray-600">Average Rating</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xl font-semibold text-blue-500">
                                  {instructorDetails[instructor.id].performance.totalStudents}
                                </p>
                                <p className="text-sm text-gray-600">Total Students</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xl font-semibold text-green-600">
                                  {instructorDetails[instructor.id].performance.completionRate}%
                                </p>
                                <p className="text-sm text-gray-600">Completion Rate</p>
                              </div>
                            </div>
                          </div>

                          {/* Courses Section */}
                          <div>
                            <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                              <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
                              Course Details
                            </h5>
                            <div className="overflow-x-auto rounded-lg border border-gray-200">
                              <table className="w-full text-sm text-left text-gray-700">
                                <thead className="bg-gray-50 text-xs uppercase font-medium">
                                  <tr>
                                    <th className="px-4 py-3">Course Name</th>
                                    <th className="px-4 py-3">Students</th>
                                    <th className="px-4 py-3">Revenue</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Progress</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                  {instructorDetails[instructor.id].courses.map((course) => (
                                    <tr key={course.id} className="bg-white hover:bg-gray-50">
                                      <td className="px-4 py-3 font-medium text-gray-900">{course.name}</td>
                                      <td className="px-4 py-3">{course.students}</td>
                                      <td className="px-4 py-3 font-semibold text-green-600">
                                        ${course.revenue.toLocaleString()}
                                      </td>
                                      <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                          course.status === 'Active' 
                                            ? 'bg-green-100 text-green-700' 
                                            : 'bg-gray-100 text-gray-700'
                                        }`}>
                                          {course.status}
                                        </span>
                                      </td>
                                      <td className="px-4 py-3">
                                        <div className="flex items-center space-x-2">
                                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                                            <div 
                                              className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                                              style={{width: `${course.completion}%`}}
                                            ></div>
                                          </div>
                                          <span className="text-xs font-medium">{course.completion}%</span>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* Summary Stats */}
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h5 className="font-semibold text-gray-800 mb-3">Summary Statistics</h5>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                              <div>
                                <p className="text-lg font-bold text-purple-600">
                                  {instructorDetails[instructor.id].courses.length}
                                </p>
                                <p className="text-xs text-gray-600">Total Courses</p>
                              </div>
                              <div>
                                <p className="text-lg font-bold text-blue-600">
                                  {instructorDetails[instructor.id].courses.filter(c => c.status === 'Active').length}
                                </p>
                                <p className="text-xs text-gray-600">Active Courses</p>
                              </div>
                              <div>
                                <p className="text-lg font-bold text-green-600">
                                  {instructorDetails[instructor.id].courses.reduce((sum, c) => sum + c.students, 0)}
                                </p>
                                <p className="text-xs text-gray-600">Total Enrollments</p>
                              </div>
                              <div>
                                <p className="text-lg font-bold text-orange-600">
                                  {Math.round(instructorDetails[instructor.id].courses.reduce((sum, c) => sum + c.completion, 0) / instructorDetails[instructor.id].courses.length)}%
                                </p>
                                <p className="text-xs text-gray-600">Avg. Progress</p>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-center items-center py-8">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                          <span className="ml-2 text-gray-600">Loading instructor details...</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}