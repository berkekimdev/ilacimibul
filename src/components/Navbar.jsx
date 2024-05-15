import React from 'react';
import { Link } from 'react-router-dom'; 
import './Navbar.css'; // Stiller için CSS dosyası
import { BsCapsule } from "react-icons/bs";

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('token');  // Kullanıcı giriş yapmış mı kontrolü

  const handleLogout = () => {
    localStorage.removeItem('token'); // Token'ı silerek çıkış yap
    window.location.href = '/'; // Ana sayfaya yönlendir
  };

  return (
    <nav className="navbar">
      <BsCapsule />
      <Link to="/">Anasayfa</Link>
      <Link to="/Ilaclar">İlaçlar</Link>
      <Link to="/IlacGrubu">IlacGrubu</Link>
      <Link to="/EnYakinEczaneler">En Yakın Eczaneler</Link>
      <Link to="/drugsearch">Drug Search(Yabancı Dilde API)</Link>
      <Link to="/Eczaneler">Eczaneler</Link>
      <Link to="/nobetcieczaneler">Nobetci Eczaneler</Link>
      {isLoggedIn ? (
        <>
          <Link to="/profile">Profil</Link>
          <button onClick={handleLogout} style={{ border: 'none', background: 'none', color: 'inherit', cursor: 'pointer' }}>Çıkış Yap</button>
        </>
      ) : (
        <>
          <Link to="/register">Kayıt Ol</Link>
          <Link to="/login">Giriş Yap</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
