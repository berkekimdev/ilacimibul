import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NearestPharmacies.css';

const NearestPharmacies = () => {
  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Kullanıcının konumunu al
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Konum bilgileri alınamadı:', error);
          setError('Konum bilgileri alınamadı. Lütfen tarayıcı ayarlarınızı kontrol edin.');
          setLoading(false);
        }
      );
    } else {
      console.error('Tarayıcınız konum bilgilerini desteklemiyor.');
      setError('Tarayıcınız konum bilgilerini desteklemiyor.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userLocation.latitude && userLocation.longitude) {
      // Eczane verilerini al
      axios.get('http://localhost:8080/api/users')
        .then((response) => {
          const memberPharmacies = response.data.filter(user => user.role === 'MEMBER');
          const pharmaciesWithDistance = memberPharmacies.map(pharmacy => {
            const distance = calculateDistance(userLocation.latitude, userLocation.longitude, pharmacy.latitude, pharmacy.longitude);
            return { ...pharmacy, distance };
          });
          pharmaciesWithDistance.sort((a, b) => a.distance - b.distance);
          setPharmacies(pharmaciesWithDistance);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Eczane verileri alınamadı:', error);
          setError('Eczane verileri alınamadı. Lütfen daha sonra tekrar deneyin.');
          setLoading(false);
        });
    }
  }, [userLocation]);

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

export default NearestPharmacies;
