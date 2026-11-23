import { useState } from 'react';

export default function Navbar({ currentPath = '/', onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="kf-header">
      <div className="kf-container kf-header-inner">
        <div className="kf-brand" onClick={() => onNavigate("/")}>
          <span className="kf-brand-ko">Ko</span>
          <span className="kf-brand-forge">Forge</span>
        </div>

        <nav>
          <ul className="kf-nav-links">
            <li>
              <button
                className={`kf-nav-link ${currentPath === '/' ? 'active' : ''}`}
                onClick={() => handleNav('/')}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className={`kf-nav-link ${currentPath === '/services' ? 'active' : ''}`}
                onClick={() => handleNav('/services')}
              >
                Services
              </button>
            </li>
            <li>
              <button
                className={`kf-nav-link ${currentPath === '/careers' ? 'active' : ''}`}
                onClick={() => handleNav('/careers')}
              >
                Careers
              </button>
            </li>
            <li>
              <button
                className={`kf-nav-link ${currentPath === '/contact' ? 'active' : ''}`}
                onClick={() => handleNav('/contact')}
              >
                Contact Us
              </button>
            </li>
          </ul>
        </nav>

        <div className="kf-nav-actions">
          <button
            className="kf-btn kf-btn-primary"
            onClick={() => handleNav('/consultation')}
          >
            Request a Consultation
          </button>
          <button
            className="kf-menu-toggle"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div style={{ backgroundColor: 'var(--navy-900)', padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li>
              <button
                className={`kf-nav-link ${currentPath === '/' ? 'active' : ''}`}
                onClick={() => handleNav('/')}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className={`kf-nav-link ${currentPath === '/services' ? 'active' : ''}`}
                onClick={() => handleNav('/services')}
              >
                Services
              </button>
            </li>
            <li>
              <button
                className={`kf-nav-link ${currentPath === '/careers' ? 'active' : ''}`}
                onClick={() => handleNav('/careers')}
              >
                Careers
              </button>
            </li>
            <li>
              <button
                className={`kf-nav-link ${currentPath === '/contact' ? 'active' : ''}`}
                onClick={() => handleNav('/contact')}
              >
                Contact Us
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
