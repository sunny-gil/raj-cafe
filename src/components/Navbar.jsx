import React, { useState } from 'react';

export default function Navbar({ currentPage, setCurrentPage, cartCount, isAccessibilityMode, toggleAccessibility }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e, pageName, anchor = null) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (currentPage.name !== pageName) {
      setCurrentPage({ name: pageName, anchor });
    } else if (anchor) {
      const element = document.getElementById(anchor);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        window.scrollTo({
          top: elementRect - bodyRect - offset,
          behavior: 'smooth'
        });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="logo-wrapper">
          <span style={{ fontSize: '2rem' }}>🍫</span>
          <div className="logo-text">RajCafe</div>
        </a>

        {/* Desktop Links */}
        <ul className="nav-links">
          <li>
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, 'home')} 
              className={`nav-link ${currentPage.name === 'home' && !currentPage.anchor ? 'active' : ''}`}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#products" 
              onClick={(e) => handleNavClick(e, 'products')} 
              className={`nav-link ${currentPage.name === 'products' ? 'active' : ''}`}
            >
              Collection
            </a>
          </li>
          <li>
            <a 
              href="#builder" 
              onClick={(e) => handleNavClick(e, 'home', 'builder')} 
              className={`nav-link ${currentPage.anchor === 'builder' ? 'active' : ''}`}
            >
              Bespoke Box
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              onClick={(e) => handleNavClick(e, 'about')} 
              className={`nav-link ${currentPage.name === 'about' ? 'active' : ''}`}
            >
              Our Heritage
            </a>
          </li>
          <li>
            <a 
              href="#reviews" 
              onClick={(e) => handleNavClick(e, 'reviews')} 
              className={`nav-link ${currentPage.name === 'reviews' ? 'active' : ''}`}
            >
              Reviews
            </a>
          </li>
          <li>
            <a 
              href="#blogs" 
              onClick={(e) => handleNavClick(e, 'blogs')} 
              className={`nav-link ${currentPage.name === 'blogs' ? 'active' : ''}`}
            >
              The Journal
            </a>
          </li>
          <li>
            <a 
              href="#orders" 
              onClick={(e) => handleNavClick(e, 'orders')} 
              className={`nav-link ${currentPage.name === 'orders' ? 'active' : ''}`}
            >
              Orders
            </a>
          </li>
        </ul>

        {/* Actions (Accessibility & Cart) */}
        <div className="nav-actions">
          {/* Accessibility Mode Toggle */}
          <div className="access-control-panel" title="Elder/Readability Mode">
            <span className="access-btn-label">Elder Mode</span>
            <button 
              onClick={toggleAccessibility} 
              className={`btn-icon ${isAccessibilityMode ? 'active' : ''}`}
              style={{ 
                backgroundColor: isAccessibilityMode ? 'var(--accent-berry)' : 'var(--bg-secondary)',
                color: isAccessibilityMode ? '#ffffff' : 'var(--text-primary)',
                border: '1px solid var(--accent-gold)'
              }}
              aria-label="Toggle Senior-Friendly Large Text Mode"
            >
              🔎
            </button>
          </div>

          {/* Cart Indicator */}
          <a href="#order" onClick={(e) => handleNavClick(e, 'home', 'order')} className="btn-icon" aria-label="Cart">
            🛒
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </a>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="btn-icon mobile-menu-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="mobile-nav animate-fade-in-up">
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="nav-link">Home</a>
          <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="nav-link">Collection</a>
          <a href="#builder" onClick={(e) => handleNavClick(e, 'home', 'builder')} className="nav-link">Bespoke Box</a>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="nav-link">Our Heritage</a>
          <a href="#reviews" onClick={(e) => handleNavClick(e, 'reviews')} className="nav-link">Reviews</a>
          <a href="#blogs" onClick={(e) => handleNavClick(e, 'blogs')} className="nav-link">The Journal</a>
          <a href="#orders" onClick={(e) => handleNavClick(e, 'orders')} className="nav-link">Orders</a>
        </div>
      )}
    </nav>
  );
}
