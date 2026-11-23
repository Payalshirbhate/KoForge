import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    subject: 'General',
    message: '',
    consent: false,
  });

  const [messageSent, setMessageSent] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.consent) {
      alert('Please check the consent box to proceed.');
      return;
    }
    setMessageSent(true);
  };

  const faqs = [
    {
      q: 'How fast do you reply?',
      a: 'Within 1 business day. Support requests get a 4-hour response.',
    },
    {
      q: 'Do you work outside Maharashtra?',
      a: 'Yes. We have delivered projects across India, the UAE and Southeast Asia.',
    },
    {
      q: 'Can I visit the facility?',
      a: 'Yes. Book a visit through the form or call our office.',
    },
  ];

  return (
    <main className="kf-contact-page">
      {/* Hero */}
      <section className="kf-section kf-section-dark" style={{ padding: '52px 0 58px' }}>
        <div className="kf-container">
          <span className="kf-kicker kf-kicker-light">CONTACT US</span>
          <h1 className="kf-title-lg" style={{ color: '#ffffff' }}>
            Talk to the KoForge team
          </h1>
          <p className="kf-subtitle" style={{ color: 'var(--slate-300)', marginBottom: '0' }}>
            Questions, support or partnerships? We reply within 1 business day.
          </p>
        </div>
      </section>

      {/* Reach the Right Team */}
      <section className="kf-section">
        <div className="kf-container">
          <h2 className="kf-title-md">Reach the right team</h2>
          <div className="kf-grid-3">
            <div className="kf-card-white">
              <h3 className="kf-card-title">Sales</h3>
              <p style={{ color: 'var(--slate-600)', fontSize: '0.925rem', marginBottom: '4px' }}>
                sales@koforge.example.com
              </p>
              <p style={{ color: 'var(--slate-600)', fontSize: '0.925rem' }}>
                +91 20 5550 0142
              </p>
            </div>

            <div className="kf-card-white">
              <h3 className="kf-card-title">Support (24×7)</h3>
              <p style={{ color: 'var(--slate-600)', fontSize: '0.925rem', marginBottom: '4px' }}>
                support@koforge.example.com
              </p>
              <p style={{ color: 'var(--slate-600)', fontSize: '0.925rem' }}>
                +91 98765 00142 (fictional)
              </p>
            </div>

            <div className="kf-card-white">
              <h3 className="kf-card-title">Careers</h3>
              <p style={{ color: 'var(--slate-600)', fontSize: '0.925rem', marginBottom: '4px' }}>
                careers@koforge.example.com
              </p>
              <p style={{ color: 'var(--slate-600)', fontSize: '0.925rem' }}>
                Mon-Sat, 9:30 AM - 6:30 PM IST
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Send Us a Message */}
      <section className="kf-section kf-section-alt">
        <div className="kf-container">
          <h2 className="kf-title-md">Send us a message</h2>

          <div className="kf-grid-2" style={{ gap: '32px', alignItems: 'start' }}>
            {/* Form */}
            <div className="kf-card-white" style={{ padding: '30px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '18px', color: 'var(--slate-900)' }}>
                Send an enquiry
              </h3>

              {messageSent ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <div style={{ color: 'var(--status-green)', fontSize: '28px', marginBottom: '12px' }}>
                    &check;
                  </div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px' }}>
                    Thank you. Our team will reply within 1 business day.
                  </h4>
                  <p style={{ color: 'var(--slate-600)', fontSize: '0.9rem', marginBottom: '20px' }}>
                    We have received your message and assigned it to the appropriate team.
                  </p>
                  <button
                    className="kf-btn kf-btn-primary"
                    onClick={() => {
                      setMessageSent(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        company: '',
                        subject: 'General',
                        message: '',
                        consent: false,
                      });
                    }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="kf-form-row">
                    <div>
                      <label className="kf-label" htmlFor="fullName">Full Name *</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className="kf-input"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="kf-label" htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="kf-input"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="kf-form-row">
                    <div>
                      <label className="kf-label" htmlFor="phone">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="kf-input"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="kf-label" htmlFor="company">Company</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className="kf-input"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="kf-form-group">
                    <label className="kf-label" htmlFor="subject">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      className="kf-select"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="General">General</option>
                      <option value="Sales">Sales</option>
                      <option value="Support">Support</option>
                      <option value="Partnership">Partnership</option>
                    </select>
                  </div>

                  <div className="kf-form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label className="kf-label" htmlFor="message">Message *</label>
                      <span style={{ fontSize: '0.75rem', color: formData.message.length > 950 ? 'var(--orange-primary)' : 'var(--slate-400)' }}>
                        {formData.message.length} / 1000
                      </span>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      className="kf-textarea"
                      maxLength={1000}
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  {/* Consent checkbox */}
                  <div className="kf-form-group" style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '10px' }}>
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      required
                      checked={formData.consent}
                      onChange={handleChange}
                      style={{ marginTop: '4px' }}
                    />
                    <label htmlFor="consent" style={{ fontSize: '0.825rem', color: 'var(--slate-600)', cursor: 'pointer', lineHeight: '1.4' }}>
                      I consent to KoForge storing and processing my contact details in accordance with the privacy policy. *
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="kf-btn kf-btn-primary kf-btn-block"
                    style={{ padding: '12px', marginTop: '10px' }}
                  >
                    Send message
                  </button>
                </form>
              )}
            </div>

            {/* Visit Us */}
            <div className="kf-card-white" style={{ padding: '30px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px', color: 'var(--slate-900)' }}>
                Visit us
              </h3>
              <p style={{ fontWeight: 600, color: 'var(--slate-800)', marginBottom: '4px' }}>
                KoForge Industrial Technologies Pvt. Ltd.
              </p>
              <p style={{ color: 'var(--slate-600)', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '8px' }}>
                Plot 27, Industrial Park Phase II, MIDC,<br />
                Pimpri-Chinchwad, Pune, Maharashtra 411018, India
              </p>
              <div style={{ fontSize: '0.825rem', color: 'var(--slate-500)', marginBottom: '16px' }}>
                Coordinates: <code>18.6298 N, 73.7997 E (placeholder)</code>
              </div>

              {/* Styled Visual Map Placeholder */}
              <div className="kf-map-placeholder">
                <div style={{ position: 'absolute', width: '100%', height: '14px', backgroundColor: '#cbd5e1', transform: 'rotate(12deg)' }}></div>
                <div style={{ position: 'absolute', width: '100%', height: '10px', backgroundColor: '#cbd5e1', transform: 'rotate(-20deg)' }}></div>
                <div style={{ position: 'absolute', height: '100%', width: '12px', backgroundColor: '#cbd5e1', left: '42%' }}></div>
                <div style={{ position: 'absolute', height: '100%', width: '16px', backgroundColor: '#cbd5e1', left: '68%', transform: 'rotate(15deg)' }}></div>
                <div className="kf-map-pin" title="KoForge Pune Facility"></div>
              </div>
              <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--slate-500)', textAlign: 'center' }}>
                Map location (fake): 18.6298 N, 73.7997 E (placeholder)
              </div>

              {/* Social Channels */}
              <div style={{ marginTop: '22px', borderTop: '1px solid var(--slate-200)', paddingTop: '16px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '8px' }}>
                  Connect on Social Media
                </h4>
                <div className="kf-social-row">
                  <span className="kf-social-tag" style={{ color: 'var(--slate-700)', borderColor: 'var(--slate-300)' }}>
                    LinkedIn: /company/koforge
                  </span>
                  <span className="kf-social-tag" style={{ color: 'var(--slate-700)', borderColor: 'var(--slate-300)' }}>
                    YouTube: @koforge
                  </span>
                  <span className="kf-social-tag" style={{ color: 'var(--slate-700)', borderColor: 'var(--slate-300)' }}>
                    X: @koforge_in
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="kf-section">
        <div className="kf-container">
          <h2 className="kf-title-md">Common questions</h2>
          <div>
            {faqs.map((faq, idx) => (
              <div key={idx} className="kf-faq-item">
                <div className="kf-faq-q">{faq.q}</div>
                <div className="kf-faq-a">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
