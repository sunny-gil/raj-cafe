import React from 'react';

export default function OrderHistory({ orders, onClearHistory, setCurrentPage }) {
  const formatWhatsAppMessage = (order) => {
    let messageText = `*RajCafe - Pre-Order Inquiry*\n`;
    messageText += `===============================\n\n`;
    messageText += `*Customer Details:*\n`;
    messageText += `• *Name:* ${order.customerName}\n`;
    messageText += `• *WhatsApp:* ${order.phone}\n`;
    messageText += `• *Delivery Date:* ${order.deliveryDate}\n`;
    messageText += `• *Delivery Address:* ${order.address}\n\n`;
    
    messageText += `*Items Ordered:*\n`;
    order.items.forEach((item, index) => {
      messageText += `${index + 1}. *${item.name}* (Qty: ${item.quantity || 1}) - ₹${item.price}\n`;
      if (item.description) {
        messageText += `   _${item.description}_\n`;
      }
    });
    
    messageText += `\n*Total Value:* ₹${order.total}\n\n`;
    
    if (order.notes && order.notes.trim()) {
      messageText += `*Special Instructions / Customizations:*\n`;
      messageText += `_"${order.notes.trim()}"_\n\n`;
    }
    
    messageText += `===============================\n`;
    messageText += `Thank you! Looking forward to your delicious treats. ❤️`;

    return encodeURIComponent(messageText);
  };

  const handleReSendWhatsApp = (order) => {
    const encodedText = formatWhatsAppMessage(order);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=918412915125&text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="section-padding" style={{ paddingTop: '120px' }}>
      <div className="container animate-fade-in-up">
        {/* Section Header */}
        <div className="section-header">
          <span className="gold-badge">Order History</span>
          <h2>Your Acquisitions</h2>
          <p>Review and track your bespoke chocolate box curations and artisan bakery reservations.</p>
        </div>

        {orders.length === 0 ? (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '60px var(--spacing-sm)', maxWidth: '600px', margin: '0 auto' }}>
            <span style={{ fontSize: '3.5rem' }}>📜</span>
            <h3 style={{ fontFamily: 'var(--font-family-serif)', margin: '15px 0 10px 0' }}>No Acquisitions Recorded</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '25px', fontSize: '0.95rem' }}>
              You have not placed any custom chocolate box reservations or boulangerie orders yet.
            </p>
            <button 
              onClick={() => setCurrentPage({ name: 'products' })} 
              className="btn-gold"
              style={{ padding: '12px 24px', fontSize: '0.85rem' }}
            >
              Browse The Collection
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', maxWidth: '800px', margin: '0 auto' }}>
            
            {/* Orders List */}
            {orders.map((order) => (
              <div key={order.id} className="glass-panel" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '15px', border: '1px solid var(--border-color-gold)' }}>
                {/* Header Row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', gap: '10px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ACQUISITION ID:</span>
                    <h4 style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                      #{order.id.split('-')[1].toUpperCase()}
                    </h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PLACED ON:</span>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{order.date}</div>
                  </div>
                  <div>
                    <span className="tag-label" style={{ backgroundColor: 'var(--accent-berry-light)', color: 'var(--accent-berry)', fontWeight: 600, fontSize: '0.75rem', padding: '4px 10px' }}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Items List */}
                <div>
                  <h5 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05rem', marginBottom: '8px', color: 'var(--text-secondary)' }}>Curated Items:</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {order.items.map((item, index) => (
                      <div key={index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                        <span>
                          {item.emoji} <strong>{item.name}</strong> x {item.quantity || 1}
                        </span>
                        <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>₹{item.price * (item.quantity || 1)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grid of details */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', backgroundColor: 'var(--bg-secondary)', padding: '15px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <div>
                    <strong style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Recipient:</strong>
                    <div style={{ fontSize: '0.9rem', fontWeight: 500, marginTop: '2px' }}>{order.customerName}</div>
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>WhatsApp:</strong>
                    <div style={{ fontSize: '0.9rem', fontWeight: 500, marginTop: '2px' }}>{order.phone}</div>
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Target Delivery:</strong>
                    <div style={{ fontSize: '0.9rem', fontWeight: 500, marginTop: '2px' }}>{order.deliveryDate}</div>
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <strong style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Destination Destination:</strong>
                    <div style={{ fontSize: '0.9rem', fontWeight: 500, marginTop: '2px', lineHeight: '1.4' }}>{order.address}</div>
                  </div>
                  {order.notes && order.notes.trim() && (
                    <div style={{ gridColumn: '1 / -1' }}>
                      <strong style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Special Instructions:</strong>
                      <div style={{ fontSize: '0.85rem', fontStyle: 'italic', marginTop: '2px', color: 'var(--text-secondary)' }}>"{order.notes}"</div>
                    </div>
                  )}
                </div>

                {/* Footer and Dispatch actions */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '12px', gap: '15px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-berry)' }}>
                    Total Value: ₹{order.total}
                  </div>
                  
                  <button 
                    onClick={() => handleReSendWhatsApp(order)}
                    className="btn-gold"
                    style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                  >
                    Resend to WhatsApp 💬
                  </button>
                </div>
              </div>
            ))}

            {/* Clear History Panel */}
            <button 
              onClick={onClearHistory}
              className="btn-outline"
              style={{ alignSelf: 'center', marginTop: '10px', fontSize: '0.85rem', padding: '10px 20px' }}
            >
              Clear Order History 🗑️
            </button>
            
          </div>
        )}

      </div>
    </section>
  );
}
