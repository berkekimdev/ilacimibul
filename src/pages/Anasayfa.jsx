import React, { useState, useEffect } from 'react';
import './Anasayfa.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/sihirli.svg';

const Anasayfa = () => {
  const [topSearchedDrugs, setTopSearchedDrugs] = useState([]); // En çok aranan ilaçları tutacak state
  const [latestDrugs, setLatestDrugs] = useState([]); // En son eklenen ilaçları tutacak state
  const [svgHeight, setSvgHeight] = useState(0); // SVG'nin yüksekliğini tutmak için state
  const navigate = useNavigate(); // Sayfa yönlendirmesi için navigate hook'u

  useEffect(() => {
    // En çok aranan ilaçları getirmek için API çağrısı
    const fetchTopSearchedDrugs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/drugs/top-searched');
        setTopSearchedDrugs(response.data); // API'den gelen veriyi state'e kaydet
      } catch (error) {
        console.error('En çok aranan ilaçlar getirilirken hata oluştu:', error);
      }
    };

    // En son eklenen ilaçları getirmek için API çağrısı
    const fetchLatestDrugs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/drugs/latest');
        setLatestDrugs(response.data); // API'den gelen veriyi state'e kaydet
      } catch (error) {
        console.error('En son eklenen ilaçlar getirilirken hata oluştu:', error);
      }
    };

    fetchTopSearchedDrugs();
    fetchLatestDrugs();
  }, []); // Component mount edildiğinde çalışacak

  useEffect(() => {
    // SVG'nin yüksekliğini almak için
    const svgImg = document.querySelector('.svg-container img');
    if (svgImg) {
      svgImg.onload = () => {
        setSvgHeight(svgImg.offsetHeight); // SVG'nin yüksekliğini state'e kaydet
      };
    }
  }, []);

  // İlaç adına göre arama yaparak ilgili sayfaya yönlendirme fonksiyonu
  const handleDrugClick = (drugName) => {
    navigate('/search', { state: { query: drugName, type: 'ilac' } });
  };

  return (
    <div className="anasayfa-container">
      <div className="svg-container">
        {/* SVG arka plan resmi */}
        <img src={backgroundImage} alt="Arka Plan" onLoad={(e) => setSvgHeight(e.target.offsetHeight)} />
      </div>
      <div className="alanlar-container" style={{ height: svgHeight }}>
        {/* En son eklenen ilaçlar alanı */}
        <div className="alan1">
          <h1>En Son Eklenen İlaçlar</h1>
          {latestDrugs.length > 0 ? (
            <ul>
              {latestDrugs.map((drug, index) => (
                <li key={index} onClick={() => handleDrugClick(drug.ilacAdi)} className="drug-link">
                  {drug.ilacAdi} - {drug.ilacGrubu} - {drug.ilacEtkenMaddesi}
                </li>
              ))}
            </ul>
          ) : (
            <p>En son eklenen ilaçlar bulunamadı.</p>
          )}
        </div>
        {/* En çok aranan ilaçlar alanı */}
        <div className="alan2">
          <h2>En Çok Aranan İlaçlar</h2>
          {topSearchedDrugs.length > 0 ? (
            <ol>
              {topSearchedDrugs.map((drug, index) => (
                <li key={index} onClick={() => handleDrugClick(drug.ilacAdi)} className="drug-link">
                  {index + 1}. {drug.ilacAdi}
                </li>
              ))}
            </ol>
          ) : (
            <p>En çok aranan ilaçlar bulunamadı.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Anasayfa;
