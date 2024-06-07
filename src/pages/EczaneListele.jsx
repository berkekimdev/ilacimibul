import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EczaneListele.css'; // CSS dosyasını dahil et

const EczaneListele = () => {
  // State tanımlamaları
  const [cities, setCities] = useState([]); // Şehirler için state
  const [districts, setDistricts] = useState([]); // İlçeler için state
  const [selectedCity, setSelectedCity] = useState(''); // Seçilen şehir için state
  const [selectedDistrict, setSelectedDistrict] = useState(''); // Seçilen ilçe için state
  const [users, setUsers] = useState([]); // Eczaneler için state

  // Component mount edildiğinde şehirleri çek
  useEffect(() => {
    const fetchCities = async () => {
      try {
        // API'dan şehirleri çeker
        const response = await axios.get('http://localhost:8080/api/users/cities');
        // Gelen şehir verilerini state'e kaydeder
        setCities(response.data);
      } catch (error) {
        // Hata durumunda mesajı konsola yazar
        console.error('Şehirler alınırken hata oluştu:', error);
      }
    };

    // Şehirleri çekme fonksiyonunu çağır
    fetchCities();
  }, []);

  // Seçilen şehir değiştiğinde ilçeleri çek
  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedCity) {
        try {
          // API'dan ilçeleri çeker
          const response = await axios.get('http://localhost:8080/api/users/districts', {
            params: { city: selectedCity } // Seçilen şehre göre ilçeleri çeker
          });
          // Gelen ilçe verilerini state'e kaydeder
          setDistricts(response.data);
        } catch (error) {
          // Hata durumunda mesajı konsola yazar
          console.error('İlçeler alınırken hata oluştu:', error);
        }
      }
    };

    // İlçeleri çekme fonksiyonunu çağır
    fetchDistricts();
  }, [selectedCity]); // Seçilen şehir değiştiğinde bu effect çalışır

  // Arama butonuna tıklandığında eczaneleri getir
  const handleSearch = async () => {
    try {
      // API'dan eczaneleri çeker
      const response = await axios.get('http://localhost:8080/api/users/search', {
        params: { city: selectedCity, district: selectedDistrict } // Seçilen şehir ve ilçe parametreleriyle eczaneleri arar
      });
      // Gelen eczane verilerinden admin rolünde olmayanları filtreler
      const filteredUsers = response.data.filter(user => user.role !== 'ADMIN');
      // Filtrelenen eczane verilerini state'e kaydeder
      setUsers(filteredUsers);
    } catch (error) {
      // Hata durumunda mesajı konsola yazar
      console.error('Eczaneler aranırken hata oluştu:', error);
    }
  };

  return (
    <div className="eczane-listele-container">
      <h2>Eczaneleri Listele</h2>
      <div className="eczane-listele-form">
        <div className="input-group">
          <label>Şehir Seçin:</label>
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="">Şehir seçin</option>
            {/* Şehir listesini dropdown menüde gösterir */}
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        {selectedCity && (
          <div className="input-group">
            <label>İlçe Seçin:</label>
            <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
              <option value="">İlçe seçin</option>
              {/* İlçe listesini dropdown menüde gösterir */}
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* Arama butonu */}
        <button onClick={handleSearch}>Ara</button>
      </div>
      <div className="eczane-listele-sonuc">
        {/* Eğer kullanıcılar (eczaneler) varsa tabloyu gösterir */}
        {users.length > 0 ? (
          <table className="eczane-listele-tablosu">
            <thead>
              <tr>
                <th>Eczane Adı</th>
                <th>Şehir</th>
                <th>İlçe</th>
                <th>Adres</th>
                <th>Telefon</th>
                <th>Email</th>
                <th>Konum</th>
              </tr>
            </thead>
            <tbody>
              {/* Eczaneleri tablo satırlarında gösterir */}
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.eczaneAdi}</td>
                  <td>{user.city}</td>
                  <td>{user.district}</td>
                  <td>{user.address}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.email}</td>
                  <td>
                    {/* Eczanenin konumunu Google Maps'te gösterir */}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${user.latitude},${user.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="konum-goster-link"
                    >
                      Konumu Göster
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          // Eğer eczane bulunamazsa mesaj gösterir
          <p>Aradığınız kriterlere uygun eczane bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default EczaneListele;
