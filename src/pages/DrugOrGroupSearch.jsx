import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DrugOrGroupSearch({ searchType, searchQuery }) {
 const [drugInfo, setDrugInfo] = useState([]);

 useEffect(() => {
   if (searchQuery) {
     fetchDrugInfo();
   }
 }, [searchQuery]);

 const fetchDrugInfo = async () => {
    const options = {
      method: 'GET',
      url: `http://localhost:8080/api/drugs/search`,
      params: { 
        query: searchQuery,
        type: searchType
      },
    };

    try {
      const response = await axios.request(options);
      if (response.status === 200) {
        setDrugInfo(response.data);
        console.log("İlaç bilgileri başarıyla alındı.");
      } else {
        console.log("İlaç bilgileri alınamadı. HTTP durum kodu:", response.status);
      }
    } catch (error) {
      console.error("İlaç bilgileri alınırken bir hata oluştu:", error);
    }
 };

 return (
    <div>
      {drugInfo.length > 0 && (
        <div>
          <h2>İlaç Bilgileri:</h2>
          <ul>
            {drugInfo.map((drug, index) => (
              <li key={index}>
                <h3>{drug.ilacAdi}</h3>
                <p>Etken Madde: {drug.ilacEtkenMaddesi}</p>
                <p>Grubu: {drug.ilacGrubu}</p>
                <p>Aranma Sayısı: {drug.searchCount}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
 );
}

export default DrugOrGroupSearch;
