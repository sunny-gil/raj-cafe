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
    itemRef: 'Artisanal Dark Truffles'
  },
  {
    id: 5,
    name: 'Dr. Anjali Mehta',
    avatar: '👩‍⚕️',
    rating: 5,
    tag: 'elderly',
    date: 'May 20, 2026',
    comment: 'As a nutritionist, I am highly impressed by their sugar-free almond bars. Sweetened with stevia and made with pure cacao butter, it is a healthy treat I frequently recommend to diabetic seniors.',
    itemRef: 'Sugar-Free Almond & Raisin Bar'
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
  const [successMessage, setSuccessMessage] = useState('');
  
  // Initialize reviews from localStorage (custom reviews) combined with static data
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('rajcafe_reviews');
    if (saved) {
      try {
        const customReviews = JSON.parse(saved);
        return [...customReviews, ...REVIEWS_DATA];
      } catch (e) {
        console.error("Failed to parse saved reviews:", e);
        return REVIEWS_DATA;
      }
    }
    return REVIEWS_DATA;
  });

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    avatar: '👑',
    rating: 5,
    tag: 'family',
    comment: '',
    itemRef: 'Artisanal Dark Truffles'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Please enter your name.');
      return;
    }
    if (!formData.comment.trim()) {
      alert('Please write a review comment.');
      return;
    }

    const newReview = {
      id: `custom-review-${Date.now()}`,
      name: formData.name.trim(),
      avatar: formData.avatar,
      rating: Number(formData.rating),
      tag: formData.tag,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      comment: formData.comment.trim(),
      itemRef: formData.itemRef
    };

    // Add new review at the very top of the list
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);

    // Persist only custom reviews to localStorage
    const saved = localStorage.getItem('rajcafe_reviews');
    const customReviews = saved ? JSON.parse(saved) : [];
    localStorage.setItem('rajcafe_reviews', JSON.stringify([newReview, ...customReviews]));

    // Reset Form
    setFormData({
      name: '',
      avatar: '👑',
      rating: 5,
      tag: 'family',
      comment: '',
      itemRef: 'Artisanal Dark Truffles'
    });

    setSuccessMessage('Thank you! Your boutique review has been published.');
    setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
  };

  const filteredReviews = activeFilter === 'all'
    ? reviews
    : reviews.filter(r => r.tag === activeFilter);

  return (
    <section className="section-padding" style={{ paddingTop: '120px' }}>
      <div className="container animate-fade-in-up">
        {/* Section Header */}
        <div className="section-header">
          <span className="gold-badge">Customer Love</span>
          <h2>RajCafe Reviews</h2>
          <p>Read honest reviews from our neighborhood families, kids, and beloved grandparents who enjoy our fresh cafe creations.</p>
        </div>

        {/* Review Stats Dashboard & Submission Form */}
        <div className="reviews-dashboard-grid" style={{ marginBottom: '50px' }}>
          
          {/* Average Rating Panel */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>AVERAGE RATING</span>
            <span style={{ fontSize: '4.5rem', fontWeight: 800, color: 'var(--accent-berry)', fontFamily: 'var(--font-family-serif)', lineHeight: '1.1' }}>4.9</span>
            <span style={{ fontSize: '1.5rem', color: 'var(--accent-gold)' }}>★★★★★</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>Based on 140+ verified guests</span>
          </div>

          {/* Rating Bars Panel */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px', padding: '25px var(--spacing-sm)' }}>
            <h4 style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 700, fontSize: '1.1rem', textAlign: 'left', marginBottom: '8px' }}>Review Summary</h4>
            
            {/* 5 Stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ width: '60px', fontSize: '0.9rem', textAlign: 'left', fontWeight: 500 }}>5 Star</span>
              <div style={{ flexGrow: 1, height: '8px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ width: '94%', height: '100%', backgroundColor: 'var(--accent-gold)' }}></div>
              </div>
              <span style={{ width: '40px', fontSize: '0.9rem', textAlign: 'right', fontWeight: 600 }}>94%</span>
            </div>

            {/* 4 Stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ width: '60px', fontSize: '0.9rem', textAlign: 'left', fontWeight: 500 }}>4 Star</span>
              <div style={{ flexGrow: 1, height: '8px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ width: '5%', height: '100%', backgroundColor: 'var(--accent-gold)' }}></div>
              </div>
              <span style={{ width: '40px', fontSize: '0.9rem', textAlign: 'right', fontWeight: 600 }}>5%</span>
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

          {/* Submit Review Form Card */}
          <div className="glass-panel" style={{ padding: '25px', textAlign: 'left' }}>
            <h4 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.25rem', marginBottom: '15px', color: 'var(--text-primary)' }}>Share Your Experience</h4>
            
            {successMessage && (
              <div style={{ padding: '10px 15px', backgroundColor: 'var(--accent-gold-light)', borderLeft: '4px solid var(--accent-gold)', color: 'var(--text-primary)', fontSize: '0.9rem', borderRadius: '4px', marginBottom: '15px', fontWeight: 500 }}>
                ✨ {successMessage}
              </div>
            )}

            <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '10px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="rev-name" style={{ fontSize: '0.8rem' }}>Your Name</label>
                  <input
                    type="text"
                    id="rev-name"
                    name="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-control"
                    style={{ padding: '8px 12px', fontSize: '0.9rem' }}
                    required
                  />
                </div>
                
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="rev-avatar" style={{ fontSize: '0.8rem' }}>Avatar Emoji</label>
                  <select
                    id="rev-avatar"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleInputChange}
                    className="form-control"
                    style={{ padding: '8px 12px', fontSize: '0.9rem' }}
                  >
                    <option value="👑">👑 Gold</option>
                    <option value="👦">👦 Boy</option>
                    <option value="👴">👴 Elder</option>
                    <option value="👩">👩 Lady</option>
                    <option value="👨">👨 Gentleman</option>
                    <option value="👩‍⚕️">👩‍⚕️ Doctor</option>
                    <option value="✨">✨ Sparkle</option>
                    <option value="🧁">🧁 Muffin</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="rev-rating" style={{ fontSize: '0.8rem' }}>Rating</label>
                  <select
                    id="rev-rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="form-control"
                    style={{ padding: '8px 12px', fontSize: '0.9rem' }}
                  >
                    <option value="5">★★★★★ (5/5)</option>
                    <option value="4">★★★★☆ (4/5)</option>
                    <option value="3">★★★☆☆ (3/5)</option>
                    <option value="2">★★☆☆☆ (2/5)</option>
                    <option value="1">★☆☆☆☆ (1/5)</option>
                  </select>
                </div>
                
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="rev-tag" style={{ fontSize: '0.8rem' }}>Category Tag</label>
                  <select
                    id="rev-tag"
                    name="tag"
                    value={formData.tag}
                    onChange={handleInputChange}
                    className="form-control"
                    style={{ padding: '8px 12px', fontSize: '0.9rem' }}
                  >
                    <option value="family">Family & Parties 👩‍👩‍👦</option>
                    <option value="elderly">Seniors Choice 👵</option>
                    <option value="kids">Kids Corner 👦</option>
                    <option value="bakery">Boulangerie & Pastry 🥐</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="rev-itemRef" style={{ fontSize: '0.8rem' }}>Select Product</label>
                <select
                  id="rev-itemRef"
                  name="itemRef"
                  value={formData.itemRef}
                  onChange={handleInputChange}
                  className="form-control"
                  style={{ padding: '8px 12px', fontSize: '0.9rem' }}
                >
                  <option value="Artisanal Dark Truffles">Artisanal Dark Truffles</option>
                  <option value="Pistachio Saffron Gold Truffles">Pistachio Saffron Gold Truffles</option>
                  <option value="Exotic International Fruit Bonbons">Exotic International Fruit Bonbons</option>
                  <option value="Sugar-Free Almond & Raisin Bar">Sugar-Free Almond & Raisin Bar</option>
                  <option value="Belgian Candied Orange Slice">Belgian Candied Orange Slice</option>
                  <option value="Rustic Sourdough Loaf">Rustic Sourdough Loaf</option>
                  <option value="Golden Butter Croissant">Golden Butter Croissant</option>
                  <option value="Melty Choco-Chip Cookies">Melty Choco-Chip Cookies</option>
                  <option value="Bespoke Chocolate Box">Bespoke Chocolate Box</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="rev-comment" style={{ fontSize: '0.8rem' }}>Your Review</label>
                <textarea
                  id="rev-comment"
                  name="comment"
                  placeholder="Tell us what you loved about our treats..."
                  value={formData.comment}
                  onChange={handleInputChange}
                  className="form-control"
                  style={{ padding: '8px 12px', fontSize: '0.85rem', minHeight: '60px', resize: 'vertical' }}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn-gold" 
                style={{ width: '100%', justifyContent: 'center', padding: '10px', fontSize: '0.9rem', marginTop: '5px' }}
              >
                Publish Review ✨
              </button>
            </form>
          </div>

        </div>

        {/* Filters */}
        <div className="filter-tabs">
          <button onClick={() => setActiveFilter('all')} className={`tab-btn ${activeFilter === 'all' ? 'active' : ''}`}>All Reviews</button>
          <button onClick={() => setActiveFilter('kids')} className={`tab-btn ${activeFilter === 'kids' ? 'active' : ''}`}>Kids Corner 👦</button>
          <button onClick={() => setActiveFilter('elderly')} className={`tab-btn ${activeFilter === 'elderly' ? 'active' : ''}`}>Seniors Choice 👵</button>
          <button onClick={() => setActiveFilter('family')} className={`tab-btn ${activeFilter === 'family' ? 'active' : ''}`}>Family & Parties 👩‍👩‍👦</button>
          <button onClick={() => setActiveFilter('bakery')} className={`tab-btn ${activeFilter === 'bakery' ? 'active' : ''}`}>Boulangerie & Pastry 🥐</button>
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
