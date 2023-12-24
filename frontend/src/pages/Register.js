import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

// Phone layout
const appStyle = {
  maxWidth: "393px",
  margin: "auto",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
  height: "852px",
  overflow: "hidden",
  borderRadius: "25px",
};

function Register() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    // Get form data
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    const apiEndpoint = 'http://127.0.0.1:5000/register';

    try {
      // Make a POST request
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      }); 
      
      if (response.ok) {
        // Handle successful registration
        navigate('/login'); // Navigate to login after successful registration
      } else {
        // Handle errors
        const data = await response.json();
        console.error('Registration failed:', data.message);
        setErrorMessage(data.message);
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
      setErrorMessage('Network error');
    }
    navigate('/login'); // This will navigate to the HomePage component
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={appStyle}>
      <div className="text-center">
        <h1 className="mb-4">CAFFEE IN</h1>
        <form onSubmit={handleRegister} style={{ maxWidth: "300px", margin: "auto" }}>
          <div className="form-group mb-3">
            <input name="username" type="text" className="form-control" placeholder="Username" />
          </div>
          <div className="form-group mb-3">
            <input name="email" type="text" className="form-control" placeholder="Email" />
          </div>
          <div className="form-group mb-3">
            <input name="password" type="password" className="form-control" placeholder="Password" />
          </div>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
