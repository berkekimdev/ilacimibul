// src/pages/Login.jsx
import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/crackit/v1/auth/authenticate', {
        email,
        password,
      });
      console.log('Login success:', response.data);
      login(response.data.access_token); // Token'ı login fonksiyonuna gönder
      window.location.href = '/';
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
      <h2>Email:</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label></label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Giriş</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <div className="register-link">
        <p>Hesabın Yok mu? <a href="/register">Kayıt Ol</a></p>
      </div>
    </div>
  );
};

export default Login;
