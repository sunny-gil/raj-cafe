import React, { useState, useEffect } from 'react';

const CHOCOLATE_FLAVORS = [
  { id: 'f_milk', name: 'Milk Classic', type: 'choc-milk', description: 'Creamy milk chocolate', price: 0 },
  { id: 'f_dark', name: 'Dark Ganache', type: 'choc-dark', description: '70% rich dark cocoa', price: 0 },
  { id: 'f_white', name: 'White Dream', type: 'choc-white', description: 'Sweet vanilla cocoa', price: 0 },
  { id: 'f_caramel', name: 'Salted Caramel', type: 'choc-caramel', description: 'Gooey rich caramel', price: 0 },
  { id: 'f_hazelnut', name: 'Hazelnut Crunch', type: 'choc-hazelnut', description: 'Roasted nut center', price: 0 },
  { id: 'f_mint', name: 'Moroccan Mint', type: 'choc-mint', description: 'Cool herbal dark chocolate', price: 0 }
];

const BOX_PRICING = {
  4: { name: 'Petit Box (4 Pcs)', price: 250, slots: 4, styleClass: 'box-size-4' },
  9: { name: 'Classic Box (9 Pcs)', price: 500, slots: 9, styleClass: 'box-size-9' },
  16: { name: 'Grand Luxury Box (16 Pcs)', price: 850, slots: 16, styleClass: 'box-size-16' }
};

