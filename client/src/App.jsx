import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import CoursesPage from './pages/Home';
import DashboardPage from './pages/DashboardPage';
import LiveSessionsPage from './pages/LiveSession';
import Schedule from './pages/Schedule';
import Courses from './pages/Courses';
import Trackdetails from './components/Trackdetails';
import MyCoursesPage from './components/ProgressUpdate';
import Contest from './pages/Contest';
import Register from './pages/Register';
import Login from './pages/Login';
import UserProfile from './components/Userprofile';
import VideoDashboard from './components/VideoDashboard';
import WebRTCMeeting from './components/WebRTCMeeting';
import Practice from './pages/Practice';
import PathToProficiency from './components/Practiceinside';
import InstructorDashboard from './components/Instructorpage';
import FreeCourseDetails from './components/Freecourse'


import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import WelcomePage from './pages/Mainpage';

import Student from './components/Seestudent';
import Admin from './pages/Admin';


function AppWrapper() {
  const location = useLocation();
  const [login, setLogin] = useState(false);
  const [UserId, setUserId] = useState('684bccd97c61555addc4f460');
  const [Token, setToken] = useState('');

 
  const hideNavbarRoutes = ['/', ,'/Login','/login',  '/Register'];

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-purple-50 font-sans text-gray-800">
      {shouldShowNavbar && <Navbar />}
      <main>
        <Routes>
          <Route path="/meeting/:roomName" element={<WebRTCMeeting userName="Roshan" />} />
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<CoursesPage  />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/live-sessions" element={<LiveSessionsPage />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/contest" element={<Contest />} />
          {/*<Route path="/track/:trackName" element={<Trackdetails />} />*/}
          <Route path="/progressupdate" element={<MyCoursesPage />} />
          <Route path="/login" element={<Login setLogin={setLogin} />} />
          <Route path="/Register" element={<Register setLogin={setLogin} />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/video" element={<VideoDashboard />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/practiceinside" element={<PathToProficiency />} />
          <Route path="/instructor" element={<InstructorDashboard />} />

          <Route path="/Main" element={<WelcomePage />} />
          <Route path='/student' element ={<Student/>}></Route>
          <Route path ='/student' element ={<Student/>}></Route>
          <Route path='/admin' element ={<Admin/>}></Route>
          <Route path='/track/:trackName' element={<FreeCourseDetails/>}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
