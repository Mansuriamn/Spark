import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CoursesPage from './pages/Home';
import DashboardPage from './pages/DashboardPage';
import LiveSessionsPage from './pages/LiveSession';
import Schedule from './pages/Schedule';
import ContactPage from './pages/Contact';
import Courses from './pages/Courses';
import Trackdetails from './components/Trackdetails';
import MyCoursesPage from './components/ProgressUpdate';

function App() {
   return (
    <Router>
     
      <div className="min-h-screen bg-purple-50 font-sans text-gray-800">
        <Navbar />
        <main>
         
          <Routes>
            <Route path="/" element={<CoursesPage />} />
            <Route path="/home" element={<CoursesPage />} />
            <Route path='/courses' element={<Courses/>}/>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/live-sessions" element={<LiveSessionsPage />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/contact" element={<ContactPage />} />
            { /* Home page - tracklist dynamic routing */ }
            <Route path="/track/:trackName" element={<Trackdetails />} />
            <Route path ='/progressupdate' element={<MyCoursesPage/>}/>
            
          
          </Routes>
        </main>
        
      </div>
    </Router>
  );
}

export default App;

