import React, { useState } from 'react';
import './Login.css';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    // Add authentication logic here
  };

  return (
    <div className="login-container">
      <h1>Login Here</h1>

      <form className="login-content" onSubmit={handleSubmit}>
        <label htmlFor="email">Email*</label>
        <input
          type="text"
          value={email}
          id="email"
          name="email"
          placeholder="Enter your Registered Email"
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password*</label>
        <input
          type="password"
          value={password}
          id="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
          required
        />
        <a href="/forgot-password" className="forgot-password">
          Forgot Password
        </a>
        <button type="submit" className="login-btn">
          Login Here
        </button>
      </form>
      <p className="register-link">
        Don't have an account? <a href="/register">Register Here</a>
      </p>

      <button className="google-btn">
        <FaGoogle />
        Sign In Google
      </button>
    </div>
  );
};

export default Login;
