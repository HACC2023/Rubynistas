import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../server_auth/AuthService';
import './Vlogin.css';

const Vlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // New state for loading
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      // If either email or password is empty, set an error state
      alert('Please enter both email and password.');
      return;
    }

    // Set loading state to true when starting login
    setLoading(true);

    const success = await AuthService.vlogin(email, password);

    // Reset loading state when login process is complete
    setLoading(false);

    if (success) {
      navigate('/search');
    } else {
      // Handle login failure, show an error message, etc.
      alert('Invalid email or password. Please try again. \n CUSTOMERS: please login through customer portal.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1> VENDORS </h1>
        <br />
        <br />
        <br />
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleLogin}>
          <label className="login-label">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
          </label>
          <br />
          <label className="login-label">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </label>
          <br />
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Please wait...' : 'Login'}
          </button>
        </form>
        <div className="signup-link">
          <p>
            Don't have an account?{' '}
            <a href="/vsignup" className="signup-link-text">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Vlogin;



