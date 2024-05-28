import React, { useState } from 'react';
import './Header.css'; // Header stil dosyası
import headerImage from '../images/headerpng.png';
import logo from '../images/Logo1.png';

import { FaSearchPlus } from "react-icons/fa";
import axios from 'axios';

const Header = () => {
  const [searchType, setSearchType] = useState('ilac');
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/drugs/search`, {
        params: {
          type: searchType,
          query: query,
        },
      });
      // Burada yönlendirme ve sonuçların işlenmesi yapılacak
      console.log(response.data);
    } catch (error) {
      console.error('Arama sırasında hata oluştu:', error);
    }
  };

  return (
    <div className="header">
      <img src={logo} alt="Logo" className="logo" />
      <img src={headerImage} alt="Header" className="header-image" />
      <div className="search-container">
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)} className="search-select">
          <option value="ilac">İlaç</option>
          <option value="ilacGrubu">İlaç Grubu</option>
        </select>
        <input
          type="text"
          placeholder="İlaç ismi veya İlaç Grubu Aratın"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-button" onClick={handleSearch}>
          Ara <FaSearchPlus />
        </button>
      </div>
    </div>
  );
};

export default Header;
