import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import * as contactApi from '../../api/contact';
import styles from './Footer.module.css';

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const Footer = () => {
  const [email, setEmail] = useState('');
  const [newsletterState, setNewsletterState] = useState('idle'); // idle | sending | done | error
  const [newsletterMsg, setNewsletterMsg] = useState(null);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterState('sending');
    setNewsletterMsg(null);
    try {
      await contactApi.subscribeNewsletter(email);
      setNewsletterState('done');
      setNewsletterMsg('Thanks — check your inbox to confirm.');
      setEmail('');
    } catch (err) {
      setNewsletterState('error');
      setNewsletterMsg(err.message || 'Something went wrong.');
    }
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.topGrid}>
          {/* Brand Col */}
          <div className={styles.brandCol}>
            <div className={styles.logo}>
              Puredrop<span className={styles.logoDot}>.</span>
            </div>
            <p className={styles.brandDesc}>
              Elevating the water you drink. Advanced filtration technology paired with premium design.
            </p>
            <form className={styles.newsletterForm} onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Email address for updates"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={newsletterState === 'sending'}
              />
              <button type="submit" aria-label="Subscribe" disabled={newsletterState === 'sending'}>
                <ArrowRight size={18} />
              </button>
            </form>
            {newsletterMsg && (
              <p className={`${styles.newsletterMsg} ${newsletterState === 'error' ? styles.newsletterMsgError : ''}`} role="status">
                {newsletterMsg}
              </p>
            )}
          </div>

          {/* Links Col 1 */}
          <div className={styles.linksCol}>
            <h4>Products</h4>
            <ul>
              <li><Link to="/products/signature-bottle">Signature Bottle</Link></li>
              <li><Link to="/products/the-carafe">The Carafe</Link></li>
              <li><Link to="/products/home-purifier">Home Purifier</Link></li>
              <li><Link to="/products/replacement-cartridges">Filters & Refills</Link></li>
              <li><Link to="/shop">Shop All</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className={styles.linksCol}>
            <h4>About</h4>
            <ul>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/science">The Science</Link></li>
              <li><Link to="/blog">Journal</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Links Col 3 */}
          <div className={styles.linksCol}>
            <h4>Support</h4>
            <ul>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/track-order">Track Order</Link></li>
              <li><Link to="/returns">Returns & Refunds</Link></li>
              <li><Link to="/account">My Account</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.legalLinks}>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
          
          <div className={styles.copyright}>
            &copy; {new Date().getFullYear()} PureDrop. All rights reserved.
          </div>
          
          <div className={styles.socialIcons}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <InstagramIcon size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FacebookIcon size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <TwitterIcon size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
