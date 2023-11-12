import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../server_auth/AuthService';
import './Vsignup.css';

const Vsignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [error] = useState(null); // Add state for error
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();


    if (email.trim() === '' || password.trim() === '') {
      // If either email or password is empty, set an error state
      alert('Please enter both email and password.');
      return;
    }

    const success = await AuthService.register(name, email, password);

    if (success) {
      navigate('/vlogin');
    } else {
      alert('Email is already in use. Please use a different email.');
    }
  };

  return (
    <div className="signup-wrapper">
    <div className="signup-container">
    <h1> VENDERS </h1>
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
          Already have an account? <a href="/vlogin" className="signup-link-text">Login</a>
        </p>
      </div>
    </div>
    </div>
  );
};


export default Vsignup;

