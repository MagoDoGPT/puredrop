import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, ChevronRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import styles from './Header.module.css';

const Logo = ({ dark }) => (
  <span
    className={`${styles.logoMark} ${dark ? styles.logoMarkDark : styles.logoMarkLight}`}
    role="img"
    aria-label="Puredrop"
  />
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { count: cartCount } = useCart();

  const handleStoryClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setMegaMenuOpen(null);
    if (location.pathname === '/') {
      document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#story');
    }
  };

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
          <div className={styles.navItem}>
             <a href="/#story" onClick={handleStoryClick}>Our Story</a>
          </div>
          <div className={styles.navItem}>
            <Link to="/track-order">Track Order</Link>
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
                <p>Discover how our 4-stage filtration removes 99.9% of contaminants.</p>
                <Link to="/science" className={styles.textLink}>Read the science →</Link>
              </div>
              <div className={styles.infoCol}>
                <h3>Blog & Guides</h3>
                <p>Hydration tips, environmental impact, and product guides.</p>
                <Link to="/blog" className={styles.textLink}>Explore articles →</Link>
              </div>
              <div className={styles.infoCol}>
                <h3>Support</h3>
                <p>Need help with your PureDrop product?</p>
                <Link to="/faq" className={styles.textLink}>Visit FAQ →</Link>
              </div>
           </div>
        </div>
      </div>
      
      {/* Mobile Menu Backdrop & Drawer - to be componentized later, keeping simple here */}
      <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.open : ''}`}>
         <div className={styles.mobileNav}>
            <Link to="/shop" className={styles.mobileLink}>Shop All</Link>
            <Link to="/science" className={styles.mobileLink}>The Science</Link>
            <a href="/#story" className={styles.mobileLink} onClick={handleStoryClick}>Our Story</a>
            <Link to="/track-order" className={styles.mobileLink}>Track Order</Link>
            <Link to="/faq" className={styles.mobileLink}>FAQ</Link>
            <Link to="/contact" className={styles.mobileLink}>Contact Support</Link>
            <div className={styles.mobileDivider}></div>
             <Link to="/account" className={styles.mobileLink}>Login / Register</Link>
         </div>
      </div>
    </header>
  );
};

export default Header;
