import React, { useState } from 'react';

export default function OrderForm({ cart, onRemoveItem, onClearCart, showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    notes: ''
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

    // Validations
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

    // Format WhatsApp message
    const total = calculateTotal();
    let messageText = `*RajCafe - Pre-Order Inquiry*\n`;
    messageText += `===============================\n\n`;
    messageText += `*Customer Details:*\n`;
    messageText += `• *Name:* ${formData.name.trim()}\n`;
    messageText += `• *WhatsApp:* ${formData.phone.trim()}\n`;
    messageText += `• *Delivery Date:* ${formData.date}\n\n`;
    
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

    // Encode text and redirect to WhatsApp API (using a dummy placeholder number)
    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=919876543210&text=${encodedText}`;
    
    showToast('Redirecting to WhatsApp...');
    window.open(whatsappUrl, '_blank');
  };

  const totalAmount = calculateTotal();

  return (
    <section id="order" className="section-padding order-section">
      <div className="container">
        <div className="section-header">
          <span className="gold-badge">Place Pre-Order</span>
          <h2>Inquire & Order Now</h2>
          <p>Review your selected gourmet items, fill in your details, and place a custom order inquiry directly through WhatsApp. We will confirm your delivery slot immediately.</p>
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
            <h3 style={{ fontFamily: 'var(--font-family-serif)', marginBottom: '20px', textAlign: 'left' }}>Delivery Details</h3>
            <form onSubmit={handleWhatsAppSubmit}>
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
                <h4 style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 700 }}>Ordering Information</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>
                  Since all bakes are fresh and homemade, we request a minimum **24-hour notice** for orders. After clicking below, a WhatsApp message will draft with your item list. Simply press send!
                </p>
              </div>

              <button 
                type="submit" 
                className="btn-gold" 
                style={{ width: '100%', justifyContent: 'center', padding: '15px' }}
              >
                Send Pre-Order via WhatsApp 💬
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
