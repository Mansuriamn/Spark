import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaSearch, FaBell, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navItems = ['Home', 'Courses', 'Dashboard', 'Schedule', 'Contact'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className=" min-h-[90px] flex justify-center py-4">
      <div className="w-[95%] max-w-[1280px]">
        {/* Top Row */}
        <div className="bg-gray-100 rounded-full px-6 py-3 flex justify-between items-center shadow-sm">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-purple-600 text-2xl font-black">✖</span>
            <h1 className="text-xl font-bold text-gray-900">LearnoHub</h1>
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>

          {/* Desktop Nav Items and Icons */}
          <div className="hidden md:flex items-center space-x-4">
  <div className="flex items-center space-x-4">
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

            {/* Right Icons */}
            <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
              <FaSearch className="text-gray-700 cursor-pointer" />
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
        </div>

        {/* Mobile Collapsible Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 bg-white rounded-lg shadow px-4 py-3 space-y-3">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                      isActive
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-800 hover:border-black'
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </NavLink>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <FaSearch className="text-gray-700 cursor-pointer" />
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
            </div>
            {/* Mobile Profile Dropdown */}
            {dropdownOpen && (
              <div className="bg-white rounded-md shadow-lg z-50 py-2 border mt-2">
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
        )}
      </div>
    </div>
  );
};

export default Navbar;
