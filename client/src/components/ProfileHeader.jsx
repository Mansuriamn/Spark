import React from 'react';
import { Edit3, Mail, User, Camera } from 'lucide-react';
import '../assets/style/UserProfile.css';

const ProfileHeader = ({
  userInfo,
  isEditing,
  profilePic,
  loading,
  handleEditToggle,
  handleSave,
  handleImageUpload,
  setIsEditing,
  setUserInfo
}) => {
  return (
    <div className="profile-container" id="profile-container">
      <div className="profile-header" id="profile-header">
        <div className="profile-main" id="profile-main">
          <div className="profile-picture-wrapper">
            <div className="profile-picture-box">
              {profilePic ? (
                <User className="profile-icon" />
              ) : (
                <div className="profile-initial">
                  {userInfo?.name?.[0]?.toUpperCase() || 'U'}
                </div>
              )}
            </div>
            {isEditing && (
              <div className="profile-overlay">
                <label htmlFor="profile-upload" className="upload-label">
                  <Camera className="camera-icon" />
                </label>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input"
                />
              </div>
            )}
            <div className="profile-status-indicator"></div>
          </div>

          <div className="profile-details" id="profile-details">
            {isEditing ? (
              <div className="edit-form">
                <input
                  type="text"
                  id="edit-name"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  className="edit-input name-input"
                  placeholder="Full Name"
                />
                <input
                  type="email"
                  id="edit-email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  className="edit-input email-input"
                  placeholder="Email Address"
                />
              </div>
            ) : (
              <div className="display-info">
                <h2 className="display-name">{userInfo.name}</h2>
                <div className="display-email">
                  <Mail className="icon" />
                  <span>{userInfo.email}</span>
                </div>
                <div className="display-role">
                  <User className="icon" />
                  <span className="role-badge">
                    {userInfo.role || 'Student'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="profile-actions" id="profile-actions">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="btn cancel-btn"
                disabled={loading}
                id="cancel-edit"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="btn save-btn"
                id="save-profile"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </>
          ) : (
            <button
              onClick={handleEditToggle}
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
  );
};

export default ProfileHeader; 