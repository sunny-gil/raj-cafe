import React from 'react';

export default function Footer() {
  const handleFooterLinkClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Logo & Info column */}
          <div className="footer-col" style={{ gridColumn: 'span 1.5' }}>
            <div className="footer-logo">🍫 RajCafe</div>
            <p className="footer-desc">
              Your neighborhood kitchen crafting premium, homemade chocolates and fresh bakery items. We bake with love, care, and the best quality local ingredients, catering to every generation of your family.
            </p>
            <div className="social-links">
              <a href="#" className="social-btn" aria-label="Instagram">📸</a>
              <a href="#" className="social-btn" aria-label="Facebook">📘</a>
              <a href="#" className="social-btn" aria-label="WhatsApp">💬</a>
            </div>
          </div>

          {/* Site Navigation column */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home" onClick={(e) => handleFooterLinkClick(e, 'home')}>Home</a></li>
              <li><a href="#products" onClick={(e) => handleFooterLinkClick(e, 'products')}>Our Delights</a></li>
              <li><a href="#builder" onClick={(e) => handleFooterLinkClick(e, 'builder')}>Box Builder</a></li>
              <li><a href="#story" onClick={(e) => handleFooterLinkClick(e, 'story')}>Our Story</a></li>
              <li><a href="#order" onClick={(e) => handleFooterLinkClick(e, 'order')}>Order Now</a></li>
            </ul>
          </div>

          {/* Timings column */}
          <div className="footer-col">
            <h4>Baking Hours</h4>
            <ul className="footer-hours-list">
              <li>Monday - Saturday: <span>9:00 AM - 8:00 PM</span></li>
              <li>Sunday: <span>10:00 AM - 6:00 PM</span></li>
              <li>Fresh Morning Delivery: <span>From 8:30 AM</span></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom copyright */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} RajCafe. All rights reserved. Made with love for community.</p>
          <div className="footer-bottom-links">
            <a href="#" style={{ color: '#8c7263' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#8c7263' }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
