import React from 'react';
import './Header.css'; // Header stil dosyası
import headerImage from '../images/headerpng.png';
import logo from '../images/Logo1.png';


import { FaSearchPlus } from "react-icons/fa";

const Header = () => {
  return (
    <div className="header">
       <img src={logo} alt="Logo" className="logo" />
       <img src={headerImage} alt="Header" className="header-image" />
       <div className="search-container">
        <input type="text" placeholder="İlaç ismi veya İlaç Grubu Aratın " className="search-input" />
        <button type="submit" className="search-button">Ara <FaSearchPlus /></button> 
      </div>
    </div>
  );
};

export default Header;
