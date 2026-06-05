import React, { useState } from 'react';

const REVIEWS_DATA = [
  {
    id: 1,
    name: 'Aarav Sharma',
    avatar: '👦',
    rating: 5,
    tag: 'kids',
    date: 'May 28, 2026',
    comment: 'The rainbow cake pops are the best! They look like colorful balloons and taste like sweet vanilla ice cream. I ate three of them!',
    itemRef: 'Kids Rainbow Cake Pops'
  },
  {
    id: 2,
    name: 'Retired Prof. Verma',
    avatar: '👴',
    rating: 5,
    tag: 'elderly',
    date: 'June 01, 2026',
    comment: 'Finding freshly baked sourdough bread that is easy on my senior digestion is rare. RajCafe\'s sourdough has a beautiful crust and is very light. The sugar-free cardamom rusk is perfect for my afternoon tea.',
    itemRef: 'Rustic Sourdough Loaf'
  },
  {
    id: 3,
    name: 'Priya Malhotra',
    avatar: '👩',
    rating: 5,
    tag: 'family',
    date: 'May 15, 2026',
    comment: 'I ordered a batch of eggless cookies and chocolate truffles for my kids weekend birthday party. Everyone, including the parents, loved how clean and natural they tasted. Excellent hygiene packaging!',
    itemRef: 'Melty Choco-Chip Cookies'
  },
  {
    id: 4,
    name: 'Siddharth Sen',
    avatar: '👨',
    rating: 5,
    tag: 'bakery',
    date: 'June 03, 2026',
    comment: 'The hazelnut praline bonbons are an absolute masterpiece. The tempering is perfect, the gold leaf dust looks ultra-premium, and they pair wonderfully with my dark espresso.',
    itemRef: 'Hazelnut Praline Bonbons'
  },
  {
    id: 5,
    name: 'Dr. Anjali Mehta',
    avatar: '👩‍⚕️',
    rating: 5,
    tag: 'elderly',
    date: 'May 20, 2026',
    comment: 'As a nutritionist, I am highly impressed by their sugar-free almond bars. Sweetened with stevia and made with pure cacao butter, it is a healthy treat I frequently recommend to diabetic seniors.',
    itemRef: 'Sugar-Free Almond Bar'
  },
  {
    id: 6,
    name: 'Karan Mehra',
    avatar: '👨',
    rating: 4,
    tag: 'bakery',
    date: 'May 10, 2026',
    comment: 'The butter croissants are beautifully flaky, warm, and rich. Reminds me of Parisian cafes! Will definitely pre-order again for my Sunday breakfast.',
    itemRef: 'Golden Butter Croissant'
  }
];

export default function Reviews() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredReviews = activeFilter === 'all'
    ? REVIEWS_DATA
    : REVIEWS_DATA.filter(r => r.tag === activeFilter);

  return (
    <section className="section-padding" style={{ paddingTop: '120px' }}>
      <div className="container animate-fade-in-up">
        {/* Section Header */}
        <div className="section-header">
          <span className="gold-badge">Customer Love</span>
          <h2>RajCafe Reviews</h2>
          <p>Read honest reviews from our neighborhood families, kids, and beloved grandparents who enjoy our fresh cafe creations.</p>
        </div>

        {/* Review Stats Dashboard */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px', marginBottom: '50px' }} className="detail-layout-grid">
          
          {/* Average Rating Panel */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-secondary)' }}>AVERAGE RATING</span>
            <span style={{ fontSize: '4.5rem', fontWeight: 800, color: 'var(--accent-berry)', fontFamily: 'var(--font-family-serif)', lineHeight: '1.1' }}>4.9</span>
            <span style={{ fontSize: '1.5rem', color: 'var(--accent-gold)' }}>★★★★★</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>Based on 140+ home orders</span>
          </div>

          {/* Rating Bars Panel */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyItems: 'center', gap: '12px', padding: '25px var(--spacing-md)' }}>
            <h4 style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 700, fontSize: '1.1rem', textAlign: 'left', marginBottom: '8px' }}>Review Summary</h4>
            
            {/* 5 Stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ width: '60px', fontSize: '0.9rem', textAlign: 'left', fontWeight: 500 }}>5 Star</span>
              <div style={{ flexGrow: 1, height: '8px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ width: '92%', height: '100%', backgroundColor: 'var(--accent-gold)' }}></div>
              </div>
              <span style={{ width: '40px', fontSize: '0.9rem', textAlign: 'right', fontWeight: 600 }}>92%</span>
            </div>

            {/* 4 Stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ width: '60px', fontSize: '0.9rem', textAlign: 'left', fontWeight: 500 }}>4 Star</span>
              <div style={{ flexGrow: 1, height: '8px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ width: '7%', height: '100%', backgroundColor: 'var(--accent-gold)' }}></div>
              </div>
              <span style={{ width: '40px', fontSize: '0.9rem', textAlign: 'right', fontWeight: 600 }}>7%</span>
            </div>

            {/* 3 Stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ width: '60px', fontSize: '0.9rem', textAlign: 'left', fontWeight: 500 }}>3 Star</span>
              <div style={{ flexGrow: 1, height: '8px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ width: '1%', height: '100%', backgroundColor: 'var(--accent-gold)' }}></div>
              </div>
              <span style={{ width: '40px', fontSize: '0.9rem', textAlign: 'right', fontWeight: 600 }}>1%</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filter-tabs">
          <button onClick={() => setActiveFilter('all')} className={`tab-btn ${activeFilter === 'all' ? 'active' : ''}`}>All Reviews</button>
          <button onClick={() => setActiveFilter('kids')} className={`tab-btn ${activeFilter === 'kids' ? 'active' : ''}`}>Kids Corner 👦</button>
          <button onClick={() => setActiveFilter('elderly')} className={`tab-btn ${activeFilter === 'elderly' ? 'active' : ''}`}>Seniors Choice 👵</button>
          <button onClick={() => setActiveFilter('family')} className={`tab-btn ${activeFilter === 'family' ? 'active' : ''}`}>Family & Parties 👩‍👩‍👦</button>
          <button onClick={() => setActiveFilter('bakery')} className={`tab-btn ${activeFilter === 'bakery' ? 'active' : ''}`}>Coffee & Bakery Pairs ☕</button>
        </div>

        {/* Reviews Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
          {filteredReviews.map((review) => (
            <div key={review.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '2rem' }}>{review.avatar}</span>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 700, fontSize: '1rem' }}>{review.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{review.date}</span>
                  </div>
                </div>
                <span style={{ color: 'var(--accent-gold)' }}>
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </span>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', flexGrow: 1 }}>
                "{review.comment}"
              </p>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Reviewed Product:</span>
                <span className="tag-label" style={{ fontSize: '0.7rem', fontWeight: 600, backgroundColor: 'var(--accent-gold-light)', color: 'var(--text-primary)' }}>
                  {review.itemRef}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
