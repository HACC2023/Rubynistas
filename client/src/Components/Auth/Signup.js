// Signup.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './server_auth/AuthService';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const success = await AuthService.register(name, email, password);

    if (success) {
      navigate('/login');
    } else {
      // Handle registration failure, show an error message, etc.
    }
  };

  return (
    <div className="signup-wrapper">
    <div className="signup-container">
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
    </div>
    </div>
  );
};

export default Signup;
