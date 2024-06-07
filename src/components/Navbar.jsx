// React ve diğer gerekli kütüphaneler import ediliyor
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Navbar bileşeni için stil dosyası
import { BsCapsule, BsThreeDotsVertical } from "react-icons/bs"; // React ikonu
import { useAuth } from '../context/AuthContext'; // AuthContext'ten kimlik doğrulama durumu

// Navbar bileşeni tanımlanıyor
const Navbar = () => {
  // AuthContext'ten gerekli değerler alınıyor
  const { isLoggedIn, user, logout } = useAuth();
  // Profil menüsünün açık/kapalı durumu için state tanımlanıyor
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Kullanıcı çıkış işlemi
  const handleLogout = () => {
    logout(); // AuthContext'ten logout fonksiyonu çağrılıyor
    window.location.href = '/'; // Çıkış yaptıktan sonra anasayfaya yönlendiriliyor
  };

  // Profil menüsünün açık/kapalı durumu değiştiren fonksiyon
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Logo veya ikon */}
        <BsCapsule />
        {/* Menüdeki sayfalar için Link bileşenleri */}
        <Link to="/">Anasayfa</Link>
        <Link to="/Ilaclar">İlaçlar</Link>
        <Link to="/IlacGrubu">Ilac Grubu</Link>
        <Link to="/EnYakinEczaneler">En Yakın Eczaneler</Link>
        <Link to="/drugsearch">Drug Search(Yabancı Dilde API)</Link>
        <Link to="/Eczaneler">Eczaneler</Link>
        <Link to="/nobetcieczaneler">Nobetci Eczaneler</Link>
        {isLoggedIn ? (
          <>
            {/* Kullanıcı giriş yaptıysa görünür Link bileşenleri */}
            <Link to="/profile">Profil</Link>
            <button onClick={handleLogout} style={{ border: 'none', background: 'none', color: 'inherit', cursor: 'pointer' }}>Çıkış Yap</button>
            <div className="profile-icon-container">
              <BsThreeDotsVertical onClick={toggleProfileMenu} className="profile-icon" />
              {/* Profil menüsü */}
              {isProfileMenuOpen && (
                <div className="profile-dropdown">
                  <Link to="/ilacekle" onClick={() => setIsProfileMenuOpen(false)}>İlaç Ekle</Link>
                  <Link to="/ilacstokdegistir" onClick={() => setIsProfileMenuOpen(false)}>İlaç Stok Değiştir</Link>
                  <Link to="/profilguncelle" onClick={() => setIsProfileMenuOpen(false)}>Profil Bilgilerini Değiştir</Link>
                  {user && user.authorities && user.authorities.includes('ROLE_ADMIN') && (
                    <>
                      {/* Yalnızca admin kullanıcılar için ek menü öğeleri */}
                      <Link to="/kullaniciaktifet" onClick={() => setIsProfileMenuOpen(false)}>Kullanıcı Aktif Et</Link>
                      <Link to="/ilacsil" onClick={() => setIsProfileMenuOpen(false)}>İlaç Sil</Link>
                      <Link to="/updatedrug" onClick={() => setIsProfileMenuOpen(false)}>İlaç Güncelle</Link> {/* Yeni eklenen link */}
                    </>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Kullanıcı giriş yapmadıysa görünür Link bileşenleri */}
            <Link to="/register">Kayıt Ol</Link>
            <Link to="/login">Giriş Yap</Link>
          </>
        )}
      </div>
    </nav>
  );
};

// Navbar bileşeni dışa aktarılıyor
export default Navbar;
