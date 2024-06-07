// React ve diğer gerekli kütüphaneler import ediliyor
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './HarfSayfasi.css'; // HarfSayfasi bileşeni için stil dosyası

// IlacListesi bileşeni tanımlanıyor
const IlacListesi = ({ ilaclar }) => {
  const navigate = useNavigate(); // useNavigate hook'u ile yönlendirme fonksiyonu

  // Belirli bir ilacı eczanede bulmak için yönlendirme fonksiyonu
  const eczanedeBul = (ilacId) => {
    navigate(`/drugeczanelistesi/${ilacId}`); // İlaç ID'sine göre yönlendirme
  };

  return (
    // İlaç listesini içeren tablo yapısı
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
          {/* İlaçlar dizisi üzerinden map ile geçilerek her bir ilaç için satır oluşturuluyor */}
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

// HarfSayfasi bileşeni tanımlanıyor
const HarfSayfasi = () => {
  const [ilaclar, setIlaclar] = useState([]); // İlaçları tutmak için state
  const { harf } = useParams(); // URL parametresinden harfi al

  useEffect(() => {
    // İlaçları harfe göre API'den çekmek için fonksiyon
    const fetchIlaclar = async () => {
      try {
        // Belirli harf ile başlayan ilaçları çek
        const response = await axios.get(`http://localhost:8080/api/drugs/byFirstLetter?letter=${harf}`);
        const fetchedIlaclar = response.data;

        // Tüm ilaç stoklarını çek
        const stocksResponse = await axios.get(`http://localhost:8080/api/drugstocks`);
        const allStocks = stocksResponse.data;

        // İlaçların toplam stoklarını hesapla ve ilaç bilgilerine ekle
        const ilaclarWithStock = fetchedIlaclar.map(ilac => {
          const totalStock = allStocks
            .filter(stock => stock.drugId === ilac.id)
            .reduce((sum, stock) => sum + stock.quantity, 0);
          return { ...ilac, totalStock };
        });

        setIlaclar(ilaclarWithStock); // İlaçları state'e ata
      } catch (error) {
        console.error('İlaçları çekerken hata oluştu:', error); // Hata mesajını konsola yaz
      }
    };
    
    setIlaclar([]); // İlaçları sıfırla
    fetchIlaclar(); // İlaçları çek
  }, [harf]); // harf parametresi değiştiğinde useEffect tekrar çalışır

  return (
    <div>
      <h1>{harf} Harfi ile Başlayan İlaçlar</h1>
      <IlacListesi ilaclar={ilaclar} /> {/* İlaç listesini IlacListesi bileşenine geçir */}
    </div>
  );
};

// HarfSayfasi bileşeni dışa aktarılıyor
export default HarfSayfasi;
