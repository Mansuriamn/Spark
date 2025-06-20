import React, { useState, useRef, useEffect, useContext } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaBell, FaBars, FaTimes, FaCog, FaUser, FaSignOutAlt, FaChevronRight } from 'react-icons/fa';
import { Bell, Menu, X, Settings, User, LogOut, ChevronRight } from 'lucide-react';
import { AuthContext } from '../pages/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  console.log(user);
  const location = useLocation();
  const role = localStorage.getItem('selectedRole');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [helpEarnOpen, setHelpEarnOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [selectedLanguage, setSelectedLanguage] = useState('Eng');
  const [notificationStatus, setNotificationStatus] = useState('Allow');

  const dropdownRef = useRef(null);
  const helpEarnRef = useRef(null);
  const notificationRef = useRef(null);
  const settingsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const close = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (helpEarnRef.current && !helpEarnRef.current.contains(e.target)) {
        setHelpEarnOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setNotificationOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  // Define navigation items based on user role
  const getNavItems = () => {
    if (!user) {
      return ['Home', 'Courses']; // Non-authenticated users
    }
    switch (role) {
      case 'student':
        return ['Home', 'Courses', 'Dashboard', 'Live Sessions', 'Schedule', 'Contest', 'Practice', 'Progress Update'];
      case 'admin':
        return ['Admin', 'Admin Dashboard'];
      case 'instructor':
        return ['Instructor'];
      default:
        return ['Home', 'Courses'];
    }
  };

  const navItems = getNavItems();

  // Map nav items to their respective routes
  const navItemRoutes = {
    Home: '/home',
    Courses: '/courses',
    Dashboard: '/dashboard',
    'Live Sessions': '/live-sessions',
    Schedule: '/schedule',
    Contest: '/contest',
    Practice: '/practice',
    'Progress Update': '/progressupdate',
    Video: '/video',
    'Student Dashboard': '/student-dashboard',
    Admin: '/admin',
    'Admin Dashboard': '/admin-dashboard',
    Instructor: '/instructor',
  };

  const handleSettingsClick = () => {
    setDropdownOpen(false);
    setSettingsOpen(true);
  };

  const handleLogin = () => {
    navigate('/login');
    console.log('Navigating to login page');
  };

  const handleSignup = () => {
    navigate('/register');
    console.log('Navigating to signup page');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setDropdownOpen(false);
    console.log('User logged out');
  };

  const handleProfileNavigation = () => {
    setDropdownOpen(false);
    if (role === 'instructor') {
      navigate('/instructor');
    } else {
      navigate('/profile');
    }
  };





  return (
    <header className="min-h-[90px] flex flex-col justify-start py-6 bg-white shadow-sm">
      <div className="w-[95%] max-w-[1280px] flex items-center mx-auto">
        <a href="/" className="flex items-center space-x-2">
          <span className="text-purple-600 text-2xl font-black">✖</span>
          <h1 className="text-xl font-bold text-gray-900">LearnoHub</h1>
        </a>

        <nav className="hidden md:flex items-center space-x-4 ml-8">
          {navItems.map((item) => (
            <NavLink
              key={item}
              to={navItemRoutes[item] || `/${item.toLowerCase()}`}
              className={({ isActive }) =>
                `px-4 py-1 rounded-full text-sm font-medium border border-transparent text-gray-800 hover:border-black hover:bg-black hover:text-white transition ${
                  isActive ? 'bg-black text-white' : ''
                }`
              }
            >
              {item}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4 ml-auto">
          {user ? (
            <>
              <div className="relative">
                <button
                  onClick={() => setHelpEarnOpen(!helpEarnOpen)}
                  className="px-5 py-1 rounded-full text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 focus:outline-none transition-colors"
                >
                  Help & Earn
                </button>
                {helpEarnOpen && (
                  <div
                    ref={helpEarnRef}
                    className="absolute top-12 right-0 w-96 bg-white rounded-lg shadow-lg z-50 border border-gray-200"
                  >
                    <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-t-lg">
                      <h2 className="text-xl font-bold text-white">KodNest Help and Earn Program</h2>
                    </div>
                    <div className="px-6 py-4 bg-purple-50">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="bg-purple-600 p-2 rounded-lg">
                          <span className="text-white text-lg">🎁</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Referral Bonus</h3>
                      </div>
                      <p className="text-gray-600 mb-2">
                        Earn <span className="text-purple-600 font-bold">₹2,000</span> for every successful referral
                      </p>
                      <p className="text-gray-600 mb-2">
                        Your friend gets <span className="text-red-500 font-bold">₹2,000 discount</span> on course fees
                      </p>
                      <p className="text-gray-500 italic text-sm">No limit on referrals - earn unlimited rewards!</p>
                    </div>
                    <div className="px-6 py-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Important Instructions</h4>
                      <p className="text-gray-600 text-sm mb-4">
                        Ask your friends to mention your name and KodNest ID when filling out the registration form.
                      </p>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Referral Link:</label>
                        <div className="flex">
                          <input
                            type="text"
                            value={`https://learnhub.com/refer-earn?code=${user?.id || ''}`}
                            readOnly
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-sm"
                          />
                          <button className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 text-sm font-medium">
                            📋 Copy
                          </button>
                        </div>
                      </div>
                      <button
                        className="w-full py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-md font-medium transition-all"
                        onClick={() => {
                          setHelpEarnOpen(false);
                          console.log('Navigate to register');
                        }}
                      >
                        Start Referring Now
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="relative p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Bell className="text-lg" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
                </button>
                {notificationOpen && (
                  <div
                    ref={notificationRef}
                    className="absolute top-12 right-0 w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-200 overflow-hidden"
                  >
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <img
                              src={user.avatar}
                              alt="User"
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setNotificationStatus('Allow')}
                            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                              notificationStatus === 'Allow'
                                ? 'bg-green-100 text-green-800 border border-green-300'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            Allow
                          </button>
                          <button
                            onClick={() => setNotificationStatus('Mute')}
                            className={`px-3 py-1 text-xs font-medium rounded-full transition Colors ${
                              notificationStatus === 'Mute'
                                ? 'bg-red-100 text-red-800 border border-red-300'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            Mute
                          </button>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                          <p className="text-sm font-medium text-gray-900">New course available!</p>
                          <p className="text-xs text-gray-600 mt-1">Check out our latest JavaScript course</p>
                          <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                          <p className="text-sm font-medium text-gray-900">Assignment completed</p>
                          <p className="text-xs text-gray-600 mt-1">Great job on your React project!</p>
                          <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <img
                src={user.profilePic}
                  alt="profile"
                  className="h-9 w-9 rounded-full cursor-pointer hover:ring-2 hover:ring-purple-300 transition-all object-cover"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-12 right-0 w-52 bg-white rounded-lg shadow-xl z-50 border border-gray-200 overflow-hidden"
                  >
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        {user.img}
                        <img
                          src={user.profilePic}
                          alt="profile"
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <button
                        className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                        onClick={handleProfileNavigation}
                      >
                        <div className="flex items-center space-x-3">
                          <User className="text-gray-500" />
                          <span className="text-gray-700">
                            {role === 'instructor' ? 'Instructor Profile' : 'My Profile'}
                          </span>
                        </div>
                        <ChevronRight className="text-gray-400 text-xs" />
                      </button>
                      <button
                        className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                        onClick={handleSettingsClick}
                      >
                        <div className="flex items-center space-x-3">
                          <Settings className="text-gray-500" />
                          <span className="text-gray-700">Settings</span>
                        </div>
                        <ChevronRight className="text-gray-400 text-xs" />
                      </button>
                      <div className="flex items-center justify-between px-4 py-3 text-sm">
                        <div className="flex items-center space-x-3">
                          <Bell className="text-gray-500" />
                          <span className="text-gray-700">Notification</span>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            notificationStatus === 'Allow'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {notificationStatus}
                        </span>
                      </div>
                      <div className="border-t border-gray-200 mt-2 pt-2">
                        <button
                          className="w-full flex items-center space-x-3 px-4 py-3 text-sm hover:bg-red-50 hover:text-red-600 transition-colors"
                          onClick={handleLogout}
                        >
                          <LogOut className="text-gray-500" />
                          <span className="text-gray-700">Log Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <button
                onClick={handleLogin}
                className="px-6 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                Log In
              </button>
              <button
                onClick={handleSignup}
                className="px-6 py-2 text-sm font-medium text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        <button className="md:hidden ml-auto" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="text-xl" /> : <Menu className="text-xl" />}
        </button>
      </div>

      {settingsOpen && (
        <div className="absolute top-18 right-0 w-52 bg-white rounded-lg shadow-xl z-50 border border-gray-200 overflow-hidden">
          <div ref={settingsRef} className="bg-white rounded-lg shadow-xl w-50 max-w-[90vw] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
              <button
                onClick={() => setSettingsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
                <div className="relative">
                  <select
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none cursor-pointer"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                  <FaChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 text-sm pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Language</label>
                <div className="relative">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none cursor-pointer"
                  >
                    <option value="Eng">English</option>
                    <option value="Hi">Hindi</option>
                    <option value="Es">Spanish</option>
                    <option value="Fr">French</option>
                    <option value="De">German</option>
                  </select>
                  <FaChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 text-sm pointer-events-none" />
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSettingsOpen(false)}
                  className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item}
              to={navItemRoutes[item] || `/${item.toLowerCase()}`}
              className={({ isActive }) =>
                `block text-gray-800 px-4 py-2 rounded-md hover:bg-gray-100 ${
                  isActive ? 'bg-gray-100' : ''
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </NavLink>
          ))}
          {user ? (
            <>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  console.log('Navigate to help-and-earn');
                }}
                className="block w-full text-left px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
              >
                Help & Earn
              </button>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="relative p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                >
                  <Bell />
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
                </button>
                <div className="relative">
                  <img
                    src={user.avatar || 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'}
                    alt="profile"
                    className="h-8 w-8 rounded-full cursor-pointer object-cover"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  />
                  {dropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg z-50 py-2 border"
                    >
                      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                          <img
                            src={user.avatar || 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'}
                            alt="profile"
                            className="h-10 w-10 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      <button
                        className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                        onClick={handleProfileNavigation}
                      >
                        <div className="flex items-center space-x-3">
                          <FaUser className="text-gray-500" />
                          <span className="text-gray-700">
                            {role === 'instructor' ? 'Instructor Profile' : 'My Profile'}
                          </span>
                        </div>
                        <FaChevronRight className="text-gray-400 text-xs" />
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                        onClick={handleSettingsClick}
                      >
                        Settings
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex space-x-3 mt-4">
              <button
                onClick={handleLogin}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Log In
              </button>
              <button
                onClick={handleSignup}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}