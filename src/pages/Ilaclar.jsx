import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './IlacListesi.css';


const IlacListesi = ({ ilaclar }) => {
  const [eczaneStoklari, setEczaneStoklari] = useState([]);
  const [selectedIlacId, setSelectedIlacId] = useState(null);
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
      {selectedIlacId && (
        <div>
          <h2>Eczanelerdeki İlaç Stokları</h2>
          <ul>
            {eczaneStoklari.map((stok, idx) => (
              <li key={idx}>{stok.eczaneAdi}: {stok.quantity} adet mevcut</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [ilaclar, setIlaclar] = useState([]);

  useEffect(() => {
    const fetchIlaclar = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/drugs');
        console.log("API Response:", response.data);  // Yanıtı konsolda göster
        setIlaclar(response.data);
      } catch (error) {
        console.error('İlaçları çekerken hata oluştu:', error);
      }
    };

    fetchIlaclar();
  }, []);

  return (
    <div>
      <h1>İlaç Listesi</h1>
      <IlacListesi ilaclar={ilaclar} />
    </div>
  );
};




export default App;
