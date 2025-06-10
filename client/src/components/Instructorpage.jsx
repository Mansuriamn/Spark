import Footer from './Footer';
import React, { useState } from 'react';
import { User, Edit3, Users, DollarSign, BookOpen, Plus, X, Save, TrendingUp, Award, Calendar, Eye, UserMinus, ChevronDown, ChevronUp } from 'lucide-react';

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Full Stack Development',
      level: 'Intermediate',
      duration: '10 weeks',
      students: 120,
      revenue: 24000,
      price: 200,
      topics: 'HTML, CSS, React, Node.js',
      rating: 4.8,
      completion: 85,
      enrolledStudents: [
        { id: 1, name: 'Rahul Sharma', email: 'rahul@email.com', enrolledDate: '2024-01-15', progress: 75 },
        { id: 2, name: 'Priya Patel', email: 'priya@email.com', enrolledDate: '2024-01-18', progress: 92 },
        { id: 3, name: 'Amit Kumar', email: 'amit@email.com', enrolledDate: '2024-01-20', progress: 68 },
        { id: 4, name: 'Sneha Singh', email: 'sneha@email.com', enrolledDate: '2024-01-22', progress: 84 },
        { id: 5, name: 'Vikash Gupta', email: 'vikash@email.com', enrolledDate: '2024-01-25', progress: 56 }
      ]
    },
    {
      id: 2,
      title: 'Intro to AI',
      level: 'Beginner',
      duration: '8 weeks',
      students: 80,
      revenue: 16000,
      price: 200,
      topics: 'Machine Learning, Python, NLP',
      rating: 4.6,
      completion: 78,
      enrolledStudents: [
        { id: 6, name: 'Anita Desai', email: 'anita@email.com', enrolledDate: '2024-02-01', progress: 82 },
        { id: 7, name: 'Rajesh Mehta', email: 'rajesh@email.com', enrolledDate: '2024-02-03', progress: 65 },
        { id: 8, name: 'Kavya Nair', email: 'kavya@email.com', enrolledDate: '2024-02-05', progress: 91 }
      ]
    },
  ]);

  const [newCourse, setNewCourse] = useState({
    title: '',
    duration: '',
    topics: '',
    level: 'Beginner',
    price: '',
  });

  const [editingCourse, setEditingCourse] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [profile, setProfile] = useState({
    name: 'Pragati Mishra',
    email: 'p@gmail.com',
    bio: 'Passionate educator with 5+ years of experience in tech training',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
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
    if (newCourse.title && newCourse.duration && newCourse.topics && newCourse.price) {
      const price = parseFloat(newCourse.price);
      setCourses([
        ...courses,
        {
          ...newCourse,
          id: Date.now(),
          students: 0,
          revenue: 0,
          price: price,
          rating: 0,
          completion: 0,
          enrolledStudents: []
        },
      ]);
      setNewCourse({ title: '', duration: '', topics: '', level: 'Beginner', price: '' });
      setShowAddForm(false);
    }
  };

  const handleProfileSave = () => {
    setProfileEdit(false);
  };

  const removeStudent = (courseId, studentId) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        const updatedStudents = course.enrolledStudents.filter(student => student.id !== studentId);
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

  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);
  const totalRevenue = courses.reduce((sum, course) => sum + course.revenue, 0);
  const avgRating = courses.length > 0 ? (courses.reduce((sum, course) => sum + course.rating, 0) / courses.length).toFixed(1) : 0;

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        
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

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-6 lg:mb-0">
              <div className="w-20 h-20 bg-purple-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg">
                <User />
              </div>
              <div>
                {profileEdit ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="text-2xl font-bold bg-transparent border-b-2 border-indigo-300 focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="block text-gray-600 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    />
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      className="block text-gray-500 text-sm bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-500 resize-none"
                      rows="2"
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold text-gray-800">{profile.name}</h2>
                    <p className="text-gray-600">{profile.email}</p>
                    <p className="text-gray-500 text-sm mt-1">{profile.bio}</p>
                    <span className="inline-block text-sm bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full mt-2 font-medium">
                      Senior Instructor
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="flex space-x-3">
              {profileEdit ? (
                <>
                  <button
                    onClick={handleProfileSave}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
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
            </div>
          </div>
        </div>

       
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
                name="topics"
                placeholder="Topics (comma separated)"
                className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all md:col-span-2"
                value={newCourse.topics}
                onChange={handleChange}
              />
              <button
                onClick={handleSubmit}
                className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-xl transition-all duration-200 font-medium md:col-span-2 shadow-lg"
              >
                Create Course
              </button>
            </div>
          </div>
        )}

        
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                  course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                  course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {course.level}
                </span>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{course.duration}</span>
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
                      onClick={() => setEditingCourse(null)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-1"
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
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-medium">Topics:</span> {course.topics}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{course.students} students</span>
                      </span>
                      <span className="flex items-center space-x-2 text-sm font-medium text-green-600">
                        <span>₹{course.revenue.toLocaleString()}</span>
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
                      <h5 className="font-medium text-gray-800 mb-3">Enrolled Students ({course.enrolledStudents.length})</h5>
                      {course.enrolledStudents.length === 0 ? (
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
                                    <p className="font-medium text-sm text-gray-800">{student.name}</p>
                                    <p className="text-xs text-gray-500">{student.email}</p>
                                  </div>
                                </div>
                                <div className="mt-2 flex items-center justify-between">
                                  <span className="text-xs text-gray-500">
                                    Enrolled: {new Date(student.enrolledDate).toLocaleDateString()}
                                  </span>
                                  <span className="text-xs text-gray-600">
                                    Progress: {student.progress}%
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
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
      <Footer />
    </>
  );
}