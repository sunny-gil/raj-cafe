import React from 'react';
import heroImage from '../assets/hero_chocolate_bakery.png';

export default function Hero({ onExploreClick, onBuildClick }) {
  return (
    <header id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Content Column */}
          <div className="hero-content animate-fade-in-up">
            <div className="hero-tagline">
              <span className="gold-badge">Est. 2026</span>
              <span className="gold-badge secondary" style={{ marginLeft: '10px' }}>Pure & Homemade</span>
            </div>
            <h1 className="hero-title">
              Taste the Magic of
              <span>RajCafe</span>
            </h1>
            <p className="hero-description">
              Handcrafted with love from our home kitchen. We blend premium dark cocoa and local organic grains to bake gourmet delights perfect for playful kids, health-conscious parents, and beloved grandparents.
            </p>
            <div className="hero-actions">
              <button onClick={onExploreClick} className="btn-gold">
                Explore Menu 🍰
              </button>
              <button onClick={onBuildClick} className="btn-premium">
                Create Custom Box 🎁
              </button>
            </div>
          </div>

          {/* Visual Column */}
          <div className="hero-image-wrapper">
            <div className="hero-circle-bg"></div>
            <video 
              src="https://assets.mixkit.co/videos/preview/mixkit-pouring-hot-chocolate-in-slow-motion-3534-large.mp4" 
              poster={heroImage}
              className="hero-image animate-float"
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }}
              aria-label="Liquid chocolate pouring in slow motion loop"
            />
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper flex-center">🍫</div>
            <h3>100% Pure Cocoa</h3>
            <p>Rich, dark, and silky chocolates handmade with authentic single-origin cocoa beans.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper flex-center">🍞</div>
            <h3>Freshly Baked Daily</h3>
            <p>Crusty sourdoughs, melt-in-mouth croissants, and cookies baked fresh every morning.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper flex-center">🌱</div>
            <h3>Healthy & Elder Friendly</h3>
            <p>Special sugar-free chocolates, eggless bakes, and gluten-free breads made with utmost care.</p>
          </div>
        </div>
      </div>
    </header>
  );
}
