import React, { useState } from 'react';
import './IlacGrubu.css';

const IlacGrubu = () => {
 const [showModal, setShowModal] = useState(false);
 const [selectedGrup, setSelectedGrup] = useState('');

 // Örnek ilaç grupları listesi
 const ilacGruplari = [
    "Antibiyotikler ve Kemoterapötikler",
    "Kalp-Damar Sistemi İlaçları",
    "Su-Tuz ve Asit-Baz Dengesini Etkileyen İlaçlar ve Diüretikler",
    "Solunum sistemi İlaçları",
    "Santral Sinir Sistemini Etkileyen İlaçlar",
    "Endokrin Sistemi Etkileyen İlaçlar",
    "Otakoidler ve Antihistaminikler",
    "Vitaminler, Minareller ve Kombinasyonları",
    "Antianemik İlaçlar",
    "Sindirim Sistemi İlaçları",
    "Dermatolojik İlaçlar"
 ];

 // Örnek ilaçlar listesi
 const ilaclar = {
    "Antibiyotikler ve Kemoterapötikler": ["Ilac 1", "Ilac 2", "Ilac 3"],
    "Kalp-Damar Sistemi İlaçları": ["Ilac 4", "Ilac 5", "Ilac 6"],
    // Diğer gruplar için ilaçları ekleyin
 };

 const openModal = (grup) => {
    setSelectedGrup(grup);
    setShowModal(true);
 };

 const closeModal = () => {
    setShowModal(false);
 };

 return (
    <div className="ilac-gruplari">
      {ilacGruplari.map((grup, index) => (
        <button key={index} className="ilac-grup-butonu" onClick={() => openModal(grup)}>
          {grup}
        </button>
      ))}

      {showModal && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{selectedGrup}</h2>
            <ul>
              {ilaclar[selectedGrup].map((ilac, index) => (
                <li key={index}>{ilac}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
 );
};

export default IlacGrubu;
