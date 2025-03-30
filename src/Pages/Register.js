import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');

  const [otpSent, setOtpSent] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'firstname':
        setFirstName(value);
        break;
      case 'lastname':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'otp':
        setOtp(value);
        break;
      case 'password':
        setPassword(value);
        setPasswordStrength(value ? checkPasswordStrength(value) : '');
        break;
      case 'repassword':
        setRePassword(value);
        break;
      default:
        break;
    }
  };

  const handleSendOTP = () => {
    if (!validatePhone(phone)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    setOtpSent(true);
    alert('OTP sent successfully!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !firstname ||
      !lastname ||
      !email ||
      !phone ||
      !otp ||
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

    if (!validatePhone(phone)) {
      alert('Invalid phone number.');
      return;
    }

    if (password !== repassword) {
      alert('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    console.log({ firstname, lastname, email, phone, otp, password });

    setTimeout(() => {
      alert('Registration successful!');
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="register-container">
      <h1>Register Here</h1>
      <form className="register-content" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="firstname">First Name*</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={firstname}
            onChange={handleChange}
            placeholder="Enter your First Name"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="lastname">Last Name*</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={lastname}
            onChange={handleChange}
            placeholder="Enter your Last Name"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your Email"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="phone">Phone*</label>
          <div className="otp-container">
            <select
              name="country-code"
              id="country-code"
              required
              className="country-code"
            >
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="phone-input"
            />
            <button
              type="button"
              className="otp-button"
              onClick={handleSendOTP}
              disabled={otpSent}
            >
              {otpSent ? 'OTP Sent' : 'Send OTP'}
            </button>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="otp">OTP*</label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={handleChange}
            placeholder="Enter the OTP"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter your Password"
            required
          />
          <small>Password strength: {passwordStrength}</small>
        </div>

        <div className="input-group">
          <label htmlFor="repassword">Confirm Password*</label>
          <input
            type="password"
            id="repassword"
            name="repassword"
            value={repassword}
            onChange={handleChange}
            placeholder="Confirm your Password"
            required
          />
        </div>

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>
        <p className="register-link">
          Already have an account? <a href="/login">Login Here</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
