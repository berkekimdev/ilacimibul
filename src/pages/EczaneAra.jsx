import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EczaneAra() {
  const [pharmacies, setPharmacies] = useState([]); // Eczaneler için state tanımlanıyor
  const [error, setError] = useState(''); // Hata mesajları için state tanımlanıyor

  // Component mount edildiğinde konum bilgisi alınıyor
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      fetchPharmacies(position.coords.latitude, position.coords.longitude); // Konum bilgisine göre eczaneleri getir
    }, () => {
      setError('Konum bilgisine erişilemedi.'); // Konum bilgisi alınamazsa hata mesajı göster
    });
  }, []);

  // Eczaneleri getiren fonksiyon
  const fetchPharmacies = (latitude, longitude) => {
    axios.get(`https://www.nosyapi.com/apiv2/service/pharmacies/locations`, {
      params: {
        latitude: latitude, // API'ye gönderilecek enlem bilgisi
        longitude: longitude, // API'ye gönderilecek boylam bilgisi
      },
      headers: {
        'Authorization': 'Bearer BSGSmWLxuU9mxwckV5tY48VWYxjQ2ev9syVqCp3GDM4al6NEKEB9gMBOHDVk' // API anahtarı
      }
    })
    .then(response => {
      if(response.data.status === "success" && response.data.data) {
        setPharmacies(response.data.data); // Gelen eczane verilerini state'e kaydet
      } else {
        throw new Error('Beklenen veri alınamadı.'); // Beklenen veri gelmezse hata fırlat
      }
    })
    .catch(error => {
      console.error('Error:', error); // Hata konsola yazdırılıyor
      setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz. Hata detayı: ' + error.message); // Hata mesajı state'e kaydediliyor
    });
  };

  return (
    <div>
      {error && <p>{error}</p>} {/* Hata varsa göster */}
      <h2>En Yakın Eczaneler</h2>
      <ul>
        {pharmacies.map((pharmacy, index) => ( // Eczaneleri listele
          <li key={index}>{pharmacy.pharmacyName} - {pharmacy.address}</li>
        ))}
      </ul>
    </div>
  );
}

export default EczaneAra;