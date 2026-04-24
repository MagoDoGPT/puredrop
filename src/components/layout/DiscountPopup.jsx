import { useState, useEffect } from 'react';
import { X, Droplets } from 'lucide-react';
import styles from './DiscountPopup.module.css';

const STORAGE_KEY = 'puredrop_discount_seen_at';
const DISMISS_MS = 7 * 24 * 60 * 60 * 1000;
const SCROLL_THRESHOLD = 0.4;
const TIME_THRESHOLD_MS = 30000;

const DiscountPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const seenAt = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    if (seenAt && Date.now() - seenAt < DISMISS_MS) return;

    let triggered = false;
    let timeTimer;

    const show = () => {
      if (triggered) return;
      triggered = true;
      setIsVisible(true);
      cleanup();
    };

    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= SCROLL_THRESHOLD) show();
    };

    const cleanup = () => {
      clearTimeout(timeTimer);
      window.removeEventListener('scroll', handleScroll);
    };

    timeTimer = setTimeout(show, TIME_THRESHOLD_MS);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return cleanup;
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  };

  useEffect(() => {
    if (!isVisible) return;
    const handleKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isVisible]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className={styles.popup} role="dialog" aria-label="Newsletter signup">
      <button
        className={styles.closeButton}
        onClick={handleClose}
        aria-label="Close dialog"
      >
        <X size={18} />
      </button>

      <div className={styles.iconBadge}>
        <Droplets size={22} strokeWidth={1.5} />
      </div>

      <span className={styles.eyebrow}>Exclusive Offer</span>
      <h2 className={styles.title}>Unlock 10% Off</h2>
      <p className={styles.copy}>
        Subscribe for 10% off your first order and early access to new drops.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your email address"
          required
          className={styles.input}
        />
        <button type="submit" className={styles.submitBtn}>
          Claim Offer
        </button>
      </form>

      <p className={styles.disclaimer}>We respect your privacy. Unsubscribe anytime.</p>
    </div>
  );
};

export default DiscountPopup;
