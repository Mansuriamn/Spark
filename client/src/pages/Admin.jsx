import React, { useContext, useEffect, useState } from 'react';
import { User, Save, X, Edit3 } from 'lucide-react';
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
  const [instructors, setInstructors] = useState([
    { id: 1, name: 'Dr. Meena Joshi', email: 'meena@edu.com', joinedDate: '2023-12-01' },
    { id: 2, name: 'Ravi Verma', email: 'ravi@edu.com', joinedDate: '2023-12-15' },
  ]);
  const [expandedInstructor, setExpandedInstructor] = useState(null);
  const [profileEdit, setProfileEdit] = useState(false);
  const selectedRole=localStorage.getItem("selectedRole");
  useEffect(() => {
    if (user) {
      setProfile(user);
      const savedImage = localStorage.getItem('profileImage');
      if (savedImage) setProfileImage(savedImage);
    }
  }, [user]);

  const toggleExpand = (id) => {
    setExpandedInstructor(prev => (prev === id ? null : id));
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
      <h2 id='admin_h2'>Admin Page</h2>

      {/*profile section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex items-center space-x-6 mb-6 lg:mb-0">
            <div className="relative">
              {profileImage ? (
                <img
                  src={profileImage}
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
                  <p className="text-gray-500 text-sm mt-1">{profile.role}</p>
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

      {/*instructors Section*/}
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
                <h5 className="font-medium text-gray-800 mb-3">Instructor Details</h5>
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