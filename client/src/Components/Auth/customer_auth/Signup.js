import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../server_auth/AuthService';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [error, setError] = useState(null); // Add state for error
  const navigate = useNavigate();



    const handleSignUp = async (e) => {
      e.preventDefault();
  
      if (email.trim() === '' || password.trim() === '') {
        alert('Please enter both email and password.');
        return;
      }
  
      const success = await AuthService.registerUser(name, email, password);
  
      if (success) {
        alert('Account has been successfully created. Please login.');
        // Redirect to the main page and pass the user's name
        navigate('/login', { state: { username: name } });
      } else {
        alert('Email is already in use. Please use a different email.');
      }
    };

  return (
    <div className="signup-wrapper">
    <div className="signup-container">
    <h1> CUSTOMERS </h1>
    <br/>
    <br/>
    <br/>
      <h2 className="signup-heading">Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <label className="signup-label">
          Name:
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="signup-input"
          />
        </label>
        <br />
        <label className="signup-label">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
          />
        </label>
        <br />
        <label className="signup-label">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
          />
        </label>
        <br />
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
      <div className="signup-link">
        <p>
          Already have an account? <a href="/login" className="signup-link-text">Login</a>
        </p>
        <br/>
        <p>
          Are you a vendor? <a href="/vlogin" className="signup-link-text">Login</a>
        </p>
      </div>
    </div>
    </div>
  );
};


export default Signup;

