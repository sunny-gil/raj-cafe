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
              <span className="gold-badge">Chocolatier & Boulangerie</span>
              <span className="gold-badge secondary" style={{ marginLeft: '10px' }}>Artisanal Craftsmanship</span>
            </div>
            <h1 className="hero-title">
              The Art of Pure Chocolate &
              <span>Bespoke Baking</span>
            </h1>
            <p className="hero-description">
              Meticulously hand-tempered single-origin cacao and slow-fermented organic breads. An elite gastronomic experience crafted with absolute ingredient transparency and zero compromises.
            </p>
            <div className="hero-actions">
              <button onClick={onExploreClick} className="btn-gold">
                Discover Collection 🍰
              </button>
              <button onClick={onBuildClick} className="btn-premium">
                Curate Bespoke Box 🎁
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
        <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
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
          <div className="feature-card">
            <div className="feature-icon-wrapper flex-center">🔍</div>
            <h3>100% Transparency</h3>
            <p>Every single product comes with a full, honest list of ingredients. No hidden chemicals.</p>
          </div>
        </div>
      </div>
    </header>
  );
}
