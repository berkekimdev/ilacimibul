import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EczaneListele.css';

const EczaneListele = () => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/cities');
        setCities(response.data);
      } catch (error) {
        console.error('Şehirler alınırken hata oluştu:', error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedCity) {
        try {
          const response = await axios.get('http://localhost:8080/api/users/districts', {
            params: { city: selectedCity }
          });
          setDistricts(response.data);
        } catch (error) {
          console.error('İlçeler alınırken hata oluştu:', error);
        }
      }
    };

    fetchDistricts();
  }, [selectedCity]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users/search', {
        params: { city: selectedCity, district: selectedDistrict }
      });
      setUsers(response.data);
    } catch (error) {
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
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        )}
        <button onClick={handleSearch}>Ara</button>
      </div>
      <div className="eczane-listele-sonuc">
        {users.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Eczane Adı</th>
                <th>Şehir</th>
                <th>İlçe</th>
                <th>Adres</th>
                <th>Telefon</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.eczaneAdi}</td>
                  <td>{user.city}</td>
                  <td>{user.district}</td>
                  <td>{user.address}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aradığınız kriterlere uygun eczane bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default EczaneListele;
