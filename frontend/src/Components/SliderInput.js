import React, { useState } from "react";

const SliderInput = ({ id, name, label, min, max, step, onValueChange }) => {
  const [value, setValue] = useState((min + max) / 2);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onValueChange(newValue); // Call the callback function with the new value
  };

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}: {value}
      </label>
      <input
        type="range"
        className="form-range"
        id={id}
        name={name} // Include the name prop for form submission
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};


export default SliderInput;
