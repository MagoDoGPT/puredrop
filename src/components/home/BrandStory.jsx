import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BrandStory.css';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStory() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Editorial Parallax Effect
      // The image moves slightly up (slower scroll)
      gsap.to('.story-image-track', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      // The glass card moves slightly down (faster scroll)
      gsap.to('.story-content-glass', {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      // 2. The "Water Flow" Commitment Line
      // Fills up as you read the story
      gsap.fromTo('.story-timeline-fill', 
        { scaleY: 0 },
        { 
          scaleY: 1, 
          ease: 'none',
          scrollTrigger: {
            trigger: '.story-content-glass',
            start: 'top 60%',
            end: 'bottom 60%',
            scrub: true
          }
        }
      );

      // 3. Text Stagger Reveal
      gsap.from('.story-reveal', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.story-content-glass',
          start: 'top 80%',
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="story" className="story-section" ref={sectionRef}>
      
      {/* Modern Fluid Water Transition connecting from the previous section */}
      <div className="story-water-transition">
        <svg viewBox="0 0 2880 120" preserveAspectRatio="none" className="story-wave-svg">
          {/* Back Wave */}
          <path className="story-wave-path story-wave-back" d="M0,60 C360,120 360,0 720,60 C1080,120 1080,0 1440,60 C1800,120 1800,0 2160,60 C2520,120 2520,0 2880,60 L2880,120 L0,120 Z" fill="rgba(11, 45, 94, 0.5)" />
          {/* Front Wave */}
          <path className="story-wave-path story-wave-front" d="M0,80 C360,20 360,120 720,80 C1080,20 1080,120 1440,80 C1800,20 1800,120 2160,80 C2520,20 2520,120 2880,80 L2880,120 L0,120 Z" fill="var(--navy)" />
        </svg>
      </div>

      <div className="container story-inner">
         <div className="story-editorial-layout">
            
            {/* Left/Background: Massive Visual Authority */}
            <div className="story-image-track">
               <div className="story-image-wrapper">
                 {/* The actual image tag, ready for when you upload a photo */}
                 <img 
                    src="/images/brand-heritage.jpg" 
                    alt="PureDrop Heritage" 
                    className="story-image-actual"
                    onError={(e) => {
                       e.target.style.display = 'none'; /* Hides broken image icon if image doesn't exist yet */
                    }}
                 />
                 {/* The placeholder background (shows if image is missing) */}
                 <div className="story-image-placeholder">
                    <span>Heritage</span>
                 </div>
                 <div className="story-image-glow"></div>
               </div>
            </div>

            {/* Right/Foreground: Overlapping Glass Story Card */}
            <div className="story-content-glass">
               {/* Fluid Line simulating water filling up the commitment */}
               <div className="story-timeline-track">
                  <div className="story-timeline-fill"></div>
               </div>
               
               <div className="story-text-content">
                  <p className="story-label story-reveal">The PureDrop Mission</p>
                  <h2 className="story-heading story-reveal">
                    Born from an uncompromising desire for <span>pure water.</span>
                  </h2>
                  <p className="story-body story-reveal">
                    PureDrop was founded with a single authoritative goal: to redefine how you drink water at home. We merged cutting-edge sub-micron filtration technology with award-winning aesthetics to create a system that doesn't just purify — it elevates your entire daily routine.
                  </p>
                  <p className="story-body story-reveal">
                    Every drop poured tells a story of meticulous engineering, sustainable architecture, and an unwavering commitment to your family's health. We are the new standard of hydration.
                  </p>
                  
                  <div className="story-footer-actions story-reveal">
                     <Link to="/about" className="story-action-button">
                        Discover Our Story
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                           <line x1="5" y1="12" x2="19" y2="12"></line>
                           <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                     </Link>
                  </div>
               </div>
            </div>

         </div>
      </div>

      {/* Magnificent Bottom Transition into Testimonials (Surfacing from water) */}
      <div className="story-bottom-transition">
        <svg viewBox="0 0 2880 120" preserveAspectRatio="none" className="story-wave-svg">
          {/* Back Wave (translucent water blue) */}
          <path className="story-wave-path story-wave-back" d="M0,60 C360,120 360,0 720,60 C1080,120 1080,0 1440,60 C1800,120 1800,0 2160,60 C2520,120 2520,0 2880,60 L2880,120 L0,120 Z" fill="rgba(240, 247, 255, 0.5)" />
          {/* Front Wave (solid water blue, matching Testimonials bg) */}
          <path className="story-wave-path story-wave-front" d="M0,80 C360,20 360,120 720,80 C1080,20 1080,120 1440,80 C1800,20 1800,120 2160,80 C2520,20 2520,120 2880,80 L2880,120 L0,120 Z" fill="#f0f7ff" />
        </svg>
      </div>

    </section>
  );
}
