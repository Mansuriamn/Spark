import React, { useState } from 'react';
import { User, Save, X, Edit3 } from 'lucide-react';

export default function Admin() {
  // State declarations should be at the top of the component
  const [instructors, setInstructors] = useState([
    { id: 1, name: 'Dr. Meena Joshi', email: 'meena@edu.com', joinedDate: '2023-12-01' },
    { id: 2, name: 'Ravi Verma', email: 'ravi@edu.com', joinedDate: '2023-12-15' },
  ]);
  const [expandedInstructor, setExpandedInstructor] = useState(null);

  const toggleExpand = (id) => {
    setExpandedInstructor(prev => (prev === id ? null : id));
  };
  const [profile, setProfile] = useState({
    name: 'Aman Mansuri',
    email: 'mansooree@gmail.com',
    bio: 'Passionate educator with 5+ years of experience in tech training',
  });

  const [profileEdit, setProfileEdit] = useState(false);
  const [expandedCourse, setExpandedCourse] = useState(null); // Added state for expanded course

  // Completed removeStudent function
  const removeStudent = (courseId, studentId) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          enrolledStudents: course.enrolledStudents.filter(student => student.id !== studentId),
          students: course.students - 1,
          revenue: course.revenue - course.price
        };
      }
      return course;
    }));
  };

  const handleProfileSave = () => {
    setProfileEdit(false);
  };

  return (
    <div className='Admin_Container'>
      <h2 style={{
        textAlign: "center",
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#1f2937",
        margin: "2rem 0"
      }}>Admin Page</h2>

      {/* Profile Section */}
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
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="text-2xl font-bold bg-transparent border-b-2 border-indigo-300 focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="block text-gray-600 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  />
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
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
                    Administrator
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

      {/* Courses Section */}
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Instructor List</h2>

        {instructors.map((instructor) => (
          <div
            key={instructor.id}
            className="mb-6 bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{instructor.name}</h4>
                <p className="text-sm text-gray-600">{instructor.email}</p>
              </div>
              <button
                className="text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => toggleExpand(instructor.id)}
              >
                {expandedInstructor === instructor.id ? 'Hide Details' : 'Show Details'}
              </button>
            </div>

            {expandedInstructor === instructor.id && (
              <div className="mt-6 space-y-3 border-t pt-4">
                <h5 className="font-medium text-gray-800 mb-3">
                  Instructor Details
                </h5>

                <div className="overflow-x-auto rounded-md">
                  <table className="w-full text-sm text-left text-gray-700 border border-gray-200">
                    <thead className="bg-gray-100 text-xs uppercase">
                      <tr>
                        <th className="px-4 py-2">#</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Joined Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-t">
                        <td className="px-4 py-2">1</td>
                        <td className="px-4 py-2 font-medium text-gray-900">{instructor.name}</td>
                        <td className="px-4 py-2">{instructor.email}</td>
                        <td className="px-4 py-2">
                          {new Date(instructor.joinedDate).toLocaleDateString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}