import React, { useState } from 'react';
import axios from 'axios';
import './IlacEkle.css';
import { useAuth } from '../context/AuthContext';

const IlacEkle = () => {
  const [ilacAdi, setIlacAdi] = useState('');
  const [ilacGrubu, setIlacGrubu] = useState('');
  const [ilacEtkenMaddesi, setIlacEtkenMaddesi] = useState('');
  const [error, setError] = useState('');
  const { token } = useAuth(); // Token'ı AuthContext'ten alın

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDrug = {
      ilacAdi,
      ilacGrubu,
      ilacEtkenMaddesi,
    };

    try {
      await axios.post(
        'http://localhost:8080/api/drugs',
        newDrug,
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Bearer token'ı Authorization başlığına ekleyin
          },
        }
      );
      alert('İlaç başarıyla eklendi');
    } catch (error) {
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
            onChange={(e) => setIlacAdi(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="ilacGrubu">İlaç Grubu:</label>
          <input
            type="text"
            id="ilacGrubu"
            value={ilacGrubu}
            onChange={(e) => setIlacGrubu(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="ilacEtkenMaddesi">İlaç Etken Maddesi:</label>
          <input
            type="text"
            id="ilacEtkenMaddesi"
            value={ilacEtkenMaddesi}
            onChange={(e) => setIlacEtkenMaddesi(e.target.value)}
            required
          />
        </div>
        <button type="submit">İlaç Ekle</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default IlacEkle;
