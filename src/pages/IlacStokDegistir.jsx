// Gerekli modülleri ve bileşenleri import et
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IlacStokDegistir.css';
import { useAuth } from '../context/AuthContext';

// IlacStokDegistir bileşeni tanımlanır
const IlacStokDegistir = () => {
  // State tanımlamaları: ilaç adı, miktar, ilaçlar, hata mesajı ve kullanıcı bilgileri ile token
  const [ilacAdi, setIlacAdi] = useState('');
  const [quantity, setQuantity] = useState('');
  const [drugs, setDrugs] = useState([]);
  const [error, setError] = useState('');
  const { user, token } = useAuth(); // AuthContext'ten kullanıcı bilgileri ve token'ı alın

  // Bileşen yüklendiğinde ilaçları API'den çek
  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        // API isteği ile ilaçları çek ve state'e ata
        const response = await axios.get('http://localhost:8080/api/drugs');
        setDrugs(response.data);
      } catch (error) {
        console.error('İlaçlar alınırken hata oluştu:', error);
        setError('İlaçlar alınırken hata oluştu');
      }
    };

    fetchDrugs();
  }, []);

  // Kullanıcı emailine göre ID'yi almak için fonksiyon
  const getUserIdByEmail = async (email) => {
    try {
      // API isteği ile kullanıcı bilgilerini çek
      const response = await axios.get('http://localhost:8080/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`, // Bearer token'ı Authorization başlığına ekleyin
        },
      });
      // Kullanıcıyı email adresine göre bul ve ID'yi döndür
      const user = response.data.find(user => user.email === email);
      return user ? user.id : null;
    } catch (error) {
      console.error('Kullanıcı bilgileri alınırken hata oluştu:', error);
      setError('Kullanıcı bilgileri alınırken hata oluştu');
      return null;
    }
  };

  // Form submit işlemi için fonksiyon
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Seçilen ilacı bul
    const selectedDrug = drugs.find((drug) => drug.ilacAdi === ilacAdi);
    if (!selectedDrug) {
      setError('Seçilen ilaç bulunamadı.');
      return;
    }

    // Kullanıcı ID'sini al
    const userId = await getUserIdByEmail(user.sub);
    if (!userId) {
      setError('Kullanıcı bulunamadı.');
      return;
    }

    // Yeni stok objesi oluştur
    const newStock = {
      userId: userId, // Kullanıcı ID'si
      drugId: selectedDrug.id, // İlaç ID'si
      quantity: parseInt(quantity, 10), // Miktarı integer'a çevir
    };

    try {
      // API isteği ile yeni stoğu ekle
      const response = await axios.post(
        'http://localhost:8080/api/drugstocks',
        newStock,
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Bearer token'ı Authorization başlığına ekleyin
          },
        }
      );
      alert('İlaç stoğu başarıyla eklendi');
      console.log('İstek Yanıtı:', response.data); // Yanıtı konsola logla
    } catch (error) {
      console.error('İlaç stoğu eklerken hata oluştu:', error);
      setError('İlaç stoğu eklenirken bir hata oluştu');
    }
  };

  return (
    <div className="ilac-stok-degistir-container">
      <h2>İlaç Stok Değiştir</h2>
      <form className="ilac-stok-degistir-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="ilacAdi">İlaç Adı:</label>
          <select
            id="ilacAdi"
            value={ilacAdi}
            onChange={(e) => setIlacAdi(e.target.value)}
            required
          >
            <option value="">İlaç Seçin</option>
            {drugs.map((drug) => (
              <option key={drug.id} value={drug.ilacAdi}>
                {drug.ilacAdi}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="quantity">Miktar:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit">Stok Değiştir</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default IlacStokDegistir;
