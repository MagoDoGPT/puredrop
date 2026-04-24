import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import './HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const heroVideo = videoRef.current;
    let pinTween = null;
    let loadHandler = null;

    ScrollTrigger.getAll().forEach((st) => {
      if (st.trigger === heroRef.current) st.kill(true);
    });

    const ctx = gsap.context(() => {
      const buildPin = () => {
        if (!heroVideo || !heroVideo.duration) return;
        if (pinTween) return;

        const heroTween = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '+=2000',
            pin: true,
            anticipatePin: 1,
            scrub: 1,
          }
        });

        heroTween.to(heroVideo, {
          currentTime: heroVideo.duration - 0.05,
          ease: 'none',
          duration: 1
        }, 0);

        const videoFade = heroRef.current?.querySelector('.hero__video-fade');
        if (videoFade) {
          heroTween.to(videoFade, { opacity: 0, ease: 'none', duration: 0.3 }, 0);
        }

        heroTween.to('.hero__content', {
          opacity: 0,
          y: -60,
          filter: 'blur(3px)',
          ease: 'none',
          duration: 0.35
        }, 0.05);

        pinTween = heroTween;

        ScrollTrigger.refresh();
      };

      ScrollTrigger.create({
        start: 80,
        end: 99999,
        onEnter: () => gsap.to('.hero__scroll-indicator', {
          opacity: 0, duration: 0.4, ease: 'power2.out', overwrite: true
        }),
        onLeaveBack: () => gsap.to('.hero__scroll-indicator', {
          opacity: 1, duration: 0.4, ease: 'power2.out', overwrite: true
        }),
      });

      if (heroVideo) {
        if (heroVideo.readyState >= 1) {
          buildPin();
        } else {
          loadHandler = () => buildPin();
          heroVideo.addEventListener('loadedmetadata', loadHandler);
        }
      }

      const heroTl = gsap.timeline({
        defaults: { ease: 'expo.out' },
        delay: 0.3
      });

      heroTl
        .to('.hero__heading', { opacity: 1, duration: 0.01 })
        .to('.hero__heading-line span', { y: '0%', duration: 1.2, stagger: 0.12, ease: 'expo.out' }, '-=0.3')
        .to('.hero__subtext', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.7')
        .to('.hero__cta-wrap', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .to('.hero__specs', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .to('.hero__scroll-indicator', { opacity: 1, duration: 1, ease: 'power2.out' }, '-=0.3');
    }, heroRef);

    return () => {
      if (heroVideo && loadHandler) {
        heroVideo.removeEventListener('loadedmetadata', loadHandler);
      }
      if (pinTween?.scrollTrigger) {
        pinTween.scrollTrigger.kill(true);
      }
      pinTween?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section className="hero" ref={heroRef} aria-label="Hero">
      {/* Scroll-driven Background Video */}
      <video
        ref={videoRef}
        className="hero__bg-video"
        src="/assets/hero-video-scrub.mp4"
        playsInline
        muted
        preload="auto"
      ></video>
      <div className="hero__video-fade" aria-hidden="true"></div>
      <div className="hero__bottom-gradient" aria-hidden="true"></div>

      <div className="hero__orb hero__orb--1"></div>
      <div className="hero__orb hero__orb--2"></div>

      <div className="hero__inner">
        <div className="hero__content">
          <h1 className="hero__heading">
            <span className="hero__heading-line"><span>The carafe that</span></span>
            <span className="hero__heading-line">
              <span><span className="hero__heading-accent">purifies</span> your water.</span>
            </span>
          </h1>

          <p className="hero__subtext">
            Advanced fluid dynamics meets premium purification. Removes microplastics, chlorine, and restores essential minerals.
          </p>

          <div className="hero__cta-wrap">
            <Link to="/products/the-carafe" className="hero__cta">
              <span className="hero__cta-wave" aria-hidden="true"></span>
              Explore the Carafe
              <svg className="hero__cta-arrow" viewBox="0 0 24 24" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link to="/science" className="hero__cta-secondary">
              How it works
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          <div className="hero__specs">
            <span className="hero__spec">
              <svg width="15" height="15" fill="none" stroke="#00A5FF" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              99.99% Purity
            </span>
            <span className="hero__spec-divider"></span>
            <span className="hero__spec">
              <svg width="15" height="15" fill="none" stroke="#00A5FF" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-4-6l-4-4-4 4m4-4v13" />
              </svg>
              BPA-Free
            </span>
            <span className="hero__spec-divider"></span>
            <span className="hero__spec">
              <svg width="15" height="15" fill="none" stroke="#00A5FF" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
                <path d="M12 6v6l4 2" />
              </svg>
              Award Winner
            </span>
          </div>
        </div>
      </div>

      <div className="hero__scroll-indicator" aria-hidden="true">
        <svg className="hero__scroll-text-svg" viewBox="0 0 100 100">
          <path id="circle-path" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent" />
          <text>
            <textPath href="#circle-path" startOffset="0%" textLength="240">
              SCROLL TO EXPLORE • PUREDROP •
            </textPath>
          </text>
        </svg>
        <div className="hero__scroll-arrow">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
