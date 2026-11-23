import { useState } from 'react';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ['pdf', 'dwg', 'xlsx'];

export default function Consultation() {
  const [formData, setFormData] = useState({
    requiredService: 'Conveyor Management Systems',
    industryType: 'Manufacturing & Assembly',
    projectRequirements: '',
    conveyorTypes: ['Belt'],
    conveyorLines: '',
    conveyorLength: '',
    maxLoadCapacity: '',
    existingControlSystem: 'None',
    expectedTimeline: '1-3 months',
    budgetRange: 'Not decided',
    contactNameDesignation: '',
    company: '',
    businessEmail: '',
    phone: '',
    cityState: '',
    preferredMode: 'Phone call',
    preferredDateTime: '',
  });

  const [fileName, setFileName] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  const conveyorOptions = [
    'Belt',
    'Roller',
    'Chain',
    'Screw',
    'Bucket elevator',
    'Overhead',
    'Not sure',
  ];

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleConveyorType = (type) => {
    setValidationMessage('');
    setFormData((prev) => {
      const selected = prev.conveyorTypes;
      if (type === 'Not sure') {
        return { ...prev, conveyorTypes: selected.includes('Not sure') ? [] : ['Not sure'] };
      }
      const next = selected.includes(type)
        ? selected.filter((item) => item !== type)
        : [...selected.filter((item) => item !== 'Not sure'), type];
      return { ...prev, conveyorTypes: next };
    });
  };

  const handleFileChange = (e) => {
    setValidationMessage('');
    const file = e.target.files?.[0];
    if (!file) {
      setFileName('');
      return;
    }
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(extension) || file.size > MAX_FILE_SIZE) {
      setValidationMessage('Only PDF, DWG or XLSX files up to 10 MB are allowed.');
      e.target.value = '';
      setFileName('');
      return;
    }
    setFileName(file.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.conveyorTypes.length === 0) {
      setValidationMessage('Please select at least one conveyor type.');
      return;
    }
    if (formData.preferredDateTime) {
      const selectedDate = new Date(formData.preferredDateTime);
      if (Number.isNaN(selectedDate.getTime()) || selectedDate.getDay() === 0) {
        setValidationMessage('Please choose a date between Monday and Saturday.');
        return;
      }
    }
    setValidationMessage('Form validated successfully. This is a frontend preview; your request has NOT been sent or saved. FastAPI integration is still pending.');
  };

  return (
    <main style={{ backgroundColor: 'var(--bg-page-alt)', padding: '44px 0 64px' }}>
      <div className="kf-container">
        <div className="kf-grid-2" style={{ gap: '40px', alignItems: 'start' }}>
          {/* Left Column: Info & Process */}
          <div>
            <span className="kf-kicker">CONSULTATION</span>
            <h1 className="kf-title-lg" style={{ color: 'var(--slate-900)', marginBottom: '14px' }}>
              Request a consultation
            </h1>
            <p style={{ color: 'var(--slate-600)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '32px' }}>
              Tell us about your conveyor project. Share your specifications so our team can review your requirements.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, color: 'var(--orange-primary)', fontSize: '1.1rem' }}>1.</span>
                <div>
                  <strong style={{ color: 'var(--slate-800)', display: 'block' }}>Share your requirements</strong>
                  <span style={{ color: 'var(--slate-600)', fontSize: '0.875rem' }}>Fill in lines, conveyor types, capacity and project goals.</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, color: 'var(--orange-primary)', fontSize: '1.1rem' }}>2.</span>
                <div>
                  <strong style={{ color: 'var(--slate-800)', display: 'block' }}>We review and call you back</strong>
                  <span style={{ color: 'var(--slate-600)', fontSize: '0.875rem' }}>An experienced systems engineer will review the details.</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, color: 'var(--orange-primary)', fontSize: '1.1rem' }}>3.</span>
                <div>
                  <strong style={{ color: 'var(--slate-800)', display: 'block' }}>Receive a tailored proposal</strong>
                  <span style={{ color: 'var(--slate-600)', fontSize: '0.875rem' }}>Includes preliminary specs, timeline and cost estimates.</span>
                </div>
              </div>
            </div>

            <div className="kf-card-white" style={{ borderLeft: '4px solid var(--orange-primary)', padding: '20px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '4px' }}>Need urgent technical advice?</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)' }}>
                Contact information is illustrative; confirm support details before publishing.
              </p>
            </div>
          </div>

          {/* Right Column: Full Form */}
          <div>
            <div className="kf-form-card">
                <form onSubmit={handleSubmit}>
                  {/* Service & Industry */}
                  <div className="kf-form-row">
                    <div>
                      <label className="kf-label" htmlFor="requiredService">Select required service *</label>
                      <select
                        id="requiredService"
                        name="requiredService"
                        className="kf-select"
                        required
                        value={formData.requiredService}
                        onChange={handleTextChange}
                      >
                        <option value="Conveyor Management Systems">Conveyor Management Systems</option>
                        <option value="Conveyor Automation">Conveyor Automation</option>
                        <option value="Industrial Software Solutions">Industrial Software Solutions</option>
                        <option value="System Integration">System Integration</option>
                        <option value="Monitoring and Maintenance Solutions">Monitoring and Maintenance Solutions</option>
                        <option value="Custom Engineering Solutions">Custom Engineering Solutions</option>
                        <option value="Not sure">Not sure</option>
                      </select>
                    </div>

                    <div>
                      <label className="kf-label" htmlFor="industryType">Industry type *</label>
                      <select
                        id="industryType"
                        name="industryType"
                        className="kf-select"
                        required
                        value={formData.industryType}
                        onChange={handleTextChange}
                      >
                        <option value="Manufacturing & Assembly">Manufacturing &amp; Assembly</option>
                        <option value="Warehousing & Logistics">Warehousing &amp; Logistics</option>
                        <option value="Mining & Minerals">Mining &amp; Minerals</option>
                        <option value="Food & Beverage Processing">Food &amp; Beverage Processing</option>
                        <option value="Automotive">Automotive</option>
                        <option value="Pharmaceuticals">Pharmaceuticals</option>
                        <option value="Ports & Airports">Ports &amp; Airports</option>
                        <option value="Cement & Steel">Cement &amp; Steel</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Conveyor Type Multi-Select */}
                  <div className="kf-form-group">
                    <label className="kf-label">Conveyor type (multi-select) *</label>
                    <div className="kf-chip-group" role="group" aria-label="Conveyor type">
                      {conveyorOptions.map((type) => {
                        const isSelected = formData.conveyorTypes.includes(type);
                        return (
                          <button
                            type="button"
                            aria-pressed={isSelected}
                            key={type}
                            className={`kf-chip-label ${isSelected ? 'active' : ''}`}
                            onClick={() => toggleConveyorType(type)}
                          >
                            <span>{isSelected ? '✓' : '+'}</span> {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Lines, Length & Load Capacity */}
                  <div className="kf-form-row">
                    <div>
                      <label className="kf-label" htmlFor="conveyorLines">Number of conveyor lines (1-500) *</label>
                      <input
                        type="number"
                        id="conveyorLines"
                        name="conveyorLines"
                        min="1"
                        max="500"
                        className="kf-input"
                        placeholder="e.g. 12"
                        required
                        value={formData.conveyorLines}
                        onChange={handleTextChange}
                      />
                    </div>
                    <div>
                      <label className="kf-label" htmlFor="conveyorLength">Approx. conveyor length (m)</label>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        id="conveyorLength"
                        name="conveyorLength"
                        className="kf-input"
                        placeholder="Total length across lines"
                        value={formData.conveyorLength}
                        onChange={handleTextChange}
                      />
                    </div>
                  </div>

                  <div className="kf-form-row">
                    <div>
                      <label className="kf-label" htmlFor="maxLoadCapacity">Max load capacity (tons/hr)</label>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        id="maxLoadCapacity"
                        name="maxLoadCapacity"
                        className="kf-input"
                        placeholder="Numeric value"
                        value={formData.maxLoadCapacity}
                        onChange={handleTextChange}
                      />
                    </div>

                    <div>
                      <label className="kf-label" htmlFor="existingControlSystem">Existing control system</label>
                      <select
                        id="existingControlSystem"
                        name="existingControlSystem"
                        className="kf-select"
                        value={formData.existingControlSystem}
                        onChange={handleTextChange}
                      >
                        <option value="None">None</option>
                        <option value="Siemens">Siemens</option>
                        <option value="Allen-Bradley">Allen-Bradley</option>
                        <option value="Mitsubishi">Mitsubishi</option>
                        <option value="Schneider">Schneider</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Timeline & Budget */}
                  <div className="kf-form-row">
                    <div>
                      <label className="kf-label" htmlFor="expectedTimeline">Expected timeline *</label>
                      <select
                        id="expectedTimeline"
                        name="expectedTimeline"
                        className="kf-select"
                        required
                        value={formData.expectedTimeline}
                        onChange={handleTextChange}
                      >
                        <option value="Under 1 month">Under 1 month</option>
                        <option value="1-3 months">1-3 months</option>
                        <option value="3-6 months">3-6 months</option>
                        <option value="6+ months">6+ months</option>
                      </select>
                    </div>

                    <div>
                      <label className="kf-label" htmlFor="budgetRange">Budget range (INR)</label>
                      <select
                        id="budgetRange"
                        name="budgetRange"
                        className="kf-select"
                        value={formData.budgetRange}
                        onChange={handleTextChange}
                      >
                        <option value="Not decided">Not decided</option>
                        <option value="Under 10 lakh">Under 10 lakh</option>
                        <option value="10-50 lakh">10-50 lakh</option>
                        <option value="50 lakh-2 crore">50 lakh-2 crore</option>
                        <option value="Above 2 crore">Above 2 crore</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Requirements */}
                  <div className="kf-form-group">
                    <label className="kf-label" htmlFor="projectRequirements">Project requirements *</label>
                    <textarea
                      id="projectRequirements"
                      name="projectRequirements"
                      className="kf-textarea"
                      placeholder="Describe goals, current problems, timeline"
                      required
                      value={formData.projectRequirements}
                      onChange={handleTextChange}
                      rows={3}
                    ></textarea>
                  </div>

                  {/* Contact Name & Company */}
                  <div className="kf-form-row">
                    <div>
                      <label className="kf-label" htmlFor="contactNameDesignation">Contact name / Designation *</label>
                      <input
                        type="text"
                        id="contactNameDesignation"
                        name="contactNameDesignation"
                        className="kf-input"
                        placeholder="Full name and role (e.g. Ramesh Sharma, Plant Head)"
                        required
                        value={formData.contactNameDesignation}
                        onChange={handleTextChange}
                      />
                    </div>

                    <div>
                      <label className="kf-label" htmlFor="company">Company *</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className="kf-input"
                        placeholder="Company name"
                        required
                        value={formData.company}
                        onChange={handleTextChange}
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="kf-form-row">
                    <div>
                      <label className="kf-label" htmlFor="businessEmail">Business email *</label>
                      <input
                        type="email"
                        id="businessEmail"
                        name="businessEmail"
                        className="kf-input"
                        placeholder="name@company.com (preferred)"
                        required
                        value={formData.businessEmail}
                        onChange={handleTextChange}
                      />
                    </div>

                    <div>
                      <label className="kf-label" htmlFor="phone">Phone *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="kf-input"
                        placeholder="+91"
                        required
                        value={formData.phone}
                        onChange={handleTextChange}
                      />
                    </div>
                  </div>

                  {/* City/State & Consultation Mode */}
                  <div className="kf-form-row">
                    <div>
                      <label className="kf-label" htmlFor="cityState">City / State (Site location) *</label>
                      <input
                        type="text"
                        id="cityState"
                        name="cityState"
                        className="kf-input"
                        placeholder="e.g. Pune, Maharashtra"
                        required
                        value={formData.cityState}
                        onChange={handleTextChange}
                      />
                    </div>

                    <div>
                      <label className="kf-label" htmlFor="preferredMode">Preferred consultation mode *</label>
                      <select
                        id="preferredMode"
                        name="preferredMode"
                        className="kf-select"
                        required
                        value={formData.preferredMode}
                        onChange={handleTextChange}
                      >
                        <option value="Phone call">Phone call</option>
                        <option value="Video call">Video call</option>
                        <option value="On-site visit">On-site visit</option>
                      </select>
                    </div>
                  </div>

                  {/* Date/Time & File attachment */}
                  <div className="kf-form-row">
                    <div>
                      <label className="kf-label" htmlFor="preferredDateTime">Preferred date and time (Mon-Sat only)</label>
                      <input
                        type="datetime-local"
                        id="preferredDateTime"
                        name="preferredDateTime"
                        className="kf-input"
                        value={formData.preferredDateTime}
                        onChange={handleTextChange}
                      />
                    </div>

                    <div>
                      <label className="kf-label" htmlFor="specFile">Attach drawings or specs (PDF/DWG/XLSX, max 10 MB)</label>
                      <input
                        type="file"
                        id="specFile"
                        className="kf-input"
                        accept=".pdf,.dwg,.xlsx"
                        onChange={handleFileChange}
                        style={{ padding: '6px 12px' }}
                      />
                      {fileName && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--slate-600)', marginTop: '4px' }}>
                          Selected: {fileName}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="kf-btn kf-btn-primary kf-btn-block"
                    style={{ marginTop: '10px', padding: '12px' }}
                  >
                    Request a Consultation
                  </button>
                  {validationMessage && (
                    <p role="status" aria-live="polite" style={{ marginTop: '12px', color: 'var(--slate-700)', fontSize: '0.875rem' }}>
                      {validationMessage}
                    </p>
                  )}
                </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
