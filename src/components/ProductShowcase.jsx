import React, { useState } from 'react';

const PRODUCTS_DATA = [
  {
    id: 'p1',
    name: 'Artisanal Dark Truffles',
    price: 350,
    category: 'chocolates',
    tag: 'Bestseller',
    ageGroup: 'All Ages',
    specs: ['70% Cocoa', 'Eggless', 'Velvet Ganache'],
    description: 'Rich, velvet-smooth dark chocolate ganache rolled in premium French cocoa powder.',
    ingredients: ['Single-origin 70% dark cocoa mass', 'Cocoa butter', 'Organic cane sugar', 'Pure vanilla extract', 'French cocoa powder'],
    emoji: '🍬',
    image: 'https://images.unsplash.com/photo-1548907040-4d42b3228b91?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p2',
    name: 'Pistachio Saffron Gold Truffles',
    price: 450,
    category: 'dryfruit_choc',
    tag: 'Premium Dry Fruit',
    ageGroup: 'All Ages',
    specs: ['Kashmiri Saffron', 'Persian Pistachio', '24k Gold Leaf'],
    description: 'Luxurious white chocolate ganache infused with saffron threads, topped with roasted pistachios and gold dust.',
    ingredients: ['Pure white cacao butter', 'Kashmiri saffron threads', 'Toasted Persian pistachios', 'Heavy dairy cream', 'Edible 24k gold leaf dust'],
    emoji: '🌰',
    image: 'https://images.unsplash.com/photo-1548907040-4d42b3228b91?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p3',
    name: 'Exotic International Fruit Bonbons',
    price: 480,
    category: 'fruit_choc',
    tag: 'Exotic Fruit',
    ageGroup: 'All Ages',
    specs: ['Italian Raspberry', 'Wild Blueberry', 'Dark Shell'],
    description: 'Delicate chocolate shells filled with liquid raspberry gelée from Italy and wild blueberry reduction.',
    ingredients: ['Belgian dark chocolate shell (64%)', 'Italian organic raspberry puree', 'Wild Canadian blueberries', 'Cacao butter', 'Raw organic honey'],
    emoji: '🍓',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p4',
    name: 'Sugar-Free Almond & Raisin Bar',
    price: 320,
    category: 'dryfruit_choc',
    tag: 'Sugar-Free Nut',
    ageGroup: 'Senior Friendly',
    specs: ['Stevia Sweetened', 'California Almonds', 'Keto Friendly'],
    description: 'Decadent dark chocolate bar packed with roasted California almonds and sweet Afghan raisins. Zero sugar.',
    ingredients: ['Sugar-free dark cocoa mass (sweetened with organic Stevia)', 'Cocoa butter', 'Dry-roasted California almonds', 'Sweet organic raisins', 'Soy lecithin'],
    emoji: '🍫',
    image: 'https://images.unsplash.com/photo-1549007994-cb92ca8a4a77?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p5',
    name: 'Belgian Candied Orange Slice',
    price: 380,
    category: 'fruit_choc',
    tag: 'Gourmet Fruit',
    ageGroup: 'All Ages',
    specs: ['Spanish Orange', 'Belgian Dark Choc', 'Candied Slice'],
    description: 'Imported Spanish orange slices slow-candied in organic syrup and half-dipped in rich dark chocolate.',
    ingredients: ['Imported Spanish Valencia oranges', 'Organic cane sugar syrup', 'Belgian dark chocolate (60%)', 'Vanilla bean pods'],
    emoji: '🍊',
    image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p6',
    name: 'Rustic Sourdough Loaf',
    price: 220,
    category: 'bakery',
    tag: 'Healthy Bread',
    ageGroup: 'Senior Friendly',
    specs: ['100% Organic', 'Vegan', 'Low GI'],
    description: 'Slow-fermented for 24 hours, giving it a chewy crust, soft crumb, and easy digestibility for elders.',
    ingredients: ['Stone-ground whole wheat flour', 'Filtered spring water', 'Active sourdough starter culture', 'Himalayan pink salt'],
    emoji: '🍞',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p7',
    name: 'Golden Butter Croissant',
    price: 120,
    category: 'bakery',
    tag: 'Fresh Bake',
    ageGroup: 'All Ages',
    specs: ['Pure Butter', 'Flaky Layers'],
    description: 'Classic French style laminated pastry, baked to a perfect golden brown with a crisp crust.',
    ingredients: ['French pastry flour', 'Cultured Normandy butter', 'Active dry yeast', 'Warm organic milk', 'Pinch of salt'],
    emoji: '🥐',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p8',
    name: 'Melty Choco-Chip Cookies',
    price: 150,
    category: 'bakery',
    tag: 'Teatime Cookie',
    ageGroup: 'Kids Favorite',
    specs: ['Eggless', 'Gooey Center', 'Belgian Chips'],
    description: 'Soft-baked cookies loaded with Belgian milk chocolate chips. Loved by kids and parents alike.',
    ingredients: ['Unrefined pastry flour', 'Belgian semi-sweet chocolate chips', 'Brown cane sugar', 'Cold-pressed coconut oil', 'Flaxseed extract'],
    emoji: '🍪',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80'
  }
];

