import React from 'react';
import { useParams } from 'react-router-dom';
import './HarfSayfasi.css';
const HarfSayfasi = () => {
 const { harf } = useParams();
 return (
    <div>
      <h2>Seçilen Harf: {harf}</h2>
      <div className="alan1">
        <h1>1. Alan</h1>
        <p>Bu 1. alandır. Ekranın soluna yapışık, ekranın yüzde 75'ine kadar sağa kadar kutu kaplar.</p>
      </div>
    </div>
 );
};

export default HarfSayfasi;