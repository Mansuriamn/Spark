import React, { useRef, useState } from 'react';
import CountUp from 'react-countup';
import ADRS from '../assets/videos/ADRS.mp4'
import { counterItems } from '../constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

function HeroSection() {
  const statsRef = useRef(null);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between text-center md:text-left p-6">
      {/* bg */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-200 rounded-full opacity-10 blur-xl hidden md:block"></div>
      <div className="absolute top-10 -left-10 w-48 h-48 bg-orange-200 rounded-full opacity-10 blur-xl hidden md:block"></div>

      {/* Left Content */}
      <div className="flex flex-col items-center md:items-start md:w-1/2 z-10">
      
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">Spark - </span>
        let the <span className="text-purple-600">learning</span> be set alight.<br />
          
        </h1>

        {/* ✅ Animated Stats Section */}
        <div ref={statsRef} className="flex flex-wrap justify-center md:justify-start gap-8 mb-10">
          {counterItems.map((item, index) => (
            <div key={index}>
              <p className="text-3xl md:text-4xl font-bold text-purple-600">
                {shouldAnimate ? (
                  <CountUp end={item.value} duration={2.8} suffix={item.suffix} />
                ) : (
                  `0${item.suffix}`
                )}
              </p>
              <p className="text-gray-500 text-sm">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Logos */}
        {/* <LogoSection /> */}
      </div>

      {/* Right Image */}
      <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center md:justify-end z-10">
         <video
         style={{
          borderRadius:"10px",
         }}
          width="500" height="300" autoPlay loop muted playsInline>
        <source src={ADRS} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      </div>
    </div>
  );
}

export default HeroSection;
