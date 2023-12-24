const TextInputField = ({ id, name, label, placeholder, onValueChange }) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    onValueChange(newValue); // Call the callback function with the new value
  };

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <input
        type="text"
        className="form-control"
        id={id}
        name={name} // Include the name prop for form submission
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextInputField;
