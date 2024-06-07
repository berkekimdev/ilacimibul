import React, { useState } from 'react';
import axios from 'axios';

function DrugSearch() {
 const [drugName, setDrugName] = useState(''); // İlaç ismi için state tanımlanıyor
 const [drugInfo, setDrugInfo] = useState([]); // İlaç bilgileri için state tanımlanıyor

 // İlaç bilgilerini çekmek için API çağrısı yapan fonksiyon
 const fetchDrugInfo = async () => {
    const options = {
      method: 'GET',
      url: 'https://drug-info-and-price-history.p.rapidapi.com/1/druginfo', // API URL'si
      params: { drug: drugName }, // API parametreleri (ilaç ismi)
      headers: {
        'X-RapidAPI-Key': '3c9b0ea4f4msh12d3f63d3d8791dp1703c9jsn438ae97880c4', // RapidAPI anahtarı
        'X-RapidAPI-Host': 'drug-info-and-price-history.p.rapidapi.com' // RapidAPI host bilgisi
      }
    };

    try {
      const response = await axios.request(options); // API isteği
      if (response.status === 200) {
        setDrugInfo(response.data); // Başarılı API cevabında ilaç bilgilerini state'e kaydet
        console.log("İlaç bilgileri başarıyla alındı.");
      } else {
        console.log("İlaç bilgileri alınamadı. HTTP durum kodu:", response.status); // Başarısız API cevabında hata mesajı
      }
    } catch (error) {
      console.error("İlaç bilgileri alınırken bir hata oluştu:", error); // API isteği sırasında hata oluştuğunda hata mesajı
    }
 };

 // Form submit edildiğinde çağrılan fonksiyon
 const handleSubmit = (event) => {
    event.preventDefault(); // Sayfanın yeniden yüklenmesini önler
    fetchDrugInfo(); // API çağrısını başlatır
 };

 return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={drugName}
          onChange={(e) => setDrugName(e.target.value)} // İlaç ismi değiştiğinde state güncellenir
          placeholder="İlaç ismi girin" // İlaç ismi için placeholder
        />
        <button type="submit">Ara</button> {/* Arama butonu */}
      </form>
      {drugInfo.length > 0 && ( // Eğer ilaç bilgileri varsa listeyi göster
        <div>
          <h2>İlaç Bilgileri:</h2>
          <ul>
            {drugInfo.map((drug, index) => (
              <li key={index}>
                <h3>{drug.brand_name}</h3> {/* İlaç markası */}
                <p>Etken Madde: {drug.generic_name}</p> {/* İlaç etken maddesi */}
                <p>Üretici: {drug.labeler_name}</p> {/* İlaç üreticisi */}
                <p>Dosage Form: {drug.dosage_form}</p> {/* Dozaj formu */}
                <p>İlaç Türü: {drug.pharm_class.join(', ')}</p> {/* İlaç türü */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
 );
}

export default DrugSearch;