export default function ProductShowcase({ onAddToOrder, onProductClick }) {
  const [activeTab, setActiveTab] = useState('all');

  const filterCategories = {
    all: 'All Delights',
    chocolates: 'Classic Chocolates 🍬',
    dryfruit_choc: 'Dry Fruit Chocolates 🌰',
    fruit_choc: 'Fruit Chocolates 🍓',
    bakery: 'Artisan Bakery 🥐'
  };

  const filteredProducts = activeTab === 'all' 
    ? PRODUCTS_DATA 
    : PRODUCTS_DATA.filter(p => p.category === activeTab);

  return (
    <section id="products" className="section-padding">
      <div className="container">
        <div className="section-header">
          <span className="gold-badge">RajCafe Specialties</span>
          <h2>Our Handcrafted Menu</h2>
          <p>100% Pure, Homemade & Handmade daily. We select premium natural raw materials. Click <strong>Details 🔍</strong> on any product to see its complete list of pure ingredients and watch how we bake/temper it live!</p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="filter-tabs">
          {Object.entries(filterCategories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`tab-btn ${activeTab === key ? 'active' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              {/* Product Visual wrapper */}
              <div className="product-image-wrapper" onClick={() => onProductClick(product)} style={{ cursor: 'pointer' }}>
                <img 
                  src={product.image} 
                  className="product-img" 
                  alt={product.name} 
                  loading="lazy" 
                  onError={(e) => {
                    // Fallback to emoji if network fails
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="img-fallback" style={{ display: 'none' }}>
                  <span className="img-fallback-icon">{product.emoji}</span>
                  <span className="img-fallback-text">{product.name}</span>
                </div>
                <span className="product-tag">{product.tag}</span>
              </div>

              {/* Product Info */}
              <div className="product-info">
                <div className="product-header">
                  <h3 className="product-title" onClick={() => onProductClick(product)} style={{ cursor: 'pointer' }}>
                    {product.name}
                  </h3>
                  <span className="product-price">₹{product.price}</span>
                </div>
                <p className="product-description">{product.description}</p>
                <div className="card-ingredients">
                  <span className="ingredients-label">🌿 Key Ingredients:</span> {product.ingredients.slice(0, 3).join(', ')}...
                </div>
                
                {/* Meta details */}
                <div className="product-meta">
                  <div className="meta-tags">
                    <span className="tag-label age">{product.ageGroup}</span>
                    {product.specs.slice(0, 2).map((spec, i) => (
                      <span key={i} className="tag-label">{spec}</span>
                    ))}
                  </div>
                  
                  {/* Action buttons */}
                  <div className="product-actions">
                    <button 
                      onClick={() => onProductClick(product)}
                      className="btn-card btn-card-secondary"
                    >
                      Details 🔍
                    </button>
                    <button 
                      onClick={() => onAddToOrder(product)}
                      className="btn-card btn-card-primary"
                    >
                      Add 🛒
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
