import React, { useState } from 'react';

export default function OrderForm({ cart, onRemoveItem, onClearCart, showToast, onAddOrder }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    notes: '',
    address: '',
    pincode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();

    // Step 1 Validation Check
    if (cart.length === 0) {
      showToast('Your order cart is empty! Add some treats first.', 'error');
      return;
    }
    if (!formData.name.trim()) {
      showToast('Please enter your name.', 'error');
      return;
    }
    if (!formData.phone.trim()) {
      showToast('Please enter your WhatsApp phone number.', 'error');
      return;
    }
    if (!formData.date) {
      showToast('Please select your preferred delivery date.', 'error');
      return;
    }

    if (step === 1) {
      // Step 1 Complete -> Move to Address confirmation
      showToast('Order Placement In Progress... Please confirm delivery destination.');
      setStep(2);
      return;
    }

    // Step 2 Validation Check
    if (!formData.address.trim()) {
      showToast('Please enter your delivery address.', 'error');
      return;
    }
    if (!formData.pincode.trim()) {
      showToast('Please enter your pincode.', 'error');
      return;
    }

    // Complete Order placement & WhatsApp manifest formatting
    const total = calculateTotal();
    let messageText = `*RajCafe - Pre-Order Inquiry*\n`;
    messageText += `===============================\n\n`;
    messageText += `*Customer Details:*\n`;
    messageText += `• *Name:* ${formData.name.trim()}\n`;
    messageText += `• *WhatsApp:* ${formData.phone.trim()}\n`;
    messageText += `• *Delivery Date:* ${formData.date}\n`;
    messageText += `• *Delivery Address:* ${formData.address.trim()}, Pincode: ${formData.pincode.trim()}\n\n`;
    
    messageText += `*Items Ordered:*\n`;
    cart.forEach((item, index) => {
      messageText += `${index + 1}. *${item.name}* (Qty: ${item.quantity || 1}) - ₹${item.price}\n`;
      if (item.description) {
        messageText += `   _${item.description}_\n`;
      }
    });
    
    messageText += `\n*Total Value:* ₹${total}\n\n`;
    
    if (formData.notes.trim()) {
      messageText += `*Special Instructions / Customizations:*\n`;
      messageText += `_"${formData.notes.trim()}"_\n\n`;
    }
    
    messageText += `===============================\n`;
    messageText += `Thank you! Looking forward to your delicious treats. ❤️`;

    // Construct order object for website Order History
    const newOrder = {
      id: `order-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      customerName: formData.name.trim(),
      phone: formData.phone.trim(),
      deliveryDate: formData.date,
      notes: formData.notes.trim(),
      address: `${formData.address.trim()}, Pincode: ${formData.pincode.trim()}`,
      items: [...cart],
      total: total,
      status: 'Inquiry Dispatched'
    };

    // Save order in history
    if (onAddOrder) {
      onAddOrder(newOrder);
    }

    // Redirect to WhatsApp
    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=918412915125&text=${encodedText}`;
    
    showToast('Redirecting to WhatsApp with acquisition details...');
    window.open(whatsappUrl, '_blank');

    // Reset Form
    setFormData({
      name: '',
      phone: '',
      date: '',
      notes: '',
      address: '',
      pincode: ''
    });
    setStep(1);

    // Clear cart
    onClearCart();
  };

  const totalAmount = calculateTotal();

  return (
    <section id="order" className="section-padding order-section">
      <div className="container">
        <div className="section-header">
          <span className="gold-badge">Bespoke Concierge</span>
          <h2>Acquire & Customize</h2>
          <p>Review your curated selection, provide your collection preferences, and dispatch your boutique reservation request directly to our concierge via WhatsApp.</p>
        </div>

        <div className="order-grid">
          {/* Contact Details and Cart Panel */}
          <div className="order-info-panel">
            <h3 style={{ fontFamily: 'var(--font-family-serif)', marginBottom: '15px' }}>Your Selected Treats</h3>
            
            {cart.length === 0 ? (
              <div className="glass-panel" style={{ textAlign: 'center', padding: 'var(--spacing-md) var(--spacing-sm)' }}>
                <span style={{ fontSize: '3rem' }}>🛍️</span>
                <p style={{ marginTop: '10px', color: 'var(--text-secondary)' }}>Your order cart is currently empty.</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Scroll up to browse our bakery delicacies or assemble a custom chocolate box!</p>
              </div>
            ) : (
              <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ maxHeight: '250px', overflowY: 'auto', paddingRight: '4px' }}>
                  {cart.map((item) => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', padding: '10px 0' }}>
                      <div style={{ textAlign: 'left', flexGrow: 1, paddingRight: '10px' }}>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.emoji} {item.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.description}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span style={{ fontWeight: 700, color: 'var(--accent-berry)' }}>₹{item.price}</span>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="btn-icon" 
                          style={{ width: '28px', height: '28px', fontSize: '0.75rem', backgroundColor: 'var(--accent-berry-light)', color: 'var(--accent-berry)', border: 'none' }}
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.2rem', borderTop: '2px solid var(--accent-gold)', paddingTop: '12px', color: 'var(--accent-berry)' }}>
                  <span>Total Amount:</span>
                  <span>₹{totalAmount}</span>
                </div>
                
                <button 
                  onClick={onClearCart} 
                  className="btn-outline" 
                  style={{ width: '100%', justifyContent: 'center', padding: '10px', fontSize: '0.85rem' }}
                >
                  Clear All Selection 🗑️
                </button>
              </div>
            )}

            {/* Quick Contact Info */}
            <div className="contact-details animate-fade-in-up" style={{ marginTop: 'var(--spacing-md)' }}>
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-text">
                  <h4>Our Kitchen Location</h4>
                  <p>12, Raj Heritage Block, Sector 4, Mumbai, India</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-text">
                  <h4>Call for Quick Queries</h4>
                  <p>+91 98765 43210 (Hours: 9:00 AM - 8:00 PM)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form Card */}
          <div className="glass-panel order-form-card">
            <h3 style={{ fontFamily: 'var(--font-family-serif)', marginBottom: '20px', textAlign: 'left' }}>
              {step === 1 ? 'Delivery Details' : 'Acquisition Destination'}
            </h3>
            
            <form onSubmit={handleWhatsAppSubmit}>
              
              {/* STEP 1 Fields */}
              {step === 1 && (
                <>
                  <div className="form-group-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="order-name">Your Full Name *</label>
                      <input
                        type="text"
                        id="order-name"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="order-phone">WhatsApp Number *</label>
                      <input
                        type="tel"
                        id="order-phone"
                        name="phone"
                        placeholder="Enter WhatsApp mobile"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="order-date">Preferred Delivery Date *</label>
                    <input
                      type="date"
                      id="order-date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="order-notes">Special Requests (Preservatives, Sweetness, Allergies)</label>
                    <textarea
                      id="order-notes"
                      name="notes"
                      placeholder="e.g. Please make the sourdough bread eggless. Reduce sugar in the truffles. Add 'Happy Birthday' tag."
                      value={formData.notes}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="order-summary-box">
                    <h4 style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 700 }}>Boutique Acquisition Policy</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>
                      As each artisanal creation is hand-tempered and micro-baked on demand, we require a minimum **24-hour lead time** to ensure premium excellence. Clicking below initiates your order confirmation.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="btn-gold"
                    style={{ width: '100%', justifyContent: 'center', padding: '15px' }}
                  >
                    Request Boutique Acquisition 💬
                  </button>
                </>
              )}

              {/* STEP 2 Fields */}
              {step === 2 && (
                <>
                  <div style={{ padding: '12px 15px', backgroundColor: 'var(--accent-gold-light)', borderLeft: '4px solid var(--accent-gold)', color: 'var(--text-primary)', fontSize: '0.9rem', borderRadius: '4px', marginBottom: '20px', fontWeight: 500 }}>
                    🔄 Order placement in progress... Please confirm your delivery address.
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="order-address">Delivery Address *</label>
                    <textarea
                      id="order-address"
                      name="address"
                      placeholder="Flat/House No., Building Name, Street, Landmark"
                      value={formData.address}
                      onChange={handleChange}
                      className="form-control"
                      style={{ minHeight: '80px' }}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="order-pincode">Pincode / Postal Code *</label>
                    <input
                      type="text"
                      id="order-pincode"
                      name="pincode"
                      placeholder="e.g. 400001"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="order-summary-box">
                    <h4 style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 700 }}>Conformation Note</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>
                      We are now ready to verify your delivery slots. Clicking below will finalize this order in your local dashboard and redirect you to WhatsApp to dispatch the manifest.
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button
                      type="submit"
                      className="btn-gold"
                      style={{ width: '100%', justifyContent: 'center', padding: '15px' }}
                    >
                      Confirm Address & Send to WhatsApp 💬
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn-outline"
                      style={{ width: '100%', justifyContent: 'center', padding: '10px', fontSize: '0.85rem' }}
                    >
                      ← Modify contact details
                    </button>
                  </div>
                </>
              )}

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
