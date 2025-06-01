import React, { useState } from 'react';
import '../assets/style/Login.css';
import logo4 from '../assets/img/logo4.jpg';
import logo3 from '../assets/img/logo3.jpg';
import logo2 from '../assets/img/logo2.svg';
import { useNavigate } from 'react-router-dom';
import img from '../assets/img/imgheader.png';

export default function Register() {
 

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

  };

  return (
   <div className='contain_both'>
    <img className='contain_both_img' src={img} alt='img' />
     <div className="container1">
      <div className="wrapper1">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>

          <div className="login_img1">
            <img src={logo4} alt="Logo 1" />
            <img src={logo3} alt="Logo 2" />
            <img src={logo2} alt="Logo 3" />
          </div>

          <div className="input-box1">
            <input
              name="fullName"
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box1">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box1">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box1">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <br />

          <button type="submit" className="btn1">Register</button>

          <div className="register-link1">
            <a href="#">Forget password?</a>
          </div>
          <div className="register-link1">
            <p>Already have an account? <a  >Login</a></p>
          </div>
        </form>
      </div>
    </div>
   </div>
  );
}
