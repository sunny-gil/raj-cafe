import React, { useState } from 'react';

const BLOGS_DATA = [
  {
    id: 'b1',
    title: 'The Art of Coffee & Artisanal Chocolate Pairing',
    author: 'RajCafe Chocolatier',
    date: 'June 02, 2026',
    category: 'Guides',
    readTime: '4 min read',
    summary: 'A matching guide to selecting cocoa percentages that enhance your morning espresso notes and neutralize acidity.',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=600&q=80',
    content: `Chocolate and coffee are a match made in culinary heaven. Both cocoa beans and coffee beans are seeds of tropical fruits that go through fermentation, roasting, and grinding. When paired correctly, they elevate each other's hidden flavors.

At RajCafe, we believe in a few simple rules for matching coffee and chocolates:

1. **Match the Intensity:** A heavy, dark-roast espresso pairs best with our 70% Artisanal Dark Truffles. The bitterness of the dark cocoa matches the smoky notes of the roast.
2. **Neutralize Acidity:** Light-roast coffees tend to have high citrus acidity. Pairing them with our sweeter White Dream or Salted Caramel chocolates cuts through the acidity, creating a smooth, milk-caramel finish.
3. **Contrast the Textures:** Take a sip of hot black coffee, let it warm your palate, and then place a piece of our Hazelnut Praline bonbon on your tongue. The warm coffee melts the hazelnut butter shell instantly, releasing a rich praline aroma.

Try experimenting with different combinations at home to find your signature pairing!`
  },
  {
    id: 'b2',
    title: 'The Science of Sourdough & Senior Digestion',
    author: 'Head Baker, RajCafe',
    date: 'May 25, 2026',
    category: 'Health',
    readTime: '6 min read',
    summary: 'Why a 24-hour slow fermentation process breaks down gluten and yields a highly digestible, low-GI bread loaf perfect for elders.',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80',
    content: `Traditional sourdough bread is far more than just a delicious rustic loaf. It is a product of live biological science. Unlike commercial sandwich breads made in 2 hours using chemical yeasts, authentic sourdough is fermented for over 24 hours using wild yeast and lactobacilli bacteria.

Here is why this fermentation is a health game-changer, especially for our senior citizens:

1. **Pre-Digested Gluten:** During the 24-hour fermentation, the lactic acid bacteria break down complex wheat gluten proteins into simpler amino acids. This acts as a pre-digestion phase. Elders who normally experience bloating or heavy stomachs after eating wheat bread find RajCafe Sourdough exceptionally easy to digest.
2. **Lower Glycemic Index (GI):** Sourdough fermentation alters the structure of starch molecules, slowing down the rate at which your body converts carbohydrates into glucose. This leads to a lower insulin spike, making it suitable for grandparents monitoring their blood sugar.
3. **Phytic Acid Breakdown:** Grains contain phytic acid, which binds to minerals like calcium, magnesium, and zinc, preventing absorption. Sourdough fermentation neutralizes phytic acid, letting your body absorb these crucial nutrients easily.

Our Rustic Sourdough Loaf is baked with zero additives—just organic stone-ground flour, filtered water, pink salt, and time.`
  },
  {
    id: 'b3',
    title: 'Achieving the Glossy Shine: The Secrets of Tempering',
    author: 'RajCafe Chocolatier',
    date: 'May 18, 2026',
    category: 'Craftsmanship',
    readTime: '5 min read',
    summary: 'Learn how we temper our gourmet chocolate shells using exact temperature curves to achieve the professional gold-leaf shine.',
    image: 'https://images.unsplash.com/photo-1548907040-4d42b3228b91?auto=format&fit=crop&w=600&q=80',
    content: `Have you ever wondered why gourmet chocolates look so glossy and snap cleanly when bitten, while melted chocolate becomes soft and chalky? The secret lies in a molecular process called **tempering**.

Chocolate is made up of cocoa solids, sugar, and cocoa butter fat. Cocoa butter is polymorphic, meaning it can crystallize into six different crystal structures (Form I to Form VI). Only **Form V** crystals produce the shiny surface, hard snap, and smooth melting texture that define luxury chocolates.

To grow Form V crystals, we follow a strict three-step temperature curve in our home kitchen:

1. **Melting:** We heat the chocolate to exactly 45°C to completely melt all fat crystals.
2. **Cooling:** We cool the chocolate rapidly to 27°C while continuously stirring. This promotes the growth of stable Form V crystals (along with some unstable Form IV crystals).
3. **Reheating:** We gently reheat the chocolate to 31°C (for dark chocolate). This melts away the unstable Form IV crystals, leaving only a strong network of Form V crystals behind.

If the temperature varies by even half a degree, the crystals collapse, causing "fat bloom" (white streaks). That is why we monitor every batch with high-precision thermometers before molding and decorating them with gold leaf flakes.`
  }
];

export default function Blogs() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Single Blog Detail Page View
  if (selectedBlog) {
    return (
      <section className="section-padding" style={{ paddingTop: '120px' }}>
        <div className="container animate-fade-in-up" style={{ maxWidth: '800px', textAlign: 'left' }}>
          <button 
            onClick={() => setSelectedBlog(null)} 
            className="btn-outline" 
            style={{ marginBottom: '30px', padding: '8px 18px', fontSize: '0.9rem' }}
          >
            ← Back to Blogs
          </button>

          <span className="gold-badge" style={{ marginBottom: '15px' }}>{selectedBlog.category}</span>
          <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-family-serif)', marginBottom: '10px' }}>{selectedBlog.title}</h2>
          
          <div style={{ display: 'flex', gap: '15px', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '25px', borderBottom: '1px solid var(--border-color)', paddingBottom: '15px' }}>
            <span>By {selectedBlog.author}</span>
            <span>•</span>
            <span>{selectedBlog.date}</span>
            <span>•</span>
            <span>{selectedBlog.readTime}</span>
          </div>

          <img 
            src={selectedBlog.image} 
            alt={selectedBlog.title} 
            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', marginBottom: '30px', boxShadow: 'var(--shadow-lg)' }}
          />

          <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
            {selectedBlog.content}
          </div>
        </div>
      </section>
    );
  }

  // All Blogs List View
  return (
    <section className="section-padding" style={{ paddingTop: '120px' }}>
      <div className="container animate-fade-in-up">
        {/* Section Header */}
        <div className="section-header">
          <span className="gold-badge">Gourmet Reads</span>
          <h2>The RajCafe Blog</h2>
          <p>Read about the science of sourdough fermentation, tempering premium cocoa, and matching sweet delicacies with morning brews.</p>
        </div>

        {/* Blogs Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {BLOGS_DATA.map((blog) => (
            <article key={blog.id} className="product-card" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <div className="product-image-wrapper" onClick={() => setSelectedBlog(blog)} style={{ cursor: 'pointer' }}>
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="product-img" 
                  loading="lazy"
                />
                <span className="product-tag">{blog.category}</span>
              </div>

              <div className="product-info" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  {blog.date} • {blog.readTime}
                </div>
                
                <h3 
                  onClick={() => setSelectedBlog(blog)} 
                  style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.4rem', marginBottom: '10px', cursor: 'pointer', flexGrow: 0 }}
                  className="product-title"
                >
                  {blog.title}
                </h3>
                
                <p className="product-description" style={{ flexGrow: 1, marginBottom: '15px' }}>
                  {blog.summary}
                </p>

                <div className="product-actions" style={{ marginTop: 'auto' }}>
                  <button 
                    onClick={() => setSelectedBlog(blog)}
                    className="btn-card btn-card-primary"
                    style={{ width: '100%' }}
                  >
                    Read Article 📖
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
