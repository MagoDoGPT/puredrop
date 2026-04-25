import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import DiscountPopup from './components/layout/DiscountPopup';
import ConsentBanner from './components/layout/ConsentBanner';
import ScrollToTop from './components/layout/ScrollToTop';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import SciencePage from './pages/SciencePage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import AccountPage from './pages/AccountPage';
import TrackOrderPage from './pages/TrackOrderPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import ReturnsPage from './pages/ReturnsPage';
import CartPage from './pages/CartPage';
import GiftCardPage from './pages/GiftCardPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const [isConsentVisible, setIsConsentVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('puredrop_consent');
    if (!consent) {
      setTimeout(() => setIsConsentVisible(true), 1000);
    }
  }, []);

  const handleAcceptConsent = () => {
    localStorage.setItem('puredrop_consent', 'accepted');
    setIsConsentVisible(false);
  };

  const handleDeclineConsent = () => {
    localStorage.setItem('puredrop_consent', 'declined');
    setIsConsentVisible(false);
  };

  const routerBase = import.meta.env.BASE_URL.startsWith('http')
    ? new URL(import.meta.env.BASE_URL).pathname
    : import.meta.env.BASE_URL;

  return (
    <CartProvider>
      <Router basename={routerBase}>
        <ScrollToTop />
        <div className="app-container">
          <Header />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/products/:handle" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/gift-card" element={<GiftCardPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/science" element={<SciencePage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/track-order" element={<TrackOrderPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/returns" element={<ReturnsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          <Footer />
          <DiscountPopup />
          {isConsentVisible && (
            <ConsentBanner
              onAccept={handleAcceptConsent}
              onDecline={handleDeclineConsent}
            />
          )}
        </div>
      </Router>
    </CartProvider>
  );
}
