import React, { useState, useContext } from 'react';
import '../assets/style/Login.css'; 
import logo4 from '../assets/img/logo4.jpg';
import logo3 from '../assets/img/logo3.jpg';
import logo2 from '../assets/img/logo2.svg';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../pages/AuthContext';
import { motion } from 'framer-motion';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('authToken', data.token);
        const selectedRole = localStorage.getItem("selectedRole");
        const enrolledRes = await fetch(`/api/courses/enrolled-users/${data.user._id}`, {
          headers: {
            'Authorization': `Bearer ${data.token}`,
            'Content-Type': 'application/json'
          }
        });

        const enrolledCourses = enrolledRes.ok ? await enrolledRes.json() : [];
        login(data.user, data.token, enrolledCourses);

        if (selectedRole === 'student') {
          navigate('/home');
        } else if (selectedRole === 'instructor') {
          navigate('/instructor');
        } else if (selectedRole === 'admin') {
          navigate('/admin');
        } else {
          alert('Invalid role');
          navigate('/login');
        }
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className='bg-purple-50 min-h-screen flex items-center justify-center'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className='container_login'
      >
        <div className="formContainer_login">
          <motion.div
            className="formWrapper_login"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit}>
              <h1 className="heading_login">Login</h1>

              <div className="logoGroup_login">
                <img src={logo4} alt="Logo 1" />
                <img src={logo3} alt="Logo 2" />
                <img src={logo2} alt="Logo 3" />
              </div>

              <div className="inputBox_login">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="inputBox_login">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="submitBtn_login"
              >
                Login
              </motion.button>

              <div className="linkBox_login">
                <a href="#">Forget password?</a>
              </div>
              <div className="linkBox_login">
                <p>
                  Don't have an account?{' '}
                  <a onClick={() => navigate("/Register")}>Register</a>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