export default function ChocolateBoxBuilder({ onAddBoxToOrder, showToast }) {
  const [boxSize, setBoxSize] = useState(9); // Default to 9 pieces
  const [slots, setSlots] = useState(Array(9).fill(null));

  // If box size changes, reset slot array to the new size
  useEffect(() => {
    setSlots(Array(BOX_PRICING[boxSize].slots).fill(null));
  }, [boxSize]);

  // Click handler to add chocolate to the first available empty slot
  const handleSelectChocolate = (flavor) => {
    const nextEmptyIndex = slots.findIndex(slot => slot === null);
    if (nextEmptyIndex === -1) {
      showToast('Oops! Your box is already full. Remove one to replace it.', 'error');
      return;
    }

    const newSlots = [...slots];
    newSlots[nextEmptyIndex] = flavor;
    setSlots(newSlots);
    showToast(`Added ${flavor.name} to slot ${nextEmptyIndex + 1}!`);
  };

  // Click handler to remove chocolate from a specific slot
  const handleRemoveChocolate = (index) => {
    if (slots[index] === null) return;
    const flavorName = slots[index].name;
    const newSlots = [...slots];
    newSlots[index] = null;
    setSlots(newSlots);
    showToast(`Removed ${flavorName} from slot ${index + 1}.`);
  };

  // Add the entire completed custom box to the order cart
  const handleAddToOrder = () => {
    const unfilledCount = slots.filter(slot => slot === null).length;
    if (unfilledCount > 0) {
      showToast(`Please fill all ${unfilledCount} remaining slots before ordering!`, 'error');
      return;
    }

    // Prepare item description for the cart
    const chocolateCounts = {};
    slots.forEach(choc => {
      chocolateCounts[choc.name] = (chocolateCounts[choc.name] || 0) + 1;
    });
    
    const contentsStr = Object.entries(chocolateCounts)
      .map(([name, count]) => `${count}x ${name}`)
      .join(', ');

    const customBoxItem = {
      id: `custom-box-${Date.now()}`,
      name: `Custom Chocolate Box - ${BOX_PRICING[boxSize].name}`,
      price: BOX_PRICING[boxSize].price,
      quantity: 1,
      category: 'custom',
      description: `Contents: ${contentsStr}`,
      emoji: '🎁'
    };

    onAddBoxToOrder(customBoxItem);
    // Reset slots
    setSlots(Array(BOX_PRICING[boxSize].slots).fill(null));
    showToast('Custom chocolate box added to your order inquiry! 🎉');
  };

  const filledCount = slots.filter(slot => slot !== null).length;
  const isBoxFull = filledCount === BOX_PRICING[boxSize].slots;

  return (
    <section id="builder" className="section-padding builder-section">
      <div className="container">
        <div className="section-header">
          <span className="gold-badge">Interactive Experience</span>
          <h2>Build Your Chocolate Box</h2>
          <p>Choose your box size and click on the artisanal chocolate flavors below to design your perfect customized luxury gift box. Perfect for kids birthdays or elegant elders' gifts.</p>
        </div>

        <div className="builder-grid">
          {/* Box Visual representation Column */}
          <div className="box-visual-container">
            {/* Box Size Selector */}
            <div className="box-configurator">
              {Object.entries(BOX_PRICING).map(([size, config]) => (
                <button
                  key={size}
                  onClick={() => setBoxSize(Number(size))}
                  className={`config-btn ${boxSize === Number(size) ? 'active' : ''}`}
                >
                  {config.slots} Pcs (₹{config.price})
                </button>
              ))}
            </div>

            {/* Visual Box Grid */}
            <div className={`box-wrapper ${BOX_PRICING[boxSize].styleClass}`}>
              {slots.map((chocolate, index) => (
                <div 
                  key={index} 
                  className="box-slot" 
                  onClick={() => handleRemoveChocolate(index)}
                  title={chocolate ? `Click to remove ${chocolate.name}` : 'Empty Slot - click a chocolate below to add'}
                >
                  {chocolate ? (
                    <div className={`slot-chocolate ${chocolate.type}`}>
                      <div className="slot-choc-drizzle"></div>
                      <span className="remove-slot-btn">✕</span>
                    </div>
                  ) : (
                    <span className="slot-index">{index + 1}</span>
                  )}
                </div>
              ))}
            </div>
            
            <p style={{ marginTop: '15px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              *Click on any filled chocolate inside the box to remove it.
            </p>
          </div>

          {/* Selector panel Column */}
          <div className="builder-panel">
            <h3 style={{ marginBottom: '15px', fontFamily: 'var(--font-family-serif)' }}>Select Gourmet Flavors:</h3>
            
            <div className="builder-selection-grid">
              {CHOCOLATE_FLAVORS.map((flavor) => (
                <div 
                  key={flavor.id} 
                  className="choc-option-card"
                  onClick={() => handleSelectChocolate(flavor)}
                >
                  <div className={`choc-option-circle ${flavor.type}`}>
                    <div className="slot-choc-drizzle" style={{ width: '100%', height: '8px', top: '18px' }}></div>
                  </div>
                  <div className="choc-option-name">{flavor.name}</div>
                  <div className="choc-option-desc">{flavor.description}</div>
                </div>
              ))}
            </div>

            {/* Summary Box */}
            <div className="builder-summary">
              <div className="summary-row">
                <span>Selected Box:</span>
                <span style={{ fontWeight: 600 }}>{BOX_PRICING[boxSize].name}</span>
              </div>
              <div className="summary-row">
                <span>Slots Filled:</span>
                <span style={{ fontWeight: 600, color: isBoxFull ? 'var(--accent-berry)' : 'var(--text-primary)' }}>
                  {filledCount} of {BOX_PRICING[boxSize].slots} filled
                </span>
              </div>
              <div className="summary-row total">
                <span>Box Price:</span>
                <span>₹{BOX_PRICING[boxSize].price}</span>
              </div>

              <div className="builder-actions">
                <button 
                  onClick={handleAddToOrder} 
                  className="btn-premium"
                  style={{ width: '100%', justifyContent: 'center', opacity: isBoxFull ? 1 : 0.6 }}
                  disabled={!isBoxFull}
                >
                  {isBoxFull ? 'Add Custom Box to Order 🎁' : `Fill ${BOX_PRICING[boxSize].slots - filledCount} more to Order`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
