import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BenefitsSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function BenefitsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Initial Setup: Center all slides absolutely
      gsap.set('.sci-slide', { xPercent: -50, yPercent: -50 });
      
      // Ambient rotation for the huge blurry background blobs
      gsap.to('.sci-orb', {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%'
      });

      // 2. The Main Scrub Timeline (The Plunge)
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=6000', // 6000px of scrolling for a deep, immersive dive
          pin: true,
          scrub: 1, // Smooth interpolation
        }
      });

      // -- Intro Title flies past camera
      tl.to('.sci-intro', { 
        scale: 4, 
        opacity: 0, 
        filter: 'blur(30px)', 
        duration: 3, 
        ease: 'power2.in' 
      })
      .set('.sci-intro', { display: 'none' });

      // -- The Facts Loop
      const facts = gsap.utils.toArray('.sci-fact');
      facts.forEach((fact) => {
        tl.set(fact, { display: 'flex' })
          // Enter from deep background
          .fromTo(fact, 
            { scale: 0.1, opacity: 0, filter: 'blur(30px)' },
            { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 4, ease: 'power2.out' }
          )
          // Hold in center so user can read
          .to(fact, { scale: 1.1, duration: 2, ease: 'none' })
          // Fly past the camera
          .to(fact, { scale: 5, opacity: 0, filter: 'blur(30px)', duration: 3, ease: 'power2.in' })
          .set(fact, { display: 'none' });
      });

      // -- The Outro Stats
      tl.set('.sci-outro', { display: 'flex' })
        .fromTo('.sci-outro',
          { scale: 0.1, opacity: 0, filter: 'blur(30px)' },
          { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 4, ease: 'power2.out' }
        )
        // Hold final state
        .to('.sci-outro', { scale: 1, duration: 2, ease: 'none' });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="science-tunnel" id="science" ref={sectionRef}>
      
      {/* Abstract Immersive Background */}
      <div className="sci-ambient-bg">
        <div className="sci-orb sci-orb-1"></div>
        <div className="sci-orb sci-orb-2"></div>
      </div>

      {/* Water particles flying at camera simulating depth */}
      <div className="sci-particles" aria-hidden="true">
        {[...Array(20)].map((_, i) => {
          const angle = (i / 20) * Math.PI * 2;
          const distance = 1500;
          const dx = Math.cos(angle) * distance + 'px';
          const dy = Math.sin(angle) * distance + 'px';
          const delay = (Math.random() * 4) + 's';
          const dur = (Math.random() * 2 + 2) + 's';
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

      {/* 3D Scroll Track */}
      <div className="sci-tunnel-container">
        
        {/* SLIDE 1: Intro */}
        <div className="sci-slide sci-intro">
          <p className="sci-label">The Science</p>
          <h2 className="sci-heading">What's really<br/><span>in your water?</span></h2>
        </div>

        {/* SLIDE 2: Microplastics */}
        <div className="sci-slide sci-fact" style={{ display: 'none' }}>
          <div className="sci-fact-icon">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7" strokeDasharray="3 3"/><circle cx="12" cy="12" r="10" strokeDasharray="2 4"/></svg>
          </div>
          <h3>Microplastics</h3>
          <p>Studies show tap water contains up to 4,000 micro-particles per litre. Our sub-micron barriers eradicate 99.8% of them entirely.</p>
        </div>

        {/* SLIDE 3: Chlorine */}
        <div className="sci-slide sci-fact" style={{ display: 'none' }}>
          <div className="sci-fact-icon">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10"/><path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </div>
          <h3>Chlorine & Chemicals</h3>
          <p>Residual disinfectants alter taste and irritate biology. Advanced activated carbon strips chemical profiles from the water matrix.</p>
        </div>

        {/* SLIDE 4: Heavy Metals */}
        <div className="sci-slide sci-fact" style={{ display: 'none' }}>
          <div className="sci-fact-icon">
            <svg viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
          </div>
          <h3>Heavy Metals</h3>
          <p>Ageing plumbing leaches lead and mercury. The dense filtration matrix permanently traps heavy metals before you drink.</p>
        </div>

        {/* SLIDE 5: Minerals */}
        <div className="sci-slide sci-fact" style={{ display: 'none' }}>
          <div className="sci-fact-icon">
            <svg viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4.5 2 7L12 16l-6.5 4.5 2-7L2 9h7z"/></svg>
          </div>
          <h3>Essential Minerals</h3>
          <p>Unlike standard osmosis which strips water "dead", the final stage re-mineralises every drop with calcium and magnesium for optimal hydration.</p>
        </div>

        {/* SLIDE 6: Outro Stats */}
        <div className="sci-slide sci-outro" style={{ display: 'none' }}>
          <div className="sci-stats-row">
            <div className="sci-stat"><h2>99.8%</h2><span>Purity Rate</span></div>
            <div className="sci-stat"><h2>4+</h2><span>Filter Stages</span></div>
            <div className="sci-stat"><h2>80+</h2><span>Contaminants</span></div>
          </div>
        </div>

      </div>
    </section>
  );
}
