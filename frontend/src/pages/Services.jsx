import ServiceCard from '../components/ServiceCard';

export default function Services({ onNavigate }) {
  const servicesList = [
    {
      duration: '6-10 weeks',
      title: 'Conveyor Management Systems',
      description: 'Central platform to monitor, control and analyse every conveyor in your plant.',
      bullets: [
        'Live dashboards and alarm management',
        'Throughput and downtime analytics',
        'Role-based access and audit logs',
      ],
      idealFor: 'Plant managers, maintenance heads',
    },
    {
      duration: '8-14 weeks',
      title: 'Conveyor Automation',
      description: 'Complete automation of belt, roller and chain conveyors using PLC, drives and sensors.',
      bullets: [
        'PLC programming and VFD control',
        'Sorting and diverter logic',
        'Safety interlocks and HMI panels',
      ],
      idealFor: 'Warehouses, assembly lines',
    },
    {
      duration: '6-12 weeks',
      title: 'Industrial Software Solutions',
      description: 'Custom web and mobile software for industrial operations and reporting.',
      bullets: [
        'MES connectors and REST APIs',
        'OEE and production dashboards',
        'Mobile maintenance app and data historian',
      ],
      idealFor: 'IT and operations teams',
    },
    {
      duration: '4-10 weeks',
      title: 'System Integration',
      description: 'Connecting conveyors with existing ERP, WMS, SCADA and third-party equipment.',
      bullets: [
        'OPC-UA / Modbus / MQTT integration',
        'SAP and WMS connectors',
        'Legacy system migration',
      ],
      idealFor: 'Enterprises with mixed systems',
    },
    {
      duration: '3-6 weeks',
      title: 'Monitoring and Maintenance Solutions',
      description: 'Condition monitoring and maintenance programmes that prevent breakdowns.',
      bullets: [
        'IoT vibration and temperature sensors',
        'Predictive alerts and AMC contracts',
        'Spare-parts planning and 24×7 helpdesk',
      ],
      idealFor: 'Heavy industry, mining, cement',
    },
    {
      duration: '10-20 weeks',
      title: 'Custom Engineering Solutions',
      description: 'Tailor-made conveyor designs for unusual layouts, loads and environments.',
      bullets: [
        '3D design and simulation',
        'Heavy-duty and hygienic designs',
        'Retrofit, upgrade and on-site commissioning',
      ],
      idealFor: 'Special-purpose projects',
    },
  ];

  const steps = [
    {
      step: 'STEP 1',
      title: 'Discover',
      desc: 'We study your plant, loads and goals.',
    },
    {
      step: 'STEP 2',
      title: 'Design',
      desc: 'Engineers draft layouts, controls and software.',
    },
    {
      step: 'STEP 3',
      title: 'Deploy',
      desc: 'Installation, integration and commissioning.',
    },
    {
      step: 'STEP 4',
      title: 'Support',
      desc: 'Monitoring, AMC and 24×7 helpdesk.',
    },
  ];

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

  return (
    <main className="kf-services-page">
      {/* Hero */}
      <section className="kf-section kf-section-dark" style={{ padding: '56px 0 64px' }}>
        <div className="kf-container">
          <span className="kf-kicker kf-kicker-light">SERVICES</span>
          <h1 className="kf-title-lg" style={{ color: '#ffffff', maxWidth: '800px' }}>
            Conveyor engineering, automation and software from one team
          </h1>
          <p className="kf-subtitle" style={{ color: 'var(--slate-300)', marginBottom: '24px' }}>
            Choose a single service or combine them into a complete conveyor solution.
          </p>
          <button
            className="kf-btn kf-btn-primary"
            onClick={() => onNavigate('/consultation')}
          >
            Request a Consultation
          </button>
        </div>
      </section>

      {/* What We Offer */}
      <section className="kf-section">
        <div className="kf-container">
          <h2 className="kf-title-md">What we offer</h2>
          <div className="kf-grid-3">
            {servicesList.map((svc, idx) => (
              <ServiceCard
                key={idx}
                duration={svc.duration}
                title={svc.title}
                description={svc.description}
                bullets={svc.bullets}
                idealFor={svc.idealFor}
                onConsult={() => onNavigate('/consultation')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="kf-section kf-section-alt">
        <div className="kf-container">
          <h2 className="kf-title-md">How we work</h2>
          <p className="kf-subtitle">A clear process from first call to ongoing support.</p>

          <div className="kf-grid-4">
            {steps.map((st, idx) => (
              <div key={idx} className="kf-step-card">
                <div className="kf-step-badge">{st.step}</div>
                <h3>{st.title}</h3>
                <p>{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="kf-section">
        <div className="kf-container">
          <h2 className="kf-title-md">Industries we serve</h2>
          <div className="kf-pills-wrap">
            {industries.map((ind) => (
              <span key={ind} className="kf-pill">{ind}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="kf-cta-banner">
        <div className="kf-container">
          <h2>Not sure which service you need? Talk to an engineer.</h2>
          <button
            className="kf-btn kf-btn-white"
            onClick={() => onNavigate('/consultation')}
            style={{ marginTop: '16px' }}
          >
            Request a Consultation
          </button>
        </div>
      </section>
    </main>
  );
}
