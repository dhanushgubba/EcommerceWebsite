import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const checkPasswordStrength = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    const strength = [
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isLongEnough,
    ].filter(Boolean).length;

    if (strength < 3) return 'weak';
    if (strength < 4) return 'medium';
    return 'strong';
  };

  const handleSendOTP = async () => {
    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8082/otp/generate?email=${email}`,
        { method: 'POST' }
      );
      const message = await response.text();
      alert(message);
      setOtpSent(true);
      setIsOtpVerified(false); // Reset OTP verification status
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send OTP');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await fetch(
        `http://localhost:8082/otp/verify?email=${email}&otp=${otp}`,
        { method: 'POST' }
      );
      const message = await response.text();
      alert(message);
      if (message.toLowerCase().includes('verified')) {
        setIsOtpVerified(true);
      } else {
        setIsOtpVerified(false);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to verify OTP');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isOtpVerified) {
      alert('Please verify the OTP before registering.');
      return;
    }
    if (
      !firstname ||
      !lastname ||
      !email ||
      !phone ||
      !password ||
      !repassword
    ) {
      alert('All fields are required.');
      return;
    }
    if (!validateEmail(email)) {
      alert('Invalid email format.');
      return;
    }
    if (password !== repassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      setIsSubmitting(true);
      const userResponse = await fetch('http://localhost:8082/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, email, phone, password }),
      });
      const userMessage = await userResponse.text();
      alert(userMessage);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setOtp('');
      setPassword('');
      setRePassword('');
      setOtpSent(false);
      setIsOtpVerified(false);
      setPasswordStrength('');
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <h1>Register Here</h1>
      <form className="register-content" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            name="firstname"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="lastname">Last Name</label>

          <input
            type="text"
            name="lastname"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <button
          className="otp-button"
          type="button"
          onClick={handleSendOTP}
          disabled={otpSent}
        >
          {otpSent ? 'OTP Sent' : 'Send OTP'}
        </button>
        <div className="input-group">
          {otpSent && (
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
            />
          )}
          {otpSent && (
            <button
              className="otp-buttons"
              type="button"
              onClick={handleVerifyOTP}
              disabled={isOtpVerified}
            >
              {isOtpVerified ? 'OTP Verified' : 'Verify OTP'}
            </button>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordStrength(checkPasswordStrength(e.target.value));
            }}
            placeholder="Password"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="repassword">Confirm Password</label>
          <small>Password strength: {passwordStrength}</small>
          <input
            type="password"
            name="repassword"
            value={repassword}
            onChange={(e) => setRePassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
        </div>
        <button
          className="submit-button"
          type="submit"
          disabled={isSubmitting || !isOtpVerified}
        >
          {isSubmitting ? 'Registering...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default Register;
