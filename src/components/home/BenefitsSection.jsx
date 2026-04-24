import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BenefitsSection.css';

gsap.registerPlugin(ScrollTrigger);

const FACTS = [
  {
    key: 'microplastics',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="12" r="7" strokeDasharray="3 3" />
        <circle cx="12" cy="12" r="10" strokeDasharray="2 4" />
      </svg>
    ),
    title: 'Microplastics',
    body: 'Studies show tap water contains up to 4,000 micro-particles per litre. Our sub-micron barriers eradicate 99.8% of them entirely.'
  },
  {
    key: 'chlorine',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10" />
        <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
    title: 'Chlorine & Chemicals',
    body: 'Residual disinfectants alter taste and irritate biology. Advanced activated carbon strips chemical profiles from the water matrix.'
  },
  {
    key: 'metals',
    icon: (
      <svg viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: 'Heavy Metals',
    body: 'Ageing plumbing leaches lead and mercury. The dense filtration matrix permanently traps heavy metals before you drink.'
  },
  {
    key: 'minerals',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2l3 7h7l-5.5 4.5 2 7L12 16l-6.5 4.5 2-7L2 9h7z" />
      </svg>
    ),
    title: 'Essential Minerals',
    body: 'Unlike standard osmosis which strips water "dead", the final stage re-mineralises every drop with calcium and magnesium for optimal hydration.'
  }
];

export default function BenefitsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.sci-orb', {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%'
      });

      const reveals = [
        { el: '.sci-intro', y: 40, scale: 0.85, blur: 18 },
        ...gsap.utils.toArray('.sci-fact').map((el) => ({ el, y: 40, scale: 0.8, blur: 16 })),
        { el: '.sci-outro', y: 30, scale: 0.92, blur: 8 }
      ];

      reveals.forEach(({ el, y, scale, blur }) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 78%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y,
          scale,
          filter: `blur(${blur}px)`,
          duration: 1.1,
          ease: 'power2.out'
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="science-tunnel" id="science" ref={sectionRef}>
      <div className="sci-ambient-bg" aria-hidden="true">
        <div className="sci-orb sci-orb-1"></div>
        <div className="sci-orb sci-orb-2"></div>
      </div>

      <div className="sci-particles" aria-hidden="true">
        {[...Array(20)].map((_, i) => {
          const angle = (i / 20) * Math.PI * 2;
          const distance = 1500;
          const dx = Math.cos(angle) * distance + 'px';
          const dy = Math.sin(angle) * distance + 'px';
          const delay = (Math.random() * 4) + 's';
          const dur = (Math.random() * 2 + 3) + 's';
          return (
            <div
              key={i}
              className="sci-particle"
              style={{
                '--dx': dx,
                '--dy': dy,
                animationDelay: delay,
                animationDuration: dur
              }}
            ></div>
          );
        })}
      </div>

      <div className="sci-slide sci-intro">
        <p className="sci-label">The Science</p>
        <h2 className="sci-heading">What's really<br /><span>in your water?</span></h2>
      </div>

      {FACTS.map((fact) => (
        <div className="sci-slide sci-fact" key={fact.key}>
          <div className="sci-fact-icon">{fact.icon}</div>
          <h3>{fact.title}</h3>
          <p>{fact.body}</p>
        </div>
      ))}

      <div className="sci-slide sci-outro">
        <div className="sci-stats-row">
          <div className="sci-stat"><h2>99.8%</h2><span>Purity Rate</span></div>
          <div className="sci-stat"><h2>4+</h2><span>Filter Stages</span></div>
          <div className="sci-stat"><h2>80+</h2><span>Contaminants</span></div>
        </div>
      </div>
    </section>
  );
}
