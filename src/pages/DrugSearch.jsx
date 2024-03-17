import React, { useState } from 'react';
import axios from 'axios';

function DrugSearch() {
 const [drugName, setDrugName] = useState('');
 const [drugInfo, setDrugInfo] = useState([]);

 const fetchDrugInfo = async () => {
    const options = {
      method: 'GET',
      url: 'https://drug-info-and-price-history.p.rapidapi.com/1/druginfo',
      params: { drug: drugName },
      headers: {
        'X-RapidAPI-Key': '3c9b0ea4f4msh12d3f63d3d8791dp1703c9jsn438ae97880c4',
        'X-RapidAPI-Host': 'drug-info-and-price-history.p.rapidapi.com'
      }
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

 const handleSubmit = (event) => {
    event.preventDefault();
    fetchDrugInfo();
 };

 return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={drugName}
          onChange={(e) => setDrugName(e.target.value)}
          placeholder="İlaç ismi girin"
        />
        <button type="submit">Ara</button>
      </form>
      {drugInfo.length > 0 && (
        <div>
          <h2>İlaç Bilgileri:</h2>
          <ul>
            {drugInfo.map((drug, index) => (
              <li key={index}>
                <h3>{drug.brand_name}</h3>
                <p>Etken Madde: {drug.generic_name}</p>
                <p>Üretici: {drug.labeler_name}</p>
                <p>Dosage Form: {drug.dosage_form}</p>
                <p>İlaç Türü: {drug.pharm_class.join(', ')}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
 );
}

export default DrugSearch;