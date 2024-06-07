// React ve diğer gerekli kütüphaneler import ediliyor
import React, { useState } from 'react';
import './Header.css'; // Header bileşeni için stil dosyası
import headerImage from '../images/Logo3.svg'; // Header için kullanılan resim
import logo from '../images/Vitamins.svg'; // Logo resmi
import { FaSearchPlus } from "react-icons/fa"; // FontAwesome ikonu
import axios from 'axios'; // HTTP istekleri için axios
import { useNavigate } from 'react-router-dom'; // Yönlendirme için useNavigate hook'u

// Header bileşeni tanımlanıyor
const Header = () => {
  // Arama türü ve sorgu için state tanımları
  const [searchType, setSearchType] = useState('ilac'); // Varsayılan arama türü 'ilac'
  const [query, setQuery] = useState(''); // Arama sorgusu için boş string
  const navigate = useNavigate(); // useNavigate hook'u ile yönlendirme fonksiyonu

  // Arama işlemi için fonksiyon
  const handleSearch = async () => {
    try {
      // API isteği gönderiliyor
      const response = await axios.get(`http://localhost:8080/api/drugs/search`, {
        params: {
          type: searchType, // Arama türü
          query: query, // Arama sorgusu
        },
      });
      // Arama sonucu varsa, sonuçları ve arama bilgilerini yönlendirme ile geçir
      if (response.data.length > 0) {
        navigate('/search', { state: { query: query, type: searchType, results: response.data } });
      } else {
        alert('Sonuç bulunamadı.'); // Sonuç yoksa uyarı göster
      }
    } catch (error) {
      console.error('Arama sırasında hata oluştu:', error); // Hata varsa konsola yazdır
      alert('Arama sırasında bir hata oluştu. Lütfen tekrar deneyin.'); // Kullanıcıya hata mesajı göster
    }
  };

  return (
    <div className="header">
      <img src={headerImage} alt="Header" className="header-image" /> {/* Header resmi */}
      <div className="search-container">
        {/* Arama türünü seçmek için dropdown */}
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)} className="search-select">
          <option value="ilac">İlaç</option>
          <option value="ilacGrubu">İlaç Grubu</option>
          <option value="etkenMadde">Etken Madde</option>
        </select>
        {/* Arama kutusu */}
        <input
          type="text"
          placeholder="İlaç ismi, grubu veya etken madde aratın"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {/* Arama butonu */}
        <button type="submit" className="search-button" onClick={handleSearch}>
          Ara <FaSearchPlus /> {/* FontAwesome ikonu */}
        </button>
      </div>
    </div>
  );
};

// Header bileşeni dışa aktarılıyor
export default Header;
