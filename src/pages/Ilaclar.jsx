// src/pages/Ilaclar.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './IlacListesi.css';

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

const App = () => {
  const [ilaclar, setIlaclar] = useState([]);
  const { harf } = useParams(); // harf parametresini kullan

  useEffect(() => {
    const fetchIlaclar = async () => {
      try {
        const url = harf
          ? `http://localhost:8080/api/drugs/byFirstLetter?letter=${harf}`
          : 'http://localhost:8080/api/drugs';
        const response = await axios.get(url);
        setIlaclar(response.data);
      } catch (error) {
        console.error('İlaçları çekerken hata oluştu:', error);
      }
    };

    fetchIlaclar();
  }, [harf]);

  return (
    <div>
      <h1>{harf ? `${harf} Harfi ile Başlayan İlaçlar` : 'İlaç Listesi'}</h1>
      <IlacListesi ilaclar={ilaclar} />
    </div>
  );
};

export default App;
