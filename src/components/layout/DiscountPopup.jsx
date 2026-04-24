import React, { useState, useEffect } from 'react';
import { X, Droplets } from 'lucide-react';
import styles from './DiscountPopup.module.css';

const DiscountPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already seen/closed the popup
    const hasSeenPopup = localStorage.getItem('puredrop_discount_seen');
    
    if (!hasSeenPopup) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('puredrop_discount_seen', 'true');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for newsletter signup would go here
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button 
          className={styles.closeButton} 
          onClick={handleClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>
        
        <div className={styles.content}>
          <div className={styles.imageCol}>
             <div className={styles.imageOverlay}>
                <Droplets size={54} className={styles.iconDroplets} strokeWidth={1} />
                <h3>PureDrop</h3>
                <p>Advanced Hydration</p>
             </div>
          </div>
          <div className={styles.formCol}>
            <span className={styles.eyebrow}>Exclusive Offer</span>
            <h2>Unlock 10% Off</h2>
            <p>Subscribe to our newsletter to receive 10% off your first order, plus exclusive hydration tips and early access to new products.</p>
            
            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  required 
                />
              </div>
              <button type="submit" className={styles.submitBtn}>
                Claim Offer
              </button>
            </form>
            <p className={styles.disclaimer}>By signing up, you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountPopup;
