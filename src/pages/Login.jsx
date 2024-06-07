// Gerekli modüller ve bileşenler import ediliyor
import React, { useState } from 'react';
import './Login.css'; // Stil dosyası import ediliyor
import axios from 'axios'; // HTTP istekleri için axios import ediliyor
import { useAuth } from '../context/AuthContext'; // AuthContext'ten gerekli fonksiyonlar alınıyor

// Login bileşeni tanımlanıyor
const Login = () => {
  const [email, setEmail] = useState(''); // Email girişi için state
  const [password, setPassword] = useState(''); // Şifre girişi için state
  const [error, setError] = useState(''); // Hata mesajı için state
  const { login } = useAuth(); // AuthContext'ten login fonksiyonu alınıyor

  // Form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = async (event) => {
    event.preventDefault(); // Formun default submit davranışı engelleniyor
    try {
      // API'ye login isteği gönderiliyor
      const response = await axios.post('http://localhost:8080/crackit/v1/auth/authenticate', {
        email,
        password,
      });
      console.log('Login success:', response.data);
      login(response.data.access_token); // Başarılı login durumunda token alınıyor ve login fonksiyonuna gönderiliyor
      window.location.href = '/'; // Başarılı giriş sonrası anasayfaya yönlendiriliyor
    } catch (err) {
      setError('Login failed. Please check your credentials.'); // Hata durumunda hata mesajı gösteriliyor
      console.error('Login error:', err);
    }
  };

  // Bileşenin render ettiği JSX kodu
  return (
    <div className="login-container">
      <h2>Email:</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label></label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required // Giriş alanı zorunlu
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required // Giriş alanı zorunlu
          />
        </div>
        <button type="submit">Giriş</button> {/* Giriş butonu */}
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Hata mesajı */}
      </form>
      <div className="register-link">
        <p>Henüz bir hesabın yok mu? <a href="/register">Kayıt Ol</a></p> {/* Kayıt linki */}
      </div>
    </div>
  );
};

// Bileşen export ediliyor
export default Login;
