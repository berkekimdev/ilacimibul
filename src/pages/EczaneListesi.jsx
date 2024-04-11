// src/EczaneListesi.js

import React from 'react';
import './EczaneListesi.css';

const EczaneListesi = () => {
 // Sabit eczane bilgileri
 const eczaneler = [
    { adi: 'Eczane 1', telefon: '0212 123 45 67', adres: 'Adres 1' },
    { adi: 'Eczane 2', telefon: '0212 234 56 78', adres: 'Adres 2' },
    { adi: 'Eczane 3', telefon: '0212 345 67 89', adres: 'Adres 3' },
 ];

 return (
    <div>
      <h1>Eczaneler</h1>
      <table>
        <thead>
          <tr>
            <th>Eczane Adı</th>
            <th>Eczane Telefonu</th>
            <th>Eczane Adresi</th>
          </tr>
        </thead>
        <tbody>
          {eczaneler.map((eczane, index) => (
            <tr key={index}>
              <td>{eczane.adi}</td>
              <td>{eczane.telefon}</td>
              <td>{eczane.adres}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
 );
};

export default EczaneListesi;
