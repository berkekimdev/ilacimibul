import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IlacEkle.css';

const IlacEkle = () => {
  const [ilacAdi, setIlacAdi] = useState('');
  const [ilacGrubu, setIlacGrubu] = useState('');
  const [ilacEtkenMaddesi, setIlacEtkenMaddesi] = useState('');
  const [drugs, setDrugs] = useState([]);

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/drugs');
        setDrugs(response.data);
      } catch (error) {
        console.error('İlaçlar alınırken hata oluştu:', error);
      }
    };

    fetchDrugs();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDrug = {
      ilacAdi,
      ilacGrubu,
      ilacEtkenMaddesi,
    };

    try {
      await axios.post('http://localhost:8080/api/drugs', newDrug);
      alert('İlaç başarıyla eklendi');
    } catch (error) {
      console.error('İlaç eklerken hata oluştu:', error);
      alert('İlaç eklenirken bir hata oluştu');
    }
  };

  return (
    <div className="ilac-ekle-container">
      <h2>İlaç Ekle</h2>
      <form className="ilac-ekle-form" onSubmit={handleSubmit}>
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
      </form>
    </div>
  );
};

export default IlacEkle;
