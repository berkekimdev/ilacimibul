import React, { useState } from 'react';
import './Header.css';
import headerImage from '../images/Logo3.svg';
import logo from '../images/Vitamins.svg';
import { FaSearchPlus } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchType, setSearchType] = useState('ilac');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/drugs/search`, {
        params: {
          type: searchType,
          query: query,
        },
      });
      if (response.data.length > 0) {
        navigate('/search', { state: { query: query, type: searchType, results: response.data } });
      } else {
        alert('Sonuç bulunamadı.');
      }
    } catch (error) {
      console.error('Arama sırasında hata oluştu:', error);
      alert('Arama sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="header">
      <img src={headerImage} alt="Header" className="header-image" />
      <div className="search-container">
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)} className="search-select">
          <option value="ilac">İlaç</option>
          <option value="ilacGrubu">İlaç Grubu</option>
          <option value="etkenMadde">Etken Madde</option>
        </select>
        <input
          type="text"
          placeholder="İlaç ismi, grubu veya etken madde aratın"
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
