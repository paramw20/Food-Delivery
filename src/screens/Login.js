import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [first, setFirst] = useState({
    password: '',
    Geolocation: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/new/loginuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: first.email,
        password: first.password,
      }),
    });

    const resp = await response.json();
    console.log(resp);

    if (!resp.success) {
      alert('Error: Please check your input');
      console.log(resp.errors);
    } else {
      localStorage.setItem("userEmail", first.email)
      localStorage.setItem("authToken", JSON.authToken)
      navigate("/");
    }
  };

  const handleChange = (event) => {
    setFirst({ ...first, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    // Initialize Google One Tap client
    /* global google */ // Add this comment to inform ESLint that 'google' is globally defined
    if (typeof google !== "undefined" && google.accounts) {
      google.accounts.id.initialize({
        client_id: '142853328057-0scqefs2cv8p8kj1en1fgfpo7su2sohs.apps.googleusercontent.com',
        callback: handleGoogleSignIn
      });
      google.accounts.id.prompt();
    }
  }, []);

  const handleGoogleSignIn = async (response) => {
    // Handle the signed in user's profile information
    const idToken = response.credential;
    console.log('ID Token:', idToken);
  
    try {
      const serverResponse = await fetch('http://localhost:5000/new/googlelogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });
  
      const data = await serverResponse.json();
      console.log('Server Response:', data);
  
      if (serverResponse.ok) {
        // If server response is successful, navigate to home
        navigate('/home');
      } else {
        console.error('Google sign-in failed:', data.error);
        alert('Google sign-in failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      alert('An error occurred during Google sign-in. Please try again later.');
    }
  };
  

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={first.email}
              onChange={handleChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={first.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/signup" className="btn btn-danger btn-primary">
            i am not a user
          </Link>
        </form>
      </div>
    </div>
  );
}
