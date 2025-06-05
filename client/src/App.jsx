import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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


function App() {
   return (
     <Router>
     
     <div className="min-h-screen bg-purple-50 font-sans text-gray-800">
       <Navbar />
       <main>
         
         <Routes>
          {/**
              * webRTCMeet
             * http://localhost:3001/meeting/lms-123456
            */}
             <Route path="/meeting/:roomName" element={<WebRTCMeeting userName="Roshan" />} />

        <Route path="/" element={<CoursesPage />} />
          <Route path="/home" element={<CoursesPage />} />
          <Route path='/courses' element={<Courses/>}/>
           <Route path="/dashboard" element={<DashboardPage />} />
           <Route path="/live-sessions" element={<LiveSessionsPage />} />
            <Route path="/schedule" element={<Schedule />} />
            
          <Route path="/contest" element={<Contest />} />
           { /* Home page - tracklist dynamic routing */ }
           <Route path="/track/:trackName" element={<Trackdetails />} />
           <Route path ='/progressupdate' element={<MyCoursesPage/>}/>
           <Route path='/Login' element={<Login />}/>
           <Route path='/Register' element={<Register />} />
           <Route path='/profile' element={<UserProfile/>}/>
           <Route path='/video' element={<VideoDashboard/>}></Route>
          
          <Route path='/practice' element={<Practice/>}></Route>
          <Route path='/practiceinside' element={<PathToProficiency/>}></Route>
        
         </Routes>
        </main>
        
       </div>
    </Router>
    
   
   
  );
}

export default App;

