import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export default function NotFoundPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <main className="nf-page">
      <div className="nf-orb nf-orb--1" aria-hidden="true"></div>
      <div className="nf-orb nf-orb--2" aria-hidden="true"></div>

      <div className="nf-inner">
        <span className="nf-code">404</span>
        <h1 className="nf-title">This page evaporated.</h1>
        <p className="nf-subtitle">
          The link you followed is broken or the page has moved. No drama — let&apos;s get you somewhere useful.
        </p>
        <div className="nf-actions">
          <Link to="/" className="nf-btn nf-btn--primary">
            Back to home
            <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
          <Link to="/shop" className="nf-btn nf-btn--ghost">Shop the collection</Link>
        </div>

        <div className="nf-links">
          <span>Or try:</span>
          <Link to="/science">The Science</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </main>
  );
}
