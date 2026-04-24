import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import './SciencePage.css';

const STAGES = [
  { n: '01', title: 'Sediment Pre-filter', body: 'Polypropylene membrane strips rust flakes, sand, and particulates down to 5μm before the water reaches any active media.' },
  { n: '02', title: 'Activated Carbon Block', body: 'Compressed coconut-shell carbon adsorbs chlorine, chloramines, pesticides, and volatile organic compounds that carry taste and odour.' },
  { n: '03', title: 'Micro-filtration Membrane', body: 'A 0.01μm hollow-fibre barrier physically blocks microplastics, bacteria, and particulate heavy metals without any chemical reaction.' },
  { n: '04', title: 'Remineralisation Bed', body: 'Food-grade mineral salts restore magnesium, calcium, and potassium — the ones your body actually needs from drinking water.' },
];

const RESULTS = [
  { label: 'Microplastics', before: '4.8 ppl', after: '0.00 ppl', note: 'Below detection limit' },
  { label: 'Chlorine', before: '0.8 ppm', after: '<0.02 ppm', note: 'Taste fully neutralised' },
  { label: 'Lead', before: '18 ppb', after: '<1 ppb', note: 'Well below EU/WHO' },
  { label: 'Magnesium', before: '2 mg/L', after: '12 mg/L', note: 'Restored to WHO target' },
];

const CERTS = [
  { code: 'NSF 42', body: 'Aesthetic effects — chlorine, taste, odour' },
  { code: 'NSF 53', body: 'Health effects — lead, VOCs, cysts' },
  { code: 'NSF 58', body: 'Reverse osmosis performance (Home Purifier)' },
  { code: 'WRAS', body: 'UK Water Regulations approval' },
];

export default function SciencePage() {
  const rootRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const ctx = gsap.context(() => {
      gsap.from('.sci-hero__eyebrow, .sci-hero__title, .sci-hero__subtitle', {
        opacity: 0, y: 30, duration: 1, ease: 'power3.out', stagger: 0.12,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="science-page" ref={rootRef}>
      <section className="sci-hero">
        <div className="sci-hero__orb sci-hero__orb--1" aria-hidden="true"></div>
        <div className="sci-hero__orb sci-hero__orb--2" aria-hidden="true"></div>

        <div className="sci-hero__inner">
          <span className="sci-hero__eyebrow">The Science</span>
          <h1 className="sci-hero__title">
            Four stages, <span className="sci-hero__accent">one glass</span> of perfectly clean water.
          </h1>
          <p className="sci-hero__subtitle">
            Every PureDrop cartridge is a layered system, not a single magic filter. Each stage removes a different class of contaminant — and the last one puts back what your body needs.
          </p>
        </div>
      </section>

      <section className="sci-stages">
        <div className="sci-stages__inner">
          <h2 className="sci-section-title">How filtration actually works</h2>
          <div className="sci-stages__grid">
            {STAGES.map((s) => (
              <div className="sci-stage" key={s.n}>
                <span className="sci-stage__n">{s.n}</span>
                <h3 className="sci-stage__title">{s.title}</h3>
                <p className="sci-stage__body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sci-results">
        <div className="sci-results__inner">
          <h2 className="sci-section-title">What comes out — in parts per million.</h2>
          <p className="sci-results__caption">Independent lab results, London tap water feed, Q1 2026.</p>

          <div className="sci-results__table">
            <div className="sci-results__head">
              <span>Contaminant</span>
              <span>Tap water</span>
              <span>After PureDrop</span>
              <span>Notes</span>
            </div>
            {RESULTS.map((r) => (
              <div className="sci-results__row" key={r.label}>
                <span className="sci-results__label">{r.label}</span>
                <span className="sci-results__before">{r.before}</span>
                <span className="sci-results__after">{r.after}</span>
                <span className="sci-results__note">{r.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sci-certs">
        <div className="sci-certs__inner">
          <h2 className="sci-section-title">Certified, not claimed.</h2>
          <div className="sci-certs__grid">
            {CERTS.map((c) => (
              <div className="sci-cert" key={c.code}>
                <span className="sci-cert__code">{c.code}</span>
                <p className="sci-cert__body">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sci-cta">
        <div className="sci-cta__inner">
          <h2>Ready for the difference?</h2>
          <p>Start with the Carafe — same filtration as our Home Purifier, in a glass pitcher you&apos;ll want on the table.</p>
          <Link to="/shop" className="sci-cta__btn">
            Shop the collection
            <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
