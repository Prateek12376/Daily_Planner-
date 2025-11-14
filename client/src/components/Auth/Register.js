import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { useTheme } from '../../context/ThemeContext';
import './Auth.css';

const Register = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { darkMode } = useTheme();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword)
      return setError('Passwords do not match');

    if (formData.password.length < 6)
      return setError('Password must be at least 6 characters');

    setLoading(true);

    try {
      const { confirmPassword, ...data } = formData;
      const response = await api.post('/auth/register', data);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`auth-container ${darkMode ? 'dark' : ''}`}>
      <div className="glass-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Sign up to get started</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="input-modern"
              name="username"
              onChange={handleChange}
              value={formData.username}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="input-modern"
              name="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="input-modern"
              name="password"
              onChange={handleChange}
              value={formData.password}
              placeholder="Create password"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="input-modern"
              name="confirmPassword"
              onChange={handleChange}
              value={formData.confirmPassword}
              placeholder="Confirm password"
              required
            />
          </div>

          <button className="btn-modern" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
