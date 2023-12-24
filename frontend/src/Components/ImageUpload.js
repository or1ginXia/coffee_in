import React, { useState } from "react";

const ImageUpload = ({ onImageSelect }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageSelect(file); // Call the callback function with the selected file
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="m-2">
        {preview ? (
          <img src={preview} alt="Preview" className="img-thumbnail" />
        ) : (
          <div
            className="img-thumbnail d-flex justify-content-center align-items-center"
            style={{ width: "200px", height: "200px" }}
          >
            No image selected
          </div>
        )}
      </div>
      <div className="m-2">
        <label className="btn btn-outline-secondary">
          <i className="bi bi-plus"></i>
          <input type="file" className="d-none" onChange={handleImageChange} />
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
