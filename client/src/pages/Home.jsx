import React, { useEffect, useState, useContext } from 'react';
import HeroSection from '../components/Hero';
import SuccessStoriesSection from '../components/Stories';
import StudentTestimonials from '../components/Studenttes';
import NewsletterSection from '../components/Newsletter';
import TrackList from '../components/Finalcoursecard';
import Footer from '../components/Footer';
import LearningDashboard from '../components/Homedashboard';
import { AuthContext } from '../pages/AuthContext'; 
import axios from 'axios';

function CoursesPage({UserId}) {
  const [HomeData, setHomeData] = useState([]);
  const { isAuthenticated,enrolledCourses, user } = useContext(AuthContext); 
  

  useEffect(() => {
    axios.get("").then((res) => {
      setHomeData(res.data);
    }).catch((err) => {
      console.error("Error fetching home data:", err);
    })
  }, [])

  return (
    <div className="space-y-8 md:space-y-12 py-4 md:py-12"> 
      <section className="relative bg-white rounded-xl shadow-lg p-6 md:p-10 container mx-auto">
        <HeroSection />
      </section>
      
      {/* {isAuthenticated &&  enrolledCourses.length > 0 && (
        <section className="relative bg-white rounded-xl shadow-lg p-6 md:p-10 container mx-auto">
          <LearningDashboard userId={user?.id || UserId} />
        </section>
      )} */}
      
      <section className="relative bg-white rounded-xl shadow-lg p-6 md:p-10 container mx-auto">
        <TrackList />
      </section>
      
      <section className="bg-white rounded-xl shadow-lg p-6 md:p-10 container mx-auto">
        <SuccessStoriesSection />
      </section>
      
      <Footer/>
    </div>
  );
}

export default CoursesPage;