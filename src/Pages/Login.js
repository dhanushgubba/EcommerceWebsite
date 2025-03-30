import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Email and Password are required.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8082/user/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.text();

      if (!response.ok) {
        throw new Error('Invalid email or password.');
      }

      if (data.startsWith('200::')) {
        const token = data.split('200::')[1];
        localStorage.setItem('token', token);
        alert('Login successful!');
        navigate('/home');
      } else {
        throw new Error('Invalid Credentials.');
      }
    } catch (error) {
      setError(error.message || 'Something went wrong. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Login Here</h1>

      <form className="login-content" onSubmit={handleSubmit}>
        <label htmlFor="email">Email*</label>
        <input
          type="email"
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
          Forgot Password?
        </a>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login Here'}
        </button>
      </form>

      <p className="register-link">
        Don't have an account? <a href="/register">Register Here</a>
      </p>

      <button className="google-btn">
        <FaGoogle />
        Sign In with Google
      </button>
    </div>
  );
};

export default Login;
