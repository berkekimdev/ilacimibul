import React, { useState } from 'react';
import './Login.css'; // CSS dosyasını import edin
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/crackit/v1/auth/authenticate', {
                email,
                password
            });
            console.log('Login success:', response.data);
            localStorage.setItem('token', response.data.token); // Token'ı localStorage'a kaydet
            window.location.href = '/'; // Anasayfaya yönlendir
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            console.error('Login error:', err);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
            <div className="register-link">
                <p>Don't have an account? <a href="/register">Register</a></p>
            </div>
        </div>
    );
};

export default Login;
