import React, { useState } from 'react';
import '../assets/style/Login.css';
import logo4 from '../assets/img/logo4.jpg';
import logo3 from '../assets/img/logo3.jpg';
import logo2 from '../assets/img/logo2.svg';
import { useNavigate } from 'react-router-dom';
import img from '../assets/img/imgheader.png';


export default function Login({setLogin}) {
        const navigate =useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
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
      alert('Login successful!');
      // Optionally save token: localStorage.setItem('token', data.token);
      navigate('/'); // or wherever you want to redirect
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (err) {
    alert('Error: ' + err.message);
  }
};

  return (
   <div className='contain_both'>
    <img className='contain_both_img' src={img} alt='img' />
     <div className="container1">
      <div className="wrapper1">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>

          <div className="login_img1">
            <img src={logo4} alt="Logo 1" />
            <img src={logo3} alt="Logo 2" />
            <img src={logo2} alt="Logo 3" />
          </div>

          <div className="input-box1">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box1">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>

          <br />

          <button type="submit" className="btn1">Login</button>

          <div className="register-link1">
            <a href="#">Forget password?</a>
          </div>
          <div className="register-link1">
            <p>Don't have an account? <a onClick={()=>navigate("/Register")}>Register</a></p>
          </div>
        </form>
      </div>
    </div>
   </div>
  );
}
