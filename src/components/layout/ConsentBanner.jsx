import React, { useState, useEffect } from 'react';
import styles from './ConsentBanner.module.css';

const ConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('puredrop_consent');
    if (!hasConsented) {
      // Small delay so it slides up smoothly after render
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('puredrop_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('puredrop_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <p>
          We use storage to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of storage.
        </p>
      </div>
      <div className={styles.actions}>
        <button className={styles.declineBtn} onClick={handleDecline}>Decline</button>
        <button className={styles.acceptBtn} onClick={handleAccept}>Accept All</button>
      </div>
    </div>
  );
};

export default ConsentBanner;
