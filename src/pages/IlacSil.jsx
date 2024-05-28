// src/pages/IlacSil.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IlacSil.css';
import { useAuth } from '../context/AuthContext';

const IlacSil = () => {
    const [drugs, setDrugs] = useState([]);
    const [selectedDrug, setSelectedDrug] = useState('');
    const [error, setError] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        const fetchDrugs = async () => {
            try {
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

    const handleDelete = async () => {
        if (!selectedDrug) {
            setError('Lütfen bir ilaç seçin.');
            return;
        }

        try {
            await axios.delete(`http://localhost:8080/api/drugs/${selectedDrug}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            alert('İlaç başarıyla silindi!');
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
            <select value={selectedDrug} onChange={(e) => setSelectedDrug(e.target.value)} required>
                <option value="">Bir ilaç seçin</option>
                {drugs.map((drug) => (
                    <option key={drug.id} value={drug.id}>
                        {drug.ilacAdi}
                    </option>
                ))}
            </select>
            <button onClick={handleDelete}>Sil</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default IlacSil;
