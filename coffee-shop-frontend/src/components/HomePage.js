import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';
import './HomePage.css';
import logo from '../assets/logo.png';
import AnimatedCoffeeCup from './AnimatedCoffeeCup';
import OfferCarousel from './OfferCarousel';
import Cart from './Cart';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  const { user, setUser } = useContext(UserContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Contact Bar */}
      <div className="bg-dark text-white p-2 text-center">
        <span>Mobile: +91 98765 43210</span> | <span>Delhi Locations: Rohini, Pitampura, Dwarka</span> | <span>Noida Locations: Sec 60, 40, 66</span>
      </div>

      {/* Navigation Bar for all pages */}
      <nav className={`navbar navbar-expand-lg navbar-light bg-light sticky-top ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><img src={logo} alt="Coffee Hop Logo" className="navbar-logo" /></Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Main Navigation Links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/menu">Menu</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/book-table">Book a Table</Link>
              </li>
            </ul>
            {/* Conditional User Links */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <FontAwesomeIcon icon={faShoppingCart} />
                  {cartItems.length > 0 && (
                    <span className="badge rounded-pill bg-primary ms-1">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </li>
              {user ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link text-success">Hello, {user.name}!</span>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/settings">My Account</Link>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="p-5 mb-4 rounded-3 hero-section">
        <div className="container-fluid py-5 text-center hero-text">
          <AnimatedCoffeeCup />
          <h1 className="display-5 fw-bold">Welcome to Coffee Hop!</h1>
          <p className="col-md-8 fs-4 mx-auto">
            Discover our finest coffee, book a table, and enjoy a fresh brew.
          </p>
          <Link className="btn btn-primary btn-lg" to="/register">Get Started</Link>
        </div>
      </div>

      {/* Latest Offers Section */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Latest Offers</h2>
        <OfferCarousel />
      </div>

      {/* Cart Display Section */}
      <div className="container mt-5">
        <Cart />
      </div>
    </div>
  );
};

export default HomePage;