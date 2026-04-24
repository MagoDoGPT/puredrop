import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { blogPosts } from '../data/blog';
import './BlogPage.css';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogPage() {
  const rootRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const ctx = gsap.context(() => {
      gsap.from('.blog-hero__eyebrow, .blog-hero__title, .blog-hero__subtitle', {
        opacity: 0, y: 30, duration: 1, ease: 'power3.out', stagger: 0.12,
      });
      gsap.from('.blog-card', {
        opacity: 0, y: 40, duration: 0.8, ease: 'power3.out', stagger: 0.1, delay: 0.2,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const [featured, ...rest] = blogPosts;

  return (
    <main className="blog-page" ref={rootRef}>
      <section className="blog-hero">
        <div className="blog-hero__orb" aria-hidden="true"></div>
        <div className="blog-hero__inner">
          <span className="blog-hero__eyebrow">Journal</span>
          <h1 className="blog-hero__title">Notes on water, wellness, and what&apos;s really in your glass.</h1>
          <p className="blog-hero__subtitle">Essays, lab notes, and conversations with scientists on the stuff that shapes every sip.</p>
        </div>
      </section>

      {featured && (
        <section className="blog-featured">
          <div className="blog-featured__inner">
            <Link to={`/blog/${featured.slug}`} className="blog-featured__card">
              <div
                className="blog-featured__media"
                style={{ background: `radial-gradient(circle at 30% 40%, ${featured.accent}30 0%, transparent 70%), linear-gradient(135deg, #0B2D5E, #1A3F75)` }}
              >
                <span className="blog-featured__pill">Featured · {featured.category}</span>
              </div>
              <div className="blog-featured__body">
                <span className="blog-featured__meta">{formatDate(featured.date)} · {featured.readTime} min read</span>
                <h2 className="blog-featured__title">{featured.title}</h2>
                <p className="blog-featured__excerpt">{featured.excerpt}</p>
                <span className="blog-featured__author">By {featured.author.name}, {featured.author.role}</span>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="blog-list">
        <div className="blog-list__inner">
          <h2 className="blog-list__title">More from the Journal</h2>
          <div className="blog-grid">
            {rest.map((p) => (
              <Link to={`/blog/${p.slug}`} className="blog-card" key={p.slug}>
                <div
                  className="blog-card__media"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${p.accent}50 0%, transparent 70%)` }}
                >
                  <span className="blog-card__category">{p.category}</span>
                </div>
                <div className="blog-card__body">
                  <span className="blog-card__meta">{formatDate(p.date)} · {p.readTime} min</span>
                  <h3 className="blog-card__title">{p.title}</h3>
                  <p className="blog-card__excerpt">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
