import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollTrigger from 'gsap/ScrollTrigger';
import HeroSection from '../components/home/HeroSection';
import SignatureSection from '../components/home/SignatureSection';
import ProductsCarousel from '../components/home/ProductsCarousel';
import TrustIconsBar from '../components/home/TrustIconsBar';
import BenefitsSection from '../components/home/BenefitsSection';
import BrandStory from '../components/home/BrandStory';
import Testimonials from '../components/home/Testimonials';
import SocialGrid from '../components/home/SocialGrid';

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#story') {
      const t = setTimeout(() => {
        document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      return () => clearTimeout(t);
    }
  }, [location.hash]);

  useEffect(() => {
    const sortAndRefresh = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh(true);
    };
    const t1 = setTimeout(sortAndRefresh, 150);
    const t2 = setTimeout(sortAndRefresh, 800);
    const t3 = setTimeout(sortAndRefresh, 2200);
    window.addEventListener('load', sortAndRefresh);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('load', sortAndRefresh);
    };
  }, []);

  return (
    <main>
      <HeroSection />
      <SignatureSection />
      <ProductsCarousel />
      <TrustIconsBar />
      <BenefitsSection />
      <BrandStory />
      <Testimonials />
      <SocialGrid />
    </main>
  );
}
