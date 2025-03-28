import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
const Navbar = () => {
  return (
    <div className="container">
      <h2 className="name-container">SRI SAI ENTERPRISES</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact</Link>
        <button className="btn-login">Login</button>
      </div>
    </div>
  );
};
export default Navbar;
