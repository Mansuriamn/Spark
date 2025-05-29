import Navbar from '../components/Navbar';
import ActivityCard from '../components/Activitycard';
import ProgressCard from '../components/Progresscard';
import CourseCard from '../components/Course';
import ScheduleCard from '../components/Schedulecard';
import Footer from '../components/Footer';

const Dashboard = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="col-span-1">
          <ActivityCard />
        </div>
        <div className="col-span-1 flex flex-col gap-6 h-full">
          <div className="h-full">
            <ProgressCard />
          </div>
          <div className="h-full">
            <ScheduleCard />
          </div>
        </div>
        <div className="col-span-1">
          <CourseCard />
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
    
  );
};


export default Dashboard;
