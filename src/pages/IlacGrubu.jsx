import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './IlacGrubu.css'; // CSS dosyasını dahil et
import DrugModal from './DrugModal'; // DrugModal bileşenini import et

const IlacGrubu = () => {
    // State'ler
    const [ilacGruplari, setIlacGruplari] = useState([]); // İlaç gruplarını tutmak için state
    const [selectedGroup, setSelectedGroup] = useState(null); // Seçilen ilaç grubunu tutmak için state
    const [drugs, setDrugs] = useState([]); // İlaçları tutmak için state
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal'ın açık olup olmadığını belirten state

    // Bileşen yüklendiğinde çalışacak effect
    useEffect(() => {
        // API'den tüm ilaçları çek
        axios.get('http://localhost:8080/api/drugs')
            .then(response => {
                // İlaç gruplarını ayıkla
                const gruplar = new Set(response.data.map(ilac => ilac.ilacGrubu));
                setIlacGruplari(Array.from(gruplar)); // İlaç gruplarını state'e ata
            })
            .catch(error => console.error('Hata:', error)); // Hata olursa konsola yaz
    }, []); // Sadece ilk yüklemede çalışır

    // Bir ilaç grubuna tıklandığında çalışacak fonksiyon
    const handleGroupClick = (group) => {
        // Seçilen gruba ait ilaçları API'den çek
        axios.get(`http://localhost:8080/api/drugs/byGroup?group=${encodeURIComponent(group)}`)
            .then(async (response) => {
                const fetchedDrugs = response.data; // Gelen ilaçları al

                // Tüm ilaç stoklarını çek
                const stocksResponse = await axios.get('http://localhost:8080/api/drugstocks');
                const allStocks = stocksResponse.data; // Gelen stokları al

                // İlaçların toplam stoklarını hesapla
                const drugsWithStock = fetchedDrugs.map(drug => {
                    const totalStock = allStocks
                        .filter(stock => stock.drugName === drug.ilacAdi) // İlaç adına göre filtrele
                        .reduce((sum, stock) => sum + stock.quantity, 0); // Toplam stok miktarını hesapla
                    return { ...drug, totalStock }; // İlaç bilgisine toplam stok miktarını ekle
                });

                setDrugs(drugsWithStock); // İlaçları state'e ata
                setSelectedGroup(group); // Seçilen grubu state'e ata
                setIsModalOpen(true); // Modal'ı aç
            })
            .catch(error => console.error('Hata:', error)); // Hata olursa konsola yaz
    };

    return (
        <div>
            <div className="ilac-gruplari-container">
                {ilacGruplari.map(grup => (
                    // Her ilaç grubu için bir buton oluştur
                    <button key={grup} className="ilac-grup-kutu" onClick={() => handleGroupClick(grup)}>{grup}</button>
                ))}
            </div>
            {/* DrugModal bileşeni, modal açık olduğunda ilaçları ve grubu gösterir */}
            <DrugModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} drugs={drugs} group={selectedGroup} />
        </div>
    );
};

export default IlacGrubu;
