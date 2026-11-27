import { useState, useRef } from 'react';
import '../styles/Consultation.css';

const localDate = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const timeOptions = Array.from({length: 96}, (_, i) => {
  const h = Math.floor(i / 4), m = (i % 4) * 15;
  return { value: `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`, label: `${h % 12 || 12}:${String(m).padStart(2,'0')} ${h < 12 ? 'AM' : 'PM'}` };
});

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
    preferredDate: '',
    preferredTime: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [validationMessage, setValidationMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [calendarMonth, setCalendarMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [calendarOpen, setCalendarOpen] = useState(false);
  const today = localDate();
  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const changeMonth = (delta) => setCalendarMonth(new Date(year, month + delta, 1));
  const chooseDate = (date) => {
    setFormData(prev => ({...prev, preferredDate: date, preferredTime: ''}));
    setCalendarOpen(false);
    setValidationMessage('');
    setSuccess(false);
  };

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

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  setValidationMessage('');
  setSuccess(false);
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
    setSuccess(false);
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      return;
    }
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(extension) || file.size > MAX_FILE_SIZE || file.size === 0) {
      setValidationMessage('Choose a non-empty PDF, DWG or XLSX file up to 10 MB.');
      e.target.value = '';
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
  };

  const removeAttachment = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setValidationMessage('');
    setSuccess(false);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return;

  setValidationMessage('');
  setSuccess(false);

  // Validate conveyor types
  if (formData.conveyorTypes.length === 0) {
    setValidationMessage(
      'Please select at least one conveyor type.'
    );
    return;
  }

  // Validate conveyor lines
  const lines = Number(formData.conveyorLines);

  if (!Number.isInteger(lines) || lines < 1 || lines > 500) {
    setValidationMessage(
      'Conveyor lines must be between 1 and 500.'
    );
    return;
  }

  // Validate conveyor length
  if (
    formData.conveyorLength !== '' &&
    (!Number.isFinite(Number(formData.conveyorLength)) ||
      Number(formData.conveyorLength) < 0)
  ) {
    setValidationMessage(
      'Please enter a valid conveyor length.'
    );
    return;
  }

  // Validate load capacity
  if (
    formData.maxLoadCapacity !== '' &&
    (!Number.isFinite(Number(formData.maxLoadCapacity)) ||
      Number(formData.maxLoadCapacity) < 0)
  ) {
    setValidationMessage(
      'Please enter a valid load capacity.'
    );
    return;
  }

  // Validate project requirements
  if (
    formData.projectRequirements.trim().length < 10 ||
    !/[a-zA-Z]/.test(formData.projectRequirements)
  ) {
    setValidationMessage(
      'Please enter meaningful project requirements of at least 10 characters.'
    );
    return;
  }

  // Validate contact name
 if (
  formData.contactNameDesignation.trim().length < 2 ||
  !/^[\p{L}][\p{L}\s.,'’&()/-]*$/u.test(
    formData.contactNameDesignation.trim()
  )
) {
  setValidationMessage(
    'Please enter a valid contact name and designation without numbers.'
  );
  return;
}

  // Validate company name
  if (!formData.company.trim()) {
    setValidationMessage(
      'Please enter your company name.'
    );
    return;
  }

  // Validate phone number
  if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
    setValidationMessage(
      'Phone number must contain exactly 10 digits.'
    );
    return;
  }

  // Validate optional appointment as a complete pair
  const { preferredDate, preferredTime } = formData;
  const preferredDateTime = preferredDate && preferredTime
    ? `${preferredDate}T${preferredTime}` : '';
  if (preferredDate || preferredTime) {
    if (!preferredDateTime) {
      setValidationMessage('Please select both a date and a time, or clear the appointment.');
      return;
    }
    const selectedDate = new Date(preferredDateTime);
    if (Number.isNaN(selectedDate.getTime()) || selectedDate <= new Date()) {
      setValidationMessage('Please select a future date and time.');
      return;
    }
    if (selectedDate.getDay() === 0) {
      setValidationMessage('Please choose a date between Monday and Saturday.');
      return;
    }
  }

  setLoading(true);

  try {
    const payload = {
          required_service: formData.requiredService,
          industry_type: formData.industryType,
          conveyor_types: formData.conveyorTypes,
          conveyor_lines: lines,

          conveyor_length:
            formData.conveyorLength === ''
              ? null
              : Number(formData.conveyorLength),

          max_load_capacity:
            formData.maxLoadCapacity === ''
              ? null
              : Number(formData.maxLoadCapacity),

          existing_control_system:
            formData.existingControlSystem,

          expected_timeline: formData.expectedTimeline,
          budget_range: formData.budgetRange,

          project_requirements:
            formData.projectRequirements.trim(),

          contact_name_designation:
            formData.contactNameDesignation.trim(),

          company: formData.company.trim(),
          business_email: formData.businessEmail.trim(),
          phone: formData.phone.trim(),
          city_state: formData.cityState.trim(),
          preferred_mode: formData.preferredMode,

          preferred_date_time:
            preferredDateTime || null,
    };

    let options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    };

    if (selectedFile) {
      const multipart = new FormData();
      multipart.append('data', JSON.stringify(payload));
      multipart.append('attachment', selectedFile);
      options = { method: 'POST', body: multipart };
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/consultation`,
      options
    );

    const data = await response.json();

    // Handle backend validation errors
    if (!response.ok) {
      const detail = Array.isArray(data.detail)
        ? data.detail.map((item) => item.msg).join(' ')
        : data.detail;

      throw new Error(
        detail || 'Unable to submit consultation request.'
      );
    }

    // Successful submission
    setSuccess(true);
    setValidationMessage(data.message);

    // Reset form only after successful submission
    setFormData({
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
      preferredDate: '',
    preferredTime: '',
    });

    // Reset attachment without clearing the success message
    setSelectedFile(null);
    setCalendarOpen(false);
    setCalendarMonth(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    if (fileInputRef.current) fileInputRef.current.value = '';

  } catch (error) {
    setSuccess(false);

    setValidationMessage(
      error instanceof TypeError
        ? 'Unable to connect to the server. Please try again.'
        : error.message
    );

  } finally {
    setLoading(false);
  }
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
            <div className="kf-form-card kf-consultation-form">
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
                        placeholder="Full name and designation"
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
                        className="kf-input"
                        inputMode="numeric"
                        name="phone"
                        value={formData.phone}
                        onChange={handleTextChange}
                        placeholder="10-digit phone number"
                        maxLength={10}
                        pattern="[0-9]{10}"
                        required
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

                  <section className="kf-appointment" aria-label="Preferred appointment">
                    <div className="kf-appointment-heading">
                      <strong>Preferred appointment</strong>
                      <button type="button" className="kf-clear-date" onClick={() => chooseDate('')}>Clear</button>
                    </div>
                    <p className="kf-appointment-help">Optional · Monday–Saturday · Subject to confirmation</p>
                    <div className="kf-appointment-grid">
                      <div className="kf-date-field">
                        <label className="kf-label" htmlFor="preferredDate">Preferred date</label>
                        <button type="button" id="preferredDate" className="kf-input kf-date-trigger" aria-expanded={calendarOpen} onClick={() => setCalendarOpen(v => !v)}>
                          {formData.preferredDate ? new Date(formData.preferredDate + 'T00:00:00').toLocaleDateString('en-IN', {day:'numeric', month:'short', year:'numeric'}) : 'Select date'} <span aria-hidden="true">▾</span>
                        </button>
                        {calendarOpen && <div className="kf-calendar">
                          <div className="kf-calendar-header">
                            <button type="button" aria-label="Previous month" disabled={year === new Date().getFullYear() && month === new Date().getMonth()} onClick={() => changeMonth(-1)}>‹</button>
                            <strong aria-live="polite">{calendarMonth.toLocaleDateString('en-IN', {month:'long', year:'numeric'})}</strong>
                            <button type="button" aria-label="Next month" onClick={() => changeMonth(1)}>›</button>
                          </div>
                          <div className="kf-calendar-grid">
                            {['Su','Mo','Tu','We','Th','Fr','Sa'].map(day => <span key={day}>{day}</span>)}
                            {Array.from({length:firstDay}, (_, i) => <span key={`blank-${i}`} />)}
                            {Array.from({length:days}, (_, i) => {
                              const d = new Date(year, month, i+1);
                              const date = localDate(d);
                              return <button type="button" key={date} disabled={date < today || d.getDay() === 0} aria-label={d.toLocaleDateString('en-IN', {dateStyle:'full'})} aria-pressed={date === formData.preferredDate} onClick={() => chooseDate(date)}>{i+1}</button>;
                            })}
                          </div>
                        </div>}
                      </div>
                      <div>
                        <label className="kf-label" htmlFor="preferredTime">Preferred time</label>
                        <select id="preferredTime" name="preferredTime" className="kf-select" value={formData.preferredTime} onChange={handleTextChange} disabled={!formData.preferredDate}>
                          <option value="">Select time</option>
                          {timeOptions.map(t => <option key={t.value} value={t.value} disabled={new Date(`${formData.preferredDate}T${t.value}`) <= new Date()}>{t.label}</option>)}
                        </select>
                      </div>
                    </div>
                  </section>
                  <div className="kf-form-group kf-consultation-upload">
                    <div>
                      <label className="kf-label" htmlFor="specFile">Supporting documents (optional)</label>
                      <p className="kf-appointment-help">PDF, DWG or XLSX · Max 10 MB</p>
                      <div style={{ position: 'relative', minWidth: 0 }}>
                        <input
                          type="file"
                          id="specFile"
                          ref={fileInputRef}
                          className="kf-input"
                          disabled={loading}
                          accept=".pdf,.dwg,.xlsx"
                          onChange={handleFileChange}
                          style={{ padding: selectedFile ? '6px 38px 6px 12px' : '6px 12px', width: '100%', minWidth: 0, boxSizing: 'border-box' }}
                        />
                        {selectedFile && (
                          <button
                            type="button"
                            onClick={removeAttachment}
                            disabled={loading}
                            aria-label="Remove attachment"
                            title="Remove attachment"
                            style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)', width: '32px', height: '32px', display: 'grid', placeItems: 'center', border: 0, background: 'transparent', color: '#dc2626', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '20px', lineHeight: 1, padding: 0 }}
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  
                <button
                  type="submit"
                  className="kf-btn kf-btn-primary kf-btn-block"
                  disabled={loading}
                  style={{
                    marginTop: '10px',
                    padding: '12px',
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading
                    ? 'Submitting request...'
                    : 'Request a Consultation'}
                </button>

                {validationMessage && (
                  <p
                    role="status"
                    aria-live="polite"
                    style={{
                      marginTop: '12px',
                      fontSize: '0.875rem',
                      color: success ? '#16a34a' : '#dc2626'
                    }}
                  >
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
