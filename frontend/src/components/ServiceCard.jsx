export default function ServiceCard({
  duration,
  title,
  description,
  bullets = [],
  idealFor,
  onConsult,
}) {
  return (
    <div className="kf-service-card">
      {duration && <span className="kf-duration-badge">{duration}</span>}
      <h3 className="kf-card-title">{title}</h3>
      <p className="kf-card-desc">{description}</p>

      {bullets.length > 0 && (
        <ul className="kf-service-bullets">
          {bullets.map((bullet, idx) => (
            <li key={idx}>{bullet}</li>
          ))}
        </ul>
      )}

      {idealFor && (
        <div className="kf-service-ideal">
          <strong>Ideal for:</strong> {idealFor}
        </div>
      )}

      <button className="kf-service-link" onClick={onConsult}>
        Request a consultation &rarr;
      </button>
    </div>
  );
}
