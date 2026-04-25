import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, ChevronRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import styles from './Header.module.css';

const Logo = ({ dark }) => {
  const logoUrl = `url(${import.meta.env.BASE_URL}logo.png)`;
  return (
    <span
      className={`${styles.logoMark} ${dark ? styles.logoMarkDark : styles.logoMarkLight}`}
      style={{ WebkitMaskImage: logoUrl, maskImage: logoUrl }}
      role="img"
      aria-label="Puredrop"
    />
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { count: cartCount } = useCart();

  // Is this the homepage and we are at the very top?
  const isTransparent = location.pathname === '/' && !isScrolled && !megaMenuOpen && !mobileMenuOpen;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMegaMenuOpen(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleMouseEnter = (menu) => {
    // Only on desktop
    if (window.innerWidth > 768) {
      setMegaMenuOpen(menu);
    }
  };

  const handleMouseLeave = () => {
    setMegaMenuOpen(null);
  };

  return (
    <header 
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${!isTransparent ? styles.solid : ''}`}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.container}>
        {/* Left: Hamburger (Mobile only) */}
        <button
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Left: Logo */}
        <div className={styles.logoContainer}>
          <Link to="/" aria-label="Puredrop home">
            <Logo dark={true} />
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <nav className={styles.desktopNav}>
          <div
            className={styles.navItem}
            onMouseEnter={() => handleMouseEnter('products')}
          >
            <Link to="/shop">Products</Link>
          </div>
          <div
            className={styles.navItem}
            onMouseEnter={() => handleMouseEnter('learn')}
          >
            <Link to="/science">Learn</Link>
          </div>
          <div
            className={styles.navItem}
            onMouseEnter={() => handleMouseEnter('support')}
          >
            <Link to="/faq">Support</Link>
          </div>
        </nav>

        {/* Right: Actions */}
        <div className={styles.actions}>
          <Link to="/account" aria-label="Account" className={`${styles.actionBtn} ${styles.hideMobile}`}>
            <User size={22} />
          </Link>
          <Link to="/cart" aria-label="Cart" className={styles.actionBtn}>
            <ShoppingCart size={22} />
            {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
          </Link>
        </div>
      </div>

      {/* Mega Menus Dropdowns */}
      <div className={`${styles.megaMenu} ${megaMenuOpen === 'products' ? styles.open : ''}`}>
        <div className={styles.megaContainer}>
          <div className={styles.megaGrid5}>
            <Link to="/products/signature-bottle" className={styles.productCard}>
              <div className={`${styles.imgPlaceholder} ${styles.imgPlaceholderSignature}`}>Signature</div>
              <span>Signature Bottle</span>
            </Link>
            <Link to="/products/the-carafe" className={styles.productCard}>
              <div className={styles.imgPlaceholder}>Carafe</div>
              <span>The Carafe</span>
            </Link>
            <Link to="/products/home-purifier" className={styles.productCard}>
              <div className={styles.imgPlaceholder}>Purifier</div>
              <span>Home Purifier</span>
            </Link>
            <Link to="/products/under-sink" className={styles.productCard}>
              <div className={styles.imgPlaceholder}>Under-Sink</div>
              <span>Under-Sink Pro</span>
            </Link>
            <Link to="/shop" className={styles.viewAllCard}>
              <span>View All <br/>Products</span>
              <ChevronRight />
            </Link>
          </div>
        </div>
      </div>

      <div className={`${styles.megaMenu} ${megaMenuOpen === 'learn' ? styles.open : ''}`}>
        <div className={styles.megaContainer}>
           <div className={styles.megaGrid3}>
              <div className={styles.infoCol}>
                <h3>The Science</h3>
                <p>How our 4-stage filtration strips 99.9% of contaminants and restores the minerals your body actually needs.</p>
                <Link to="/science" className={styles.textLink}>Read the science →</Link>
              </div>
              <div className={styles.infoCol}>
                <h3>Our Story</h3>
                <p>Why we built Puredrop. The mission, the craft, and the new standard of hydration.</p>
                <Link to="/about" className={styles.textLink}>Read our story →</Link>
              </div>
              <div className={styles.infoCol}>
                <h3>Journal</h3>
                <p>Hydration insights, product guides, and notes from the team — straight from Puredrop HQ.</p>
                <Link to="/blog" className={styles.textLink}>Explore articles →</Link>
              </div>
           </div>
        </div>
      </div>

      <div className={`${styles.megaMenu} ${megaMenuOpen === 'support' ? styles.open : ''}`}>
        <div className={styles.megaContainer}>
           <div className={styles.megaGrid4}>
              <div className={styles.infoCol}>
                <h3>Track Order</h3>
                <p>See where your order is right now, any time after checkout.</p>
                <Link to="/track-order" className={styles.textLink}>Track a parcel →</Link>
              </div>
              <div className={styles.infoCol}>
                <h3>FAQ</h3>
                <p>Answers to the most common questions about our products, filters and subscriptions.</p>
                <Link to="/faq" className={styles.textLink}>Browse FAQs →</Link>
              </div>
              <div className={styles.infoCol}>
                <h3>Contact Us</h3>
                <p>Reach a real human — any question, any hour of the day.</p>
                <Link to="/contact" className={styles.textLink}>Send a message →</Link>
              </div>
              <div className={styles.infoCol}>
                <h3>Returns &amp; Refunds</h3>
                <p>30-day easy returns. Simple, fair refund policy with no fine print.</p>
                <Link to="/returns" className={styles.textLink}>Read the policy →</Link>
              </div>
           </div>
        </div>
      </div>

      {/* Mobile drawer — grouped to match the 3 top categories */}
      <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.open : ''}`}>
         <div className={styles.mobileNav}>
            <div className={styles.mobileGroup}>
               <p className={styles.mobileGroupLabel}>Products</p>
               <Link to="/shop" className={styles.mobileLink}>Shop All</Link>
               <Link to="/gift-card" className={styles.mobileLink}>Gift Cards</Link>
            </div>

            <div className={styles.mobileDivider}></div>

            <div className={styles.mobileGroup}>
               <p className={styles.mobileGroupLabel}>Learn</p>
               <Link to="/science" className={styles.mobileLink}>The Science</Link>
               <Link to="/about" className={styles.mobileLink}>Our Story</Link>
               <Link to="/blog" className={styles.mobileLink}>Journal</Link>
            </div>

            <div className={styles.mobileDivider}></div>

            <div className={styles.mobileGroup}>
               <p className={styles.mobileGroupLabel}>Support</p>
               <Link to="/track-order" className={styles.mobileLink}>Track Order</Link>
               <Link to="/faq" className={styles.mobileLink}>FAQ</Link>
               <Link to="/contact" className={styles.mobileLink}>Contact Us</Link>
               <Link to="/returns" className={styles.mobileLink}>Returns &amp; Refunds</Link>
            </div>

            <div className={styles.mobileDivider}></div>

            <Link to="/account" className={styles.mobileLink}>Login / Register</Link>
         </div>
      </div>
    </header>
  );
};

export default Header;
