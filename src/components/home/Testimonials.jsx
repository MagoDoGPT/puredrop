import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  {
    text: "I was skeptical, but the difference in taste is night and day. Even my kids are drinking more water now.",
    author: "Sarah L.",
    initials: "S",
    verified: true
  },
  {
    text: "The sleekest pitcher I've ever owned. Doesn't leak, filters fast, and looks amazing on my kitchen counter.",
    author: "James M.",
    initials: "J",
    verified: true
  },
  {
    text: "Perfect for my morning coffee. Removing all that chlorine really brings out the subtle notes of the beans.",
    author: "Emily R.",
    initials: "E",
    verified: true
  },
  {
    text: "I've tried multiple systems, but nothing compares. Installation was a breeze, and the water is genuinely flawless.",
    author: "Michael T.",
    initials: "M",
    verified: true
  }
];

export default function Testimonials() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;

    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.test-deck-card');

      if (isMobile) {
        // Mobile: simple fade-up reveal as each card enters the viewport
        cards.forEach((card) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
            opacity: 0,
            y: 28,
            duration: 0.7,
            ease: 'power2.out',
          });
        });
        return;
      }

      // The master timeline for the pinned card deck
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: 'top top',
          end: '+=4000', // Increased duration for 4 cards
          scrub: 1,
        }
      });

      // Step 1: Card 0 flies away, Card 1 comes to front, Card 2 moves up, Card 3 becomes visible
      tl.to(cards[0], { yPercent: -120, rotation: -6, opacity: 0, duration: 1 }, 0)
        .to(cards[1], { scale: 1, y: 0, opacity: 1, duration: 1 }, 0)
        .to(cards[2], { scale: 0.9, y: 40, opacity: 0.6, duration: 1 }, 0)
        .to(cards[3], { scale: 0.8, y: 80, opacity: 0.3, duration: 1 }, 0);

      // Step 2: Card 1 flies away, Card 2 comes to front, Card 3 moves up
      tl.to(cards[1], { yPercent: -120, rotation: 6, opacity: 0, duration: 1 }, 1)
        .to(cards[2], { scale: 1, y: 0, opacity: 1, duration: 1 }, 1)
        .to(cards[3], { scale: 0.9, y: 40, opacity: 0.6, duration: 1 }, 1);
        
      // Step 3: Card 2 flies away, Card 3 comes to front
      tl.to(cards[2], { yPercent: -120, rotation: -6, opacity: 0, duration: 1 }, 2)
        .to(cards[3], { scale: 1, y: 0, opacity: 1, duration: 1 }, 2);

      // Step 4: Hold the last card for a moment before unpinning
      tl.to(cards[3], { scale: 1.05, duration: 0.5 }, 3);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="testimonials-section" ref={sectionRef}>
      
      <div className="test-deck-layout">
        
        {/* Left Side: Header & Context */}
        <div className="test-header-side">
          <p className="test-label">Don't just take our word</p>
          <h2 className="test-heading">Loved by over <span>10,000+</span> households</h2>
          <p className="test-subtext">Discover why families across the country are switching to the PureDrop standard of hydration.</p>
          
          <div className="test-trust-badges">
            <div className="trust-stars">★★★★★</div>
            <p>4.9/5 Average Rating</p>
          </div>
        </div>

        {/* Right Side: The Interactive Card Deck */}
        <div className="test-deck-side">
          <div className="test-deck-wrapper">
            {REVIEWS.map((review, i) => (
              <div className={`test-deck-card test-card-${i}`} key={i}>
                <div className="card-bg-quote">“</div>
                
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, idx) => (
                    <svg key={idx} viewBox="0 0 24 24">
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                    </svg>
                  ))}
                </div>

                <p className="testimonial-text">"{review.text}"</p>

                <div className="testimonial-author-wrapper">
                  <div className="testimonial-avatar">{review.initials}</div>
                  <div className="testimonial-author-info">
                    <span className="testimonial-author-name">{review.author}</span>
                    {review.verified && (
                      <span className="testimonial-author-badge">
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        Verified Buyer
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
