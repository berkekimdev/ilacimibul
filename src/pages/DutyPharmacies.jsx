import React, { useState } from 'react';
import axios from 'axios';
import './DutyPharmacies.css';
import { FaSearchLocation } from "react-icons/fa";

function DutyPharmacies() {
  const [city, setCity] = useState('');
  const [pharmacies, setPharmacies] = useState([]);

  const fetchPharmacies = async () => {
    try {
      const response = await axios.get("https://www.nosyapi.com/apiv2/service/pharmacies-on-duty/cities", {
        params: { city },
        headers: {
          "X-NSYP": "BSGSmWLxuU9mxwckV5tY48VWYxjQ2ev9syVqCp3GDM4al6NEKEB9gMBOHDVk"
        }
      });
      setPharmacies(response.data.data); // API'nin döndürdüğü yapıya göre ayarlayın
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="drug-details-container">
      <h1>Nöbetçi Eczaneler</h1>
      <div className="input-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Şehir ismi girin"
        />
        <button onClick={fetchPharmacies}><FaSearchLocation /> Ara</button>
      </div>
      <div>
        {pharmacies.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Eczane İsmi</th>
                <th>Adres</th>
              </tr>
            </thead>
            <tbody>
              {pharmacies.map((pharmacy, index) => (
                <tr key={index}>
                  <td>{pharmacy.cities}</td>
                  <td>{pharmacy.slug}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nöbetçi eczane bulunamadı.</p>
        )}
      </div>
    </div>
  );
}

export default DutyPharmacies;
