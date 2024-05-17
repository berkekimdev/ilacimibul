// src/components/IlacGrubu.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './IlacGrubu.css'; // CSS dosyasını dahil et
import DrugModal from './DrugModal';

const IlacGrubu = () => {
    const [ilacGruplari, setIlacGruplari] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [drugs, setDrugs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/api/drugs')
            .then(response => {
                const gruplar = new Set(response.data.map(ilac => ilac.ilacGrubu));
                setIlacGruplari(Array.from(gruplar));
            })
            .catch(error => console.error('Hata:', error));
    }, []);

    const handleGroupClick = (group) => {
        axios.get(`http://localhost:8080/api/drugs/byGroup?group=${encodeURIComponent(group)}`)
            .then(async (response) => {
                const fetchedDrugs = response.data;

                // Tüm ilaç stoklarını çek
                const stocksResponse = await axios.get('http://localhost:8080/api/drugstocks');
                const allStocks = stocksResponse.data;

                // İlaçların toplam stoklarını hesapla
                const drugsWithStock = fetchedDrugs.map(drug => {
                    const totalStock = allStocks
                        .filter(stock => stock.drugName === drug.ilacAdi)
                        .reduce((sum, stock) => sum + stock.quantity, 0);
                    return { ...drug, totalStock };
                });

                setDrugs(drugsWithStock);
                setSelectedGroup(group);
                setIsModalOpen(true);
            })
            .catch(error => console.error('Hata:', error));
    };

    return (
        <div>
            <div className="ilac-gruplari-container">
                {ilacGruplari.map(grup => (
                    <button key={grup} className="ilac-grup-kutu" onClick={() => handleGroupClick(grup)}>{grup}</button>
                ))}
            </div>
            <DrugModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} drugs={drugs} group={selectedGroup} />
        </div>
    );
};

export default IlacGrubu;
