import React, { useContext, useEffect, useState } from 'react';
import { User, Save, X, Edit3 } from 'lucide-react';
import '../assets/style/Admin.css';
import { AuthContext } from './AuthContext';
import '../assets/style/UserProfile.css'


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
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20 admin-profile">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex items-center space-x-6 mb-6 lg:mb-0">
            <div className="relative">
              {profileImage ? (
                // <img
                //   src={profile.profilePic}
                //   alt="Profile"
                //   className="profile_image"
                // />
               <div className="profile-picture-box">
                 <User className="profile-icon"  />
                </div>
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
                    Administrator
                  </span>
                </>
              )}
            </div>
          </div>
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