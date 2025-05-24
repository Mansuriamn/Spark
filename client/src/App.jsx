import React from 'react'
import Navbar from './assets/Models/Navbar'
import Wel from './assets/Models/Wel'

import Dashboard from './assets/sections/dashboard'
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Courses from './assets/pages/Courses'


const App  = () => {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Wel />
            <Dashboard />
          </>
        } />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </Router>
    </>
  )
}

export default App