import React from 'react';
import { Link } from 'react-router-dom'; 
import './Navbar.css'; // Stiller için CSS dosyası
import { BsCapsule } from "react-icons/bs";

const Navbar = () => {
  return (
    <nav className="navbar">
      <BsCapsule  />
      <Link to="/">Anasayfa</Link>
      <Link to="/Ilaclar">İlaçlar</Link>
      <Link to="/IlacGrubu">IlacGrubu</Link>
      <Link to="/EnYakinEczaneler">En Yakın Eczaneler</Link>
      <Link to="/drugsearch">Drug Search(Yabancı Dilde API)</Link>
      <Link to="/Eczaneler">Eczaneler</Link>
      <Link to="/nobetcieczaneler">Nobetci Eczaneler</Link>
      <Link to="/register">Kayıt </Link>
      <Link to="/login">Giriş Yap</Link>
    </nav>
    
  );
};

export default Navbar;
