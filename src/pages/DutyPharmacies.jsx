import React, { useState } from 'react';
import axios from 'axios';
import './DutyPharmacies.css';
import { FaSearchLocation } from "react-icons/fa";

function DutyPharmacies() {
  const [city, setCity] = useState(''); // Şehir adı için state tanımlanıyor
  const [pharmacies, setPharmacies] = useState([]); // Nöbetçi eczaneler için state tanımlanıyor

  // Nöbetçi eczaneleri API'den çekmek için fonksiyon
  const fetchPharmacies = async () => {
    try {
      const response = await axios.get("https://www.nosyapi.com/apiv2/service/pharmacies-on-duty", {
        params: { city }, // API'ye gönderilecek şehir parametresi
        headers: {
          "X-NSYP": "BSGSmWLxuU9mxwckV5tY48VWYxjQ2ev9syVqCp3GDM4al6NEKEB9gMBOHDVk" // API anahtarı
        }
      });
      setPharmacies(response.data.data); // API'nin döndürdüğü nöbetçi eczane verilerini state'e kaydet
    } catch (error) {
      console.error(error); // Hata durumunda hata mesajını konsola yazdır
    }
  };

  return (
    <div className="drug-details-container">
      <h1>Nöbetçi Eczaneler</h1>
      <div className="input-container">
        {/* Şehir ismi girişi için input */}
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)} // Şehir ismi değiştiğinde state güncellenir
          placeholder="Şehir ismi girin"
        />
        <button onClick={fetchPharmacies}><FaSearchLocation /> Ara</button> {/* Arama butonu */}
      </div>
      <div>
        {pharmacies.length > 0 ? ( // Eğer nöbetçi eczaneler varsa tabloyu göster
          <table className="table">
            <thead>
              <tr>
                <th>Eczane İsmi</th>
                <th>İlçe</th>
                <th>Adres</th>
              </tr>
            </thead>
            <tbody>
              {pharmacies.map((pharmacy, index) => (
                <tr key={index}>
                  <td>{pharmacy.pharmacyName}</td> {/* Eczane adı */}
                  <td>{pharmacy.district}</td> {/* İlçe */}
                  <td>{pharmacy.address}</td> {/* Adres */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nöbetçi eczane bulunamadı.</p> // Nöbetçi eczane bulunamazsa mesaj göster
        )}
      </div>
    </div>
  );
}

export default DutyPharmacies;
