import React, { useState } from 'react';
import axios from 'axios';

function DutyPharmacies() {
  const [city, setCity] = useState('');
  const [pharmacies, setPharmacies] = useState([]);

  const fetchPharmacies = async () => {
    try {
      const response = await axios.get("https://api.collectapi.com/health/dutyPharmacy", {
        params: { il: city },
        headers: {
          "content-type": "application/json",
          "authorization": "apikey 312xmDBvESipXE1P1XBG8C:1v97DUcrrCr0skwDaisuug"
        }
      });
      setPharmacies(response.data.result); // API'nin döndürdüğü yapıya göre ayarlayın
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Şehir ismi girin"
      />
      <button onClick={fetchPharmacies}>Nöbetçi Eczaneleri Bul</button>
      <div>
        {pharmacies.length > 0 ? (
          <ul>
            {pharmacies.map((pharmacy, index) => (
              <li key={index}>{pharmacy.name} - {pharmacy.address}</li> // Alınan veriye göre düzenleyin
            ))}
          </ul>
        ) : (
          <p>Nöbetçi eczane bulunamadı.</p>
        )}
      </div>
    </div>
  );
}

export default DutyPharmacies;