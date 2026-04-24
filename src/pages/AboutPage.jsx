import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import './AboutPage.css';

const MILESTONES = [
  { year: '2019', title: 'The spark', body: 'Founder Sophie tested London tap water after a family member fell ill. She was horrified by the results and couldn\'t unsee them.' },
  { year: '2021', title: 'First prototype', body: 'A year of engineering with a lab in Manchester produced our first 4-stage cartridge — and the original Carafe.' },
  { year: '2023', title: 'Home Purifier launch', body: 'After 400+ beta homes, the countertop RO unit shipped nationwide. It remains our flagship.' },
  { year: '2026', title: 'Whole-home ecosystem', body: 'From carafe to shower, PureDrop now purifies every drop your household touches.' },
];

const VALUES = [
  { label: 'Evidence over marketing', body: 'Every claim we make is backed by peer-reviewed data or independent lab testing. No "feels purer" — we show the ppm.' },
  { label: 'Design that lasts', body: 'Glass, stainless, recycled materials. Products meant to live on your counter for years, not in a landfill in twelve months.' },
  { label: 'Repairable, refillable', body: 'Cartridges mail back free. Components are replaceable. We will never sell you the same thing twice when we could fix it.' },
];

export default function AboutPage() {
  const rootRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const ctx = gsap.context(() => {
      gsap.from('.about-hero__eyebrow, .about-hero__title, .about-hero__subtitle', {
        opacity: 0, y: 30, duration: 1, ease: 'power3.out', stagger: 0.12,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="about-page" ref={rootRef}>
      <section className="about-hero">
        <div className="about-hero__orb about-hero__orb--1" aria-hidden="true"></div>
        <div className="about-hero__orb about-hero__orb--2" aria-hidden="true"></div>

        <div className="about-hero__inner">
          <span className="about-hero__eyebrow">Our Story</span>
          <h1 className="about-hero__title">
            We started with <span className="about-hero__accent">one glass of water</span> — and a lab report we couldn&apos;t forget.
          </h1>
          <p className="about-hero__subtitle">
            PureDrop exists because what comes out of the tap isn&apos;t always what should come out of the tap. Seven years later, we build the filtration we wish had existed when we started asking questions.
          </p>
        </div>
      </section>

      <section className="about-story">
        <div className="about-story__inner">
          <h2 className="about-story__title">Built for the real world.</h2>
          <div className="about-story__grid">
            <p>In 2019, our founder Sophie had her son&apos;s paediatrician recommend a home water test after a stubborn eczema flare. The results showed chlorine by-products and heavy metals well above the EU wellness threshold — in a central London flat.</p>
            <p>She went looking for a filter that genuinely removed what she was reading about, and found that most jug filters were optimised for taste, not contaminants. The ones that actually worked were industrial, ugly, and required plumbers.</p>
            <p>So she started a company to close that gap. Today PureDrop designs filtration that performs like a lab and lives on your countertop like something you&apos;re happy to see every morning.</p>
          </div>
        </div>
      </section>

      <section className="about-timeline">
        <div className="about-timeline__inner">
          <h2 className="about-section-title">The journey, so far</h2>
          <div className="about-timeline__track">
            {MILESTONES.map((m, i) => (
              <div className="about-milestone" key={m.year}>
                <div className="about-milestone__marker">
                  <span className="about-milestone__dot" aria-hidden="true"></span>
                  {i < MILESTONES.length - 1 && <span className="about-milestone__line" aria-hidden="true"></span>}
                </div>
                <div className="about-milestone__body">
                  <span className="about-milestone__year">{m.year}</span>
                  <h3 className="about-milestone__title">{m.title}</h3>
                  <p className="about-milestone__text">{m.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="about-values__inner">
          <h2 className="about-section-title">What we stand on.</h2>
          <div className="about-values__grid">
            {VALUES.map((v) => (
              <div className="about-value" key={v.label}>
                <span className="about-value__index" aria-hidden="true"></span>
                <h3 className="about-value__title">{v.label}</h3>
                <p className="about-value__body">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="about-cta__inner">
          <h2>Taste the difference for yourself.</h2>
          <p>Start with the Carafe. If it doesn&apos;t change how you think about tap water, send it back — we&apos;ll refund every penny for 60 days.</p>
          <Link to="/shop" className="about-cta__btn">
            Shop the collection
            <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
