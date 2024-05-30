import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './UpdateDrug.css'; // CSS dosyasını ekliyoruz

const UpdateDrug = () => {
  const [drugs, setDrugs] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState('');
  const [drugDetails, setDrugDetails] = useState({
    ilacAdi: '',
    ilacGrubu: '',
    ilacEtkenMaddesi: ''
  });
  const { token } = useAuth();
  const navigate = useNavigate();

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

  const handleDrugChange = (e) => {
    const drugId = e.target.value;
    setSelectedDrug(drugId);
    const selected = drugs.find(drug => drug.id === parseInt(drugId));
    if (selected) {
      setDrugDetails({
        ilacAdi: selected.ilacAdi,
        ilacGrubu: selected.ilacGrubu,
        ilacEtkenMaddesi: selected.ilacEtkenMaddesi
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDrugDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/drugs/${selectedDrug}`, drugDetails, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      alert('İlaç bilgileri güncellendi.');
      navigate('/');
    } catch (error) {
      console.error('İlaç güncellenirken hata oluştu:', error);
      alert('İlaç güncellenirken bir hata oluştu.');
    }
  };

  return (
    <div className="update-drug-container">
      <h2>İlaç Bilgilerini Güncelle</h2>
      <form onSubmit={handleSubmit} className="update-drug-form">
        <div className="form-group">
          <label>İlaç Seçin:</label>
          <select value={selectedDrug} onChange={handleDrugChange} required>
            <option value="">Bir ilaç seçin</option>
            {drugs.map(drug => (
              <option key={drug.id} value={drug.id}>{drug.ilacAdi}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>İlaç Adı:</label>
          <input type="text" name="ilacAdi" value={drugDetails.ilacAdi} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>İlaç Grubu:</label>
          <input type="text" name="ilacGrubu" value={drugDetails.ilacGrubu} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>İlaç Etken Maddesi:</label>
          <input type="text" name="ilacEtkenMaddesi" value={drugDetails.ilacEtkenMaddesi} onChange={handleChange} required />
        </div>
        <button type="submit" className="update-button">Güncelle</button>
      </form>
    </div>
  );
};

export default UpdateDrug;
