import React from 'react';
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
import AddLesson from './components/AddLesson';
import FreeCourseDetails from './components/Freecourse';
import LessonPageWrapper from './pages/LessonPage';
import WelcomePage from './pages/Mainpage';
import Student from './components/Seestudent';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRout';
import PaidCourseDetails from './components/Paidcourse';
import FreeCourse from './components/Ins_course';
import Quiz from './pages/Quiz';
const StudentDashboard = () => <div>Student Dashboard</div>;
const AdminDashboard = () => <div>Admin Dashboard</div>;

function AppWrapper() {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/login', '/register'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname.toLowerCase().trim());
  const selectedRole = localStorage.getItem("selectedRole");
  return (
    <div className="min-h-screen bg-purple-50 font-sans text-gray-800">
      {shouldShowNavbar && <Navbar />}
      <main>
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/meeting/:roomName" element={<WebRTCMeeting userName="Roshan" />} />
          <Route path="/home" element={<ProtectedRoute allowedRoles={['student']}><CoursesPage /></ProtectedRoute>} />
          <Route path="/courses" element={<ProtectedRoute allowedRoles={['student']}><Courses /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['student']}><DashboardPage /></ProtectedRoute>} />
          <Route path="/live-sessions" element={<ProtectedRoute allowedRoles={['student']}><LiveSessionsPage /></ProtectedRoute>} />
          <Route path="/schedule" element={<ProtectedRoute allowedRoles={['student']}><Schedule /></ProtectedRoute>} />

          {/*<Route path="/courses/:courseId/lesson/:lessonId" element={<ProtectedRoute allowedRoles={['student']}><LessonPageWrapper /></ProtectedRoute>} />*/}
          <Route path="/contest" element={<ProtectedRoute allowedRoles={['student']}><Contest /></ProtectedRoute>} />
          <Route path="/progressupdate" element={<ProtectedRoute allowedRoles={['student']}><MyCoursesPage /></ProtectedRoute>} />
          <Route path="/courses/:courseId/lesson/:lessonId" element={<ProtectedRoute allowedRoles={['student']}><VideoDashboard /></ProtectedRoute>} />
          <Route path="/practice" element={<ProtectedRoute allowedRoles={['student']}><Practice /></ProtectedRoute>} />
          <Route path="/practiceinside" element={<ProtectedRoute allowedRoles={['student']}><PathToProficiency /></ProtectedRoute>} />
          <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><Student /></ProtectedRoute>} />
          <Route path="/student-dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/track/:trackName" element={<ProtectedRoute allowedRoles={['student']}><FreeCourseDetails /></ProtectedRoute>} />
          <Route path="/courses/:courseId" element={<ProtectedRoute allowedRoles={['student']}><FreeCourseDetails /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><Admin /></ProtectedRoute>} />
          <Route path="/instructor-course" element={<ProtectedRoute allowedRoles={['instructor']}><FreeCourse /></ProtectedRoute>} />
          <Route path="/instructor" element={<ProtectedRoute allowedRoles={['instructor']}><InstructorDashboard /></ProtectedRoute>} />
          <Route path="/add-lesson/:courseId" element={<ProtectedRoute allowedRoles={['instructor']}><AddLesson /></ProtectedRoute>} />
          <Route path="/quiz/:id" element={<ProtectedRoute allowedRoles={['instructor']}><Quiz /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute allowedRoles={['student', 'admin', 'instructor']}><UserProfile /></ProtectedRoute>} />
          <Route path='/paidcourses/:courseId' element={<ProtectedRoute allowedRoles={['student', 'admin', 'instructor']}><PaidCourseDetails /></ProtectedRoute>}></Route>

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