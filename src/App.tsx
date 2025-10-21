import { useState, useEffect } from 'react';
import { SiteDataProvider } from './context/SiteDataContext';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/photographer/Header';
import { HeroSection } from './components/photographer/HeroSection';
import { VisionSection } from './components/photographer/VisionSection';
import { ServicesSection } from './components/photographer/ServicesSection';
import { PortfolioShowcase } from './components/photographer/PortfolioShowcase';
import { TestimonialsSection } from './components/photographer/TestimonialsSection';
import { ContactSection } from './components/photographer/ContactSection';
import { Footer } from './components/photographer/Footer';
import { AdminPanel } from './components/admin/AdminPanel';
import { Toaster } from './components/ui/sonner';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './components/admin/Login';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'admin'>('home');

  useEffect(() => {
    const base = '/khaled-elshamytest1';
    const isDev = import.meta.env.DEV;
    const getPath = () => {
      if (isDev) return window.location.pathname;
      return window.location.pathname.replace(base, '');
    };
    const path = getPath();
    if (path === '/admin' || path === '/khaled-elshamytest1/admin') {
      setCurrentPage('admin');
    } else {
      setCurrentPage('home');
    }

    // Listen for navigation
    const handlePopState = () => {
      const path = getPath();
      setCurrentPage(path === '/admin' || path === '/khaled-elshamytest1/admin' ? 'admin' : 'home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle navigation
  useEffect(() => {
    const base = '/khaled-elshamytest1';
    const isDev = import.meta.env.DEV;
    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach(link => {
      link.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        if (href) {
          window.history.pushState({}, '', href);
          const path = isDev ? href : href.replace(base, '');
          setCurrentPage(path === '/admin' ? 'admin' : 'home');
          window.scrollTo(0, 0);
        }
      });
    });
  }, [currentPage]);

  return (
    <SiteDataProvider>
      <LanguageProvider>
        <Toaster position="top-center" richColors />
        
        {currentPage === 'admin' ? (
          <RequireAdmin>
            <AdminPanel />
          </RequireAdmin>
        ) : (
          <div className="min-h-screen bg-[#0A0A0A] antialiased">
            <Header />
            <main id="home">
              <HeroSection />
              <VisionSection />
              <div id="services">
                <ServicesSection />
              </div>
              <div id="portfolio">
                <PortfolioShowcase />
              </div>
              <div id="testimonials">
                <TestimonialsSection />
              </div>
              <div id="contact">
                <ContactSection />
              </div>
            </main>
            <Footer />
          </div>
        )}
      </LanguageProvider>
    </SiteDataProvider>
  );
}

function RequireAdmin({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}