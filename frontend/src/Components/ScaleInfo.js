const ScaleInfo = ({ label, value, max }) => {
  // Calculate the percentage of the progress bar
  const percentage = (value / max) * 100;

  return (
    <div className="mb-3">
      <label className="form-label">
        <strong>{label}</strong>
      </label>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${percentage}%` }} // Inline style for dynamic width
          aria-valuenow={value}
          aria-valuemin="0"
          aria-valuemax={max}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

export default ScaleInfo;
