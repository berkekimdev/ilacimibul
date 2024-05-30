import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DrugEczaneListesi.css';

const DrugEczaneListesi = () => {
  const { drugId } = useParams();
  const [eczaneStoklari, setEczaneStoklari] = useState([]);

  useEffect(() => {
    const fetchEczaneStoklari = async () => {
      try {
        // İlaç stoklarını çek
        const stocksResponse = await axios.get(`http://localhost:8080/api/drugstocks`);
        const filteredStocks = stocksResponse.data.filter(stock => stock.drugId === parseInt(drugId));

        // Her bir stok için eczane bilgilerini çek
        const enrichedStocks = await Promise.all(filteredStocks.map(async stock => {
          const userResponse = await axios.get(`http://localhost:8080/api/users/${stock.userId}`);
          return {
            ...stock,
            eczaneAdi: userResponse.data.eczaneAdi,
            eczaneAdresi: userResponse.data.address,
            eczaneTelefonu: userResponse.data.phoneNumber,
            eczaneLatitude: userResponse.data.latitude, // Enlem bilgisi
            eczaneLongitude: userResponse.data.longitude // Boylam bilgisi
          };
        }));

        setEczaneStoklari(enrichedStocks);
      } catch (error) {
        console.error('Eczanelerdeki ilaç stoklarını çekerken hata oluştu:', error);
        setEczaneStoklari([]);  // Hata durumunda listeyi boşalt
      }
    };

    fetchEczaneStoklari();
  }, [drugId]);

  return (
    <div className="eczane-stok-listesi-container">
      <h2>Eczanelerdeki İlaç Stokları</h2>
      <table className="eczane-stok-listesi-tablosu">
        <thead>
          <tr>
            <th>Eczane Adı</th>
            <th>Eczane Adresi</th>
            <th>Eczane Telefonu</th>
            <th>İlaç Stoğu</th>
            <th>Konum</th>
          </tr>
        </thead>
        <tbody>
          {eczaneStoklari.map((stok, index) => (
            <tr key={index}>
              <td>{stok.eczaneAdi}</td>
              <td>{stok.eczaneAdresi}</td>
              <td>{stok.eczaneTelefonu}</td>
              <td>{stok.quantity}</td>
              <td>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${stok.eczaneLatitude},${stok.eczaneLongitude}`}
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
    </div>
  );
};

export default DrugEczaneListesi;
