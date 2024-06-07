// Gerekli modülleri ve bileşenleri import et
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IlacSil.css';
import { useAuth } from '../context/AuthContext';

// IlacSil bileşeni tanımlanır
const IlacSil = () => {
    // State tanımlamaları: ilaçlar, seçilen ilaç, hata mesajı ve token
    const [drugs, setDrugs] = useState([]);
    const [selectedDrug, setSelectedDrug] = useState('');
    const [error, setError] = useState('');
    const { token } = useAuth();

    // Bileşen yüklendiğinde ve token değiştiğinde ilaçları API'den çek
    useEffect(() => {
        const fetchDrugs = async () => {
            try {
                // API isteği ile ilaçları çek ve state'e ata
                const response = await axios.get('http://localhost:8080/api/drugs', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setDrugs(response.data);
            } catch (error) {
                console.error('İlaçlar alınırken hata oluştu:', error);
                setError('İlaçlar alınırken hata oluştu');
            }
        };

        fetchDrugs();
    }, [token]);

    // İlaç silme fonksiyonu
    const handleDelete = async () => {
        // Eğer ilaç seçilmemişse hata mesajı göster
        if (!selectedDrug) {
            setError('Lütfen bir ilaç seçin.');
            return;
        }

        try {
            // Seçilen ilacı API ile sil
            await axios.delete(`http://localhost:8080/api/drugs/${selectedDrug}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            alert('İlaç başarıyla silindi!');
            // İlaç silindikten sonra state'i güncelle
            setDrugs(drugs.filter(drug => drug.id !== selectedDrug));
            setSelectedDrug('');
        } catch (error) {
            console.error('İlaç silinirken hata oluştu:', error);
            setError('İlaç silinirken bir hata oluştu');
        }
    };

    return (
        <div className="ilac-sil-container">
            <h2>İlaç Sil</h2>
            {/* İlaç seçimi için dropdown */}
            <select value={selectedDrug} onChange={(e) => setSelectedDrug(e.target.value)} required>
                <option value="">Bir ilaç seçin</option>
                {drugs.map((drug) => (
                    <option key={drug.id} value={drug.id}>
                        {drug.ilacAdi}
                    </option>
                ))}
            </select>
            {/* Silme işlemi için buton */}
            <button onClick={handleDelete}>Sil</button>
            {/* Hata mesajı */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default IlacSil;
