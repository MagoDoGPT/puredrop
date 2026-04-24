import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { faqCategories } from '../data/faq';
import './FAQPage.css';

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].id);
  const [query, setQuery] = useState('');
  const [openIndex, setOpenIndex] = useState({ cat: faqCategories[0].id, i: 0 });
  const sectionRefs = useRef({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleCategoryClick = (id) => {
    setActiveCategory(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filtered = query.trim()
    ? faqCategories
        .map((c) => ({
          ...c,
          items: c.items.filter(
            (i) =>
              i.q.toLowerCase().includes(query.toLowerCase()) ||
              i.a.toLowerCase().includes(query.toLowerCase())
          ),
        }))
        .filter((c) => c.items.length > 0)
    : faqCategories;

  return (
    <main className="faq-page">
      <section className="faq-hero">
        <div className="faq-hero__orb" aria-hidden="true"></div>
        <div className="faq-hero__inner">
          <span className="faq-hero__eyebrow">Support</span>
          <h1 className="faq-hero__title">How can we help?</h1>
          <p className="faq-hero__subtitle">Answers to the questions we&apos;re asked most. Can&apos;t find what you need? <Link to="/contact">Talk to a human</Link>.</p>

          <div className="faq-search">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="search"
              placeholder="Search help articles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="faq-body">
        <div className="faq-body__inner">
          {!query.trim() && (
            <nav className="faq-nav" aria-label="FAQ categories">
              {faqCategories.map((c) => (
                <button
                  key={c.id}
                  className={`faq-nav__btn ${activeCategory === c.id ? 'faq-nav__btn--active' : ''}`}
                  onClick={() => handleCategoryClick(c.id)}
                >
                  {c.title}
                </button>
              ))}
            </nav>
          )}

          <div className="faq-categories">
            {filtered.map((cat) => (
              <section
                key={cat.id}
                className="faq-category"
                ref={(el) => { sectionRefs.current[cat.id] = el; }}
              >
                <h2 className="faq-category__title">{cat.title}</h2>
                <div className="faq-list">
                  {cat.items.map((item, i) => {
                    const isOpen = openIndex.cat === cat.id && openIndex.i === i;
                    return (
                      <div key={item.q} className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
                        <button
                          className="faq-item__q"
                          aria-expanded={isOpen}
                          onClick={() => setOpenIndex(isOpen ? { cat: '', i: -1 } : { cat: cat.id, i })}
                        >
                          <span>{item.q}</span>
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </button>
                        <div className="faq-item__a"><p>{item.a}</p></div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}

            {filtered.length === 0 && (
              <p className="faq-empty">
                No results for &ldquo;{query}&rdquo;. Try a different search or <Link to="/contact">contact us</Link>.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
