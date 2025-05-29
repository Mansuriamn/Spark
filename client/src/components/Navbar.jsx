import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaSearch, FaBell, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const navItems = ['Home', 'Courses', 'Dashboard', 'Schedule', 'Contact'];

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current && 
        !searchInputRef.current.contains(event.target) &&
        event.target.closest('.search-icon') === null
      ) {
        setSearchActive(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when activated and navigate to courses
  useEffect(() => {
    if (searchActive) {
      searchInputRef.current?.focus();
      navigate('/courses');
    }
  }, [searchActive, navigate]);

  return (
    <div className="min-h-[90px] flex justify-center py-4 bg-white shadow-sm">
      <div className="w-[95%] max-w-[1280px] flex items-center justify-between">

        {/* Logo */}
        <div className={`flex items-center space-x-2 transition-all duration-300 ${
          searchActive ? 'mr-auto' : ''
        }`}>
          <span className="text-purple-600 text-2xl font-black">✖</span>
          <h1 className="text-xl font-bold text-gray-900">LearnoHub</h1>
        </div>

        {/* Nav Items */}
        <div className={`hidden md:flex items-center space-x-4 transition-all duration-300 ${
          searchActive ? 'ml-0 justify-center flex-1' : 'ml-auto'
        }`}>

          {/* Navigation Links */}
          <div className={`flex items-center space-x-4 transition-all duration-300 ${
            searchActive ? 'opacity-50 pointer-events-none' : 'opacity-100'
          }`}>
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
              // onClick={() => setSearchActive(true)} // Optional: activate on click
            >
              <FaSearch size={18} />
            </div>

            {/* Expanding Search Input */}
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search courses..."
              className={`transition-all duration-300 ease-in-out bg-gray-100 rounded-full px-4 py-1 text-sm outline-none
                ${
                  searchActive
                    ? 'w-48 opacity-100 ml-2'
                    : 'w-0 opacity-0 ml-0 pointer-events-none'
                }`}
            />

            {/* Other Icons */}
            <div className="relative">
              <FaBell className="text-gray-700 cursor-pointer" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
            </div>

            <img
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="profile"
              className="h-8 w-8 rounded-full cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            {/* Profile Dropdown */}
            {dropdownOpen && (
              <div className="absolute top-12 right-0 mt-2 w-40 border-gray-200 bg-gray-100 rounded-md shadow-lg z-50 py-2 border">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Hamburger Menu for mobile (not handled here) */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
