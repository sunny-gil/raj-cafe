import React from 'react';

// Maps each specific product ID to a high-quality process loop video showing how it is prepared/baked
const PRODUCT_PREPARATION_VIDEOS = {
  p1: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-hot-chocolate-in-slow-motion-3534-large.mp4', // Pouring hot dark chocolate
  p2: 'https://assets.mixkit.co/videos/preview/mixkit-chef-stirring-melted-chocolate-in-a-pot-40342-large.mp4', // Stirring melted saffron chocolate
  p3: 'https://assets.mixkit.co/videos/preview/mixkit-chocolate-sauce-dripping-from-a-strawberry-40348-large.mp4', // Chocolate shell dripping
  p4: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-hot-chocolate-in-slow-motion-3534-large.mp4', // Pouring almond chocolate bars
  p5: 'https://assets.mixkit.co/videos/preview/mixkit-chocolate-sauce-dripping-from-a-strawberry-40348-large.mp4', // Dipping orange slices in chocolate glaze
  p6: 'https://assets.mixkit.co/videos/preview/mixkit-kneading-bread-dough-in-a-bakery-41581-large.mp4', // Sourdough kneading
  p7: 'https://assets.mixkit.co/videos/preview/mixkit-freshly-baked-croissants-coming-out-of-the-oven-41582-large.mp4', // Croissants coming out of oven
  p8: 'https://assets.mixkit.co/videos/preview/mixkit-chocolate-chip-cookies-baked-on-a-tray-41585-large.mp4'  // Cookies baking on a tray
};

const INGREDIENTS_MAP = {
  p1: ['Single-origin 70% dark cocoa mass', 'Cocoa butter', 'Organic cane sugar', 'Pure vanilla extract', 'French cocoa powder'],
  p2: ['Pure white cacao butter', 'Kashmiri saffron threads', 'Toasted Persian pistachios', 'Heavy dairy cream', 'Edible 24k gold leaf dust'],
  p3: ['Belgian dark chocolate shell (64%)', 'Italian organic raspberry puree', 'Wild Canadian blueberries', 'Cacao butter', 'Raw organic honey'],
  p4: ['Sugar-free dark cocoa mass (sweetened with organic Stevia)', 'Cocoa butter', 'Dry-roasted California almonds', 'Sweet organic raisins', 'Soy lecithin'],
  p5: ['Imported Spanish Valencia oranges', 'Organic cane sugar syrup', 'Belgian dark chocolate (60%)', 'Vanilla bean pods'],
  p6: ['Stone-ground whole wheat flour', 'Filtered spring water', 'Active sourdough starter culture', 'Himalayan pink salt'],
  p7: ['French pastry flour', 'Cultured Normandy butter', 'Active dry yeast', 'Warm organic milk', 'Pinch of salt'],
  p8: ['Unrefined pastry flour', 'Belgian semi-sweet chocolate chips', 'Brown cane sugar', 'Cold-pressed coconut oil', 'Flaxseed extract']
};

const PREPARATION_STEPS_MAP = {
  p1: [
    'Tempering Cocoa: We heat dark chocolate mass to 45°C to break fat bonds, cool it to 27°C, and re-warm it to 31°C to grow shiny Form V crystals.',
    'Cream Fold: Simmered organic heavy cream is gently folded into the chocolate to make a rich, silk-like ganache.',
    'Hand Rolling: The ganache is cooled, portioned, and hand-rolled into perfect bite-sized truffle balls.',
    'Cocoa Dusting: Each dark truffle is rolled in premium cocoa powder for a velvety, bitter-sweet crust.'
  ],
  p2: [
    'Infusing Saffron: Saffron threads are steeped in warm cream to extract their rich gold color and royal aroma.',
    'White Chocolate Melt: Organic white cocoa butter is gently melted and whipped with the infused saffron cream.',
    'Persian Nut Stuffing: Hand-shelled Persian pistachios are lightly toasted and stuffed into the center of each white truffle.',
    'Gold Leaf Detail: The set truffles are hand-painted with gold luster dust and garnished with gold leaf flakes.'
  ],
  p3: [
    'Fruit Reduction: Italian raspberries and wild blueberries are simmered down into a sweet, concentrated liquid gelée.',
    'Mold Painting: Tempered Belgian dark chocolate is piped into polycarbonate bonbon molds to form thin, crisp chocolate shells.',
    'Liquid Filling: The fruit gelée is cooled and piped into the chocolate shells, leaving a 1mm space at the top.',
    'Bottom Sealing: The bonbons are sealed with a base layer of chocolate, chilled, popped out, and inspected for a high glossy shine.'
  ],
  p4: [
    'Nut & Raisin Sort: High-quality California almonds are dry-roasted at 160°C; raisins are cleaned and sorted.',
    'Stevia Tempering: Chocolate mass is melted at 45°C, cooled to 27°C, and raised to 31°C to grow shiny Form V fats.',
    'Nut Folding: The roasted almonds and raisins are folded into the chocolate to ensure a perfect crunchy bite.',
    'Bar Casting: Pouring the mixture into premium bar molds, vibrating to remove air bubbles, and setting at 15°C.'
  ],
  p5: [
    'Citrus Slicing: Spanish Valencia oranges are sliced into 5mm rounds with peel intact.',
    'Syrup Candying: The slices are simmered in an organic sugar syrup infused with vanilla pods for 6 hours until translucent.',
    'Slow Drying: Candied slices are laid on drying screens and dried at 50°C for 24 hours to achieve a chewy, glazed texture.',
    'Chocolate Bath: Each slice is hand-dipped halfway into tempered dark chocolate, cooled on wax paper until shiny.'
  ],
  p6: [
    'Levain Prep: We feed our 5-year-old wild starter culture with fresh organic stone-ground flour and spring water.',
    'Kneading & Fold: Dough is mixed, rested, and hand-stretched every 30 minutes to develop strong gluten pockets.',
    'Bulk Ferment: The loaves rest for 24 hours in wicker baskets at 18°C, building that traditional sour, complex flavor.',
    'Dutch Oven Bake: Baked at 240°C in heavy cast-iron pots for 25 minutes with steam, then 15 minutes open for a thick, blistered crust.'
  ],
  p7: [
    'Dough Lamination: Yeast dough is rolled flat and locked with a thick block of chilled Normandy butter.',
    'Butter Folding: The dough is folded and rolled in 3 cycles to create exactly 27 individual layers of butter and dough.',
    'Triangular Cut: Dough is cut into long triangles, rolled tightly from base to tip, and curved into crescents.',
    'Oven Rise: Croissants proof at 25°C for 2 hours, then bake at 190°C until the layers puff into crispy golden leaves.'
  ],
  p8: [
    'Sugar Creaming: Unrefined brown sugar is whipped with cold-pressed coconut oil until fluffy.',
    'Fold in Chips: Pastry flour and sea salt are sifted in, followed by a generous portion of semi-sweet Belgian chocolate chips.',
    'Scoop Portioning: Cookie dough is scooped onto lined baking trays, leaving space for cookie spread.',
    'Soft Bake: Baked for exactly 11 minutes at 175°C, ensuring the edges are golden brown while the center remains gooey and melty.'
  ]
};

