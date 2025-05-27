import React from 'react';

import imgheader from '../assets/img/imgheader.png';
import LogoSection from './LogoSection';

function HeroSection() {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between text-center md:text-left p-6">
      {/* Background Bubbles */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-200 rounded-full opacity-10 blur-xl hidden md:block"></div>
      <div className="absolute top-10 -left-10 w-48 h-48 bg-orange-200 rounded-full opacity-10 blur-xl hidden md:block"></div>

      {/* Left Content */}
      <div className="flex flex-col items-center md:items-start md:w-1/2 z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
          Get where you're <span className="text-purple-600">going</span> faster with <br />
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">Learnohub</span>
        </h1>

        {/* Stats */}
        <div className="flex flex-wrap justify-center md:justify-start gap-8 mb-10">
          <div>
            <p className="text-3xl md:text-4xl font-bold text-purple-600">20M</p>
            <p className="text-gray-500 text-sm">Learners</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-purple-600">50K</p>
            <p className="text-gray-500 text-sm">Classes</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-purple-600">4.8</p>
            <p className="text-gray-500 text-sm">Rating</p>
          </div>
        </div>

        {/* Logos */}
        
      </div>

      {/* Right Image */}
      <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center md:justify-end z-10">
        <img src={imgheader} alt="Hero" className="w-full max-w-md object-contain" />
      </div>
    </div>
  );
}

export default HeroSection;