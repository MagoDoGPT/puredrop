import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ProductIcon from '../product/ProductIcon';
import { getSignatureProduct } from '../../data/products';
import './SignatureSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function SignatureSection() {
  const sectionRef = useRef(null);
  const product = getSignatureProduct();

  useEffect(() => {
    if (!product) return;
    const ctx = gsap.context(() => {
      // 1. Water-clearing text reveal
      gsap.from('.sig-title, .sig-tagline, .sig-cta-row', {
        opacity: 0,
        y: 40,
        filter: 'blur(12px)',
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });

      // 2. Product emerges elastically like a drop
      gsap.from('.sig-product', {
        opacity: 0,
        y: 80,
        scale: 0.8,
        filter: 'blur(10px)',
        duration: 1.5,
        ease: 'elastic.out(1, 0.75)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      });

      // 3. Continuous water levitation for the product icon
      gsap.to('.sig-product__icon', {
        y: -15,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });

      // 4. Pillars slide in from sides like fluid
      gsap.from('.sig-pillars--left .sig-pillar', {
        opacity: 0,
        x: -60,
        filter: 'blur(8px)',
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: { trigger: '.sig-stage', start: 'top 70%' },
      });

      gsap.from('.sig-pillars--right .sig-pillar', {
        opacity: 0,
        x: 60,
        filter: 'blur(8px)',
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: { trigger: '.sig-stage', start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [product]);

  if (!product) return null;

  return (
    <section className="signature-section" ref={sectionRef} aria-label="Signature product">
      <div className="sig-orb sig-orb--1" aria-hidden="true"></div>
      <div className="sig-orb sig-orb--2" aria-hidden="true"></div>

      <div className="sig-inner">
        <div className="sig-header">
          <h2 className="sig-title">
            One bottle.<br />
            <span className="sig-title__accent">Four transformations.</span>
          </h2>
          <p className="sig-tagline">
            Our patented Signature Bottle is the only product in the range to
            filter, mineralise, hydrogenate <em>and</em> structure your water — in
            a single device. Carry transformation.
          </p>
        </div>

        <div className="sig-stage sig-stage--immersive">
          <ul className="sig-pillars sig-pillars--left" aria-label="First two functions">
            {product.pillars.slice(0, 2).map((p) => (
              <li className="sig-pillar sig-pillar--floating" key={p.id}>
                <div className="sig-pillar__icon" aria-hidden="true">
                  <ProductIcon name={p.icon} stroke="#0EA5E9" />
                </div>
                <div className="sig-pillar__content">
                  <h3 className="sig-pillar__title">{p.title}</h3>
                  <p className="sig-pillar__copy">{p.copy}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="sig-product sig-product--hero" aria-hidden="true">
            <ProductIcon
              name={product.heroIcon}
              stroke="#00A5FF"
              className="sig-product__icon"
            />
          </div>

          <ul className="sig-pillars sig-pillars--right" aria-label="Last two functions">
            {product.pillars.slice(2, 4).map((p) => (
              <li className="sig-pillar sig-pillar--floating" key={p.id}>
                <div className="sig-pillar__icon" aria-hidden="true">
                  <ProductIcon name={p.icon} stroke="#0EA5E9" />
                </div>
                <div className="sig-pillar__content">
                  <h3 className="sig-pillar__title">{p.title}</h3>
                  <p className="sig-pillar__copy">{p.copy}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="sig-cta-row">
          <Link to={`/products/${product.handle}`} className="sig-cta sig-cta--primary">
            Discover the bottle
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <Link to="/science" className="sig-cta sig-cta--ghost">
            How it works
          </Link>
        </div>
      </div>

      <div className="sig-water-transition" aria-hidden="true">
        <svg viewBox="0 0 2880 120" preserveAspectRatio="none">
          <path 
            className="sig-wave sig-wave--back" 
            d="M0,60 C360,120 360,0 720,60 C1080,120 1080,0 1440,60 C1800,120 1800,0 2160,60 C2520,120 2520,0 2880,60 L2880,120 L0,120 Z" 
            fill="rgba(255,255,255,0.4)" 
          />
          <path 
            className="sig-wave sig-wave--front" 
            d="M0,80 C360,130 360,30 720,80 C1080,130 1080,30 1440,80 C1800,130 1800,30 2160,80 C2520,130 2520,30 2880,80 L2880,120 L0,120 Z" 
            fill="#ffffff" 
          />
        </svg>
      </div>
    </section>
  );
}
