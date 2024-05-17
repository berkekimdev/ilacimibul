// src/pages/IlacGrubunaGoreListele.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './IlacGrubunaGoreListele.css';

const IlacListesi = ({ ilaclar }) => {
  const navigate = useNavigate();

  const eczanedeBul = (ilacId) => {
    navigate(`/drugeczanelistesi/${ilacId}`);
  };

  return (
    <div className="ilac-listesi">
      <table>
        <thead>
          <tr>
            <th>İlaç Adı</th>
            <th>İlaç Grubu</th>
            <th>İlaç Etken Maddesi</th>
            <th>İlaç Stoğu</th>
            <th>Eczanede Bul</th>
          </tr>
        </thead>
        <tbody>
          {ilaclar.map((ilac, index) => (
            <tr key={index}>
              <td>{ilac.ilacAdi}</td>
              <td>{ilac.ilacGrubu}</td>
              <td>{ilac.ilacEtkenMaddesi}</td>
              <td>{ilac.totalStock}</td>
              <td>
                <button onClick={() => eczanedeBul(ilac.id)}>Eczanede Bul</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const IlacGrubunaGoreListele = () => {
  const [ilaclar, setIlaclar] = useState([]);
  const { ilacGrubu } = useParams();

  useEffect(() => {
    const fetchIlaclar = async () => {
      try {
        // İlaçları ilaç grubuna göre çek
        const response = await axios.get(`http://localhost:8080/api/drugs/byGroup?group=${ilacGrubu}`);
        const fetchedIlaclar = response.data;

        // Tüm ilaç stoklarını çek
        const stocksResponse = await axios.get(`http://localhost:8080/api/drugstocks`);
        const allStocks = stocksResponse.data;

        // İlaçların toplam stoklarını hesapla
        const ilaclarWithStock = fetchedIlaclar.map(ilac => {
          const totalStock = allStocks
            .filter(stock => stock.drugId === ilac.id)
            .reduce((sum, stock) => sum + stock.quantity, 0);
          return { ...ilac, totalStock };
        });

        setIlaclar(ilaclarWithStock);
      } catch (error) {
        console.error('İlaçları çekerken hata oluştu:', error);
      }
    };

    fetchIlaclar();
  }, [ilacGrubu]);

  return (
    <div>
      <h1>{ilacGrubu} Grubundaki İlaçlar</h1>
      <IlacListesi ilaclar={ilaclar} />
    </div>
  );
};

export default IlacGrubunaGoreListele;
