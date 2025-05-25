import React from 'react';
import Progress from '../Models/Progress';
import Chart from '../Models/Chart';
import UpcomingCourses from '../Models/Upcoming';
import sampleCourses from '../../constants/index';
import RecommendedCourses from '../Models/rec_course';
import Footer from '../Models/footer';
import UpcomingEvents from '../Models/calender';
 
const Dashboard = () => {
  return (
    <div className=" h-screen flex items-center justify-center">
      <section className="  w-[70%] h-full bg-white  rounded-lg p-5">
        
        <Progress></Progress>
        <Chart></Chart>
        <div className="px-20 py-5">
      <UpcomingCourses courses={sampleCourses} />
    </div>
    <UpcomingEvents/>
    <RecommendedCourses/>
    <Footer/>

        
      </section>
    </div>
  );
};

export default Dashboard;