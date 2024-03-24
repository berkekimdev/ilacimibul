import React from 'react';
import './Header.css'; // Header stil dosyası
import logo from '../images/Logo.png';
import headerImage from '../images/headerpng.png';

const Header = () => {
  return (
    <div className="header">
       <img src={logo} alt="Logo" className="logo" />
       <img src={headerImage} alt="Header" className="header-image" />
       <div className="search-container">
        <input type="text" placeholder="İlaç ismi veya İlaç Grubu Aratın" className="search-input" />
        <button type="submit" className="search-button">Ara</button>
      </div>
    </div>
  );
};

export default Header;
