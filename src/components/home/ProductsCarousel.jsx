import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import ProductIcon from '../product/ProductIcon';
import { products } from '../../data/products';
import './ProductsCarousel.css';

gsap.registerPlugin(ScrollTrigger);

// Carousel highlights the working range — Signature has its own dedicated
// section above, and Replacement Cartridges live in their own accessory tier.
const carouselProducts = products.filter(
  (p) => !p.signature && p.handle !== 'replacement-cartridges'
);

const formatPrice = (p) => {
  if (p.quoteOnly) return `From ${p.currencySymbol}${p.priceFrom.toLocaleString()}`;
  return `${p.currencySymbol}${p.price.toFixed(2)}`;
};

export default function ProductsCarousel() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.getAll().forEach((st) => {
      if (st.trigger === sectionRef.current) st.kill(true);
    });

    const prodSection = sectionRef.current;
    const track = trackRef.current;

    const updateWidth = () => {
      if (track && prodSection) {
        track.style.setProperty('--vw-exact', `${prodSection.offsetWidth}px`);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    const ctx = gsap.context(() => {
      if (!prodSection || !track) return;

      const cards = track.querySelectorAll('.product-card');

      function getScrollAmount() {
        updateWidth();
        return -(track.scrollWidth - prodSection.offsetWidth);
      }

      const hTween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        paused: true,
      });

      ScrollTrigger.create({
        trigger: prodSection,
        start: 'top top',
        end: () => '+=' + Math.abs(getScrollAmount()),
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        animation: hTween,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.width = self.progress * 100 + '%';
          }
          
          const viewportCenter = window.innerWidth / 2;
          let closestIdx = 0;
          let minDistance = Infinity;
          
          cards.forEach((c, i) => {
            const rect = c.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const distance = Math.abs(viewportCenter - cardCenter);
            
            if (distance < minDistance) {
              minDistance = distance;
              closestIdx = i;
            }
          });
          
          cards.forEach((c, i) => {
            if (i === closestIdx) {
              c.classList.add('active');
            } else {
              c.classList.remove('active');
            }
          });
        },
      });

      gsap.to('.products-bg-text', {
        x: '-15%',
        ease: 'none',
        scrollTrigger: {
          trigger: prodSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });

      const obsElements = document.querySelectorAll(
        '.products-title-group > h2, .products-title-group > p'
      );
      obsElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition =
          'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        el.style.transitionDelay = i * 0.1 + 's';
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      obsElements.forEach((el) => observer.observe(el));

      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: prodSection,
          start: 'top 75%',
        }
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      window.removeEventListener('resize', updateWidth);
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill(true);
      });
      ctx.revert();
    };
  }, []);

  return (
    <section className="products-section" id="products" ref={sectionRef}>
      <div className="products-ambient-blob"></div>

      <div className="products-top-wave" aria-hidden="true">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.56,189.56,98.63,243.68,79.52,284.14,64.44,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="products-bg-text" aria-hidden="true">PUREDROP</div>

      <div className="products-header">
        <div className="products-title-group">
          <h2>Filtration For Every Drop</h2>
          <p>The full range — from countertop to whole-home — engineered around our patented Signature.</p>
        </div>
      </div>

      <div className="products-carousel-wrap">
        <div className="products-track" id="prod-track" ref={trackRef}>
          {carouselProducts.map((p) => (
            <article className="product-card" key={p.handle}>
              <div className="product-img-wrap">
                <ProductIcon name={p.heroIcon} />
              </div>
              <div className="product-info">
                <h3 className="product-name">{p.name}</h3>
                <p className="product-desc">{p.shortDescription}</p>
                <div className="product-btm">
                  <span className="product-price">{formatPrice(p)}</span>
                  <Link
                    to={`/products/${p.handle}`}
                    className="product-btn"
                    aria-label={`View ${p.name}`}
                  >
                    View
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="products-progress">
        <div className="products-progress-fill" id="prod-progress" ref={progressRef}></div>
      </div>
    </section>
  );
}
