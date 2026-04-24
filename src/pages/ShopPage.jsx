import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { products, CATEGORIES } from '../data/products';
import ProductIcon from '../components/product/ProductIcon';
import './ShopPage.css';

const CATEGORY_LIST = ['All', ...Object.values(CATEGORIES)];
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

const sortPrice = (p) => (p.quoteOnly ? p.priceFrom : p.price);

export default function ShopPage() {
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('featured');
  const heroRef = useRef(null);
  const gridRef = useRef(null);

  const visibleProducts = useMemo(() => {
    const filtered = category === 'All' ? products : products.filter((p) => p.category === category);
    const sorted = [...filtered];
    if (sort === 'price-asc') sorted.sort((a, b) => sortPrice(a) - sortPrice(b));
    else if (sort === 'price-desc') sorted.sort((a, b) => sortPrice(b) - sortPrice(a));
    else if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    // 'featured' keeps source order, which already places signature first
    return sorted;
  }, [category, sort]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const ctx = gsap.context(() => {
      gsap.from('.shop-hero__eyebrow, .shop-hero__title, .shop-hero__subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.shop-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08 }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [visibleProducts]);

  return (
    <main className="shop-page">
      <section className="shop-hero" ref={heroRef} aria-label="Shop hero">
        <div className="shop-hero__orb shop-hero__orb--1" aria-hidden="true"></div>
        <div className="shop-hero__orb shop-hero__orb--2" aria-hidden="true"></div>

        <div className="shop-hero__inner">
          <span className="shop-hero__eyebrow">Shop the Collection</span>
          <h1 className="shop-hero__title">
            Pure water, <span className="shop-hero__accent">every way</span> you drink it.
          </h1>
          <p className="shop-hero__subtitle">
            From the patented Signature Bottle to whole-home installation — every product is engineered to remove what shouldn&apos;t be there and restore what should.
          </p>
        </div>
      </section>

      <section className="shop-toolbar" aria-label="Filter and sort">
        <div className="shop-toolbar__inner">
          <div className="shop-filters" role="tablist" aria-label="Product categories">
            {CATEGORY_LIST.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={category === cat}
                className={`shop-filter ${category === cat ? 'shop-filter--active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="shop-sort">
            <label htmlFor="shop-sort-select" className="shop-sort__label">Sort by</label>
            <select
              id="shop-sort-select"
              className="shop-sort__select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="shop-grid-wrap" aria-label="Products">
        <div className="shop-grid" ref={gridRef}>
          {visibleProducts.map((p) => {
            const isSignature = p.signature && sort === 'featured';
            const cardClass = `shop-card ${isSignature ? 'shop-card--signature' : ''} ${p.signature ? 'shop-card--has-signature-badge' : ''}`;
            const badgeClass = `shop-card__badge ${p.signature ? 'shop-card__badge--signature' : ''}`;

            return (
              <article className={cardClass} key={p.handle}>
                <Link to={`/products/${p.handle}`} className="shop-card__media" aria-label={`View ${p.name}`}>
                  {p.badge && <span className={badgeClass}>{p.badge}</span>}
                  <div
                    className="shop-card__media-bg"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${p.colorAccent}22 0%, transparent 70%)` }}
                  ></div>
                  <ProductIcon name={p.heroIcon} className="shop-card__icon" stroke={p.colorAccent} />
                </Link>

                <div className="shop-card__body">
                  <span className="shop-card__category">{p.category}</span>
                  <h3 className="shop-card__name">{p.name}</h3>
                  <p className="shop-card__tagline">{p.tagline}</p>

                  <div className="shop-card__rating" aria-label={`${p.rating} stars, ${p.reviews} reviews`}>
                    <span className="shop-card__stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} viewBox="0 0 24 24" fill={i < Math.round(p.rating) ? '#00A5FF' : '#E2E8F0'}>
                          <path d="M12 2l2.6 6.8L22 10l-5.4 4.7L18 22l-6-3.8L6 22l1.4-7.3L2 10l7.4-1.2L12 2z" />
                        </svg>
                      ))}
                    </span>
                    <span className="shop-card__reviews">({p.reviews.toLocaleString()})</span>
                  </div>

                  <div className="shop-card__footer">
                    <div className="shop-card__price">
                      {p.quoteOnly ? (
                        <>
                          <span className="shop-card__price-prefix">From</span>
                          <span className="shop-card__price-now">{p.currencySymbol}{p.priceFrom.toLocaleString()}</span>
                        </>
                      ) : (
                        <>
                          {p.compareAtPrice && (
                            <span className="shop-card__price-old">{p.currencySymbol}{p.compareAtPrice}</span>
                          )}
                          <span className="shop-card__price-now">{p.currencySymbol}{p.price}</span>
                        </>
                      )}
                    </div>
                    <Link to={`/products/${p.handle}`} className="shop-card__cta">
                      {p.quoteOnly ? 'Request quote' : 'View'}
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}

          {visibleProducts.length === 0 && (
            <p className="shop-empty">No products match this filter.</p>
          )}
        </div>
      </section>
    </main>
  );
}
