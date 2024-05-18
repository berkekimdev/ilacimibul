import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Navbar.css'; // Stiller için CSS dosyası
import { BsCapsule, BsThreeDotsVertical } from "react-icons/bs";

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('token');  // Kullanıcı giriş yapmış mı kontrolü
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Token'ı silerek çıkış yap
    window.location.href = '/'; // Ana sayfaya yönlendir
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
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
            <div className="profile-icon-container">
              <BsThreeDotsVertical onClick={toggleProfileMenu} className="profile-icon" />
              {isProfileMenuOpen && (
                <div className="profile-dropdown">
                  <Link to="/ilacekle" onClick={() => setIsProfileMenuOpen(false)}>İlaç Ekle</Link>
                  <Link to="/ilacstokdegistir" onClick={() => setIsProfileMenuOpen(false)}>İlaç Stok Değiştir</Link>
                  <Link to="/profil-bilgileri-degistir" onClick={() => setIsProfileMenuOpen(false)}>Profil Bilgilerini Değiştir</Link>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/register">Kayıt Ol</Link>
            <Link to="/login">Giriş Yap</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
