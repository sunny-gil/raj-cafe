import React from 'react';

export default function OrderHistory({ orders, onClearHistory, setCurrentPage, onConfirmOrder }) {
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
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${order.phone}&text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  const pendingOrders = orders.filter(o => o.status === 'Pending Confirmation');
  const confirmedOrders = orders.filter(o => o.status === 'Confirmed');

  return (
    <section className="section-padding" style={{ paddingTop: '120px' }}>
      <div className="container animate-fade-in-up">
        {/* Section Header */}
        <div className="section-header">
          <span className="gold-badge">Order Dashboard</span>
          <h2>Your Acquisitions</h2>
          <p>Review, verify, and confirm your custom chocolate curations and boulangerie requests.</p>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '800px', margin: '0 auto' }}>
            
            {/* 1. Pending Confirmations Section */}
            {pendingOrders.length > 0 && (
              <div>
                <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.6rem', textAlign: 'left', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)' }}>
                  ⏳ Pending WhatsApp Confirmation <span className="tag-label" style={{ backgroundColor: 'var(--accent-berry-light)', color: 'var(--accent-berry)' }}>{pendingOrders.length}</span>
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {pendingOrders.map((order) => (
                    <div key={order.id} className="glass-panel" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '15px', border: '1px dashed var(--accent-gold)' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', gap: '10px' }}>
                        <div>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>ACQUISITION ID:</span>
                          <h4 style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 700, fontSize: '0.95rem' }}>#{order.id.split('-')[1].toUpperCase()}</h4>
                        </div>
                        <div>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>PLACED ON:</span>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{order.date}</div>
                        </div>
                        <span className="tag-label" style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', color: '#b38728', fontWeight: 600, fontSize: '0.75rem', padding: '4px 10px' }}>
                          Waiting for Confirmation
                        </span>
                      </div>

                      {/* Items */}
                      <div style={{ fontSize: '0.9rem' }}>
                        {order.items.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span>{item.emoji} {item.name} x {item.quantity || 1}</span>
                            <span style={{ fontWeight: 600 }}>₹{item.price * (item.quantity || 1)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Details Summary */}
                      <div style={{ fontSize: '0.82rem', padding: '10px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                        <div><strong>Contact Phone:</strong> +{order.phone}</div>
                        <div style={{ marginTop: '2px' }}><strong>Destination:</strong> {order.address}</div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-berry)' }}>Total: ₹{order.total}</span>
                        
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            onClick={() => handleReSendWhatsApp(order)}
                            className="btn-outline"
                            style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                          >
                            Resend Msg 💬
                          </button>
                          <button 
                            onClick={() => onConfirmOrder(order.id)}
                            className="btn-gold"
                            style={{ padding: '6px 14px', fontSize: '0.75rem' }}
                          >
                            Confirm Order ✓
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Confirmed Orders Section */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.6rem', textAlign: 'left', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)' }}>
                ✓ Confirmed Active Orders <span className="tag-label" style={{ backgroundColor: 'var(--accent-gold-light)', color: 'var(--text-primary)' }}>{confirmedOrders.length}</span>
              </h3>
              
              {confirmedOrders.length === 0 ? (
                <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No confirmed orders yet. Once a WhatsApp reservation is confirmed, click "Confirm Order ✓" to move it here.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {confirmedOrders.map((order) => (
                    <div key={order.id} className="glass-panel" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '15px', border: '1px solid var(--border-color-gold)' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', gap: '10px' }}>
                        <div>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>ACQUISITION ID:</span>
                          <h4 style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 700, fontSize: '0.95rem' }}>#{order.id.split('-')[1].toUpperCase()}</h4>
                        </div>
                        <div>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>PLACED ON:</span>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{order.date}</div>
                        </div>
                        <span className="tag-label" style={{ backgroundColor: 'var(--accent-gold-light)', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.75rem', padding: '4px 10px' }}>
                          Confirmed & Under Prep
                        </span>
                      </div>

                      {/* Items */}
                      <div style={{ fontSize: '0.9rem' }}>
                        {order.items.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span>{item.emoji} {item.name} x {item.quantity || 1}</span>
                            <span style={{ fontWeight: 600 }}>₹{item.price * (item.quantity || 1)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Details Summary */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.82rem', padding: '10px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                        <div><strong>Recipient:</strong> {order.customerName}</div>
                        <div><strong>Phone:</strong> +{order.phone}</div>
                        <div><strong>Delivery Date:</strong> {order.deliveryDate}</div>
                        <div><strong>Total Value:</strong> ₹{order.total}</div>
                        <div style={{ gridColumn: '1 / -1', marginTop: '2px' }}><strong>Address:</strong> {order.address}</div>
                        {order.notes && (
                          <div style={{ gridColumn: '1 / -1', borderTop: '1px solid var(--border-color)', paddingTop: '4px', marginTop: '4px', fontStyle: 'italic' }}>
                            "Notes: {order.notes}"
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-berry)' }}>Paid: ₹{order.total}</span>
                        <button 
                          onClick={() => handleReSendWhatsApp(order)}
                          className="btn-outline"
                          style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                        >
                          Conntact Customer 💬
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

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
