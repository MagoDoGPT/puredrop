import { useEffect } from 'react';
import './LegalLayout.css';

export default function LegalLayout({ title, updated, children }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <main className="legal-page">
      <section className="legal-hero" aria-label={title}>
        <div className="legal-hero__orb" aria-hidden="true"></div>
        <div className="legal-hero__inner">
          <span className="legal-hero__eyebrow">Legal</span>
          <h1 className="legal-hero__title">{title}</h1>
          {updated && <p className="legal-hero__updated">Last updated: {updated}</p>}
        </div>
      </section>

      <article className="legal-body">
        <div className="legal-body__inner">{children}</div>
      </article>
    </main>
  );
}
