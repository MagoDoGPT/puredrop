import { useEffect, useRef, useState } from 'react';
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { getProductByHandle, getRelatedProducts } from '../data/products';

gsap.registerPlugin(ScrollTrigger);
import ProductIcon from '../components/product/ProductIcon';
import { useCart } from '../context/CartContext';
import './ProductPage.css';

export default function ProductPage() {
  const { handle } = useParams();
  const product = getProductByHandle(handle);
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [purchaseMode, setPurchaseMode] = useState('oneTime');
  const [openFaq, setOpenFaq] = useState(0);
  const rootRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [handle]);

  useEffect(() => {
    if (!product) return;
    const ctx = gsap.context(() => {
      gsap.from('.pp-info__eyebrow, .pp-info__title, .pp-info__tagline, .pp-info__rating, .pp-info__price-row, .pp-info__desc, .pp-purchase, .pp-cta-row, .pp-info__highlights', {
        opacity: 0,
        y: 24,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.07,
        delay: 0.1,
      });
      gsap.from('.pp-gallery__main', { opacity: 0, scale: 0.96, duration: 1, ease: 'power3.out' });
      gsap.from('.pp-gallery__thumb', { opacity: 0, x: -18, duration: 0.6, ease: 'power3.out', stagger: 0.08, delay: 0.3 });

      if (product.signature) {
        gsap.from('.pp-story__pillar', {
          opacity: 0,
          y: 36,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '.pp-story', start: 'top 75%' },
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, [product]);

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  const isSignature = !!product.signature;
  const isQuoteOnly = !!product.quoteOnly;

  const related = getRelatedProducts(handle);
  const subscribePrice = isQuoteOnly ? null : +(product.price * 0.85).toFixed(2);
  const currentUnitPrice = purchaseMode === 'subscribe' ? subscribePrice : product.price;

  const handleQtyChange = (delta) => {
    setQty((q) => Math.max(1, Math.min(10, q + delta)));
  };

  const handleAddToCart = () => {
    addItem({
      handle: product.handle,
      name: product.name,
      tagline: product.tagline,
      heroIcon: product.heroIcon,
      colorAccent: product.colorAccent,
      currency: product.currency,
      currencySymbol: product.currencySymbol,
      purchaseType: purchaseMode,
      unitPrice: currentUnitPrice,
      qty,
    });
    navigate('/cart');
  };

  return (
    <main
      className={`product-page ${isSignature ? 'product-page--signature' : ''}`}
      ref={rootRef}
    >
      <nav className="pp-breadcrumbs" aria-label="Breadcrumb">
        <div className="pp-breadcrumbs__inner">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/shop">Shop</Link>
          <span aria-hidden="true">/</span>
          <span className="pp-breadcrumbs__current">{product.name}</span>
        </div>
      </nav>

      <section className="pp-main" aria-label={`${product.name} details`}>
        <div className="pp-main__inner">
          {/* ── Gallery ── */}
          <div className="pp-gallery">
            <div className="pp-gallery__thumbs" role="tablist" aria-label="Product images">
              {product.gallery.map((g, i) => (
                <button
                  key={g.id}
                  role="tab"
                  aria-selected={activeImage === i}
                  aria-label={g.label}
                  className={`pp-gallery__thumb ${activeImage === i ? 'pp-gallery__thumb--active' : ''}`}
                  onClick={() => setActiveImage(i)}
                  style={{ background: `linear-gradient(135deg, ${product.colorAccent}18, ${isSignature ? '#0a1f3d' : '#ffffff'})` }}
                >
                  <ProductIcon name={g.icon} className="pp-gallery__thumb-icon" stroke={isSignature ? '#FFFFFF' : product.colorAccent} />
                </button>
              ))}
            </div>

            <div
              className="pp-gallery__main"
              style={{ background: `radial-gradient(circle at 50% 40%, ${product.colorAccent}33 0%, ${isSignature ? '#0a1f3d' : 'transparent'} 75%)` }}
            >
              {product.badge && (
                <span className={`pp-gallery__badge ${isSignature ? 'pp-gallery__badge--signature' : ''}`}>
                  {product.badge}
                </span>
              )}
              <ProductIcon
                name={product.gallery[activeImage]?.icon || product.heroIcon}
                className="pp-gallery__hero"
                stroke={isSignature ? '#FFFFFF' : product.colorAccent}
              />
            </div>
          </div>

          {/* ── Info ── */}
          <div className="pp-info">
            <span className="pp-info__eyebrow">{product.category}</span>
            <h1 className="pp-info__title">{product.name}</h1>
            <p className="pp-info__tagline">{product.tagline}</p>

            <div className="pp-info__rating" aria-label={`${product.rating} stars, ${product.reviews} reviews`}>
              <span className="pp-info__stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" fill={i < Math.round(product.rating) ? '#00A5FF' : '#E2E8F0'}>
                    <path d="M12 2l2.6 6.8L22 10l-5.4 4.7L18 22l-6-3.8L6 22l1.4-7.3L2 10l7.4-1.2L12 2z" />
                  </svg>
                ))}
              </span>
              <span className="pp-info__rating-label">
                {product.rating} · {product.reviews.toLocaleString()} reviews
              </span>
            </div>

            <div className="pp-info__price-row">
              {isQuoteOnly ? (
                <>
                  <span className="pp-info__price-prefix">From</span>
                  <span className="pp-info__price-now">{product.currencySymbol}{product.priceFrom.toLocaleString()}</span>
                  <span className="pp-info__price-note">survey based</span>
                </>
              ) : (
                <>
                  {product.compareAtPrice && (
                    <span className="pp-info__price-old">{product.currencySymbol}{product.compareAtPrice}</span>
                  )}
                  <span className="pp-info__price-now">{product.currencySymbol}{currentUnitPrice}</span>
                  {purchaseMode === 'subscribe' && (
                    <span className="pp-info__price-note">Save 15%</span>
                  )}
                </>
              )}
            </div>

            <p className="pp-info__desc">{product.longDescription}</p>

            {!isQuoteOnly && (
              <div className="pp-purchase" role="radiogroup" aria-label="Purchase option">
                <button
                  role="radio"
                  aria-checked={purchaseMode === 'oneTime'}
                  className={`pp-purchase__option ${purchaseMode === 'oneTime' ? 'pp-purchase__option--active' : ''}`}
                  onClick={() => setPurchaseMode('oneTime')}
                >
                  <span className="pp-purchase__radio" aria-hidden="true"></span>
                  <span className="pp-purchase__label">One-time purchase</span>
                  <span className="pp-purchase__price">{product.currencySymbol}{product.price}</span>
                </button>

                <button
                  role="radio"
                  aria-checked={purchaseMode === 'subscribe'}
                  className={`pp-purchase__option pp-purchase__option--featured ${purchaseMode === 'subscribe' ? 'pp-purchase__option--active' : ''}`}
                  onClick={() => setPurchaseMode('subscribe')}
                >
                  <span className="pp-purchase__radio" aria-hidden="true"></span>
                  <span className="pp-purchase__stack">
                    <span className="pp-purchase__label">Subscribe & Save 15%</span>
                    <span className="pp-purchase__sub">Refill every 3 months · Skip or cancel any time</span>
                  </span>
                  <span className="pp-purchase__price">{product.currencySymbol}{subscribePrice}</span>
                </button>
              </div>
            )}

            <div className="pp-cta-row">
              {isQuoteOnly ? (
                <Link to="/contact" className="pp-add-cart pp-add-cart--quote">
                  <span className="pp-add-cart__wave" aria-hidden="true"></span>
                  Request a free survey
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              ) : (
                <>
                  <div className="pp-qty" aria-label="Quantity">
                    <button className="pp-qty__btn" onClick={() => handleQtyChange(-1)} aria-label="Decrease quantity">−</button>
                    <span className="pp-qty__value" aria-live="polite">{qty}</span>
                    <button className="pp-qty__btn" onClick={() => handleQtyChange(1)} aria-label="Increase quantity">+</button>
                  </div>

                  <button className="pp-add-cart" onClick={handleAddToCart}>
                    <span className="pp-add-cart__wave" aria-hidden="true"></span>
                    Add to cart — {product.currencySymbol}{(currentUnitPrice * qty).toFixed(2)}
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            <ul className="pp-info__highlights">
              {product.highlights.map((h) => (
                <li key={h}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Signature story (flagship only) ── */}
      {isSignature && product.pillars && (
        <section className="pp-story" aria-label="The four transformations">
          <div className="pp-story__inner">
            <div className="pp-story__header">
              <span className="pp-story__eyebrow">Patented technology</span>
              <h2 className="pp-story__title">
                Four transformations.<br />
                <span className="pp-story__title-accent">One bottle.</span>
              </h2>
              <p className="pp-story__lead">
                In a single chamber, the Signature Bottle performs four sequential
                transformations on ordinary water. No other portable bottle in the world
                combines all four — protected by patents <em>GB2587910</em> and <em>EP3978456</em>.
              </p>
            </div>

            <ol className="pp-story__pillars">
              {product.pillars.map((p, i) => (
                <li className="pp-story__pillar" key={p.id}>
                  <span className="pp-story__step">0{i + 1}</span>
                  <div className="pp-story__pillar-icon" aria-hidden="true">
                    <ProductIcon name={p.icon} stroke="#0EA5E9" />
                  </div>
                  <h3 className="pp-story__pillar-title">{p.title}</h3>
                  <p className="pp-story__pillar-copy">{p.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ── Specs ── */}
      <section className="pp-specs" aria-label="Specifications">
        <div className="pp-specs__inner">
          <h2 className="pp-section-title">Specifications</h2>
          <div className="pp-specs__grid">
            {product.specs.map((s) => (
              <div className="pp-spec" key={s.label}>
                <dt className="pp-spec__label">{s.label}</dt>
                <dd className="pp-spec__value">{s.value}</dd>
              </div>
            ))}
          </div>

          <div className="pp-box">
            <h3 className="pp-box__title">{isQuoteOnly ? 'What\'s included' : 'In the box'}</h3>
            <ul className="pp-box__list">
              {product.inTheBox.map((item) => (
                <li key={item}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5L20 7" /></svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="pp-faq" aria-label="Frequently asked questions">
        <div className="pp-faq__inner">
          <h2 className="pp-section-title">Questions, answered</h2>
          <div className="pp-faq__list">
            {product.faq.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={item.q}
                  className={`pp-faq__item ${isOpen ? 'pp-faq__item--open' : ''}`}
                >
                  <button
                    className="pp-faq__q"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                  >
                    <span>{item.q}</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                  <div className="pp-faq__a">
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Related ── */}
      {related.length > 0 && (
        <section className="pp-related" aria-label="You might also like">
          <div className="pp-related__inner">
            <h2 className="pp-section-title">You might also like</h2>
            <div className="pp-related__grid">
              {related.map((r) => (
                <Link to={`/products/${r.handle}`} className="pp-related__card" key={r.handle}>
                  <div
                    className="pp-related__media"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${r.colorAccent}22 0%, transparent 70%)` }}
                  >
                    <ProductIcon name={r.heroIcon} className="pp-related__icon" stroke={r.colorAccent} />
                  </div>
                  <div className="pp-related__body">
                    <span className="pp-related__category">{r.category}</span>
                    <h3 className="pp-related__name">{r.name}</h3>
                    <span className="pp-related__price">
                      {r.quoteOnly
                        ? `From ${r.currencySymbol}${r.priceFrom.toLocaleString()}`
                        : `${r.currencySymbol}${r.price}`}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
