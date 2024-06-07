import React, { useState } from 'react';
import axios from 'axios';
import './IlacEkle.css';
import { useAuth } from '../context/AuthContext'; // AuthContext'ten kimlik doğrulama bilgilerini almak için kullanılır

const IlacEkle = () => {
  // Form alanları ve hata mesajı için state'ler
  const [ilacAdi, setIlacAdi] = useState(''); // İlaç adı state'i
  const [ilacGrubu, setIlacGrubu] = useState(''); // İlaç grubu state'i
  const [ilacEtkenMaddesi, setIlacEtkenMaddesi] = useState(''); // İlaç etken maddesi state'i
  const [error, setError] = useState(''); // Hata mesajı state'i
  const { token } = useAuth(); // AuthContext'ten alınan token

  // Form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = async (event) => {
    event.preventDefault(); // Sayfanın yeniden yüklenmesini önler

    // Yeni ilaç bilgilerini içeren nesne
    const newDrug = {
      ilacAdi,
      ilacGrubu,
      ilacEtkenMaddesi,
    };

    try {
      // Yeni ilaç bilgilerini API'ye POST isteği ile gönderir
      await axios.post(
        'http://localhost:8080/api/drugs',
        newDrug,
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Bearer token'ı Authorization başlığına ekler
          },
        }
      );
      alert('İlaç başarıyla eklendi'); // Başarı mesajı gösterir
    } catch (error) {
      // Hata oluşursa konsola hata mesajını yazar ve hata state'ini günceller
      console.error('İlaç eklerken hata oluştu:', error);
      setError('İlaç eklenirken bir hata oluştu');
    }
  };

  return (
    <div className="ilac-ekle-container">
      <h2>İlaç Ekle</h2>
      <form className="ilac-ekle-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="ilacAdi">İlaç Adı:</label>
          <input
            type="text"
            id="ilacAdi"
            value={ilacAdi}
            onChange={(e) => setIlacAdi(e.target.value)} // İlaç adı state'ini günceller
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="ilacGrubu">İlaç Grubu:</label>
          <input
            type="text"
            id="ilacGrubu"
            value={ilacGrubu}
            onChange={(e) => setIlacGrubu(e.target.value)} // İlaç grubu state'ini günceller
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="ilacEtkenMaddesi">İlaç Etken Maddesi:</label>
          <input
            type="text"
            id="ilacEtkenMaddesi"
            value={ilacEtkenMaddesi}
            onChange={(e) => setIlacEtkenMaddesi(e.target.value)} // İlaç etken maddesi state'ini günceller
            required
          />
        </div>
        <button type="submit">İlaç Ekle</button> {/* Form gönderme butonu */}
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Hata mesajı */}
      </form>
    </div>
  );
};

export default IlacEkle;
