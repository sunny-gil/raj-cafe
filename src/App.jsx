import { useState, useEffect } from 'react';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import ProductDetail from './components/ProductDetail';
import ChocolateBoxBuilder from './components/ChocolateBoxBuilder';
import OurStory from './components/OurStory';
import AboutUs from './components/AboutUs';
import Reviews from './components/Reviews';
import Blogs from './components/Blogs';
import OrderForm from './components/OrderForm';
import Footer from './components/Footer';
import OrderHistory from './components/OrderHistory';

export default function App() {
  const [currentPage, setCurrentPage] = useState({ name: 'home', anchor: null, params: {} });
  const [cart, setCart] = useState([]);
  const [isAccessibilityMode, setIsAccessibilityMode] = useState(() => {
    return localStorage.getItem('rajcafe_accessibility') === 'true';
  });
  const [toasts, setToasts] = useState([]);
  
  // Custom orders state with local storage synchronization
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('rajcafe_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const handleAddOrder = (newOrder) => {
    setOrders(prevOrders => {
      const nextOrders = [newOrder, ...prevOrders];
      localStorage.setItem('rajcafe_orders', JSON.stringify(nextOrders));
      return nextOrders;
    });
  };

  const handleConfirmOrder = (orderId) => {
    setOrders(prevOrders => {
      const nextOrders = prevOrders.map(order => 
        order.id === orderId ? { ...order, status: 'Confirmed' } : order
      );
      localStorage.setItem('rajcafe_orders', JSON.stringify(nextOrders));
      showToast('Order confirmed and moved to active orders! ✓');
      return nextOrders;
    });
  };

  const handleClearHistory = () => {
    setOrders([]);
    localStorage.removeItem('rajcafe_orders');
    showToast('Cleared your order history successfully.');
  };

  // Sync accessibility mode class to document body
  useEffect(() => {
    if (isAccessibilityMode) {
      document.body.classList.add('accessibility-mode');
    } else {
      document.body.classList.remove('accessibility-mode');
    }
  }, [isAccessibilityMode]);

  // Handle routing navigation scrolling (e.g. scroll to anchor after rendering)
  useEffect(() => {
    if (currentPage.anchor) {
      // Tiny delay to let react draw the elements
      const timer = setTimeout(() => {
        const element = document.getElementById(currentPage.anchor);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          window.scrollTo({
            top: elementRect - bodyRect - offset,
            behavior: 'smooth'
          });
        }
      }, 150);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [currentPage]);

  // Toggle senior citizen accessibility mode
  const toggleAccessibility = () => {
    setIsAccessibilityMode(prev => {
      const nextMode = !prev;
      localStorage.setItem('rajcafe_accessibility', String(nextMode));
      if (nextMode) {
        document.body.classList.add('accessibility-mode');
        showToast('Accessibility Mode Activated: High Contrast & Large Text', 'success');
      } else {
        document.body.classList.remove('accessibility-mode');
        showToast('Standard Mode Activated', 'success');
      }
      return nextMode;
    });
  };

  // Toast Notification handler
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Automatically clear toast after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // Add standard product to cart
  const handleAddToOrder = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        showToast(`Increased quantity of ${product.name} in your cart! 🥐`);
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        showToast(`Added ${product.name} to your pre-order! 🍰`);
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Add custom chocolate box to cart
  const handleAddBoxToOrder = (boxItem) => {
    setCart(prevCart => [...prevCart, boxItem]);
  };

  // Remove single item from cart
  const handleRemoveItem = (itemId) => {
    setCart(prevCart => {
      const targetItem = prevCart.find(item => item.id === itemId);
      if (targetItem) {
        showToast(`Removed ${targetItem.name} from selection.`);
      }
      return prevCart.filter(item => item.id !== itemId);
    });
  };

  // Clear entire cart selection
  const handleClearCart = () => {
    setCart([]);
    showToast('Cleared all items in your cart.');
  };

  const totalCartItemsCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  // Router View Switcher
  const renderMainContent = () => {
    switch (currentPage.name) {
      case 'home':
        return (
          <>
            <Hero 
              onExploreClick={() => setCurrentPage({ name: 'products', anchor: null })} 
              onBuildClick={() => setCurrentPage({ name: 'home', anchor: 'builder' })} 
            />
            <ProductShowcase 
              onAddToOrder={handleAddToOrder}
              onProductClick={(p) => setCurrentPage({ name: 'product-detail', params: { product: p } })}
            />
            <ChocolateBoxBuilder 
              onAddBoxToOrder={handleAddBoxToOrder}
              showToast={showToast}
            />
            <OurStory />
            <OrderForm 
              cart={cart}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
              showToast={showToast}
              onAddOrder={handleAddOrder}
            />
          </>
        );
      
      case 'products':
        return (
          <ProductShowcase 
            onAddToOrder={handleAddToOrder}
            onProductClick={(p) => setCurrentPage({ name: 'product-detail', params: { product: p } })}
          />
        );

      case 'product-detail':
        return (
          <ProductDetail 
            product={currentPage.params.product}
            onBackClick={() => setCurrentPage({ name: 'products', anchor: null })}
            onAddToOrder={handleAddToOrder}
          />
        );

      case 'about':
        return <AboutUs />;

      case 'reviews':
        return <Reviews />;

      case 'blogs':
        return <Blogs />;

      case 'orders':
        return (
          <OrderHistory 
            orders={orders} 
            onClearHistory={handleClearHistory} 
            setCurrentPage={setCurrentPage} 
            onConfirmOrder={handleConfirmOrder}
          />
        );

      default:
        return (
          <div style={{ padding: '160px 0', textAlign: 'center' }}>
            <h2>404 - Page Not Found</h2>
            <button onClick={() => setCurrentPage({ name: 'home' })} className="btn-gold">Go Home</button>
          </div>
        );
    }
  };

  return (
    <>
      {/* Sticky Header Navigation */}
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={totalCartItemsCount} 
        isAccessibilityMode={isAccessibilityMode}
        toggleAccessibility={toggleAccessibility}
      />

      {/* Dynamic View Panel */}
      <main style={{ minHeight: '80vh' }}>
        {renderMainContent()}
      </main>

      {/* Footer Details */}
      <Footer />

      {/* Floating Toast Notification Container */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast ${toast.type === 'error' ? 'error' : ''}`}>
            {toast.type === 'error' ? '⚠️' : '✨'} {toast.message}
          </div>
        ))}
      </div>
    </>
  );
}
