import React, { useState } from 'react';
import storyImage from '../assets/chocolate_story.png';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "RajCafe's rainbow cake pops are my absolute favorite! They look like colorful balloons and are so tasty. I want them for all my birthdays!",
    author: "Aarav Sharma",
    role: "Happy Kid, Age 7"
  },
  {
    id: 2,
    quote: "Finding high-quality, eggless pastries and pure handmade chocolates that don't use chemicals or artificial preservatives is very rare. RajCafe is a complete blessing for our family weekends.",
    author: "Priya Malhotra",
    role: "Mother of Two"
  },
  {
    id: 3,
    quote: "Their slow-fermented sourdough bread and sugar-free dark cocoa bars are exceptional. Very easy on my stomach, not sugary, yet full of rich traditional flavor. Highly recommended for elders.",
    author: "Retired Prof. Verma",
    role: "Sourdough Enthusiast, Age 68"
  }
];

export default function OurStory() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="story" className="section-padding story-section">
      <div className="container">
        {/* Story Grid */}
        <div className="story-grid">
          {/* Visual wrapper */}
          <div className="story-visual">
            <div className="story-img-container">
              <img 
                src={storyImage} 
                alt="Artisan baker handcrafting premium chocolates" 
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
            <div className="badge-wrapper-story">
              <span className="gold-badge">100% Hygienic Kitchen</span>
            </div>
          </div>

          {/* Text and quote wrapper */}
          <div className="story-text">
            <span className="gold-badge secondary">Since 2026</span>
            <h3 style={{ marginTop: '10px', fontFamily: 'var(--font-family-serif)' }}>Crafted Meticulously. Sourced Globally.</h3>
            
            <p>
              RajCafe was born out of a commitment to culinary excellence—a mission to elevate daily bread and chocolates into an art form.
            </p>
            
            <p>
              Our micro-batch workshop rejects industrial compromises. We source rare single-origin cacao from sustainably farmed estates in Ecuador, organic whole grains, and grass-fed Normandy butter, ensuring unmatched purity in every creation.
            </p>

            <div className="story-quote">
              "We believe gastronomy should bridge generations. Our recipes harmonize complex, deep flavors for gourmands with the gentle dietary needs of our elders."
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
              🥐 Viennoiserie • 🍫 Bean-to-Bar Cacao • 🍯 Stevia & Natural Sweeteners • 🥚 Certified Eggless Range
            </p>
          </div>
        </div>

        {/* Testimonials Carousel wrapper */}
        <div className="section-padding" style={{ paddingBottom: 0 }}>
          <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <span className="quote-icon">“</span>
            
            <div className="testimonial-card">
              <p className="testimonial-content">
                {TESTIMONIALS[activeIdx].quote}
              </p>
              <h4 className="testimonial-author">
                {TESTIMONIALS[activeIdx].author}
              </h4>
              <span className="testimonial-role">
                {TESTIMONIALS[activeIdx].role}
              </span>
            </div>

            {/* Carousel Indicators */}
            <div className="carousel-indicators">
              {TESTIMONIALS.map((t, index) => (
                <button
                  key={t.id}
                  onClick={() => setActiveIdx(index)}
                  className={`indicator ${activeIdx === index ? 'active' : ''}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
