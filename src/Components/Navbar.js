import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons
import './Navbar.css';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div className="container">
      <a href="/">
        <h2 className="name-container">SRI SAI ENTERPRISES</h2>
      </a>

      <div className="hamburger" onClick={() => setIsMobile(!isMobile)}>
        {isMobile ? <FaTimes /> : <FaBars />}
      </div>

      <div className={isMobile ? 'nav-links mobile-menu' : 'nav-links'}>
        <Link to="/" onClick={() => setIsMobile(false)}>
          Home
        </Link>
        <Link to="/about" onClick={() => setIsMobile(false)}>
          About
        </Link>
        <Link to="/products" onClick={() => setIsMobile(false)}>
          Products
        </Link>
        <Link to="/contact" onClick={() => setIsMobile(false)}>
          Contact
        </Link>
        <button className="btn-login" onClick={() => setIsMobile(false)}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
