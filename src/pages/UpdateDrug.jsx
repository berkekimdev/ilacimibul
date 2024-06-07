// Gerekli modüller ve bileşenler import ediliyor
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './UpdateDrug.css'; // CSS dosyasını import ediyoruz

const UpdateDrug = () => {
  // Component'in state'leri tanımlanıyor
  const [drugs, setDrugs] = useState([]); // Mevcut ilaçları tutmak için
  const [selectedDrug, setSelectedDrug] = useState(''); // Seçilen ilacı tutmak için
  const [drugDetails, setDrugDetails] = useState({
    ilacAdi: '',
    ilacGrubu: '',
    ilacEtkenMaddesi: ''
  }); // Güncellenmiş ilaç bilgilerini tutmak için
  const { token } = useAuth(); // AuthContext'ten token alınıyor
  const navigate = useNavigate(); // Sayfa yönlendirmeleri için kullanılıyor

  // Component yüklendiğinde mevcut ilaçları API'den çek
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

  // Seçilen ilacın detaylarını state'e kaydet
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

  // Form alanlarındaki değişiklikleri state'e kaydet
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDrugDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  // Form submit edildiğinde API'ye güncelleme isteği gönder
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/drugs/${selectedDrug}`, drugDetails, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      alert('İlaç bilgileri güncellendi.');
      navigate('/'); // Güncelleme sonrası ana sayfaya yönlendir
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
