import { useRef, useEffect } from 'react';
import './TrustIconsBar.css';

export default function TrustIconsBar() {
  const gridRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Fade in effect on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    // Spotlight effect
    if (!gridRef.current) return;
    cardsRef.current.forEach((card) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  };

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section className="trust-icons">
      <div className="container">
        <div className="trust-grid" ref={gridRef} onMouseMove={handleMouseMove}>
          
          <div className="trust-card" ref={addToRefs} style={{ transitionDelay: '0s' }}>
            <div className="trust-icon">
              <svg viewBox="0 0 24 24">
                <path d="M10 3h4v4l5 12H5l5-12z" fill="rgba(0,165,255,0.1)"/>
              </svg>
            </div>
            <p className="trust-text">Lab Tested</p>
          </div>

          <div className="trust-card" ref={addToRefs} style={{ transitionDelay: '0.1s' }}>
            <div className="trust-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
            </div>
            <p className="trust-text">Patented Technology</p>
          </div>

          <div className="trust-card" ref={addToRefs} style={{ transitionDelay: '0.2s' }}>
            <div className="trust-icon">
              <svg viewBox="0 0 24 24">
                <rect x="1" y="3" width="15" height="13"/>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
            </div>
            <p className="trust-text">Free Shipping</p>
          </div>

          <div className="trust-card" ref={addToRefs} style={{ transitionDelay: '0.3s' }}>
            <div className="trust-icon">
              <svg viewBox="0 0 24 24">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/>
              </svg>
            </div>
            <p className="trust-text">30-Day Guarantee</p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
