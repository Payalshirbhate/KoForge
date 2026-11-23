import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Services from './pages/Services';
import Consultation from './pages/Consultation';
import Contact from './pages/Contact';

const validPaths = ['/', '/services', '/contact', '/consultation', '/careers'];

function getCurrentPath() {
  if (typeof window === 'undefined') return '/';
  return validPaths.includes(window.location.pathname) ? window.location.pathname : '/';
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(getCurrentPath);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(getCurrentPath());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((path) => {
    if (!validPaths.includes(path)) return;
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
  }, []);

  const renderPage = () => {
    switch (currentPath) {
      case '/services': return <Services onNavigate={navigate} />;
      case '/consultation': return <Consultation onNavigate={navigate} />;
      case '/contact': return <Contact onNavigate={navigate} />;
      case '/careers':
        return (
          <main style={{ minHeight: '60vh', padding: '80px 24px', backgroundColor: 'var(--bg-page-alt)' }}>
            <div className="kf-container" style={{ textAlign: 'center' }}>
              <span className="kf-kicker">CAREERS</span>
              <h1 className="kf-title-md">Careers at KoForge</h1>
              <p style={{ maxWidth: '600px', margin: '0 auto 24px', color: 'var(--slate-600)' }}>
                Our careers section is currently being updated. Please check back soon.
              </p>
              <button className="kf-btn kf-btn-primary" onClick={() => navigate('/services')}>
                Explore Services
              </button>
            </div>
          </main>
        );
      case '/':
      default: return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="koforge-app">
      <ScrollToTop currentPath={currentPath} />
      <Navbar currentPath={currentPath} onNavigate={navigate} />
      <div className="kf-page-content">{renderPage()}</div>
      <Footer onNavigate={navigate} />
    </div>
  );
}
