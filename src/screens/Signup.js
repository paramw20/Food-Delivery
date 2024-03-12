import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';

export default function Signup() {
  const [first, setFirst] = useState({
    name: '',
    email: '',
    password: '',
    Geolocation: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/new/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: first.name,
        email: first.email,
        password: first.password,
        location: first.Geolocation, // Changed to Geolocation
      }),
    });

    const resp = await response.json();
    console.log(resp);

    if (!resp.success) {
      // Changed to resp.success
      alert('Error: Please check your input');
      console.log(resp.errors)
    } else {
      alert('User created successfully!');
    }
  };

  const handleChange = (event) => {
    setFirst({ ...first, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={first.name}
              onChange={handleChange}
            />
          </div>
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
          <div className="mb-3">
            <label htmlFor="Address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="Geolocation"
              value={first.Geolocation}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="btn btn-danger btn-primary">
            Already a user
          </Link>
        </form>
      </div>
    </>
  );
}
