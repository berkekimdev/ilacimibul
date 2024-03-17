import React from 'react';
import { Link } from 'react-router-dom'; 
import './Navbar.css'; // Stiller için CSS dosyası

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Anasayfa</Link>
      <a href="#medicines">İlaçlar</a>
      <a href="#medicine-groups">İlaç Grupları</a>
      <a href="#active-ingredients">İlaç Etken Maddeleri</a>
      <Link to="/drugsearch">Drug Search(Yabancı Dilde API)</Link>
      <a href="#pharmacies">Eczaneler</a>
      <Link to="/nobetcieczaneler">Nobetci Eczaneler</Link>
      <Link to="/register">Kayıt </Link>
      <Link to="/login">Giriş Yap</Link>
    </nav>
  );
};

export default Navbar;
