// src/components/IlacStokDegistir.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IlacStokDegistir.css';

const IlacStokDegistir = () => {
  const [drugs, setDrugs] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState('');
  const [quantity, setQuantity] = useState('');

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
    const selectedDrugId = drugs.find(drug => drug.ilacAdi === selectedDrug).id;
    const stockData = {
      drugId: selectedDrugId,
      quantity: parseInt(quantity),
    };

    try {
      await axios.post('http://localhost:8080/api/drugstocks', stockData);
      alert('Stok başarıyla güncellendi');
    } catch (error) {
      console.error('Stok güncellenirken hata oluştu:', error);
      alert('Stok güncellenirken bir hata oluştu');
    }
  };

  return (
    <div className="ilac-stok-degistir-container">
      <h2>İlaç Stok Değiştir</h2>
      <form className="ilac-stok-degistir-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="drug">Hangi İlaca Stok Ekleyeceksiniz?</label>
          <select
            id="drug"
            value={selectedDrug}
            onChange={(e) => setSelectedDrug(e.target.value)}
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
          <label htmlFor="quantity">Kaç Adet Stoğunuz Var?</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit">Stok Güncelle</button>
      </form>
    </div>
  );
};

export default IlacStokDegistir;
