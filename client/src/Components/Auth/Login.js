import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './server_auth/AuthService';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const success = await AuthService.login(email, password);

    if (success) {
      navigate('/dashboard');
    } else {
      // Handle login failure, show an error message, etc.
    }
  };

  return (
    <div className="login-wrapper">
    <div className="login-container">
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
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <div className="signup-link">
        <p>
          Don't have an account? <a href="/signup" className="signup-link-text">Sign Up</a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;


