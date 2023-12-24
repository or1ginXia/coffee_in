import React, { useState, useRef } from 'react';
import BottomMenu from "../Components/BottomMenu";
import CreateHeader from "../Components/CreateHeader";
import ImageUpload from "../Components/ImageUpload";
import SliderInput from "../Components/SliderInput";
import TextInputField from "../Components/TextInputField";

// Phone layout
const appStyle = {
  maxWidth: "393px",
  margin: "auto",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
  height: "852px",
  overflow: "hidden",
  borderRadius: "25px",
};

const textFields = [
  { id: "nameInput", name: "name", label: "Name", placeholder: "Enter Post Name" },
  { id: "locationInput", name: "location", label: "Location", placeholder: "Enter location" },
  { id: "beanOriginInput", name: "beanOrigin", label: "Bean Origin", placeholder: "Enter bean origin" },
  { id: "beanTypeInput", name: "beanType", label: "Bean Type", placeholder: "Enter bean type" },
  { id: "roastInput", name: "roast", label: "Roast", placeholder: "Enter roast" },
  { id: "brewingMethodInput", name: "brewingMethod", label: "Brewing", placeholder: "Enter brewing method" },
  { id: "detailsInput", name: "details", label: "Details", placeholder: "Enter details" },
];

function Create() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [bitterness, setBitterness] = useState(5);
  const [acidity, setAcidity] = useState(5);
  const [body, setBody] = useState(5);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    beanOrigin: "",
    beanType: "",
    roast: "",
    brewingMethod: "",
    details: ""
  });

  const formRef = useRef();
  const getSession = () => {
    console.log("localStorage", localStorage);
    const sessionData = localStorage.getItem('session');
  
    if (sessionData) {
      const userData = JSON.parse(sessionData);
      return userData;
    }
  
    return null;
  };


  const handleInputChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleImageSelect = (file) => {
    setSelectedImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);
    if (selectedImage) {
      formData.append('image', selectedImage); // Append the image file to FormData
    }

    formData.append('userId', getSession());

    try {
      const response = await fetch('http://127.0.0.1:5000/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log("Post created successfully");
        // Handle successful post creation
      } else {
        console.error("Failed to create post");
        // Handle errors
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle network errors
    }
  };

  return (
    <div className="container d-flex flex-column" style={appStyle}>
      <CreateHeader />
      <div className="flex-grow-1 overflow-y-auto">
        <form ref={formRef} onSubmit={handleSubmit}>
          <ImageUpload onImageSelect={handleImageSelect} />
          <SliderInput id="bitternessSlider" name="bitterness" label="Bitterness" min={0} max={10} step={1} onValueChange={setBitterness} />
          <SliderInput id="aciditySlider" name="acidity" label="Acidity" min={0} max={10} step={1} onValueChange={setAcidity} />
          <SliderInput id="bodySlider" name="body" label="Body" min={0} max={10} step={1} onValueChange={setBody} />
          {textFields.map((field) => (
            <TextInputField
              key={field.id}
              id={field.id}
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              onValueChange={(value) => handleInputChange(field.name, value)}
            />
        ))}
          <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>
      </div>
      <BottomMenu />
    </div>
  );
}

export default Create;
