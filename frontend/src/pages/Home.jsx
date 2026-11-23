export default function Home({ onNavigate }) {
  const industries = [
    'Manufacturing & Assembly',
    'Warehousing & Logistics',
    'Mining & Minerals',
    'Food & Beverage Processing',
    'Automotive',
    'Pharmaceuticals',
    'Ports & Airports',
    'Cement & Steel',
  ];

  const keyCapabilities = [
    'Real-time monitoring',
    'Predictive maintenance',
    'PLC/SCADA integration',
    'Energy optimisation',
    'Remote diagnostics',
    'Custom conveyor design',
    'Role-based dashboards',
    '24×7 support',
  ];

  const servicesSummary = [
    {
      num: '01',
      title: 'Conveyor Management Systems',
      desc: 'Central platform to monitor, control and analyse every conveyor in your plant.',
    },
    {
      num: '02',
      title: 'Conveyor Automation',
      desc: 'Complete automation of belt, roller and chain conveyors using PLC, drives and sensors.',
    },
    {
      num: '03',
      title: 'Industrial Software Solutions',
      desc: 'Custom web and mobile software for industrial operations and reporting.',
    },
    {
      num: '04',
      title: 'System Integration',
      desc: 'Connecting conveyors with existing ERP, WMS, SCADA and third-party equipment.',
    },
    {
      num: '05',
      title: 'Monitoring & Maintenance Solutions',
      desc: 'Condition monitoring and maintenance programmes that prevent breakdowns.',
    },
    {
      num: '06',
      title: 'Custom Engineering Solutions',
      desc: 'Tailor-made conveyor designs for unusual layouts, loads and environments.',
    },
  ];

  const whyChooseUs = [
    {
      title: 'Over 12 years of experience',
      desc: 'Proven engineering leadership in high-demand industrial conveyor environments.',
    },
    {
      title: '99.2% average system uptime',
      desc: 'Engineered reliability that minimises downtime across all plant lines.',
    },
    {
      title: 'In-house hardware + software',
      desc: 'One unified, accountable team from conveyor design to live dashboards.',
    },
    {
      title: 'ISO 9001:2015 certified',
      desc: 'Fully documented, audited and validated engineering and safety processes.',
    },
    {
      title: 'Rapid 4-hour response SLA',
      desc: 'Round-the-clock emergency support when critical production lines cannot stop.',
    },
    {
      title: 'Scalable from 1 line to 100+ lines',
      desc: 'Modular architecture designed to grow seamlessly with plant expansion.',
    },
  ];

  return (
    <main className="kf-home-page">
      {/* Hero Section */}
      <section className="kf-section kf-section-dark" style={{ padding: '64px 0 72px' }}>
        <div className="kf-container">
          <div className="kf-grid-2" style={{ alignItems: 'center', gap: '48px' }}>
            <div>
              <span className="kf-kicker kf-kicker-light">
                INDUSTRIAL TECHNOLOGY & CONVEYOR SOLUTIONS
              </span>
              <h1 className="kf-title-lg" style={{ color: '#ffffff' }}>
                Move More. Monitor Everything. Forge Ahead.
              </h1>
              <p className="kf-subtitle" style={{ fontSize: '1.05rem', color: 'var(--slate-300)', marginBottom: '28px' }}>
                KoForge designs, automates and manages conveyor systems for factories, warehouses and ports,
                backed by industrial software built in-house.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  className="kf-btn kf-btn-primary"
                  onClick={() => onNavigate('/consultation')}
                >
                  Request a Consultation
                </button>
                <button
                  className="kf-btn kf-btn-outline"
                  onClick={() => onNavigate('/services')}
                >
                  Explore Services
                </button>
              </div>
            </div>

            {/* Live Monitoring Sample Card */}
            <div>
              <div className="kf-monitor-card">
                <div className="kf-monitor-header">
                  <div className="kf-monitor-title">Line 04: Packing Hall</div>
                  <div className="kf-monitor-subtitle">Live conveyor monitoring (sample)</div>
                </div>

                <div className="kf-conveyor-schematic">
                  <div className="kf-conveyor-belt">
                    <div className="kf-conveyor-roller"></div>
                    <div className="kf-conveyor-roller"></div>
                    <div className="kf-conveyor-roller"></div>
                    <div className="kf-conveyor-roller"></div>

                    {/* Animated Packages on Conveyor */}
                    <div className="kf-conveyor-package orange p1"></div>
                    <div className="kf-conveyor-package p2"></div>
                    <div className="kf-conveyor-package orange p3"></div>
                    <div className="kf-conveyor-package p4"></div>
                  </div>
                </div>

                <div className="kf-monitor-metrics">
                  <div className="kf-metric-tile">
                    <div className="kf-metric-label">Belt speed</div>
                    <div className="kf-metric-val">1.8 m/s</div>
                  </div>
                  <div className="kf-metric-tile">
                    <div className="kf-metric-label">Motor load</div>
                    <div className="kf-metric-val">72%</div>
                  </div>
                  <div className="kf-metric-tile">
                    <div className="kf-metric-label">Status</div>
                    <div className="kf-metric-val healthy">Healthy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Statistics Bar */}
      <section style={{ backgroundColor: '#ffffff', padding: '36px 0', borderBottom: '1px solid var(--slate-200)' }}>
        <div className="kf-container">
          <div className="kf-grid-5" style={{ textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--slate-900)' }}>240+</div>
              <div style={{ color: 'var(--slate-500)', fontSize: '0.85rem', fontWeight: 500 }}>Projects delivered</div>
            </div>
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--slate-900)' }}>12</div>
              <div style={{ color: 'var(--slate-500)', fontSize: '0.85rem', fontWeight: 500 }}>Years in industry</div>
            </div>
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--slate-900)' }}>85</div>
              <div style={{ color: 'var(--slate-500)', fontSize: '0.85rem', fontWeight: 500 }}>Engineers</div>
            </div>
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--slate-900)' }}>18</div>
              <div style={{ color: 'var(--slate-500)', fontSize: '0.85rem', fontWeight: 500 }}>Industries served</div>
            </div>
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--slate-900)' }}>99.2%</div>
              <div style={{ color: 'var(--slate-500)', fontSize: '0.85rem', fontWeight: 500 }}>Average uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Introduction Section */}
      <section style={{ backgroundColor: 'var(--bg-page-alt)', padding: '36px 0', borderBottom: '1px solid var(--slate-200)' }}>
        <div className="kf-container">
          <div style={{ maxWidth: '920px', margin: '0 auto', textAlign: 'center' }}>
            <span className="kf-kicker">ABOUT KOFORGE</span>
            <p style={{ fontSize: '1.1rem', color: 'var(--slate-700)', lineHeight: '1.7', fontWeight: 500 }}>
              Founded in 2012 in Pune, KoForge is an industrial technology company specialising in conveyor solutions.
              Our 85-person team of mechanical, automation and software engineers has delivered more than 240 installations
              across India, the UAE and Southeast Asia.
            </p>
          </div>
        </div>
      </section>

      {/* What KoForge Does */}
      <section className="kf-section">
        <div className="kf-container">
          <h2 className="kf-title-md">What KoForge does</h2>
          <p className="kf-subtitle">
            We combine conveyor hardware engineering, PLC/SCADA automation and a cloud-connected management platform
            so plants can move material faster, with less downtime and full visibility.
          </p>

          <div className="kf-grid-3">
            {servicesSummary.map((item) => (
              <div key={item.num} className="kf-card-white">
                <div className="kf-card-number">{item.num}</div>
                <h3 className="kf-card-title">{item.title}</h3>
                <p className="kf-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conveyor Management System (CMS Overview + Key Capabilities) */}
      <section className="kf-section kf-section-dark">
        <div className="kf-container">
          <div className="kf-grid-2" style={{ alignItems: 'center' }}>
            <div>
              <h2 className="kf-title-md" style={{ color: '#ffffff' }}>Conveyor Management System (CMS)</h2>
              <p style={{ color: 'var(--slate-300)', fontSize: '0.975rem', lineHeight: '1.6', marginBottom: '22px' }}>
                KoForge CMS is a unified platform that monitors belt speed, motor load, vibration, temperature and
                throughput in real time. It predicts failures, schedules maintenance, and reports energy use through
                live dashboards and mobile alerts.
              </p>

              <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--orange-primary)', marginBottom: '12px' }}>
                Key Capabilities
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px', marginBottom: '16px' }}>
                {keyCapabilities.map((cap) => (
                  <div key={cap} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--slate-200)', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--orange-primary)' }}>&bull;</span> {cap}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="kf-throughput-card">
                <h4>Weekly throughput (sample)</h4>
                <div className="kf-bar-chart">
                  <div className="kf-chart-bar-wrap">
                    <div className="kf-chart-bar" style={{ height: '40%' }}></div>
                  </div>
                  <div className="kf-chart-bar-wrap">
                    <div className="kf-chart-bar" style={{ height: '55%' }}></div>
                  </div>
                  <div className="kf-chart-bar-wrap">
                    <div className="kf-chart-bar" style={{ height: '65%' }}></div>
                  </div>
                  <div className="kf-chart-bar-wrap">
                    <div className="kf-chart-bar" style={{ height: '78%' }}></div>
                  </div>
                  <div className="kf-chart-bar-wrap">
                    <div className="kf-chart-bar highlight" style={{ height: '94%' }}></div>
                  </div>
                  <div className="kf-chart-bar-wrap">
                    <div className="kf-chart-bar" style={{ height: '82%' }}></div>
                  </div>
                  <div className="kf-chart-bar-wrap">
                    <div className="kf-chart-bar" style={{ height: '68%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Client Testimonial */}
          <div className="kf-testimonial-card">
            <div className="kf-testimonial-quote">
              &ldquo;KoForge CMS cut our unplanned stoppages by 38% in the first year.&rdquo;
            </div>
            <div className="kf-testimonial-author">
              &mdash; Operations Head, Sahyadri Auto Components
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="kf-section">
        <div className="kf-container">
          <h2 className="kf-title-md">Industry applications</h2>
          <div className="kf-pills-wrap">
            {industries.map((ind) => (
              <span key={ind} className="kf-pill">{ind}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose KoForge */}
      <section className="kf-section kf-section-alt">
        <div className="kf-container">
          <h2 className="kf-title-md">Why choose KoForge</h2>
          <div className="kf-grid-3">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="kf-card-white">
                <h3 className="kf-card-title">{item.title}</h3>
                <p className="kf-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="kf-cta-banner">
        <div className="kf-container">
          <h2>Ready to optimise your conveyor operations?</h2>
          <p>Talk to our engineers today.</p>
          <button
            className="kf-btn kf-btn-white"
            onClick={() => onNavigate('/consultation')}
          >
            Request a Consultation
          </button>
        </div>
      </section>
    </main>
  );
}
