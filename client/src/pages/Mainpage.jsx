import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function WelcomePage() {
  const navigate = useNavigate();

  
 const handleAdminLogin=()=>{
  localStorage.setItem('selectedRole', 'student'); 
  navigate('/login'); 
 }


  const handleStudentLogin = () => {
    localStorage.setItem('selectedRole', 'student'); 
    navigate('/login'); 
  };

  const handleInstructorLogin = () => {
    localStorage.setItem('selectedRole', 'instructor'); 
    navigate('/login');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-32 left-20 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-1/4 left-1/2 w-4 h-4 bg-purple-300 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-16 right-1/4 w-20 h-20 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full opacity-30 animate-float"></div>
        <div className="absolute bottom-20 right-16 w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-30 animate-float delay-1500"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 animate-fade-in">
            Welcome to LernoHub
          </h1>
          <p className="text-gray-600 text-lg md:text-xl opacity-80">
            Choose your learning path
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={handleStudentLogin}
            className="group relative px-12 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">Student</span>
          </button>

          <button
            onClick={handleInstructorLogin}
            className="group relative px-12 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">Instructor</span>
          </button>
          
          <button
            onClick={handleAdminLogin}
            className="group relative px-12 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">Admin</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}
