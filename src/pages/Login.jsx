import React, { useState } from 'react';
import './Login.css'; // CSS dosyasını import edin

const Login = () => {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');

 const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
 };

 return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <div className="register-link">
        <p>Don't have an account? <a href="/register">Register</a></p>
      </div>
    </div>
 );
};

export default Login;
