import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBell, FaBars, FaTimes } from 'react-icons/fa';   // FaSearch gone
import UserProfile from './Userprofile';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen,    setMenuOpen]     = useState(false);

  const dropdownRef = useRef(null);
  const navigate    = useNavigate();

  
  useEffect(() => {
    const close = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const navItems = ['Home', 'Courses', 'Dashboard', 'Practice', 'Contest'];

  return (
    <header className="min-h-[90px] flex flex-col justify-start py-4 bg-white shadow-sm">
      <div className="w-[95%] max-w-[1280px] flex items-center mx-auto">

        <NavLink to="/" className="flex items-center space-x-2">
          <span className="text-purple-600 text-2xl font-black">✖</span>
          <h1 className="text-xl font-bold text-gray-900">LearnoHub</h1>
        </NavLink>

        <nav className="hidden md:flex items-center space-x-4 ml-8">
          {navItems.map((item) => (
            <NavLink
              key={item}
              to={`/${item.toLowerCase()}`}
              className={({ isActive }) =>
                `px-4 py-1 rounded-full text-sm font-medium border transition
                 ${isActive
                   ? 'border-black text-white bg-black'
                   : 'border-transparent text-gray-800 hover:border-black'}`
              }
            >
              {item}
            </NavLink>
          ))}
        </nav>

    
        <div className="hidden md:flex items-center space-x-4 ml-auto">

          <button
            onClick={() => navigate('/help-and-earn')}
            className="px-5 py-1 rounded-full text-sm font-medium bg-purple-600
                       text-white hover:bg-purple-700 focus:outline-none"
          >
            Help &amp; Earn
          </button>

        
          <div className="relative">
            <FaBell className="text-gray-700 cursor-pointer" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
          </div>

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
                className="absolute top-12 right-0 w-40 bg-gray-100 rounded-md
                           shadow-lg z-50 py-2 border"
              >
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                  onClick={() => { setDropdownOpen(false); navigate('/profile'); }}
                >
                  Profile
                </button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-200">
                  Settings
                </button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-200">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          className="md:hidden ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>

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
          <button
            onClick={() => { setMenuOpen(false); navigate('/help-and-earn'); }}
            className="block w-full text-left px-4 py-2 rounded-md bg-purple-600
                       text-white hover:bg-purple-700"
          >
            Help &amp; Earn
          </button>

 
          <div className="flex justify-between items-center mt-4">
            <FaBell className="text-gray-700" />
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
                  className="absolute right-0 mt-1 w-36 bg-gray-100 rounded-md
                             shadow-lg z-50 py-2 border"
                >
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                    onClick={() => { setDropdownOpen(false); navigate('/profile'); }}
                  >
                    Profile
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200">
                    Settings
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
