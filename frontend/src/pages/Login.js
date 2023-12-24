import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Phone layout
const appStyle = {
  maxWidth: "393px",
  margin: "auto",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
  height: "852px",
  overflow: "hidden",
  borderRadius: "25px",
};

function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submit action

    // Get form data
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    const apiEndpoint = 'http://127.0.0.1:5000/login';

    try {
      // Make a POST request
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Credentials': 'include',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      // Check if login was successful based on the response
      if (response.ok) {
        // save session id
        localStorage.setItem('session', JSON.stringify(data.id));
        // Navigate to the HomePage component
        navigate('/home');
      } else if (response.status === 401) {
        setErrorMessage('Login failed: username or password is incorrect');
        return;
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleRegister = () => {
    navigate('/register'); // This will navigate to the Register component or page
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={appStyle}>
      <div className="text-center">
        <h1 className="mb-4">CAFFEE IN</h1>
        <form onSubmit={handleLogin} style={{ maxWidth: "300px", margin: "auto" }}>
          <div className="form-group mb-3">
            <input name="username" type="text" className="form-control" placeholder="Username" />
          </div>
          <div className="form-group mb-3">
            <input name="password" type="password" className="form-control" placeholder="Password" />
          </div>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <button type="submit" className="btn btn-primary w-100">Login</button>
          <button type="button" className="btn btn-secondary w-100 mt-3" onClick={handleRegister}>Register</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
