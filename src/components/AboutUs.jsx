import React from 'react';
import storyImage from '../assets/chocolate_story.png';

export default function AboutUs() {
  return (
    <section className="section-padding" style={{ paddingTop: '120px' }}>
      <div className="container animate-fade-in-up">
        {/* Section Header */}
        <div className="section-header">
          <span className="gold-badge">Since 2026</span>
          <h2>The RajCafe Story</h2>
          <p>Handcrafting gourmet bakery delights and tempering artisanal chocolates from our home kitchen in Mumbai.</p>
        </div>

        {/* Story Intro */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', alignItems: 'center', marginBottom: '60px' }} className="detail-layout-grid">
          <div>
            <img 
              src={storyImage} 
              alt="Hands mixing premium dark chocolate" 
              style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '2rem', marginBottom: '15px' }}>Baking Happiness, One Batch at a Time</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '15px', fontSize: '1.05rem', lineHeight: '1.7' }}>
              RajCafe was founded in 2026 by a family of chocolate enthusiasts and bakers who wanted to provide pure, preservative-free, and gourmet alternatives to mass-produced sweets. Every chocolate truffe is hand-tempered, and every loaf of sourdough is slow-fermented for 24 hours.
            </p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '1.05rem', lineHeight: '1.7' }}>
              We take pride in our 100% hygienic home-kitchen standards, using organic wheat flour, fresh dairy butter, and single-origin cocoa beans sourced responsibly.
            </p>
            <div style={{ padding: '15px 20px', backgroundColor: 'var(--accent-gold-light)', borderLeft: '4px solid var(--accent-gold)', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Our Sanitation Guarantee:</span>
              <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                FSSAI Registered kitchen, sanitized thrice daily, contact-free packaging, and temperature-controlled delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Age Group Craft Philosophy Cards */}
        <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '2.2rem', marginBottom: '30px', textAlign: 'center' }}>Crafted for Every Generation</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '60px' }}>
          
          {/* Kids Card */}
          <div className="glass-panel" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '2.5rem' }}>🎈</div>
            <h4 style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 700, fontSize: '1.25rem' }}>Kids' Sparkle & Safety</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              We know children love bright, fun treats! That's why we use only natural fruit colorings (like beetroot, turmeric, and blue spirulina extracts) and low-sugar formulas. No artificial preservatives or flavorings are ever allowed.
            </p>
          </div>

          {/* Adults Card */}
          <div className="glass-panel" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '2.5rem' }}>☕</div>
            <h4 style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 700, fontSize: '1.25rem' }}>Gourmet Connoisseur Quality</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              For our chocolate aficionados, we source single-origin dark cocoa beans and carry out precise tempering processes to get that perfect snap and luxurious melt. Our pastries utilize premium Normandy butter and gourmet spices.
            </p>
          </div>

          {/* Seniors Card */}
          <div className="glass-panel" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '2.5rem' }}>👵</div>
            <h4 style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 700, fontSize: '1.25rem' }}>Elderly Health & Integrity</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Elders deserve the best taste without any health worries. We offer eggless variants, sugar-free chocolates sweetened with organic Stevia, and long-fermentation sourdough breads that are low-GI and exceptionally light on digestion.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