export default function ProductDetail({ product, onBackClick, onAddToOrder }) {
  const videoUrl = PRODUCT_PREPARATION_VIDEOS[product.id] || PRODUCT_PREPARATION_VIDEOS.p1;
  const ingredients = INGREDIENTS_MAP[product.id] || ['Premium organic ingredients', 'Hand-sourced raw materials'];
  const prepSteps = PREPARATION_STEPS_MAP[product.id] || ['Carefully mixed and prepared', 'Baked at optimal temperatures'];

  return (
    <section className="section-padding" style={{ paddingTop: '120px' }}>
      <div className="container">
        {/* Back Button */}
        <button 
          onClick={onBackClick} 
          className="btn-outline" 
          style={{ marginBottom: '30px', padding: '8px 18px', fontSize: '0.9rem' }}
        >
          ← Back to Menu
        </button>

        {/* Detail Layout Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', alignItems: 'start' }} className="detail-layout-grid">
          {/* Visual Side (Looping Craft Video) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', borderRadius: 'var(--radius-lg)', border: '2px solid var(--accent-gold-light)', boxShadow: 'var(--shadow-lg)' }}>
              <video 
                src={videoUrl}
                autoPlay
                loop
                muted
                playsInline
                poster={product.image}
                style={{ width: '100%', height: '420px', objectFit: 'cover' }}
                aria-label={`${product.name} preparation video`}
              />
            </div>
            <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              🎥 **Live Baking/Tempering Process**: Ambient loop showing exactly how we prepare this creation in our home kitchen.
            </p>
          </div>

          {/* Details Metadata Side */}
          <div className="glass-panel" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '20px', padding: 'var(--spacing-md)' }}>
            <div>
              <span className="gold-badge" style={{ marginBottom: '10px' }}>{product.tag}</span>
              <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-family-serif)', marginBottom: '8px' }}>{product.name}</h2>
              <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent-berry)' }}>₹{product.price}</span>
            </div>

            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {product.description}
            </p>

            {/* Spec tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <span className="tag-label age" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>{product.ageGroup}</span>
              {product.specs.map((spec, i) => (
                <span key={i} className="tag-label" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>{spec}</span>
              ))}
            </div>

            {/* Ingredients Section */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', marginTop: '10px' }}>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-family-sans)', fontWeight: 700, marginBottom: '10px', color: 'var(--text-primary)' }}>
                🌾 Ingredients:
              </h3>
              <ul style={{ listStyleType: 'none', paddingLeft: '0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {ingredients.map((ing, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--accent-gold)' }}>✔</span> {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* How it is Made (Preparation Steps) */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-family-sans)', fontWeight: 700, marginBottom: '10px', color: 'var(--text-primary)' }}>
                👨‍🍳 How We Prepare It:
              </h3>
              <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-secondary)' }}>
                {prepSteps.map((step, idx) => (
                  <li key={idx} style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Add to order actions */}
            <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
              <button 
                onClick={() => {
                  onAddToOrder(product);
                }} 
                className="btn-gold"
                style={{ flexGrow: '1', justifyContent: 'center', padding: '16px' }}
              >
                Add this to Order List 🛒
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
