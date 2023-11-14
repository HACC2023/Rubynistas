import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../server_auth/AuthService';
import './Vsignup.css';

const Vsignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // New state for showing/hiding password
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      alert('Please enter both email and password.');
      return;
    }

    const success = await AuthService.registerVendor(name, email, password);

    if (success) {
      alert('Account has been successfully created. Please login.');
      navigate('/vlogin');
    } else {
      alert('Email is already in use. Please use a different email.');
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <h1> VENDORS </h1>
        <br />
        <br />
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
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="signup-input"
              />
              <i
                className={`password-toggle-icon ${showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}`}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </label>
          <br />
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <div className="signup-link">
          <p>
            Already have an account?{' '}
            <a href="/vlogin" className="signup-link-text">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Vsignup;


