import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="title-bar">
        <div className="scroll-container">
          <span>New Offers are coming soon... </span>
          <span>Special Deals await you... </span>
          <span>Stay tuned for updates... </span>
          <span>Exclusive Discounts this season... </span>
          <span>Shop Now and Save More! </span>
        </div>
      </div>

      <div className="hero">
        <h1>Welcome to our Store</h1>
        <a href="/login">
          <button className="shop-btn">Shop Now</button>
        </a>
      </div>
    </div>
  );
};

export default Home;
