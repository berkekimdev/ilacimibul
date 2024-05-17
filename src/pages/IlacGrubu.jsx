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
            .then(response => {
                setDrugs(response.data);
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
