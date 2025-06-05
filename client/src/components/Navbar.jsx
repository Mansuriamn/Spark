import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaSearch, FaBell, FaBars, FaTimes } from 'react-icons/fa';
import UserProfile from './Userprofile';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const navItems = ['Home', 'Courses', 'Dashboard','Practice', 'Contest'];

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        !event.target.closest('.search-icon')
      ) {
        setSearchActive(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideDropdown);
    return () => document.removeEventListener('mousedown', handleClickOutsideDropdown);
  }, []);

  // Focus input and navigate to /courses
  useEffect(() => {
    if (searchActive) {
      searchInputRef.current?.focus();
      navigate('/courses');
    }
  }, [searchActive, navigate]);

  return (
    <div className="min-h-[90px] flex flex-col justify-start py-4 bg-white shadow-sm">
      <div className="w-[95%] max-w-[1280px] flex items-center justify-between mx-auto">

        {/* Logo */}
        <div className={`flex items-center space-x-2 transition-all duration-300 ${searchActive ? 'mr-auto' : ''}`}>
          <span className="text-purple-600 text-2xl font-black">✖</span>
          <h1 className="text-xl font-bold text-gray-900">LearnoHub</h1>
        </div>

        {/* Nav Items - Desktop */}
        <div className={`hidden md:flex items-center space-x-4 transition-all duration-300 ${searchActive ? 'ml-0 justify-center flex-1' : 'ml-auto'}`}>
          {/* Navigation Links */}
          <div className={`flex items-center space-x-4 transition-all duration-300 ${searchActive ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            {navItems.map((item) => (
              <NavLink
                key={item}
                to={`/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `px-4 py-1 rounded-full text-sm font-medium border transition-all duration-200 ${
                    isActive
                      ? 'border-black text-white bg-black'
                      : 'border-transparent text-gray-800 hover:border-black'
                  }`
                }
              >
                {item}
              </NavLink>
            ))}
          </div>

          {/* Search Icon + Input */}
          <div className="relative flex items-center space-x-4">
            <div
              className="search-icon cursor-pointer text-gray-700 flex items-center"
              onMouseEnter={() => setSearchActive(true)}
            >
              <FaSearch size={18} />
            </div>

            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search courses..."
              className={`transition-all duration-300 ease-in-out bg-gray-100 rounded-full px-4 py-1 text-sm outline-none
                ${searchActive ? 'w-48 opacity-100 ml-2' : 'w-0 opacity-0 ml-0 pointer-events-none'}`}
            />

            {/* Notification Icon */}
            <div className="relative">
              <FaBell className="text-gray-700 cursor-pointer" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
            </div>

            {/* Profile Image */}
            <div className="relative">
              <img
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="profile"
                className="h-8 w-8 rounded-full cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-12 right-0 mt-2 w-40 border-gray-200 bg-gray-100 rounded-md shadow-lg z-50 py-2 border"
                >
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate('/profile');
                    }}
                  >
                    Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                    Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hamburger Menu Button - Mobile */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Items */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item}
              to={`/${item.toLowerCase()}`}
              className="block text-gray-800 px-4 py-2 rounded-md hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </NavLink>
          ))}

          {/* Search and Notifications */}
          <div className="flex justify-between items-center mt-4">
            <FaSearch className="text-gray-700" />
            <FaBell className="text-gray-700" />
            <img
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="profile"
              className="h-8 w-8 rounded-full"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
