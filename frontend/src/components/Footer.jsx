export default function Footer({ onNavigate }) {
  const handleNav = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <footer className="kf-footer">
      <div className="kf-container">
        <div className="kf-footer-grid">
          <div>
            <div className="kf-footer-brand">KoForge</div>
            <div className="kf-footer-address">
              <strong>KoForge Industrial Technologies Pvt. Ltd.</strong><br />
              Plot 27, Industrial Park Phase II, MIDC,<br />
              Pimpri-Chinchwad, Pune, Maharashtra 411018, India
            </div>
            <div style={{ marginTop: '14px', fontSize: '0.8rem', color: 'var(--slate-400)' }}>
              18.6298 N, 73.7997 E (site location)
            </div>
          </div>

          <div className="kf-footer-contact">
            <p><strong>General:</strong> info@koforge.example.com</p>
            <p><strong>Sales:</strong> sales@koforge.example.com</p>
            <p><strong>Support:</strong> support@koforge.example.com</p>
            <p><strong>Phone:</strong> +91 20 5550 0142 | <strong>24×7:</strong> +91 98765 00142</p>
            <p style={{ color: 'var(--slate-400)', marginTop: '6px' }}>Hours: Mon-Sat, 9:30 AM - 6:30 PM IST</p>
          </div>

          <div>
            <div style={{ fontWeight: 600, color: '#ffffff', marginBottom: '10px' }}>Navigation</div>
            <ul className="kf-footer-links">
              <li>
                <button className="kf-footer-link" onClick={() => handleNav('/services')}>
                  Services
                </button>
              </li>
              <li>
                <button className="kf-footer-link" onClick={() => handleNav('/careers')}>
                  Careers
                </button>
              </li>
              <li>
                <button className="kf-footer-link" onClick={() => handleNav('/contact')}>
                  Contact Us
                </button>
              </li>
              <li>
                <button className="kf-footer-link" onClick={() => handleNav('/consultation')}>
                  Request a Consultation
                </button>
              </li>
            </ul>

            <div style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--slate-400)', marginBottom: '6px' }}>Follow us:</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="kf-social-tag" style={{ fontSize: '0.75rem', padding: '4px 8px' }}>LinkedIn</span>
                <span className="kf-social-tag" style={{ fontSize: '0.75rem', padding: '4px 8px' }}>YouTube</span>
                <span className="kf-social-tag" style={{ fontSize: '0.75rem', padding: '4px 8px' }}>X</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', fontSize: '0.8rem', color: 'var(--slate-500)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div>&copy; {new Date().getFullYear()} KoForge Industrial Technologies Pvt. Ltd. All rights reserved.</div>
          <div>Engineering smarter conveyor systems for modern industry</div>
        </div>
      </div>
    </footer>
  );
}
