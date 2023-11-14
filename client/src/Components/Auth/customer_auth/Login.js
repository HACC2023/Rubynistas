import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../server_auth/AuthService';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // New state for loading
  const [showPassword, setShowPassword] = useState(false); // New state for showing/hiding password
  const navigate = useNavigate();
  const [error] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      // If either email or password is empty, set an error state
      alert('Please enter both email and password.');
      return;
    }

    // Set loading state to true when starting login
    setLoading(true);

    const success = await AuthService.login(email, password);


    // Reset loading state when login process is complete
    setLoading(false);

    if (success) {
      // Save the email to local storage
      localStorage.setItem('userEmail', email);

      navigate('/main');
    } else {
      // Handle login failure, show an error message, etc.
      alert('Invalid email or password. Please try again. \n VENDORS: please login through vendors portal.');
    }

    console.log('Error:', error);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1> CUSTOMERS </h1>
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
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
              <i
                className={`password-toggle-icon ${showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}`}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </label>
          <br />
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Please wait...' : 'Login'}
          </button>
        </form>
        <div className="signup-link">
          <p>
            Don't have an account? <a href="/signup" className="signup-link-text">Sign Up</a>
          </p>
          <br />
          <p>
            Are you a vendor? <a href="/vlogin" className="signup-link-text">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;