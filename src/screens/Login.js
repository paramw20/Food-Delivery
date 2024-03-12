import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// const navigate = useNavigate();
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
        // Changed to Geolocation
      }),
    });

    const resp = await response.json();
    console.log(resp);

    if (!resp.success) {
      // Changed to resp.success
      alert('Error: Please check your input');
      console.log(resp.errors);
    } else {
      localStorage.setItem("authToken",JSON.authToken)
      navigate("/");
      // alert('User created successfully!');
    }
  };

  const handleChange = (event) => {
    setFirst({ ...first, [event.target.name]: event.target.value });
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
