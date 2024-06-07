// Gerekli modüller ve bileşenler import ediliyor
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NearestPharmacies.css'; // Stil dosyası import ediliyor

// NearestPharmacies bileşeni tanımlanıyor
const NearestPharmacies = () => {
  // State tanımlamaları
  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null }); // Kullanıcı konumu
  const [pharmacies, setPharmacies] = useState([]); // Eczane listesi
  const [loading, setLoading] = useState(true); // Yükleme durumu
  const [error, setError] = useState(null); // Hata mesajı

  // Kullanıcının konumunu almak için useEffect hook'u kullanılıyor
  useEffect(() => {
    // Tarayıcı geolocation API'si kullanılarak konum bilgisi alınıyor
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Konum bilgileri state'e kaydediliyor
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          // Hata durumunda hata mesajı ve loading durumu güncelleniyor
          console.error('Konum bilgileri alınamadı:', error);
          setError('Konum bilgileri alınamadı. Lütfen tarayıcı ayarlarınızı kontrol edin.');
          setLoading(false);
        }
      );
    } else {
      // Tarayıcı geolocation API'sini desteklemiyorsa hata mesajı gösteriliyor
      console.error('Tarayıcınız konum bilgilerini desteklemiyor.');
      setError('Tarayıcınız konum bilgilerini desteklemiyor.');
      setLoading(false);
    }
  }, []);

  // Kullanıcı konumu değiştiğinde en yakın eczaneleri almak için useEffect hook'u kullanılıyor
  useEffect(() => {
    if (userLocation.latitude && userLocation.longitude) {
      // Eczane verilerini almak için axios ile API isteği yapılıyor
      axios.get('http://localhost:8080/api/users')
        .then((response) => {
          // Eczaneler filtreleniyor ve mesafe hesaplanıyor
          const memberPharmacies = response.data.filter(user => user.role === 'MEMBER' && user.active === true);
          const pharmaciesWithDistance = memberPharmacies.map(pharmacy => {
            const distance = calculateDistance(userLocation.latitude, userLocation.longitude, pharmacy.latitude, pharmacy.longitude);
            return { ...pharmacy, distance };
          });
          // Eczaneler mesafeye göre sıralanıyor
          pharmaciesWithDistance.sort((a, b) => a.distance - b.distance);
          setPharmacies(pharmaciesWithDistance);
          setLoading(false);
        })
        .catch((error) => {
          // Hata durumunda hata mesajı ve loading durumu güncelleniyor
          console.error('Eczane verileri alınamadı:', error);
          setError('Eczane verileri alınamadı. Lütfen daha sonra tekrar deneyin.');
          setLoading(false);
        });
    }
  }, [userLocation]);

  // İki konum arasındaki mesafeyi hesaplamak için kullanılan fonksiyon
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Dünya'nın yarıçapı (km)
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(2); // km cinsinden mesafe
  };

  // Bileşenin render ettiği JSX kodu
  return (
    <div className="nearest-pharmacies-container">
      <h2>En Yakın Eczaneler</h2>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="pharmacy-list">
          {pharmacies.map((pharmacy, index) => (
            <li key={index} className="pharmacy-item">
              <h3>{pharmacy.eczaneAdi}</h3>
              <p>{pharmacy.address}</p>
              <p>{pharmacy.district}, {pharmacy.city}</p>
              <p>Telefon: {pharmacy.phoneNumber}</p>
              <p>Mesafe: {pharmacy.distance} km</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${pharmacy.latitude},${pharmacy.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Konumu Göster
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Bileşen export ediliyor
export default NearestPharmacies;
