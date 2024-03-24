import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EczaneAra() {
  const [pharmacies, setPharmacies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      fetchPharmacies(position.coords.latitude, position.coords.longitude);
    }, () => {
      setError('Konum bilgisine erişilemedi.');
    });
  }, []);

  const fetchPharmacies = (latitude, longitude) => {
    axios.get(`https://www.nosyapi.com/apiv2/service/pharmacies/locations///`, {
      params: {
        latitude: latitude,
        longitude: longitude,
      },
      headers: {
        'Authorization': 'Bearer BSGSmWLxuU9mxwckV5tY48VWYxjQ2ev9syVqCp3GDM4al6NEKEB9gMBOHDVk////' // Gerçek API anahtarınızı buraya ekleyin
      }
    })
    .then(response => {
      if(response.data.status === "success" && response.data.data) {
        setPharmacies(response.data.data);
      } else {
        throw new Error('Beklenen veri alınamadı.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz. Hata detayı: ' + error.message);
    });
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <h2>En Yakın Eczaneler</h2>
      <ul>
        {pharmacies.map((pharmacy, index) => (
          <li key={index}>{pharmacy.pharmacyName} - {pharmacy.address}</li>
        ))}
      </ul>
    </div>
  );
}

export default EczaneAra;
