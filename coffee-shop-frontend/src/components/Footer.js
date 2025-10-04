import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

// You'll need to install Font Awesome if you haven't already
// npm install @fortawesome/fontawesome-svg-core @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="container py-4">
        <div className="row">
          {/* About Us */}
          <div className="col-md-3">
            <h5>About Us</h5>
            <ul className="list-unstyled">
              <li><Link to="/about" className="footer-link">Our Company</Link></li>
              <li><Link to="/our-coffee" className="footer-link">Our Coffee</Link></li>
              <li><Link to="/archive" className="footer-link">Archive</Link></li>
              <li><Link to="/investor" className="footer-link">Investor Relations</Link></li>
              <li><Link to="/customer-service" className="footer-link">Customer Service</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
            </ul>
          </div>

          {/* Careers */}
          <div className="col-md-3">
            <h5>Careers</h5>
            <ul className="list-unstyled">
              <li><Link to="/culture" className="footer-link">Culture and Values</Link></li>
              <li><Link to="/diversity" className="footer-link">Belonging at Coffee Hop</Link></li>
              <li><Link to="/college-plan" className="footer-link">College Achievement Plan</Link></li>
              <li><Link to="/alumni" className="footer-link">Alumni Community</Link></li>
              <li><Link to="/us-careers" className="footer-link">U.S. Careers</Link></li>
              <li><Link to="/int-careers" className="footer-link">International Careers</Link></li>
            </ul>
          </div>

          {/* Social Impact */}
          <div className="col-md-3">
            <h5>Social Impact</h5>
            <ul className="list-unstyled">
              <li><Link to="/communities" className="footer-link">Communities</Link></li>
              <li><Link to="/foundation" className="footer-link">Coffee Hop Foundation</Link></li>
              <li><Link to="/sustainability" className="footer-link">Sustainability</Link></li>
              <li><Link to="/environment" className="footer-link">Environmental Impact</Link></li>
            </ul>
          </div>

          {/* Order and Pick Up */}
          <div className="col-md-3">
            <h5>Order and Pick Up</h5>
            <ul className="list-unstyled">
              <li><Link to="/order-app" className="footer-link">Order on the App</Link></li>
              <li><Link to="/order-web" className="footer-link">Order on the Web</Link></li>
              <li><Link to="/delivery" className="footer-link">Delivery</Link></li>
              <li><Link to="/pickup" className="footer-link">Order and Pick Up Options</Link></li>
              <li><Link to="/find-coffee" className="footer-link">Explore and Find Coffee</Link></li>
            </ul>
          </div>
        </div>
        <hr className="my-4" />
        <div className="d-flex justify-content-between align-items-center">
          <div className="social-icons">
            <a href="#" className="me-3"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="#" className="me-3"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
          </div>
          <small className="text-muted">© 2025 Coffee Hop Company. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;