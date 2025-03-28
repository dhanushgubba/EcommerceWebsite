// Home.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css';

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600, // Slightly slower transition for smoother feel
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // Increased to give users more time to view
    arrows: true, // Enabled arrows for manual navigation
    pauseOnHover: true, // Pause on hover for better UX
    fade: true, // Added fade effect for smoother transitions
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false, // Hide arrows on mobile
          dots: true,
        },
      },
    ],
  };

  // Sample images array (replace with your actual images)
  const slides = [
    {
      src: 'https://m.media-amazon.com/images/I/61P03gJaylL.jpg',
      alt: 'Premium Beauty Products',
      caption: 'Discover Luxury Beauty',
    },
    {
      src: 'https://www.mediainfoline.com/wp-content/uploads/2024/11/Yardley-London-Beauty-Talc-.jpg',
      alt: 'Quality Skincare Range',
      caption: 'Nourish Your Skin',
    },
    {
      src: 'https://www.mediainfoline.com/wp-content/uploads/2024/11/Yardley-London-Beauty-Talc-.jpg',
      alt: 'Elegant Fragrances',
      caption: 'Experience True Elegance',
    },
  ];

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Sri Sai Enterprises</h1>

      <div className="carousel-container">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="slide-wrapper">
              <img src={slide.src} alt={slide.alt} className="carousel-image" />
              <div className="slide-caption">
                <p>{slide.caption}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;
