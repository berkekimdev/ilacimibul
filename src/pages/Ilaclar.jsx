// Gerekli modülleri ve bileşenleri import et
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './IlacListesi.css';

// İlaç listesini gösteren alt bileşen
const IlacListesi = ({ ilaclar }) => {
  const navigate = useNavigate();

  // Eczanede Bul butonuna tıklandığında ilgili eczane listesi sayfasına yönlendiren fonksiyon
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

// Ana bileşen
const App = () => {
  const [ilaclar, setIlaclar] = useState([]); // İlaçları tutmak için state
  const { harf } = useParams(); // URL parametresinden harf parametresini al

  useEffect(() => {
    // API'den ilaçları ve stok bilgilerini çek
    const fetchIlaclar = async () => {
      try {
        // harf parametresi varsa harfe göre ilaçları çek, yoksa tüm ilaçları çek
        const url = harf
          ? `http://localhost:8080/api/drugs/byFirstLetter?letter=${harf}`
          : 'http://localhost:8080/api/drugs';
        const response = await axios.get(url);
        setIlaclar(response.data); // API'den alınan ilaçları state'e ata
      } catch (error) {
        console.error('İlaçları çekerken hata oluştu:', error); // Hata olursa konsola yaz
      }
    };

    fetchIlaclar(); // Fonksiyonu çağır
  }, [harf]); // `harf` değiştiğinde tekrar çalışır

  return (
    <div>
      <h1>{harf ? `${harf} Harfi ile Başlayan İlaçlar` : 'İlaç Listesi'}</h1> {/* Başlığı render et */}
      <IlacListesi ilaclar={ilaclar} /> {/* İlaç listesini render et */}
    </div>
  );
};

export default App;
