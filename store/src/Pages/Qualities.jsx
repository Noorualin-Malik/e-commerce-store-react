
import React from 'react';
import { FaShippingFast, FaLock, FaTags, FaHeadset } from 'react-icons/fa';
import './Qualities.css';

const Qualities = () => {
  return (
    <section className="qualities-section">
      <h2 className="section-title">Why Shop With Us?</h2>
      <div className="cards-container">
        <div className="quality-card">
          <FaShippingFast className="icon" />
          <h3>Fast Shipping</h3>
          <p>We deliver your products quickly and reliably to your doorstep.</p>
        </div>
        <div className="quality-card">
          <FaLock className="icon" />
          <h3>Secure Payments</h3>
          <p>Your transactions are protected with industry-grade security.</p>
        </div>
        <div className="quality-card">
          <FaTags className="icon" />
          <h3>Best Deals</h3>
          <p>Affordable prices and frequent discounts on top products.</p>
        </div>
        <div className="quality-card">
          <FaHeadset className="icon" />
          <h3>24/7 Support</h3>
          <p>Our support team is always here to help you out.</p>
        </div>
      </div>
    </section>
  );
};

export default Qualities;
